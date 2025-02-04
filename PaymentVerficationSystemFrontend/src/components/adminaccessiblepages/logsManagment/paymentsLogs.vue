<template>
  <div class="container mx-auto flex flex-col ">
    <Toast ref="toast" />
    <div class="pb-5 flex flex-col bg-white -mt-2">
      <div class="mt-5">
        <div class="overflow-x-auto h-96 border-t border-gray-300">
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
                  {{ logData.actorName }}
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
                  action = logData.action;
                  handleLogDetail(logData, getPaymentType(logData.affectedData.UpdatedData));
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
                  {{ $t("Payments Logs") }}
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
            
            <div class="h-96 overflow-y-auto">

              <div class="bg-white p-4 rounded-lg  text-sm">
                <div class="text-black-500 font-bold mb-3">
                  {{
                    action === "Confirm"
                      ? "Payment Before Confirmed"
                      : action === "Delete"
                        ? "Deleted Payment"
                        : action === "Update"
                          ? "Payment Before  Update "
                      : "Unknown Action"
                  }}
                </div>
                <table class="w-full border-collapse border border-gray-300">
                  <tbody>
                    <tr class="border-b border-gray-300">
                      <td class="font-semibold p-2">Type:</td>
                      <td class="p-2 text-blue-500 font-bold">{{ paymentType.toUpperCase() }}</td>
                    </tr>
                 
                    <tr v-if="originalData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">TT Number:</td>
                      <td class="p-2">{{ originalData[paymentType].TTNumber || 'N/A'}}</td>
                    </tr>
                    <tr v-if="originalData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Amount:</td>
                      <td class="p-2">{{ originalData[paymentType].amount ||0 }} ETB</td>
                    </tr>
                    <tr v-if="originalData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Bank Type:</td>
                      <td class="p-2">{{ originalData[paymentType].bankType || 'N/A'}}</td>
                    </tr>
                    <tr v-if="originalData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Days Late:</td>
                      <td class="p-2">{{ originalData[paymentType].daysLate || 0 }}</td>
                    </tr>
                    <tr v-if="originalData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Is Paid:</td>
                      <td class="p-2">
                        <span :class="originalData[paymentType].isPaid ? 'text-green-600' : 'text-red-600'">
                          {{ originalData[paymentType].isPaid ? 'Yes' : 'No' }}
                        </span>
                      </td>
                    </tr>
                    <tr v-if="originalData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Paid At</td>
                      <td class="p-2">{{ originalData[paymentType].paidAt || 'N/A' }}</td>
                    </tr>
                    <tr v-if="originalData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Penalty:</td>
                      <td class="p-2">{{ originalData[paymentType].penality || 0 }} ETB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="bg-white p-4 rounded-lg  text-sm">

                <div class="text-black-500 font-bold mb-3">
                  <div class="text-black-500 font-bold mb-3">
                  {{
                    action === "Confirm"
                      ? "Payment After Confirmed"
                      : action === "Delete"
                        ? "Deleted Payment"
                        : action === "Update"
                          ? "Payment After  Update "
                      : "Unknown Action"
                  }}
                </div>
                </div>
                <table class="w-full border-collapse border border-gray-300">
                  <tbody>
                    <tr class="border-b border-gray-300">
                      <td class="font-semibold p-2">Type:</td>
                      <td class="p-2 text-blue-500 font-bold">{{ paymentType.toUpperCase() }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                      <td class="font-semibold p-2">Bill Code:</td>
                      <td class="p-2 text-blue-500 font-bold">{{ updatedData.billCode }}</td>
                    </tr>
                    <tr v-if="updatedData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">TT Number:</td>
                      <td class="p-2">{{ updatedData[paymentType].TTNumber }}</td>
                    </tr>
                    <tr v-if="updatedData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Amount:</td>
                      <td class="p-2">{{ updatedData[paymentType].amount ||0 }} ETB</td>
                    </tr>
                    <tr v-if="updatedData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Bank Type:</td>
                      <td class="p-2">{{ updatedData[paymentType].bankType }}</td>
                    </tr>
                    <tr v-if="updatedData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Days Late:</td>
                      <td class="p-2">{{ updatedData[paymentType].daysLate || 0 }}</td>
                    </tr>
                    <tr v-if="updatedData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Is Paid:</td>
                      <td class="p-2">
                        <span :class="updatedData[paymentType].isPaid ? 'text-green-600' : 'text-red-600'">
                          {{ updatedData[paymentType].isPaid ? 'Yes' : 'No' }}
                        </span>
                      </td>
                    </tr>
                    <tr v-if="updatedData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Paid At</td>
                      <td class="p-2">{{ updatedData[paymentType].paidAt || 'N/A' }}</td>
                    </tr>
                    <tr v-if="updatedData[paymentType]" class="border-b border-gray-300">
                      <td class="font-semibold p-2">Penalty:</td>
                      <td class="p-2">{{ updatedData[paymentType].penality || 0 }} ETB</td>
                    </tr>
                  </tbody>
                </table>
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

      action: "",
      paymentType: "",
      updatedData: {},
      originalData: {},
      payment: {
        fullName: "Hagose hadgu",
        activeMonth: 1,
        activeYear: 345,
        service: {

        }
      },
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
      affectedPayments: {
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

    getPaymentType(updatedData) {
      const paymentTypes = ['service', 'urgent', 'regular', 'penalty', 'subsidy'];
      return paymentTypes.find(type => updatedData[type]) || null;
    },
    handleLogDetail(logData, paymentType) {
      console.log("action", this.action);
      console.log("log data", logData)
      this.paymentType = paymentType;
      this.updatedData = logData.affectedData.UpdatedData;
      this.originalData = logData.affectedData.OrginalData;
      console.log("payment and updateddata with orignalData", paymentType, this.updatedData, this.originalData);
      //console.log("paymentType is from",this.updatedData[paymentType]);
    },

    async fetchPaymentSettingLogs() {
      const params = {
        model: "payments",
      };
      try {
        const response = await this.$apiGet("/api/v1/logs", params);
        console.log("response log payments", response);
        this.logsData = response.logs;
      } catch (error) {
        console.log("error", error);
      } finally {
        // Optional: Any final cleanup code
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