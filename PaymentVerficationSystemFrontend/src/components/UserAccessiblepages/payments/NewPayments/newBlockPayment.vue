<template>
  <div class="">
    <form class="px-5 py-5">
      <h2 class="text-3xl font-bold mb-6">Regular Payment</h2>
      <div class="mb-4">
        <label
          class="block text-2xl font-medium text-gray-700 sm:text-xl md:text-2xl"
        >
          Amount
          <span class="text-red-500 ml-1">*</span>
        </label>
        <input
          type="number"
          id="closeAmount"
          class="h-12 w-full sm:w-full md:w-full lg:w-full xl:w-3/4 px-4 py-2 border border-gray-500 rounded-lg mt-2 ml-3 focus:border-indigo-800"
          v-model="close.amount"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-2xl font-medium text-gray-700 sm:text-xl md:text-2xl"
        >
          Deposited Date
          <span class="text-red-500 ml-1">*</span>
        </label>
        <input
          type="Date"
          id="closeAmount"
          class="h-12 w-full sm:w-full md:w-full lg:w-full xl:w-3/4 px-4 py-2 border border-gray-500 rounded-lg mt-2 ml-3 focus:border-indigo-800"
          v-model="close.depositDate"
        />
      </div>

      <div class="mb-4">
        <label
          class="block text-2xl font-medium text-gray-700 sm:text-xl md:text-2xl"
        >
          Deposited To Bank:
          <span class="text-red-500 ml-1">*</span>
        </label>
        <select
          v-model="close.bankType"
          id="startDay"
          class="h-12 w-full sm:w-full md:w-full lg:w-full xl:w-3/4 px-4 py-2 border border-gray-500 rounded-lg mt-2 ml-3 focus:border-indigo-800"
        >
          <option value="" disabled>Select Bank Type</option>
          <option
            v-for="blockBankAccount in blockBankAccounts"
            :key="blockBankAccount._id"
            :value="blockBankAccount._id"
          >
            {{ blockBankAccount.bankType }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label
          class="block text-xl font-medium text-gray-700 sm:text-xl md:text-2xl mt-3"
        >
          Deposited By Account:
          <span class="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          id="bank_account"
          class="h-12 w-full sm:w-full md:w-full lg:w-full xl:w-3/4 px-4 py-2 border border-gray-500 rounded-lg mt-2 ml-3 focus:border-indigo-800"
          v-model="close.depositedFromBankAccount"
        />
      </div>

      <div class="mb-4">
        <label
          class="block text-xl font-medium text-gray-700 sm:text-xl md:text-2xl mt-3"
        >
          Reference Id
          <span class="text-red-500 ml-1">*</span>
        </label>
        <input
          type="Text"
          id="bank_account"
          class="h-12 w-full sm:w-full md:w-full lg:w-full xl:w-3/4 px-4 py-2 border border-gray-500 rounded-lg mt-2 ml-3 focus:border-indigo-800"
          v-model="close.bankReferenceId"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-2xl font-medium text-gray-700 sm:text-xl md:text-2xl"
        >
          Month:
          <span class="text-red-500 ml-1">*</span>
        </label>
        <select
          v-model="close.month"
          id="startDay"
          class="h-12 w-full sm:w-full md:w-full lg:w-full xl:w-3/4 px-4 py-2 border border-gray-500 rounded-lg mt-2 ml-3 focus:border-indigo-800"
        >
        <option value="" disabled>Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <button
        @click.prevent="displayPaymentModal = !displayPaymentModal"
        type="submit"
        class="ml-5 bg-indigo-800 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  </div>

  <div v-if="displayPaymentModal">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="font-extrabold text-xl mt-2 mb-4">
            <div class="flex flex-row">
              <div>Are You Sure To Send This Regular Payment</div>
              <div class="ml-16 mt-2" @click="closeModal">
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
          </div>
          <div
            class="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300"
          >
            <h2 class="text-xl font-semibold mb-4">Receipt</h2>
            <div class="flex mb-4">
              <div class="w-1/2">
                <div class="flex flex-row">
                  <label class="block text-lg font-medium text-gray-700"
                    >Amount:
                  </label>
                  <p class="ml-10 text-gray-900 text-lg">{{ close.amount }}</p>
                </div>
                <div class="flex flex-row">
                  <label class="block text-lg font-medium text-gray-700"
                    >Deposit Date:</label
                  >
                  <p class="ml-10 text-gray-900 text-lg">
                    {{ close.depositDate }}
                  </p>
                </div>

                <div class="flex flex-row">
                  <label class="block text-lg font-medium text-gray-700"
                    >companyBankType:</label
                  >

                  <p class="text-gray-900 text-lg">
                    {{ close.companyBankType }}
                  </p>
                </div>

                <div class="flex flex-row">
                  <label class="block text-lg font-medium text-gray-700"
                    >depositedFromBankAccount:
                  </label>

                  <p class="ml-10 text-gray-900 text-lg">
                    {{ close.depositedFromBankAccount }}
                  </p>
                </div>
                <div class="flex flex-row">
                  <label class="block text-lg font-medium text-gray-700"
                    >Bank Reference Id:
                  </label>

                  {{ close.depositedFromBankAccount }}
                </div>

                <div class="flex flex-row">
                  <label class="block text-lg font-medium text-gray-700"
                    >month:</label
                  >

                  <p class="ml-10 text-gray-900 text-lg">{{ close.month }}</p>
                </div>
              </div>
              <div class="w-1/2"></div>
            </div>
            <button
              @click="
                insertRegularData()"
              class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded"
            >
              Send
            </button>
          </div>
          <hr class="my-4 md:min-w-full bg-red-500" />
        </div>
      </div>
    </transition>
  </div>




  <div v-if="requestSuccess">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96">
              <div class="flex items-center justify-center mb-4">
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
                <h2 class="text-2xl font-bold text-gray-800">Success!</h2>
              </div>
              <p class="text-gray-600 text-2xl">Regular Payment Requested successfully</p>
              <button @click="requestSuccess = !requestSuccess"
                class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
             OK
              </button>
            </div>
          </div>
          <hr class="my-4 md:min-w-full bg-red-500" />
        </div>
      </div>
    </transition>
  </div>

  <div v-if=" noAllowedSecondRequest">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96">
              <div class="flex items-center justify-center mb-4">
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
                <h2 class="text-2xl font-bold text-gray-800">Success!</h2>
              </div>
              <p class="text-gray-600 text-2xl">You are not allowed to request before your current request is confirmed??</p>
              <button @click=" noAllowedSecondRequest = ! noAllowedSecondRequest"
                class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
             OK
              </button>
            </div>
          </div>
          <hr class="my-4 md:min-w-full bg-red-500" />
        </div>
      </div>
    </transition>
  </div>



</template>

<script>
import axios from "axios";
export default {
  name: "newBlockPayment",
  data() {
    return {

      noAllowedSecondRequest:false,

      blockBankAccounts: "",
      displayPaymentModal: false,
      paymentType: "regularClosePayment",
      paymentId: "662b2b824d193be52fd89657",
      userId: "663f220b664ec7097cda8493",
      requestSuccess: false,
      sendPayment: false,
      close: {
        amount: "",
        depositDate: "",
        bankType: "",
        bankAccount: "",
        referenceId: "",
        depositedFromBankAccount: "",
        month: "",
      },
      requestedDate: null,
    };
  },

  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });
  },

  mounted() {
    console.log("on mounted");
    this.apiClient.get("/api/v1/organization").then((response) => {
      console.log("response for organization", response);
      if (response.data !== null) {
        this.blockBankAccounts = response.data.organization.blockBankAccounts;
      } else {
        console.log("response in the else");
      }
    });
  },

  methods: {
    insertRegularData() {
      this.showPaymentDetail=false;
      const regularHistoryData = {
        userId: this.userId,
        paymentType: this.paymentType,
        debitAmount: this.close.amount,
        depositDate: this.close.depositDate,
        companyBankTypeId: this.close.bankType,
        debitAccountNumber: this.close.depositedFromBankAccount,
        bankReferenceId: this.close.bankReferenceId,
        month: this.close.month,
      };
      console.log("regular", regularHistoryData);
      this.displayPaymentModal = !this.displayPaymentModal;
      this.apiClient
        .post("/api/v1/closeHistory", regularHistoryData)
        .then((response) => {
          console.log("response", response);
          if (response.data.status===1) {
            this.displayPaymentModal = !this.displayPaymentModal;
            this.requestSuccess = true;
          } else {
            this.noAllowedSecondRequest=true;
          }
        });
    },
    closeModal() {
      this.displayPaymentModal = false;
      this.sendPayment = true;
    },

    showPaymentDetail() {
      this.displayPaymentModal1 = true;
    },
  },
};
</script>
