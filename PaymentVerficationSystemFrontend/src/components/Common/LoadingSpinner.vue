<template>
    <div
      v-if="loading"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="flex flex-col items-center">
        <div class="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      
          <p class="mt-4 text-white text-lg font-semibold">{{ message }}</p>
      
    </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      loading: {
        type: Boolean,
        required: true,
      },
      message: {
        type: String,
        default: "Loading...", // Default loading message
      },
    },
  };
  </script>
  
  <style scoped>
  /* No custom styles needed; Tailwind takes care of it. */
  </style>
  