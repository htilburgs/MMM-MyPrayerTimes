/*
//-------------------------------------------
MMM-MyPrayerTimes
Copyright (C) 2019 - H. Tilburgs

v1.0 : Initial version
v2.0 : Update request to fetch (request package has been deprecated)

MIT License
//-------------------------------------------
*/

const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({

  start: function() {
          console.log("Starting node_helper for: " + this.name);
  },
  
  getMPT: function(url) {
        // Make a GET request using the Fetch API
        fetch(url)
          .then(response => {
            if (!response.ok) {
              console.error('MMM-MyPrayerTimes: Network response was not ok');
            }
            return response.json();
          })

          .then(result => {
            // Process the retrieved user data
            // console.log(result.data.timings); // Remove trailing slashes to display data in Console for testing
            this.sendSocketNotification('MPT_RESULT', result.data.timings);
          })

          .catch(error => {
            console.error('Error:', error);
          });
  },

 socketNotificationReceived: function(notification, payload) {
            if (notification === 'GET_MPT') {
            this.getMPT(payload);
            }
  },


});
