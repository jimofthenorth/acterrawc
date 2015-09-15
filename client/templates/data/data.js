if(Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
}

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
  }
});

Template.map.helpers({
  mapOptions: function() {
    if(GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(37.431921, -122.103168),
        zoom: 11
      };
    }
  }
});

Template.map.onCreated(function() {
  console.log('map onCreated');
    GoogleMaps.ready('map', function(map) {
      var stations = Stations.find();
      console.log('gmaps callback stations: ', stations);
        var i = 0;
        stations.forEach(function(station) {
          var marker = new google.maps.Marker({
            draggable: false,
            // animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(station.lat, station.lng),
            map: map.instance,
            id: i
          });
          google.maps.event.addListener(marker, 'click', function(event) {
            Session.set('stationIndex', this.id);
          });
          console.log('created marker: ', i);
          i++;
        });
    });
});
