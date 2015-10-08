Meteor.methods({
  updateData: function(json) {
    // Security checks
    if(!this.userId) {
      throw new Meteor.Error(403, "Must be logged in to perform this operation!");
    }
    if(!Meteor.users.findOne({_id: this.userId}).isAdmin) {
      throw new Meteor.Error(403, "Must have admin priviledges to perform this operation!");
    }

    // If somehow a way is found to bypass the above checks
    // we can at least check in the affirmative to see if user is admin
    if(Meteor.users.findOne({_id: this.userId}).isAdmin) {

      // Sort so stations are grouped together by stationId
      var data = json.data.sort(function(a, b) {
        if(a['Station'] > b['Station']) {
          return 1;
        } else if(a['Station'] < b['Station']) {
          return -1;
        }
        return 0;
      });

      Stations.remove({});  // remove all stations

      var prevStation = data[0]['Station'];
      // Make our initial object to insert
      var objToInsert = {
        stationId: data[0]['Station'],
        lat: data[0]['Lat'],
        lng: data[0]['Lng'],
        waterBody: data[0]['Waterbody'],
        samples: []
      }
      for(var i = 0; i < data.length; i++) {
        if(prevStation === data[i]['Station']) {
          // Keep adding to the objToInsert samples array
          var sample = {};
          for(prop in data[i]) {
            // MongoDB does not allow $ or . in key names
            var cleanProp = prop.replace(/[$.]/g, '');
            sample[cleanProp] = data[i][prop];
          }
          objToInsert.samples.push(sample);
        } else {
          // Insert the assembled object for Stations.insert into the database
          Stations.insert(objToInsert);
          // console.log('DB INSERT: ', objToInsert);
          // Create a new object for Stations.insert
          objToInsert = {
            stationId: data[i]['Station'],
            lat: data[i]['Lat'],
            lng: data[i]['Lng'],
            waterBody: data[i]['Waterbody'],
            samples: []
          }
        }
        prevStation = data[i]['Station'];
      }
      // Insert last station
      Stations.insert(objToInsert);

      return "Success";
    }
  }
});
