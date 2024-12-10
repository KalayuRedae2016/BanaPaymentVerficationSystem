<template>
<router-view :key="$route.fullPath"></router-view>
</template>



<script>
// Import the necessary styles for Font Awesome
import '@fortawesome/fontawesome-free/css/all.css';

import axios from 'axios';

export default {
  data() {
    return {
      serviceBanks: [],
      blockBanks: [],
    };
  },
  created() {
  this.$store.dispatch('fetchBanks');
  setInterval(() => {
    this.$store.dispatch('fetchBanks');
  }, 60000); // Fetch every 60 seconds
},

};
</script>