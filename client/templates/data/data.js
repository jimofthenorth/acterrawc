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
            date: data['Date'],
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
          var results = [];
          var data = stationDates.samples[Session.get('dataIndex')];
          results.push({key: 'Latitude', value: stationDates.lat});
          results.push({key: 'Longitude', value: stationDates.lng});
          for(key in data) {
            results.push({key: key, value: data[key]});
          }
          return results;
        }
      }
    }
  }
});

if(Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
}

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
    GoogleMaps.ready('map', function(map) {
        var i = 0;
        var lastOpen;
        this.stations = Stations.find().fetch();
        console.log(this.stations);
        this.stations.forEach(function(station) {
          var content = '<div class="info-window>"' +
            '<div class="info-window-station">Station: ' + station.stationName + '</div>' +
            '<div class="info-window-body">Water Body: ' + station.waterBody + '</div>' +
            '<div class="info-window-body">Latitude: ' + station.lat + '</div>' +
            '<div class="info-window-body">Longitude: ' + station.lng + '</div>' +
            '</div>';

          var infowindow = new google.maps.InfoWindow({
            content: content
          });

          var marker = new google.maps.Marker({
            draggable: false,
            position: new google.maps.LatLng(station.lat, station.lng),
            map: map.instance,
            id: i
          });

          google.maps.event.addListener(marker, 'click', function(event) {
            Session.set('stationIndex', this.id);
            Session.set('dataIndex', 0);
            if(lastOpen) {
              lastOpen.close();
            }
            lastOpen = infowindow;
            infowindow.open(map.instance, marker);
          });

          i++;
        });
    });
});
