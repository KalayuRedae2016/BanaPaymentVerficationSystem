<template>
  <div class="relative overflow-hidden inline-block">
    <button
      @click="createRipple"
      class="px-6 py-2 bg-blue-500 text-white rounded-full focus:outline-none relative"
    >
      Click Me
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    createRipple(event) {
      const button = event.target;
      const ripple = document.createElement("span");

      const size = Math.max(button.offsetWidth, button.offsetHeight);
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      ripple.classList.add("absolute", "rounded-full", "bg-white", "opacity-50", "animate-ripple");

      button.appendChild(ripple);

      // Remove ripple after animation
      ripple.addEventListener("animationend", () => {
        ripple.remove();
      });
    }
  }
};
</script>

<style scoped>
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 0.6s linear;
}
</style>
