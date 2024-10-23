<template>
    <div v-if="isVisible">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                <div class="flex items-center justify-center mb-4">
                  <!-- Success Icon -->
                  <svg
                    v-if="type === 'success'"
                    class="w-8 h-10 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <!-- Error Icon -->
                  <svg
                    v-if="type === 'error'"
                    class="w-8 h-10 text-red-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  <h2 class="text-md font-bold text-gray-800">{{ header }}</h2>
                </div>
                <p class="text-gray-600 text-md">{{ body }}</p>
                <button
                  @click="closeModal"
                  class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {{ actionLabel }}
                </button>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      type: {
        type: String,
        default: 'success' // Default to 'success' type
      },
      header: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      actionLabel: {
        type: String,
        default: 'OK' // Default action label
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  /* No additional styles needed for Tailwind CSS */
  </style>
  