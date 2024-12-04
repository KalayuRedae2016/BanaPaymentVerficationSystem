<template>
    <div class="mb-16">
       <h1 class="py-3 px-6 text-xl text-indigo-800 font-bold">Deadlines(Current Settings)</h1>
      <div class="grid grid-cols-1 gap-4 border-t border-indigo-800">
        <div class="bg-white rounded-lg p-6">
  <div class="space-y-2 text-gray-700 text-xs">
    <p class="flex justify-between items-center">
      <strong class="w-1/2">Regular Amount:</strong> 
      <span class="w-1/2 ">{{ paymentSetting.regularAmount }}</span>
    </p>
    <p class="flex justify-between items-center">
      <strong class="w-1/2">Subsidy Amount:</strong> 
      <span class="w-1/2 ">{{ paymentSetting.subsidyAmount }}</span>
    </p>
    <p class="flex justify-between items-center">
      <strong class="w-1/2">Urgent Amount:</strong> 
      <span class="w-1/2 ">{{ paymentSetting.urgentAmount }}</span>
    </p>
    <p class="flex justify-between items-center">
      <strong class="w-1/2">Service Amount:</strong> 
      <span class="w-1/2 ">{{ paymentSetting.serviceAmount }}</span>
    </p>
    <p class="flex justify-between items-center">
      <strong class="w-1/2">Starting Date:</strong> 
      <span class="w-1/2 ">{{ paymentSetting.startingDate }}</span>
    </p>
    <p class="flex justify-between items-center">
      <strong class="w-1/2">Ending Date:</strong> 
      <span class="w-1/2 ">{{ paymentSetting.endingDate }}</span>
    </p>
    <p class="flex justify-between items-center">
      <strong class="w-1/2">Penalty 5 days in %:</strong> 
      <span class="w-1/2 ">{{ paymentSetting.penalityLate5Days }}</span>
    </p>
    <p class="flex justify-between items-center">
      <strong class="w-1/2">Penalty 7-10 days in %:</strong> 
      <span class="w-1/2">{{ paymentSetting.penalityLate10Days }}</span>
    </p>
    <p class="flex justify-between items-center">
      <strong class="w-1/2">Penalty above 10 days %:</strong> 
      <span class="w-1/2 ">{{ paymentSetting.penalityLateAbove10Days }}</span>
    </p>
    <p class="flex justify-between items-center">
      <strong class="w-1/2">Registration Fee in %:</strong> 
      <span class="w-1/2 ">{{ paymentSetting.regFeeRate }}</span>
    </p>
  </div>
</div>


      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        paymentSetting: {
        paymentActivate: true,
        regularAmount: '5000',
        subsidyAmount: '1000',
        urgentAmount: '40000',
        serviceAmount: '200',
        activeYear: '2024',
        activeMonth: '1',
        startingDate: "2024-05-01",
        endingDate: "2024-05-30",
        penalityLate5Days: '5',
        penalityLate10Days: '7',
        penalityLateAbove10Days: '10',
        regFeeRate: "10",
      },
    }
    },
    mounted(){
      this.$apiClient
      .get("/api/v1/paymentSetting/latest")
      .then((response) => {
        console.log("response latest setting", response);
        if (response.data.status === 1) {
          if(response.data.paymentSetting){
          console.log("");
          this.paymentSettingCreated=1;
          const endingDate = new Date(response.data.paymentSetting.endingDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          endingDate.setHours(0, 0, 0, 0);
          if (today > endingDate) {
            this.paymentActivate = true;
          }
          this.paymentSetting = response.data.paymentSetting;
          console.log("response setttinghh h ", response.data);
        }else{
          this.paymentSettingCreated=2;
        }
       }
      })
      .catch((error) => {
        console.error(
          "An error occurred while fetching payment settings:",
          error
        );
        this.paymentSettingCreated = 0; // Indicate an error state
      });
    },
    methods:{

    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  </style>
  