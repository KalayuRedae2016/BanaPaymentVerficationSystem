<template>
  <div>
    <div class="">
      <h2 class="text-blue-800 pt-4 px-4 pb-3">
        This Monthly Report(2024-5) <span class=""></span>
      </h2>

      <div class="flex flex-col lg:flex-row border-t border-blue-500">
        <div class="mt-8">
          <div class="py-4 bg-white ml-5 mr-5">
            <div
              class="w-full overflow-x-auto lg:overflow-x-visible lg:w-autolg:p-6 mt-1 rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      Metric
                    </th>
                    <th
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      Paid Clients
                    </th>
                    <th
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      Pending Clients
                    </th>
                    <th
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      Total Paid Capital
                    </th>
                    <th
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      Total Paid Penalty
                    </th>
                    <th
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-300">
                  <!-- Data Rows -->
                  <tr>
                    <td
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      Year-month
                    </td>

                    <td class="px-4 py-2 text-left border border-gray-300">
                      <span v-if="monthlyPaid">{{ monthlyPaid }}</span>
                      <span v-else>0</span>
                    </td>
                    <td class="px-4 py-2 text-left border border-gray-300">
                      <span v-if="monthlyPending">{{ monthlyPending }}</span>
                      <span v-else>0</span>
                    </td>
                    <td class="px-4 py-2 text-left border border-gray-300">
                      <span v-if="monthlyCapital">{{ monthlyCapital }}</span>
                      <span v-else>0</span>
                    </td>
                    <td class="px-4 py-2 text-left border border-gray-300">
                      <span v-if="monthlyCharge">{{ monthlyCharge }}</span>
                      <span v-else>0</span>
                    </td>
                    <td class="px-4 py-2 text-left border border-gray-300">
                      <a
                        href="#"
                        class="text-blue-800 hover:underline font-semibold text-sm underline"
                        @click="viewPaidUnPaid"
                        ><h1 class="">View</h1>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <a
            href="#"
            class="text-blue-800 hover:underline font-semibold text-sm underline"
            @click="paidUnPaidOverdue()"
          >
            <i class="ml-7 mt-5 fas fa-wallet"></i
            ><span class="text-pink-500 ml-3">All Payments</span>
          </a>
        </div>
        <div class="chart w-full lg:w-1/2 lg:mb-0" @click="viewPaidUnPaid()">
          <Chart class="-ml-5 mr-5 lg: ml-0 mr-0"></Chart>
        </div>
      </div>
    </div>

    <!-- overdue section -->
    <div class="mx-4">
      <div
        class="flex flex-row space-x-4 w-full border border-gray-300 p-4 rounded-lg"
        style="margin-top: -200px"
      >
        <p class="text-blue-800 mb-5 text-lg">
          <i class="fas fa-exclamation-circle text-red-500 mr-2"></i>All Overdue
          clients :
          <span v-if="totalOvedue" class="text-red-500">{{ totalOvedue }}</span>
          <span v-else>0</span>
        </p>
        <a
          href="#"
          class="text-blue-800 hover:underline font-semibold text-sm mt-1"
          @click="goAllOverDue()"
          ><h1 class="underline">View</h1>
        </a>
      </div>
    </div>
    <!-- //all years confirmed payments -->

    <div
      class="border border-gray-300 mx-4 mb-32 mt-2 rounded-lg overflow-x-auto"
    >
      <div class="flex flex-row space-x-4 m-4">
        <h2 class="text-blue-800 text-lg">
          <i class="fas fa-check-circle text-green-500"></i> All Years Confirmed
          Report <span class=""></span>
        </h2>
        <a
          href="#"
          class="text-blue-800 hover:underline font-semibold text-sm underline"
          @click="viewPaymentsReport()"
          ><h1 class="">All Report Details</h1>
        </a>
      </div>

      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th
              rowspan="3"
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              Banks
            </th>
            <th
              colspan="7"
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              Balance
            </th>
          </tr>
          <tr>
            <th
              colspan="4"
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              Block
            </th>
            <th
              colspan="3"
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              Service
            </th>
          </tr>
          <tr>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              Regular
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              Subsidy
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              Urgent
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              Total Block
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              Penality
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              M.service
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              Total Service
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-300">
          <tr
            v-for="(balance, bank) in totalBalance.orgBalancesBasedBankType"
            :key="bank"
          >
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ bank }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.regularBalance }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.subsidyBalance }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.urgentBalance }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.totalBlockBalance }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.penalityBalance }}
            </td>

            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.serviceBalance }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.totalServiceBalance }}
            </td>
          </tr>
          <tr class="font-bold bg-gray-100">
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              Total
            </td>
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ totalOrgBalance.totalRegularBalance }}
            </td>
            <!-- Total Regular -->
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ totalOrgBalance.totalSubsidyBalance }}
            </td>
            <!-- Total Subsidy -->
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ totalOrgBalance.totalUrgentBalance }}
            </td>
            <!-- Total Urgent -->
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ totalOrgBalance.totalBlockBankAccount }}
            </td>
            <!-- Total Urgent -->
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ totalOrgBalance.totalPenalityBalance }}
            </td>
            <!-- Total Block -->
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ totalOrgBalance.totalServiceBalance }}
            </td>
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ totalOrgBalance.totalServiceBankAccount }}
            </td>
            <!-- Total penality -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Chart from "../payment/Reports/charts/charts.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Chart,
  },
  name: "CapitalReport",
  data() {
    return {
      monthlyPaid: "",
      monthlyPending: "",
      monthlyCapital: "",
      monthlyCharge: "",
      totalOvedue: "",

      activeYear: "",
      activeMonth: "",
      allOverDueClients: 54,
      internetConnected: false,
      activeTab: 0,
      tabs: ["This Month Payment", "This Month Capital", "This Month Charge"],
      clientLength: 0,
      totalBalance: [],
      totalOrgBalance: {},
    };
  },

  computed: {
    ...mapGetters(["getToken", "getUserId", "getLocale"]),
    userId() {
      return this.getUserId;
    },
    token() {
      return this.getToken;
    },
    locale() {
      this.$i18n.locale = this.getLocale;
      return this.getLocale;
    },
  },
  created() {
    this.latestPaymentSetting();
  },

  mounted() {
    this.$apiClient
      .get("/api/v1/users")
      .then((response) => {
        console.log("response clients", response);
        this.clientProfile = response.data;
        this.clientLength = response.data.result;
        console.log("clientlength", this.clientLength);
      })
      .catch((error) => {
        console.error("Error fetching client data:", error.response.data.error);
      });
    const allTimeRange = "allTime";
    this.$apiClient
      .get(`/api/v1/payments/reports?timeRange=${allTimeRange}`)
      .then((response) => {
        console.log("allThe Time", response);
        this.totalOvedue =
          response.data.items.categorizedPayments.overdue.uniqueUsers;
      })
      .catch((error) => {
        console.log("Error fetching total overdue", error.response.data.error);
      });
    //end of the overdue fetch;
    //get the users

    this.$apiClient
      .get("api/v1/payments/orgBalance")
      .then((response) => {
        console.log("response org balance", response);
        this.totalBalance = response.data.items;
        this.totalOrgBalance = response.data.items.organizationBalance;
        //console.log("orgbalance",this.totalOrgBalance);
      })
      .catch((error) => {
        console.error(
          " error fetching org data data:",
          error.response.data.error
        );
      });
  },
  methods: {
    paidUnPaidOverdue() {
      this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: 2,
        },
      });
    },

    latestPaymentSetting() {
      this.$apiClient
        .get("/api/v1/paymentSetting/latest")
        .then((response) => {
          console.log("latest month response:", response);

          if (response.data.status === 1) {
            this.activeMonth = response.data.paymentSetting.activeMonth;
            this.activeYear = response.data.paymentSetting.activeYear;
            this.monthlyPayment();
          }
        })
        .catch((error) => {
          console.error(
            "An error occurred while fetching Payment settings:",
            error
          );
        });
    },

    monthlyPayment() {
      const timeRange = "monthly";
      this.$apiClient
        .get(
          `/api/v1/payments/reports?timeRange=${timeRange}&year=${this.activeYear}&month=${this.activeMonth}`
        )
        .then((response) => {
          console.log("monthly report in the dashboard", response);
          this.monthlyReport = response.data.items;
          this.monthlyPaid =
            response.data.items.categorizedPayments.confirmed.uniqueUsers;
          console.log("confirmed", this.monthlyPaid);

          this.monthlyPending =
            response.data.items.categorizedPayments.pending.uniqueUsers;
          console.log("pending", this.monthlyPending);
          this.monthlyCapital =
            response.data.items.categorizedPayments.confirmed
              .totalBlockBankAccountPaid +
            response.data.items.categorizedPayments.confirmed
              .totalServiceBankAccountPaid;
          this.monthlyCharge =
            response.data.items.categorizedPayments.confirmed.totalPenalityAmountPaid;
        })
        .catch((error) => {
          console.log(
            "active month and year in catch",
            this.activeMonth,
            this.activeYear
          );
          console.log("Error fetching reports:", error.response.data.error);
        });
    },

    viewPaidUnPaid() {
      console.log("Button clicked!"); // Test log
      this.$router.push("/admindashboard/paid-unpaid");
    },
    goAllOverDue() {
      this.$router.push("/admindashboard/overdue");
    },
    viewCapitalReport() {
      this.$router.push("/admindashboard/recent-capital-charge-report");
    },
    viewPaymentsReport() {
      this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: 3,
        },
      });
    },
    viewChargeslReport() {
      this.$router.push("/admindashboard/charges");
    },
    viewClients() {
      this.$router.push("/admindashboard/clients");
    },
    activateTab(index) {
      this.activeTab = index;
    },
  },
};
</script>
