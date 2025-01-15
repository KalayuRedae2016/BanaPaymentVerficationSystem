<template>
    <div class="flex mt-32 ml-64 h-screen">
      <Toast  ref="toast"/>
      <div>
        <button 
          @click="registerSampleUsers" 
          class="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Register Sample Users
        </button>
        <div v-if="showErrorMessage" class="mt-4 text-red-500 font-medium">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Toast from '../../Common/Toast.vue'
  export default {
    components:{
    Toast,
    },
    data() {
      return {
        userCount: 20,
        showErrorMessage: false,
        errorMessage: "",
      };
    },
    methods: {
      async registerSampleUsers() {
        const users = [];
        for (let i = 0; i < this.userCount; i++) {
          users.push({
            firstName: `bana ${i + 1}`,
            middleName: `Muser${i + 1}`,
            lastName: `Luser${i + 1}`,
            gender: i % 2 === 0 ? "Male" : "Female",
            age: 20 + (i % 10),
            address: `Mekelle${i + 1}`,
            email: `banauser${i + 1}@gmail.com`,
            phoneNumber: `+251911${100000 + i}`,
            role: "User",
            tigrignaName: `ዳኔልዳኔል ${i + 1}`,
          });
        }
        try {
          const response = await this.$apiPost("/api/v1/users/insertMultipleUsers", { users });
          if (response.status === 1) {
            console.log("All users registered successfully!", response);
            this.$refs.toast.showSuccessToastMessage("Users Imported Successfully");
          }
        } catch (error) {
          this.showErrorMessage = true;
          this.errorMessage = `Failed to register users: ${error.message}`;
          console.error("Error registering users:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind styles are already included in your project */
  </style>
  