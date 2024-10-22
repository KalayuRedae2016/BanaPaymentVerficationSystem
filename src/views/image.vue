<template>
    <div class="p-4">
      <div class="max-w-screen-lg mx-auto">
        <!-- Adjust the grid to have 2 columns and 5 rows -->
        <div
          class="grid grid-cols-2 gap-4 print-grid"
          style="width: 21cm; border: none; padding: 0; overflow: hidden;"
        >
          <div
            v-for="index in 10"
            :key="index"
            class="bg-white shadow-lg rounded-lg overflow-hidden print-card"
          >
            <div class="bg-brown-600 text-white p-4 flex items-center">
              <img
                src="https://via.placeholder.com/50"
                alt="Logo"
                class="mr-2"
              />
              <h2 class="text-lg font-semibold">Header Title</h2>
            </div>
            <div class="flex p-4">
              <div class="w-1/2 pr-2">
                <img
                  src="https://via.placeholder.com/100"
                  alt="User Image"
                  class="w-full h-auto rounded-lg"
                />
              </div>
              <div class="w-1/2 pl-2">
                <p class="font-bold">User Code: <span class="font-normal">USER123</span></p>
                <p class="font-bold">Full Name: <span class="font-normal">John Doe</span></p>
                <p class="font-bold">Address: <span class="font-normal">123 Main St, City, Country</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardGenerator',
  };
  </script>
  
  <style scoped>
  .bg-brown-600 {
    background-color: #6f4c3e; /* Coffee color */
  }
  
  @media print {
    .print-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0;
    }
    
    .print-card {
      height: 5.8cm; /* Adjusted to fit 5 rows on A4 */
      width: 10cm;   /* Adjusted to fit 2 columns on A4 */
      margin: 0;
      padding: 0;
      page-break-inside: avoid; /* Prevent breaking inside a card */
    }
  
    .bg-white {
      box-shadow: none; /* Remove shadow for print */
    }
  
    .p-4 {
      padding: 0;
    }
  
    .max-w-screen-lg {
      width: 21cm;
      margin: 0;
    }
  }
  </style>
  