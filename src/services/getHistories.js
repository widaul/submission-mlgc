const db = require('../firestore');

async function getHistories() {
 
  return new Promise((resolve, reject) => {
      db.collection('prediction').get()
        .then(snapshot => {
          const data = [];
          snapshot.forEach(doc => {
            data.push({ id: doc.id, history: { ...doc.data() } });
          });
          resolve(data);
        })
        .catch(error => {
          console.error('Error getting histories: ', error);
          reject(error);
        });
    });
}
 
module.exports = getHistories;