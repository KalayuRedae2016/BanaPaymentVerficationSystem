<template>  

  
    <div class="ml-5 mr-5 mb-3 mt-4 ">
        <p class="text-blue-800 font-bold">Capital Report</p>
    </div>
    <div class="bg-white p-6 w-full sm:w-auto border-t border-blue-800">
      <div class="flex flex row">
        <h1 class="text-indigo-800 font-extrabold ml-5">Report Type:</h1>
        <div class="relative inline-block ml-5 mb-3">
          <select
            v-model="dateType"
            @change="fetchData()"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select Report Type</option>
            <option value="Annual">Annual</option>
            <option value="semiAnnual">Semi-Annual</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
          <!-- {{ dateType }} -->
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6z" />
            </svg>
          </div>
        </div>
      </div>
  
      <div class="flex flex row ml-10 mt-5 mb-3">
        <div class="relative inline-block ml-5 flex flex-row space-x-2">
          <select
            v-if="annaualSelected"
            v-model="year"
            @change="fetchData()"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select Year</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </select>
          <select
            v-model="semiYear"
            v-if="semiAnaualSelected"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Selecct Semi Annual</option>
            <option value="1st">1st-half</option>
            <option value="2nd">2nd-half</option>
          </select>
          <select
            v-model="month"
            v-if="monthlySelected"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select Month</option>
            <option value="Janauary">January</option>
            <option value="Febuarary">Febuarary</option>
            <option value="March">March</option>
            <option value="Jully">Jully</option>
            <option value="June">June</option>
          </select>
          <select
            v-model="week"
            v-if="weeklySelected"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select Week</option>
            <option value="week1">week-1</option>
            <option value="week2">week-2</option>
            <option value="week3">week-3</option>
            <option value="week4">week4</option>
          </select>
          <select
            v-model="day"
            v-if="dailySelected"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select Month</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <!-- {{ dataType }} -->
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6z" />
            </svg>
          </div>
        </div>
      </div>
  
      <table class="w-full">
        <thead>
          <tr class="bg-gray-200">
            <th
              class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
            >
              Metric
            </th>
            <th
              class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
            >
              Total Capital
            </th>
            <th
              class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
            >
              Total Charge
            </th>
            <th
              class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
            >
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-teal-200 rounded-lg bg-opacity-50"
                >Block</span
              >
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              900000
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              5000
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <button
                @click="goToGruopPayment()"
                class="flex items-center px-4 py-2 bg-indigo-800 hover:bg-cyan-500 text-white rounded"
              >
                <i class="fas fa-eye mr-2"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-xs font-medium uppercase tracking-wider text-indigo-500 bg-green-500 rounded-lg bg-opacity-50"
                >Services
              </span>
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
            600000
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              5000
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <button
                class="flex items-center px-4 py-2 bg-indigo-800 hover:bg-cyan-500 text-white rounded"
              >
                <i class="fas fa-eye mr-2"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-pink-400 rounded-lg bg-opacity-50"
                >Subsidy</span
              >
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              140000
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              5000
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <button
                class="flex items-center px-4 py-2 bg-indigo-800 hover:bg-cyan-500 text-white rounded"
              >
                <i class="fas fa-eye mr-2"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-red-700 rounded-lg bg-opacity-50"
                >Urgent</span
              >
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                   400000
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              5000
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <button
                class="flex items-center px-4 py-2 bg-indigo-800 hover:bg-cyan-500 text-white rounded"
              >
                <i class="fas fa-eye mr-2"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <h1 class="text-indigo-800 font-bold">Total amount:</h1>
    </div>
  </template>
  <script>
  export default {
    name: "ReportsView",
    data() {
      return {
        reprtData: "",
        year: "",
        semiYear: "",
        month: "",
        week: "",
        day: "",
        annualData: "",
        semiAnaualData: "",
        monthlyData: "",
        weeklyData: "",
        dailyData: "",
        dateType: "",
        annaualSelected: true,
        semiAnaualSelected: false,
        monthlySelected: false,
        weeklySelected: false,
        dailySelected: false,
  
        selectSemiAnnual: false,
        selectMonth: false,
        selectWeek: false,
        selectDay: false,
      };
    },
    created() {},
    mounted() {},
    methods: {
      goBack() {
        this.$router.push("/admindashboard"); // Navigates back to the previous page
      },
      fetchYearlyPayments() {},
      fetchSemiYearlyPayments() {},
      fetchMonthlyPayments() {},
      fetchWeeklyPayments() {},
      fetchDailyPayments() {},
      goToGruopPayment() {
        const paymentType = "block";
        const year = "2023";
        this.$router.push({
          name: "group-payments",
          query: { paymentType, year },
          // props: { paymentType, year },
        });
      },
      fetchData() {
        // alert("fetching data");
        if (this.dateType == "Annual") {
          console.log("datetaype", this.dateType);
          console.log("year", this.year);
          this.annaualSelected = true;
          this.semiAnaualSelected = false;
          this.monthlySelected = false;
          this.weeklySelected = false;
          this.dailySelected = false;
        }
  
        if (this.dateType == "semiAnnual") {
          console.log("datetaype", this.dateType);
          console.log("year,semiyear", this.year, this.semiYear);
          this.annaualSelected = true;
          this.semiAnaualSelected = true;
          this.monthlySelected = false;
          this.weeklySelected = false;
          this.dailySelected = false;
  
          if (this.semiYear === null) {
            this.selectSemiAnnual = true;
            return;
          }
        }
  
        if (this.dateType == "monthly") {
          console.log("datetaype", this.dateType);
          console.log("year,month", this.year, this.month);
          this.AnaualSelected = true;
          this.monthlySelected = true;
          this.weeklySelected = false;
          this.dailySelected = false;
          this.semiAnaualSelected = false;
          if (this.month === null) {
            this.selectMonth = true;
            return;
          }
          if (this.day === null) {
            this.selectDay = true;
            return;
          }
        }
  
        if (this.dateType == "weekly") {
          this.annaualSelected = true;
          this.monthlySelected = true;
          this.weeklySelected = true;
          this.semiAnaualSelected = false;
          this.dailySelected = false;
          console.log("year,month,week", this.year, this.month, this.week);
          console.log("datetaype", this.dateType);
  
          if (this.month === null) {
            this.selectMonth = true;
            return;
          }
          if (this.week === null) {
            this.selectDay = true;
            return;
          }
        }
  
        if (this.dateType == "daily") {
          console.log("year,month,week", this.year, this.month, this.day);
          this.annaualSelected = true;
          this.monthlySelected = true;
          this.dailySelected = true;
          this.semiAnaualSelected = false;
          this.weeklySelected = false;
          console.log("datetaype", this.dateType);
          if (this.month === null) {
            this.selectMonth = true;
            return;
          }
          if (this.day === null) {
            this.selectDay = true;
            return;
          }
        }
      },
    },
  };
  </script>
  