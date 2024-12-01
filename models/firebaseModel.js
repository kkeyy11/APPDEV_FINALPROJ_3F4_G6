const admin = require('firebase-admin');
const serviceAccount = require('../firebase-config.json');


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://current-sensor-forecast-default-rtdb.asia-southeast1.firebasedatabase.app/'
  });
}

const db = admin.database();

module.exports = {
  
  fetchRealtimeData: async () => {
    const ref = db.ref('realtime');
    
    try {
      const snapshot = await ref.once('value');
      const data = snapshot.val();

      if (!data) {
        throw new Error('No data found in the database.');
      }

      
      return Array.isArray(data) ? data : Object.values(data);
    } catch (error) {
      console.error('Error fetching data from Firebase:', error.message);
      throw new Error('Failed to fetch data from Firebase.');
    }
  }
};
