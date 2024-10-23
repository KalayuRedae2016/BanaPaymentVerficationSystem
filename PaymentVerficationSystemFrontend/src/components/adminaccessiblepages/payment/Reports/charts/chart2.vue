<template>
    <div
      class="flex flex-col overflow-hidden min-h-screen"
      style="margin-top: 20px"
    >
      <div class="ml-5 mr-5">
        <h1 class="text-indigo-800 font-extrabold mb-8 text-xl">
          Payment Status Of This Month in Graph
        </h1>
  
        <div class="flex flex row">
          <h1 class="text-indigo-800 font-extrabold ml-5 text-xl">
            Payment Type:
          </h1>
          <div class="relative inline-block ml-5">
            <!-- <select
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
            </select> -->
            <select
              v-model="paymentTipe"
              @change="fetchData"
              class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="" selected>Select Payment Type</option>
              <option value="regular">Regular</option>
              <option value="Subsidy">Subsidy</option>
              <option value="Urgent">Urgent</option>
              <option value="Service">Service</option>
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
  
        <div class="flex flex row ml-10 mt-5">
          <div class="relative inline-block ml-5 flex flex-row space-x-2">
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
  
        <div class="ml-4 mr-4 mt-5">
          <hr
            class="my-4 md:min-w-full bg-blue-900 border border-gray-300 mb-32"
          />
        </div>
  
        <div class="h-96 w-96  ml-10 border-r border-indigo-200 pr-5 ">
          <h1 class="text-indigo-800 text-2xl font-extrabold mb-5">This Month's Payment Status</h1>
          <canvas ref="pieChartCanvas" class="chart"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Chart from "chart.js/auto";
  import axios from "axios";
  export default {
    name: "ChartComponent",
    data() {
      return {
        barChart: null,
        paymentSelected:false,
        thisMOnthPayments:"",
       confirmedCount :"",
       rejectedCount :"",
       requestedCount : "",
        paymentTipe:"",
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
        graphData: "",
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
    created() {
      this.apiClient = axios.create({
        baseURL: "http://localhost:8081", // Set your base URL here
      });
    },
    mounted() {
      const newData = [8, 8,8]; // Example new data
      this. createPieChart(newData);
    },
    methods: {
      createPieChart(newData) {
    const pieChartLabels = ["Confirmed", "Requested", "Rejected"];
    const pieChartData = {
      labels: pieChartLabels,
      datasets: [
        {
          label: "Project Report",
          data: newData,
          backgroundColor: [
            "rgba(0, 122, 230)",
            "rgba(255, 255, 0)",
            "rgba(233, 30, 99)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const pieChartConfig = {
      type: "pie",
      data: pieChartData,
      options: {
        // Add any additional options for the pie chart here
      },
    };
  
    const pieChartCanvas = this.$refs.pieChartCanvas;
    const pieChartCtx = pieChartCanvas.getContext("2d");
  
    // Destroy the existing chart if it exists
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  
    // Create a new chart
    this.pieChart = new Chart(pieChartCtx, pieChartConfig);
    console.log(this.pieChart);
  },
  
  
      fetchData() {
       // alert("fetching data");
  
       this.paymentSelected = false;
  const currentDate = new Date();
  const y = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const timeRange = 'monthly';
  const paymentType = 'regularPayment';
  
  this.apiClient
    .get(`/api/v1/closeHistory/reports?timeRange=${timeRange}&y=${y}&month=${month}&paymentType=${paymentType}`)
    .then((response) => {
      console.log("response", response);
      if (response.data !== null) {
        console.log("response.data", response.data);
  
        this.thisMonthPayments = response.data.message[0];
        this.requestedCount = response.data.message[1];
        this.confirmedCount = response.data.message[2];
        this.rejectedCount = response.data.message[3];
  
        console.log("response requested", this.requestedCount);
        console.log("response confirm", this.confirmedCount);
        console.log("response rejected", this.rejectedCount);
        const newData = [this.confirmedCount, this.requestedCount, this.rejectedCount];
        console.log("graph data is ",this.barChart.data.datasets[0].data)
        // Update the bar chart with the fetched counts
        //this.barChart.data.datasets[0].data = newData;
        
  // Update the chart
       // this.barChart.update();
       this.createChart(newData);
        console.log("in the response to be displayed ")
      } else {
        console.log("data is not inserted");
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
  
  
  
  
  
  
  
  
        // if (this.dateType == "Annual") {
        //   console.log("datetaype", this.dateType);
        //   console.log("year", this.year);
        //   this.annaualSelected = true;
        //   this.semiAnaualSelected = false;
        //   this.monthlySelected = false;
        //   this.weeklySelected = false;
        //   this.dailySelected = false;
        // }
  
        // if (this.dateType == "semiAnnual") {
        //   console.log("datetaype", this.dateType);
        //   console.log("year,semiyear", this.year, this.semiYear);
        //   this.annaualSelected = true;
        //   this.semiAnaualSelected = true;
        //   this.monthlySelected = false;
        //   this.weeklySelected = false;
        //   this.dailySelected = false;
  
        //   if (this.semiYear === null) {
        //     this.selectSemiAnnual = true;
        //     return;
        //   }
        // }
  
        // if (this.dateType == "monthly") {
        //   console.log("datetaype", this.dateType);
        //   console.log("year,month", this.year, this.month);
        //   this.AnaualSelected = true;
        //   this.monthlySelected = true;
        //   this.weeklySelected = false;
        //   this.dailySelected = false;
        //   this.semiAnaualSelected = false;
        //   if (this.month === null) {
        //     this.selectMonth = true;
        //     return;
        //   }
        //   if (this.day === null) {
        //     this.selectDay = true;
        //     return;
        //   }
        // }
  
        // if (this.dateType == "weekly") {
        //   this.annaualSelected = true;
        //   this.monthlySelected = true;
        //   this.weeklySelected = true;
        //   this.semiAnaualSelected = false;
        //   this.dailySelected = false;
        //   console.log("year,month,week", this.year, this.month, this.week);
        //   console.log("datetaype", this.dateType);
  
        //   if (this.month === null) {
        //     this.selectMonth = true;
        //     return;
        //   }
        //   if (this.week === null) {
        //     this.selectDay = true;
        //     return;
        //   }
        // }
  
        // if (this.dateType == "daily") {
        //   console.log("year,month,week", this.year, this.month, this.day);
        //   this.annaualSelected = true;
        //   this.monthlySelected = true;
        //   this.dailySelected = true;
        //   this.semiAnaualSelected = false;
        //   this.weeklySelected = false;
        //   console.log("datetaype", this.dateType);
        //   if (this.month === null) {
        //     this.selectMonth = true;
        //     return;
        //   }
        //   if (this.day === null) {
        //     this.selectDay = true;
        //     return;
        //   }
        // }
      },
    },
  };
  </script>
  
  