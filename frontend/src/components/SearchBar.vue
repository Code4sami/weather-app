<template>
  <div class="search-section">
    <form class="search-form" @submit.prevent="onSearch">
      <input 
        v-model="cityInput"
        type="text" 
        class="search-input" 
        placeholder="Enter city name (e.g., London, New York, Tokyo)"
        required
      >
      <button type="submit" class="btn" :disabled="loading">
        {{ loading ? 'Searching...' : 'Search Weather' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SearchBar',
  props: {
    loading: Boolean
  },
  emits: ['search'],
  setup(props, { emit }) {
    const cityInput = ref('');

    const onSearch = () => {
      emit('search', cityInput.value.trim());
    };

    return {
      cityInput,
      onSearch
    };
  }
};
</script>
