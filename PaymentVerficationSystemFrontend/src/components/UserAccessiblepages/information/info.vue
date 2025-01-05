<template>
    <div class="mb-16">
       <h1 class="py-3 px-6 text-xl text-blue-500 font-bold">Deadlines(Current Settings)</h1>
      <div class="grid grid-cols-1 gap-4 border-t border-indigo-800">
        <div class="bg-white rounded-lg p-6">
          <div >
            <div >
            <div class="grid grid-cols-1 md:grid-cols-2">
              <!-- Left Column (First 6 Items) -->
              <div class="">
                <div
                  class="bg-white border-b border-dotted py-2 rounded-md border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-money-bill-alt text-green-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("regularAmount") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.regularAmount
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted py-2 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-hand-holding-usd text-yellow-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("subsidyAmount") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.subsidyAmount > 0
                        ? paymentSetting.subsidyAmount
                        : "0"
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted py-2 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-exclamation-circle text-red-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("urgentAmount") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.urgentAmount > 0
                        ? paymentSetting.urgentAmount
                        : "0"
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted py-2 px-4rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-cogs text-indigo-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("serviceAmount") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.serviceAmount
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted py-2 px-4rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-percent text-blue-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("registrationFee") }} %:</span
                    >
                    <span class="text-lg text-gray-800"
                      >{{ paymentSetting.regFeeRate }} %</span
                    >
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted py-2 px-4rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-check text-teal-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("activeYear") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.activeYear
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Right Column (Remaining Items) -->
              <div class="space-y-4 mt-1">
                <div
                  class="bg-white border-b border-dotted py-2 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-day text-purple-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("activeMonth") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.activeMonth
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-alt text-orange-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("startingDay") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.formattedStartDate
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted px-4rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-times text-red-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("endingDay") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.formattedEndDate
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted px-4rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-clock text-yellow-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("penaltyPerFiveDaysPercentage") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.penalityLate5Days
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted px-4rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-clock text-pink-400"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("penaltyPerTenDaysPercentage") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.penalityLate10Days
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted px-4rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-clock text-red-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("penaltyPerAboveTenDaysPercentage") }}:</span
                    >
                    <span class="text-lg text-gray-800"
                      >{{ paymentSetting.penalityLateAbove10Days }}%</span
                    >
                  </div>
                </div>
              </div>
         </div>          
     </div>
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
        regularAmount: '',
        subsidyAmount: '',
        urgentAmount: '',
        serviceAmount: '',
        activeYear: '',
        activeMonth: '',
        startingDate: "",
        endingDate: "",
        penalityLate5Days: '',
        penalityLate10Days: '',
        penalityLateAbove10Days: '',
        regFeeRate: "",
      },
    }
    },
    mounted(){
      this.$apiGet("/api/v1/paymentSetting/latest")
      .then((response) => {
        if (response.status === 1) {
          if(response.paymentSetting){
          this.paymentSetting = response.paymentSetting;
        }
       }
      })
      .catch((error) => {
        console.error(
          "An error occurred while fetching payment settings:",
          error
        )
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
  