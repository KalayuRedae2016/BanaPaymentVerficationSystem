<template>
  <div class="ml-10 mr-5 mt-8">
    <h1 class="text-indigo-800 font-extrabold mt-5 text-3xl mb-10">
      All Payment Reports
    </h1>
    <div class="flex">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="`px-4 py-2  mb-2 mr-2 ${
          activeTab === index
            ? 'bg-gray-300 border-b-4 border-blue-500 text-blue-500 font-extrabold text-2xl'
            : 'bg-gray-100 text-indigo-700 font-extrabold text-2xl'
        } `"
        @click="activateTab(index)"
      >
        {{ tab }}
      </button>
    </div>
    <div class="mb-9">
      <div v-show="activeTab === 0" class="border border-gray-300 rounded-xl">
        <!-- Content for the second tab -->
        <div class="p-6 w-full sm:w-auto">
          <newBlockPayment></newBlockPayment>
          <h1 class="text-indigo-800 font-extrabold">Total amount:</h1>
        </div>
      </div>

      <div v-show="activeTab === 1" class="border border-gray-300 rounded-xl">
        <!-- Content for the second tab -->
        <div class="p-6 w-full sm:w-auto">
          <newServicePayment></newServicePayment>
          <h1 class="text-indigo-800 font-extrabold">Total amount:</h1>
        </div>
      </div>

      <div v-show="activeTab === 2" class="border border-gray-300 rounded-xl">
        <!-- Content for the second tab -->
        <div class="p-6 w-full sm:w-auto">
          <newSubsidyPayment></newSubsidyPayment>
          <h1 class="text-indigo-800 font-extrabold">Total amount:</h1>
        </div>
      </div>

      <div v-show="activeTab === 3" class="border border-gray-300 rounded-xl">
        <!-- Content for the second tab -->
        <div class="p-6 w-full sm:w-auto">
          <newUrgentPayment></newUrgentPayment>
          <h1 class="text-indigo-800 font-extrabold">Total amount:</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import newBlockPayment from "./NewPayments/newBlockPayment.vue";
import newServicePayment from "./NewPayments/newServicePayment.vue";
import newSubsidyPayment from "./NewPayments/newSubsidyPayment.vue";
import newUrgentPayment from "./NewPayments/newArgentPayment.vue";

export default {
  components: {
    newBlockPayment,
    newServicePayment,
    newSubsidyPayment,
    newUrgentPayment,
  },
  name: "blockPayment",

  data() {
    return {
      years: [],
      internetConnected: false,
      activeTab: 0,
      tabs: [
        "New Regular Payment",
        "New Service Payment",
        "New Subsidy Payment",
        "New Urgent Payment",
      ],
    };
  },
  created() {},
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
