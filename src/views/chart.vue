<template>
    <div class="flex justify-center items-center h-screen">
      <div class="flex flex-col items-center">
        <canvas id="customPieChart" class="border border-gray-300"></canvas>
        <button @click="drawPieChart" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Draw Pie Chart
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pieData: {
          labels: ['Pending', 'Overdue', 'Confirmed'],
          values: [30, 20, 50], // Example data
          colors: ['#FF6384', '#36A2EB', '#FFCE56'] // Colors for each segment
        },
        canvasId: 'customPieChart'
      };
    },
    methods: {
      drawPieChart() {
        const canvas = document.getElementById(this.canvasId);
        const ctx = canvas.getContext('2d');
        const data = this.pieData;
        
        // Set canvas dimensions and responsiveness
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientWidth; // Maintain aspect ratio for a circle
  
        const total = data.values.reduce((acc, value) => acc + value, 0);
        let startAngle = 0;
  
        // Draw each segment
        data.values.forEach((value, index) => {
          const sliceAngle = (value / total) * 2 * Math.PI;
          const endAngle = startAngle + sliceAngle;
          
          // Draw the segment
          ctx.beginPath();
          ctx.moveTo(canvas.width / 2, canvas.height / 2);
          ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
          ctx.closePath();
          
          ctx.fillStyle = data.colors[index];
          ctx.fill();
          
          startAngle = endAngle;
        });
  
        // Draw labels
        ctx.fillStyle = '#000';
        ctx.font = '16px Arial';
        data.labels.forEach((label, index) => {
          const angle = (index / data.labels.length) * 2 * Math.PI - Math.PI / 4;
          const x = canvas.width / 2 + Math.cos(angle) * (canvas.width / 3);
          const y = canvas.height / 2 + Math.sin(angle) * (canvas.height / 3);
          ctx.fillText(label, x, y);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ensure the canvas is responsive */
  #customPieChart {
    width: 100%;
    height: auto;
  }
  </style>
  