<template>
  <div>
   <div
    class="container flex-col border-t-2 border-b-2 border-blue-500 rounded-lg mt-5">
    <div class="flex flex-wrap">
      <div
        v-if="paymentSettingCreated === 0"
        class="mx-auto w-1/2 mb-16 text-cyan-500 mt-16 md:ml-32"
      ></div>
      <div v-if="paymentSettingCreated === 2" class="w-full">
        <div class="mx-4 mt-10">
          <form class=" ">
            <div class="">
              <div class="flex flex-col lg:flex-row lg:space-x-12">
               
                <div class="mb-4">
                  <label class="custom-label" for="amount">
                     {{ $t('regularAmount') }}
                    <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    id="amount"
                    class="custom-input"
                    v-model="paymentSetting.regularAmount"
                    placeholder="Amount"
                  />
                </div>

                <div class="mb-4">
                  <label class="custom-label" for="amount">
                      {{ $t('subsidyAmount') }}
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

                <div class="mb-4">
                  <label class="custom-label" for="amount">
                     {{ $t('urgent') }}
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

                <div class="mb-4">
                  <label class="custom-label" for="amount">
                     {{ $t('service') }}
                    <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    id="amount"
                    class="custom-input"
                    v-model="paymentSetting.serviceAmount"
                    placeholder="Amount"
                  />
                </div>

              </div>
              <div class="mb-4">
                <label class="custom-label" for="amount">
                 {{ $t('registrationFeePercentage') }}
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
                  {{ $t('activeYear') }}
                  <span class="custom-star ml-1">*</span>
                </label>
                <select
                  v-model="paymentSetting.activeYear"
                  class="custom-select"
                >
                  <option value="" disabled>{{ $t('selectYear') }}</option>
                  <option v-for="year in $years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>

              <div class="mb-4">
                <label class="custom-label" for="activeMonth">
                  {{ $t('activeMonth') }}
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
                  <option value="">{{ $t('selectMonth') }}</option>
                  <option
                    v-for="month in $months"
                    :key="month"
                    :value="month.value"
                  >
                    {{ month.name }}
                  </option>
                </select>
              </div>

              <div class="mb-4">
                <label class="custom-label" for="startingDate">
                  {{ $t('startingDay') }}
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="startingDate"
                  type="date"
                  class="custom-input"
                  v-model="paymentSetting.startingDate"
                  placeholder="Starting Date"
                />
              </div>

              <div class="mb-4">
                <label class="custom-label" for="endingDate">
                  {{ $t('endingDate') }}
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="endingDate"
                  type="date"
                  class="custom-input"
                  v-model="paymentSetting.endingDate"
                  placeholder="Ending Date"
                />
              </div>

              <div class="mb-4">
                <label class="custom-label" for="penalityLate5Days">
                  {{ $t('penaltyPerFiveDaysPercentage') }}
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  id="penalityLate5Days"
                  class="custom-input"
                  v-model="paymentSetting.penalityLate5Days"
                  :placeholder="$t('penaltyPerFiveDaysPercentage')"
                />
              </div>
              <div class="mb-4">
                <label class="custom-label" for="upTo10Days">
                  {{ $t('penaltyPerTenDaysPercentage') }}

                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  id="upTo10Days"
                  class="custom-input"
                  v-model="paymentSetting.penalityLate10Days"
                  :placeholder="$t('penaltyPerTenDaysPercentage')"
                />
              </div>
              <div class="mb-4">
                <label class="custom-label" for="above10DaysInMonth">
             
                  {{ $t('penaltyPerAboveTenDaysPercentage') }}
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  id="above10DaysInMonth"
                  class="custom-input"
                  v-model="paymentSetting.penalityLateAbove10Days"
                  :placeholder="$t('penaltyPerAboveTenDaysPercentage')"
                />
              </div>
              <div class="flex flex-row space-x-5 md:space-x-12">
                <button
                  @click.prevent="createRegularPayment()"
                  type="submit"
                  class="mb-10 ml-1 bg-indigo-800 hover:bg-indigo-500 text-white py-2 px-4 rounded"
                >
                {{ $t('submit') }}
                </button>

                <div class="flex flex-col space-y-3">
                  <p v-if="fillAllfields" class="text-red-500">
                    Fill All Fields
                    {{ $t('fillAllFields') }}
                  </p>
                  <p v-if="fiveDayLessTenDay" class="text-red-500">
                    Penality 5 days Can not be Greater than charge 10 day
                  </p>
                  <p v-if="tenDayLessAboveTenDay" class="text-red-500">
                    Penality 10 for days Can not be Greater than charge above 10
                    days
                  </p>
                  <p v-if="startDateLessEndDate" class="text-red-500">
                    Starting Date Can Not be greated then ending date
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div v-if="paymentSettingCreated === 1" class="w-full m-4">
        <div v-if="paymentActivate">
          <p class="text-blue-500">
            Please activate the payment settings to allow users to proceed with
            their payments.
          </p>
          <button
            @click="showPaymentEditingActivating = true"
            class="custom-button m-4"
          >
          {{ $t('activate') }}
          </button>
        </div>

        <div
          v-if="!paymentActivate"
          class=""
        >
          <!-- Payment Information Column 1 -->
          <div class="flex flex-col text-blue-800 w-1/3">
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500 font-extrabold"></i> {{ $t('regularAmount') }}: {{ paymentSetting.regularAmount }}
            </p>
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500"></i> {{ $t('subsidyAmount') }}: {{ paymentSetting.subsidyAmount }}
            </p>
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500"></i>  {{ $t('urgentAmount') }}: {{ paymentSetting.urgentAmount }}
            </p>
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500"></i>  {{ $t('serviceAmount') }}: {{ paymentSetting.serviceAmount }}
            </p>
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500"></i>
              {{ $t('registrationFee') }} %: {{ paymentSetting.regFeeRate }} % 
            </p>
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500"></i> {{ $t('activeYear') }}: {{ paymentSetting.activeYear }}
            </p>
          </div>

          <!-- Payment Information Column 2 -->
          <div class="flex flex-col text-blue-800 w-1/3">
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500"></i> {{ $t('activeMonth') }}: {{ paymentSetting.activeMonth }}
            </p>
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500"></i>{{ $t('startingDay') }}: {{ paymentSetting.formattedStartDate }}
            </p>
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500"></i> {{ $t('endingDay') }}: {{ paymentSetting.formattedEndDate }}
            </p>
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500"></i> {{ $t('penaltyPerFiveDaysPercentage') }} %: {{ paymentSetting.penalityLate5Days }} %
            </p>
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500"></i>{{ $t('penaltyPerTenDaysPercentage') }} %:{{ paymentSetting.penalityLate10Days }} %
            </p>
            <p class="text-md mb-2">
              <i class="far fa-circle text-xs mr-2 text-blue-500"></i> 
              {{ $t('penaltyPerAboveTenDaysPercentage') }}
              {{ paymentSetting.penalityLateAbove10Days }} %
            </p>
          </div>

          <!-- Edit Button Column -->
          <div class="flex flex-col w-1/4 justify-center items-end">
            <button
              @click="
                showPaymentEditingActivating = !showPaymentEditingActivating
              "
              class="h-8 flex items-center px-4 border border-indigo-800 rounded hover:bg-gray-100 transition duration-200 mt-4"
            >
              <span class="text-gray-600 hover:text-gray-800 font-bold">
                <i class="fas fa-edit text-pink-500"></i> {{ $t('edit') }}
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
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="flex flex-row items-center">
            <!-- Text on the left -->
            <div>Edit Regular Payment {{ $t('editRegularPayment') }}</div>

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

          <hr class="my-4 md:min-w-full bg-red-500" />
          <div class="">
            <form class="py-5 scroll-y h-96">
              <div class="flex flex-col md:flex-row md:space-x-5">
                <div class="flex flex-col">
                  <div class="mb-4">
                    <label class="custom-label" for="amount">
                      {{ $t('regularAmount') }}
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
                      {{ $t('subsidyAmount') }}
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
                      {{ $t('urgentAmount') }}
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
                      {{ $t('serviceAmount') }}
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
                      {{ $t('registrationFee') }}
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
                      {{ $t('activeYear') }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <select
                      v-model="paymentSetting.activeYear"
                      class="custom-select"
                    >
                      <option value="" disabled>Select Year</option>
                      <option v-for="year in $years" :key="year" :value="year">
                        {{ year }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="flex flex-col">
                  <div class="mb-4">
                    <label class="custom-label" for="activeMonth">
                      {{ $t('activeMonth') }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <select
                      v-model="paymentSetting.activeMonth"
                      class="custom-select"
                    >
                      <option value="">Select Active Month</option>
                      <option
                        v-for="month in $months"
                        :key="month"
                        :value="month.value"
                      >
                        {{ month.name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label for="startingDate" class="custom-label"
                      >{{ $t('startingDay') }}
                      <span class="text-red-500 ml-1">*</span></label
                    >
                    <input
                      type="date"
                      id="startingDate"
                      class="custom-input"
                      v-model="paymentSetting.startingDate"
                    />
                  </div>
                  <div class="mb-4">
                    <label for="endingDate" class="custom-label"
                      >{{ $t('endingDay') }}
                      <span class="text-red-500 ml-1">*</span></label
                    >
                    <input
                      type="date"
                      id="edingDate"
                      class="custom-input"
                      v-model="paymentSetting.endingDate"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t('penalityFiveDaysPercentage') }}
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
                      {{ $t('penaltyPerTenDaysPercentage') }}
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
                     {{ $t('penaltyPerAboveTenDaysPercentage') }}
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

              <button
                v-if="!paymentActivate"
                @click.prevent="
                  editPaymentSetting();
                  showPaymentEditingActivating = !showPaymentEditingActivating;
                "
                type="submit"
                class="bg-indigo-800 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
               {{ $t('update') }}
              </button>
              <button
                v-if="paymentActivate"
                @click.prevent="
                  activatePaymentSetting();
                  showPaymentEditingActivating = !showPaymentEditingActivating;
                "
                type="submit"
                class="bg-indigo-800 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
               {{ $t('activate') }}
              </button>
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
                <h2 class="text-md text-green-800"> {{ $t('success') }}!</h2>
              </div>
              <p class="text-blue-800 text-md ml-8">
                {{ successMessage }}
              </p>
              <button
                @click="showSuccess = false"
                class="ml-8 mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
              {{ $t('ok') }}
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
                <h2 class="text-sm font-bold text-gray-800">{{ $t('error') }}!</h2>
              </div>
              <p class="text-gray-600 text-sm">
                {{ errorMessage }}
              </p>
              <button
                @click="showError = false"
                class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
              {{ $t('ok') }}
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
export default {
  name: "paymentsView",
  data() {
    return {
      //fields

      paymentSettingCreated: 0,
      showSuccess: false,
      showError: false,
      showPaymentEditingActivating: false,
      successMessage: "Payment Setting Activated Successfully",
      errorMessage: "There is error during activation. Please try again",

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
              this.paymentActivate = false;
            }
            this.paymentSetting = response.data.paymentSetting;

            this.paymentSetting.startingDate =
              this.paymentSetting.formattedStartDate;

            this.paymentSetting.endingDate =
              this.paymentSetting.formattedEndDate;

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
      if (
        this.paymentSetting.regularAmount == "" ||
        this.paymentSetting.activeMonth === "" ||
        this.paymentSetting.startingDate == "" ||
        this.paymentSetting.endingDate == "" ||
        this.paymentSetting.penalityLate5Days == "" ||
        this.paymentSetting.penalityLate10Days == "" ||
        this.paymentSetting.penalityLateAbove10Days == "" ||
        this.paymentSetting.regFeeRate == ""
      ) {
        this.fillAllfields = true;
        return;
      } else if (
        new Date(this.paymentSetting.startingDate) >
        new Date(this.paymentSetting.endingDate)
      ) {
        this.startDateLessEndDate = true;
        return;
      } else if (
        Number(this.paymentSetting.penalityLate5Days) >
        Number(this.paymentSetting.penalityLate10Days)
      ) {
        console.log("5-10");
        this.startDateLessEndDate = false;
        this.fillAllfields = false;
        this.fiveDayLessTenDay = true;
        return;
      } else if (
        Number(this.paymentSetting.penalityLate10Days) >
        Number(this.paymentSetting.penalityLateAbove10Days)
      ) {
        console.log("up 10", this.paymentSetting.penalityLate10Days);
        this.startDateLessEndDate = false;
        this.fillAllfields = false;
        this.fiveDayLessTenDay = false;
        this.tenDayLessAboveTenDay = true;
        console.log("10-a10");
        console.log("> 10", this.paymentSetting.penalityLateAbove10Days);
        return;
      } else {
        this.startDateLessEndDate = false;
        this.fillAllfields = false;
        this.fiveDayLessTenDay = false;
        this.tenDayLessAboveTenDay = false;
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
      console.log(regularData);
      console.log("payment Dataaa", regularData);
      this.$apiClient
        .post("/api/v1/paymentSetting/", regularData)
        .then((response) => {
          console.log("response", response);
          if (response.data.status === 1) {
            this.showSuccess = true;
            this.successMessage = response.data.message;
            this.paymentSettingCreated = 1;
          } else {
            console.log("data is note inserted");
          }
        })
        .catch((error) => {
          this.showError = true;
          this.errorMessage = error.response.data.message;
        });
    },

    editPaymentSetting() {
      console.log("paymentId inc lose", this.paymentId);

      if (this.paymentSetting.activeMonth == "") {
        this.paymentSetting.activeMonth =
          this.paymentSetting.startingDate.split("-")[1];
      }

      const regularData = {
        regularAmount: this.paymentSetting.regularAmount,
        subsidyAmount: this.paymentSetting.subsidyAmount,
        urgentAmount: this.paymentSetting.urgentAmount,
        serviceAmount: this.paymentSetting.serviceAmount,
        regFeeRate: this.paymentSetting.regFeeRate,
        activeMonth: this.paymentSetting.activeMonth,
        activeYear: this.paymentSetting.activeYear,
        startingDate: this.paymentSetting.startingDate,
        endingDate: this.paymentSetting.endingDate,
        penalityLate5Days: this.paymentSetting.penalityLate5Days,
        penalityLate10Days: this.paymentSetting.penalityLate10Days,
        penalityLateAbove10Days: this.paymentSetting.penalityLateAbove10Days,
        id: this.paymentSetting._id,
      };

      console.log("regular data check it", regularData);

      this.$apiClient
        .put(`/api/v1/paymentSetting/${this.paymentSetting._id}`, regularData)
        .then((response) => {
          if (response.data.status === 1) {
            this.showSuccess = true;
            this.successMessage = response.data.message;
          }
        })
        .catch((error) => {
          this.showError = true;
          this.errorMessage = error.response.data.message;
        });
    },
    activatePaymentSetting() {
      console.log("paymentId inc lose", this.paymentId);
      const regularData = {
        regularAmount: this.paymentSetting.regularAmount,
        subsidyAmount: this.paymentSetting.subsidyAmount,
        urgentAmount: this.paymentSetting.urgentAmount,
        serviceAmount: this.paymentSetting.serviceAmount,
        regFeeRate: this.paymentSetting.regFeeRate,
        activeMonth: this.paymentSetting.activeMonth,
        activeYear: this.paymentSetting.activeYear,
        startingDate: this.paymentSetting.startingDate,
        endingDate: this.paymentSetting.endingDate,
        penalityLate5Days: this.paymentSetting.penalityLate5Days,
        penalityLate10Days: this.paymentSetting.penalityLate10Days,
        penalityLateAbove10Days: this.paymentSetting.penalityLateAbove10Days,
      };
      this.$apiClient
        .post("/api/v1/paymentSetting", regularData)
        .then((response) => {
          console.log("Update response", response.data);
          if (response.data.status === 1) {
            this.showSuccess = true;
            this.successMessage = response.data.message;
            this.paymentActivate = false;
            this.paymentSettingCreated = 1;
          }
        })
        .catch((error) => {
          this.showError = true;
          this.errorMessage = error.response.data.message;
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
