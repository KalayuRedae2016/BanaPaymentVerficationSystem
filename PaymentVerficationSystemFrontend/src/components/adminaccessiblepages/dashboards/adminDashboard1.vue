<template>
  <div>
    <div class="">
      <h2 class="w-full border-b border-blue-500 text-blue-500 pt-4 px-4 pb-3 font-bold">
        Dashboard
        <span class=""></span>
      </h2>

     <Toast ref="toast" />

      <div class="">
        <div class="mx-4 text-xs">
          <div
            class="mt-5 mb-5 flex flex-col w-full border border-gray-300 p-4 rounded-lg"
          >
            <div class="flex flex-row space-x-3">
              <p class="text-blue-800 mb-5 text-sm">
               
                {{ $t("Current Month Report") }} ( ({{ activeYear }} -{{ activeMonth }}))
               
               
              </p>
              
            </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-300 text-xs">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      {{ $t("metric") }}
                    </th>
                    <th
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      {{ $t("paidClients") }}
                    </th>
                    <th
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      {{ $t("unPaidClients") }}
                    </th>
                    <th
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      {{ $t("totalPaidCapital") }}
                    </th>
               
                    <th
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      {{ $t("detail") }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-300">
                  <!-- Data Rows -->
                  <tr>
                    <td
                      class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                    >
                      {{ $t("yearMonth") }} {{ activeYear }} -{{ activeMonth }}
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
                      <a
                        href="#"
                        class="text-blue-800 hover:underline font-semibold text-sm underline"
                        @click="viewPaidUnPaid"
                        ><h1 class="">{{ $t("view") }}</h1>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
              <div class="w-full mx-auto mt-6">
              <div v-if="monthlyPaid>0" class="text-sm font-medium text-gray-700 mb-2">
                {{ monthlyPaid }} of {{ totalClients }} Clients Paid In This
                Month
              </div>
              <div v-else  class="text-sm font-medium text-gray-700 mb-2">
                0  of {{ totalClients }} Clients Paid In This
                Month
              </div>
              <div class="relative w-full h-4 bg-gray-200 rounded">
                <div
                  class="absolute top-0 left-0 h-4 bg-green-500 rounded"
                  :style="{ width: progressPaidPercentage + '%' }"
                ></div>
              </div>
              <div v-if="progressPaidPercentage > 0" class="text-sm text-gray-600 mt-2">
                {{ progressPaidPercentage.toFixed(1) }}% paid
              </div>
              <div v-else class="text-sm text-gray-600 mt-2">
               0 % paid
              </div>
            </div>
            <a
            href="#"
            class="mt-5 text-blue-800 hover:underline font-semibold text-sm italic"
            @click="paidUnPaidOverdue()"
            ><h1 class="underline text-xs italic">{{ $t("All Payments") }}</h1>
          </a>
          </div>
        
        </div>
        <!-- <div class="chart w-full lg:w-1/2 lg:mb-0" @click="viewPaidUnPaid()">
          <Chart class="-ml-5 mr-5 lg: ml-0 mr-0"></Chart>
          
        </div> -->
      </div>
    </div>

    <!-- overdue section -->
    <div class="mx-4 text-xs">
      <div class="flex flex-col w-full border border-gray-300 p-4 rounded-lg">
        <div class="flex flex-row space-x-3">
          <p class="text-blue-800 mb-5 text-sm">
            <i class="fas fa-exclamation-circle text-red-500 mr-2"></i>
            {{ $t("allOverdueClients") }}
            <span v-if="totalOvedue" class="text-red-500">{{
              totalOvedue
            }}</span>
            <span v-else>0</span>
          </p>
          <a
            href="#"
            class="text-blue-800 hover:underline font-semibold text-sm italic"
            @click="goAllOverDue()"
            ><h1 v-if="totalOvedue > 0" class="underline text-xs italic">{{ $t("view") }}</h1>
          </a>
        </div>
        <div class="">
          <div v-if="totalOvedue > 0 " class="text-sm font-medium text-gray-700 mb-2">
            {{ totalOvedue }} of {{ totalClients }} Clients Have Overdue
            Payments
          </div>
          <div v-else>
            0 of {{ totalClients }} Clients Have Overdue
            Payments
          </div>
             <div class="relative w-full h-4 bg-gray-200 rounded">
                <div
                  class="absolute top-0 left-0 h-4 bg-red-500 rounded"
                  :style="{ width: progressOverduePercentage + '%' }"
                ></div>
              </div>
              <div v-if="progressOverduePercentage > 0" class="text-sm text-gray-600 mt-2">
                {{ progressOverduePercentage.toFixed(1) }}% Overdue
              </div>
              <div v-else class="text-sm text-gray-600 mt-2">
               0% Overdue
              </div>
         
        </div>
      </div>
    </div>
    <!-- //all years confirmed payments -->

    <div
      class="border border-gray-300 mx-4 mb-32 mt-2 rounded-lg overflow-x-auto"
    >
      <div class="flex flex-row space-x-4 m-4">
        <h2 class="text-blue-800 text-xs">
          <i class="fas fa-check-circle text-green-500 text-xs"></i>
          {{ $t("allYearsConfirmedReport") }}<span class=""></span>
        </h2>
        <a
          href="#"
          class="text-blue-800 hover:underline font-semibold text-sm underline"
          @click="viewPaymentsReport()"
          ><h1 class="text-xs">{{ $t("allReportDetails") }}</h1>
        </a>
      </div>

      <table class="min-w-full divide-y divide-gray-300 text-xs">
        <thead class="bg-gray-50">
          <tr>
            <th
              rowspan="3"
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              {{ $t("banks") }}
            </th>
            <th
              colspan="10"
              class="justify-center items-center text-blue-800  border border-gray-300 py-3"
            >
              {{ $t("balance") }}
            </th>
          </tr>
          <tr>
            <th
              colspan="4"
              class="py-2 justify-center items-center text-blue-800  border border-gray-300"
            >
              {{ $t("block") }}
            </th>
            <th
              colspan="3"
              class="py-2 justify-center items-center text-blue-800  border border-gray-300"
            >
              {{ $t("service") }}
            </th>
            <th
              rowspan="2"
              
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              {{ $t("Total Balance") }}
            </th>
           
          </tr>
          <tr>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              {{ $t("regular") }}
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              {{ $t("subsidy") }}
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              {{ $t("urgent") }}
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              {{ $t("totalBlock") }}
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              {{ $t("penality") }}
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              {{ $t("Monthly Service") }}
            </th>
            <th
              class="px-4 py-2 text-blue-800 text-left border border-gray-300"
            >
              {{ $t("totalService") }}
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
            <td class="px-4 py-2 text-left border border-gray-300 bg-gray-300">
              {{ balance.totalBlockBalance }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.penalityBalance }}
            </td>

            <td class="px-4 py-2 text-left border border-gray-300 ">
              {{ balance.serviceBalance }}
            </td>
            <td class="px-4 py-2 text-left border-r border-gray-500 bg-gray-300">
              {{ balance.totalServiceBalance }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300 bg-gray-300">
              {{ balance.totalServiceBalance + balance.totalBlockBalance }}
            </td>
          </tr>

        
          <tr class="font-bold bg-gray-100" rowspan="4">
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ $t("total") }}
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
              class="px-4 py-2 text-left border border-gray-300 text-blue-800 bg-gray-300"
            >
              {{ totalOrgBalance.totalBlockBankAccount }}
            </td>
            <!-- Total Urgent -->
            <td
              class="px-4 py-2 text-left border-r border-gray-300 text-blue-800"
            >
              {{ totalOrgBalance.totalPenalityBalance }}
            </td>
            <!-- Total Block -->
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800 "
            >
              {{ totalOrgBalance.totalServiceBalance }}
            </td>
            <td
              class="px-4 py-2 text-left border-r border-gray-500 text-blue-800 bg-gray-300"
            >
              {{ totalOrgBalance.totalServiceBankAccount }}
            </td>
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800 bg-gray-300"
            >
            {{ (totalOrgBalance.totalServiceBankAccount || 0) + (totalOrgBalance.totalBlockBankAccount || 0) }}
            </td>
          </tr>
         
          <tr>
         
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>

// import Chart from "../payment/Reports/charts/charts.vue";
import { mapGetters } from "vuex";
import Toast from '../../Common/Toast.vue'
export default {
  components: {
    // Chart,
    Toast,
  },
  name: "CapitalReport",
  data() {
    return {
      showToast:false,
      paidClients: 1, // Number of clients who have paid
      totalClients: 2000, // Total number of client
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
      paidPercentage: NaN, // Replace with actual value
      overduePercentage: NaN, // Replace with actual value
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
    progressPaidPercentage() {
      if(this.totalClients > 0 ){
        console.log("Here")
        return (this.monthlyPaid/ this.totalClients) * 100;
      }else{
        console.log("return zero")
        return 0;
      }
      
    },
    progressOverduePercentage() {
      if(this.totalClients > 0 ){
        return (this.totalOvedue / this.totalClients) * 100;
      }else{
        return 0;
      }
      
    },
  },
  created() {
    this.latestPaymentSetting();
  },

  async mounted() {
    if (this.$route.query.loginSuccess === 'true') {
      const activeItem="dashboard";
      this.$store.dispatch("commitActiveItem", { activeItem });

    this.$refs.toast.showLoginToastMessage("Successfully Login in to your dashboard");
      setTimeout(() => {
        this.$router.push('/superadmindashboard');
      }, 2000);
    }

      await this.$apiGet('/api/v1/users').then((response) => {
        this.totalClients = response.result;
      }).catch((error) => { 
        console.log("error status and message",error.status,error.message)
      }).finally(() =>{
         console.log("finally finished");
      });


    //overdue payments

    const params={
      timeRange: "allTime",
    }

    await this.$apiGet('/api/v1/payments/reports',params).then((response) => {
        console.log("allThe Time now nnn", response);
        this.totalOvedue = response.items.categorizedPayments.overdue.uniqueUsers;
      })
      .catch((error) => {
        console.log("Error fetching total overdue and error status and message", error.status,error.message);
      });

//finding org balance

    await this.$apiGet("api/v1/payments/orgBalance").then((response) => {
        console.log("response org balance", response);
        this.totalBalance = response.items;
        this.totalOrgBalance = response.items.organizationBalance; }).catch((error) => {
        console.error(
          " error fetching org data data:",
       error.status,error.message
        );
      });


  },

  methods: {
    safePercentage(value) {
      return isNaN(value) ? 0 : value;
    },
    showSuccessToast(message) {
      this.toastMessage = message;
      this.showToast = true;

      // Hide toast after 3 seconds
      setTimeout(() => {
        this.showToast = false;
      }, 1000); 
      
      
      // Toast will disappear after 3 seconds
    },
    paidUnPaidOverdue() {
      this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: 2,
        },
      });
    },
    //latest payment month and active year
    async latestPaymentSetting() {
      try { await this.$apiGet("/api/v1/paymentSetting/latest")
        .then((response) => {
          console.log("latest month response:", response);

          if (response.status === 1) {
            this.activeMonth = response.paymentSetting.activeMonth;
            this.activeYear = response.paymentSetting.activeYear;
             this.monthlyPayment();
          }
        })}catch(error){
     
          console.error(
            "An error occurred while fetching Payment settings:",
            error.status,error.message
          );
        }finally{

        };
    },
    //monthly payment
  async   monthlyPayment() {
       const params={
        timeRange: "monthly",
        year: this.activeYear,
        month: this.activeMonth,
       }
     try{ await this.$apiGet('/api/v1/payments/reports',params)
        .then((response) => {
          console.log("active month ", this.activeMonth);
          console.log("monthly report based on the latest setting", response);
          this.monthlyReport = response.items;
          this.monthlyPaid =
            response.items.categorizedPayments.confirmed.uniqueUsers;
          console.log("confirmed", this.monthlyPaid);

          this.monthlyPending =
            response.items.categorizedPayments.pending.uniqueUsers;
          console.log("pending", this.monthlyPending);

  this.monthlyCapital = 
    (response.items.categorizedPayments.confirmed?.totalBlockBankAccountPaid || 0) +
    (response.items.categorizedPayments.confirmed?.totalServiceBankAccountPaid || 0) +
    (response.items.categorizedPayments.pending?.totalBlockBankAccountPaid || 0) +
    (response.items.categorizedPayments.pending?.totalServiceBankAccountPaid || 0) +
    (response.items.categorizedPayments.overdue?.totalBlockBankAccountPaid || 0) +
    (response.items.categorizedPayments.overdue?.totalServiceBankAccountPaid || 0);


        })
       }catch(error) {
          console.log(
            "active month and year in catch",
            this.activeMonth,
            this.activeYear
          );
          console.log("Error fetching reports:", error.status,error.message);
        }finally{

        };
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
