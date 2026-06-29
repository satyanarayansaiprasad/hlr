const admin = require('firebase-admin');

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

const LocalFirestore = require('../utils/localFirestore');

let db;

if (!projectId || !clientEmail || !privateKey) {
  console.log('Firebase credentials missing. Using local JSON database fallback.');
  db = new LocalFirestore();
} else {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    }
    db = admin.firestore();
    console.log('Firebase Firestore initialized successfully.');
  } catch (error) {
    console.error('Firebase initialization failed. Falling back to local JSON database.', error.message);
    db = new LocalFirestore();
  }
}

module.exports = db;
