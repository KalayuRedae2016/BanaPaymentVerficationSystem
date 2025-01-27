<template>
  <div>
    <div class="">
      <h2 class="w-full border-b border-blue-500 text-blue-500 pt-4 px-4 pb-3 font-bold">
        Dashboard
      </h2>
      <Toast ref="toast" />
      <div class="mx-5 flex flex-row pt-3 space-x-12">
        <div class=" flex flex-col lg:flex-row lg:space-x-12  p-4  w-full rounded-lg  w-1/2 shadow-lg border-t border-gray-100">
          <div class="w-1/2 lg:w-1/3 border-none lg:border-r border-gray-300">
            <canvas ref="pieChartCanvas" class="chart w-1/2"></canvas>
          </div>
          <div class="grid grid-cols-2 gap-y-1 lg:gap-y-0 items-center text-blue-500">
            <p>No. Active Members</p>
            <span class="hover:bg-blue-600 w-16 ml-5 bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
              2000
            </span>
            <p>No. Admins</p>
            <span class="hover:bg-green-600 w-16 ml-5 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
              2000
            </span>
            <p>No. Deactivated Members/Offsets</p>
            <span class="hover:bg-yellow-500 w-16 ml-5 bg-yellow-400 text-white text-sm px-3 py-1 rounded-full">
              200
            </span>
          </div>
        </div>
      </div>

      <div class="">
        <div class="mx-4 text-xs">
          <div class="shadow-lg mt-5 mb-5 flex flex-col w-full border border-gray-300 p-4 rounded-lg">
            <div class="flex flex-row space-x-3">
              <p class="text-blue-800 mb-5 text-sm">
                {{ $t("Current Month Report") }} ( ({{ activeYear }} -{{
                  activeMonth
                }}))
              </p>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-300 text-xs">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                      {{ $t("metric") }}
                    </th>
                    <th class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                      {{ $t("paidClients") }}
                    </th>
                    <th class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                      {{ $t("unPaidClients") }}
                    </th>
                    <th class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                      {{ $t("totalPaidCapital") }}
                    </th>

                    <th class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                      {{ $t("detail") }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-300">
                  <!-- Data Rows -->
                  <tr>
                    <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
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
                      <a href="#" class="text-blue-800 hover:underline font-semibold text-sm underline"
                        @click="viewPaidUnPaid">
                        <h1 class="">{{ $t("view") }}</h1>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="w-full mx-auto mt-6">
              <div v-if="monthlyPaid > 0" class="text-sm font-medium text-gray-700 mb-2">
                {{ monthlyPaid }} of {{ totalClients }} Clients Paid In This
                Month
              </div>
              <div v-else class="text-sm font-medium text-gray-700 mb-2">
                0 of {{ totalClients }} Clients Paid In This Month
              </div>
              <div class="relative w-full h-4 bg-gray-200 rounded">
                <div class="absolute top-0 left-0 h-4 bg-green-500 rounded"
                  :style="{ width: progressPaidPercentage + '%' }"></div>
              </div>
              <div v-if="progressPaidPercentage > 0" class="text-sm text-gray-600 mt-2">
                {{ progressPaidPercentage.toFixed(1) }}% paid
              </div>
              <div v-else class="text-sm text-gray-600 mt-2">0 % paid</div>
            </div>
            <a href="#" class="mt-5 text-blue-800 hover:underline font-semibold text-sm italic"
              @click="paidUnPaidOverdue()">
              <h1 class="underline text-xs italic">
                {{ $t("All Payments") }}
              </h1>
            </a>
          </div>
        </div>
        <!-- <div class="chart w-full lg:w-1/2 lg:mb-0" @click="viewPaidUnPaid()">
          <Chart class="-ml-5 mr-5 lg: ml-0 mr-0"></Chart>
          
        </div> -->
      </div>
    </div>

    <!-- overdue section -->
    <div class="mx-4 text-xs ">
      <div class="shadow-lg flex flex-col w-full border border-gray-300 p-4 rounded-lg">
        <div class="flex flex-row space-x-3">
          <p class="text-blue-800 mb-5 text-sm">
            <i class="fas fa-exclamation-circle text-red-500 mr-2"></i>
            {{ $t("allOverdueClients") }}
            <span v-if="totalOvedue" class="text-red-500">{{
              totalOvedue
            }}</span>
            <span v-else>0</span>
          </p>
          <a href="#" class="text-blue-800 hover:underline font-semibold text-sm italic" @click="goAllOverDue()">
            <h1 v-if="totalOvedue > 0" class="underline text-xs italic">
              {{ $t("view") }}
            </h1>
          </a>
        </div>
        <div class="">
          <div v-if="totalOvedue > 0" class="text-sm font-medium text-gray-700 mb-2">
            {{ totalOvedue }} of {{ totalClients }} Clients Have Overdue
            Payments
          </div>
          <div v-else>
            0 of {{ totalClients }} Clients Have Overdue Payments
          </div>
          <div class="relative w-full h-4 bg-gray-200 rounded">
            <div class="absolute top-0 left-0 h-4 bg-red-500 rounded"
              :style="{ width: progressOverduePercentage + '%' }"></div>
          </div>
          <div v-if="progressOverduePercentage > 0" class="text-sm text-gray-600 mt-2">
            {{ progressOverduePercentage.toFixed(1) }}% Overdue
          </div>
          <div v-else class="text-sm text-gray-600 mt-2">0% Overdue</div>
        </div>
      </div>
    </div>



    <!-- //all years confirmed payments -->

    <div class="shadow-lg border border-gray-300 mx-4 mb-32 mt-2 rounded-lg overflow-x-auto">




      <div class="flex flex-row space-x-4 m-4">
        <h2 class="text-blue-800 text-xs">
          <i class="fas fa-check-circle text-green-500 text-xs"></i>
          {{ $t("allYearsConfirmedReport") }}<span class=""></span>
        </h2>
        <a href="#" class="text-blue-800 hover:underline font-semibold text-sm underline" @click="viewPaymentsReport()">
          <h1 class="text-xs">{{ $t("allReportDetails") }}</h1>
        </a>
      </div>

      <table class="min-w-full divide-y divide-gray-300 text-xs">
        <thead class="bg-gray-50">
          <tr>
            <th rowspan="3" class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              {{ $t("banks") }}
            </th>
            <th colspan="10" class="justify-center items-center text-blue-800 border border-gray-300 py-3">
              {{ $t("balance") }}
            </th>
          </tr>
          <tr>
            <th colspan="4" class="py-2 justify-center items-center text-blue-800 border border-gray-300">
              {{ $t("block") }}
            </th>
            <th colspan="3" class="py-2 justify-center items-center text-blue-800 border border-gray-300">
              {{ $t("service") }}
            </th>
            <th rowspan="2" class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              {{ $t("Total Balance") }}
            </th>
          </tr>
          <tr>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              {{ $t("regular") }}
            </th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              {{ $t("subsidy") }}
            </th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              {{ $t("urgent") }}
            </th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              {{ $t("totalBlock") }}
            </th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              {{ $t("penality") }}
            </th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              {{ $t("Monthly Service") }}
            </th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              {{ $t("totalService") }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-300">
          <tr v-for="(balance, bank) in totalBalance.orgBalancesBasedBankType" :key="bank">
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              <p class="">{{ bank }}</p>
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.regularBalance || 0 }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.subsidyBalance || 0 }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.urgentBalance || 0 }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300 bg-gray-300">
              {{ balance.totalBlockBalance || 0 }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.penalityBalance || 0 }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300">
              {{ balance.serviceBalance || 0 }}
            </td>
            <td class="px-4 py-2 text-left border-r border-gray-500 bg-gray-300">
              {{ balance.totalServiceBalance || 0 }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300 bg-gray-300">
              {{
                (balance.totalServiceBalance || 0) +
                (balance.totalBlockBalance || 0)
              }}
            </td>
          </tr>

          <tr class="font-bold bg-gray-100" rowspan="4">
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ $t("total") }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ totalOrgBalance.totalRegularBalance || 0 }}
            </td>
            <!-- Total Regular -->
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ totalOrgBalance.totalSubsidyBalance || 0 }}
            </td>
            <!-- Total Subsidy -->
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ totalOrgBalance.totalUrgentBalance || 0 }}
            </td>
            <!-- Total Urgent -->
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800 bg-gray-300">
              {{ totalOrgBalance.totalBlockBankAccount || 0 }}
            </td>
            <!-- Total Urgent -->
            <td class="px-4 py-2 text-left border-r border-gray-300 text-blue-800">
              {{ totalOrgBalance.totalPenalityBalance || 0 }}
            </td>
            <!-- Total Block -->
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ totalOrgBalance.totalServiceBalance || 0 }}
            </td>
            <td class="px-4 py-2 text-left border-r border-gray-500 text-blue-800 bg-gray-300">
              {{ totalOrgBalance.totalServiceBankAccount || 0 }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800 bg-gray-300">
              {{
                (totalOrgBalance.totalServiceBankAccount || 0) +
                (totalOrgBalance.totalBlockBankAccount || 0)
              }}
            </td>
          </tr>
        </tbody>
      </table>


      <canvas ref="barChartCanvas" class="chart w-1/2"></canvas>
      <div class="flex flex-col lg:flex-row lg:space-x-4 items-center justify-center my-5">
        <div class="flex flex-row space-x-5">
          <div class=" bg-blue-400 w-16 h-4"></div>
          <p class="-mt-1 text-blue-400">Regular </p>
        </div>
        <div class="flex flex-row space-x-5">
          <div class=" bg-yellow-400 w-16 h-4"></div>
          <p class="-mt-1 text-blue-400">Urgent </p>
        </div>
        <div class="flex flex-row space-x-5">
          <div class="bg-green-400 w-16 h-4"></div>
          <p class="-mt-1 text-blue-400">Subsidy </p>
        </div>
        <div class="flex flex-row space-x-5">
          <div class=" bg-blue-400 w-16 h-4"></div>
          <p class="-mt-1 text-blue-400">Service </p>
        </div>
        <div class="flex flex-row space-x-5">
          <div class=" bg-red-400 w-16 h-4"></div>
          <p class="-mt-1 text-blue-400">Penality</p>
        </div>
      </div>
      <div class=" my-3 ml-16">
        <a @click="showOrgDetail = true"
          class="text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer transition duration-200 ease-in-out">
          Organization Payment Detail
        </a>
      </div>

    </div>
    <div v-if="showOrgDetail">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-80 px-4">
          <!-- Modal with margins -->
          <div class="bg-white rounded-lg border border-cyan-500 px-4 py-6 lg:p-6 w-full max-w-5xl max-h-screen m-4">
            <!-- Header -->
            <div class="flex flex-row items-center">
              <div class="ml-3 text-xl font-semibold text-blue-800 font-extrabold font-extrabold">
                Organization Payment Detail
              </div>

              <!-- Close Icon -->
              <div class="ml-auto" @click="showOrgDetail = !showOrgDetail">
                <svg class="w-6 h-6 text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <hr class="my-4 bg-red-500" />
            <div class="p-4 h-96 overflow-y-auto space-y-4">
              <!-- Cards for each bank -->
              <div v-for="(balance, bank) in totalBalance.orgBalancesBasedBankType" :key="bank"
                class="bg-white shadow-md rounded-lg p-4 border border-gray-300">
                <!-- Centered Bank Name -->
                <h3 class="text-lg font-semibold text-blue-800 mb-4">
                  {{ bank }}
                </h3>

                <!-- Balance Details in Two Columns -->
                <div class="grid lg:grid-cols-2 gap-6 text-sm ml-3">
                  <!-- Left Column -->
                  <div class="space-y-2 lg:border-r border-blue-500 pr-10">
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("regular") }}</span>
                      <span>{{ balance.regularBalance || 0 }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("subsidy") }}</span>
                      <span>{{ balance.subsidyBalance || 0 }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("urgent") }}</span>
                      <span>{{ balance.urgentBalance || 0 }}</span>
                    </div>

                    <div class="flex justify-between">
                      <span class="font-medium">{{
                        $t("Outcoming Block Balance")
                      }}</span>
                      <span>{{ balance.blockOutcoming || 0 }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{
                        $t("Incoming Block Balance")
                      }}</span>
                      <span>{{ balance.blockIncoming || 0 }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("totalBlock") }}</span>
                      <span class="bg-gray-100 px-2 py-1 rounded text-blue-500">{{ balance.totalBlockBalance || 0
                        }}</span>
                    </div>
                  </div>

                  <!-- Right Column -->
                  <div class="space-y-2 pr-10">
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("penality") }}</span>
                      <span>{{ balance.penalityBalance || 0 }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{
                        $t("Monthly Service")
                      }}</span>
                      <span>{{ balance.serviceBalance || 0 }}</span>
                    </div>

                    <div class="flex justify-between">
                      <span class="font-medium">{{
                        $t("OutComing Service Balance")
                      }}</span>
                      <span>{{ balance.serviceOutcoming || 0 }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{
                        $t("Incoming Service Balance")
                      }}</span>
                      <span>{{ balance.serviceIncoming || 0 }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("totalService") }}</span>
                      <span class="bg-gray-100 px-2 py-1 rounded text-blue-500">{{ balance.totalServiceBalance || 0
                        }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between border-t border-gray-500 mt-5 pt-5 pr-10">
                  <span class="font-medium text-blue-500">{{
                    $t("Total Balance")
                  }}</span>
                  <span class="bg-gray-200 px-2 py-1 rounded text-blue-500">
                    {{
                      (balance.totalServiceBalance || 0) +
                      (balance.totalBlockBalance || 0)
                    }}
                  </span>
                </div>
              </div>

              <!-- Total Summary Card -->
              <div class="bg-gray-50 shadow-md rounded-lg p-4 border-r border-gray-300">
                <h3 class="text-lg font-bold text-blue-800 mb-4">
                  {{ $t("total") }}
                </h3>

                <div class="grid lg:grid-cols-2 gap-6 text-sm ml-3">
                  <!-- Left Column -->
                  <div class="space-y-2 lg:border-r border-blue-500 pr-10">
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("regular") }}</span>
                      <span>{{
                        totalOrgBalance.totalRegularBalance || 0
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("subsidy") }}</span>
                      <span>{{
                        totalOrgBalance.totalSubsidyBalance || 0
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("urgent") }}</span>
                      <span>{{ totalOrgBalance.totalUrgentBalance || 0 }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("totalBlock") }}</span>
                      <span class="bg-gray-100 px-2 py-1 rounded">{{
                        totalOrgBalance.totalBlockBankAccount || 0
                      }}</span>
                    </div>
                  </div>

                  <!-- Right Column -->
                  <div class="space-y-2 pr-10">
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("penality") }}</span>
                      <span>{{
                        totalOrgBalance.totalPenalityBalance || 0
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{
                        $t("Monthly Service")
                      }}</span>
                      <span>{{
                        totalOrgBalance.totalServiceBalance || 0
                      }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">{{ $t("totalService") }}</span>
                      <span class="bg-gray-100 px-2 py-1 rounded">{{
                        totalOrgBalance.totalServiceBankAccount || 0
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex justify-between border-t border-gray-500 mt-5 pt-5 pr-10">
                  <span class="font-medium text-blue-500">{{
                    $t("Total Balance")
                  }}</span>
                  <span class="bg-gray-200 px-2 py-1 rounded text-blue-500">
                    {{
                      (totalOrgBalance.totalServiceBankAccount || 0) +
                      (totalOrgBalance.totalBlockBankAccount || 0)
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div v-if="showChangePassword" class="">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex  z-10 bg-black bg-opacity-75 ">
          <!-- Modal Content -->
          <div class="bg-white rounded-lg border border-cyan-500 ">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 mx-5 lg:w-1/2">
                <div class="text-green-500 mb-5 font-bold text-md italic">
                  You have Succussfully Login and to Be secure change your password !!!
                </div>

                <form action="" class="mx-5">
                  <div class="mb-4">
                    <label class="custom-label" for="oldPassword">
                      {{ $t("oldPassword") }}
                    </label>
                    <input class="custom-input" id="old-password" type="password" :placeholder="$t('oldPassword')"
                      v-model="oldPassword" />
                  </div>
                  <div class="mb-4 relative">
                    <label class="custom-label" for="newPassword">
                      {{ $t("newPassword") }}
                    </label>
                    <div class="relative">
                      <input :type="isPasswordVisible ? 'text' : 'password'" class="custom-input pr-12" id="newPassword"
                        v-model="newPassword" :placeholder="$t('enterNewPassword')" />
                    </div>
                  </div>
                  <div class="mb-4">
                    <label class="custom-label" for="confirmPassword">
                      {{ $t("confirmPassword") }}
                    </label>
                    <input class="custom-input" id="confirmPassword" type="password"
                      :placeholder="$t('enterConfirmPassword')" v-model="confirmPassword" />
                  </div>

                  <div class="my-5 text-xs">
                    <p class="text-red-500" v-if="showError">{{ errorMessage }} *</p>
                  </div>

                  <div class="flex flex-row space-x-3">
                    <button @click.prevent="changePassword()"
                      class="custom-button bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2">
                      <i class="fa fa-arrow-right"></i>
                      <span>{{ $t("submit") }}</span>
                    </button>

                  </div>
                </form>
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
// import Chart from "../payment/Reports/charts/charts.vue";
import { mapGetters } from "vuex";
import Toast from "../../Common/Toast.vue";
import Chart from "chart.js/auto";
export default {
  components: {
    Chart,
    Toast,
  },
  name: "CapitalReport",
  data() {
    return {
      barChart: null,
      showChangePassword: false,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      showError: false,
      errorMessage: "",
      showOrgDetail: false,
      showToast: false,
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
      if (this.totalClients > 0) {
        console.log("Here");
        return (this.monthlyPaid / this.totalClients) * 100;
      } else {
        console.log("return zero");
        return 0;
      }
    },
    progressOverduePercentage() {
      if (this.totalClients > 0) {
        return (this.totalOvedue / this.totalClients) * 100;
      } else {
        return 0;
      }
    },
  },
  created() {
    this.latestPaymentSetting();
  },

  async mounted() {
    const newData = [1500, 500, 200];
    const newData1 = [10000, 40000, 20000, 1100, 30000] // Example new data
    this.createPieChart(newData);
    this.createBarChart(newData1);

    if (this.$route.query.loginSuccess === "true") {
      const activeItem = "dashboard";
      this.$store.dispatch("commitActiveItem", { activeItem });
      if (this.$route.query.changePassword === "true") {
        this.showChangePassword = true;
      } else {
        this.$refs.toast.showLoginToastMessage(
          "Successfully Login in to your dashboard"
        );
        setTimeout(() => {
          this.$router.push("/admindashboard");
        }, 2000);

      }
    }

    await this.$apiGet("/api/v1/users")
      .then((response) => {
        this.totalClients = response.result;
      })
      .catch((error) => {
        console.log("error status and message", error.status, error.message);
      })
      .finally(() => {
        console.log("finally finished");
      });

    //overdue payments

    const params = {
      timeRange: "allTime",
    };

    await this.$apiGet("/api/v1/payments/reports", params)
      .then((response) => {
        console.log("allThe Time now nnn", response);
        this.totalOvedue =
          response.items.categorizedPayments.overdue.uniqueUsers;
      })
      .catch((error) => {
        console.log(
          "Error fetching total overdue and error status and message",
          error.status,
          error.message
        );
      });

    //finding org balance

    await this.$apiGet("api/v1/payments/orgBalance")
      .then((response) => {
        console.log("response org balance nnnnnnnn", response);
        this.totalBalance = response.items;
        this.totalOrgBalance = response.items.organizationBalance;
      })
      .catch((error) => {
        console.error(
          " error fetching org data data oooooo:",
          error.status,
          error.message
        );
      });
  },

  methods: {


    createPieChart(newData) {
      const pieChartLabels = ["Active Users", "Offset Users", "Admins        "];
      const pieChartData = {
        labels: pieChartLabels,
        datasets: [
          {

            data: newData,
            backgroundColor: [
              "rgba(0, 122, 230)",
              "rgba(255, 255, 0)",
              "rgba(0, 255, 0)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 159, 64)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const pieChartConfig = {
        type: "pie",
        data: pieChartData,
        options: {
          // Add any additional options for the pie chart here
        },
      };

      const pieChartCanvas = this.$refs.pieChartCanvas;
      const pieChartCtx = pieChartCanvas.getContext("2d");

      // Destroy the existing chart if it exists
      if (this.pieChart) {
        this.pieChart.destroy();
      }

      // Create a new chart
      this.pieChart = new Chart(pieChartCtx, pieChartConfig);
      console.log(this.pieChart);
    },
    createBarChart(newData) {
      const barChartLabels = ["Regular", "Urgent", "Subsidy", "Service", "Penalty"];
      const barChartData = {
        labels: barChartLabels,
        datasets: [
          {
            label: "Project Report",
            data: newData,
            backgroundColor: [
              "rgba(0, 122, 230, 0.5)", // Semi-transparent blue
              "rgba(255, 255, 0, 0.5)", // Semi-transparent yellow
              "rgba(0, 255, 0, 0.5)",   // Semi-transparent green
              "rgba(0, 65, 106, 0.5)", // Semi-transparent cyan
              "rgba(255, 0, 0, 0.5)",   // Semi-transparent red
            ],
            borderColor: [
              "rgb(0, 122, 230)", // Solid blue border
              "rgb(255, 255, 0)", // Solid yellow border
              "rgb(0, 255, 0)",   // Solid green border
              "rgb(0, 65, 0)", // Solid cyan border
              "rgb(255, 0, 0)",   // Solid red border
            ],
            borderWidth: 1, // Width of the border
          },
        ],
      };

      const barChartConfig = {
        type: "bar", // Set chart type to bar
        data: barChartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true, // Display legend
              position: "top", // Position the legend at the top
            },
            tooltip: {
              enabled: true, // Enable tooltips
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "------Payment Types------",
                color: 'rgb(0, 122, 230)',
                font: { size: 14 },
              },
            },
            y: {
              title: {
                display: true,
                text: "-----Amount-----",
                font: { size: 14 },
                color: 'rgb(0, 122, 230)'
              },
              beginAtZero: true, // Ensure y-axis starts at 0
            },

          },
          // Custom plugin to draw labels and values on top of bars
          plugins: {
            afterDatasetsDraw(chart) {
              const { ctx, data } = chart;
              chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                  const value = dataset.data[index];
                  ctx.fillStyle = "black";
                  ctx.font = "12px Arial";
                  ctx.textAlign = "center";
                  ctx.fillText(value, bar.x, bar.y - 5); // Positioning the text above the bar
                });
              });
            },
          },
        },
      };

      const barChartCanvas = this.$refs.barChartCanvas;
      const barChartCtx = barChartCanvas.getContext("2d");

      // Destroy the existing chart if it exists
      if (this.barChart) {
        this.barChart.destroy();
      }

      // Create a new chart
      this.barChart = new Chart(barChartCtx, barChartConfig);
      console.log(this.barChart);
    }
    ,




    async changePassword() {
      this.showError = false;
      this.errorMessage = "";

      console.log("passwords are", this.newPassword, this.newPassword, this.confirmPassword);


      if (!this.oldPassword) {
        //alert("hiii ")
        this.showError = true;
        this.errorMessage = "Old Password is Required "
        return;
      }

      if (!this.newPassword) {
        // alert("change password called")
        this.showError = true;
        this.errorMessage = "New Password is Required ";
        return;
      }

      if (!this.confirmPassword) {
        //alert("p")
        this.showError = true;
        this.errorMessage = "Confirm Password is Required"
        return;
      }


      if (this.newPassword != this.confirmPassword) {

        this.passwordMisMatch = true
        this.errorMessage = "Password Mis Match"
        return;

      }


      const checkPassword = this.$isStrongPassword(this.newPassword);

      console.log("validty and message", checkPassword.valid, checkPassword.errorMessage);


      // alert(checkPassword.valid)

      if (checkPassword.valid != true) {
        this.showError = true;
        this.errorMessage = checkPassword.message;
        return;
      } else {
        console.log("it is valid")
      }



      const payload = {
        currentPassword: this.oldPassword,
        newPassword: this.newPassword,
        userId: this.userId,
      };




      try {

        await this.$apiPatch("api/v1/users/updatePassword", this.userId, payload)
          .then((response) => {
            if (response.status === 1) {
              console.log("response: ", response)
              this.showChangePassword = false;
              this.$refs.toast.showSuccessToastMessage(response.message);

              setTimeout(() => {
                this.$router.push("/admindashboard");
              }, 2000);
              //this.$reloadPage();
            }
          });
      } catch (error) {
        console.log("error", error.status, error.message);
        this.showError = true;
        this.errorMessage = error.message;

      } finally {
        console.log("change password finally")
      };


    },

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
          activeTab: 1,
        },
      });
    },
    //latest payment month and active year
    async latestPaymentSetting() {
      try {
        await this.$apiGet("/api/v1/paymentSetting/latest").then((response) => {
          console.log("latest month response:", response);

          if (response.status === 1) {
            this.activeMonth = response.paymentSetting.activeMonth;
            this.activeYear = response.paymentSetting.activeYear;
            this.monthlyPayment();
          }
        });
      } catch (error) {
        console.error(
          "An error occurred while fetching Payment settings:",
          error.status,
          error.message
        );
      } finally {
      }
    },
    //monthly payment
    async monthlyPayment() {
      const params = {
        timeRange: "monthly",
        year: this.activeYear,
        month: this.activeMonth,
      };
      try {
        await this.$apiGet("/api/v1/payments/reports", params).then(
          (response) => {
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
              (response.items.categorizedPayments.confirmed
                ?.totalBlockBankAccountPaid || 0) +
              (response.items.categorizedPayments.confirmed
                ?.totalServiceBankAccountPaid || 0) +
              (response.items.categorizedPayments.pending
                ?.totalBlockBankAccountPaid || 0) +
              (response.items.categorizedPayments.pending
                ?.totalServiceBankAccountPaid || 0) +
              (response.items.categorizedPayments.overdue
                ?.totalBlockBankAccountPaid || 0) +
              (response.items.categorizedPayments.overdue
                ?.totalServiceBankAccountPaid || 0);
          }
        );
      } catch (error) {
        console.log(
          "active month and year in catch",
          this.activeMonth,
          this.activeYear
        );
        console.log("Error fetching reports:", error.status, error.message);
      } finally {
      }
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
      // alert("hii")
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
