<template>
  <div class="border border border-gray-400 mt-5">
    <div class="report-table hidden" id="printable-area">
      <div style="width: 90%; max-width: 100%; min-width: 100%">
        <img
          src="../../../../assets/img/banaReport.jpg"
          alt=""
          style="max-width: 100%; height: auto; display: block"
        />
      </div>
      <div
        style="
          display: flex;
          justify-content: flex-end;
          color: black;
          font-size: 10px;
          margin-top: 10px;
        "
      >
        <div>Report Type: {{ reportType }}</div>
      </div>
      <div
        style="
          display: flex;
          justify-content: flex-end;
          color: black;
          font-size: 10px;
        "
      >
        Date(Day-Month-Year): {{ this.year }}
        <p v-if="month">-{{ this.month }}</p>
      </div>
      <div
        style="
          display: flex;
          justify-content: flex-end;
          color: black;
          font-size: 10px;
        "
      >
        <div>Reported Date:{{ new Date().toLocaleDateString() }}</div>
      </div>

      <h2
        class="section-title"
        style="color: #622e2e; font-weight: bold; margin-bottom: 15px"
      >
        Total Balance
      </h2>
      <table>
        <thead style="font-size: 12px">
          <tr>
            <th rowspan="3" style="text-align: center">Banks</th>
            <th colspan="8" style="text-align: center">Balance</th>
          </tr>
          <tr>
            <th colspan="4" style="text-align: center">Block</th>
            <th colspan="3" style="text-align: center">Service</th>
            <th colspan="1" rowspan="2" style="text-align: center">
              Total Balance
            </th>
          </tr>
          <tr>
            <th>Regular</th>
            <th>Subsidy</th>
            <th>Urgent</th>
            <th>Total Block</th>
            <th>Penalty</th>
            <th>Monthly Service</th>
            <th>Total Service</th>
          </tr>
        </thead>
        <tbody
          v-if="reportLength > 0"
          style="background-color: white; font-size: 12px"
        >
          <tr
            v-for="(bank, index) in reports.items.totalBalanceBankType"
            :key="index"
          >
            <td class="border border-gray-300 px-4 py-2">
              {{ index }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{ bank.regularBalance }}
            </td>

            <td class="border border-gray-300 px-4 py-2">
              {{ bank.subsidyBalance }}
            </td>

            <td class="border border-gray-300 px-4 py-2">
              {{ bank.urgentBalance }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{ bank.totalBlockBalance }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{ bank.penalityBalance }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{ bank.serviceBalance }}
            </td>

            <td class="border border-gray-300 px-4 py-2">
              {{ bank.totalServiceBalance }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{ bank.totalServiceBalance + bank.totalBlockBalance }}
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
              {{ reports.items.Organization.totalRegularBalance }}
            </td>
            <!-- Total Regular -->
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ reports.items.Organization.totalSubsidyBalance }}
            </td>
            <!-- Total Subsidy -->
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ reports.items.Organization.totalUrgentBalance }}
            </td>
            <!-- Total Urgent -->
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ reports.items.Organization.totalBlockBankAccount }}
            </td>
            <!-- Total Urgent -->
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ reports.items.Organization.totalPenalityBalance }}
            </td>
            <!-- Total Block -->
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ reports.items.Organization.totalServiceBalance }}
            </td>
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{ reports.items.Organization.totalServiceBankAccount }}
            </td>
            <td
              class="px-4 py-2 text-left border border-gray-300 text-blue-800"
            >
              {{
                reports.items.Organization.totalBlockBankAccount +
                reports.items.Organization.totalServiceBankAccount
              }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="reportType === 'monthly'">
        <h2
          class="section-title"
          style="
            font-size: 12px;
            color: #622e2e;
            font-weight: bold;
            margin-bottom: 15px;
            margin-left: 20px;
          "
        >
          Total Confirmed Clients IN This Year(Paid):1850
        </h2>

        <h2
          class="section-title"
          style="
            font-size: 12px;
            color: #622e2e;
            font-weight: bold;
            margin-bottom: 15px;
            margin-left: 20px;
          "
        >
          Total Un Paid Clients(Deadline Not Passed):125
        </h2>
        <h2
          class="section-title"
          style="
            font-size: 12px;
            color: #622e2e;
            font-weight: bold;
            margin-bottom: 15px;
            margin-left: 20px;
          "
        >
          Total Overdue(Deadline Passes and Still Unpaid):25
        </h2>
      </div>

      <div v-if="reportType === 'annually'">
        <h2
          class="section-title"
          style="
            font-size: 12px;
            color: red;
            font-weight: bold;
            margin-bottom: 15px;
            margin-left: 20px;
          "
        >
          <!-- Total Overdue(Monthly Deadline Passed and Still Unpaid):{{
            reports.items.categorizedPayments.overdue.uniqueUsers
          }} -->
        </h2>

        <!-- <h2 class="section-title" style="font-size:12px;color: #622e2e; font-weight: bold;margin-bottom:15px;margin-left:20px;">
          Total Pending In This Month: 25
      </h2>
      <h2 class="section-title" style="font-size:12px;color: #622e2e; font-weight: bold;margin-bottom:15px;margin-left:20px;">
          Total Confirmed(Paid) In This Month: 25
      </h2> -->
      </div>

      <div v-if="reportType === 'semiAnnually'">
        <h2
          class="section-title"
          style="
            font-size: 12px;
            color: #622e2e;
            font-weight: bold;
            margin-bottom: 15px;
            margin-left: 20px;
          "
        >
          Total Overdue(Passed Deadline and Still Unpaid):25
        </h2>
      </div>
      <div v-if="reportType === 'weekly'">
        <h2
          class="section-title"
          style="
            font-size: 12px;
            color: #622e2e;
            font-weight: bold;
            margin-bottom: 15px;
            margin-left: 20px;
          "
        >
          Total Confirmed Clients In This Week(Paid):1850
        </h2>
      </div>
      <div v-if="reportType === 'daily'">
        <h2
          class="section-title"
          style="
            font-size: 12px;
            color: #622e2e;
            font-weight: bold;
            margin-bottom: 15px;
            margin-left: 20px;
          "
        >
          Total Confirmed Clients(Paid):1850
        </h2>
      </div>
      <!-- <div class="footer-info">
      <div>Confirmed Clients: 2000</div>
      <div>Unconfirmed Clients: 2000</div>
    </div> -->
      <div style="position: relative; width: 100%; height: 100px">
        <div
          id="qrCodeImageContainer"
          style="
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 40px;
            background-color: lightgray;
          "
        >
          QR Code
        </div>
      </div>

      <div style="
            display: flex;
            justify-content: center;
            margin-top: 200px;
            color: #622e2e;
            font-weight: bold;
          ">
          <div class="footer">
            &copy; {{ new Date().getFullYear() }} Bana General Market Mall. All rights
            reserved.
          </div>
        </div>


          <div style="
            margin-top: 25px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 0.7rem; /* Extremely small text */
            color: #6b21a8; /* Purple color for the text */
          ">
          <div style="font-weight: 800;">
           <span class="" style="color: black;">Powered By</span> Grand Technology Solutions
          </div>
          <div style="
            font-size: 0.7rem; /* Smaller text for email and phone */
            margin-top: 4px;
          ">
            Email: <a href="mailto:info@grandtechnolgysolutions.com"
              style="color: black; text-decoration: none;">info@grandtechnolgysolutions.com</a> |
            Phone: <a href="tel:+251987014339" style="color: black; text-decoration: none;">+251987014339</a>
          </div>
        </div>
    </div>


    <div class="flex flex-col p-4 text-xs">
      <div class="flex flex-row border-b pb-5 border-blue-500">
        <label class="custom-label w-1/2 ml-5"> Report Type: </label>
        <select
          v-model="reportType"
          @change="changeReportType()"
          class="custom-select h-10"
        >
          <option value="" disabled>Select Report Type</option>
          <option
            v-for="reportType in $reportTypes"
            :key="reportType"
            :value="reportType.value"
          >
            {{ reportType.name }}

          </option>
        </select>
      </div>
 <div class="border border-gray-300 my-5 px-5 rounded-lg" v-if="reportType!='allTime'">
      <div class="flex flex-col">
        <div
          class="mt-5 w-full flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0"
        >
      <div class="flex flex-row space-x-3" v-if="otherSelected">
        <div class="mb-4">
          <label for="StartingDate" class="custom-label">Starting Date</label>
          <input 
            v-model="startingDate" 
            type="date" 
            id="StartingDate" 
            class="custom-input" 
            @change="fetchPayments()"
          />
        </div>
        <div class="mb-4">
          <label for="EndingDate" class="custom-label">Ending Date</label>
          <input 
            v-model="endingDate" 
            type="date" 
            id="EndingDate" 
            class="custom-input" 
            @change="fetchPayments()"
          />
        </div>
      </div>


          <div>
            <select
              v-model="year"
              v-if="annuallySelected"
              @change="fetchPayments()"
              class="custom-select"
            >
              <option value="" disabled>Select Year</option>
              <!-- Dynamically generate options using the global $years variable -->
              <option
                v-for="yearOption in $years"
                :key="yearOption"
                :value="yearOption"
              >
                {{ yearOption }}
              </option>
            </select>
          </div>

          <div>
            <select
              v-model="semiYear"
              v-if="semiAnnuallySelected"
              @change="fetchPayments()"
              class="custom-select"
            >
              <option value="" disabled>Select Semi Annual</option>
              <option value="1st">1st-half</option>
              <option value="2nd">2nd-half</option>
            </select>
          </div>

          <div>
            <select
              v-model="month"
              v-if="monthlySelected"
              @change="fetchPayments()"
              class="custom-select"
            >
              <option value="" disabled>Select Month</option>
              <!-- Dynamically generate options using the global $months variable -->
              <option
                v-for="monthOption in $months"
                :key="monthOption.value"
                :value="monthOption.value"
              >
                {{ monthOption.name }}
              </option>
            </select>
          </div>

          <div>
            <select
              v-model="week"
              v-if="weeklySelected"
              @change="fetchPayments()"
              class="custom-select"
            >
              <option value="" disabled selected>Select Week</option>
              <option value="week1">week-1</option>
              <option value="week2">week-2</option>
              <option value="week3">week-3</option>
              <option value="week4">week4</option>
            </select>
          </div>
          <div>
            <select
              v-model="day"
              @change="fetchPayments()"
              v-if="dailySelected"
              class="custom-select"
            >
              <option value="" disabled selected>Select Day</option>
              <!-- Dynamically generate options using the global $days variable -->
              <option
                v-for="dayOption in $days"
                :key="dayOption"
                :value="dayOption"
              >
                {{ dayOption }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-5 ml-10">
          <p v-if="selectReportType" class="text-red-500">
            Please Select Report Type
          </p>
          <p v-if="selectYear" class="text-red-500">Please Select Year</p>
          <p v-if="selectSemiYear" class="text-red-500">
            Please Select Semi year
          </p>
          <p v-if="selectMonth" class="text-red-500">Please Select Month</p>
          <p v-if="selectWeek" class="text-red-500">Please Select Week</p>
          <p v-if="selectDay" class="text-red-500">Please Select Day</p>
        </div>
    
      </div>
    </div>


        <div
          class="mt-3 flex flex-col lg:flex-row space-y-3 lg:space-y-0 space-x-0 lg:space-x-2 border border gray-300 p-5 rounded-lg"
        >
          <div class="flex flex-row space-x-2">
            <button
              @click="setReportParamsForCurrentPeriod('annually')"
              class="h-12 lg:h-8 flex items-center bg-blue-100 text-black rounded-md px-4 py-2 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              <i
                class="fas fa-calendar-alt text-sm lowercase mr-2 text-blue-500 text-blue-500"
              ></i>
              <span>This Year</span>
            </button>

            <button
              @click="setReportParamsForCurrentPeriod('semiAnnually')"
              class="h-12 lg:h-8 flex items-center bg-blue-100 text-black rounded-md px-4 py-2 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              <i
                class="fas fa-calendar-minus text-sm lowercase mr-2 text-blue-500"
              ></i>
              <span>This Semi</span>
            </button>

            <button
              @click="setReportParamsForCurrentPeriod('monthly')"
              class="h-12 lg:h-8 flex items-center bg-blue-100 text-black rounded-md px-4 py-2 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              <i
                class="fas fa-calendar-week text-sm lowercase mr-2 text-blue-500"
              ></i>
              <span>This Mon</span>
            </button>
          </div>
         
            <button
              @click="setReportParamsForCurrentPeriod('weekly')"
              class="h-12 lg:h-8 flex items-center bg-blue-100 text-black rounded-md px-4 py-2 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              <i
                class="fas fa-calendar-check text-sm lowercase mr-2 text-blue-500"
              ></i>
              <span>This Week</span>
            </button>

            <button
              @click="setReportParamsForCurrentPeriod('daily')"
              class="h-12 lg:h-8 flex items-center bg-blue-100 text-black rounded-md px-4 py-2 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              <i
                class="fas fa-calendar-day text-sm lowercase mr-2 text-blue-500"
              ></i>
              <span>This Day</span>
            </button>
      
      
    
      </div>
      <div>


        <div class="flex flex-col border border-gray-300 rounded-lg mt-5" v-if="reportLength > 0">
          <div class="flex flex-row items-center mr-5">
  <p class="mx-5 my-5 text-gray-800 font-bold flex items-center space-x-4">
    <span>
     
      <span class="text-blue-500">Fully/Partially Paid</span>
    </span>
  </p>

  <button
    @click="printDiv()"
    class="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 text-sm rounded flex items-center space-x-1"
  >
    <i class="fas fa-print mr-2"></i> Print
  </button>
</div>

      


     

        <div class="overflow-x-auto rounded- mx-5" v-if="reportLength > 0">
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
                  class="justify-center items-center text-blue-800 border border-gray-300 py-3"
                >
                  {{ $t("balance") }}
                </th>
              </tr>
              <tr>
                <th
                  colspan="4"
                  class="py-2 justify-center items-center text-blue-800 border border-gray-300"
                >
                  {{ $t("block") }}
                </th>
                <th
                  colspan="3"
                  class="py-2 justify-center items-center text-blue-800 border border-gray-300"
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
                v-for="(bank, index) in reports.items.totalBalanceBankType"
                :key="index"
              >
                <td class="border border-gray-300 px-4 py-2">
                  {{ index }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ bank.regularBalance }}
                </td>

                <td class="border border-gray-300 px-4 py-2">
                  {{ bank.subsidyBalance }}
                </td>

                <td class="border border-gray-300 px-4 py-2">
                  {{ bank.urgentBalance }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ bank.totalBlockBalance }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ bank.penalityBalance }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ bank.serviceBalance }}
                </td>

                <td class="border border-gray-300 px-4 py-2">
                  {{ bank.totalServiceBalance }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ bank.totalServiceBalance + bank.totalBlockBalance }}
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
                  {{ reports.items.Organization.totalRegularBalance }}
                </td>
           
                <td
                  class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                >
                  {{ reports.items.Organization.totalSubsidyBalance }}
                </td>
            
                <td
                  class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                >
                  {{ reports.items.Organization.totalUrgentBalance }}
                </td>
      
                <td
                  class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                >
                  {{ reports.items.Organization.totalBlockBankAccount }}
                </td>
        
                <td
                  class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                >
                  {{ reports.items.Organization.totalPenalityBalance }}
                </td>
             
                <td
                  class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                >
                  {{ reports.items.Organization.totalServiceBalance }}
                </td>
                <td
                  class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                >
                  {{ reports.items.Organization.totalServiceBankAccount }}
                </td>
                <td
                  class="px-4 py-2 text-left border border-gray-300 text-blue-800"
                >
                  {{
                    reports.items.Organization.totalBlockBankAccount +
                    reports.items.Organization.totalServiceBankAccount
                  }}
                </td>
              </tr>
            </tbody>
          </table>

          <div class="my-5 mx-3">
        <a
          @click="showPaymentReportDetail = true"
          class="text-blue-600 hover:text-blue-800 underline font-medium cursor-pointer transition duration-200 ease-in-out"
        >
           Payment Report Detail
        </a>
      </div>

        </div>
      </div>

        <div class="flex flex-row border border-gray-300 rounded-lg p-4 mt-5">
          <p
            v-if="reportLength > 0"
            class="mx-5 my-5 text-gray-800 font-bold flex items-center space-x-4"
          >
            <span
              >All Overdue Payments:

              <span v-if="overdueLength > 0" class="text-cyan-500">{{
                reports.items.categorizedPayments.overdue.uniqueUsers
              }}</span>
              <span v-else class="text-cyan-500">0</span>
            </span>
            <a
              @click="seeAllOverdue"
              class="cursor-pointer bg-blue-100 px-4 py-1 rounded-lg text-green-800"
              >See Detail</a
            >

            <button
              v-if="overdueLength > 0"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 text-sm rounded flex items-center space-x-1"
              @click="exportOverdueToExcel()"
            >
              <i class="fas fa-download"></i>
              <span class="text-xs">Excel</span>
            </button>
          </p>
          <p v-else class="text-md p-3 text-pink-900">
            No report for the selected time !!
          </p>
        </div>
      </div>
    </div>

<div v-if="showPaymentReportDetail">
  <transition name="fade" mode="out-in">
    <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-80 px-4">
      <!-- Modal with margins -->
      <div class="bg-white rounded-lg border border-cyan-500 px-4 py-6 lg:p-6 w-full max-w-5xl max-h-screen m-4">
        <!-- Header -->
        <div class="flex flex-row items-center">
          <div class="ml-3 text-xl font-semibold text-blue-800 font-extrabold">
            Organization Payment Detail
          </div>

          <!-- Close Icon -->
          <div class="ml-auto" @click="showPaymentReportDetail = !showPaymentReportDetail">
            <svg class="w-6 h-6 text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
        </div>

        <hr class="my-4 bg-red-500" />

        <!-- Cards for each bank -->
        <div class="p-4 h-96 overflow-y-auto space-y-4">
          <div v-for="(balance, bank) in totalBalance.orgBalancesBasedBankType" :key="bank" class="bg-white shadow-md rounded-lg p-4 border border-gray-300">
            <!-- Centered Bank Name -->
            <h3 class="text-lg font-semibold text-blue-800 mb-4">{{ bank }}</h3>

            <!-- Balance Details -->
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
                  <span class="font-medium">{{ $t("Outcoming Block Balance") }}</span>
                  <span>{{ balance.blockOutcoming || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("Incoming Block Balance") }}</span>
                  <span>{{ balance.blockIncoming || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("totalBlock") }}</span>
                  <span class="bg-gray-100 px-2 py-1 rounded text-blue-500">{{ balance.totalBlockBalance || 0 }}</span>
                </div>
              </div>

              <!-- Right Column -->
              <div class="space-y-2 pr-10">
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("penality") }}</span>
                  <span>{{ balance.penalityBalance || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("Monthly Service") }}</span>
                  <span>{{ balance.serviceBalance || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("OutComing Service Balance") }}</span>
                  <span>{{ balance.serviceOutcoming || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("Incoming Service Balance") }}</span>
                  <span>{{ balance.serviceIncoming || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium ">{{ $t("totalService") }}</span>
                  <span class="bg-gray-100 px-2 py-1 rounded text-blue-500">{{ balance.totalServiceBalance || 0 }}</span>
                </div>
              </div>
            </div>

            <!-- Total Balance for the Bank -->
            <div class="flex justify-between border-t border-gray-500 mt-5 pt-5 pr-10">
              <span class="font-medium text-blue-500">{{ $t("Total Balance") }}</span>
              <span class="bg-gray-200 px-2 py-1 rounded text-blue-500">
                {{ (balance.totalServiceBalance || 0) + (balance.totalBlockBalance || 0) }}
              </span>
            </div>
          </div>
          <div class="bg-gray-50 shadow-md rounded-lg p-4 border-r border-gray-300">
            <h3 class="text-lg font-bold text-blue-800 mb-4">{{ $t("total") }}</h3>

            <div class="grid lg:grid-cols-2 gap-6 text-sm ml-3">
              <!-- Left Column -->
              <div class="space-y-2 lg:border-r border-blue-500 pr-10">
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("regular") }}</span>
                  <span>{{ totalOrgBalance.totalRegularBalance || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("subsidy") }}</span>
                  <span>{{ totalOrgBalance.totalSubsidyBalance || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("urgent") }}</span>
                  <span>{{ totalOrgBalance.totalUrgentBalance || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("totalBlock") }}</span>
                  <span class="bg-gray-100 px-2 py-1 rounded">{{ totalOrgBalance.totalBlockBankAccount || 0 }}</span>
                </div>
              </div>

              <!-- Right Column -->
              <div class="space-y-2 pr-10">
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("penality") }}</span>
                  <span>{{ totalOrgBalance.totalPenalityBalance || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("Monthly Service") }}</span>
                  <span>{{ totalOrgBalance.totalServiceBalance || 0 }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">{{ $t("totalService") }}</span>
                  <span class="bg-gray-100 px-2 py-1 rounded">{{ totalOrgBalance.totalServiceBankAccount || 0 }}</span>
                </div>
              </div>
            </div>

            <div class="flex justify-between border-t border-gray-500 mt-5 pt-5 pr-10">
              <span class="font-medium text-blue-500">{{ $t("Total Balance") }}</span>
              <span class="bg-gray-200 px-2 py-1 rounded text-blue-500">
                {{ (totalOrgBalance.totalServiceBankAccount || 0) + (totalOrgBalance.totalBlockBankAccount || 0) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>


  </div>
</template>
<script>
import QRCode from "qrcode";
import * as XLSX from "xlsx";
export default {
  name: "ReportsView",
  data() {
    return {

      showPaymentReportDetail:false,
      categories: ["confirmed", "pending", "overdue"],
      totalBalance: [],
      totalOrgBalance: {},

      reportLength: 0,

      pendingLength: 0,
      confirmedLength: 0,
      overdueLength: 0,

      showPendingUncpnfirmed: false,
      userId: "bana0501tadie",
      userName: "Tadesse Gebremicheal Berhe",
      canvasId: "qrcodeCanvas",

      year: new Date().getFullYear(),
      semiYear: "", // this.getCurrentHalf(),
      month: "", //new Date().getMonth()
      week: "",
      day: "",
      reportType: "",
      selectYear: false,
      selectSemiYear: false,
      selectMonth: false,
      selectWeek: false,
      selectDay: false,
      selectReportType: false,
      annuallySelected: true,
      semiAnaualSelected: false,
      semiAnnuallySelected: false,
      monthlySelected: false,
      weeklySelected: false,
      dailySelected: false,
      otherSelected: false,
      reports: {
        items: {
          totalBalanceBankType: [],
        },
        startingDate: "",
        endingDate: "",
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
  async created() {
    this.year = new Date().getFullYear();
    this.reportType = "allTime";
    await this.fetchPayments();

    try {
      const response = await this.$apiGet("api/v1/payments/orgBalance");
      console.log("response org balance", response);
      this.totalBalance = response.items;
      this.totalOrgBalance = response.items.organizationBalance;
    } catch (error) {
      console.error("Error fetching org data:", error.status, error.message);
    }
  },
  methods: {
    navigateToPayments(status) {
      this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: 1,
          status: status,
        },
      });
    },

    exportPaymentsToExcel(category, status) {
      console.log("payments");
      const data = this.reports.items.categorizedPayments[
        category
      ].payments.map((item) => ({
        "Full Name": item.fullName,
        "User Code": item.userCode,
        Billcode: item.billCode,
        Year: item.activeYear,
        Month: item.activeMonth,
        Regular: item.regular.amount,
        Subsidy: item.subsidy.amount,
        Urgent: item.urgent.amount,
        "Total Block":
          item.regular.amount + item.subsidy.amount + item.urgent.amount,
        "Reg Fee": item.registrationFee,
        "Monthly Service": item.service.amount,
        Penality: item.penality.amount,
        "Total Service":
          item.service.amount + item.penality.amount + item.registrationFee,
        Status: status,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Items");
      XLSX.writeFile(workbook, "items.xlsx");
    },

    seeAllPaid() {
      this.navigateToPayments("confirmed");
    },
    seeAllOverdue() {
      this.navigateToPayments("overdue");
    },
    exportConfirmedToExcel() {
      this.exportPaymentsToExcel("confirmed", "Paid");
    },
    exportPendingToExcel() {
      this.exportPaymentsToExcel("pending", "Unpaid");
    },
    exportOverdueToExcel() {
      this.exportPaymentsToExcel("overdue", "Overdue/Unpaid");
    },

    changeReportType() {
      
      //alert("j")
      // const reportTypes = ["annually", "semiAnnually", "monthly", "weekly", "daily"];
      this.selectReportType = false;

      // reportTypes.forEach(type => {
      //   console.log(type);
      //   this[`${type}Selected`] = this.reportType === type;
      // });

      this.annuallySelected = false;
      

      if (this.reportType === "allTime") {
        this.otherSelected = false;
        this.annuallySelected = false;
        this.fetchPayments();
      }

      if (this.reportType === "annually") {
        this.otherSelected = false;
        this.annuallySelected = true;

        this.year = new Date().getFullYear();
        this.fetchPayments();
      }
      if (this.reportType === "semiAnnually") {
        //alert("semi")
        this.annuallySelected = true;

        this.year = new Date().getFullYear();
        this.semiAnnuallySelected = true;
        this.otherSelected = false;
      }
      if (this.reportType === "monthly") {
        this.annuallySelected = true;

        // alert("monthly")
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth() + 1;
        this.monthlySelected = true;
        this.semiAnnuallySelected = false;
        this.otherSelected = false;
      }
      if (this.reportType === "weekly") {
        this.annuallySelected = true;

        this.year = new Date().getFullYear();
        this.month = new Date().getMonth() + 1;
        // this.week=this.getWeekNumber(new Date());

        //alert("weekly")
        this.semiAnnuallySelected = false;
        this.monthlySelected = true;
        this.otherSelected = false;
      }
      if (this.reportType === "daily") {
        this.annuallySelected = true;

        this.year = new Date().getFullYear();
        this.month = new Date().getMonth() + 1;
        this.day = new Date().getDate();
        this.semiAnnuallySelected = false;
        this.monthlySelected = true;
        this.otherSelected = false;
      }
      if (this.reportType === "other") {
        //alert("other")
       this.reportLength=0;
        this.otherSelected = true;
        this.monthlySelected = false;
        this.semiAnnuallySelected = false;
        this.annuallySelected = false;
        this.weeklySelected = false;
        this.dailySelected = false;
      }

      console.log("Selected report type:", this.reportType);

      this.fetchPayments();
    },

    async fetchPayments() {
    // alert("hhh")
      console.log("called");

      const params = { timeRange: this.reportType, year: this.year };

      // Set the selected flags based on the hierarchical nature of this.reportType
      //this.annuallySelected = true; // Always true
      if(this.reportType ==="allTime"){
        
        params.timeRange=this.reportType;
        params.year='';
      }

      this.semiAnnuallySelected = this.reportType === "semiAnnually";
      this.monthlySelected = ["monthly", "weekly", "daily"].includes(
        this.reportType
      );

      // this.weeklySelected = this.reportType === "weekly";
      this.dailySelected = this.reportType === "daily";
      // Add additional parameters dynamically based on the report type
      if (this.reportType === "semiAnnually" && this.semiYear) {
        params.semiYear = this.semiYear;
      }
      if (
        ["monthly", "weekly", "daily"].includes(this.reportType) &&
        this.month
      ) {
        params.month = this.month;
      }
      if (this.reportType === "daily" && this.day) {
        params.day = this.day;
      }
      if (this.reportType === "other") {
        params.endingDate = this.endingDate;
        params.startingDate = this.startingDate;
      }
      // Validation logic
      const isValid =
         (this.reportType==='allTime')|| this.year &&
        (this.reportType === "annually" ||
          (this.reportType === "semiAnnually" && this.semiYear) ||
          (this.reportType === "monthly" && this.month) ||
          (this.reportType === "weekly" && this.month && this.week) ||
          (this.reportType === "daily" && this.month && this.day))||
          (this.reportType === "other" && this.startingDate && this.endingDate)

      // Fetch data if valid
      if (isValid) {
        //alert("valid")
        await this.fetchData(params);
      } else {
        //alert("notvalid")
      }
    },

    async fetchData(params) {

      console.log("params",params);


      //alert("ooo")
      try {
        const response = await this.$apiGet("/api/v1/payments/reports", params);
        console.log("Response for report:checkwethisek", response);
        this.reports = response || {
          items: {
            totalBalanceBankType: [],
          },
        };
        this.reportLength = 1;
        console.log("report is ", this.reports);
        // this.updateReportLengths(response);
      } catch (error) {
        //alert("error")
        this.reportLength = 0;
        this.reports = {
          items: {
            totalBalanceBankType: [], // Empty data when there is an error
          },
        };

        console.log("reports in error: ", this.reports);

        console.log("this.reportLength", this.reportLength);

        console.error("Error fetching datakkk:", error.status, error.message);

        //this.resetReportLengths();
      } finally {
      }
    },

    updateReportLengths(response) {
      this.reportLength =
        response.items.categorizedPayments.confirmed.uniqueUsers;
      this.confirmedLength =
        response.items.categorizedPayments.confirmed.uniqueUsers;
      this.pendingLength =
        response.items.categorizedPayments.pending.uniqueUsers;
      this.overdueLength =
        response.items.categorizedPayments.overdue.uniqueUsers;
    },

    resetReportLengths() {
      this.reportLength = 0;
      this.confirmedLength = 0;
      this.pendingLength = 0;
      this.overdueLength = 0;
    },

    setReportParamsForCurrentPeriod(reportType) {
      //alert("hjj")
      
      this.year = "";
      this.semiYear = "";
      this.month = "";
      this.week = "";
      this.day = "";

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
      const currentDay = new Date().getDate();
      const currentWeek = this.getWeekNumber(new Date()); // Assuming this.getWeekNumber() is defined

      let params = { timeRange: reportType, year: currentYear };
      
      
      // let selectedFlags = {
      //   annuallySelected: false,
      //   semiAnnuallySelected: false,
      //   monthlySelected: false,
      //   weeklySelected: false,
      //   dailySelected: false,
      // };

      // Handle reportType and set the corresponding parameters and flags


      switch (reportType) {

        case "annually":
          this.year = currentYear;
          params = { timeRange: "annually", year: currentYear };
         // selectedFlags.annuallySelected = true;
          break;
        case "semiAnnually":
          this.year = currentYear;
          // Assuming getCurrentHalf() is defined
          const currentSemiYear = this.getCurrentHalf(); // Assuming getCurrentHalf() is defined
          this.semiYear = currentSemiYear;
          params = {
            timeRange: "semiAnnually",
            year: currentYear,
            semiYear: currentSemiYear,
          };
         // selectedFlags.annuallySelected = true;
         // selectedFlags.semiAnnuallySelected = true;
          break;
        case "monthly":
          this.year = currentYear;
          this.month = currentMonth; // Months are 1-indexed
          params = {
            timeRange: "monthly",
            year: currentYear,
            month: currentMonth,
          };
         // selectedFlags.annuallySelected = true;
         // selectedFlags.monthlySelected = true;
          break;
        case "weekly":
          this.year = currentYear;
          this.month = currentMonth;
          this.week = currentWeek;

          params = {
            timeRange: "weekly",
            year: currentYear,
            month: currentMonth,
          };
         // selectedFlags.annuallySelected = true;
         /// selectedFlags.monthlySelected = true;
          break;
        case "daily":
          this.year = currentYear;
          this.month = currentMonth;
          this.day = currentDay;

          params = {
            timeRange: "daily",
            year: currentYear,
            month: currentMonth,
            day: currentDay,
          };
         // selectedFlags.annuallySelected = true;
         // selectedFlags.monthlySelected = true;
         // selectedFlags.dailySelected = true;
          break;
        default:
          return; // If reportType doesn't match any case, return early
      }

      // Set the selected flags based on the current reportType
      // this.annuallySelected = selectedFlags.annuallySelected;
      // this.semiAnnuallySelected = selectedFlags.semiAnnuallySelected;
      // this.monthlySelected = selectedFlags.monthlySelected;
      // this.weeklySelected = selectedFlags.weeklySelected;
      // this.dailySelected = selectedFlags.dailySelected;

      // Call fetchData with the constructed params
      this.fetchData(params);


    },

    getWeekNumber(date) {
      const currentDate = new Date(date);
      const startDate = new Date(currentDate.getFullYear(), 0, 1);
      const dayOfYear = Math.floor(
        (currentDate - startDate) / (24 * 60 * 60 * 1000)
      );
      const weekDay = (currentDate.getDay() + 6) % 7;
      return "week" + Math.ceil((dayOfYear + 7 - weekDay) / 7);
    },

    goToGruopPayment() {
      const paymentType = this.paymentType;
      const reportType = this.reportType;

      const year = this.year;
      const semiYear = this.semiYear;
      const month = this.month;
      const week = this.week;
      const day = this.day;

      this.$router.push({
        name: "group-payments",
        query: {
          paymentType,
          reportType,
          year,
          semiYear,
          month,
          week,
          day,
        },
      });
    },

    getCurrentHalf() {
      const month = new Date().getMonth();
      return month < 6 ? "1st" : "2nd";
    },

    async generateQRCodeImage() {
      const qrData = `
       Company:${'Bana General Report'},
       Report Type: ${this.reportType},
       reported Date:${new Date().toDateString()}
      `;
      try {
        const qrCodeImage = await QRCode.toDataURL(qrData, {
          errorCorrectionLevel: "H",
        });

        document.getElementById(
          "qrCodeImageContainer"
        ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    },

    async printDiv() {
      await this.generateQRCodeImage();

      const printContent = document.getElementById("printable-area").innerHTML;
      const linkElement = document.createElement("link");
      linkElement.href = "/src/assets/css/tailwind.css";
      linkElement.rel = "stylesheet";

      const printWindow = window.open(
        "",
        "",
        `height=${window.innerHeight},width=${window.innerWidth}`
      );
      printWindow.document.open();

      printWindow.document.write(`
      <html>
        <head>
          <title>Payment Report</title>
          ${linkElement.outerHTML}
          <style>
            body { border: 1px dotted #622e2e; font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; }
            .report-table { margin-top: 40px; background-color: #ffffff; border: 1px solid #cccccc; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
            .report-table h2 { text-align: center; font-size: 24px; color: #4b0082; margin-bottom: 10px; }
            .report-table p { text-align: center; font-size: 14px; color: #666666; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #cccccc; padding: 8px 12px; text-align: left; }
            th { background-color: #f9f9f9; color: #333333; font-weight: bold; }
            .highlight { background-color: #f0f0f0; font-weight: bold; }
            .footer-info { display: flex; justify-content: space-between; margin-top: 20px; }
            .footer-info div { font-size: 14px; }
            .qr-code-container { text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div id="printable-area">${printContent}</div>
        </body>
      </html>
    `);
      printWindow.document.close();

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