const db = require('../firestore');

async function storeData(id, data) {
    const predictCollection = db.collection('prediction');
    return predictCollection.doc(id).set(data);
}

module.exports = storeData;