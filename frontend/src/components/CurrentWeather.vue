<template>
  <div class="weather-card current-weather">
    <div class="weather-header">
      <div>
        <h2 class="city-name">{{ data.name }}, {{ data.sys.country }}</h2>
        <p class="current-date">{{ formatDate(data.dt) }}</p>
      </div>
      <div class="weather-icon-large">{{ getWeatherIcon(data.weather[0].icon) }}</div>
    </div>

    <div class="temperature-display">
      <div class="temp-main">{{ Math.round(data.main.temp) }}°C</div>
      <div>
        <div class="weather-description">{{ data.weather[0].description }}</div>
        <div class="feels-like">
          Feels like {{ Math.round(data.main.feels_like) }}°C
        </div>
      </div>
    </div>

    <div class="weather-details">
      <div class="detail-item">
        <span class="detail-label">Humidity</span>
        <span class="detail-value">{{ data.main.humidity }}%</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Wind Speed</span>
        <span class="detail-value">{{ data.wind.speed }} m/s</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Pressure</span>
        <span class="detail-value">{{ data.main.pressure }} hPa</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Visibility</span>
        <span class="detail-value">{{ (data.visibility / 1000).toFixed(1) }} km</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentWeather',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup() {
    const getWeatherIcon = (iconCode) => {
      const icons = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '🌨️', '13n': '🌨️',
        '50d': '🌫️', '50n': '🌫️'
      };
      return icons[iconCode] || '🌤️';
    };

    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    return {
      getWeatherIcon,
      formatDate,
      Math
    };
  }
};
</script>

<style scoped>
.current-date {
  color: var(--color-text-secondary);
  margin-top: 8px;
}

.feels-like {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-top: 4px;
}
</style>

