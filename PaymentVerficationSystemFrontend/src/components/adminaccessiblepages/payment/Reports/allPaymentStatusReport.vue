<template>
  <div class="p-3">
    <h1 class="text-indigo-800 font-bold">Payment Reports</h1>
  </div>
  
  
    <div class="bg-white p-6 w-full sm:w-auto">
      <div class="flex flex row">
        <h1 class="text-indigo-800 font-extrabold ml-5">Payment Type:</h1>
        <div class="flex flex-row space-x-5 relative inline-block ml-5 mb-3">
          <select
            v-model="paymentType"
            @change="paymentTypePleaseSelectionChange()"
            class="text-gray-800 text-md block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select Payment Type</option>
            <option value="regular">Regular</option>
            <option value="subsidy">Subsidy</option>
            <option value="urgent">Urgent</option>
            <option value="service">Service</option>
          </select>
          <h1 class="text-indigo-800 font-extrabold">Repport Type:</h1>
          <select
            v-model="reportType"
            @change="changeReportType()"
            class="text-gray-800 text-md block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select Report Type</option>
            <option value="annually">Annual</option>
            <option value="semiAnnually">Semi-Annual</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
        </div>
      </div>
  
      <div class="flex flex row ml-32 mt-5 mb-3">
        <div class="relative inline-block ml-5 flex flex-row space-x-2">
          <select
            v-if="annaualSelected"
            v-model="year"
            @change="fetchYearlyPayments()"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select Year</option>
            <option v-for="year in selectableYears" :key="year" :value="year">{{ year }}</option>
          </select>
          <select
            v-model="semiYear"
            v-if="semiAnaualSelected"
            @change="fetchSemiYearlyPayments()"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Selecct Semi Annual</option>
            <option value="1st">1st-half</option>
            <option value="2nd">2nd-half</option>
          </select>
          <select
            v-model="month"
            v-if="monthlySelected"
            @change="fetchMonthlyPayments()"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <select
            v-model="week"
            v-if="weeklySelected"
            @change="fetchWeeklyPayments()"
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
            @change="fetchDailyPayments()"
            v-if="dailySelected"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Select Day</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
          <!-- {{ reportType }} -->
        </div>
      </div>
  
      <div
        v-if="pleaseSelectPaymentType"
        class="mb-5 flex items-center justify-between bg-pink-300 text-indigo-800 font-bold px-4 py-2 rounded-md"
      >
        <span>Select Paymet Type!</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-white cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 9.293l4.146-4.147a.5.5 0 01.708.708L10.707 10l4.147 4.146a.5.5 0 01-.708.708L10 10.707l-4.146 4.147a.5.5 0 01-.708-.708L9.293 10 5.146 5.854a.5.5 0 01.708-.708L10 9.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
  
      <div
        v-if="pleaseSelectReportType"
        class="mb-5 flex items-center justify-between bg-pink-300 text-indigo-800 font-bold px-4 py-2 rounded-md"
      >
        <span>Select Report Type!</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-white cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 9.293l4.146-4.147a.5.5 0 01.708.708L10.707 10l4.147 4.146a.5.5 0 01-.708.708L10 10.707l-4.146 4.147a.5.5 0 01-.708-.708L9.293 10 5.146 5.854a.5.5 0 01.708-.708L10 9.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div
        v-if="pleaseSelectYear"
        class="mb-5 flex items-center justify-between bg-pink-300 text-indigo-800 font-bold px-4 py-2 rounded-md"
      >
        <span>Select Year!! </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-white cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 9.293l4.146-4.147a.5.5 0 01.708.708L10.707 10l4.147 4.146a.5.5 0 01-.708.708L10 10.707l-4.146 4.147a.5.5 0 01-.708-.708L9.293 10 5.146 5.854a.5.5 0 01.708-.708L10 9.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
  
      <div
        v-if="pleaseSelectMonth"
        class="mb-5 flex items-center justify-between bg-pink-300 text-indigo-800 font-bold px-4 py-2 rounded-md"
      >
        <span>Select Month!! </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-white cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 9.293l4.146-4.147a.5.5 0 01.708.708L10.707 10l4.147 4.146a.5.5 0 01-.708.708L10 10.707l-4.146 4.147a.5.5 0 01-.708-.708L9.293 10 5.146 5.854a.5.5 0 01.708-.708L10 9.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <table class="w-full border border-gray-300">
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
              Total
            </th>
            <th
              class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
            >
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="showTable">
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-md font-medium tracking-wider text-gray-800 bg-teal-200 rounded-lg bg-opacity-50"
                >No. of Confirmed</span
              >
            </td>
            <td class="p-3 text-md text-gray-700 whitespace-nowrap">
              {{ confirmedData }}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <button
                @click="confirmed()"
                class="flex items-center px-4 py-2 bg-indigo-200 hover:bg-cyan-500 text-gray-800 rounded"
              >
                <i class="fas fa-eye mr-2"></i>
              </button>
            </td>
          </tr>
          <!-- <tr v-if="showTable">
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-md font-medium tracking-wider text-indigo-500 bg-green-100 rounded-lg bg-opacity-50"
                >No. of Requested
              </span>
            </td>
            <td class="p-3 text-md text-gray-700 whitespace-nowrap">
              {{ requestedData }}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <button
                @click="requested()"
                class="flex items-center px-4 py-2 bg-indigo-200 hover:bg-cyan-500 text-gray-800 rounded"
              >
                <i class="fas fa-eye mr-2"></i>
              </button>
            </td>
          </tr> -->
          <tr v-if="showTable">
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-md font-medium tracking-wider text-gray-800 bg-pink-200 rounded-lg bg-opacity-50"
                >No of Pending</span
              >
            </td>
            <td class="p-3 text-md text-gray-700 whitespace-nowrap">
              {{ pendingData }}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <button
                @click="pending()"
                class="flex items-center px-4 py-2 bg-indigo-200 hover:bg-cyan-500 text-gray-800 rounded"
              >
                <i class="fas fa-eye mr-2"></i>
              </button>
            </td>
          </tr>
          <!-- <tr v-if="showTable">
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-md font-medium tracking-wider text-red-500 bg-gray-200 rounded-lg bg-opacity-50"
                >No of Rejected</span
              >
            </td>
            <td class="p-3 text-md text-gray-700 whitespace-nowrap">
              {{ rejectedData }}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <button
                @click="rejected()"
                class="flex items-center px-4 py-2 bg-indigo-200 hover:bg-cyan-500 text-gray-800 rounded"
              >
                <i class="fas fa-eye mr-2"></i>
              </button>
            </td>
          </tr> -->
  
          <tr v-if="showTable">
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span
                class="p-1.5 text-md font-medium tracking-wider text-pink-500 bg-gray-200 rounded-lg bg-opacity-50"
                >No of Ovedue</span
              >
            </td>
            <td class="p-3 text-md text-gray-700 whitespace-nowrap">0</td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <button
                @click="overdue()"
                class="flex items-center px-4 py-2 bg-indigo-200 hover:bg-cyan-500 text-gray-800 rounded"
              >
                <i class="fas fa-eye mr-2"></i>
              </button>
            </td>
          </tr>
  
          <tr v-if="!showTable" class="">
  
            <td class="p-3 text-md text-white whitespace-nowrap font-bold itallic bg-blue-500">
              Select Payment Type and Report Type and time from you want to view data!!!
            </td>
          </tr>
        </tbody>
      </table>
  
      <h1 class="text-indigo-800 font-extrabold text-md mt-10 itallic mb-64 ">
        Total amount:
      </h1>
    </div>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    name: "ReportsView",
    data() {
      return {
        showTable: false,
        year: "",
        semiYear: "",
        month: "",
        week: "",
        day: "",
  
        // annualData: "",
        // semiAnaualData: "",
        // monthlyData: "",
        // weeklyData: "",
        // dailyData: "",
        paymentRoute: "",
        paymentType: "",
        reportType: "",
        payments: "",
        annaualSelected: false,
        semiAnaualSelected: false,
        monthlySelected: false,
        weeklySelected: false,
        dailySelected: false,
  
        pleaseSelectPaymentType: false,
        pleaseSelectReportType: false,
        pleaseSelectYear: false,
        pleaseSelectSemiAnnual: false,
        pleaseSelectMonth: false,
        pleaseSelectWeek: false,
        pleaseSelectDay: false,
  
        confirmedData: "",
        requestedData: "",
        pendingData: "",
        rejectedData: "",
        ovedueData: "",
      };
    },
    created() {
      this.apiClient = axios.create({
        baseURL: "http://localhost:8081", // Set your base URL here
      });
    },
    computed: {
      selectableYears() {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 15;
        const years = [];
  
        for (let year = startYear; year <= currentYear; year++) {
          years.push(year);
        }
  
        return years;
      }
    },
    mounted() {
      console.log("mounted");
      const y = 2024;
      const timeRange = "annually";
      const paymentType = "regular";
  
      this.apiClient
        .get(
          `/api/v1/closeHistory/reports?timeRange=${timeRange}&y=${y}&paymentType=${paymentType}`
        )
        .then((response) => {
          // this.annualData = response.data;
          console.log("response.data", response.data);
          this.payments = response.data.message[0];
          this.requestedData = response.data.message[1];
          this.confirmedData = response.data.message[2];
          this.rejectedData = response.data.message[3];
          this.pendingData = response.data.message[4];
          console.log("pending", this.pendingData);
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
        });
    },
    methods: {
      goBack() {
        this.$router.push("/admindashboard"); // Navigates back to the previous page
      },
      paymentTypePleaseSelectionChange() {
        this.pleaseSelectPaymentType = false;
        this.reportType = "";
      },
      fetchYearlyPayments() {
  
  
        if (!this.reportType) {
          this.pleaseSelectReportType = true;
        }
        if (this.reportType == "annually") {
          this.showTable=true;//this should be opened if there is data it is for check
          this.pleaseSelectPaymentType = false;
          const y = this.year;
          const month = this.month;
          const timeRange = this.reportType;
          const paymentType = this.paymentType;
  
          if (
            this.paymentType == "regular" ||
            this.paymentType == "subsidy" ||
            this.paymentType == "urgent"
          ) {
          this.paymentRoute = "closeHistory";
          }else{
            this.paymentRoute = "serviceHistory";
          }
  
          this.apiClient
              .get(
                `/api/v1/${this.paymentRoute}/reports?timeRange=${timeRange}&y=${y}&month=${month}&paymentType=${paymentType}`
              )
              .then((response) => {
                console.log("response.data", response.data);
                this.payments = response.data.message[0];
                this.requestedData = response.data.message[1];
                this.confirmedData = response.data.message[2];
                this.rejectedData = response.data.message[3];
                this.pendingData = response.data.message[4];
                console.log("pending", this.pendingData);
  
                this.showTable = true;
              })
              .catch((error) => {
                console.error("Error fetching client data:", error);
              });
        } else {
          this.semiYear = "";
          this.month = "";
          this.week = "";
          this.day = "";
  
          console.log("some thing wrong please during");
        }
  
        this.pleaseSelectYear = false;
      },
      fetchSemiYearlyPayments() {
        if (this.reportType == "semiAnnually") {
          if (this.year == "") {
            this.pleaseSelectYear = true;
            return;
          }
          this.pleaseSelectPaymentType = false;
          this.pleaseSelectYear = false;
  
          const y = this.year;
          const month = this.month;
          const timeRange = this.reportType;
          if (
            this.paymentType == "regular" ||
            this.paymentType == "subsidy" ||
            this.paymentType == "urgent"
          ) {
          this.paymentRoute = "closeHistory";
          }else{
            this.paymentRoute = "serviceHistory";
          }
            this.apiClient
              .get(
                `/api/v1/${this.paymentRoute}/reports?timeRange=${timeRange}&y=${y}&month=${month}&paymentType=${this.paymentType}`
              )
              .then((response) => {
                this.annualData = response.data;
  
                this.requestedData = response.data.message[1];
                this.confirmedData = response.data.message[2];
                this.rejectedData = response.data.message[3];
                this.showTable = true;
              })
              .catch((error) => {
                console.error("Error fetching client data:", error);
              });
          
        } else {
          return;
        }
      },
      fetchMonthlyPayments() {
  
        if (this.reportType == "monthly") {
          if (this.year == "") {
            this.pleaseSelectYear = true;
            return;
          }
  
          this.pleaseSelectPaymentType = false;
          this.pleaseSelectYear = false;
  
          const y = this.year;
          const month = this.month;
          const timeRange = this.reportType;
  
          if (
            this.paymentType == "regular" ||
            this.paymentType == "subsidy" ||
            this.paymentType == "urgent"
          ) {
          this.paymentRoute = "closeHistory";
          }else{
            this.paymentRoute = "serviceHistory";
          }
  
          this.apiClient
            .get(
              `/api/v1/${this.paymentRoute}/reports?timeRange=${timeRange}&y=${y}&month=${month}&paymentType=${this.paymentType}`
            )
            .then((response) => {
              this.annualData = response.data;
              this.showTable = true;
            })
            .catch((error) => {
              console.error("Error fetching client data:", error);
            });
        } else {
          this.pleaseSelectMonth = false;
          this.day = "";
          this.week = "";
          return;
        }
      },
      fetchWeeklyPayments() {
        if (this.reportType == "weekly") {
          
  
          if (this.year == "") {
            this.pleaseSelectYear = true;
            return;
          }
          if (this.month == "") {
            this.pleaseSelectMonth = true;
            return;
          }
          const y = this.year;
          const month = this.month;
          const timeRange = this.reportType;
          console.log("time raneg", timeRange);
          if (
            this.paymentType == "regular" ||
            this.paymentType == "subsidy" ||
            this.paymentType == "urgent"
          ) {
          this.paymentRoute = "closeHistory";
          }else{
            this.paymentRoute = "serviceHistory";
          }
          this.apiClient
            .get(
              `/api/v1/${this.paymentRoute}/reports?timeRange=${timeRange}&y=${y}&month=${month}&week=${this.week}&paymentType=${this.paymentType}`
            )
            .then((response) => {
              this.annualData = response.data;
              this.showTable = true;
            })
            .catch((error) => {
              console.error("Error fetching client data:", error);
            });
        } else {
          return;
        }
      },
      fetchDailyPayments() {
        if (this.reportType == "daily") {
          if (this.year == "") {
            this.pleaseSelectYear = true;
            return;
          }
          if (this.month == "") {
            this.pleaseSelectMonth = true;
            return;
          }
          const y = this.year;
          const month = this.month;
          const timeRange = this.reportType;
          if (
            this.paymentType == "regular" ||
            this.paymentType == "subsidy" ||
            this.paymentType == "urgent"
          ) {
          this.paymentRoute = "closeHistory";
          }else{
            this.paymentRoute = "serviceHistory";
          }
          this.apiClient
            .get(
              `/api/v1/${this.paymentRoute}/reports?timeRange=${timeRange}&y=${y}&month=${month}&day=${this.day}&paymentType=${this.paymentType}`
            )
            .then((response) => {
              this.annualData = response.data;
              this.showTable = true;
            })
            .catch((error) => {
              console.error("Error fetching client data:", error);
            });
        } else {
          return;
        }
      },
  
      requested() {
        const paymentType = this.paymentType;
        const reportType = this.reportType;
  
        const year = this.year;
        const semiYear = this.semiYear;
        const month = this.month;
        const week = this.Week;
        const day = this.day;
  
        if (this.reportType == "annually") {
          // console.log("annaulllllly");
          this.$router.push({
            name: "requested",
            query: { paymentType, reportType, year },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "semiAnnually") {
          this.$router.push({
            name: "requested",
            query: { paymentType, reportType, year, semiYear },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "monthly") {
          this.$router.push({
            name: "requested",
            query: { paymentType, reportType, year, month },
            // props: { paymentType, year },
          });
        }
        if (this.reportType == "weekly") {
          this.$router.push({
            name: "requested",
            query: { paymentType, reportType, year, month, week },
          });
        }
        if (this.reportType == "daily") {
          this.$router.push({
            name: "requested",
            query: { paymentType, reportType, year, month, day },
          });
        }
      },
  
      confirmed() {
        const paymentType = this.paymentType;
        const reportType = this.reportType;
  
        const year = this.year;
        const semiYear = this.semiYear;
        const month = this.month;
        const week = this.Week;
        const day = this.day;
  
        if (this.reportType == "annually") {
          
          this.$router.push({
            name: "confirmed",
            query: { paymentType, reportType, year },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "semiAnnually") {
          this.$router.push({
            name: "confirmed",
            query: { paymentType, reportType, year, semiYear },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "monthly") {
          this.$router.push({
            name: "confirmed",
            query: { paymentType, reportType, year, month },
            // props: { paymentType, year },
          });
        }
        if (this.reportType == "weekly") {
          this.$router.push({
            name: "confirmed",
            query: { paymentType, reportType, year, month, week },
          });
        }
        if (this.reportType == "daily") {
          this.$router.push({
            name: "confirmed",
            query: { paymentType, reportType, year, month, day },
          });
        }
      },
  
      rejected() {
        const paymentType = this.paymentType;
        const reportType = this.reportType;
  
        const year = this.year;
        const semiYear = this.semiYear;
        const month = this.month;
        const week = this.Week;
        const day = this.day;
  
        if (this.reportType == "annually") {
         
          this.$router.push({
            name: "rejected",
            query: { paymentType, reportType, year },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "semiAnnually") {
          this.$router.push({
            name: "rejected",
            query: { paymentType, reportType, year, semiYear },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "monthly") {
          this.$router.push({
            name: "rejected",
            query: { paymentType, reportType, year, month },
            // props: { paymentType, year },
          });
        }
        if (this.reportType == "weekly") {
          this.$router.push({
            name: "rejected",
            query: { paymentType, reportType, year, month, week },
          });
        }
        if (this.reportType == "daily") {
          this.$router.push({
            name: "rejected",
            query: { paymentType, reportType, year, month, day },
          });
        }
      },
  
      pending() {
        const paymentType = this.paymentType;
        const reportType = this.reportType;
  
        const year = this.year;
        const semiYear = this.semiYear;
        const month = this.month;
        const week = this.Week;
        const day = this.day;
  
        if (this.reportType == "annually") {
          
          this.$router.push({
            name: "pending",
            query: { paymentType, reportType, year },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "semiAnnually") {
          this.$router.push({
            name: "pending",
            query: { paymentType, reportType, year, semiYear },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "monthly") {
          this.$router.push({
            name: "pending",
            query: { paymentType, reportType, year, month },
            // props: { paymentType, year },
          });
        }
        if (this.reportType == "weekly") {
          this.$router.push({
            name: "pending",
            query: { paymentType, reportType, year, month, week },
          });
        }
        if (this.reportType == "daily") {
          this.$router.push({
            name: "pending",
            query: { paymentType, reportType, year, month, day },
          });
        }
      },
  
      overdue() {
        const paymentType = this.paymentType;
        const reportType = this.reportType;
  
        const year = this.year;
        const semiYear = this.semiYear;
        const month = this.month;
        const week = this.Week;
        const day = this.day;
  
        if (this.reportType == "annually") {
         
          this.$router.push({
            name: "overdue",
            query: { paymentType, reportType, year },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "semiAnnually") {
          this.$router.push({
            name: "overdue",
            query: { paymentType, reportType, year, semiYear },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "monthly") {
          this.$router.push({
            name: "overdue",
  
            query: { paymentType, reportType, year, month },
            // props: { paymentType, year },
          });
        }
        if (this.reportType == "weekly") {
          this.$router.push({
            name: "ovedue",
  
            query: { paymentType, reportType, year, month, week },
          });
        }
        if (this.reportType == "daily") {
          this.$router.push({
            name: "ovedue",
            query: { paymentType, reportType, year, month, day },
          });
        }
      },
  
      goToGruopPayment() {
        const paymentType = this.paymentType;
        const reportType = this.reportType;
  
        const year = this.year;
        const semiYear = this.semiYear;
        const month = this.month;
        const week = this.Week;
        const day = this.day;
  
        if (this.reportType == "annually") {
         
          this.$router.push({
            name: "confirmed",
            query: { paymentType, reportType, year },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "semiAnnually") {
          this.$router.push({
            name: "group-payments",
            query: { paymentType, reportType, year, semiYear },
            // props: { paymentType, year },
          });
        }
  
        if (this.reportType == "monthly") {
          this.$router.push({
            name: "group-payments",
            query: { paymentType, reportType, year, month },
            // props: { paymentType, year },
          });
        }
        if (this.reportType == "weekly") {
          this.$router.push({
            name: "group-payments",
            query: { paymentType, reportType, year, month, week },
          });
        }
        if (this.reportType == "daily") {
          this.$router.push({
            name: "group-payments",
            query: { paymentType, reportType, year, month, day },
          });
        }
      },
  
      changeReportType() {
        this.showTable=false;
        if (this.paymentType == "") {
          this.pleaseSelectPaymentType = true;
          return;
        }
        if (this.reportType == "annually") {
          alert("hi")
          console.log("datetaype", this.reportType);
          console.log("year", this.year);
          this.annaualSelected = true;
          this.semiAnaualSelected = false;
          this.monthlySelected = false;
          this.weeklySelected = false;
          this.dailySelected = false;
        }
  
        if (this.reportType == "semiAnnually") {
          console.log("datetaype", this.reportType);
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
  
        if (this.reportType == "monthly") {
       
          console.log("datetaype", this.reportType);
          console.log("year,month", this.year, this.month);
          this.annaualSelected = true;
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
  
        if (this.reportType == "weekly") {
          this.annaualSelected = true;
          this.monthlySelected = true;
          this.weeklySelected = true;
          this.semiAnaualSelected = false;
          this.dailySelected = false;
          console.log("year,month,week", this.year, this.month, this.week);
          console.log("datetaype", this.reportType);
  
          if (this.month === null) {
            this.selectMonth = true;
            return;
          }
          if (this.week === null) {
            this.selectDay = true;
            return;
          }
        }
  
        if (this.reportType == "daily") {
          console.log("year,month,week", this.year, this.month, this.day);
          this.annaualSelected = true;
          this.monthlySelected = true;
          this.dailySelected = true;
          this.semiAnaualSelected = false;
          this.weeklySelected = false;
          console.log("datetaype", this.reportType);
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
  