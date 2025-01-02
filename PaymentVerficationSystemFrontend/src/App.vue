<template>
<router-view :key="$route.fullPath"></router-view>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
export default {
  data() {
    return {
      serviceBanks: [],
      blockBanks: [],
      inactivityTimeout: null, // Timeout for inactivity
      inactivityDuration: 30* 60 * 1000, // 30 minutes
    };
  },
  created() {
  this.$store.dispatch('fetchBanks');
  setInterval(() => {
    this.$store.dispatch('fetchBanks');
  }, 60000); // Fetch every 60 seconds
},

mounted() {
    // Check if the user is already logged in
    this.checkUserSession();

    // Add global event listeners to track user activity
    document.addEventListener('mousemove', this.resetInactivityTimer);
    document.addEventListener('keypress', this.resetInactivityTimer);
    document.addEventListener('click', this.resetInactivityTimer);

    // Start the initial inactivity timer
    this.resetInactivityTimer();
  },
  beforeDestroy() {
    // Remove the event listeners to avoid memory leaks
    document.removeEventListener('mousemove', this.resetInactivityTimer);
    document.removeEventListener('keypress', this.resetInactivityTimer);
    document.removeEventListener('click', this.resetInactivityTimer);
  },
methods:{
  resetInactivityTimer() {
    ///alert("reseted");

    //console.log("to be reseted ");

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
        this.$router.push('/'); // Redirect to login if no token
      }
  },
}

};
</script>