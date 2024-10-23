<template>
    <div>
      <label for="radius">Radius:</label>
      <input type="number" v-model="radius" id="radius" />
      
      <p>Area: {{ area }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        radius: 0
      };
    },
    computed: {
      area() {
        return Math.PI * Math.pow(this.radius, 2);
      }
    },
    watch: {
      radius(newRadius, oldRadius) {
        console.log(`Radius changed from ${oldRadius} to ${newRadius}`);
        console.log(Math.PI * Math.pow(this.radius, 2));
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
  