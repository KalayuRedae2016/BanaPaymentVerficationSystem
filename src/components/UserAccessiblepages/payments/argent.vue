<template>
    <div class="ml-10 mr-5 mt-8">
      <h1 class="text-indigo-800 font-extrabold mt-5 mb-5">
        All Payment Reports:
      </h1>
      <div class="flex">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="`px-4 py-2 ${
            activeTab === index
              ? 'bg-gray-300 border-t border-l border-r border-indigo-800 text-indigo-700 fornt-extrabold'
              : 'bg-gray-200 text-indigo-700 border-b border-indigo-800'
          } `"
          @click="activateTab(index)"
        >
          {{ tab }}
        </button>
      </div>
      <div class="mb-9">
        <div v-show="activeTab === 0" class="border border-gray-300">
          <argentReport></argentReport>
        </div>
        <div
          v-show="activeTab === 1"
          class="border border-gray-300"
        >
          <!-- Content for the second tab -->
          <div class=" p-6 w-full sm:w-auto">
             <newArgentPayment></newArgentPayment>
            <h1 class="text-indigo-800 font-extrabold">Total amount:</h1>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import newArgentPayment from './NewPayments/newArgentPayment.vue'
  import argentReport from './reports/argentReport.vue'
  export default {
    components: {
      newArgentPayment,
      argentReport
    },
    name: "argentPayment",
  
    data() {
      return {
        years:[],
        internetConnected: false,
        activeTab: 0,
        tabs: ["Argent Payment", "New Argent Payment"],
      };
    },
    created(){
  
    },
    mounted() {
      // Simulating internet connection check
      setTimeout(() => {
        this.internetConnected = true;
      }, 100000);
      this.years = this.generateYearsArray(1914, 100).concat(
        this.generateYearsArray(2024, 100)
      );
  
  
    },
    methods: {
      activateTab(index) {
        this.activeTab = index;
      },
      generateYearsArray(startYear, numYears) {
        const years = [];
        for (let i = 0; i < numYears; i++) {
          years.push(startYear + i);
        }
        return years;
      },
    },
  };
  </script>
  