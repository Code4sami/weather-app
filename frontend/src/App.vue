<template>
  <div class="app">
    <div class="container">
      <header class="header">
        <h1>🌤️ Weather Dashboard</h1>
        <p>Get real-time weather information and forecasts for any city</p>
      </header>

      <SearchBar 
        @search="handleSearch" 
        :loading="loading"
      />

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="loading" class="loading">
        Loading weather data...
      </div>

      <div v-if="weatherData && !loading" class="weather-content">
        <CurrentWeather :data="weatherData.current" />
        <Forecast :data="weatherData.forecast" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import SearchBar from './components/SearchBar.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import Forecast from './components/Forecast.vue';

export default {
  name: 'App',
  components: {
    SearchBar,
    CurrentWeather,
    Forecast
  },
  setup() {
    const weatherData = ref(null);
    const loading = ref(false);
    const error = ref('');

    const handleSearch = async (city) => {
      if (!city) {
        error.value = 'Please enter a city name';
        return;
      }

      loading.value = true;
      error.value = '';
      weatherData.value = null;

      try {
        const [currentResponse, forecastResponse] = await Promise.all([
          axios.get('/api/weather/current/' + encodeURIComponent(city)),
          axios.get('/api/weather/forecast/' + encodeURIComponent(city))
        ]);

        weatherData.value = {
          current: currentResponse.data,
          forecast: forecastResponse.data
        };
      } catch (err) {
        error.value = err.response?.data?.error || 'Failed to fetch weather data. Please check the city name.';
      } finally {
        loading.value = false;
      }
    };

    return {
      weatherData,
      loading,
      error,
      handleSearch
    };
  }
};
</script>
