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
      <div class="bg-white shadow-md rounded-lg px-6 pt-5 ">
        <div class="space-y-2 text-gray-700">
          <p class="flex justify-between items-center text-gray-500">
            <strong class="text-xs w-2/3 lg:w-1/2"> {{ $t('regularAmount') }}:</strong>
            <strong class="w-1/4 lg:w-1/2 ">{{ paymentSetting.regularAmount }}</strong>
          </p>
          <p class="flex justify-between items-center text-gray-500">
            <strong class="text-xs w-2/3 lg:w-1/2"> {{ $t('subsidyAmount') }}:</strong>
            <strong class="w-1/4 lg:w-1/2 ">{{ paymentSetting.subsidyAmount }}</strong>
          </p>
          <p class="flex justify-between items-center text-gray-500">
            <strong class="text-xs w-2/3 lg:w-1/2"> {{ $t('urgentAmount') }}:</strong>
            <strong class="w-1/4 lg:w-1/2 ">{{ paymentSetting.urgentAmount }}</strong>
          </p>
          <p class="flex justify-between items-center text-gray-500">
            <strong class="text-xs w-2/3 lg:w-1/2"> {{ $t('serviceAmount') }}:</strong>
            <strong class=" w-1/4 lg:w-1/2 ">{{ paymentSetting.serviceAmount }}</strong>
          </p>
          <p class="flex justify-between items-center text-gray-500">
            <strong class="text-xs w-2/3 lg:w-1/2"> {{ $t('startingDay') }}:</strong>
            <strong class="text-xs w-1/4 lg:w-1/2 ">{{ paymentSetting.formattedStartDate }}</strong>
          </p>
          <p class="flex justify-between items-center text-gray-500">
            <strong class="text-xs w-2/3 lg:w-1/2"> {{ $t('endingDay') }}:</strong>
            <strong class="text-xs w-1/4 lg:w-1/2 ">{{ paymentSetting.formattedEndDate }}</strong>
          </p>
          <p class="flex justify-between items-center text-gray-500">
            <strong class="text-xs w-2/3 lg:w-1/2">{{ $t('penaltyPerFiveDaysPercentage') }} :</strong>
            <strong class="w-1/4 lg:w-1/2 ">{{ paymentSetting.penalityLate5Days }}</strong>
          </p>
          <p class="flex justify-between items-center text-gray-500">
            <strong class="text-xs w-2/3 lg:w-1/2">{{ $t('penaltyPerTenDaysPercentage') }} :</strong>
            <strong class="w-1/4 lg:w-1/2 ">{{ paymentSetting.penalityLate10Days }}</strong>
          </p>
          <p class="flex justify-between items-center text-gray-500">
            <strong class="text-xs w-2/3 lg:w-1/2">{{ $t('penaltyPerAboveTenDaysPercentage') }} :</strong>
            <strong  class="w-1/4 lg:w-1/2 ">{{
              paymentSetting.penalityLateAbove10Days
            }}</strong >
          </p>
          <p class="flex justify-between items-center pb-10 text-gray-500">
            <strong class="text-xs w-2/3 lg:w-1/2">{{$t('registrationFee')  }} %:</strong>
            <strong  class="w-1/4 lg:w-1/2  ">{{ paymentSetting.regFeeRate }}</strong >
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
