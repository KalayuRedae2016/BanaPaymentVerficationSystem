<template>
    <div
      v-if="visible"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
    >
      <div class="flex flex-col items-center space-y-4">
        <svg
          class="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span class="text-white text-lg">Loading...</span>
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
    },
  };
  </script>
  
  <style scoped>
  /* Optional: Add any specific styles */
  </style>
  