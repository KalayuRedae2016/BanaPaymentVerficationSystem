<template>
  
    <div
      v-if="isReloading"
      class="fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-1000 ease-in-out"
      :class="{ 'opacity-0': isFading, 'opacity-100': !isFading }"
    >
      <div class="flex flex-col items-center space-y-6">
        <div class="relative w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        isReloading: false,
        isFading: false,
      };
    },
    methods: {
      startSmoothReload() {
        this.isReloading = true;
        // Start fade-out effect after a short delay
        setTimeout(() => {
          this.isFading = true;
          setTimeout(() => {
            this.isReloading=false;
            this.isFading = false;
          }, 1000); // Match fade duration
        }, 500); // Optional delay before fade starts
      },
    },
  };
  </script>
  
  <style scoped>
  /* Keyframe for fade-in effect */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  /* Apply fade-in effect */
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  /* Modern spinner styling */
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  