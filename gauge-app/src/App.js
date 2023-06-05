import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import { Box, Typography } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyA5X5VtKWj7vt-E1r0ToRL-HIeYioOIol0",
  authDomain: "iot-esp32-86ec4.firebaseapp.com",
  databaseURL: "https://iot-esp32-86ec4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-esp32-86ec4",
  storageBucket: "iot-esp32-86ec4.appspot.com",
  messagingSenderId: "186832005997",
  appId: "1:186832005997:web:dace3a6622d5444ea20864",
  measurementId: "G-8WJPF8NN0H"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const App = () => {
  const [temperature, setTemperature] = useState(0);
  const [ldr, setLDR] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [rainSensor, setRainSensor] = useState(0);

  useEffect(() => {
    const gaugeRef = database.ref('/');

    gaugeRef.on('value', (snapshot) => {
      const values = snapshot.val();

      if (values) {
        setTemperature(values.Temperature || 0);
        setLDR(values.LDR || 0);
        setHumidity(values.Humidity || 0);
        setRainSensor(values.RainSensor || 0);
      }
    });

    // Cleanup function to remove the event listener
    return () => {
      gaugeRef.off('value');
    };
  }, []);

  return (
    <div className='container'>
      <div className='title'>IOT Weather Station</div>
      <Box display="flex" justifyContent="space-between">
      <Box textAlign="center">
        <GaugeChart
          id="gauge-temperature"
          nrOfLevels={20}
          colors={['#FF5F6D', '#FFC371']}
          arcWidth={0.3}
          percent={temperature/100}
        />
        <Typography variant="h6">Temperature</Typography>
        <Typography variant="subtitle1">{temperature}</Typography>
      </Box>
      <Box textAlign="center">
        <GaugeChart
          id="gauge-ldr"
          nrOfLevels={20}
          colors={['#FF5F6D', '#FFC371']}
          arcWidth={0.3}
          percent={ldr/100}
        />
        <Typography variant="h6">LDR</Typography>
        <Typography variant="subtitle1">{ldr}</Typography>
      </Box>
      <Box textAlign="center">
        <GaugeChart
          id="gauge-humidity"
          nrOfLevels={20}
          colors={['#FF5F6D', '#FFC371']}
          arcWidth={0.3}
          percent={humidity/100}
        />
        <Typography variant="h6">Humidity</Typography>
        <Typography variant="subtitle1">{humidity}</Typography>
      </Box>
      <Box textAlign="center">
        <GaugeChart
          id="gauge-rain-sensor"
          nrOfLevels={20}
          colors={['#FF5F6D', '#FFC371']}
          arcWidth={0.3}
          percent={rainSensor/100}
          
        />
        <Typography variant="h6">Rain Sensor</Typography>
        <Typography variant="subtitle1">{rainSensor}</Typography>
      </Box>
    </Box>
    </div>
  );
};

export default App;