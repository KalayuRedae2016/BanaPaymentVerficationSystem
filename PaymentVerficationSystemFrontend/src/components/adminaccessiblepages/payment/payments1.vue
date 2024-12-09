<template>
  <div class="root div">


    <div class="px-3 md:px-4 py-3">
      <h1 class="text-indigo-800 font-bold">{{ $t('paymentSettings') }}</h1>
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

        <div class="border-t border-blue-800 ">
          <div v-show="activeTab === 0" class="">
            <div class="">

  <!-- Payment Settings Options -->
  <div class="bg-white shadow-sm border border-gray-200 py-6 px-3">
    <div class="flex flex-col sm:flex-row  gap-6">
      <!-- Current Payment Setting -->
      <div class="flex items-center">
        <input
          v-model="paymentSettingStatus"
          type="radio"
          value="currentSetting"
          id="current-setting"
          class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <label
          for="current-setting"
          class="ml-3 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          <i class="fas fa-cog mr-2 text-indigo-500"></i>{{ $t('currentPaymentSetting') }}
        </label>
      </div>

      <!-- Payment Setting History -->
      <div class="flex items-center">
        <input
          v-model="paymentSettingStatus"
          type="radio"
          value="paymentSettingHistory"
          id="payment-setting-history"
          class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <label
          for="payment-setting-history"
          class="ml-3 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          <i class="fas fa-history mr-2 text-blue-500"></i>{{ $t('paymentSettingHistory') }}
        </label>
      </div>
    </div>

    <!-- Conditional Components -->
    <div class="mt-8">
      <block-payment v-if="paymentSettingStatus === 'currentSetting'" />
      <payment-setting-history v-else-if="paymentSettingStatus === 'paymentSettingHistory'" />
    </div>
  </div>
</div>

          </div>


          <div v-show="activeTab === 1" class="">
            <div class="">
  <!-- Payment Selection Header -->

  <!-- Payment Options -->
  <div class="bg-white shadow-sm border border-gray-200 py-6 px-3">
    <div class="flex flex-col sm:flex-row  gap-6">
      <!-- Confirm New Payment -->
      <div class="flex items-center">
        <input
          v-model="paymentStatus"
          type="radio"
          value="newPayment"
          id="new-payment"
          class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <label
          for="new-payment"
          class="ml-3 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          <i class="fas fa-file-invoice-dollar mr-2 text-green-500"></i>{{ $t('confirmNewPayment') }}
        </label>
      </div>

      <!-- Credit Transfer -->
      <div class="flex items-center">
        <input
          v-model="paymentStatus"
          type="radio"
          value="creditTransfer"
          id="credit-transfer"
          class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <label
          for="credit-transfer"
          class="ml-3 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          <i class="fas fa-university mr-2 text-blue-500"></i>{{ $t('creditTransfer') }}
        </label>
      </div>
    </div>

    <!-- Conditional Components -->
    <div class="mt-8">
      <new-payment v-if="paymentStatus === 'newPayment'" />
      <credit-transfer v-else-if="paymentStatus === 'creditTransfer'" />
    </div>
  </div>
</div>

          </div>








          <div v-show="activeTab === 2" class="">
            <div class="">


  <!-- Payment Options -->
  <div class="bg-white shadow-sm  border border-gray-200 pt-6 px-3">
    <div class="flex flex-col sm:flex-row gap-6">
      <!-- All Payments -->
      <div class="flex items-center">
        <input
          v-model="allPaymentsAndTransferedPayments"
          type="radio"
          value="allPayments"
          id="all-payments"
          class="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300"
        />
        <label
          for="all-payments"
          class="ml-3 text-sm font-medium text-gray-700 hover:text-pink-600 transition"
        >
          <i class="fas fa-money-check-alt mr-2 text-pink-500"></i>All Payments
        </label>
      </div>

      <!-- Transferred Payments -->
      <div class="flex items-center">
        <input
          v-model="allPaymentsAndTransferedPayments"
          type="radio"
          value="transferedPayments"
          id="transfered-payments"
          class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <label
          for="transfered-payments"
          class="ml-3 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          <i class="fas fa-exchange-alt mr-2 text-indigo-500"></i>Transferred Payments
        </label>
      </div>
    </div>

    <!-- Conditional Components -->
    <div class="mt-8">
      <all-payments v-if="allPaymentsAndTransferedPayments === 'allPayments'" />
      <transfered-payments v-else-if="allPaymentsAndTransferedPayments === 'transferedPayments'" />
    </div>
  </div>
</div>

          </div>

          <div v-show="activeTab === 3" class="">
            <div class="">


  <!-- Report Options -->
  <div class="bg-white shadow-sm  border border-gray-200 py-6 px-3">
    <div class="flex flex-col sm:flex-row  gap-6">
      <!-- User Level Report -->
      <div class="flex items-center">
        <input
          v-model="paymentReportStatus"
          type="radio"
          value="userLevelReport"
          id="user-level-report"
          class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <label
          for="user-level-report"
          class="ml-3 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          <i class="fas fa-user-alt mr-2 text-indigo-500"></i>User Level Report
        </label>
      </div>

      <!-- Org Level Report -->
      <div class="flex items-center">
        <input
          v-model="paymentReportStatus"
          type="radio"
          value="orgLevelReport"
          id="org-level-report"
          class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
        />
        <label
          for="org-level-report"
          class="ml-3 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
        >
          <i class="fas fa-building mr-2 text-blue-500"></i>Org Level Report
        </label>
      </div>
    </div>

    <!-- Conditional Components -->
    <div class="mt-8">
      <all-payment-report v-if="paymentReportStatus === 'userLevelReport'" />
      <confirmed-payment-report v-else-if="paymentReportStatus === 'orgLevelReport'" />
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
