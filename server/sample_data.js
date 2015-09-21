if(Stations.find().count() === 0) {
  Stations.insert({
    stationName: 'M1',
    lat: 37.404611,
    lng: -122.157279,
    waterBody: 'Matadero Creek',
    samples: [
      {
        'Date': '11/21/2013',
        'Water Body': 'Matadero Creek',
        'Station Name': 'M1',
        'Air Temperature (Degrees C)': 16.5,
        'pH': 7.61,
        'Turbidity (NTU/JTU)': 12,
        'Conductivity (µS)': 1316
      },
      {
        'Date': '1/30/2014',
        'Water Body': 'Matadero Creek',
        'Station Name': 'M1',
        'Air Temperature (Degrees C)': 17.0,
        'pH': 7.97,
        'Turbidity (NTU/JTU)': '<5',
        'Conductivity (µS)': 2060
      },
      {
        'Date': '4/18/2014',
        'Water Body': 'Matadero Creek',
        'Station Name': 'M1',
        'Air Temperature (Degrees C)': 20.0,
        'pH': 7.5,
        'Turbidity (NTU/JTU)': 0,
        'Conductivity (µS)': '2.2 mS'
      },
      {
        'Date': '5/16/2014',
        'Water Body': 'Matadero Creek',
        'Station Name': 'M1',
        'Air Temperature (Degrees C)': 24.0,
        'pH': 7.92,
        'Turbidity (NTU/JTU)': 1.53,
        'Conductivity (µS)': 1935
      }
    ]
  });

  Stations.insert({
    stationName: 'M2',
    lat: 37.409526,
    lng: -122.138392,
    waterBody: 'Matadero Creek',
    samples: [
      {
        'Date': '11/21/2013',
        'Water Body': 'Matadero Creek',
        'Station Name': 'M2',
        'Air Temperature (Degrees C)': 'No Data Available',
        'pH': 7.75,
        'Turbidity (NTU/JTU)': 20,
        'Conductivity (µS)': 911
      },
      {
        'Date': '1/30/2014',
        'Water Body': 'Matadero Creek',
        'Station Name': 'M2',
        'Air Temperature (Degrees C)': 15.0,
        'pH': 7.82,
        'Turbidity (NTU/JTU)': '<5',
        'Conductivity (µS)': 1200
      }
    ]
  });

  Stations.insert({
    stationName: 'S1',
    lat: 37.414394,
    lng: -122.189715,
    waterBody: 'San Francisquito Creek',
    samples: [
      {
        'Date': '11/21/2013',
        'Water Body': 'San Francisquito Creek',
        'Station Name': 'S1',
        'Air Temperature (Degrees C)': 'No Data Available',
        'pH': 7.49,
        'Turbidity (NTU/JTU)': 17.5,
        'Conductivity (µS)': 967
      },
      {
        'Date': '1/25/2014',
        'Water Body': 'San Francisquito Creek',
        'Station Name': 'S1',
        'Air Temperature (Degrees C)': 9.0,
        'pH': 7.82,
        'Turbidity (NTU/JTU)': 2,
        'Conductivity (µS)': 1330
      },
      {
        'Date': '2/22/2014',
        'Water Body': 'San Francisquito Creek',
        'Station Name': 'S1',
        'Air Temperature (Degrees C)': 15.0,
        'pH': 7.98,
        'Turbidity (NTU/JTU)': 3,
        'Conductivity (µS)': 1020
      },
      {
        'Date': '3/22/2014',
        'Water Body': 'San Francisquito Creek',
        'Station Name': 'S1',
        'Air Temperature (Degrees C)': 16.0,
        'pH': 8,
        'Turbidity (NTU/JTU)': 3,
        'Conductivity (µS)': 9.8
      }
    ]
  });

  Stations.insert({
    stationName: 'S2',
    lat: 37.41364,
    lng: -122.192693,
    waterBody: 'San Francisquito Creek',
    samples: [
      {
        'Date': '11/21/2013',
        'Water Body': 'San Francisquito Creek',
        'Station Name': 'S2',
        'Air Temperature (Degrees C)': 10,
        'pH': 7.73,
        'Turbidity (NTU/JTU)': 2,
        'Conductivity (µS)': 1266
      },
      {
        'Date': '1/25/2014',
        'Water Body': 'San Francisquito Creek',
        'Station Name': 'S2',
        'Air Temperature (Degrees C)': 15,
        'pH': 8.3,
        'Turbidity (NTU/JTU)': 5,
        'Conductivity (µS)': 19.8
      },
      {
        'Date': '3/22/2014',
        'Water Body': 'San Francisquito Creek',
        'Station Name': 'S2',
        'Air Temperature (Degrees C)': 16.0,
        'pH': 8.23,
        'Turbidity (NTU/JTU)': 1.18,
        'Conductivity (µS)': 1500
      }
    ]
  })
}

if(Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: Meteor.settings.adminName,
    password: Meteor.settings.adminPw
  });
}
