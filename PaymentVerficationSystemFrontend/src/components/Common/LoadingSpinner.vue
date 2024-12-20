<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center bg-white z-50"
  >
    <div class="flex flex-col items-center space-y-4">
      <!-- Modern spinner with blue accent -->
      <div class="relative w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      
      <!-- Fade-in text with custom styling -->
      <span class="text-blue-800 text-xl font-semibold animate-fadeIn">Loading...</span>
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
