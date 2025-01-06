<template>
  <div class="">
    <Toast ref="toast"/>
    <button
      @click="confirmDelete"
      class="m-32 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
     Reset Tables
    </button>
</div>
  </template>
  
  <script>
  import Toast from './Toast.vue'
  export default {
    components:{
     Toast,
    },
    methods: {
      confirmDelete() {
       if (confirm("Are you sure you want to delete this user?")) {

        try { this.$apiClient.delete('/api/v1/reset/resetAll').then(response=>{

            // alert("in response");

            console.log("response",response);
            console.log("response",response.message);
            this.$refs.toast.showSuccessToastMessage("Tables Reset Successfully");

             this.$store.dispatch("logout");
             this.$router.push("/");
         })
        }catch(error){

         }finally{

         }
        }
      },
    
    },
  };
  </script>
  