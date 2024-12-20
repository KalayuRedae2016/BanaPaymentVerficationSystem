<template>
    <div
      v-if="visible"
      class="fixed inset-0 flex items-center justify-center bg-white z-50"
    >
      <div class="flex flex-col items-center space-y-6"> 
        
        <!-- Error Message (if any) -->
        <div v-if="message" class="text-red-500 text-lg font-semibold">
          {{ message }} !!!
        </div>
  
        <!-- Reload Button -->
        <button
          @click="$reloadPage()"
          class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Reload Current Page
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      message: {
        type: String,
        default: '', // Default is an empty string
      },
    },
    methods: {
      
    },
  };
  </script>
  
  <style scoped>
  /* Keyframes for fade-in effect */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  /* Apply fade-in effect to text */
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  /* Optional: Customize the spinner if needed */
  </style>
  