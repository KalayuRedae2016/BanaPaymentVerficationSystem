<template>
  <div class="border border border-gray-400 mt-5">
    <div class="flex flex-col p-4 text-xs">
      <div class="flex flex-row border-b pb-5 border-blue-500">
        <label class="custom-label"> Report Type: </label>
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
      <div class="flex flex-col">
        <div
          class="mt-5 w-full flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0"
        >
          <div>
            <select
              v-model="year"
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
              v-if="semiAnaualSelected"
              @change="fetchPayments()"
              class="custom-select"
            >
              <option value="" disabled>Selecct Semi Annual</option>
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
        <div class="flex flex-row mt-5 space-x-3 w-2/3">
          <div class="flex flex-col space-y-3">
            <button
              @click="thisYear()"
              class="h-12 lg:h-8 flex items-center bg-blue-100 text-black rounded-md px-4 py-2 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              <i
                class="fas fa-calendar-alt text-sm lowercase mr-2 text-blue-500 text-blue-500"
              ></i>
              <span>This Year</span>
            </button>
            <button
              @click="thisSemi()"
              class="h-12 lg:h-8 flex items-center bg-blue-100 text-black rounded-md px-4 py-2 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              <i
                class="fas fa-calendar-minus text-sm lowercase mr-2 text-blue-500"
              ></i>
              <span>This Semi</span>
            </button>
          </div>
          <div class="flex flex-col space-y-3">
            <button
              @click="thisMonth()"
              class="h-12 lg:h-8 flex items-center bg-blue-100 text-black rounded-md px-4 py-2 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              <i
                class="fas fa-calendar-week text-sm lowercase mr-2 text-blue-500"
              ></i>
              <span>This Mon</span>
            </button>

            <button
              @click="thisWeek()"
              class="h-12 lg:h-8 flex items-center bg-blue-100 text-black rounded-md px-4 py-2 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              <i
                class="fas fa-calendar-check text-sm lowercase mr-2 text-blue-500"
              ></i>
              <span>This Week</span>
            </button>
          </div>
          <div class="flex flex-col space-y-3">
            <button
              @click="thisDay()"
              class="h-12 lg:h-8 flex items-center bg-blue-100 text-black rounded-md px-4 py-2 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              <i
                class="fas fa-calendar-day text-sm lowercase mr-2 text-blue-500"
              ></i>
              <span>This Day</span>
            </button>
          </div>
        </div>
      </div>
      <!-- //select true or falses -->

      <div>
        <div class="flex flex-row">
          <p
            class="mx-5 my-5 text-gray-800 font-bold flex items-center space-x-4"
          >
            <span
              >All Paid Capital Report(
              <span class="text-blue-500">Fully/Partially Paid</span>)
              <span class="text-blue-500">{{ value }}</span></span
            >
            <!-- <button @click="seeAllPaid()" class="cursor-pointer bg-blue-100 px-4 py-1 rounded-lg text-green-800" >See Detail</button > -->
            <!-- <button
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 text-sm rounded flex items-center space-x-1"
              @click="exportConfirmedToExcel()"
            >
              <i class="fas fa-download"></i>
              <span class="text-xs">Excel</span>
            </button> -->

            <button
              @click="printDiv()"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 text-sm rounded flex items-center space-x-1"
            >
              <i class="fas fa-print"></i>
            </button>
          </p>
        </div>
        <div class="overflow-x-auto rounded-lg">
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
            <tbody
              class="bg-white divide-y divide-gray-300"
              v-if="
                confirmedLength > 0 || pendingLength > 0 || overdueLength > 0
              "
            >
              <tr
                v-for="(bank, index) in reports.items.categorizedPayments
                  .confirmed.bankTypes"
                :key="index"
              >
                <td class="border border-gray-300 px-4 py-2">
                  {{ index }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.pending.bankTypes[index]
                        ?.bankType &&
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.overdue.bankTypes[index]
                        ?.bankType
                      ? (reports.items.categorizedPayments.confirmed.bankTypes[
                          index
                        ]?.regularBalance || 0) +
                        (reports.items.categorizedPayments.pending.bankTypes[
                          index
                        ]?.regularBalance || 0) +
                        (reports.items.categorizedPayments.overdue.bankTypes[
                          index
                        ]?.regularBalance || 0)
                      : 0
                  }}
                </td>

                <td class="border border-gray-300 px-4 py-2">
                  {{
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.pending.bankTypes[index]
                        ?.bankType &&
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.overdue.bankTypes[index]
                        ?.bankType
                      ? (reports.items.categorizedPayments.confirmed.bankTypes[
                          index
                        ]?.subsidyBalance || 0) +
                        (reports.items.categorizedPayments.pending.bankTypes[
                          index
                        ]?.subsidyBalance || 0) +
                        (reports.items.categorizedPayments.overdue.bankTypes[
                          index
                        ]?.subsidyBalance || 0)
                      : 0
                  }}
                </td>

                <td class="border border-gray-300 px-4 py-2">
                  {{
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.pending.bankTypes[index]
                        ?.bankType &&
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.overdue.bankTypes[index]
                        ?.bankType
                      ? (reports.items.categorizedPayments.confirmed.bankTypes[
                          index
                        ]?.urgentBalance || 0) +
                        (reports.items.categorizedPayments.pending.bankTypes[
                          index
                        ]?.urgentBalance || 0) +
                        (reports.items.categorizedPayments.overdue.bankTypes[
                          index
                        ]?.urgentBalance || 0)
                      : 0
                  }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.pending.bankTypes[index]
                        ?.bankType &&
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.overdue.bankTypes[index]
                        ?.bankType
                      ? (reports.items.categorizedPayments.confirmed.bankTypes[
                          index
                        ]?.totalBlockBalance || 0) +
                        (reports.items.categorizedPayments.pending.bankTypes[
                          index
                        ]?.totalBlockBalance || 0) +
                        (reports.items.categorizedPayments.overdue.bankTypes[
                          index
                        ]?.totalBlockBalance || 0)
                      : 0
                  }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.pending.bankTypes[index]
                        ?.bankType &&
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.overdue.bankTypes[index]
                        ?.bankType
                      ? (reports.items.categorizedPayments.confirmed.bankTypes[
                          index
                        ]?.penalityBalance || 0) +
                        (reports.items.categorizedPayments.pending.bankTypes[
                          index
                        ]?.penalityBalance || 0) +
                        (reports.items.categorizedPayments.overdue.bankTypes[
                          index
                        ]?.penalityBalance || 0)
                      : 0
                  }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.pending.bankTypes[index]
                        ?.bankType &&
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.overdue.bankTypes[index]
                        ?.bankType
                      ? (reports.items.categorizedPayments.confirmed.bankTypes[
                          index
                        ]?.serviceBalance || 0) +
                        (reports.items.categorizedPayments.pending.bankTypes[
                          index
                        ]?.serviceBalance || 0) +
                        (reports.items.categorizedPayments.overdue.bankTypes[
                          index
                        ]?.serviceBalance || 0)
                      : 0
                  }}
                </td>

                <td class="border border-gray-300 px-4 py-2">
                  {{
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.pending.bankTypes[index]
                        ?.bankType &&
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.overdue.bankTypes[index]
                        ?.bankType
                      ? (reports.items.categorizedPayments.confirmed.bankTypes[
                          index
                        ]?.totalServiceBalance || 0) +
                        (reports.items.categorizedPayments.pending.bankTypes[
                          index
                        ]?.totalServiceBalance || 0) +
                        (reports.items.categorizedPayments.overdue.bankTypes[
                          index
                        ]?.totalServiceBalance || 0)
                      : 0
                  }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.pending.bankTypes[index]
                        ?.bankType &&
                    reports.items.categorizedPayments.confirmed.bankTypes[index]
                      ?.bankType ===
                      reports.items.categorizedPayments.overdue.bankTypes[index]
                        ?.bankType
                      ? (reports.items.categorizedPayments.confirmed.bankTypes[
                          index
                        ]?.totalServiceBalance || 0) +
                        (reports.items.categorizedPayments.pending.bankTypes[
                          index
                        ]?.totalServiceBalance || 0) +
                        (reports.items.categorizedPayments.overdue.bankTypes[
                          index
                        ]?.totalServiceBalance || 0) +
                        (reports.items.categorizedPayments.confirmed.bankTypes[
                          index
                        ]?.totalBlockBalance || 0) +
                        (reports.items.categorizedPayments.pending.bankTypes[
                          index
                        ]?.totalBlockBalance || 0) +
                        (reports.items.categorizedPayments.overdue.bankTypes[
                          index
                        ]?.totalBlockBalance || 0)
                      : 0
                  }}
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
        </div>

        <div class="flex flex-row">
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
        </div>
        <p v-if="reportLength == 0">No report with the select time line</p>
      </div>
      <div></div>
    </div>

    <div class="report-table hidden" id="printable-area">
      <!-- <div style="border-radius: 5px; font-size: 15px; font-weight: bold; text-align: center; margin: 10px 0; color:white; background-color:#9494b8; padding-top:3px; padding-bottom:5px; display: flex; align-items: center;">
    <img src="../../../../assets/img/banamall2.png" alt="" style="width: 25px; height: 25px; margin-right: 10px;margin-left:10px;">
   <h1 style="margin: 0;">Bana Mall Report </h1>
 </div>  -->

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
          color: blue;
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
          color: blue;
          font-size: 10px;
        "
      >
        Date(Day-Month-Year): {{ this.year }}
        <p v-if="month">-{{ this.month }}</p>
        <!-- <span
                >{{ new endDate.getDate() }}-{{
                  changeMonthIntoString(receiptDate.getMonth() + 1)
                }}-{{ receiptDate.getFullYear() }}</span
              > -->
      </div>
      <div
        style="
          display: flex;
          justify-content: flex-end;
          color: blue;
          font-size: 10px;
        "
      >
        <div>Reported Date:{{ new Date().toLocaleDateString() }}</div>
      </div>

      <h2
        class="section-title"
        style="color: #622e2e; font-weight: bold; margin-bottom: 15px"
      >
        Total Balance(Paid In The Gven Time Interval)
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
            <th>M. Service</th>
            <th>Total Service</th>
          </tr>
        </thead>
        <tbody
          style="background-color: white; font-size: 12px"
          v-if="confirmedLength > 0 || pendingLength > 0 || overdueLength > 0"
        >
          <tr
            v-for="(bank, index) in reports.items.categorizedPayments.confirmed
              .bankTypes"
            :key="index"
          >
            <td class="border border-gray-300 px-4 py-2">
              {{ index }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.pending.bankTypes[index]
                    ?.bankType &&
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.overdue.bankTypes[index]
                    ?.bankType
                  ? (reports.items.categorizedPayments.confirmed.bankTypes[
                      index
                    ]?.regularBalance || 0) +
                    (reports.items.categorizedPayments.pending.bankTypes[index]
                      ?.regularBalance || 0) +
                    (reports.items.categorizedPayments.overdue.bankTypes[index]
                      ?.regularBalance || 0)
                  : 0
              }}
            </td>

            <td class="border border-gray-300 px-4 py-2">
              {{
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.pending.bankTypes[index]
                    ?.bankType &&
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.overdue.bankTypes[index]
                    ?.bankType
                  ? (reports.items.categorizedPayments.confirmed.bankTypes[
                      index
                    ]?.subsidyBalance || 0) +
                    (reports.items.categorizedPayments.pending.bankTypes[index]
                      ?.subsidyBalance || 0) +
                    (reports.items.categorizedPayments.overdue.bankTypes[index]
                      ?.subsidyBalance || 0)
                  : 0
              }}
            </td>

            <td class="border border-gray-300 px-4 py-2">
              {{
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.pending.bankTypes[index]
                    ?.bankType &&
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.overdue.bankTypes[index]
                    ?.bankType
                  ? (reports.items.categorizedPayments.confirmed.bankTypes[
                      index
                    ]?.urgentBalance || 0) +
                    (reports.items.categorizedPayments.pending.bankTypes[index]
                      ?.urgentBalance || 0) +
                    (reports.items.categorizedPayments.overdue.bankTypes[index]
                      ?.urgentBalance || 0)
                  : 0
              }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.pending.bankTypes[index]
                    ?.bankType &&
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.overdue.bankTypes[index]
                    ?.bankType
                  ? (reports.items.categorizedPayments.confirmed.bankTypes[
                      index
                    ]?.totalBlockBalance || 0) +
                    (reports.items.categorizedPayments.pending.bankTypes[index]
                      ?.totalBlockBalance || 0) +
                    (reports.items.categorizedPayments.overdue.bankTypes[index]
                      ?.totalBlockBalance || 0)
                  : 0
              }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.pending.bankTypes[index]
                    ?.bankType &&
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.overdue.bankTypes[index]
                    ?.bankType
                  ? (reports.items.categorizedPayments.confirmed.bankTypes[
                      index
                    ]?.penalityBalance || 0) +
                    (reports.items.categorizedPayments.pending.bankTypes[index]
                      ?.penalityBalance || 0) +
                    (reports.items.categorizedPayments.overdue.bankTypes[index]
                      ?.penalityBalance || 0)
                  : 0
              }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.pending.bankTypes[index]
                    ?.bankType &&
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.overdue.bankTypes[index]
                    ?.bankType
                  ? (reports.items.categorizedPayments.confirmed.bankTypes[
                      index
                    ]?.serviceBalance || 0) +
                    (reports.items.categorizedPayments.pending.bankTypes[index]
                      ?.serviceBalance || 0) +
                    (reports.items.categorizedPayments.overdue.bankTypes[index]
                      ?.serviceBalance || 0)
                  : 0
              }}
            </td>

            <td class="border border-gray-300 px-4 py-2">
              {{
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.pending.bankTypes[index]
                    ?.bankType &&
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.overdue.bankTypes[index]
                    ?.bankType
                  ? (reports.items.categorizedPayments.confirmed.bankTypes[
                      index
                    ]?.totalServiceBalance || 0) +
                    (reports.items.categorizedPayments.pending.bankTypes[index]
                      ?.totalServiceBalance || 0) +
                    (reports.items.categorizedPayments.overdue.bankTypes[index]
                      ?.totalServiceBalance || 0)
                  : 0
              }}
            </td>
            <td class="border border-gray-300 px-4 py-2">
              {{
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.pending.bankTypes[index]
                    ?.bankType &&
                reports.items.categorizedPayments.confirmed.bankTypes[index]
                  ?.bankType ===
                  reports.items.categorizedPayments.overdue.bankTypes[index]
                    ?.bankType
                  ? (reports.items.categorizedPayments.confirmed.bankTypes[
                      index
                    ]?.totalServiceBalance || 0) +
                    (reports.items.categorizedPayments.pending.bankTypes[index]
                      ?.totalServiceBalance || 0) +
                    (reports.items.categorizedPayments.overdue.bankTypes[index]
                      ?.totalServiceBalance || 0) +
                    (reports.items.categorizedPayments.confirmed.bankTypes[
                      index
                    ]?.totalBlockBalance || 0) +
                    (reports.items.categorizedPayments.pending.bankTypes[index]
                      ?.totalBlockBalance || 0) +
                    (reports.items.categorizedPayments.overdue.bankTypes[index]
                      ?.totalBlockBalance || 0)
                  : 0
              }}
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
          Total Overdue(Monthly Deadline Passed and Still Unpaid):{{
            reports.items.categorizedPayments.overdue.uniqueUsers
          }}
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
      <div style="position: relative; width: 100%; height: 150px">
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

      <!-- <div style="margin-top:100px;display: flex; align-items: center; justify-content: center; width: 100%;; height: 100px;">
 
    <div id="qrCodeImageContainer" style="background-color: lightgray; padding: 10px; margin-right: 20px; height:200px;width:200px;">
        QR Code
    </div>
    

    <div style="width: 200px; height: 200px; background-color: white;">
       
    </div>
</div> -->
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
  async mounted() {
    this.setReportParameters("annually", new Date().getFullYear()); // Set report type and year
    await this.fetchPayments(); // Fetch payments
    try {
        const response = await this.$apiGet("api/v1/payments/orgBalance");
        console.log("response org balance", response);
        this.totalBalance = response.items;
        this.totalOrgBalance = response.items.organizationBalance;
    } catch (error) {
        console.error(
            "Error fetching org data:",
            error.status,
            error.message
        );
    }
},
  methods: {
  navigateToPayments(status) {
    this.$router.push({
      path: "/admindashboard/payments1",
      query: {
        activeTab: 2,
        status: status,
      },
    });
  },

  exportPaymentsToExcel(category, status) {
    console.log("payments");
    const data = this.reports.items.categorizedPayments[category].payments.map(item => ({
      "Full Name": item.fullName,
      "User Code": item.userCode,
      Billcode: item.billCode,
      Year: item.activeYear,
      Month: item.activeMonth,
      Regular: item.regular.amount,
      Subsidy: item.subsidy.amount,
      Urgent: item.urgent.amount,
      "Total Block": item.regular.amount + item.subsidy.amount + item.urgent.amount,
      "Reg Fee": item.registrationFee,
      "Monthly Service": item.service.amount,
      Penality: item.penality.amount,
      "Total Service": item.service.amount + item.penality.amount + item.registrationFee,
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
    const reportTypes = ["annually", "semiAnnually", "monthly", "weekly", "daily"];
    this.selectReportType = false;

    reportTypes.forEach(type => {
      this[`${type}Selected`] = this.reportType === type;
    });
    
    console.log("Selected report type:", this.reportType);
  },

  async fetchPayments() {
    const reportTypeActions = {
      annually: this.fetchYearlyPayments,
      semiAnnually: this.fetchSemiYearlyPayments,
      monthly: this.fetchMonthlyPayments,
      weekly: this.fetchWeeklyPayments,
      daily: this.fetchDailyPayments,
    };
    const action = reportTypeActions[this.reportType];
    if (action) {
      await action.call(this);
    }
  },

  async fetchData(params) {
    try {
      const response = await this.$apiGet('/api/v1/payments/reports', params);
      console.log("Response:", response);
      this.reports = response;
      this.updateReportLengths(response);
    } catch (error) {
      console.error("Error fetching data:", error);
      this.resetReportLengths();
    }
  },

  updateReportLengths(response) {
    this.reportLength = response.items.categorizedPayments.confirmed.uniqueUsers;
    this.confirmedLength = response.items.categorizedPayments.confirmed.uniqueUsers;
    this.pendingLength = response.items.categorizedPayments.pending.uniqueUsers;
    this.overdueLength = response.items.categorizedPayments.overdue.uniqueUsers;
  },

  resetReportLengths() {
    this.reportLength = 0;
    this.confirmedLength = 0;
    this.pendingLength = 0;
    this.overdueLength = 0;
  },

  async fetchYearlyPayments() {
    const params = { timeRange: this.reportType, year: this.year };
    if (this.reportType) await this.fetchData(params);
  },

  async fetchSemiYearlyPayments() {
    const params = { timeRange: this.reportType, year: this.year, semiYear: this.semiYear };
    if (this.year && this.semiYear) await this.fetchData(params);
  },

  async fetchMonthlyPayments() {
    const params = { timeRange: this.reportType, year: this.year, month: this.month };
    if (this.year && this.month) await this.fetchData(params);
  },

  async fetchWeeklyPayments() {
    const params = { timeRange: this.reportType, year: this.year, month: this.month, week: this.week };
    if (this.year && this.month && this.week) await this.fetchData(params);
  },

  async fetchDailyPayments() {
    const params = { timeRange: this.reportType, year: this.year, month: this.month, day: this.day };
    if (this.year && this.month && this.day) await this.fetchData(params);
  },

  setReportParameters(reportType, year, month = "", week = "", day = "") {
    this.reportType = reportType;
    this.year = year;
    this.month = month;
    this.week = week;
    this.day = day;

    // Reset other selections
    this.semiAnaualSelected = false;
    this.monthlySelected = false;
    this.weeklySelected = false;
    this.dailySelected = false;

    // Call fetchPayments to update the data
    this.fetchPayments();
  },

  thisYear() {
    const currentYear = new Date().getFullYear();
    this.setReportParameters("annually", currentYear);
  },

  thisMonth() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
    this.setReportParameters("monthly", currentYear, currentMonth);
    this.monthlySelected = true;
  },

  thisWeek() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentWeek = this.getWeekNumber(new Date());

    this.setReportParameters("weekly", currentYear, currentMonth, currentWeek);
    this.weeklySelected = true;
  },

  thisDay() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    this.setReportParameters("daily", currentYear, currentMonth, "", currentDay);
    this.dailySelected = true;
  },

  getWeekNumber(date) {
    const currentDate = new Date(date);
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const dayOfYear = Math.floor(
      (currentDate - startDate) / (24 * 60 * 60 * 1000)
    );
    const weekDay = (currentDate.getDay() + 6) % 7;
    return Math.ceil((dayOfYear + 7 - weekDay) / 7);
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
    const qrData = `User ID: ${this.userId}, User Name: ${this.userName}`;

    try {
      const qrCodeImage = await QRCode.toDataURL(qrData, {
        errorCorrectionLevel: "H",
      });

      document.getElementById("qrCodeImageContainer").innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
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

    const printWindow = window.open("", "", `height=${window.innerHeight},width=${window.innerWidth}`);
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
}
//   methods: {

//   async fetchData(params) {
//     try {
//       const response = await this.$apiGet('/api/v1/payments/reports', params);
//       console.log("Response:", response);
//       this.reports = response;
//       this.updateReportLengths(response);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       this.resetReportLengths();
//     }
//   },

//   updateReportLengths(response) {
//     this.reportLength = response.items.categorizedPayments.confirmed.uniqueUsers;
//     this.confirmedLength = response.items.categorizedPayments.confirmed.uniqueUsers;
//     this.pendingLength = response.items.categorizedPayments.pending.uniqueUsers;
//     this.overdueLength = response.items.categorizedPayments.overdue.uniqueUsers;
//   },

//   resetReportLengths() {
//     this.reportLength = 0;
//     this.confirmedLength = 0;
//     this.pendingLength = 0;
//     this.overdueLength = 0;
//   },


//   changeReportType() {
//     const reportTypes = ["annually", "semiAnnually", "monthly", "weekly", "daily"];
//     this.selectReportType = false;

//     reportTypes.forEach(type => {
//       this[`${type}Selected`] = this.reportType === type;
//     });
    
//     console.log("Selected report type:", this.reportType);
//   },

//   exportPaymentsToExcel(category, status) {
//     console.log("payments");
//     const data = this.reports.items.categorizedPayments[category].payments.map(item => ({
//       "Full Name": item.fullName,
//       "User Code": item.userCode,
//       Billcode: item.billCode,
//       Year: item.activeYear,
//       Month: item.activeMonth,
//       Regular: item.regular.amount,
//       Subsidy: item.subsidy.amount,
//       Urgent: item.urgent.amount,
//       "Total Block": item.regular.amount + item.subsidy.amount + item.urgent.amount,
//       "Reg Fee": item.registrationFee,
//       "Monthly Service": item.service.amount,
//       Penality: item.penality.amount,
//       "Total Service": item.service.amount + item.penality.amount + item.registrationFee,
//       Status: status,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Items");
//     XLSX.writeFile(workbook, "items.xlsx");
//   },




















//     seeAllPaid() {
//       this.$router.push({
//         path: "/admindashboard/payments1",
//         query: {
//           activeTab: 2,
//           status: "confirmed",
//         },
//       });
//     },
//     seeAllOverdue() {
//       this.$router.push({
//         path: "/admindashboard/payments1",
//         query: {
//           activeTab: 2,
//           status: "overdue",
//         },
//       });
//     },


//     exportConfirmedToExcel() {
//       // Prepare the data for the Excel file
//       console.log("payments");
//       const data =
//         this.reports.items.categorizedPayments.confirmed.payments.map(
//           (item) => ({
//             "Full Name": item.fullName,
//             "User Code": item.userCode,
//             Billcode: item.billCode,
//             Year: item.activeYear,
//             Month: item.activeMonth,
//             Regular: item.regular.amount,
//             Subsidy: item.subsidy.amount,
//             Urgent: item.urgent.amount,
//             "Total Block":
//               item.regular.amount + item.subsidy.amount + item.urgent.amount,
//             "Reg Fee": item.registrationFee,
//             "Monthly Service": item.service.amount,
//             Penality: item.penality.amount,
//             "Total Service":
//               item.service.amount + item.penality.amount + item.registrationFee,
//             Status: "Paid",
//           })
//         );
//       // Create a worksheet
//       const worksheet = XLSX.utils.json_to_sheet(data);

//       // Create a workbook
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Items");

//       // Write the workbook to a file and trigger download
//       XLSX.writeFile(workbook, "items.xlsx");
//     },
//     exportPendingToExcel() {
//       // Prepare the data for the Excel file
//       console.log("payments");
//       const data = this.reports.items.categorizedPayments.pending.payments.map(
//         (item) => ({
//           "Full Name": item.fullName,
//           "User Code": item.userCode,
//           Billcode: item.billCode,
//           Year: item.activeYear,
//           Month: item.activeMonth,
//           Regular: item.regular.amount,
//           Subsidy: item.subsidy.amount,
//           Urgent: item.urgent.amount,
//           "Total Block":
//             item.regular.amount + item.subsidy.amount + item.urgent.amount,
//           "Reg Fee": item.registrationFee,
//           "Monthly Service": item.service.amount,
//           Penality: item.penality.amount,
//           "Total Service":
//             item.service.amount + item.penality.amount + item.registrationFee,
//           Status: "Unpaid",
//         })
//       );
//       // Create a worksheet
//       const worksheet = XLSX.utils.json_to_sheet(data);

//       // Create a workbook
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Items");

//       // Write the workbook to a file and trigger download
//       XLSX.writeFile(workbook, "items.xlsx");
//     },
//     exportOverdueToExcel() {
//       // Prepare the data for the Excel file
//       console.log("payments");
//       const data = this.reports.items.categorizedPayments.overdue.payments.map(
//         (item) => ({
//           "Full Name": item.fullName,
//           "User Code": item.userCode,
//           Billcode: item.billCode,
//           Year: item.activeYear,
//           Month: item.activeMonth,
//           Regular: item.regular.amount,
//           Subsidy: item.subsidy.amount,
//           Urgent: item.urgent.amount,
//           "Total Block":
//             item.regular.amount + item.subsidy.amount + item.urgent.amount,
//           "Reg Fee": item.registrationFee,
//           "Monthly Service": item.service.amount,
//           Penality: item.penality.amount,
//           "Total Service":
//             item.service.amount + item.penality.amount + item.registrationFee,
//           Status: "Overdue/Unpaid",
//         })
//       );
//       // Create a worksheet
//       const worksheet = XLSX.utils.json_to_sheet(data);

//       // Create a workbook
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Items");

//       // Write the workbook to a file and trigger download
//       XLSX.writeFile(workbook, "items.xlsx");
//     },


//     changeReportType() {
//       this.selectReportType = false;
//       if (this.reportType == "annually") {
//         console.log("year", this.year);
//         this.annaualSelected = true;
//         this.semiAnaualSelected = false;
//         this.monthlySelected = false;
//         this.weeklySelected = false;
//         this.dailySelected = false;
//       }

//       if (this.reportType == "semiAnnually") {
//         console.log("year,semi", this.year, this.semiYear);
//         this.annaualSelected = true;
//         this.semiAnaualSelected = true;
//         this.monthlySelected = false;
//         this.weeklySelected = false;
//         this.dailySelected = false;
//       }
//       if (this.reportType == "monthly") {
//         console.log("year,month", this.year, this.month);
//         this.annaualSelected = true;
//         this.semiAnaualSelected = false;
//         this.monthlySelected = true;
//         this.weeklySelected = false;
//         this.dailySelected = false;
//       }
//       if (this.reportType == "weekly") {
//         console.log("year,month,week", this.year, this.month, this.week);
//         this.annaualSelected = true;
//         this.monthlySelected = true;
//         this.weeklySelected = true;
//         this.semiAnaualSelected = false;
//         this.dailySelected = false;
//       }

//       if (this.reportType == "daily") {
//         console.log("year,month,day", this.year, this.month, this.day);
//         this.annaualSelected = true;
//         this.monthlySelected = true;
//         this.dailySelected = true;
//         this.semiAnaualSelected = false;
//         this.weeklySelected = false;
//       }
//     },

//     async fetchPayments() {
//       if (this.reportType == "annually") {
//         //alert("annually")
//         await this.fetchYearlyPayments();
//       }

//       if (this.reportType == "semiAnnually") {
//         await this.fetchSemiYearlyPayments();
//       }

//       if (this.reportType == "monthly") {
//         if (this.year == "") {
//           this.selectYear = true;
//           return;
//         }
//         await this.fetchMonthlyPayments();
//       }
//       if (this.reportType == "weekly") {
//         if (this.year == "") {
//           this.selectYear = true;
//           return;
//         }
//         if (this.month == "") {
//           this.selectMonth = true;
//           this.selectYear = false;
//           return;
//         } else {
//           this.selectMonth = false;
//         }
//         await this.fetchWeeklyPayments();
//       }
//       if (this.reportType == "daily") {
//         if (this.year == "") {
//           this.selectYear = true;
//           return;
//         }
//         if (this.month == "") {
//           this.selectMonth = true;
//           this.selectYear = false;
//           return;
//         } else {
//           this.selectMonth = false;
//         }
//         await this.fetchDailyPayments();
//       }
//     },

//     async fetchYearlyPayments() {
//       // //alert("last yearly method")
//       this.selectSemiYear = false;
//       this.selectYear = false;
//       this.selectMonth = false;
//       (this.selectWeek = false), (this.selectDay = false);
//       this.selectReportType = false;
//       if (this.reportType == "") {
//         this.selectReportType = true;
//         return;
//       }
//       if (this.year == "") {
//         this.selectYear = true;
//         return;
//       }

//       if (this.reportType == "semiAnnually") {
//         this.fetchSemiYearlyPayments();
//         return;
//       }

//       if (this.reportType == "monthly") {
//         this.fetchMonthlyPayments();
//         return;
//       }
//       if (this.reportType == "weekly") {
//         this.fetchWeeklyPayments();
//         return;
//       }
//       if (this.reportType == "daily") {
//         this.fetchDailyPayments;
//         return;
//       }

//       //  //alert(this.year);
//  const params ={
//   timeRange:this.reportType,
//   year:this.year,
//  }
//       try {await this.$apiGet(
//           '/api/v1/payments/reports',params)
//         .then((response) => {
//           console.log("report type for year is for year", this.year, response);
//           console.log("yearly report is =", response);
//           this.reports = response;
//           this.reportLength =
//             response.items.categorizedPayments.confirmed.uniqueUsers;
//           this.confirmedLength =
//             response.items.categorizedPayments.confirmed.uniqueUsers;
//           this.pendingLength =
//             response.items.categorizedPayments.pending.uniqueUsers;
//           this.overdueLength =
//             response.items.categorizedPayments.overdue.uniqueUsers;
//         })
//       }catch(error){
//           this.reports = [];
//           ////alert("an error");
//           this.reportLength = 0;
//           this.confirmedLength = 0;
//           this.pendingCount = 0;
//           this.overdueLength = 0;
//           console.error("Error fetching yearly data in yearly:", error.status,error.message);
//         }finally{

//         };

//       ////alert("you have finished");
//     },
//     async fetchSemiYearlyPayments() {
//       this.selectSemiYear = false;
//       this.selectYear = false;
//       this.selectMonth = false;
//       (this.selectWeek = false), (this.selectDay = false);
//       this.selectReportType = false;

//       if (this.year == "") {
//         this.selectYear = true;
//         return;
//       }

//       if (this.semiYear == "") {
//         this.selectSemiYear = true;
//         return;
//       }

//       const params={
//         timeRange:this.reportType,
//         year:this.year,
//         semiYear:this.semiYear,
//       }
//       try {await this.$apiGet(
//           '/api/v1/payments/reports',params
//         )
//         .then((response) => {
//           console.log(
//             "report type for semiyearly is for for year,semiyear",
//             this.year,
//             this.semiYear,
//             response
//           );

//           this.reports = response;
//           this.reportLength =
//             response.items.categorizedPayments.confirmed.uniqueUsers;
//           this.confirmedLength =
//             response.items.categorizedPayments.confirmed.uniqueUsers;
//           this.pendingLength =
//             response.items.categorizedPayments.pending.uniqueUsers;
//           this.overdueLength =
//             response.items.categorizedPayments.overdue.uniqueUsers;
//         })
//        }catch(error) {
//           this.reportLength = 0;
//           this.confirmedLength = 0;
//           this.pendingCount = 0;
//           this.overdueLength = 0;
//           console.error(
//             "Error fetching client data for semi year in year,semiyeae:",
//             this.year,
//             this.semiYear,
//             error.status,error.message
//           );
//         }finally{

//         };
//     },
//    async  fetchMonthlyPayments() {
//       this.selectSemiYear = false;
//       this.selectYear = false;
//       this.selectMonth = false;
//       (this.selectWeek = false), (this.selectDay = false);
//       this.selectReportType = false;

//       if (this.year == "") {
//         this.selectYear = true;
//         return;
//       }

//       if (this.month == "") {
//         this.selectMonth = true;
//         return;
//       }
//       if (this.reportType == "weekly") {
//         this.fetchWeeklyPayments();
//         return;
//       }
//       if (this.reportType == "daily") {
//         this.fetchDailyPayments();
//         return;
//       }

//       const params={
//         timeRange: this.reportType,
//         year:this.year,
//         month:this.month,
//       } 
//       try {
//          await this.$apiGet(
//           '/api/v1/payments/reports',params).then((response) => {
//           console.log(
//             "report type for monthly is for year,month",
//             this.year,
//             this.month,
//             response
//           );

//           this.reports = response;
//           this.reportLength =
//             response.items.categorizedPayments.confirmed.uniqueUsers;
//           this.confirmedLength =
//             response.items.categorizedPayments.confirmed.uniqueUsers;
//           this.pendingLength =
//             response.items.categorizedPayments.pending.uniqueUsers;
//           this.overdueLength =
//             response.items.categorizedPayments.overdue.uniqueUsers;
//         })
//       }catch(error){
//           this.reportLength = 0;
//           this.confirmedLength = 0;
//           this.pendingCount = 0;
//           this.overdueLength = 0;
//           console.error(
//             "Error fetching client data monthly year,month",
//             this.year,
//             this.month,
//             error.status,error.message
//           );
//         }finally{
//         };
//     },

//     async fetchWeeklyPayments() {
//       this.selectYear = false;
//       this.selectMonth = false;
//       this.selectSemiYear = false;
//       this.selectWeek = false;
//       this.selectDay = false;
//       this.selectReportType = false;
//       if (this.year == "") {
//         this.selectYear = true;
//         return;
//       }
//       if (this.month == "") {
//         this.selectMonth = true;
//         return;
//       }
//       if (this.week == "") {
//         this.selectWeek = true;
//         return;
//       }
//       const params={
//         timeRange:this.reportType,
//         year:this.year,
//         month:this.month,
//         week:this.week
//       }
//       try {
        
//         await this.$apiGet(
//           '/api/v1/payments/reports',params
//         )
//         .then((response) => {
//           console.log(
//             "report type for weekly is for year,month,week",
//             this.year,
//             this.month,
//             this.week,
//             response
//           );

//           this.reports = response;
//           this.reportLength =
//             response.items.categorizedPayments.confirmed.uniqueUsers;
//           this.confirmedLength =
//             response.items.categorizedPayments.confirmed.uniqueUsers;
//           this.pendingLength =
//             response.items.categorizedPayments.pending.uniqueUsers;
//           this.overdueLength =
//             response.items.categorizedPayments.overdue.uniqueUsers;
//         })
//       }catch(error) {
//           this.reportLength = 0;
//           this.confirmedLength = 0;
//           this.pendingCount = 0;
//           this.overdueLength = 0;
//           console.log(
//             "Error fetching client data weekly is for year,month,week:",
//             this.year,
//             this.month,
//             this.week,
//             error.status,error.message
//           );
//         }finally {

//       };
//     },
//     async fetchDailyPayments() {
//       this.selectYear = false;
//       this.selectMonth = false;
//       this.selectYear = false;
//       this.selectWeek = false;
//       this.selectDay = false;
//       this.selectReportType = false;
//       if (this.year == "") {
//         this.selectYear = true;
//         return;
//       }
//       if (this.month == "") {
//         this.selectMonth = true;
//         return;
//       }
//       if (this.day == "") {
//         this.selectDay = true;
//         return;
//       }
//       const params={
//         timeRange: this.reportType,
//         year: this.year,
//         month: this.month,
//         day: this.day
//       }
//        try { await this.$apiClient
//         .get(
//           '/api/v1/payments/reports',params
//         )
//         .then((response) => {
//           console.log(
//             "report type for daily is for year,month,day",
//             this.year,
//             this.month,
//             this.day,
//             response
//           );
//           this.reports = response;
//           this.reportLength =
//             response.items.categorizedPayments.confirmed.uniqueUsers;
//           this.confirmedLength =
//             response.items.categorizedPayments.confirmed.uniqueUsers;
//           this.pendingLength =
//             response.items.categorizedPayments.pending.uniqueUsers;
//           this.overdueLength =
//             response.items.categorizedPayments.overdue.uniqueUsers;
//         })
//        }catch(error) {
//           this.reportLength = 0;
//           this.confirmedLength = 0;
//           this.pendingCount = 0;
//           this.overdueLength = 0;
//           console.error(
//             "Error fetching client data for a daaily anmd for year,month,day:",
//             this.year,
//             this.month,
//             this.day,
//             error.status,error.message
//           );
//         }finally {

//         };
//     },

//     thisYear() {
//       ////alert("this year")
//       this.reportType = "annually";
//       this.month = "";
//       this.week = "";
//       this.day = "";

//       this.semiAnaualSelected = false;
//       this.monthlySelected = false;
//       this.weeklySelected = false;
//       this.dailySelected = false;

//       console.log("this year is called");

//       const timeRange = "annually";
//       this.year = new Date().getFullYear();
//       this.$apiClient
//         .get(
//           `/api/v1/payments/reports?timeRange=${timeRange}&year=${this.year}`
//         )
//         .then((response) => {
//           console.log(
//             "report type for monthly is this year",
//             this.year,
//             response
//           );
//           this.reports = response.data;
//           this.reportLength =
//             response.data.items.categorizedPayments.confirmed.uniqueUsers;
//         })
//         .catch((error) => {
//           this.reportLength = 0;
//           console.error(
//             "Error fetching yearly reports for this year:",
//             this.year,
//             error
//           );
//         });
//     },
//     thisSemi() {
//       this.annaualSelected = true;
//       this.semiAnaualSelected = true;
//       this.monthlySelected = false;
//       this.weeklySelected = false;
//       this.dailySelected = false;
//       this.reportType = "semiAnnually";
//       this.year = new Date().getFullYear();
//       this.semiYear = this.getCurrentHalf();
//       this.fetchSemiYearlyPayments();
//     },

//     thisMonth() {
//       this.annaualSelected = true;
//       this.semiAnaualSelected = false;
//       this.monthlySelected = true;
//       this.weeklySelected = false;
//       this.dailySelected = false;
//       this.year = new Date().getFullYear();
//       this.month = new Date().getMonth() + 1;
//       this.reportType = "monthly";
//       this.fetchPayments();
//     },
//     thisWeek() {
//       this.annaualSelected = true;
//       this.monthlySelected = true;
//       this.weeklySelected = true;

//       this.semiAnaualSelected = false;
//       this.dailySelected = false;

//       this.year = new Date().getFullYear();
//       this.reportType = "weekly";
//       const today = new Date();
//       this.week = this.getWeekNumber(today);
//       this.month = new Date().getMonth() + 1;
//       this.fetchPayments();
//     },
//     thisDay() {
//       this.annaualSelected = true;
//       this.monthlySelected = true;
//       this.dailySelected = true;

//       this.weeklySelected = false;
//       this.semiAnaualSelected = false;

//       this.day = new Date().getDate();
//       this.year = new Date().getFullYear();
//       this.month = new Date().getMonth() + 1;
//       this.reportType = "daily";
//       this.fetchPayments();
//     },

//     getWeekNumber(date) {
//       const currentDate = new Date(date);
//       const startDate = new Date(currentDate.getFullYear(), 0, 1);
//       const dayOfYear = Math.floor(
//         (currentDate - startDate) / (24 * 60 * 60 * 1000)
//       );
//       // ISO week date weeks start on Monday, so correct the day number
//       const weekDay = (currentDate.getDay() + 6) % 7;
//       // Calculate week number
//       return Math.ceil((dayOfYear + 7 - weekDay) / 7);
//     },
//     goToGruopPayment() {
//       const paymentType = this.paymentType;
//       const reportType = this.reportType;

//       const year = this.year;
//       const semiYear = this.semiYear;
//       const month = this.month;
//       const week = this.Week;
//       const day = this.day;

//       if (this.reportType == "annually") {
//         this.$router.push({
//           name: "confirmed",
//           query: { paymentType, reportType, year },
//           // props: { paymentType, year },
//         });
//       }

//       if (this.reportType == "semiAnnually") {
//         this.$router.push({
//           name: "group-payments",
//           query: { paymentType, reportType, year, semiYear },
//           // props: { paymentType, year },
//         });
//       }

//       if (this.reportType == "monthly") {
//         this.$router.push({
//           name: "group-payments",
//           query: { paymentType, reportType, year, month },
//           // props: { paymentType, year },
//         });
//       }
//       if (this.reportType == "weekly") {
//         this.$router.push({
//           name: "group-payments",
//           query: { paymentType, reportType, year, month, week },
//         });
//       }
//       if (this.reportType == "daily") {
//         this.$router.push({
//           name: "group-payments",
//           query: { paymentType, reportType, year, month, day },
//         });
//       }
//     },
//     getCurrentHalf() {
//       const month = new Date().getMonth();
//       return month < 6 ? "1st" : "2nd";
//     },

//     async generateQRCodeImage() {
//       const qrData = `User ID: ${this.userId}, User Name: ${this.userName}`;

//       try {
//         // Generate QR code as a data URL (image) without rendering it to a canvas
//         const qrCodeImage = await QRCode.toDataURL(qrData, {
//           errorCorrectionLevel: "H",
//         });

//         // You can now use qrCodeImage in an <img> tag directly
//         document.getElementById(
//           "qrCodeImageContainer"
//         ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
//       } catch (error) {
//         console.error("Error generating QR code:", error);
//       }
//     },

//     async printDiv() {
//       //alert("print div")
//       // First, generate the QR code image
//       await this.generateQRCodeImage();

//       // Now proceed with the printing
//       const printContent = document.getElementById("printable-area").innerHTML;

//       // Create a link element to read the Tailwind CSS file
//       const linkElement = document.createElement("link");
//       linkElement.href = "/src/assets/css/tailwind.css"; // Adjust the path as necessary
//       linkElement.rel = "stylesheet";

//       // Create a new window for printing
//       const printWindow = window.open(
//         "",
//         "",
//         `height=${window.innerHeight},width=${window.innerWidth}`
//       );
//       printWindow.document.open();

//       // Write the content to the new window
//       printWindow.document.write(`
//       <html>
//         <head>
//           <title>Payment Report</title>
//           ${linkElement.outerHTML} <!-- Include the Tailwind CSS link -->

//           <style>
         
//              body {
//                border: 1px dotted #622e2e; 
//       font-family: Arial, sans-serif;
//       padding: 20px;
//       background-color: #f4f4f9;
//     }
//     .report-table {
//       margin-top: 40px;
//       background-color: #ffffff;
//       border: 1px solid #cccccc;
//       border-radius: 8px;
//       padding: 20px;
//       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }
//     .report-table h2 {
//       text-align: center;
//       font-size: 24px;
//       color: #4b0082;
//       margin-bottom: 10px;
//     }
//     .report-table p {
//       text-align: center;
//       font-size: 14px;
//       color: #666666;
//       margin-bottom: 20px;
//     }
//     table {
//       width: 100%;
//       border-collapse: collapse;
//       margin-bottom: 20px;
//     }
//     th, td {
//       border: 1px solid #cccccc;
//       padding: 8px 12px;
//       text-align: left;
//     }
//     th {
//       background-color: #f9f9f9;
//       color: #333333;
//       font-weight: bold;
//     }
//     .highlight {
//       background-color: #f0f0f0;
//       font-weight: bold;
//     }
//     .footer-info {
//       display: flex;
//       justify-content: space-between;
//       margin-top: 20px;
//     }
//     .footer-info div {
//       font-size: 14px;
//     }
//     .qr-code-container {
//       text-align: center;
//       margin-top: 20px;
//     }
//           </style>
//         </head>
//         <body>
//           <div id="printable-area">
//             ${printContent}
//           </div>
//         </body>
//       </html>
//     `);
//       printWindow.document.close();

//       // Ensure that the print dialog opens and window closes after printing
//       printWindow.onload = function () {
//         printWindow.focus();
//         printWindow.print();
//       };
//       printWindow.onafterprint = function () {
//         printWindow.close();
//       };
//     },
//   },
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