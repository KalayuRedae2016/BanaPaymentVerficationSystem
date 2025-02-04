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
                    affectedPayment=logData.affectedData.body;
                    
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
                  {{ $t("Transfer Payment Log Detail") }}
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
          
  

    <div class="space-y-4 mr-0 lg:mr-32">
      <div class="flex justify-between text-gray-700">
        <span class="font-medium">Amount:</span>
        <span class="text-gray-900">{{ affectedPayment.amount | currency }}</span>
      </div>

      <div class="flex justify-between text-gray-700">
        <span class="font-medium">From Bank:</span>
        <span class="text-gray-900">{{ affectedPayment.fromBankType }}</span>
      </div>

      <div class="flex justify-between text-gray-700">
        <span class="font-medium">Organization ID:</span>
        <span class="text-gray-900">{{ affectedPayment.orgId }}</span>
      </div>

      <div class="flex justify-between text-gray-700">
        <span class="font-medium">Reason:</span>
        <span class="text-gray-900">{{ affectedPayment.reason }}</span>
      </div>

      <div class="flex justify-between text-gray-700">
        <span class="font-medium">Reference Number:</span>
        <span class="text-gray-900">{{ affectedPayment.refNumber }}</span>
      </div>

      <div class="flex justify-between text-gray-700">
        <span class="font-medium">To Bank:</span>
        <span class="text-gray-900">{{ affectedPayment.toBankType }}</span>
      </div>

      <div class="flex justify-between text-gray-700">
        <span class="font-medium">Recipient Account:</span>
        <span class="text-gray-900">{{ affectedPayment.toWhat }}</span>
      </div>

      <div class="flex justify-between text-gray-700">
        <span class="font-medium">Transfer Case:</span>
        <span class="text-gray-900">{{ affectedPayment.transferCase }}</span>
      </div>

      <div class="flex justify-between text-gray-700">
        <span class="font-medium">Transfer Date:</span>
        <span class="text-gray-900">{{ affectedPayment.transferDate }}</span>
      </div>

      <div class="flex justify-between text-gray-700">
        <span class="font-medium">Transfer Type:</span>
        <span class="text-gray-900">{{ affectedPayment.transferType }}</span>
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
        // {
        //   _id: "1",
        //   model: "user",
        //   action: "Delate",
        //   actor: "admin1",
        //   ipAddress: "49.102.23.45",
        //   description: "This is the delate function",
        // },
      ],
      logDetail: false,
      affectedPayment:{
        // amount:300,
        // fromBankType:"CBE",
        // orgId:"1234567",
        // reason:"For checking",
        // refNumber:"12345",
        // toBankType:"LIB",
        // toWhat:"886545",
        // transferCase:"Bank Transfer",
        // transferDate:"1/23/2024",
        // transferType:"Block"
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
        model: "bankTransfer"
      }
      try {
        await this.$apiGet("/api/v1/logs", params).then((response) => {
          console.log("response for bank transfer", response);
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