const { initializeApp, cert, apps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Ganti dengan path file service account Anda
const serviceAccount = require('/mnt/c/Users/LENOVO/Downloads/submissionmlgc-widdaaulia-f58782237406.json');

// Inisialisasi Firebase Admin SDK hanya jika belum diinisialisasi
// Inisialisasi Firebase Admin SDK
initializeApp({
    credential: cert(serviceAccount)
  });

// Ekspor instance Firestore
const db = getFirestore();
module.exports = db;
