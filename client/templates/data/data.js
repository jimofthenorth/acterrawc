Template.wcStations.helpers({
  stations: function() {
    var stations = Stations.find().fetch();
    if(stations) {
      return stations.map(function(station, index) {
        return {
          stationId: station.samples[0]['Station Name'],
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

Template.wcStationInfo.helpers({
  info: function() {
    var stations = Stations.find().fetch();
    if(stations) {
      if(stations[Session.get('stationIndex')]) {
        return stations[Session.get('stationIndex')];
      }
    } else {
      return false;
    }
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
          var keyCount = 0;
          var data = stationDates.samples[Session.get('dataIndex')];
          for(key in data) {
            var isDataKey = true;
            if(key === 'Date' || key === 'Waterbody' || key === 'Station'
              || key === 'Lat' || key === 'Lng') {
            // if(typeof data[key] !== 'number' || key === 'Lat' || key === 'Lng') {
              isDataKey = false;
            }
            if(isDataKey) {
              results.push({key: key});
              keyCount++;
            }
          }
          return {
            results: results,
            keyCount: keyCount
          }
        }
      }
    }
  }
});

Template.wcData.events({
  'click .data-block-button': function() {
    var stations = Stations.find().fetch();
    var data = stations[Session.get('stationIndex')];
    var nums = 0;

    // Here we check to see if we have at least two points of numeric data
    // for the graph
    for(var i = 0; i < data.samples.length; i++) {
      if(typeof data.samples[i][this.key] === 'number') {
        nums += 1;
      }
    }
    Session.set('graphUnits', this.key);  // Either way we will set graphUnits
    if(nums > 1) {  // need at least 2 points to make a line
      Session.set('displayGraph', true);
      Meteor.graphFunctions.makeLineChart();
    } else {
      d3.selectAll("g").remove();  // clear any existing graph
      Session.set('displayGraph', false);
    }
  }
});

Template.wcComments.helpers({
  data: function() {
    var stations = Stations.find().fetch();

    // On first load this is undefined, so we set it
    if(!Session.get('stationIndex')) {
      Session.set('stationIndex', 0);
    }

    var data = stations[Session.get('stationIndex')].samples;
    var parseDate = d3.time.format('%m/%d/%Y').parse;

    data.sort(function(a, b) {
      var aDate = parseDate(a['Date']);
      var bDate = parseDate(b['Date']);
      if(aDate > bDate) {
        return 1;
      }
      if(aDate < bDate) {
        return -1;
      }
      return 0;
    });

    var results = [];

    if(!Session.get('displayGraph')) {
      // Shrink the graph down to nothing
      var svg = d3.select("#line-chart")
          .attr("width", 0)
          .attr("height", 0);

      data.forEach(function(d) {
        results.push({
          date: d['Date'],
          comment: d[Session.get('graphUnits')]
        });
      });
      return results;
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
        zoom: 11,
        scrollwheel: false,
        chartCallback: Meteor.graphFunctions
      };
    }
  }
});

Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
        var i = 0;
        var lastOpen;

        this.stations = Stations.find().fetch();
        this.stations.forEach(function(station) {
          var content = '<div class="info-window>"' +
            '<div class="info-window-station">Station: ' + station.stationId + '</div>' +
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

          // Build up an array of possible units to select from.
          // We want only numeric values and we don't want latitude
          // or longitude.
          var graphUnits = [];
          if(typeof station.samples[0] === 'object') {
            for(key in station.samples[0]) {
              if(key !== 'Lat' && key !== 'Lng' &&
                typeof station.samples[0][key] === 'number') {
                graphUnits.push(key);
              }
            }
          }
          var randomUnit = graphUnits[Math.floor(Math.random() * graphUnits.length)];

          google.maps.event.addListener(marker, 'click', function(event) {
            Session.set('stationIndex', this.id);
            Session.set('dataIndex', 0);
            Session.set('graphUnits', randomUnit);
            Meteor.graphFunctions.makeLineChart();
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

Template.admin.events({
  'click .read-csv': function(event, template) {
    event.preventDefault();
    Papa.parse(template.find("#csv-file").files[0], {
      header: true,
      dynamicTyping: true, // parse numbers as numbers, strings as strings
      complete: function(results) {
        console.log("Finished parse: ", results);
        Meteor.call("updateData", results, function() {
          console.log("Finished call to server");
        })
      }
    });
  }
});
