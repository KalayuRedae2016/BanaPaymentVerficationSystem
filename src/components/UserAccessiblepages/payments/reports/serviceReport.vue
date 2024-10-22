<template>
  <div class="p-6 w-full sm:w-auto">
    <div class="flex flex-row space-x-5">
      <div class="flex flex-row space-x-12 mt-8">
        <h1 class="mb-5 text-indigo-800 font-semibold text-md italic">
          Yearly Report For Service
        </h1>
        <select
          class="px-2 py-1 border rounded mb-5 text-md text-gray-500"
          v-model="selectedYear"
          @change="fetchData()"
        >
          <option value="" disabled>Select Year</option>
          <option v-for="year in years" :key="year._id">{{ year }}</option>
        </select>
      </div>
    </div>

    <h1 class="text-blue-800 font-semibold mt-5 mb-5 text-md mb-16">
      Confirmed Service Payments:
    </h1>
    <div class="mr-5 ml-5 mt-10">
      <table class="w-full border border-gray-200">
        <thead>
          <tr class="bg-gray-200">
            <th
              class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
            >
              Month
            </th>
            <th
              class="w-32 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
            >
              Total
            </th>
            <th
              class="w-32 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
            >
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 text-md text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-md font-medium uppercase tracking-wider text-indigo-800 font-extrabold bg-white rounded-lg bg-opacity-50"
                >January</span
              >
            </td>
            <td class="p-3 text-md text-gray-700 whitespace-nowrap">4000</td>
            <td class="p-3 text-md text-gray-700 whitespace-nowrap">
              <button
                class="flex items-center px-4 py-2 bg-indigo-100 hover:bg-cyan-500 text-indigo-800 rounded"
              >
                <i class="fas fa-eye mr-2"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h1 class="text-indigo-800 font-semibold mt-5 ml-5 text-md mb-16">
      Total Service Amount:
    </h1>

   
    <h1 class="text-blue-800 text-md font-bold mt-5 mb-5">Overdue Services</h1>

    <div class="mr-5 ml-5 mb-16">
      <table class="w-full border border-gray-400">
        <thead>
          <tr class="bg-gray-200">
            <th
              class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
            >
              Month
            </th>
            <th
              class="w-32 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
            >
              Total
            </th>
            <th
              class="w-32 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
            >
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-md font-medium uppercase tracking-wider text-indigo-800 font-extrabold bg-white rounded-lg bg-opacity-50"
                >January</span
              >
            </td>
            <td class="p-3 text-md text-gray-700 whitespace-nowrap">4000</td>
            <td class="p-3 text-md text-gray-700 whitespace-nowrap">
              <button
                class="flex items-center px-4 py-2 bg-indigo-100 hover:bg-cyan-500 text-indigo-800 rounded"
              >
                <i class="fas fa-eye mr-2"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  name: "CapitalReport",
  data() {
    return {
      selectedYear: "",
      years: [],
      ServicePaymentsYear: "",
      servicePaymentsYear: "",
      subsidyPaymentsYear: "",
      argentPaymentsYear: "",

      allServicePayments: "",
      allServicePayments: "",
      allSubsidyPayments: "",
      allArgentPayments: "",

      internetConnected: false,
      activeTab: 0,
      tabs: ["Service", "Service", "Subsidy", "Argent"],
      activeTab1: 0,
      paymentTabs: ["Service", "Service", "Subsidy", "Argent"],
    };
  },

  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });

    // this.apiClient.post("/service-payments").then((response) => {
    //   console.log("response",response);
    //   this.allServicePayments=response.data;
    // });
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
    generateYearsArray(startYear, numYears) {
      const years = [];
      for (let i = 0; i < numYears; i++) {
        years.push(startYear + i);
      }
      return years;
    },

    // fetchServiceData(){
    //  alert("data");
    //  //const year=this.selectedYear;
    //  this.apiClient.post("/service-payments").then((response) => {
    //     console.log("response",response);
    //     this.servicePaymentsYear=response.data;
    //   });
    // },

    activateTab(index) {
      this.activeTab = index;
    },
    activateTab1(index) {
      this.activeTab1 = index;
    },
  },
};
</script>
