if(Stations.find().count() === 0) {
  Stations.insert({
    stationName: 'M1',
    samples: [
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
    ]
  });

  Stations.insert({
    stationName: 'M2',
    samples: [
      {
        date: '12/21/2013',
        waterbody: 'Matadero',
        stationName: 'M2',
        lat: 37.409526,
        lng: -122.138392,
        airTemp: 'No Data Available'
      },
      {
        date: '2/30/2014',
        waterbody: 'Matadero',
        stationName: 'M2',
        lat: 37.409526,
        lng: -122.138392,
        airTemp: 15.0
      }
    ]
  });
}
