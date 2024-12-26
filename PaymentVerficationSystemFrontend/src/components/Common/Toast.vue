<template>
  <div>
    <!-- Success Toast -->
    <transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transform transition duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="showSuccessToast"
        class="z-20 fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
        role="alert"
      >
        <strong class="font-bold"></strong>
        <span class="block sm:inline">{{ successToastMessage }}</span>
      </div>
    </transition>

    <!-- Error Toast -->
    <transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transform transition duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="showErrorToast"
        class="z-20 fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
        role="alert"
      >
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ errorToastMessage }}</span>
      </div>
    </transition>

    <!-- Warning Toast -->
    <transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transform transition duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="showWarningToast"
        class="z-20 fixed top-5 right-5 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg"
        role="alert"
      >
        <strong class="font-bold">Warning!</strong>
        <span class="block sm:inline">{{ warningToastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      successToastMessage: '',
      errorToastMessage: '',
      warningToastMessage: '',
      showSuccessToast: false,
      showErrorToast: false,
      showWarningToast: false,
    };
  },
  methods: {
    showSuccessToastMessage(message) {
      this.successToastMessage = message;
      this.showSuccessToast = true;
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 3000);
    },
    showErrorToastMessage(message) {
      this.errorToastMessage = message;
      this.showErrorToast = true;
      setTimeout(() => {
        this.showErrorToast = false;
      }, 3000);
    },
    showWarningToastMessage(message) {
      this.warningToastMessage = message;
      this.showWarningToast = true;
      setTimeout(() => {
        this.showWarningToast = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.toast-transition-enter-active,
.toast-transition-leave-active {
  transition: all 0.3s ease;
}

.toast-transition-enter,
.toast-transition-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
