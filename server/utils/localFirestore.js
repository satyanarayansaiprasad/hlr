const fs = require('fs');
const path = require('path');

let dbJson;
try {
  dbJson = require('../data/db.json');
} catch (err) {
  dbJson = {
    posts: [],
    products: [],
    authors: [],
    comments: [],
    categories: [],
    tags: [],
    settings: [],
  };
}

const getDbPath = () => {
  const path1 = path.join(__dirname, '..', 'data', 'db.json');
  if (fs.existsSync(path1)) return path1;

  const path2 = path.join(process.cwd(), 'server', 'data', 'db.json');
  if (fs.existsSync(path2)) return path2;

  const path3 = path.join(process.cwd(), 'data', 'db.json');
  if (fs.existsSync(path3)) return path3;

  const path4 = path.join('/var/task', 'server', 'data', 'db.json');
  if (fs.existsSync(path4)) return path4;

  return path1;
};

const DB_PATH = getDbPath();

// Ensure database directory and file exist
const ensureDbFile = () => {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(
        DB_PATH,
        JSON.stringify(
          {
            posts: [],
            products: [],
            authors: [],
            comments: [],
            categories: [],
            tags: [],
            settings: [],
          },
          null,
          2
        )
      );
    }
  } catch (err) {
    console.warn('Fs is read-only. Skipping local DB write setup:', err.message);
  }
};

class DocumentSnapshot {
  constructor(id, data) {
    this.id = id;
    this._data = data;
    this.exists = data !== null && data !== undefined;
  }
  data() {
    return this._data;
  }
}

class QuerySnapshot {
  constructor(docs) {
    this.docs = docs;
    this.size = docs.length;
    this.empty = docs.length === 0;
  }
}

class DocumentReference {
  constructor(collectionName, id, localFirestore) {
    this.collectionName = collectionName;
    this.id = id;
    this.localFirestore = localFirestore;
  }

  async get() {
    const data = this.localFirestore._readCollection(this.collectionName);
    const doc = data.find((d) => String(d.id) === String(this.id));
    return new DocumentSnapshot(this.id, doc || null);
  }

  async update(updates) {
    const data = this.localFirestore._readCollection(this.collectionName);
    const index = data.findIndex((d) => String(d.id) === String(this.id));
    if (index === -1) {
      throw new Error(`5 NOT_FOUND: Document not found at ${this.collectionName}/${this.id}`);
    }
    data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
    this.localFirestore._writeCollection(this.collectionName, data);
    return true;
  }

  async set(payload) {
    const data = this.localFirestore._readCollection(this.collectionName);
    const index = data.findIndex((d) => String(d.id) === String(this.id));
    const docData = { id: this.id, ...payload, updatedAt: new Date().toISOString() };
    if (index !== -1) {
      data[index] = docData;
    } else {
      data.push(docData);
    }
    this.localFirestore._writeCollection(this.collectionName, data);
    return true;
  }

  async delete() {
    const data = this.localFirestore._readCollection(this.collectionName);
    const filtered = data.filter((d) => String(d.id) !== String(this.id));
    this.localFirestore._writeCollection(this.collectionName, filtered);
    return true;
  }
}

class Query {
  constructor(collectionName, localFirestore) {
    this.collectionName = collectionName;
    this.localFirestore = localFirestore;
    this.filters = [];
    this.sorts = [];
    this.limitCount = null;
  }

  where(field, op, value) {
    this.filters.push({ field, op, value });
    return this;
  }

  orderBy(field, direction = 'asc') {
    this.sorts.push({ field, direction });
    return this;
  }

  limit(count) {
    this.limitCount = count;
    return this;
  }

  async get() {
    let data = this.localFirestore._readCollection(this.collectionName);

    // Apply filters
    for (const filter of this.filters) {
      data = data.filter((item) => {
        const itemVal = item[filter.field];
        if (filter.op === '==') {
          return itemVal === filter.value;
        }
        if (filter.op === 'array-contains') {
          return Array.isArray(itemVal) && itemVal.includes(filter.value);
        }
        return true;
      });
    }

    // Apply sorting
    for (const sort of this.sorts) {
      data.sort((a, b) => {
        let valA = a[sort.field];
        let valB = b[sort.field];
        if (typeof valA === 'string') {
          return sort.direction === 'desc'
            ? valB.localeCompare(valA)
            : valA.localeCompare(valB);
        }
        return sort.direction === 'desc' ? valB - valA : valA - valB;
      });
    }

    // Apply limit
    if (this.limitCount !== null) {
      data = data.slice(0, this.limitCount);
    }

    const docs = data.map((item) => new DocumentSnapshot(item.id, item));
    return new QuerySnapshot(docs);
  }
}

class CollectionReference extends Query {
  constructor(collectionName, localFirestore) {
    super(collectionName, localFirestore);
  }

  doc(id) {
    return new DocumentReference(this.collectionName, id, this.localFirestore);
  }

  async add(payload) {
    const data = this.localFirestore._readCollection(this.collectionName);
    const id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const newDoc = { id, ...payload };
    data.push(newDoc);
    this.localFirestore._writeCollection(this.collectionName, data);
    return { id, ...newDoc };
  }
}

class LocalFirestore {
  constructor() {
    this.memoryDb = null;
    ensureDbFile();
  }

  collection(name) {
    return new CollectionReference(name, this);
  }

  _readCollection(name) {
    if (this.memoryDb) {
      return this.memoryDb[name] || [];
    }
    ensureDbFile();
    try {
      const raw = fs.readFileSync(DB_PATH, 'utf8');
      this.memoryDb = JSON.parse(raw);
      return this.memoryDb[name] || [];
    } catch (e) {
      console.warn(`Disk read failed for collection ${name}, using pre-bundled fallback:`, e.message);
      this.memoryDb = dbJson;
      return this.memoryDb[name] || [];
    }
  }

  _writeCollection(name, data) {
    if (!this.memoryDb) {
      this._readCollection(name);
    }
    this.memoryDb[name] = data;
    ensureDbFile();
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(this.memoryDb, null, 2), 'utf8');
    } catch (e) {
      console.warn('Fs is read-only. Database write skipped, data saved in-memory:', e.message);
    }
  }
}

module.exports = LocalFirestore;
