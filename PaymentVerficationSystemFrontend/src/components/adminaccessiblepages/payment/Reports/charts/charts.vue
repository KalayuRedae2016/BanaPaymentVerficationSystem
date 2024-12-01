<template>
  <div
    class="flex flex-col overflow-hidden min-h-screen"
    style="margin-top: 20px"
  >
    <div class="">
      <div class="">
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
      paymentSelected: false,
      thisMOnthPayments: "",
      confirmedCount: "",
      rejectedCount: "",
      requestedCount: "",
      paymentTipe: "",
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

      monthlyPaid:0,
      monthlyPending:0,
      };
  },

  mounted() {
    this.latestPaymentSetting();
  },
  methods: {
  latestPaymentSetting() {
      this.$apiClient
        .get("/api/v1/paymentSetting/latest")
        .then((response) => {
          console.log("latest month response:", response);

          if (response.data.status === 1) {
            this.activeMonth = response.data.paymentSetting.activeMonth;
            this.activeYear = response.data.paymentSetting.activeYear;
            console.log("active year and month in charty:", this.activeYear, this.activeMonth);
            this.monthlyPayment();
          }
        })
        .catch((error) => {
          console.error(
            "An error occurred while fetching Payment settings:",
            error
          );
      });
    },
   monthlyPayment() {
      const timeRange = "monthly";
      this.$apiClient
        .get(
          `/api/v1/payments/reports?timeRange=${timeRange}&year=${this.activeYear}&month=${'9'}`
        )
        .then((response) => {
          console.log("monthly report", response);
          this.monthlyReport = response.data.items;
          if(response.data.items.categorizedPayments.confirmed!=''){
             this.monthlyPaid=response.data.items.categorizedPayments.confirmed.uniqueUsers;
          }else{
            console.log("else confirmed")
            this.monthlyPaid=0;
          }
          if(response.data.items.categorizedPayments.pending!=''){
            console.log("in pending")
             this.monthlyPending=response.data.items.categorizedPayments.pending.uniqueUsers;
          }else{
            console.log("else xin pending")
            this.monthlyPending=0;
          }
          // const monthlyPaid =0;
          // const confirmedUniqueUsers = response.data?.items?.categorizedPayments?.confirmed?.uniqueUsers;
          // const pendingUniqueUsers = response.data?.items?.categorizedPayments?.pending?.uniqueUsers;
          // monthlyPaid = confirmedUniqueUsers !== undefined ? confirmedUniqueUsers : 0;
          // console.log("monthlyPaid updated:", monthlyPaid);
          // const  monthlyPending=pendingUniqueUsers !== undefined ? pendingUniqueUsers : 0;
         
          const newData=[this.monthlyPending, this.monthlyPaid];
          this.createPieChart(newData);
         
        })
        .catch((error) => {
          console.log(
            "active month and year in catch",
            this.activeMonth,
            this.activeYear
          );
          console.log("Error fetching reports:", error);
        });
    },

    createPieChart(newData) {
      const pieChartLabels = ["Pending Payments", "Confirmed Payments"];
      const pieChartData = {
        labels: pieChartLabels,
        datasets: [
          {
            label: "Project Report",
            data: newData,
            backgroundColor: ["rgba(255, 255, 0)","rgba(0, 122, 230)"],

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
  },
};
</script>

