<template>
  <div class="border border-gray-300 rounded-lg p-4 mt-3">
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="flex flex-row w-1/2 space-x-3 mt-5">
        <label for="month" class="block text-sm font-medium text-gray-700"
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
      <div class="flex flex-row w-1/2 space-x-3 mt-5">
        <label for="month" class="block text-sm font-medium text-gray-700"
          >  {{ $t('month') }}</label
        >
        <select
          @change="fetchPaymentSetting()"
          id="month"
          class="custom-select"
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

    <div v-if="!noSettingOpened" class="grid grid-cols-1 gap-4 border-t-4  border-b-4 border-blue-500 -mt-5 rounded-lg" >
      <div class="bg-white shadow-md rounded-lg px-6 pt-5">
        <div class="space-y-2 text-gray-700">
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Regular Amount {{ $t('regularAmount') }}:</strong>
            <span class="w-1/2">{{ paymentSetting.regularAmount }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Subsidy Amount {{ $t('subsidyAmount') }}:</strong>
            <span class="w-1/2">{{ paymentSetting.subsidyAmount }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Urgent Amount {{ $t('urgentAmount') }}:</strong>
            <span class="w-1/2">{{ paymentSetting.urgentAmount }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Service Amount {{ $t('serviceAmount') }}:</strong>
            <span class="w-1/2">{{ paymentSetting.serviceAmount }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Starting Date {{ $t('startingDate') }}:</strong>
            <span class="w-1/2">{{ paymentSetting.formattedStartDate }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Ending Date {{ $t('endingDate') }}:</strong>
            <span class="w-1/2">{{ paymentSetting.formattedEndDate }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">{{ $t('penaltyPerFiveDaysPercentage') }} %:</strong>
            <span class="w-1/2">{{ paymentSetting.penalityLate5Days }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">{{ $t('penaltyPerTenDaysPercentage') }} %:</strong>
            <span class="w-1/2">{{ paymentSetting.penalityLate10Days }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">{{ $t('penaltyPerAboveTenDaysPercentage') }} %:</strong>
            <span class="w-1/2">{{
              paymentSetting.penalityLateAbove10Days
            }}</span>
          </p>
          <p class="flex justify-between items-center pb-10">
            <strong class="w-1/2">{{$t('registrationFee')  }} %:</strong>
            <span class="w-1/2 ">{{ paymentSetting.regFeeRate }}</span>
          </p>
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
