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

Template.wcData.events({
  'click .data': function() {
    Session.set('graphUnits', this.key);

    d3.selectAll("g").remove();

    var graphKey = Session.get('graphUnits');

    var margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    };
    var height = 240;
    var width;
    if($(window).width() > 200) {
      width = $(window).width() - 100;
    } else {
      width = $(widnow).width() - 10;
    }

    var x = d3.time.scale()
            .range([0, width]);
    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
                .ticks(d3.time.months, 1)
                .scale(x)
                .orient('bottom');

    var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left');

    // var line = d3.svg.line()
    //             .x(function(d) { return x(d.date); })
    //             .y(function(d) { return y(d.value); });

    var area = d3.svg.area()
                .interpolate('linear')
                .x(function(d) { return x(d.date); })
                .y0(height)
                .y1(function(d) { return y(d.value); });

    var zeroArea = d3.svg.area()
                .interpolate('linear')
                .x(function(d) { return x(d.date); })
                .y0(height)
                .y1(height);

    var svg = d3.select("#line-chart")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")");

    svg.append("g")
              .attr("class", "y axis")
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em");
              // .style("text-anchor", "end")
              // .text(graphKey);

    Deps.autorun(function() {
      var data = [];
      var parseDate = d3.time.format('%m/%d/%Y').parse;

      var stations = Stations.find().fetch();
      if(stations) {
        if(stations[Session.get('stationIndex')]) {
          var dates = stations[Session.get('stationIndex')].samples;
          data = [];
          dates.forEach(function(date) {
            var value = date[graphKey];
            if(typeof value !== 'number'){  // we need to make sure the y axis gets a number
              value = 0;
            }
            data.push({
              date: parseDate(date['Date']),
              value: value
            });
          });
        }
      }


      var paths = svg.selectAll("path.line")
                  .data([data]);


      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain(d3.extent(data, function(d) { return d.value; }));

      svg.select(".x.axis")
                .transition()
                .duration(1000)
                .call(xAxis);

      svg.select(".y.axis")
                .transition()
                .duration(1000)
                .call(yAxis);

      paths.enter()
            .append("path")
            .attr("class", "line")
            .attr("d", zeroArea)
            .transition()
            .duration(1000)
            .attr("d", area);

      // paths.attr('d', line);

      paths.exit().remove();

    });
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
