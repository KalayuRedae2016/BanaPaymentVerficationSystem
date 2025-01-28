<template>
  <div class="container mx-auto flex flex-col">
    <Toast ref="toast" />
    <div class="pb-5 flex flex-col bg-white -mt-2">
      <div class="mt-5 ">

        <div class="overflow-x-auto h-96 ">
          <table class="w-full border border-gray-300">
            <thead>
              <tr class="bg-blue-50 text-xs text-blue-500">
                <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                  Log Type
                </th>
                <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                  Action
                </th>
                <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                  Actor
                </th>
                <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                  ip Address
                </th>
                <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                  Description
                </th>
                <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="text-xs">
              <tr class="hover:bg-blue-100 border-t border-b border-gray-300" v-for="logData in logsData"
                :key="logData._id">

                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  {{ logData.model }}
                </td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  {{ logData.action }}
                </td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  {{ logData.actor }}
                </td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  {{ logData.ipAddress }}
                </td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  {{ logData.description }}
                </td>
                <td class="flex flex-row space-x-2 p-3 text-md text-blue-500 whitespace-nowrap">
                  <button class="custom-button" @click="
                    logDetail = true;

                  ">
                    <i class="fa fa-edit"></i>Detail
                  </button>


                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!logsData" class="m-5 text-blue-500">
            No Logs
          </div>
        </div>
      </div>
    </div>

    <div v-if="logDetail">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div class="bg-white rounded-lg p-6 border border-cyan-500 px-5 w-2/3">
            <div class="flex flex-row justify-between items-center">
              <div>
                <label class="custom-label text-lg font-bold">
                  {{ $t("Setting Logs") }}
                </label>
              </div>
              <div>
                <svg @click="logDetail = !logDetail"
                  class="w-6 h-6 custom-star hover:text-red-700 transition-colors duration-300 cursor-pointer"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <hr class="my-4 md:min-w-full bg-red-500" />

            <div class="grid grid-cols-1 md:grid-cols-2 overflow-y-auto h-96 lg:h-80 ">
              <!-- Left Column (First 6 Items) -->
              <div class="mt-3">
                <div class="bg-white border-b border-dotted  rounded-md border-b border-gray-500 ">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-money-bill-alt text-green-500"></i>
                    <span class="font-semibold text-sm">{{ $t('regularAmount') }}:</span>
                    <span class="text-lg text-gray-800">{{ paymentSetting.regularAmount }}</span>
                  </div>
                </div>

                <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-hand-holding-usd text-yellow-500"></i>
                    <span class="font-semibold text-sm">{{ $t('subsidyAmount') }}:</span>
                    <span class="text-lg text-gray-800">{{ paymentSetting.subsidyAmount > 0 ?
                      paymentSetting.subsidyAmount : '0' }}</span>
                  </div>
                </div>

                <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-exclamation-circle text-red-500"></i>
                    <span class="font-semibold text-sm">{{ $t('urgentAmount') }}:</span>
                    <span class="text-lg text-gray-800">{{ paymentSetting.urgentAmount > 0 ? paymentSetting.urgentAmount
                      : '0' }}</span>
                  </div>
                </div>

                <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-cogs text-indigo-500"></i>
                    <span class="font-semibold text-sm">{{ $t('serviceAmount') }}:</span>
                    <span class="text-lg text-gray-800">{{ paymentSetting.serviceAmount }}</span>
                  </div>
                </div>

                <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-percent text-blue-500"></i>
                    <span class="font-semibold text-sm">{{ $t('registrationFee') }}:</span>
                    <span class="text-lg text-gray-800">{{ paymentSetting.regFeeRate }} %</span>
                  </div>
                </div>

                <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-check text-teal-500"></i>
                    <span class="font-semibold text-sm">{{ $t('activeYear') }}:</span>
                    <span class="text-lg text-gray-800">{{ paymentSetting.activeYear }}</span>
                  </div>
                </div>
              </div>

              <!-- Right Column (Remaining Items) -->
              <div class="">
                <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-day text-purple-500"></i>
                    <span class="font-semibold text-sm">{{ $t('activeMonth') }}:</span>
                    <span class="text-lg text-gray-800">{{ paymentSetting.activeMonth }}</span>
                  </div>
                </div>

                <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-alt text-orange-500"></i>
                    <span class="font-semibold text-sm">{{ $t('startingDay') }}:</span>
                    <span class="text-lg text-gray-800">{{ paymentSetting.formattedStartDate }}</span>
                  </div>
                </div>

                <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-times text-red-500"></i>
                    <span class="font-semibold text-sm">{{ $t('endingDay') }}:</span>
                    <span class="text-lg text-gray-800">{{ paymentSetting.formattedEndDate }}</span>
                  </div>
                </div>

                <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-clock text-yellow-500"></i>
                    <span class="font-semibold text-sm">{{ $t('penaltyPerFiveDaysPercentage') }}:</span>
                    <span class="text-lg text-gray-800">{{ paymentSetting.penalityLate5Days }}%</span>
                  </div>
                </div>

                <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-clock text-yellow-500"></i>
                    <span class="font-semibold text-sm">{{ $t('penaltyPerTenDaysPercentage') }}:</span>
                    <span class="text-lg text-gray-800"><span>{{ paymentSetting.penalityLate10Days.toFixed(0) }}</span>
                      %</span>
                  </div>
                </div>

                <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-clock text-red-500"></i>
                    <span class="font-semibold text-sm">{{ $t('penaltyPerAboveTenDaysPercentage') }}:</span>
                    <span class="text-lg text-gray-800">{{ paymentSetting.penalityLateAbove10Days }}%</span>
                  </div>
                </div>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Toast from "../../Common/Toast.vue";
export default {
  components: {
    Toast,
  },
  name: "paymentTransfersView",
  data() {
    return {
      logsData: [
        {
          _id: "1",
          model: "user",
          action: "Delate",
          actor: "admin1",
          ipAddress: "49.102.23.45",
          description: "This is the delate function",
        },
      ],
      logDetail: false,
      paymentSetting: {
        regularAmount: 5000,
        subsidyAmount: 3000,
        urgentAmount: 1200,
        serviceAmount: 800,
        regFeeRate: 5,
        activeYear: 2025,
        activeMonth: "January",
        formattedStartDate: "2025-01-01",
        formattedEndDate: "2025-01-31",
        penalityLate5Days: 2,
        penalityLate10Days: 5,
        penalityLateAbove10Days: 10
      }

    };



  },

  watch: {
    searchQuery: {
      handler: "filteredPaymentTransfersInSearch",
      immediate: true,
    },
  },

  computed: {

  },
  created() {
    this.role = localStorage.getItem("role");
  },
  mounted() {
    // this.displayedItems();
    this.fetchPaymentSettingLogs();
  },
  methods: {
    async fetchPaymentSettingLogs() {
      const params = {
        model: "settings"
      }
      try {
        await this.$apiGet("/api/v1/logs", params).then((response) => {
          console.log("response", response);
          this.logsData = response.logs;
        });
      } catch (error) {
        console.log("error", error);
      } finally {
      }
    },
  },
};
</script>

<style>
.fade-enter-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>