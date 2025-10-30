<template>
  <div class="forecast-section">
    <h2 class="forecast-title">5-Day Forecast</h2>
    <div class="forecast-grid">
      <div 
        v-for="day in dailyForecasts" 
        :key="day.dt"
        class="forecast-card"
      >
        <div class="forecast-date">{{ formatShortDate(day.dt) }}</div>
        <div class="forecast-icon">{{ getWeatherIcon(day.weather[0].icon) }}</div>
        <div class="forecast-temp">{{ Math.round(day.main.temp) }}°C</div>
        <div class="forecast-desc">{{ day.weather[0].description }}</div>
        <div class="forecast-minmax">
          H: {{ Math.round(day.main.temp_max) }}° L: {{ Math.round(day.main.temp_min) }}°
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'Forecast',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const dailyForecasts = computed(() => {
      // Get one forecast per day (ensuring we get 5 days)
      const seenDates = new Set();
      const forecasts = [];
      
      for (const item of props.data.list) {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!seenDates.has(dateKey) && forecasts.length < 5) {
          seenDates.add(dateKey);
          forecasts.push(item);
        }
        
        if (forecasts.length === 5) break;
      }
      
      return forecasts;
    });

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

    const formatShortDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    return {
      dailyForecasts,
      getWeatherIcon,
      formatShortDate,
      Math
    };
  }
};
</script>

<style scoped>
.forecast-minmax {
  margin-top: 8px;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
