if(Stations.find().count() === 0) {
  Stations.insert({
    stationName: 'M1',
    lat: 37.404611,
    lng: -122.157279,
    samples: [
      {
        date: '11/21/2013',
        waterbody: 'Matadero',
        stationName: 'M1',
        lat: 37.404611,
        lng: -122.157279,
        airTemp: 16.5,
        pH: 7.61,
        turbidity: 12,
        conductivity: 1316
      },
      {
        date: '1/30/2014',
        waterbody: 'Matadero',
        stationName: 'M1',
        lat: 37.404611,
        lng: -122.157279,
        airTemp: 17.0,
        pH: 7.97,
        turbidity: '<5',
        conductivity: 2060
      },
      {
        date: '4/18/2014',
        waterbody: 'Matadero',
        stationName: 'M1',
        lat: 37.404611,
        lng: -122.157279,
        airTemp: 20.0,
        pH: 7.5,
        turbidity: 0,
        conductivity: '2.2 mS'
      },
      {
        date: '5/16/2014',
        waterbody: 'Matadero',
        stationName: 'M1',
        lat: 37.404611,
        lng: -122.157279,
        airTemp: 24.0,
        pH: 7.92,
        turbidity: 1.53,
        conductivity: 1935
      }
    ]
  });

  Stations.insert({
    stationName: 'M2',
    lat: 37.409526,
    lng: -122.138392,
    samples: [
      {
        date: '11/21/2013',
        waterbody: 'Matadero',
        stationName: 'M2',
        lat: 37.409526,
        lng: -122.138392,
        airTemp: 'No Data Available',
        pH: 7.75,
        turbidity: 20,
        conductivity: 911
      },
      {
        date: '1/30/2014',
        waterbody: 'Matadero',
        stationName: 'M2',
        lat: 37.409526,
        lng: -122.138392,
        airTemp: 15.0,
        pH: 7.82,
        turbidity: '<5',
        conductivity: 1200
      }
    ]
  });

  Stations.insert({
    stationName: 'S1',
    lat: 37.414394,
    lng: -122.189715,
    samples: [
      {
        date: '11/21/2013',
        waterbody: 'San_Francisquito',
        stationName: 'S1',
        lat: 37.409526,
        lng: -122.189715,
        airTemp: 'No Data Available',
        pH: 7.49,
        turbidity: 17.5,
        conductivity: 967
      },
      {
        date: '1/25/2014',
        waterbody: 'San_Francisquito',
        stationName: 'S1',
        lat: 37.409526,
        lng: -122.189715,
        airTemp: 9.0,
        pH: 7.82,
        turbidity: 2,
        conductivity: 1330
      },
      {
        date: '2/22/2014',
        waterbody: 'San_Francisquito',
        stationName: 'S1',
        lat: 37.409526,
        lng: -122.189715,
        airTemp: 15.0,
        pH: 7.98,
        turbidity: 3,
        conductivity: 1020
      },
      {
        date: '3/22/2014',
        waterbody: 'San_Francisquito',
        stationName: 'S1',
        lat: 37.409526,
        lng: -122.189715,
        airTemp: 16.0,
        pH: 8,
        turbidity: 3,
        conductivity: 9.8
      }
    ]
  });

  Stations.insert({
    stationName: 'S2',
    lat: 37.41364,
    lng: -122.192693,
    samples: [
      {
        date: '11/21/2014',
        waterbody: 'San_Francisquito',
        stationName: 'S2',
        lat: 37.41364,
        lng: -122.192693,
        airTemp: 10,
        pH: 7.73,
        turbidity: 2,
        conductivity: 1266
      },
      {
        date: '1/25/2014',
        waterbody: 'San_Francisquito',
        stationName: 'S2',
        lat: 37.41364,
        lng: -122.192693,
        airTemp: 15,
        pH: 8.3,
        turbidity: 5,
        conductivity: 19.8
      },
      {
        date: '3/22/2014',
        waterbody: 'San_Francisquito',
        stationName: 'S2',
        lat: 37.41364,
        lng: -122.192693,
        airTemp: 16.0,
        pH: 8.23,
        turbidity: 1.18,
        conductivity: 1500
      }
    ]
  })
}
