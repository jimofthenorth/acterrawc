Meteor.graphFunctions = {
  makeLineChart: function () {
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

    var line = d3.svg.line()
                .interpolate('linear')
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.value); });

    var zeroLine = d3.svg.line()
                    .x(function(d) { return x(d.date); })
                    .y(height);


    /*
     * This is if we want an area graph
     */
    // var area = d3.svg.area()
    //             .interpolate('linear')
    //             .x(function(d) { return x(d.date); })
    //             .y0(height)
    //             .y1(function(d) { return y(d.value); });

    // var zeroArea = d3.svg.area()
    //             .interpolate('linear')
    //             .x(function(d) { return x(d.date); })
    //             .y0(height)
    //             .y1(height);

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
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text(graphKey);

    // Deps.autorun(function() {
      var data = [];
      var parseDate = d3.time.format('%m/%d/%Y').parse;

      var stations = Stations.find().fetch();
      if(stations) {
        if(stations[Session.get('stationIndex')]) {
          var dates = stations[Session.get('stationIndex')].samples;
          data = [];
          dates.forEach(function(date) {
            var value = date[graphKey];
            // if y-axis is not getting a number we exclude that data point
            if(typeof value === 'number') {
              data.push({
                date: parseDate(date['Date']),
                value: value
              });
            }
          });
          // make sure dates are in order for graph
          data.sort(function(a, b) {
            if(a.date > b.date) {
              return 1;
            }
            if(a.date < b.date) {
              return -1;
            }
            return 0;
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
            .attr("d", zeroLine)
            .transition()
            .duration(1000)
            .attr("d", line);

      // paths.attr('d', line);

      paths.exit().remove();

    // });  // end Deps.autorun
  }
}
