<template>
  <div class="border border-gray-300 rounded-lg p-4 mt-3">
    <div class="flex flex-col lg:flex-row lg:space-x-5">
      <div class="flex flex-row w-1/2 space-x-3 mt-5">
        <label for="month" class="block text-sm font-medium text-gray-700"
          >Year</label
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
          >Month</label
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
      <p v-if="selectYear" class="text-red-500">Please Select Year</p>
      <p v-if="selectMonth" class="text-blue-500">Please Select Month</p>
    </div>

    <div v-if="!noSettingOpened" class="grid grid-cols-1 gap-4 border-t-4  border-b-4 border-blue-500 -mt-5 rounded-lg" >
      <div class="bg-white shadow-md rounded-lg px-6 pt-5">
        <div class="space-y-2 text-gray-700">
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Regular Amount:</strong>
            <span class="w-1/2">{{ paymentSetting.regularAmount }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Subsidy Amount:</strong>
            <span class="w-1/2">{{ paymentSetting.subsidyAmount }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Urgent Amount:</strong>
            <span class="w-1/2">{{ paymentSetting.urgentAmount }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Service Amount:</strong>
            <span class="w-1/2">{{ paymentSetting.serviceAmount }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Starting Date:</strong>
            <span class="w-1/2">{{ paymentSetting.formattedStartDate }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Ending Date:</strong>
            <span class="w-1/2">{{ paymentSetting.formattedEndDate }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Penalty 5 days in %:</strong>
            <span class="w-1/2">{{ paymentSetting.penalityLate5Days }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Penalty 7-10 days in %:</strong>
            <span class="w-1/2">{{ paymentSetting.penalityLate10Days }}</span>
          </p>
          <p class="flex justify-between items-center">
            <strong class="w-1/2">Penalty above 10 days %:</strong>
            <span class="w-1/2">{{
              paymentSetting.penalityLateAbove10Days
            }}</span>
          </p>
          <p class="flex justify-between items-center pb-10">
            <strong class="w-1/2">Registration Fee in %:</strong>
            <span class="w-1/2 ">{{ paymentSetting.regFeeRate }}</span>
          </p>
        </div>
      </div>
    </div>

    <div v-if="noSettingOpened" class="m-5">
      <p class="text-blue-500">
        No opened payment setting found for the selected month in the given
        year. You can create and activate a setting for this month for the given
        year.
      </p>
      <p class="text-pink-400">Selected Time {{ year }} -{{ month }}</p>
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
