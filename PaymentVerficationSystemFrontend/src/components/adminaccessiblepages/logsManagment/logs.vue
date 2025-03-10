<template>
    <div class="root div">
      <div class="px-3 md:px-4 py-3 ">
        <h1 class="text-blue-500 font-bold text-md">
          {{ $t("Logs Management") }}
        </h1>
      </div>
  
      <div class="border-t border-blue-500 mt-1 py-4">
        <div class="m-2 mb-10">
          <div class="flex flex-wrap border-b border-gray-500">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              :class="`py-2 px-2 mb-2 mr-2 ${
                activeTab === index
                  ? 'bg-gray-100 border-b-4 border-blue-500 text-blue-500 font-bold text-md'
                  : 'text-blue-500 font-semibold text-md'
              }`"
              @click="activateTab(index)"
            >
              <i :class="`${icons[index]} mr-2`"></i>{{ tab }}
            </button>
          </div>
  
          <div class="border-t border-blue-500">
         
            <div v-show="activeTab === 0" class="">
            <clients-log></clients-log>
            </div>
  
            <div v-show="activeTab === 1" class="">
            <payments-log></payments-log>
            </div>
  
            <div v-show="activeTab === 2" class="">
               <transfer-log></transfer-log>
            </div>
  
            <div v-show="activeTab === 3" class="">
              <service-offset-logs></service-offset-logs>
            </div>
            <div v-show="activeTab === 4" class="">
              <users-offset-logs></users-offset-logs>
            </div>
            <div v-show="activeTab === 5" class="">
              <error-logs></error-logs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
 import clientsLog from './clientsLogs.vue'
 import paymentsLog from './paymentsLogs.vue'
 import transferLog from './transferLogs.vue';
import ServiceOffsetLogs from './serviceOffsetLogs.vue';
import UsersOffsetLogs from './usersOffsetLogs.vue';
import ErrorLogs from './errorLogs.vue';

  export default {
    components: {
      
        clientsLog,
        paymentsLog,
        transferLog,
        ServiceOffsetLogs,
        UsersOffsetLogs,
        ErrorLogs,
    },
    data() {
      return {
        icons: [
        "fa-solid fa-cogs", // Payment Setting
        "fa-solid fa-money-bill", // All Payments
        "fa-solid fa-balance-scale", // Offsets
        "fa-solid fa-chart-line", // Report
        "fa fa-user",
        "fa fa-exclamation-triangle" // Report
      ],
        activeTab: 0,
        tabs: [
          "Clients Log",
          "Payments Log",
          "Bank Transfer Logs",
          "Service Offset Logs",
          "User Offset Logs",
          "Error Logs",
        ],
      };
    },

    mounted(){
      this.$store.dispatch("commitActiveItem", { activeItem: 'logs' });
      const activeTabFromRoute = parseInt(this.$route.query.activeTab);  // Ensure it's treated as a number
  if (!isNaN(activeTabFromRoute)) {
    this.activeTab = activeTabFromRoute;
  } else {
    this.activeTab = 0;  // Default to 0 if the query param is missing or invalid
  }
    },
    methods: {
  
      activateTab(index) {
        this.activeTab = index;

        this.$router.push({
        path: "/admindashboard/logs",
        query: {
          activeTab: index,
        },
      });
      },
    },
  };
  </script>
  