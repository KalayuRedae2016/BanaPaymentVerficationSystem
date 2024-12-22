<template>
  <div class="flex flex-col space-y-5   mb-16">
    <h1 class="mt-2 text-indigo-800 font-extrabold ml-5">Dashboard</h1>
    <div class="border-t border-blue-800 pt-5 pl-3">
      
      <!-- <transition
    enter-active-class="transform transition duration-300 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transform transition duration-300 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      v-if="showToast"
      class="z-20 fixed right-5  bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
      role="alert"
    >
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline">{{ toastMessage }}</span>
    </div>
  </transition> -->

  <div v-if="showToast">
    <!-- Optional overlay for modal effect -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-10"
      @click="closeToast"
    ></div>

    <transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transform transition duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div
        class="z-20 fixed inset-0 flex items-center justify-center"
        role="alert"
      >
        <div
          class="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg text-center max-w-md"
        >
          <strong class="font-bold">Success!</strong>
          <p class="mt-2">{{ toastMessage }}</p>
          
        </div>
      </div>
    </transition>
  </div>

  <div class="mt-3">
    <div class="flex">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="`px-4 py-2  mb-2 mr-2 text-sm ${
          activeTab === index
            ? 'bg-gray-300 border-b-4 border-blue-500 text-blue-500 font-extrabold text-lg'
            : 'bg-gray-100 text-indigo-700 font-extrabold text-lg'
        } `"
        @click="activateTab(index)"
      >
        {{ tab }}
      </button>
    </div>
    <div class="mb-2 mt-0">
      <div v-show="activeTab === 0" class="border border-gray-300 ">
        
        <paid-payment></paid-payment>
      </div>
      <div  v-show="activeTab === 1" class="border border-gray-300 ">
        
        <unpaid-payment></unpaid-payment>
        
      </div>
      
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import unpaidPayment from "./unpaidPayment.vue"
import paidPayment from "./paidPayment.vue"

import { mapGetters } from "vuex";
export default {
  components: {
   unpaidPayment,
   paidPayment,
  },

  name: "UserFirstASHBOARD",
  data() {
    return {
      showToast: false,
      toastMessage: '',
      showAlert : false,
      pendingWarning:true,
      rejectedWarning:false,
      overdueWarning:false,
      showWelcome:false,

      nameOfUser: "",
      selectedYear: "",
      internetConnected: false,
      activeTab: 0,
      tabs: [
        "Confirmed(Paid) Payments",
        "Unpaid Payments",
       
      ],
    };
  },

  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });
  },
  computed: {
    ...mapGetters(["getToken", "getUserId", "getLocale", "getName"]),
    userId() {
      return this.getUserId;
    },
    token() {
      return this.getToken;
    },

    locale() {
      this.$i18n.locale = this.getLocale;
      return this.getLocale;
    },
    name() {
      return this.getName;
    },
  },
  mounted() {

    // const urlParams = new URLSearchParams(window.location.search);
    // const activeTab = urlParams.get('activeTab');
    // if (activeTab) {
    //  this.activateTab=activeTab// Call a method to activate the tab
    // };
    

    // if (this.$route.query.loginSuccess === 'true') {
    //   this.showAlert = true; // Show success alert
    //   setTimeout(() => {
    //     this.showAlert = false; // Hide the alert after 3 seconds
    //     // Remove loginSuccess from the query
    //     this.$router.push('/userdashboard');
    //   }, 3000);
    // }


  if (this.$route.query.loginSuccess === 'true') {
    this.showSuccessToast("Successfully Login in to your dashboard");
      setTimeout(() => {
        this.$router.push('/userdashboard');
      }, 2000);
    }


    this.years = this.generateYearsArray(1914, 100).concat(
      this.generateYearsArray(2024, 100)
    );
    this.nameOfUser = this.name;
  },
  methods: {


    
    showSuccessToast(message) {
      this.toastMessage = message;
      this.showToast = true;

      // Hide toast after 3 seconds
      setTimeout(() => {
        this.showToast = false;
      }, 1000); 
      
      
      
      // Toast will disappear after 3 seconds
    },
    setActiveForLoading(tab){
      //alert(tab)
      this.$router.push({ query: { activeTab: tab } }); 
    },
    generateYearsArray(startYear, numYears) {
      const years = [];
      for (let i = 0; i < numYears; i++) {
        years.push(startYear + i);
      }

      return years;
    },

    activateTab(index) {
      this.activeTab = index;
     // this.$router.push({ query: { activeTab: this.activeTab } }); 
    },
  },
};
</script>
