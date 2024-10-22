<template>
  <div class="border border border-gray-400 mt-5">
    <div class="flex flex-col p-4">
      <div class="flex flex-row border-b border-blue-500">
        <label class="custom-label"> Report Type: </label>
        <select v-model="reportType" @change="changeReportType()" class="custom-select h-10 border border-blue-500">
          <option value="" disabled>Select Report Type</option>
          <option v-for="reportType in $reportTypes" :key="reportType" :value="reportType.value">
            {{ reportType.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-row border-b border-blue-500 pb-5">
        <div class="flex flex-col">
          <div class="mt-5 w-full flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
           
            <div>
          
              <select v-if="ametSelected" v-model="year" @change="fetchPayments()" class="custom-select">
                <option value="" disabled>Select Year</option>
                <!-- Dynamically generate options using the global $years variable -->
                <option v-for="yearOption in $years" :key="yearOption" :value="yearOption">
                  {{ yearOption }}
                </option>
              </select>
            </div>

            <div>
              <select v-model="semiYear" v-if="menfekSelected" @change="fetchPayments()" class="custom-select">
                <option value="" disabled>Selecct Semi Annual</option>
                <option value="1st">1st-half</option>
                <option value="2nd">2nd-half</option>
              </select>
            </div>

            <div>
              <select v-model="month" v-if="monthlySelected" @change="fetchPayments()" class="custom-select">
                <option value="" disabled>Select Month</option>
                <!-- Dynamically generate options using the global $months variable -->
                <option v-for="monthOption in $months" :key="monthOption.value" :value="monthOption.value">
                  {{ monthOption.name }}
                </option>
              </select>
            </div>

            <div>
              <select v-model="week" v-if="weeklySelected" @change="fetchPayments()" class="custom-select">
                <option value="" disabled>Select Week</option>
                <option value="week1">week-1</option>
                <option value="week2">week-2</option>
                <option value="week3">week-3</option>
                <option value="week4">week4</option>
              </select>
            </div>
            <div>

              <select v-model="day" @change="fetchPayments()" v-if="dailySelected" class="custom-select">
                <option value="" disabled>Select Day</option>
                <!-- Dynamically generate options using the global $days variable -->
                <option v-for="dayOption in $days" :key="dayOption" :value="dayOption">
                  {{ dayOption }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex flex-row  mt-5 space-x-3 w-2/3 ">
          <div class="flex flex-col space-y-3">
            <button @click="thisYear()"
              class="h-8 flex items-center bg-blue-200 text-black rounded-md px-4 py-2 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
              <i class="fas fa-calendar-alt text-sm lowercase mr-2 text-blue-500 text-blue-500"></i>
              <span>This Year</span>
            </button>
            <button @click="thisSemi()"
              class="h-8 flex items-center  bg-blue-200 text-black rounded-md px-4 py-2 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
              <i class="fas fa-calendar-minus text-sm lowercase mr-2 text-blue-500"></i>
              <span>This Semi</span>
            </button>

          </div>
          <div class="flex flex-col space-y-3">
            <button @click="thisMonth()"
              class="h-8 flex items-center  bg-blue-200 text-black rounded-md px-4 py-2 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
              <i class="fas fa-calendar-week text-sm lowercase mr-2 text-blue-500"></i>
              <span>This Mon</span>
            </button>
            <button @click="thisWeek()"
              class="h-8 flex items-center  bg-blue-200  text-black rounded-md px-4 py-2 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
              <i class="fas fa-calendar-check text-sm lowercase mr-2 text-blue-500"></i>
              <span>This Week</span>
            </button>

          </div>
          <div class="flex flex-col space-y-3">
            <button @click="thisDay()"
              class="h-8 flex items-center  bg-blue-200 text-black rounded-md px-4 py-2 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
              <i class="fas fa-calendar-day text-sm lowercase mr-2 text-blue-500"></i>
              <span>This Day</span>
            </button>
          </div>
        </div>

        <div>
          <button @click="printDiv()" class="custom-button mt-5">
            <i class="fas fa-print"></i>
          </button>
        </div>
      </div>
      <!-- //select true or falses -->
      <div class="mt-5 ml-10 mb-5">
        <p v-if="selectReportType" class="text-red-500">Please Select Report Type</p>
        <p v-if="selectYear" class="text-red-500">Please Select Year</p>
        <p v-if="selectSemiYear" class="text-red-500">
          Please Select Semi year
        </p>
        <p v-if="selectMonth" class="text-red-500">Please Select Month</p>
        <p v-if="selectWeek" class="text-red-500">Please Select Week</p>
        <p v-if="selectDay" class="text-red-500">Please Select Day</p>
      </div>
      <div>

        <div class="flex flex-row">
          <p v-if="reportLength > 0" class="mx-5 my-5 text-gray-800 font-bold flex items-center space-x-4">
            <span>All Confirmed Payments: <span class="text-blue-500">{{ value }}</span></span>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 text-sm rounded flex items-center space-x-1"
              @click="exportConfirmedToExcel()">
              <i class="fas fa-download"></i>
              <span>Download</span>
            </button>
          </p>
        </div>
        <table v-if="reportLength > 0" class="min-w-full divide-y divide-gray-300 ">
          <thead class="bg-gray-50">
            <tr>
              <th rowspan="3" class="px-4 py-2  text-blue-800 text-left border border-gray-300">
                Banks
              </th>
              <th colspan="7" class="px-4 py-2 text-blue-800 text-left border border-gray-300">
                Balance
              </th>
            </tr>
            <tr>
              <th colspan="4" class="px-4 py-2 text-blue-800 text-left border border-gray-300">
                Block
              </th>
              <th colspan="3" class="px-4 py-2 text-blue-800 text-left border border-gray-300">
                Service
              </th>
            </tr>
            <tr>
              <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Regular</th>
              <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Subsidy</th>
              <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Urgent</th>
              <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Total Block</th>
              <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Penality</th>
              <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">M.service</th>
              <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Total Service</th>

            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-300">
            <tr v-for="(balance, bank) in reports.items.categorizedPayments.confirmed.bankTypes" :key="bank">
              <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
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
                {{ balance.serviceBalance }}
              </td>
            </tr>
            <tr class="font-bold bg-gray-100">
              <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">Total</td>
              <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                {{ reports.items.categorizedPayments.confirmed.totalRegularAmountPaid }}
              </td>
              <!-- Total Regular -->
              <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                {{ reports.items.categorizedPayments.confirmed.totalSubsidyAmountPaid }}
              </td>
              <!-- Total Subsidy -->
              <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                {{ reports.items.categorizedPayments.confirmed.totalUrgentAmountPaid }}
              </td>
              <!-- Total Urgent -->
              <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                {{ reports.items.categorizedPayments.confirmed.totalBlockBankAccountPaid }}
              </td>
              <!-- Total Urgent -->
              <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                {{ reports.items.categorizedPayments.confirmed.totalPenalityAmountPaid }}
              </td>
              <!-- Total Block -->
              <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                {{ reports.items.categorizedPayments.confirmed.totalServiceAmountPaid }}
              </td>
              <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
                {{ reports.items.categorizedPayments.confirmed.totalServiceBankAccountPaid }}
              </td>
              <!-- Total penality -->
            </tr>
          </tbody>
        </table>
        <div class="flex flex-row">
          <p v-if="reportLength > 0" class="mx-5 my-5 text-gray-800 font-bold flex items-center space-x-4">
            <span >All Pending Payments: <span v-if="pendingLength>0" class="text-blue-500">{{ reports.items.categorizedPayments.pending.uniqueUsers }}</span>
            <span v-else class="text-blue-500">0</span>
          </span>
            <button v-if="pendingLength>0"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 text-sm rounded flex items-center space-x-1"
              @click="exportPendingToExcel()">
              <i class="fas fa-download"></i>
              <span>Download</span>
            </button>
          </p>


        </div>
        <div class="flex flex-row">
          <p v-if="reportLength > 0" class="mx-5 my-5 text-gray-800 font-bold flex items-center space-x-4">
            <span>All Overdue Payments: 
              
              <span v-if="overdueLength>0" class="text-cyan-500">{{ reports.items.categorizedPayments.overdue.uniqueUsers }}</span>
              <span v-else class="text-cyan-500">0</span>

          </span>
           
           
            <button v-if="overdueLength>0"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 text-sm rounded flex items-center space-x-1"
              @click="exportOverdueToExcel()">
              <i class="fas fa-download"></i>
              <span>Download</span>
            </button>
          </p>


        </div>
        <p v-if="reportLength == 0">No report with the select time line</p>
      </div>
      <div>
      </div>
    </div>

    <div class="report-table mt-10 hidden" id="printable-area">
      <h2 class="text-center text-2xl font-bold text-indigo-800 mb-2">
        Bana Mole Report
      </h2>
      <p class="text-center text-sm text-gray-600 mb-4">
        Payment Report for {{ reportPeriod }}
      </p>
      <table class="min-w-full divide-y divide-gray-300 ">
        <thead class="bg-gray-50">
          <tr>
            <th rowspan="3" class="px-4 py-2  text-blue-800 text-left border border-gray-300">
              Banks
            </th>
            <th colspan="7" class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              Balance
            </th>
          </tr>
          <tr>
            <th colspan="4" class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              Block
            </th>
            <th colspan="3" class="px-4 py-2 text-blue-800 text-left border border-gray-300">
              Service
            </th>
          </tr>
          <tr>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Regular</th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Subsidy</th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Urgent</th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Total Block</th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Penality</th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">M.service</th>
            <th class="px-4 py-2 text-blue-800 text-left border border-gray-300">Total Service</th>

          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-300">
          <tr v-for="(balance, bank) in reports.items.categorizedPayments.confirmed.bankTypes" :key="bank">
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
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
              {{ balance.serviceBalance }}
            </td>
          </tr>
          <tr class="font-bold bg-gray-100">
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">Total</td>
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ reports.items.categorizedPayments.confirmed.totalRegularAmountPaid }}
            </td>
            <!-- Total Regular -->
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ reports.items.categorizedPayments.confirmed.totalSubsidyAmountPaid }}
            </td>
            <!-- Total Subsidy -->
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ reports.items.categorizedPayments.confirmed.totalUrgentAmountPaid }}
            </td>
            <!-- Total Urgent -->
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ reports.items.categorizedPayments.confirmed.totalBlockBankAccountPaid }}
            </td>
            <!-- Total Urgent -->
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ reports.items.categorizedPayments.confirmed.totalPenalityAmountPaid }}
            </td>
            <!-- Total Block -->
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ reports.items.categorizedPayments.confirmed.totalServiceAmountPaid }}
            </td>
            <td class="px-4 py-2 text-left border border-gray-300 text-blue-800">
              {{ reports.items.categorizedPayments.confirmed.totalServiceBankAccountPaid }}
            </td>
            <!-- Total penality -->
          </tr>
        </tbody>
      </table>
      <div v-if="monthlySelected" class="flex flex-row space-x-5">
        <div class="mt-5">
          <h4>Confirmed Clients:2000</h4>
        </div>
        <div class="mt-5">
          <h4>Unconfirmed Clients:2000</h4>
        </div>
      </div>
      <div id="qrCodeImageContainer" class="mb-4 flex justify-center mt-5">
        <!-- The QR code image will be placed here by JavaScript -->
      </div>
    </div>

  </div>
</template>
<script>
import QRCode from "qrcode";
import * as XLSX from 'xlsx';
export default {
  name: "ReportsView",
  data() {
    return {

      reportLength: 0,
      pendingLength: 0,
      confirmedLength: 0,
      overdueLength: 0,

      showPendingUncpnfirmed: false,
      userId: "bana0501tadie",
      userName: "Tadesse Gebremicheal Berhe",
      canvasId: "qrcodeCanvas",

      year: "", //new Date().getFullYear()(),
      semiYear: "", // this.getCurrentHalf(),
      month: "", //new Date().getMonth()(),
      week: "",
      day: "",
      reportType: "",

      selectYear: false,
      selectSemiYear: false,
      selectMonth: false,
      selectWeek: false,
      selectDay: false,
      selectReportType: false,

      annaualSelected: false,

      menfekSelected:false,
      ametSelected:false,

      semiAnaualSelected: false,
      monthlySelected: false,
      weeklySelected: false,
      dailySelected: false,

      reports: {
        status: "success",
        message: "Reports generated for annually",
        startDate: "2023-12-31",
        endDate: "2024-12-30",
        totalAllPayments: 41,
        reports: [],
        items: {
          Organization: {
            totalRegularBalance: 15000,
            totalSubsidyBalance: 1000,
            totalUrgentBalance: 40000,

            totalServiceBalance: 600,
            totalPenalityBalance: 0,
            totalBlockBankAccount: 56000,
            totalServiceBankAccount: 600,
            TotalOrgBalance: 56600,
          },
          categorizedPayments: {
            confirmed: {
              uniqueUsers: 2,
              totalPayments: 2,
              totalExpectedAmount: 56020,
              totalRegistrationAmount: 4620,
              totalRegularAmountPaid: 10000,
              totalUrgentAmountPaid: 40000,
              totalSubsidyAmountPaid: 1000,
              totalServiceAmountPaid: 400,
              totalPenalityAmountPaid: 0,

              totalBlockAmountPaid: 41100,
              totalServicePenalityAmountPaid: 400,

              bankTypes: {
                CBE: {
                  regularBalance: 5000,
                  urgentBalance: 0,
                  subsidyBalance: 0,
                  serviceBalance: 200,
                  penalityBalance: 0,
                  totalBlock: 5000,
                  totalService: 200

                },
                LIB: {
                  regularBalance: 5000,
                  urgentBalance: 0,
                  subsidyBalance: 1000,
                  serviceBalance: 200,
                  penalityBalance: 0,
                  totalBlock: 6000,
                  totalService: 200
                },
                WEGAGEN: {
                  regularBalance: 0,
                  urgentBalance: 40000,
                  subsidyBalance: 0,
                  serviceBalance: 0,
                  penalityBalance: 0,
                  totalBlock: 40000,
                  totalService: 0
                },
              },
              payments: [
                {
                  user: "66cb29b7379bc12bdfc7649c",
                  billCode: "BM 0001-2024-2-RE-SE",
                  status: "confirmed",
                },
                {
                  user: "66d002a91d9c058352291274",
                  billCode: "BM 0008-2024-1-RE-SE-EM-SU",
                  status: "confirmed",
                },
              ],
            },
            pending: {
              uniqueUsers: 20,
              totalPayments: 39,
              totalExpectedAmount: 1064960,
              totalRegistrationAmount: 83160,
              totalRegularAmountPaid: 5000,
              totalRegularAmountNotPaid: 190000,
              totalUrgentAmountPaid: 0,
              totalUrgentAmountNotPaid: 760000,
              totalSubsidyAmountPaid: 0,
              totalSubsidyAmountNotPaid: 19000,
              totalServiceAmountPaid: 200,
              totalServiceAmountNotPaid: 7600,
              totalPenalityAmountPaid: 0,
              totalPenalityAmountNotPaid: 0,
              bankTypes: {
                CBE: {
                  regularBalance: 5000,
                  urgentBalance: 0,
                  subsidyBalance: 0,
                  serviceBalance: 200,
                  penalityBalance: 0,
                },
                unpaidBalances: {
                  regular: 190000,
                  urgent: 760000,
                  subsidy: 19000,
                  service: 7600,
                  penality: 0,
                },
              },
              payments: [
                {
                  user: "66cb29b7379bc12bdfc7649c",
                  billCode: "BM 0001-2024-1-RE-SE-EM-SU",
                  status: "pending",
                },
                // Additional payment objects as needed
              ],
            },
            overdue: {},
            Undefined: {},
          },
        },
      },
    };
  },

  computed: {
    selectableYears() {
      const currentYear = new Date().getFullYear()();
      const startYear = currentYear - 15;
      const years = [];
      for (let year = startYear; year <= currentYear; year++) {
        years.push(year);
      }

      return years;
    },
  },
  mounted() {
    this.year = 2024;
    this.reportType = "annually";
   // this.menfekSelected=true;
  //  this.ametSelected=true;
    this.fetchPayments();
  },


  methods: {
    exportConfirmedToExcel() {
      // Prepare the data for the Excel file
      console.log("payments")
      const data = this.reports.items.categorizedPayments.confirmed.payments.map(item => ({
        'Full Name': item.payment.fullName,
        'User Code': item.payment.userCode,
        "Billcode": item.payment.billCode,
        'Year': item.payment.activeYear,
        'Month': item.payment.activeMonth,
        "Regular": item.payment.regular.amount,
        "Subsidy": item.payment.subsidy.amount,
        "Urgent": item.payment.urgent.amount,
        "Total Block": item.payment.regular.amount + item.payment.subsidy.amount + item.payment.urgent.amount,
        "Reg Fee": item.payment.registrationFee,
        "Monthly Service": item.payment.service.amount,
        "Penality": item.payment.penality.amount,
        "Total Service": item.payment.service.amount + item.payment.penality.amount + item.payment.registrationFee,
        "Status": "Paid",
      }));
      // Create a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Create a workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');

      // Write the workbook to a file and trigger download
      XLSX.writeFile(workbook, 'items.xlsx');
    },
    exportPendingToExcel() {
      // Prepare the data for the Excel file
      console.log("payments")
      const data = this.reports.items.categorizedPayments.pending.payments.map(item => ({
        'Full Name': item.payment.fullName,
        'User Code': item.payment.userCode,
        "Billcode": item.payment.billCode,
        'Year': item.payment.activeYear,
        'Month': item.payment.activeMonth,
        "Regular": item.payment.regular.amount,
        "Subsidy": item.payment.subsidy.amount,
        "Urgent": item.payment.urgent.amount,
        "Total Block": item.payment.regular.amount + item.payment.subsidy.amount + item.payment.urgent.amount,
        "Reg Fee": item.payment.registrationFee,
        "Monthly Service": item.payment.service.amount,
        "Penality": item.payment.penality.amount,
        "Total Service": item.payment.service.amount + item.payment.penality.amount + item.payment.registrationFee,
        "Status": "Unpaid",
      }));
      // Create a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Create a workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');

      // Write the workbook to a file and trigger download
      XLSX.writeFile(workbook, 'items.xlsx');
    },
    exportOverdueToExcel() {
      // Prepare the data for the Excel file
      console.log("payments")
      const data = this.reports.items.categorizedPayments.overdue.payments.map(item => ({
        'Full Name': item.payment.fullName,
        'User Code': item.payment.userCode,
        "Billcode": item.payment.billCode,
        'Year': item.payment.activeYear,
        'Month': item.payment.activeMonth,
        "Regular": item.payment.regular.amount,
        "Subsidy": item.payment.subsidy.amount,
        "Urgent": item.payment.urgent.amount,
        "Total Block": item.payment.regular.amount + item.payment.subsidy.amount + item.payment.urgent.amount,
        "Reg Fee": item.payment.registrationFee,
        "Monthly Service": item.payment.service.amount,
        "Penality": item.payment.penality.amount,
        "Total Service": item.payment.service.amount + item.payment.penality.amount + item.payment.registrationFee,
        "Status": "Overdue/Unpaid",
      }));
      // Create a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Create a workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');

      // Write the workbook to a file and trigger download
      XLSX.writeFile(workbook, 'items.xlsx');
    },
    changeReportType() {
      this.selectReportType = false;
      if (this.reportType == "annually") {
        this.annaualSelected = true;
        this.ametSelected=true;
        this.semiAnaualSelected = false;
        this.monthlySelected = false;
        this.weeklySelected = false;
        this.dailySelected = false;
        return;
        //this.$forceUpdate();
        //this.fetchPayments();
      }

      if (this.reportType == "semiAnnually") {
        alert("datetaype", this.reportType);
        console.log("year,semiyear", this.year, this.semiYear);

        this.annaualSelected = true;

        this.menfekSelected = true;

        this.semiAnaualSelected = true;

        this.monthlySelected = false;
        this.weeklySelected = false;
        this.dailySelected = false;

        if (this.semiYear =="") {
          // alert("Please select");
          this.semiAnaualSelected=true;
          this.selectSemiAnnual = true;
          return;
        }
        this.fetchPayments();
      }

      if (this.reportType == "monthly") {
        console.log("datetaype", this.reportType);
        console.log("year,month", this.year, this.month);
        this.annaualSelected = true;
        this.monthlySelected = true;
        this.weeklySelected = false;
        this.dailySelected = false;
        this.semiAnaualSelected = false;
        if (this.month === null) {
          this.selectMonth = true;
          return;
        }
        if (this.day === null) {
          this.selectDay = true;
          return;
        }
        this.fetchPayments();
      }

      if (this.reportType == "weekly") {
        this.annaualSelected = true;
        this.monthlySelected = true;
        this.weeklySelected = true;
        this.semiAnaualSelected = false;
        this.dailySelected = false;
        console.log("year,month,week", this.year, this.month, this.week);
        console.log("datetaype", this.reportType);

        if (this.month === null) {
          this.selectMonth = true;
          return;
        }
        if (this.week === null) {
          this.selectDay = true;
          return;
        }
        this.fetchPayments();
      }

      if (this.reportType == "daily") {
        console.log("year,month,week", this.year, this.month, this.day);
        this.annaualSelected = true;
        this.monthlySelected = true;
        this.dailySelected = true;
        this.semiAnaualSelected = false;
        this.weeklySelected = false;
        console.log("datetaype", this.reportType);
        if (this.month === null) {
          this.selectMonth = true;
          return;
        }
        if (this.day === null) {
          this.selectDay = true;
          return;
        }
        this.fetchPayments();
      }
    },




    fetchPayments() {
      // this.reports = [];
      // if (this.reportType === "") {
      //   this.selectReportType = true;
      //   return;
      // }


      if (this.reportType == "annually") {



        this.fetchYearlyPayments();
      }


      if (this.reportType == "semiAnnually") {
       // alert("fetch semi")
       this.menfekSelected = true ;

        if (this.year == "") {
          this.selectYear = true;
          return;
        }



          this.semiAnaualSelected = true;
       
          this.fetchSemiYearlyPayments();
        
       
      }

      if (this.reportType == "monthly") {
        if (this.year == "") {
          this.selectYear = true;
          return;
        }
        this.fetchMonthlyPayments();
      }
      if (this.reportType == "weekly") {
        if (this.year == "") {
          this.selectYear = true;
          return;
        }
        if (this.month == "") {
          this.selectMonth = true;
          this.selectYear = false;
          return;
        } else {
          this.selectMonth = false;
        }
        this.fetchWeeklyPayments();
      }
      if (this.reportType == "daily") {
        if (this.year == "") {
          this.selectYear = true;
          return;
        }
        if (this.month == "") {
          this.selectMonth = true;
          this.selectYear = false;
          return;
        } else {
          this.selectMonth = false;
        }
        this.fetchDailyPayments();
      }
    },

    fetchYearlyPayments() {
      // alert("last yearly method")
      this.selectSemiYear = false;
      this.selectYear = false;
      this.selectMonth = false;
      this.selectWeek = false,
        this.selectDay = false;


      this.selectReportType = false;
      if (this.reportType == "") {
        this.selectReportType = true;
        return;
      }
      if (this.year == "") {
        this.selectYear = true;
        return;
      }
      if (this.reportType == "semiAnnually") {
        this.fetchSemiYearlyPayments();
        return;
      }
      if (this.reportType == "monthly") {
        this.fetchMonthlyPayments();
        return;
      }
      if (this.reportType == "weekly") {
        this.fetchWeeklyPayments();
        return;
      }
      if (this.reportType == "daily") {
        this.fetchDailyPayments;
        return;
      }

      //  alert(this.year);


      this.$apiClient.get(`/api/v1/payments/reports?timeRange=${this.reportType}&year=${this.year}`).then((response) => {
        //alert("response");
        console.log("yearly report is =", response.data);
        this.reports = response.data;
        this.reportLength = response.data.items.categorizedPayments.confirmed.uniqueUsers;
        this.confirmedLength = response.data.items.categorizedPayments.confirmed.uniqueUsers;
        this.pendingLength = response.data.items.categorizedPayments.pending.uniqueUsers;
        this.overdueLength = response.data.items.categorizedPayments.overdue.uniqueUsers;

      })
        .catch((error) => {
          this.reports = [];
          //alert("an error");
          this.reportLength = 0;
          this.confirmedLength = 0;
          this.pendingCount = 0;
          this.overdueLength = 0;
          console.error("Error fetching yearly data in yearly:", error);
        });

      //alert("you have finished");
    },
    fetchSemiYearlyPayments() {
      this.selectSemiYear = false;
      this.selectYear = false;
      this.selectMonth = false;
      this.selectWeek = false,
      this.selectDay = false;

      if (this.year == "") {
        this.selectYear = true;
        return;
      }

      if (this.semiYear == "") {
        this.selectSemiYear = true;
        return;
      }


      this.apiClient
        .get(
          `/api/v1/payments/reports?timeRange=${this.reportType}&year=${this.year}$semiYear=${this.semiYear}`
        )
        .then((response) => {
          this.reports = response.data;
          this.reportLength = response.data.items.categorizedPayments.confirmed.uniqueUsers;
          this.confirmedLength = response.data.items.categorizedPayments.confirmed.uniqueUsers;
          this.pendingLength = response.data.items.categorizedPayments.pending.uniqueUsers;
          this.overdueLength = response.data.items.categorizedPayments.overdue.uniqueUsers;
        })
        .catch((error) => {
          this.reportLength = 0;
          this.confirmedLength = 0;
          this.pendingCount = 0;
          this.overdueLength = 0;

          console.error("Error fetching client data:", error);
        });
    },
    fetchMonthlyPayments() {
      this.selectSemiYear = false;
      this.selectYear = false;
      this.selectMonth = false;
      this.selectWeek = false,
        this.selectDay = false;
      if (this.year == "") {
        this.selectYear = true;
        return;
      }
      if (this.month == "") {
        this.selectMonth = true;
        return;
      }
      if (this.reportType == "weekly") {
        this.fetchWeeklyPayments();
        return;
      }
      if (this.reportType == "daily") {
        this.fetchDailyPayments();
        return;
      }
      this.apiClient
        .get(
          `/api/v1/payments/reports?timeRange=${this.reportType}&year=${y}&month=${this.month}`
        )
        .then((response) => {
          this.reports = response.data;
          this.reportLength = response.data.items.categorizedPayments.confirmed.uniqueUsers;
          this.confirmedLength = response.data.items.categorizedPayments.confirmed.uniqueUsers;
          this.pendingLength = response.data.items.categorizedPayments.pending.uniqueUsers;
          this.overdueLength = response.data.items.categorizedPayments.overdue.uniqueUsers;

        })
        .catch((error) => {
          this.reportLength = 0;
          this.confirmedLength = 0;
          this.pendingCount = 0;
          this.overdueLength = 0;
          console.error("Error fetching client data:", error);
        });
    },
    fetchWeeklyPayments() {
      this.selectYear = false;
      this.selectMonth = false;
      this.selectSemiYear = false;
      this.selectWeek = false;
      this.selectDay = false;
      if (this.year == "") {
        this.selectYear = true;
        return;
      }
      if (this.month == "") {
        this.selectMonth = true;
        return;
      }
      if (this.week == "") {
        this.selectWeek = true;
        return;
      }
      this.apiClient
        .get(
          `/api/v1/payments/reports?timeRange=${this.reportType}&year=${this.year}&month=${month}&week=${this.week}`
        )
        .then((response) => {
          this.reports = response.data;
          this.reportLength = response.data.items.categorizedPayments.confirmed.uniqueUsers;
          this.confirmedLength = response.data.items.categorizedPayments.confirmed.uniqueUsers;
          this.pendingLength = response.data.items.categorizedPayments.pending.uniqueUsers;
          this.overdueLength = response.data.items.categorizedPayments.overdue.uniqueUsers;
        })
        .catch((error) => {
          this.reportLength = 0;
          this.confirmedLength = 0;
          this.pendingCount = 0;
          this.overdueLength = 0;
          console.error("Error fetching client data:", error);
        });
    },
    fetchDailyPayments() {
      this.selectYear = false;
      this.selectMonth = false;
      this.selectYear = false;
      this.selectWeek = false;
      this.selectDay = false;
      console.log("daily");
      if (this.year == "") {
        this.selectYear = true;
        return;
      }
      if (this.month == "") {
        this.selectMonth = true;
        return;
      }
      if (this.day == "") {
        this.selectDay = true;
        return;
      }
      this.apiClient
        .get(
          `/api/v1/payments/reports?timeRange=${this.reportType}&year=${this.year}&month=${month}&day=${this.day}`
        )
        .then((response) => {
          this.reports = response.data;
          this.reportLength = response.data.items.categorizedPayments.confirmed.uniqueUsers;
          this.confirmedLength = response.data.items.categorizedPayments.confirmed.uniqueUsers;
          this.pendingLength = response.data.items.categorizedPayments.pending.uniqueUsers;
          this.overdueLength = response.data.items.categorizedPayments.overdue.uniqueUsers;
        })
        .catch((error) => {
          this.reportLength = 0;
          this.confirmedLength = 0;
          this.pendingCount = 0;
          this.overdueLength = 0;
          console.error("Error fetching client data:", error);
        });
    },

    thisYear() {
      //alert("this year")
      console.log("this year is called");

      const timeRange = "annually";
      this.year = (new Date()).getFullYear();
      this.$apiClient.get(
        `/api/v1/payments/reports?timeRange=${timeRange}&year=${this.year}`
      )
        .then((response) => {
          this.reports = response.data;
          this.reportLength = response.data.items.categorizedPayments.confirmed.uniqueUsers;
        })
        .catch((error) => {
          this.reportLength = 0;
          console.error("Error fetching yearly reports:", error);
        });
    },
    thisSemi() {
      this.reportType = "semiAnnually";
      this.year = (new Date()).getFullYear();
      this.semiYear = this.getCurrentHalf();
      this.fetchSemiYearlyPayments();
    },
    thisMonth() {
      this.year = (new Date()).getFullYear();
      this.month = (new Date()).getMonth() + 1;
      this.reportType = "monthly";
      this.fetchPayments();
    },
    thisWeek() {
      this.year = (new Date()).getFullYear();
      this.reportType = "weekly";
      const today = new Date();
      this.week = this.getWeekNumber(today);
      this.month = (new Date()).getMonth() + 1;
      this.fetchPayments();
    },
    thisDay() {
      this.day = new Date();
      this.year = (new Date()).getFullYear();
      this.month = (new Date()).getMonth() + 1;
      this.reportType = "daily";
      this.fetchPayments();
    },

    getWeekNumber(date) {
      const currentDate = new Date(date);
      const startDate = new Date(currentDate.getFullYear()(), 0, 1);
      const dayOfYear = Math.floor(
        (currentDate - startDate) / (24 * 60 * 60 * 1000)
      );
      // ISO week date weeks start on Monday, so correct the day number
      const weekDay = (currentDate.getDay() + 6) % 7;
      // Calculate week number
      return Math.ceil((dayOfYear + 7 - weekDay) / 7);
    },
    goToGruopPayment() {
      const paymentType = this.paymentType;
      const reportType = this.reportType;

      const year = this.year;
      const semiYear = this.semiYear;
      const month = this.month;
      const week = this.Week;
      const day = this.day;

      if (this.reportType == "annually") {
        this.$router.push({
          name: "confirmed",
          query: { paymentType, reportType, year },
          // props: { paymentType, year },
        });
      }

      if (this.reportType == "semiAnnually") {
        this.$router.push({
          name: "group-payments",
          query: { paymentType, reportType, year, semiYear },
          // props: { paymentType, year },
        });
      }

      if (this.reportType == "monthly") {
        this.$router.push({
          name: "group-payments",
          query: { paymentType, reportType, year, month },
          // props: { paymentType, year },
        });
      }
      if (this.reportType == "weekly") {
        this.$router.push({
          name: "group-payments",
          query: { paymentType, reportType, year, month, week },
        });
      }
      if (this.reportType == "daily") {
        this.$router.push({
          name: "group-payments",
          query: { paymentType, reportType, year, month, day },
        });
      }
    },
    getCurrentHalf() {
      const month = new Date().getMonth()();
      return month < 6 ? "1st" : "2nd";
    },

    async generateQRCodeImage() {
      const qrData = `User ID: ${this.userId}, User Name: ${this.userName}`;

      try {
        // Generate QR code as a data URL (image) without rendering it to a canvas
        const qrCodeImage = await QRCode.toDataURL(qrData, {
          errorCorrectionLevel: "H",
        });

        // You can now use qrCodeImage in an <img> tag directly
        document.getElementById(
          "qrCodeImageContainer"
        ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    },

    async printDiv() {
      // First, generate the QR code image
      await this.generateQRCodeImage();

      // Now proceed with the printing
      const printContent = document.getElementById("printable-area").innerHTML;

      // Create a link element to read the Tailwind CSS file
      const linkElement = document.createElement("link");
      linkElement.href = "/src/assets/css/tailwind.css"; // Adjust the path as necessary
      linkElement.rel = "stylesheet";

      // Create a new window for printing
      const printWindow = window.open(
        "",
        "",
        `height=${window.innerHeight},width=${window.innerWidth}`
      );
      printWindow.document.open();

      // Write the content to the new window
      printWindow.document.write(`
      <html>
        <head>
          <title>Payment Report</title>
          ${linkElement.outerHTML} <!-- Include the Tailwind CSS link -->
        </head>
        <body>
          <div id="printable-area">
            ${printContent}
          </div>
        </body>
      </html>
    `);
      printWindow.document.close();

      // Ensure that the print dialog opens and window closes after printing
      printWindow.onload = function () {
        printWindow.focus();
        printWindow.print();
      };
      printWindow.onafterprint = function () {
        printWindow.close();
      };
    },
  },
};
</script>
<style>
.lowercase {
  text-transform: lowercase;
}

#qrcodeCanvas {
  width: 200px;
  /* Adjust as needed */
  height: 200px;
  /* Adjust as needed */
}
</style>