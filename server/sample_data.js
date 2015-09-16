if(Stations.find().count() === 0) {
  Stations.insert({
    stationName: 'M1',
    lat: 37.404611,
    lng: -122.157279,
    waterBody: 'Matadero',
    samples: [
      {
        'Date': '11/21/2013',
        'Water Body': 'Matadero',
        'Station Name': 'M1',
        'Air Temperature': 16.5,
        'pH': 7.61,
        'Turbidity': 12,
        'Conductivity': 1316
      },
      {
        'Date': '1/30/2014',
        'Water Body': 'Matadero',
        'Station Name': 'M1',
        'Air Temperature': 17.0,
        'pH': 7.97,
        'Turbidity': '<5',
        'Conductivity': 2060
      },
      {
        'Date': '4/18/2014',
        'Water Body': 'Matadero',
        'Station Name': 'M1',
        'Air Temperature': 20.0,
        'pH': 7.5,
        'Turbidity': 0,
        'Conductivity': '2.2 mS'
      },
      {
        'Date': '5/16/2014',
        'Water Body': 'Matadero',
        'Station Name': 'M1',
        'Air Temperature': 24.0,
        'pH': 7.92,
        'Turbidity': 1.53,
        'Conductivity': 1935
      }
    ]
  });

  Stations.insert({
    stationName: 'M2',
    lat: 37.409526,
    lng: -122.138392,
    waterBody: 'Matadero',
    samples: [
      {
        'Date': '11/21/2013',
        'Water Body': 'Matadero',
        'Station Name': 'M2',
        'Air Temperature': 'No Data Available',
        'pH': 7.75,
        'Turbidity': 20,
        'Conductivity': 911
      },
      {
        'Date': '1/30/2014',
        'Water Body': 'Matadero',
        'Station Name': 'M2',
        'Air Temperature': 15.0,
        'pH': 7.82,
        'Turbidity': '<5',
        'Conductivity': 1200
      }
    ]
  });

  Stations.insert({
    stationName: 'S1',
    lat: 37.414394,
    lng: -122.189715,
    waterBody: 'San_Francisquito',
    samples: [
      {
        'Date': '11/21/2013',
        'Water Body': 'San_Francisquito',
        'Station Name': 'S1',
        'Air Temperature': 'No Data Available',
        'pH': 7.49,
        'Turbidity': 17.5,
        'Conductivity': 967
      },
      {
        'Date': '1/25/2014',
        'Water Body': 'San_Francisquito',
        'Station Name': 'S1',
        'Air Temperature': 9.0,
        'pH': 7.82,
        'Turbidity': 2,
        'Conductivity': 1330
      },
      {
        'Date': '2/22/2014',
        'Water Body': 'San_Francisquito',
        'Station Name': 'S1',
        'Air Temperature': 15.0,
        'pH': 7.98,
        'Turbidity': 3,
        'Conductivity': 1020
      },
      {
        'Date': '3/22/2014',
        'Water Body': 'San_Francisquito',
        'Station Name': 'S1',
        'Air Temperature': 16.0,
        'pH': 8,
        'Turbidity': 3,
        'Conductivity': 9.8
      }
    ]
  });

  Stations.insert({
    stationName: 'S2',
    lat: 37.41364,
    lng: -122.192693,
    waterBody: 'San_Francisquito',
    samples: [
      {
        'Date': '11/21/2014',
        'Water Body': 'San_Francisquito',
        'Station Name': 'S2',
        'Air Temperature': 10,
        'pH': 7.73,
        'Turbidity': 2,
        'Conductivity': 1266
      },
      {
        'Date': '1/25/2014',
        'Water Body': 'San_Francisquito',
        'Station Name': 'S2',
        'Air Temperature': 15,
        'pH': 8.3,
        'Turbidity': 5,
        'Conductivity': 19.8
      },
      {
        'Date': '3/22/2014',
        'Water Body': 'San_Francisquito',
        'Station Name': 'S2',
        'Air Temperature': 16.0,
        'pH': 8.23,
        'Turbidity': 1.18,
        'Conductivity': 1500
      }
    ]
  })
}
