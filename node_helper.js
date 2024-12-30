/*
//-------------------------------------------
MMM-MyPrayerTimes
Copyright (C) 2024 - H. Tilburgs

v1.0 : Initial version
v2.0 : Update request to fetch (request package has been deprecated)
v2.1 : Optimized code

MIT License
//-------------------------------------------
*/

const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
  start() {
    console.log(`Starting node_helper for: ${this.name}`);
  },

  async getMPT(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error('MMM-MyPrayerTimes: Network response was not ok');
        return;
      }

      const result = await response.json();
      if (result?.data?.timings) {
        this.sendSocketNotification('MPT_RESULT', result.data.timings);
      } else {
        console.error('MMM-MyPrayerTimes: Invalid data format received');
      }
    } catch (error) {
      console.error('MMM-MyPrayerTimes: Error fetching data', error);
    }
  },

  socketNotificationReceived(notification, payload) {
    if (notification === 'GET_MPT') {
      this.getMPT(payload);
    }
  },
});
