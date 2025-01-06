<template>
    <div class="container mx-auto p-4">
        <div class="pb-2 border-b border-blue-300">
      <h4 class="text-blue-500 mt-1 font-bold">{{ $t("User Manual") }}</h4>
    </div>
      <div class="grid grid-cols-1 gap-1">
        <!-- Module: Login -->
        <div class="card bg-white shadow-lg rounded-lg p-4">
          <div class="p-4 text-blue-800 rounded-lg">
            <h3 class="font-bold text-xl">Step 1: Login</h3>
          </div>
          <div class="space-y-4 p-4">
            <!-- Section 1: Login -->
            <div class="border-b">
              <div class="flex justify-between items-center">
                <button 
                  @click="toggleSection('login')" 
                  class="w-full text-left text-blue-600 font-medium py-2"
                >
                  Step 1.1: Login
                </button>
                <span 
                  @click="toggleSection('login')" 
                  class="cursor-pointer text-gray-600"
                >
                  <svg 
                    v-if="!openSections.login" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="w-6 h-6"
                  >
                    <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 10z" clip-rule="evenodd" />
                  </svg>
                  <svg 
                    v-if="openSections.login" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="w-6 h-6"
                  >
                    <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 10z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M10 5a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5A.75.75 0 0110 5z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <div v-show="openSections.login" class="pl-4 text-gray-700">
                <p>Description of how to log in.</p>
                <img src="https://via.placeholder.com/150" alt="Login screenshot" />
              </div>
            </div>
  
            <!-- Section 2: Forgot Password -->
            <div class="border-b">
              <div class="flex justify-between items-center">
                <button 
                  @click="toggleSection('forgotPassword')" 
                  class="w-full text-left text-blue-600 font-medium py-2"
                >
                  Step 1.2: Forgot Password
                </button>
                <span 
                  @click="toggleSection('forgotPassword')" 
                  class="cursor-pointer text-gray-600"
                >
                  <svg 
                    v-if="!openSections.forgotPassword" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="w-6 h-6"
                  >
                    <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 10z" clip-rule="evenodd" />
                  </svg>
                  <svg 
                    v-if="openSections.forgotPassword" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="w-6 h-6"
                  >
                    <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 10z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M10 5a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5A.75.75 0 0110 5z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <div v-show="openSections.forgotPassword" class="pl-4 text-gray-700">
                <p>Description of how to reset your password.</p>
                <img src="https://via.placeholder.com/150" alt="Forgot Password screenshot" />
              </div>
            </div>
  
            <!-- Section 3: Reset Password -->
            <div>
              <div class="flex justify-between items-center">
                <button 
                  @click="toggleSection('resetPassword')" 
                  class="w-full text-left text-blue-600 font-medium py-2"
                >
                  Step 1.3: Reset Password
                </button>
                <span 
                  @click="toggleSection('resetPassword')" 
                  class="cursor-pointer text-gray-600"
                >
                  <svg 
                    v-if="!openSections.resetPassword" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="w-6 h-6"
                  >
                    <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 10z" clip-rule="evenodd" />
                  </svg>
                  <svg 
                    v-if="openSections.resetPassword" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="w-6 h-6"
                  >
                    <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 10z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M10 5a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5A.75.75 0 0110 5z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <div v-show="openSections.resetPassword" class="pl-4 text-gray-700">
                <p>Step to reset the password.</p>
                <img src="https://via.placeholder.com/150" alt="Reset Password screenshot" />
              </div>
            </div>
          </div>
        </div>
  
        <!-- Module: Client Management -->
        <div class="card bg-white shadow-md rounded-lg p-4 border-t border-gray-300">
          <div class="p-4 text-blue-800 rounded-lg">
            <h3 class="font-bold text-xl">Step 2: Client Management</h3>
          </div>
          <div class="space-y-4 p-4">
            <!-- Section 1: Add Client -->
            <div class="border-b">
              <div class="flex justify-between items-center">
                <button 
                  @click="toggleSection('addClient')" 
                  class="w-full text-left text-blue-600 font-medium py-2"
                >
                  Step 2.1: Add Client
                </button>
                <span 
                  @click="toggleSection('addClient')" 
                  class="cursor-pointer text-gray-600"
                >
                  <svg 
                    v-if="!openSections.addClient" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="w-6 h-6"
                  >
                    <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 10z" clip-rule="evenodd" />
                  </svg>
                  <svg 
                    v-if="openSections.addClient" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="w-6 h-6"
                  >
                    <path fill-rule="evenodd" d="M5 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 10z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M10 5a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5A.75.75 0 0110 5z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <div v-show="openSections.addClient" class="pl-4 text-gray-700">
                <p>Instructions for adding a new client.</p>
                <img src="https://via.placeholder.com/150" alt="Add Client screenshot" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white text-black dark:bg-gray-900 dark:text-white p-4">
  This content changes based on dark mode.
</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        openSections: {
          login: false,
          forgotPassword: false,
          resetPassword: false,
          addClient: false
        }
      };
    },
    methods: {
      toggleSection(section) {
        console.log(0.08*100);
        this.openSections[section] = !this.openSections[section];
      }
    }
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS should handle most of the styling, but here we can include custom styles if necessary */
  </style>
  