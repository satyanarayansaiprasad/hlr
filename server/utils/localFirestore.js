const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

// Ensure database directory and file exist
const ensureDbFile = () => {
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
    const doc = data.find((d) => d.id === this.id);
    return new DocumentSnapshot(this.id, doc || null);
  }

  async update(updates) {
    const data = this.localFirestore._readCollection(this.collectionName);
    const index = data.findIndex((d) => d.id === this.id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
      this.localFirestore._writeCollection(this.collectionName, data);
    }
    return true;
  }

  async delete() {
    const data = this.localFirestore._readCollection(this.collectionName);
    const filtered = data.filter((d) => d.id !== this.id);
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
    ensureDbFile();
  }

  collection(name) {
    return new CollectionReference(name, this);
  }

  _readCollection(name) {
    ensureDbFile();
    try {
      const raw = fs.readFileSync(DB_PATH, 'utf8');
      const db = JSON.parse(raw);
      return db[name] || [];
    } catch (e) {
      console.error('Error reading collection ' + name, e);
      return [];
    }
  }

  _writeCollection(name, data) {
    ensureDbFile();
    try {
      const raw = fs.readFileSync(DB_PATH, 'utf8');
      const db = JSON.parse(raw);
      db[name] = data;
      fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
    } catch (e) {
      console.error('Error writing collection ' + name, e);
    }
  }
}

module.exports = LocalFirestore;
