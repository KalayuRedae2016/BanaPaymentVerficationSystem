<template>
  <div class="border border-gray-300 rounded-lg p-4 mt-3">
    <div class=" space-x-0  flex flex-col lg:flex-rowlg:space-x-5">
      <div class="flex flex-row  w-full lg:w-1/2 space-x-3 mt-5">
        <label for="month" class="w-1/4 block text-sm font-medium text-gray-700"
          >{{ $t('year') }}</label
        >
        <select
          @change="fetchPaymentSetting()"
          v-model="year"
          id="month"
          class="custom-select"
        >
          <option value="" disabled>Select Year</option>
          <option v-for="year in $years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <div class="flex flex-row w-full lg:w-1/2 space-x-3 mt-5">
        <label for="month" class="w-1/4 block text-sm font-medium text-gray-700"
          >  {{ $t('month') }}</label
        >
        <select
          @change="fetchPaymentSetting()"
          id="month"
          class="custom-select "
          v-model="month"
        >
          <option value="" disabled>Select Month</option>
          <option v-for="month in $months" :key="month" :value="month.value">
            {{ month.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="p-4">
      <p v-if="selectYear" class="text-red-500">{{ $t('pleaseSelectYear') }}</p>
      <p v-if="selectMonth" class="text-blue-500">{{ $t('pleaseSelectMonth') }}</p>
    </div>

    <div v-if="!noSettingOpened" class="grid grid-cols-1 gap-4 border-t  border-gray-300 -mt-5 rounded-lg " >
   
      <div  class="w-full m-4">


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
            <i class="fas fa-clock text-yellow-500"></i>
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

    <div v-if="noSettingOpened" class="m-5">
      <p class="text-blue-500">
        {{ $t('noOpenedPaymentSetting') }}
      </p>
      <p class="text-pink-400"> {{ $t('selectedTime') }} {{ year }} -{{ month }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noSettingOpened: true,
      selectYear: false,
      selectMonth: false,

      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      paymentSetting: {
        regularAmount: "",
        subsidyAmount: "",
        urgentAmount: "",
        serviceAmount: "",
        startingDate: "",
        endingDate: "",
        regFeeRate: "",
        penalityLate5Days: "",
        penalityLate7Days: "",
        penalityLateAbove10Days: "",
      },
    };
  },

  mounted() {
    this.fetchPaymentSetting();
  },
  methods: {
    fetchPaymentSetting() {
 this.noSettingOpened=true;
      if (this.year == "") {
        this.selectYear = true;
        return;
      } else if (this.month == "") {
        this.selectMonth = true;
        return;
      }

      this.$apiClient
        .get(
          `api/v1/paymentSetting/?activeYear=${this.year}&activeMonth=${this.month}`
        )
        .then((response) => {
          if (response.data.status === 1) {
            console.log("response from history ", response.data);
            this.paymentSetting = response.data.paymentSetting;
            if (response.data.paymentSetting) {
              this.noSettingOpened = false;
            } else {
              this.noSettingOpened = true;
            }
          } else {
            console.log("payment setting  not found");
          }
        })
        .catch((error) => {});
    },
  },
};
</script>
