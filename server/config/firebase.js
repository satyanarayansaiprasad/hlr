const admin = require('firebase-admin');
const LocalFirestore = require('../utils/localFirestore');

let firestoreInstance = null;
let isFirestoreDisabled = false;
const localDb = new LocalFirestore();

// Initialize Firestore if credentials are provided
try {
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    firestoreInstance = admin.firestore();
    console.log('Firebase SDK initialized.');
  } else {
    isFirestoreDisabled = true;
  }
} catch (err) {
  console.warn('Firebase initialization failed, using local DB:', err.message);
  isFirestoreDisabled = true;
}

class FirestoreProxy {
  collection(name) {
    return new CollectionReferenceProxy(name);
  }
}

class CollectionReferenceProxy {
  constructor(name) {
    this.name = name;
  }

  doc(id) {
    return new DocumentReferenceProxy(this.name, id);
  }

  where(field, op, value) {
    return new QueryProxy(this.name).where(field, op, value);
  }

  orderBy(field, direction) {
    return new QueryProxy(this.name).orderBy(field, direction);
  }

  limit(count) {
    return new QueryProxy(this.name).limit(count);
  }

  async get() {
    if (firestoreInstance && !isFirestoreDisabled) {
      try {
        return await firestoreInstance.collection(this.name).get();
      } catch (err) {
        console.warn(`Firestore API get failed for collection ${this.name}: ${err.message}. Falling back to local DB.`);
        isFirestoreDisabled = true;
      }
    }
    return await localDb.collection(this.name).get();
  }

  async add(payload) {
    if (firestoreInstance && !isFirestoreDisabled) {
      try {
        const docRef = await firestoreInstance.collection(this.name).add(payload);
        try {
          await localDb.collection(this.name).doc(docRef.id).set(payload);
        } catch (_) {}
        return docRef;
      } catch (err) {
        console.warn(`Firestore API add failed for collection ${this.name}: ${err.message}. Falling back to local DB.`);
        isFirestoreDisabled = true;
      }
    }
    return await localDb.collection(this.name).add(payload);
  }
}

class DocumentReferenceProxy {
  constructor(collectionName, id) {
    this.collectionName = collectionName;
    this.id = id;
  }

  async get() {
    if (firestoreInstance && !isFirestoreDisabled) {
      try {
        return await firestoreInstance.collection(this.collectionName).doc(this.id).get();
      } catch (err) {
        console.warn(`Firestore API get failed for ${this.collectionName}/${this.id}: ${err.message}. Falling back to local DB.`);
        isFirestoreDisabled = true;
      }
    }
    return await localDb.collection(this.collectionName).doc(this.id).get();
  }

  async set(payload) {
    if (firestoreInstance && !isFirestoreDisabled) {
      try {
        await firestoreInstance.collection(this.collectionName).doc(this.id).set(payload);
      } catch (err) {
        console.warn(`Firestore API set failed for ${this.collectionName}/${this.id}: ${err.message}. Falling back to local DB.`);
        isFirestoreDisabled = true;
      }
    }
    return await localDb.collection(this.collectionName).doc(this.id).set(payload);
  }

  async update(updates) {
    if (firestoreInstance && !isFirestoreDisabled) {
      try {
        await firestoreInstance.collection(this.collectionName).doc(this.id).update(updates);
      } catch (err) {
        console.warn(`Firestore API update failed for ${this.collectionName}/${this.id}: ${err.message}. Falling back to local DB.`);
        isFirestoreDisabled = true;
      }
    }
    return await localDb.collection(this.collectionName).doc(this.id).update(updates);
  }

  async delete() {
    if (firestoreInstance && !isFirestoreDisabled) {
      try {
        await firestoreInstance.collection(this.collectionName).doc(this.id).delete();
      } catch (err) {
        console.warn(`Firestore API delete failed for ${this.collectionName}/${this.id}: ${err.message}. Falling back to local DB.`);
        isFirestoreDisabled = true;
      }
    }
    return await localDb.collection(this.collectionName).doc(this.id).delete();
  }
}

class QueryProxy {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.queryChain = [];
  }

  where(field, op, value) {
    this.queryChain.push({ type: 'where', args: [field, op, value] });
    return this;
  }

  orderBy(field, direction) {
    this.queryChain.push({ type: 'orderBy', args: [field, direction] });
    return this;
  }

  limit(count) {
    this.queryChain.push({ type: 'limit', args: [count] });
    return this;
  }

  async get() {
    if (firestoreInstance && !isFirestoreDisabled) {
      try {
        let fQuery = firestoreInstance.collection(this.collectionName);
        for (const op of this.queryChain) {
          fQuery = fQuery[op.type](...op.args);
        }
        return await fQuery.get();
      } catch (err) {
        console.warn(`Firestore API query get failed for ${this.collectionName}: ${err.message}. Falling back to local DB.`);
        isFirestoreDisabled = true;
      }
    }

    // Local DB Query Chain Execution
    let lQuery = localDb.collection(this.collectionName);
    for (const op of this.queryChain) {
      lQuery = lQuery[op.type](...op.args);
    }
    return await lQuery.get();
  }
}

module.exports = new FirestoreProxy();
