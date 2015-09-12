var testData = [
  {
    date: '11/21/2013',
    waterbody: 'Matadero',
    stationName: 'M1',
    lat: 37.404611,
    lng: -122.157279,
    airTemp: 16.5
  },
  {
    date: '1/30/2014',
    waterbody: 'Matadero',
    stationName: 'M1',
    lat: 37.404611,
    lng: -122.157279,
    airTemp: 17.0
  }
];

Template.wcStations.helpers({
  stations: function() {
    var stations = Stations.find().fetch();
    if(stations) {
      return stations.map(function(station, index) {
        return {
          stationName: station.stationName,
          index: index
        }
      });
    }
  }
});

Template.wcStations.events({
  'click .station': function() {
    Session.set('stationIndex', this.index);
    Session.set('dataIndex', 0);  // set it to the first sample date
  }
});

Template.wcDates.helpers({
  dates: function() {
    var stations = Stations.find().fetch();
    if(stations) {
      if(stations[Session.get('stationIndex')]) {
        var stationDates = stations[Session.get('stationIndex')];
        return stationDates.samples.map(function(data, index) {
          return {
            date: data.date,
            index: index
          }
        });
      }
    } else {
      return false;
    }

    // return testData.map(function(data, index) {
    //   return {
    //     date: data.date,
    //     index: index
    //   }
    // });
  }
});

Template.wcDates.events({
  'click .date': function() {
    Session.set('dataIndex', this.index);
  }
});

Template.wcData.helpers({
  data: function() {
    var stations = Stations.find().fetch();
    if(stations) {
      if(stations[Session.get('stationIndex')]) {
        var stationDates = stations[Session.get('stationIndex')];
        if(stationDates.samples[Session.get('dataIndex')]) {
          return stationDates.samples[Session.get('dataIndex')];
        }
      }
    }


    // if(testData[Session.get('dataIndex')]) {
    //   return testData[Session.get('dataIndex')];
    // } else {
    //   return false;
    // }
  }
});
