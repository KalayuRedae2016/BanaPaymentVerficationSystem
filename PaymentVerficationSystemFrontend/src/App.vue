<template>
<router-view :key="$route.fullPath"></router-view>
</template>



<script>
// Import the necessary styles for Font Awesome
import '@fortawesome/fontawesome-free/css/all.css';
export default {
  data() {
    return {
      serviceBanks: [],
      blockBanks: [],
      inactivityTimeout: null, // Timeout for inactivity
      inactivityDuration: 30 * 60 * 1000, // 30 minutes
    };
  },
  created() {
  this.$store.dispatch('fetchBanks');
  setInterval(() => {
    this.$store.dispatch('fetchBanks');
  }, 60000); // Fetch every 60 seconds
},


methods:{
  resetInactivityTimer() {
  // Clear the previous inactivity timer
  if (this.inactivityTimeout) {
    clearTimeout(this.inactivityTimeout);
  }
  // Start a new inactivity timer
  this.inactivityTimeout = setTimeout(() => {
    this.handleInactivity();
  }, this.inactivityDuration);
},
handleInactivity() {
  // Perform logout or token removal
  console.log('User has been inactive for 30 minutes. Logging out.');
  localStorage.removeItem('token'); // Remove the token from local storage
  this.$router.push('/'); // Redirect to login page
},
   checkUserSession() {
      // Optionally verify if the token exists and is valid
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login'); // Redirect to login if no token
      }
  },
}

};
</script>