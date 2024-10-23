<template>
  <div class="root div">


    <div class="px-3 md:px-4 py-3">
      <h1 class="text-indigo-800 font-bold">Payment Settings</h1>
    </div>

    <div class="border-t border-indigo-800 mt-1 py-4">
      <div class="m-2 mb-10">
        <div class="flex flex-wrap">
          <button v-for="(tab, index) in tabs" :key="index" :class="` py-2 px-2 mb-2 mr-2 ${activeTab === index
              ? 'bg-gray-300 border-b-4 border-blue-500 text-blue-500 font-bold text-md'
              : 'bg-gray-100 text-indigo-700  font-bold text-md'
            } `" @click="activateTab(index)">
            {{ tab }}
          </button>
        </div>

        <div class="border-t border-blue-800">
          <div v-show="activeTab === 0" class="">
            <div class="px-0 w-full ml-5 mt-5 mb-10 sm:w-auto">
              <div class="mb-10">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center">
                    <input v-model="paymentSettingStatus" type="radio" value="currentSetting"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label class="ml-3 block text-sm font-medium text-gray-700">Current Payment Setting</label>
                  </div>
                  <div class="flex items-center">
                    <input v-model="paymentSettingStatus" type="radio" value="paymentSettingHistory"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label class="ml-3 block text-sm font-medium text-gray-700">Payment Setting History</label>
                  </div>

                </div>
                <block-payment v-if="paymentSettingStatus === 'currentSetting'" />
                <payment-setting-history v-else-if="paymentSettingStatus === 'paymentSettingHistory'" />
              </div>
            </div>
          </div>


          <div v-show="activeTab === 1" class="">
            <div class="px-0 w-full ml-5 mt-5 mb-10 sm:w-auto">
              <div class="mb-10">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center">
                    <input v-model="paymentStatus" type="radio" value="newPayment"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label class="ml-3 block text-sm font-medium text-gray-700">Confirm New Payment</label>
                  </div>
                  <div class="flex items-center">
                    <input v-model="paymentStatus" type="radio" value="creditTransfer"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label class="ml-3 block text-sm font-medium text-gray-700">Credit/Transfer</label>
                  </div>
                </div>
                <new-payment v-if="paymentStatus === 'newPayment'" />
                <credit-transfer v-else-if="paymentStatus === 'creditTransfer'" />

              </div>
            </div>
          </div>








          <div v-show="activeTab === 2" class="">
            <div class="px-0 w-full ml-5 mt-5 mb-10 sm:w-auto">
              <div class="mb-10">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center">
                    <input v-model="allPaymentsAndTransferedPayments" type="radio" value="allPayments"
                      class="h-4 w-4 border-gray-300 text-pink-600 focus:ring-pink-500" />
                    <label class="ml-3 block text-sm font-medium text-gray-700">All Payments</label>

                  </div>
                  <div class="flex items-center">
                    <input v-model="allPaymentsAndTransferedPayments" type="radio" value="transferedPayments"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label class="ml-3 block text-sm font-medium text-gray-700">Transfered Payments</label>
                  </div>
                </div>
                <all-payments v-if="allPaymentsAndTransferedPayments == 'allPayments'" />
                <transfered-payments v-else-if="allPaymentsAndTransferedPayments == 'transferedPayments'" />
              </div>
            </div>
          </div>

          <div v-show="activeTab === 3" class="">
            <div class="px-0 w-full ml-5 mt-5 mb-10 sm:w-auto">
              <div class="mb-10">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center">
                    <input v-model="paymentReportStatus" type="radio" value="userLevelReport"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label class="ml-3 block text-sm font-medium text-gray-700">User Level Report</label>
                  </div>
                  <div class="flex items-center">
                    <input v-model="paymentReportStatus" type="radio" value="orgLevelReport"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label class="ml-3 block text-sm font-medium text-gray-700">Org Level Report</label>
                  </div>
                </div>
                <all-payment-report v-if="paymentReportStatus === 'userLevelReport'" />
                <confirmed-payment-report v-else-if="paymentReportStatus === 'orgLevelReport'" />
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script>

import blockPayment from "./paymentSetting/blockNewPayment.vue";
import newPayment from "./newPayment/usersCanPay.vue";
import allPaymentReport from "./Reports/paymentReport.vue";
import confirmedPaymentReport from "./Reports/confirmedPaymentReport.vue";
import paymentSettingHistory from "./paymentSetting/paymentSettingHistory.vue";
import allPayments from "./allPayments/allPayments.vue";
import transferedPayments from "./allPayments/transferedPayments.vue";
import creditTransfer from "./newPayment/creditTransfer.vue";
import axios from "axios";


export default {
  components: {
    blockPayment,
    newPayment,
    allPaymentReport,
    confirmedPaymentReport,
  
    paymentSettingHistory,
    allPayments,
    transferedPayments,
    creditTransfer
  },
  data() {
    return {
      allPaymentsAndTransferedPayments: "allPayments",
      paymentReportStatus: "userLevelReport",
      paymentStatus: 'newPayment',
      paymentSettingStatus: "currentSetting",
      activeTab: 0,
      tabs: ["Payment Setting", "New Payment", "All Payments", "Payment Report"],
      clientId: "",
    };
  },
  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });

    this.clientId = this.$route.params.clientId;
    this.fetchClientData(this.clientId);

  },
  mounted() {
    console.log("active tab here", this.$route.query.activeTab);


    if (this.$route.query.activeTab == 0) {
      this.activeTab = 0;
      this.paymentSettingStatus = "currentSetting";
    }


    if (this.$route.query.activeTab == 1) {
      this.activeTab = 1;
      this.paymentStatus = "newPayment";
    }


    if (this.$route.query.activeTab == 2) {
      this.activeTab = 2;
    }

    if (this.$route.query.activeTab == 3) {
      if (this.$route.query.reportLevel == "userLevelReport") {
        this.activeTab = 3;
        this.paymentReportStatus = "userLevelReport";
      } else {
        this.activeTab = 3;
        this.paymentReportStatus = "orgLevelReport";
      }
    }



    //tab1=  
    //tab2=
    //tab=



    //if(this.$route.query.reportLevel == "userLevelReport")

  }
  ,
  methods: {
    activateTab(index) {
      this.activeTab = index;
      console.log("active tab cliked");
    },
    activateTab1(index) {
      this.activeTab1 = index;
    },
    fetchClientData(clientId) {
      const userData = {
        clientId: clientId,
      };
      console.log("userdata", userData);
    },
  },
};
</script>
