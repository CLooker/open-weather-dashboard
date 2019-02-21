const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
if (!process.env.NODE_ENV) require('dotenv').config();
const router = express.Router();
const { apiKey } = process.env;

router.get('/alerts', async (req, res) => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/3.0/triggers?&APPID=${apiKey}`
  );

  const data = await resp.json();

  res.send(data);
});

router.post('/alerts', async (req, res) => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/3.0/triggers?&APPID=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: req.body
    }
  );

  const data = await resp.json();

  res.send(data);
});

router.get('/pollution', async (req, res) => {
  const pollutants = {
    co: {
      precision: 0,
      pressure: 0,
      value: 0
    },
    so2: {
      precision: 0,
      pressure: 0,
      value: 0
    }
  };

  for (const pollutant in pollutants) {
    const resp = await fetch(
      `https://api.openweathermap.org/pollution/v1/${pollutant}/41,12/current.json?appid=${apiKey}`
    );

    const json = await resp.json();

    const { data } = json;
    const { length } = data;

    const accumulatedData = data.reduce(
      (accumulatedData, dataObj) => ({
        precision: accumulatedData.precision + dataObj.precision,
        pressure: accumulatedData.pressure + dataObj.pressure,
        value: accumulatedData.value + dataObj.value
      }),
      pollutants[pollutant]
    );

    const averagedData = {
      precision: accumulatedData.precision / length,
      pressure: accumulatedData.pressure / length,
      value: accumulatedData.value / length
    };

    pollutants[pollutant] = averagedData;
  }

  res.send(pollutants);
});

router.get('/current', async (req, res) => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Rome&units=imperial&APPID=${apiKey}`
  );

  const data = await resp.json();

  res.send(data);
});
router.get('/forecast', async (req, res) => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=6539761&units=imperial&APPID=${apiKey}`
  );

  const data = await resp.json();

  res.send(data);
});

const PORT = process.env.PORT || 8080;

express()
  .use('/api', router)
  .use(express.static(path.join(__dirname, 'client/build')))
  .listen(PORT, () => console.log(`server is listening on port ${PORT}`));
