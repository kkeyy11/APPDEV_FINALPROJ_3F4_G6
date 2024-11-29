// models/firebaseModel.js
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-config.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://current-sensor-forecast-default-rtdb.asia-southeast1.firebasedatabase.app/'  
});

const db = admin.database();

module.exports = {
  fetchRealtimeData: async () => {
    const ref = db.ref('realtime');  // Path where the data is stored in Firebase
    return new Promise((resolve, reject) => {
      ref.once('value', snapshot => {
        const data = snapshot.val();
        if (data) {
          resolve(data);
        } else {
          reject('No data found');
        }
      });
    });
  }
};
