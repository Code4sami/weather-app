const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

app.get('/api/weather/current/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = req.query.apiKey || process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }
    const response = await axios.get(WEATHER_API_URL + '/weather', {
      params: { q: city, appid: apiKey, units: 'metric' }
    });
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        error: error.response.data.message || 'Failed to fetch weather data'
      });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

app.get('/api/weather/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = req.query.apiKey || process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }
    const response = await axios.get(WEATHER_API_URL + '/forecast', {
      params: { q: city, appid: apiKey, units: 'metric' }
    });
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        error: error.response.data.message || 'Failed to fetch forecast data'
      });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Weather API is running' });
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
