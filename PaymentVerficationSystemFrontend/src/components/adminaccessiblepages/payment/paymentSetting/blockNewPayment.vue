<template>
  <div>
    <!-- //start of transtion -->
     <Toast ref="toast" />

    <!-- //end of transtion -->
    <div class="flex-col border-t border-gray-300 rounded-lg mt-5 ">
      <div class="flex flex-wrap">
        <div
          v-if="paymentSettingCreated === 0"
          class="mx-auto w-1/2 mb-16 text-cyan-500 mt-16 md:ml-32"
        ></div>
        
        <div v-if="paymentSettingCreated === 2" class="w-full border border-gray-300 rounded-lg">
          <div class="m-4">
            <form action="">
              <div class=" flex flex-col lg:flex-row lg:space-x-12">
                <div class="flex flex-col w-full lg: w-1/2">
                  <div class="">
                    <label class="custom-label" for="amount">
                      {{ $t("regularAmount") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="amount"
                      class="w-full custom-input"
                      v-model="paymentSetting.regularAmount"
                      placeholder="Amount"
                    />
                    <p
                      v-if="regularIsRequired"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Regular amount is required *
                    </p>
                  </div>
                  <div class=" w-full">
                    <label class="custom-label" for="amount">
                      {{ $t("subsidyAmount") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="amount"
                      class="custom-input"
                      v-model="paymentSetting.subsidyAmount"
                      placeholder="Amount"
                    />
                  </div>

                  <div class="w-full">
                    <label class="custom-label" for="amount">
                      {{ $t("urgent") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="amount"
                      class="custom-input"
                      v-model="paymentSetting.urgentAmount"
                      placeholder="Amount"
                    />
                  </div>

                  <div class="">
                    <label class="custom-label" for="amount">
                      {{ $t("service") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="amount"
                      class="custom-input"
                      v-model="paymentSetting.serviceAmount"
                      placeholder="Amount"
                    />
                    <p
                      v-if="serviceIsRequired"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Service amount is required *
                    </p>
                  </div>

                  <div class="mb-4">
                    <label class="custom-label" for="amount">
                      {{ $t("registrationFeePercentage") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="amount"
                      class="custom-input"
                      v-model="paymentSetting.regFeeRate"
                      placeholder="Percentage"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="custom-label" for="activeMonth">
                      {{ $t("activeYear") }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <select
                      v-model="paymentSetting.activeYear"
                      class="custom-select"
                    >
                      <option value="" disabled>{{ $t("selectYear") }}</option>
                      <option v-for="year in $years" :key="year" :value="year">
                        {{ year }}
                      </option>
                    </select>
                    <p
                      v-if="activeYearIsRequired"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Active Year is required *
                    </p>
                  </div>

                  <div class="mb-4">
                    <label class="custom-label" for="activeMonth">
                      {{ $t("activeMonth") }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <select
                      id="activeMonth"
                      class="custom-select"
                      required
                      style="padding-left: 16px"
                      v-model="paymentSetting.activeMonth"
                      :placeholder="$t('activeMonth')"
                    >
                      <option value="">{{ $t("selectMonth") }}</option>
                      <option
                        v-for="month in $months"
                        :key="month"
                        :value="month.value"
                      >
                        {{ month.name }}
                      </option>
                    </select>
                    <p
                      v-if="activeMonthIsRequired"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Active Month is required *
                    </p>
                  </div>

              
                </div>


                  <div class=" w-full lg: w-1/2">
                  <div class="mb-4">
                    <label class="custom-label" for="startingDate">
                      {{ $t("startingDay") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="startingDate"
                      type="date"
                      class="custom-input"
                      v-model="paymentSetting.startingDate"
                      placeholder="Starting Date"
                    />
                    <p
                      v-if="startingDateIsRequired"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Starting Date is required *
                    </p>
                    <p
                      v-if="start_date_less_than_activeMonth"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Starting date should in the interval of the selected month
                    </p>

                    <p
                      v-if="startDateLessEndDate"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Starting Date Can Not be greated then ending date
                    </p>
                  </div>

                  <div class="mb-4">
                    <label class="custom-label" for="endingDate">
                      {{ $t("endingDate") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="endingDate"
                      type="date"
                      class="custom-input"
                      v-model="paymentSetting.endingDate"
                      placeholder="Ending Date"
                    />
                    <p
                      v-if="endingDateIsRequired"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Ending Date is required *
                    </p>
                    <p
                      v-if="end_date_less_than_activeMonth"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Ending date should in the interval of the selected month
                    </p>
                  </div>

                  <div class="mb-4">
                    <label class="custom-label" for="penalityLate5Days">
                      {{ $t("penaltyPerFiveDaysPercentage") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="penalityLate5Days"
                      class="custom-input"
                      v-model="paymentSetting.penalityLate5Days"
                      :placeholder="$t('penaltyPerFiveDaysPercentage')"
                    />
                    <p
                      v-if="penality5DayIsRequired"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Penality for late 5 days is required *
                    </p>
                    <p
                      v-if="fiveDayLessTenDay"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Penality 5 days Can not be Greater than charge 10 day
                    </p>
                  </div>
                  <div class="mb-4">
                    <label class="custom-label" for="upTo10Days">
                      {{ $t("penaltyPerTenDaysPercentage") }}

                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="upTo10Days"
                      class="custom-input"
                      v-model="paymentSetting.penalityLate10Days"
                      :placeholder="$t('penaltyPerTenDaysPercentage')"
                    />
                    <p
                      v-if="penality10DayIsRequired"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Penality for late 10 days is required *
                    </p>
                    <p
                      v-if="tenDayLessAboveTenDay"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Penality 10 for days Can not be Greater than charge above
                      10 days
                    </p>
                  </div>
                  <div class="mb-4">
                    <label class="custom-label" for="above10DaysInMonth">
                      {{ $t("penaltyPerAboveTenDaysPercentage") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="above10DaysInMonth"
                      class="custom-input"
                      v-model="paymentSetting.penalityLateAbove10Days"
                      :placeholder="$t('penaltyPerAboveTenDaysPercentage')"
                    />
                    <p
                      v-if="penalityAbove10DayIsRequired"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Penality for late above 10 days is required *
                    </p>
                  </div>
                </div>


              </div>
          
            <button
              @click.prevent="createRegularPayment()"
              type="submit"
              class="mb-10 ml-1 bg-indigo-800 hover:bg-indigo-500 text-white py-2 px-4 rounded"
            >
              {{ $t("submit") }}
            </button>
          </form>



          </div>
        </div>

        <div v-if="paymentSettingCreated === 1" class="w-full m-4">
          <div v-if="paymentActivate">
            <p class="text-blue-500">
              Please activate the payment settings to allow users to proceed
              with their payments.
            </p>
            <button
              @click="showPaymentEditingActivating = true"
              class="custom-button m-4"
            >
              {{ $t("activate") }}
            </button>
          </div>

          <div v-if="!paymentActivate">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Left Column (First 6 Items) -->
              <div class="space-y-4">
                <div class="bg-white border-b border-dotted p-4 rounded-md border-b border-gray-500">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-money-bill-alt text-green-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("regularAmount") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.regularAmount
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted p-4 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-hand-holding-usd text-yellow-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("subsidyAmount") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.subsidyAmount > 0
                        ? paymentSetting.subsidyAmount
                        : "0"
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted p-4 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-exclamation-circle text-red-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("urgentAmount") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.urgentAmount > 0
                        ? paymentSetting.urgentAmount
                        : "0"
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted p-4 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-cogs text-indigo-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("serviceAmount") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.serviceAmount
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted p-4 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-percent text-blue-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("registrationFee") }} %:</span
                    >
                    <span class="text-lg text-gray-800"
                      >{{ paymentSetting.regFeeRate }} %</span
                    >
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted p-4 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-check text-teal-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("activeYear") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.activeYear
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Right Column (Remaining Items) -->
              <div class="space-y-4">
                <div
                  class="bg-white border-b border-dotted p-4 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-day text-purple-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("activeMonth") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.activeMonth
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted p-4 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-alt text-orange-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("startingDay") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.formattedStartDate
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted p-4 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-calendar-times text-red-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("endingDay") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.formattedEndDate
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted p-4 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-clock text-yellow-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("penaltyPerFiveDaysPercentage") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.penalityLate5Days
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted p-4 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-clock text-pink-400"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("penaltyPerTenDaysPercentage") }}:</span
                    >
                    <span class="text-lg text-gray-800">{{
                      paymentSetting.penalityLate10Days
                    }}</span>
                  </div>
                </div>

                <div
                  class="bg-white border-b border-dotted p-4 rounded-md shadow-sm border-b border-gray-500"
                >
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-clock text-red-500"></i>
                    <span class="font-semibold text-sm"
                      >{{ $t("penaltyPerAboveTenDaysPercentage") }}:</span
                    >
                    <span class="text-lg text-gray-800"
                      >{{ paymentSetting.penalityLateAbove10Days }}%</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Edit Button -->
            <div class="flex mt-6">
              <button
                @click="
                  showPaymentEditingActivating = !showPaymentEditingActivating
                "
                class="h-8 flex items-center px-4 border border-indigo-800 rounded hover:bg-gray-100 transition duration-200"
              >
                <span class="text-gray-600 hover:text-gray-800 font-bold">
                  <i class="fas fa-edit text-pink-500"></i> {{ $t("edit") }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPaymentEditingActivating" class="">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-75 p-4 "
        >
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="flex flex-row items-center">
              <!-- Text on the left -->
              <div>Edit Regular Payment</div>

              <!-- Icon on the right -->
              <div
                class="ml-auto"
                @click="
                  showPaymentEditingActivating = !showPaymentEditingActivating
                "
              >
                <svg
                  class="w-6 h-6 text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <hr class="my-4 md:min-w-full bg-red-500 " />
            <div class="">
              <form action.prevent="" class="py-5 h-96 ">
                <div class="flex flex-col md:flex-row md:space-x-5 scroll-y h-64" >
                  <div class="flex flex-col">
                    <div class="mb-4">
                      <label class="custom-label" for="amount">
                        {{ $t("regularAmount") }}
                        <span class="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="number"
                        id="amount"
                        class="custom-input"
                        v-model="paymentSetting.regularAmount"
                        value="600"
                      />
                     
                    </div>
                    <div class="mb-4">
                      <label class="custom-label" for="amount">
                        {{ $t("subsidyAmount") }}
                        <span class="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="number"
                        id="amount"
                        class="custom-input"
                        v-model="paymentSetting.subsidyAmount"
                        value="600"
                      />
                    </div>
                    <div class="mb-4">
                      <label class="custom-label" for="amount">
                        {{ $t("urgentAmount") }}
                        <span class="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="number"
                        id="amount"
                        class="custom-input"
                        v-model="paymentSetting.urgentAmount"
                        value="600"
                      />
                    </div>

                    <div class="mb-4">
                      <label class="custom-label" for="amount">
                        {{ $t("serviceAmount") }}
                        <span class="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="number"
                        id="amount"
                        class="custom-input"
                        v-model="paymentSetting.serviceAmount"
                        value="600"
                      />
                     
                    </div>
                    <div class="mb-4">
                      <label class="custom-label" for="amount">
                        {{ $t("registrationFee") }}
                        <span class="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="number"
                        id="amount"
                        class="custom-input"
                        v-model="paymentSetting.regFeeRate"
                        value="600"
                      />
                    </div>
                    <div class="mb-4">
                      <label class="custom-label" for="activeMonth">
                        {{ $t("activeYear") }}
                        <span class="custom-star ml-1">*</span>
                      </label>
                      <select
                        v-model="paymentSetting.activeYear"
                        class="custom-select"
                      >
                        <option value="" disabled>Select Year</option>
                        <option
                          v-for="year in $years"
                          :key="year"
                          :value="year"
                        >
                          {{ year }}
                        </option>
                      </select>
                      
                    </div>
                  </div>

                  <div class="flex flex-col">
                    <div class="mb-4">
                      <label class="custom-label" for="activeMonth">
                        {{ $t("activeMonth") }}
                        <span class="custom-star ml-1">*</span>
                      </label>
                      <select
                        v-model="paymentSetting.activeMonth"
                        class="custom-select"
                      >
                        <option value="" disabled>Select Active Month</option>
                        <option
                          v-for="month in $months"
                          :key="month"
                          :value="month.value"
                        >
                          {{ month.name }}
                        </option>
                      </select>
                      <p
                        v-if="activeMonthIsRequired"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Active Month is required *
                      </p>
                    </div>
                    <div class="mb-4">
                      <label for="startingDate" class="custom-label"
                        >{{ $t("startingDay") }}
                        <span class="text-red-500 ml-1">*</span></label
                      >
                      <input
                        type="date"
                        id="startingDate"
                        class="custom-input"
                        v-model="paymentSetting.formattedStartDate"
                      />

                      
                    </div>
                    <div class="mb-4">
                      <label for="endingDate" class="custom-label"
                        >{{ $t("endingDay") }}
                        <span class="text-red-500 ml-1">*</span></label
                      >
                      <input
                        type="date"
                        id="edingDate"
                        class="custom-input"
                        v-model="paymentSetting.formattedEndDate"
                      />


                   
                    </div>
                    <div class="mb-4">
                      <label class="custom-label">
                        {{ $t("penalityFiveDaysPercentage") }}
                        <span class="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="Text"
                        id="bank_account"
                        class="custom-input"
                        v-model="paymentSetting.penalityLate5Days"
                      />


                     
                    </div>
                    <div class="mb-4">
                      <label class="custom-label">
                        {{ $t("penaltyPerTenDaysPercentage") }}
                        <span class="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="Text"
                        id="bank_account"
                        class="custom-input"
                        v-model="paymentSetting.penalityLate10Days"
                      />
                      
                    </div>

                    <div class="mb-4">
                      <label class="custom-label">
                        {{ $t("penaltyPerAboveTenDaysPercentage") }}
                        <span class="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="Text"
                        id="bank_account"
                        class="custom-input"
                        v-model="paymentSetting.penalityLateAbove10Days"
                      />
                    </div>
                    
                  </div>
                </div>

                <div class="flex flex-col">

                     <p
                        v-if="regularIsRequired"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Regular amount is required *
                      </p>
                      <p
                        v-if="serviceIsRequired"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Service amount is required *
                      </p>
                      <p
                        v-if="activeYearIsRequired"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Active Year is required *
                      </p>
                      <p
                        v-if="startingDateIsRequired"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Starting Date is required *
                      </p>
                      <p
                        v-if="start_date_less_than_activeMonth"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Starting date should in the interval of the selected
                        month
                      </p>

                      <p
                        v-if="startDateLessEndDate"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Starting Date Can Not be greated then ending date
                      </p>
                      <p
                        v-if="endingDateIsRequired"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Ending Date is required *
                      </p>
                      <p
                        v-if="endingDateIsRequired"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Ending Date is required *
                      </p>
                      <p
                        v-if="end_date_less_than_activeMonth"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Ending date should in the interval of the selected month
                      </p>
                      <p
                        v-if="penality5DayIsRequired"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Penality for late 5 days is required *
                      </p>
                      <p
                        v-if="fiveDayLessTenDay"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Penality 5 days Can not be Greater than charge 10 day
                      </p>
                      <p
                        v-if="penality10DayIsRequired"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Penality for late 10 days is required *
                      </p>
                      <p
                        v-if="tenDayLessAboveTenDay"
                        class="text-red-500 text-xs mt-2 mb-5"
                      >
                        Penality 10 for days Can not be Greater than charge
                        above 10 days
                      </p>

                      <p
                      v-if="penalityAbove10DayIsRequired"
                      class="text-red-500 text-xs mt-2 mb-5"
                    >
                      Penality for above 10 days is required *
                    </p>
                     <p
                      v-if="settingAlreadyExists"
                      class="text-red-500 text-xs mt-2 mb-5 mb-5"
                    >
                      Payment Setting  is already exist for the selected month and can not be activated
                    </p>

              
                <button
                  v-if="!paymentActivate"
                  @click.prevent="editPaymentSetting()"
                  type="submit"
                  class="bg-indigo-800 hover:bg-blue-700 text-white py-2 px-4 rounded mt-5 "
                >
                  {{ $t("update") }}


                </button>
                <button
                  v-if="paymentActivate"
                  @click.prevent="activatePaymentSetting()"
                  type="submit"
                  class="bg-indigo-800 hover:bg-blue-700 text-white py-2 px-4 rounded mt-5"
                >
                  {{ $t("activate") }}
                </button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showSuccess">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                <div class="flex items-center mb-4 ml-32">
                  <svg
                    class="w-8 h-8 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <h2 class="text-md text-green-800">{{ $t("success") }}!</h2>
                </div>
                <p class="text-blue-800 text-md ml-8">
                  {{ successMessage }}
                </p>
                <button
                  @click="showSuccess = false"
                  class="ml-8 mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {{ $t("ok") }}
                </button>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
    <div v-if="showError">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-red-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                <div class="flex items-center justify-center mb-4">
                  <svg
                    class="w-8 h-8 text-red-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  <h2 class="text-sm font-bold text-gray-800">
                    {{ $t("error") }}!
                  </h2>
                </div>
                <p class="text-gray-600 text-sm">
                  {{ errorMessage }}
                </p>
                <button
                  @click="showError = false"
                  class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {{ $t("ok") }}
                </button>
              </div>
            </div>
            <hr class="my-4 bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Toast from "../../../Common/Toast.vue"
export default {
  components:{
     Toast,
  },
  name: "paymentsView",
  data() {
    return {
      successToastMessage: "",
      errorToastMessage: "",
      showErrorToast: false,
      showSuccessToast: false,

      paymentSettingCreated: 0,
      showSuccess: false,
      showError: false,
      showPaymentEditingActivating: false,
      successMessage: "Payment Setting Activated Successfully",
      errorMessage: "There is error during activation. Please try again",
      settingAlreadyExists :false,
      start_date_less_than_activeMonth: false,
      end_date_less_than_activeMonth: false,
      edit_activate_start_date_less_than_activeMonth: false,
      edit_activate_end_date_less_than_activeMonth: false,

      regularIsRequired: false,
      serviceIsRequired: false,
      activeYearIsRequired: false,
      serviceActiveMonthIsRequired: false,

      startingDateIsRequired: false,
      endingDateIsRequired: false,
      penality5DayIsRequired: false,
      penality10DayIsRequired: false,
      penalityAbove10DayIsRequired: false,

      paymentActivate: false,
      paymentSetting: {
        paymentActivate: true,
        regularAmount: "",
        subsidyAmount: "",
        urgentAmount: "",
        serviceAmount: "",
        activeYear: "",
        activeMonth: "",
        startingDate: "",
        endingDate: "",
        penalityLate5Days: "",
        penalityLate10Days: "",
        penalityLateAbove10Days: "",
        regFeeRate: "",
      },
      fillAllfields: false,
      fiveDayLessTenDay: false,
      tenDayLessAboveTenDay: false,
      startDateLessEndDate: false,
    };
  },

  watch: {
    updateSuccesfully(newValue) {
      console.log("updateSuccesfully", newValue);
      if (newValue) {
        console.log("in if");
        setTimeout(() => {
          console.log("intimeout");
          this.updateSuccesfully = false;
        }, 2000);
      }
    },
  },
  mounted() {
    this.$apiClient
      .get("/api/v1/paymentSetting/latest")
      .then((response) => {
        console.log("response latest setting", response);
        if (response.data.status === 1) {
          if (response.data.paymentSetting) {
            console.log("");
            this.paymentSettingCreated = 1;
            const endingDate = new Date(
              response.data.paymentSetting.endingDate
            );
            const today = new Date();

            console.log("today: " + today);

            today.setHours(0, 0, 0, 0);
            endingDate.setHours(0, 0, 0, 0);
            if (today > endingDate) {
              console.log("today is greater than ending date");
              this.paymentActivate = true;
            } else {
              console.log("today is not greater than ending date");
            }

            // this.paymentSetting={};
            this.paymentSetting = response.data.paymentSetting;

            // this.paymentSetting.startingDate =
            //   this.paymentSetting.startingDate;

            // this.paymentSetting.endingDate =
            //   this.paymentSetting.endingDate;

            console.log("response setttinghh h ", response.data);
          } else {
            this.paymentSettingCreated = 2;
          }
        }
      })
      .catch((error) => {
        console.error(
          "An error occurred while fetching payment settings:",
          error
        );
        this.paymentSettingCreated = 0; // Indicate an error state
      });
  },

  methods: {
    createRegularPayment() {
      console.log(
        this.paymentSetting.subsidyAmount,
        this.paymentSetting.regularAmount,
        this.paymentSetting.serviceAmount,
        this.regFeeRate,
        this.paymentSetting.urgentAmount,
        this.paymentSetting.activeMonth,
        this.paymentSetting.activeYear,
        this.paymentSetting.penalityLate5Days,
        this.paymentSetting.penalityLate10Days,
        this.paymentSetting.penalityLateAbove10Days,
        this.paymentSetting.startingDate,
        this.paymentSetting.endingDate
      );

      this.regularIsRequired = false;
      this.serviceIsRequired = false;
      this.activeYearIsRequired = false;
      this.activeMonthIsRequired = false;
      this.startingDateIsRequired = false;
      this.endingDateIsRequired = false;
      this.penality5DayIsRequired = false;
      this.penality10DayIsRequired = false;
      this.penalityAbove10DayIsRequired = false;
      this.start_date_less_than_activeMonth = false;
      this.startDateLessEndDate = false;
      this.fiveDayLessTenDay = false;
      this.tenDayLessAboveTenDay = false;

      if (this.paymentSetting.regularAmount == "") {
        this.regularIsRequired = true;
        this.showErrorToastMessage("Regular amount is required");
        return;
      }
      if (this.paymentSetting.serviceAmount == "") {
        this.serviceIsRequired = true;
        this.showErrorToastMessage("Service amount is required");
        return;
      }
      if (this.paymentSetting.activeYear == "") {
        this.activeYearIsRequired = true;
        this.showErrorToastMessage("Active Year is required");
        return;
      }
      if (this.paymentSetting.activeMonth == "") {
        this.activeMonthIsRequired = true;
        this.showErrorToastMessage("Active Month is required");
        return;
      }
      if (this.paymentSetting.startingDate == "") {
        this.startingDateIsRequired = true;
        this.showErrorToastMessage("Starting Date is required");
        return;
      }

      const date = new Date(this.paymentSetting.startingDate); //used for the ff if condtions;

      if (date.getMonth() + 1 < this.paymentSetting.activeMonth) {
        this.start_date_less_than_activeMonth = true;
        this.showErrorToastMessage(
          "Starting date should be in the interval of selected month"
        );
        return;
      }

      if (this.paymentSetting.endingDate == "") {
        this.endingDateIsRequired = true;
        this.showErrorToastMessage("ending Date is required");
        return;
      }

      if (this.paymentSetting.endingDate) {
        //alert("there is ending date")
        const date = new Date(this.paymentSetting.endingDate);
        if (date.getMonth() + 1 < this.paymentSetting.activeMonth) {
          this.end_date_less_than_activeMonth = true;
          this.showErrorToastMessage(
            "Ending date Should be in the interval of the selected month"
          );
          return;
        } else {
          this.end_date_less_than_activeMonth = false;
        }
      }

      if (
        new Date(this.paymentSetting.startingDate) >
        new Date(this.paymentSetting.endingDate)
      ) {
        this.startDateLessEndDate = true;
        this.showErrorToastMessage(
          "Starting date should be lesser than Ending date"
        );
        return;
      }

      if (this.paymentSetting.penalityLate5Days == "") {
        this.penality5DayIsRequired = true;
        this.showErrorToastMessage("Penality Late 5 Days  is required");
        return;
      }

      if (this.paymentSetting.penalityLate10Days == "") {
        this.penality10DayIsRequired = true;
        this.showErrorToastMessage("Penality Late 10 Days  is required");
        return;
      }

      if (
        Number(this.paymentSetting.penalityLate5Days) >
        Number(this.paymentSetting.penalityLate10Days)
      ) {
        this.fiveDayLessTenDay = true;
        this.showErrorToastMessage(
          "Penality for late 5 days should be less than penality for 10 days"
        );
        return;
      }

      if (this.paymentSetting.penalityLateAbove10Days == "") {
        this.penalityAbove10DayIsRequired = true;
        this.showErrorToastMessage("penality Late above 10 Days  is required");
        return;
      }

      if (
        Number(this.paymentSetting.penalityLate10Days) >
        Number(this.paymentSetting.penalityLateAbove10Days)
      ) {
        this.tenDayLessAboveTenDay = true;
        this.showErrorToastMessage(
          "Penality for late 10 days should be less than penality for above 10 days"
        );
        return;
      }

      const regularData = {
        regularAmount: this.paymentSetting.regularAmount,
        subsidyAmount: this.paymentSetting.subsidyAmount,
        urgentAmount: this.paymentSetting.urgentAmount,
        serviceAmount: this.paymentSetting.serviceAmount,
        penalityLate5Days: this.paymentSetting.penalityLate5Days,
        penalityLate10Days: this.paymentSetting.penalityLate10Days,
        penalityLateAbove10Days: this.paymentSetting.penalityLateAbove10Days,
        activeMonth: this.paymentSetting.activeMonth,
        activeYear: this.paymentSetting.activeYear,
        regFeeRate: this.paymentSetting.regFeeRate,
      };

      this.paymentSetting = {};
      console.log(regularData);
      console.log("payment Dataaa", regularData);
      this.$apiClient
        .post("/api/v1/paymentSetting/", regularData)
        .then((response) => {
          console.log("response", response);
          if (response.data.status === 1) {
            //this.paymentSetting=response.data.paymentSetting;

            this.$refs.toast.showSuccessToastMessage(response.data.message);

            this.paymentSettingCreated = 1;
          } else {
            this.$refs.toast.showSuccessToastMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);

          if (error.response) {
            this.$refs.toast.showErrorToastMessage("Something went wrong with response");
          }
          if (error.request) {
            this.$refs.toast.showErrorToastMessage(error.response.message);
          } else {
            this.$refs.toast.showErrorToastMessage("Something went wrong");
          }
        });
    },

    editPaymentSetting() {
      this.regularIsRequired = false;
      this.serviceIsRequired = false;
      this.activeYearIsRequired = false;
      this.activeMonthIsRequired = false;
      this.startingDateIsRequired = false;
      this.endingDateIsRequired = false;
      this.penality5DayIsRequired = false;
      this.penality10DayIsRequired = false;
      this.penalityAbove10DayIsRequired = false;
      this.start_date_less_than_activeMonth = false;
      this.startDateLessEndDate = false;
      this.fiveDayLessTenDay = false;
      this.tenDayLessAboveTenDay = false;

      if (this.paymentSetting.regularAmount == "") {
        this.regularIsRequired = true;
      
        return;
      }
      if (this.paymentSetting.serviceAmount == "") {
        this.serviceIsRequired = true;
        
        return;
      }
      if (this.paymentSetting.activeYear == "") {
        this.activeYearIsRequired = true;
       
        return;
      }
      if (this.paymentSetting.activeMonth == "") {
        this.activeMonthIsRequired = true;
      
        return;
      }
      if (this.paymentSetting.formattedStartDate == "") {
        this.startingDateIsRequired = true;
      
        return;
      }

      const date = new Date(this.paymentSetting.formattedStartDate); //used for the ff if condtions;

      if (date.getMonth() + 1 < this.paymentSetting.activeMonth) {
        this.start_date_less_than_activeMonth = true;
       
        return;
      }

      if (this.paymentSetting.formattedEndDate == "") {
        this.endingDateIsRequired = true;
       
        return;
      }

      if (this.paymentSetting.formattedEndDate) {
        //alert("there is ending date")
        const date = new Date(this.paymentSetting.formattedEndDate);
        if (date.getMonth() + 1 < this.paymentSetting.activeMonth) {
          this.end_date_less_than_activeMonth = true;
        
          return;
        } else {
          this.end_date_less_than_activeMonth = false;
        }
      }

      if (
        new Date(this.paymentSetting.formattedStartDate) >
        new Date(this.paymentSetting.formattedEndDate)
      ) {
        this.startDateLessEndDate = true;
        
        return;
      }

      if (this.paymentSetting.penalityLate5Days == "") {
        this.penality5DayIsRequired = true;
       
        return;
      }

      if (this.paymentSetting.penalityLate10Days == "") {
        this.penality10DayIsRequired = true;
       
        return;
      }

      if (
        Number(this.paymentSetting.penalityLate5Days) >
        Number(this.paymentSetting.penalityLate10Days)
      ) {
        this.fiveDayLessTenDay = true;
       
        return;
      }

      if (this.paymentSetting.penalityLateAbove10Days == "") {
        this.penalityAbove10DayIsRequired = true;
       
        return;
      }

      if (
        Number(this.paymentSetting.penalityLate10Days) >
        Number(this.paymentSetting.penalityLateAbove10Days)
      ) {
        this.tenDayLessAboveTenDay = true;
       
        return;
      }

      const regularData = {
        regularAmount: this.paymentSetting.regularAmount,
        subsidyAmount: this.paymentSetting.subsidyAmount,
        urgentAmount: this.paymentSetting.urgentAmount,
        serviceAmount: this.paymentSetting.serviceAmount,
        regFeeRate: this.paymentSetting.regFeeRate,
        activeMonth: this.paymentSetting.activeMonth,
        activeYear: this.paymentSetting.activeYear,
        startingDate: this.paymentSetting.formattedStartDate,
        endingDate: this.paymentSetting.formattedEndDate,
        penalityLate5Days: this.paymentSetting.penalityLate5Days,
        penalityLate10Days: this.paymentSetting.penalityLate10Days,
        penalityLateAbove10Days: this.paymentSetting.penalityLateAbove10Days,
        id: this.paymentSetting._id,
      };

      console.log("to be edit data", regularData);

      //const id=this.paymentSetting._id;
      this.$apiClient
        .put(`/api/v1/paymentSetting/${this.paymentSetting._id}`, regularData)
        .then((response) => {
          console.log("response is now=", response);
          if (response.data.status === 1) {
            console.log("response.data.message", response.data.message);
            this.$refs.toast.showSuccessToastMessage(response.data.message);

            this.showPaymentEditingActivating =
              !this.showPaymentEditingActivating;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.message) {
              console.log("error",error);
              //this.showErrorToastMessage(error.response.data.message);
            } else {
              console.log("error",error);
              //this.$refs.toast.showErrorToastMessage("Something went wrong,in response");
            }
          } else if (error.request) {
            console.log("error",error);
            //this.$refs.toast.showErrorToastMessage("Something went wrong For the Request ");
          } else {
            console.log("error",error);
           // this.$refs.toast.showErrorToastMessage("Something went wrong");
          }
        });
    },

    activatePaymentSetting() {
      this.regularIsRequired = false;
      this.serviceIsRequired = false;
      this.activeYearIsRequired = false;
      this.activeMonthIsRequired = false;
      this.startingDateIsRequired = false;
      this.endingDateIsRequired = false;
      this.penality5DayIsRequired = false;
      this.penality10DayIsRequired = false;
      this.penalityAbove10DayIsRequired = false;
      this.start_date_less_than_activeMonth = false;
      this.startDateLessEndDate = false;
      this.fiveDayLessTenDay = false;
      this.tenDayLessAboveTenDay = false;
      this.settingAlreadyExists = false;
      if (this.paymentSetting.regularAmount == "") {
        this.regularIsRequired = true;
       
        return;
      }
      if (this.paymentSetting.serviceAmount == "") {
        this.serviceIsRequired = true;
        
        return;
      }
      if (this.paymentSetting.activeYear == "") {
        this.activeYearIsRequired = true;
       
        return;
      }
      if (this.paymentSetting.activeMonth == "") {
        this.activeMonthIsRequired = true;
        
        return;
      }
      if (this.paymentSetting.formattedStartDate == "") {
        this.startingDateIsRequired = true;
       
        return;
      }

      const date = new Date(this.paymentSetting.formattedStartDate); //used for the ff if condtions;

      if (date.getMonth() + 1 < this.paymentSetting.activeMonth) {
        this.start_date_less_than_activeMonth = true;
        
        return;
      }

      if (this.paymentSetting.formattedEndDate == "") {
        this.endingDateIsRequired = true;
       
        return;
      }

      if (this.paymentSetting.formattedEndDate) {
        //alert("there is ending date")
        const date = new Date(this.paymentSetting.formattedEndDate);
        if (date.getMonth() + 1 < this.paymentSetting.activeMonth) {
          this.end_date_less_than_activeMonth = true;
          
          return;
        } else {
          this.end_date_less_than_activeMonth = false;
        }
      }

      if (
        new Date(this.paymentSetting.formattedStartDate) >
        new Date(this.paymentSetting.formattedEndDate)
      ) {
        this.startDateLessEndDate = true;
       
        return;
      }

      if (this.paymentSetting.penalityLate5Days == "") {
        this.penality5DayIsRequired = true;
       
        return;
      }

      if (this.paymentSetting.penalityLate10Days == "") {
        this.penality10DayIsRequired = true;
      
        return;
      }

      if (
        Number(this.paymentSetting.penalityLate5Days) >
        Number(this.paymentSetting.penalityLate10Days)
      ) {
        this.fiveDayLessTenDay = true;
        
        return;
      }

      if (this.paymentSetting.penalityLateAbove10Days == "") {
        this.penalityAbove10DayIsRequired = true;
        
        return;
      }

      if (
        Number(this.paymentSetting.penalityLate10Days) >
        Number(this.paymentSetting.penalityLateAbove10Days)
      ) {
        this.tenDayLessAboveTenDay = true;
        
        return;
      }

      console.log("paymentId inc lose", this.paymentId);


      const regularData = {
        regularAmount: this.paymentSetting.regularAmount,
        subsidyAmount: this.paymentSetting.subsidyAmount,
        urgentAmount: this.paymentSetting.urgentAmount,
        serviceAmount: this.paymentSetting.serviceAmount,
        regFeeRate: this.paymentSetting.regFeeRate,
        activeMonth: this.paymentSetting.activeMonth,
        activeYear: this.paymentSetting.activeYear,
        startingDate: this.paymentSetting.formattedStartDate,
        endingDate: this.paymentSetting.formattedEndDate,
        penalityLate5Days: this.paymentSetting.penalityLate5Days,
        penalityLate10Days: this.paymentSetting.penalityLate10Days,
        penalityLateAbove10Days: this.paymentSetting.penalityLateAbove10Days,
      };

      console.log("regular in the activating is", regularData);
      if (this.paymentSetting.formattedEndDate) {
        const date = new Date(this.paymentSetting.formattedStartDate);
        if (date.getMonth() + 1 < this.paymentSetting.activeMonth) {
          this.edit_activate_start_date_less_than_activeMonth = true;
          this.showPaymentEditingActivating = true;
          console.log("it enters to return start ");
         
          return;
        } else {
          this.edit_activate_start_date_less_than_activeMonth = false;
        }
      }

      if (this.paymentSetting.formattedEndDate) {
        const date = new Date(this.paymentSetting.formattedEndDate);
        if (date.getMonth() + 1 < this.paymentSetting.activeMonth) {
          console.log("it enters to return end ");
          this.edit_activate_end_date_less_than_activeMonth = true;

         
          return;
        } else {
          this.edit_activate_end_date_less_than_activeMonth = false;
        }
      }


      console.log("it will go the server");


      this.$apiClient
        .post("/api/v1/paymentSetting", regularData)
        .then((response) => {
          console.log("Update response", response.data);
          if (response.data.status === 1) {
            this.$refs.toast.showSuccessToastMessage(response.data.message);
            this.paymentActivate = false;
            this.paymentSettingCreated = 1;
            this.showPaymentEditingActivating = false;
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.data.message) {
              this.settingAlreadyExists = true;
              //this.$refs.toast.showErrorToastMessage(error.response.data.message);
            } else {
              console.log("occured error",error)
              //this.$refs.toast.showErrorToastMessage("Something went wrong,in response");
            }
          } else if (error.request) {
           // this.$refs.toast.showErrorToastMessage("Something went wrong For the Request ");
           console.log("occured error",error)
          } else {
            //this.$refs.toast.showErrorToastMessage("Something went wrong");
            console.log("occured error",error)
          }
        });
    },
  },
};
</script>
<style>
.scroll-y {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #a0aec0 #f7fafc;
}

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

/* HTML: <div class="loader"></div> */

@keyframes l27 {
  100% {
    transform: rotate(1turn);
  }
}

/* #4f16b8; */
</style>
