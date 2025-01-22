<template>
  <div class="root div">
    <div class="px-3 md:px-4 py-3">
      <h1 class="text-blue-500 font-bold text-md">
        {{ $t("Payment Management") }}
      </h1>
    </div>

    <div class="border-t border-blue-500 mt-1 py-4">
      <div class="m-2 mb-10">
        <div class="flex flex-wrap">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            :class="`py-2 px-2 mb-2 mr-2 ${
              activeTab === index
                ? 'bg-gray-100 border-b-4 border-blue-500 text-blue-500 font-bold text-md'
                : 'text-blue-500 font-semibold text-md'
            }`"
            @click="activateTab(index)"
          >
            <i :class="`${icons[index]} mr-2`"></i>{{ tab }}
          </button>
        </div>

        <div class="border-t border-blue-300">
          <div v-show="activeTab === 0" class="">
            <div class="">
              <!-- Payment Settings Options -->
              <div class="bg-white shadow-sm border border-gray-200 py-6 px-3">
                <div class="flex flex-col sm:flex-row gap-6">
                  <!-- Current Payment Setting -->
                  <div class="flex items-center mx-4">
                    <input
                      @click="consistentRadio('currentSetting')"
                      v-model="paymentSettingStatus"
                      type="radio"
                      value="currentSetting"
                      id="current-setting"
                      class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label
                      for="current-setting"
                      class="ml-3 text-sm font-medium hover:text-indigo-600 transition"
                    >
                      <i class="fas fa-cog mr-2 text-indigo-500"></i
                      >{{ $t("currentPaymentSetting") }}
                    </label>
                  </div>

                  <!-- Payment Setting History -->
                  <div class="flex items-center mx-4">
                    <input
                      @click="consistentRadio('paymentSettingHistory')"
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
                      <i class="fas fa-history mr-2 text-blue-500"></i
                      >{{ $t("paymentSettingHistory") }}
                    </label>
                  </div>
                </div>
                <div class="h-1 w-full bg-zigzag mt-5"></div>
                <!-- Conditional Components -->
                <div class="mt-8">
                  <block-payment
                    v-if="paymentSettingStatus === 'currentSetting'"
                  />
                  <payment-setting-history
                    v-else-if="paymentSettingStatus === 'paymentSettingHistory'"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 1" class="">
            <div class="">
              <!-- Payment Options -->
              <div class="bg-white shadow-sm border border-gray-200 pt-6 px-3">
                <div class="flex flex-col sm:flex-row gap-6">
                  <!-- All Payments -->
                  <div class="flex items-center mx-4">
                    <input
                      @click="consistentRadio('allPayments')"
                      v-model="paymentStatus"
                      type="radio"
                      value="allPayments"
                      id="all-payments"
                      class="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300"
                    />
                    <label
                      for="all-payments"
                      class="ml-3 text-sm font-medium text-gray-700 hover:text-pink-600 transition"
                    >
                      <i class="fas fa-money-check-alt mr-2 text-pink-500"></i
                      >All Payments
                    </label>
                  </div>

                  <!-- Transferred Payments -->
                  <div class="flex items-center mx-4">
                    <input
                      @click="consistentRadio('newPayment')"
                      v-model="paymentStatus"
                      type="radio"
                      value="newPayment"
                      id="new-payment"
                      class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label
                      for="transfered-payments"
                      class="ml-3 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                    >
                      <i class="fas fa-exchange-alt mr-2 text-indigo-500"></i
                      >New Payment
                    </label>
                  </div>
                </div>
                <div class="h-1 w-full bg-zigzag mt-5"></div>
                <!-- Conditional Components -->
                <div class="mt-8">
                  <all-payments v-if="paymentStatus === 'allPayments'" />
                  <new-payment
                    ref="childComp"
                    v-else-if="paymentStatus === 'newPayment'"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 2" class="">
            <div class="">
              <!-- Payment Options -->
              <div class="bg-white shadow-sm border border-gray-200 pt-6 px-3">
                <div class="flex flex-col sm:flex-row gap-6">
                  <div class="flex items-center mx-4">
                    <input
                     @click="consistentRadio('transferOffsets')"
                      v-model="offsetPayments"
                      type="radio"
                      value="transferOffsets"
                      id="transfer-offsets"
                      class="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300"
                    />
                    <label
                      for="transfer-offsets"
                      class="ml-3 text-sm font-medium text-gray-700 hover:text-pink-600 transition"
                    >
                      <i class="fas fa-money-check-alt mr-2 text-pink-500"></i>
                      Transfers
                    </label>
                  </div>
                  <!-- All Payments -->
                  <div class="flex items-center mx-4">
                    <input
                      @click="consistentRadio('serviceOffsets')"
                      v-model="offsetPayments"
                      type="radio"
                      value="serviceOffsets"
                      id="service-offsets"
                      class="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300"
                    />
                    <label
                      for="all-payments"
                      class="ml-3 text-sm font-medium text-gray-700 hover:text-pink-600 transition"
                    >
                      <i class="fas fa-money-check-alt mr-2 text-pink-500"></i
                      >Service Offsets
                    </label>
                  </div>

                  <!-- Transferred Payments -->
                  <div class="flex items-center mx-4">
                    <input
                      @click="consistentRadio('userOffsets')"
                      v-model="offsetPayments"
                      type="radio"
                      value="userOffsets"
                      id="user-offsets"
                      class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label
                      for="transfered-payments"
                      class="ml-3 text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
                    >
                      <i class="fas fa-exchange-alt mr-2 text-indigo-500"></i
                      >User Offsets
                    </label>
                  </div>
                </div>
                <div class="h-1 w-full bg-zigzag mt-5"></div>

                <!-- Conditional Components -->
                <div class="mt-8">
                  <transfered-payments
                    v-if="offsetPayments === 'transferOffsets'"
                  />
                  <service-offset v-if="offsetPayments === 'serviceOffsets'" />
                  <user-offset
                    ref="childComp"
                    v-else-if="offsetPayments === 'userOffsets'"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-show="activeTab === 3" class="">
            <div class="">
              <!-- Report Options -->
              <div class="bg-white shadow-sm border border-gray-200 py-6 px-3">
                <div class="flex flex-col sm:flex-row gap-6">
                  <!-- User Level Report -->
                  <div class="flex items-center mx-4">
                    <input
                      @click="consistentRadio('userLevelReport')"
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
                      <i class="fas fa-user-alt mr-2 text-indigo-500"></i>User
                      Level Report
                    </label>
                  </div>

                  <!-- Org Level Report -->
                  <div class="flex items-center mx-4">
                    <input
                      @click="consistentRadio('orgLevelReport')"
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
                      <i class="fas fa-building mr-2 text-blue-500"></i>Org
                      Level Report
                    </label>
                  </div>
                </div>

                <div class="h-1 w-full bg-zigzag mt-5"></div>
                <!-- Conditional Components -->
                <div class="mt-8">
                  <all-payment-report
                    v-if="paymentReportStatus === 'userLevelReport'"
                  />
                  <confirmed-payment-report
                    v-else-if="paymentReportStatus === 'orgLevelReport'"
                  />
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
import userOffset from "./offsets/userOffset.vue";
import serviceOffset from "./offsets/serviceOffset.vue";
import axios from "axios";
export default {
  components: {
    blockPayment,
    userOffset,
    newPayment,
    allPaymentReport,
    confirmedPaymentReport,
    serviceOffset,
    paymentSettingHistory,
    allPayments,
    transferedPayments,
    creditTransfer,
  },
  data() {
    return {
      icons: [
        "fa-solid fa-cogs", // Payment Setting
        "fa-solid fa-money-bill", // All Payments
        "fa-solid fa-balance-scale", // Offsets
        "fa-solid fa-chart-line", // Report
      ],
      paymentReportStatus: "userLevelReport",
      paymentStatus: "allPayments",
      paymentSettingStatus: "currentSetting",
      offsetPayments: "transferOffsets",

      activeTab: 0,
      tabs: [
        "Payment Setting",
        "All Payments",
        "Transfer and Offsets",
        "Payment Report",
      ],
      clientId: "",
      userCode: "",
    };
  },
  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });

    this.clientId = this.$route.params.clientId;
    this.userCode = this.$route.params.userCode;
    this.fetchClientData(this.clientId);
  },
  mounted() {
    console.log("active tab here", this.$route.query.activeTab);

    if (this.$route.query.activeTab == 0) {
      this.activeTab = 0;

      if (this.$route.query.radioStatus == "paymentSettingHistory") {
        this.paymentSettingStatus = "paymentSettingHistory";
      } else {
        this.paymentSettingStatus = "currentSetting";
      }
    }

    if (this.$route.query.activeTab == 1) {
      //alert("itcomes from unpaid false")
      // alert(this.$route.query.usercode)
      // alert("active status",1)
      this.activeTab = 1;
      //alert("this.$route.query.radioStatus")
      if (this.$route.query.radioStatus == "newPayment") {
        //alert("in new")
        this.paymentStatus = "newPayment";
      } else {
        // alert("in all")
        this.paymentStatus = "allPayments";
        if (this.$route.query.userSelected) {
          this.$refs.childComp.navigateToPayment(
            this.$route.query.userCode,
            this.$route.query.fullName
          );
        }
      }
    }

    if (this.$route.query.activeTab == 2) {
      //alert(this.$route.query.radioStatus)
      this.activeTab = 2;
      if (this.$route.query.radioStatus == "transferOffsets") {
        this.offsetPayments = "transferOffsets";
      } else if (this.$route.query.radioStatus == "serviceOffsets") {
        //alert("in else")
        this.offsetPayments = "serviceOffsets";
      } else {
        this.offsetPayments = "userOffsets";
      }
    }

    if (this.$route.query.activeTab == 3) {
      this.activeTab = 3;
      if (this.$route.query.radioStatus == "orgLevelReport") {
        this.paymentReportStatus = "orgLevelReport";
      } else {
        this.paymentReportStatus = "userLevelReport";
      }
    }
  },
  methods: {
    consistentRadio(status) {
      if (this.activeTab == 0) {
        this.paymentSettingStatus = status;
      }

      if (this.activeTab == 1) {
        this.paymentStatus = status;
      }

      if (this.activeTab == 2) {
       // alert("hi")
        // alert(this.activeTab);
        this.offsetPayments = status;
      }
      if (this.activeTab == 3) {
        this.paymentReportStatus = status;
      }
      this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: this.activeTab,
          radioStatus: status,
        },
      });
    },

    activateTab(index) {
      this.activeTab = index;
      this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: index,
        },
      });
      this.activeTab = index;
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
