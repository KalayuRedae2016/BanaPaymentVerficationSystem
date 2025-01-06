<template>
    <button
      @click="confirmDelete"
      class="m-32 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
     Reset Tables
    </button>
  </template>
  
  <script>
  export default {
    methods: {
      confirmDelete() {
        if (confirm("Are you sure you want to delete this user?")) {
         this.$apiClient.delete('/admindashboard/reset-tables','').then(response=>{
            console.log("response",response);
         })
        }
      },
    
    },
  };
  </script>
  