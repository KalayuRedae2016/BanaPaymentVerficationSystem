<template>
    <div class="flex flex-col overflow-hidden min-h-screen" style="margin-top: 20px">
      <div class="ml-5 mr-5">
        <h1>Annual Report</h1>
        <div class="ml-4 mr-4">
          <hr class="my-4 md:min-w-full bg-blue-900 border border-blue-700" />
        </div>
        <div class="chart-container">
          <canvas ref="barChartCanvas" class="chart"></canvas>
        </div>
        <div class="chart-container">
          <canvas ref="pieChartCanvas" class="chart"></canvas>
        </div>
        <div class="chart-container">
          <canvas ref="doughnutChartCanvas" class="chart"></canvas>
        </div>
      </div>
      <div class="ml-4 mr-4">
        <hr class="my-4 md:min-w-full bg-blue-900 border border-blue-700" />
      </div>
    </div>
  </template>
  
  <script>
  import Chart from "chart.js/auto";
  
  export default {
    name: "ChartComponent",
    mounted() {
      this.createBarChart();
      this.createPieChart();
      this.createDoughnutChart();
    },
    methods: {
      createBarChart() {
        const barChartLabels = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "September",
          "November",
          "December",
          "July",
        ];
  
        const barChartData = {
          labels: barChartLabels,
          datasets: [
            {
              label: "Project Report",
              data: [65, 59, 80, 81, 56, 55, 40, 10, 90],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
                "rgba(201, 150, 67, 0.2)",
                "rgba(201, 400, 100, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
                "rgb(201, 100, 50)",
                "rgb(201, 250, 10)",
              ],
              borderWidth: 1,
            },
          ],
        };
  
        const barChartConfig = {
          type: "bar",
          data: barChartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };
  
        const barChartCanvas = this.$refs.barChartCanvas;
        const barChartCtx = barChartCanvas.getContext("2d");
        const barChart = new Chart(barChartCtx, barChartConfig);
        console.log(barChart);
      },
      createPieChart() {
        const pieChartLabels = ["Red", "Blue", "Yellow", "Green", "Purple"];
        const pieChartData = {
          labels: pieChartLabels,
          datasets: [
            {
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
  borderWidth: 1,
            },
          ],
        };
  
        const pieChartConfig = {
          type: "pie",
          data: pieChartData,
        };
  
        const pieChartCanvas = this.$refs.pieChartCanvas;
        const pieChartCtx = pieChartCanvas.getContext("2d");
        const pieChart = new Chart(pieChartCtx, pieChartConfig);
        console.log(pieChart);
      },
      createDoughnutChart() {
        const doughnutChartLabels = ["Red", "Blue", "Yellow", "Green", "Purple"];
        const doughnutChartData = {
          labels: doughnutChartLabels,
          datasets: [
            {
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };
  
        const doughnutChartConfig = {
          type: "doughnut",
          data: doughnutChartData,
        };
  
        const doughnutChartCanvas = this.$refs.doughnutChartCanvas;
        const doughnutChartCtx = doughnutChartCanvas.getContext("2d");
        const doughnutChart = new Chart(doughnutChartCtx, doughnutChartConfig);
        console.log(doughnutChart);
      },
    },
  };
  </script>