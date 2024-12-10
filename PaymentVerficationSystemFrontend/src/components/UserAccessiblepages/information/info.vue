<template>
    <div class="mb-16">
       <h1 class="py-3 px-6 text-xl text-indigo-800 font-bold">Deadlines(Current Settings)</h1>
      <div class="grid grid-cols-1 gap-4 border-t border-indigo-800">
        <div class="bg-white rounded-lg p-6">
          <div >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Left Column (First 6 Items) -->
      <div class="space-y-4">
        <div class="bg-white border-b border-dotted p-4 rounded-md ">
          <div class="flex items-center space-x-3">
            <i class="fas fa-money-bill-alt text-green-500"></i>
            <span class="font-semibold text-sm">{{ $t('regularAmount') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.regularAmount }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted p-4 rounded-md shadow-sm">
          <div class="flex items-center space-x-3">
            <i class="fas fa-hand-holding-usd text-yellow-500"></i>
            <span class="font-semibold text-sm">{{ $t('subsidyAmount') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.subsidyAmount > 0 ? paymentSetting.subsidyAmount : '0' }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted p-4 rounded-md shadow-sm">
          <div class="flex items-center space-x-3">
            <i class="fas fa-exclamation-circle text-red-500"></i>
            <span class="font-semibold text-sm">{{ $t('urgentAmount') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.urgentAmount > 0 ? paymentSetting.urgentAmount : '0' }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted p-4 rounded-md shadow-sm">
          <div class="flex items-center space-x-3">
            <i class="fas fa-cogs text-indigo-500"></i>
            <span class="font-semibold text-sm">{{ $t('serviceAmount') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.serviceAmount }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted p-4 rounded-md shadow-sm">
          <div class="flex items-center space-x-3">
            <i class="fas fa-percent text-blue-500"></i>
            <span class="font-semibold text-sm">{{ $t('registrationFee') }} %:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.regFeeRate }} %</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted p-4 rounded-md shadow-sm">
          <div class="flex items-center space-x-3">
            <i class="fas fa-calendar-check text-teal-500"></i>
            <span class="font-semibold text-sm">{{ $t('activeYear') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.activeYear }}</span>
          </div>
        </div>
      </div>

      <!-- Right Column (Remaining Items) -->
      <div class="space-y-4">
        <div class="bg-white border-b border-dotted p-4 rounded-md shadow-sm">
          <div class="flex items-center space-x-3">
            <i class="fas fa-calendar-day text-purple-500"></i>
            <span class="font-semibold text-sm">{{ $t('activeMonth') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.activeMonth }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted p-4 rounded-md shadow-sm">
          <div class="flex items-center space-x-3">
            <i class="fas fa-calendar-alt text-orange-500"></i>
            <span class="font-semibold text-sm">{{ $t('startingDay') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.formattedStartDate }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted p-4 rounded-md shadow-sm">
          <div class="flex items-center space-x-3">
            <i class="fas fa-calendar-times text-red-500"></i>
            <span class="font-semibold text-sm">{{ $t('endingDay') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.formattedEndDate }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted p-4 rounded-md shadow-sm">
          <div class="flex items-center space-x-3">
            <i class="fas fa-clock text-yellow-500"></i>
            <span class="font-semibold text-sm">{{ $t('penaltyPerFiveDaysPercentage') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.penalityLate5Days }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted p-4 rounded-md shadow-sm">
          <div class="flex items-center space-x-3">
            <i class="fas fa-clock text-pink-400"></i>
            <span class="font-semibold text-sm">{{ $t('penaltyPerTenDaysPercentage') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.penalityLate10Days }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted p-4 rounded-md shadow-sm">
          <div class="flex items-center space-x-3">
            <i class="fas fa-clock text-red-500"></i>
            <span class="font-semibold text-sm">{{ $t('penaltyPerAboveTenDaysPercentage') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.penalityLateAbove10Days }}</span>
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
  