<template>
    <div :class="{ 'dark': isDarkMode }" class="flex h-screen">
      <!-- Sidebar -->
      <div
        class="shadow-lg border-r border-gray-300 fixed left-0 h-full bg-white text-black dark:text-white flex flex-col transition-all duration-300 z-50"
        :class="{ 'w-16': !isExpanded && !isMobile, 'w-64': isExpanded, 'hidden': isMobile && !isExpanded }"
      >
        <div class="border-b border-gray-400 pb-3 flex flex-row">
          <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1267&amp;q=80" class=" mx-4 mt-4 mb-1 rounded-full" alt="" style="height:40px;width:40px;">
          <div v-if="isExpanded" class=" mt-6 mr-5 font-bold text-green-500">
            <img src="../assets/img/plancommussion.jpg" alt="">
          </div>
        </div>
        <ul class="mt-4 space-y-4">
          <li v-for="(item, index) in menuItems" :key="index" class="group">
            <div class="flex items-center justify-between p-3 hover:bg-green-100 dark:hover:bg-green-700 cursor-pointer" @click="navigateTo(item)">
              <div class="flex items-center">
                <i :class="item.icon" class="text-lg text-black dark:text-white group-hover:bg-green-100 dark:group-hover:bg-green-700 p-2 rounded-full"></i>
                <span v-if="isExpanded" class="ml-3">{{ item.label }}</span>
              </div>
              <i v-if="item.sublist && isExpanded" :class="{ 'fas fa-plus': !item.expanded, 'fas fa-minus': item.expanded }" class="text-sm"></i>
            </div>
            <ul v-if="item.expanded && isExpanded" class="ml-6 space-y-2">
              <li v-for="(sub, subIndex) in item.sublist" :key="subIndex" class="p-2 hover:bg-green-100 dark:hover:bg-green-700">
                {{ sub }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
  
      <!-- Main Content Section -->
      <div class="flex-1 flex flex-col" :class="{ 'ml-16': !isExpanded && !isMobile, 'ml-64': isExpanded && !isMobile }">
        <!-- Header -->
        <header class="border-b border-gray-400 fixed top-0 left-0 right-0 bg-white text-white p-4 flex justify-between items-center z-50" :class="{ 'ml-16': !isExpanded && !isMobile, 'ml-64': isExpanded && !isMobile }">
          <div class="flex items-center space-x-4">
            <i class="fas fa-bars text-black dark:text-white hover:bg-green-100 dark:hover:bg-green-700 p-2 rounded-full cursor-pointer" @click="toggleSidebar"></i>
            <span class="font-bold">Dashboard</span>
          </div>
          <div class="flex items-center space-x-4">
            <i class="fas fa-moon text-black dark:text-white hover:bg-green-100 dark:hover:bg-green-700 p-2 rounded-full cursor-pointer" @click="toggleDarkMode"></i>
            <i class="fas fa-expand text-black dark:text-white hover:bg-green-100 dark:hover:bg-green-700 p-2 rounded-full cursor-pointer" @click="toggleFullScreen"></i>
            <input type="text" placeholder="Search..." class="p-2 rounded border dark:bg-gray-800 dark:text-white" />
            <i class="fas fa-bell text-black dark:text-white hover:bg-green-100 dark:hover:bg-green-700 p-2 rounded-full cursor-pointer"></i>
            <i class="fas fa-envelope text-black dark:text-white hover:bg-green-100 dark:hover:bg-green-700 p-2 rounded-full cursor-pointer"></i>
            <div class="relative">
              <img src="../assets/img/profile.jpg" class="rounded-full w-10 h-10 cursor-pointer" @click="toggleProfileMenu" />
              <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded">
                <ul class="text-black dark:text-white">
                  <li class="p-2 hover:bg-green-100 dark:hover:bg-green-700 cursor-pointer">Settings</li>
                  <li class="p-2 hover:bg-green-100 dark:hover:bg-green-700 cursor-pointer">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </header>
  
        <!-- Main Content -->
        <main class="flex-1 p-6 mt-16 bg-gray-100 dark:bg-gray-800">
          <slot>  <router-view /></slot>
        </main>
  
        <!-- Footer -->
        <footer class="bg-gray-100 border-t border-gray-300 dark:bg-gray-900 text-black text-center p-3 mt-auto">
          <p>&copy; 2024 The General Marketing. All rights reserved. Powered by The General Marketing.</p>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isExpanded: true,
        isMobile: window.innerWidth <= 768,
        activeIndex: null,
        showProfileMenu: false,
        isDarkMode: false,
        menuItems: [
          { label: 'Dashboard', icon: 'fas fa-home', route: '/landing' },
          { label: 'Users', icon: 'fas fa-users', sublist: ['User List', 'Add User'], expanded: false },
          { label: 'Settings', icon: 'fas fa-cog', sublist: ['General', 'Security'], expanded: false },
        ],
      };
    },
    methods: {
      toggleProfileMenu() {
        this.showProfileMenu = !this.showProfileMenu;
      },
      toggleSidebar() {
        this.isExpanded = !this.isExpanded;
      },
      toggleSublist(index) {
        this.menuItems[index].expanded = !this.menuItems[index].expanded;
      },
      toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
      },
      toggleFullScreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      },
      handleResize() {
        this.isMobile = window.innerWidth <= 768;
        if (this.isMobile) this.isExpanded = false;
      },
      navigateTo(item) {
        if (item.route) {
          this.$router.push(item.route); // Navigate to the specified route
        }
      }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
  };
  </script>
  
  <style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  .dark {
    background-color: #1a202c;
    color: white;
  }
  </style>
  