<template>
  <div class="">
    <form class="px-5 py-5">
      <h2 class="text-2xl font-bold mb-6">Service Payment</h2>
      <div class="mb-4">
        <label
          class="block text-2xl font-medium text-gray-700 sm:text-xl md:text-2xl"
        >
          Amount
          <span class="text-red-500 ml-1">*</span>
        </label>
        <input
          type="number"
          id="serviceAmount"
          class="w-full sm:w-full md:w-full lg:w-full xl:w-3/4 px-4 py-2 border border-gray-500 rounded-lg mt-2 ml-3 focus:border-indigo-800"
          v-model="service.amount"
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
          id="serviceAmount"
          class="w-full sm:w-full md:w-full lg:w-full xl:w-3/4 px-4 py-2 border border-gray-500 rounded-lg mt-2 ml-3 focus:border-indigo-800"
          v-model="service.depositDate"
        />
      </div>

      <div class="mb-4">
        <label
          class="block text-2xl font-medium text-gray-700 sm:text-xl md:text-2xl"
        >
          Bank Type
          <span class="text-red-500 ml-1">*</span>
        </label>
        <select
          v-model="service.bankType"
          id="startDay"
          class="w-full sm:w-full md:w-full lg:w-full xl:w-3/4 px-4 py-2 border border-gray-500 rounded-lg mt-2 ml-3 focus:border-indigo-800"
        >
          <option value="" disabled>Select Bank Type</option>
          <option
            v-for="serviceBankAccount in serviceBankAccounts"
            :key="serviceBankAccount._id"
            :value="serviceBankAccount._id"
          >
            {{ serviceBankAccount.bankType }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label
          class="block text-2xl font-medium text-gray-700 sm:text-xl md:text-2xl mt-3"
        >
          Bank Account
          <span class="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          id="bank_account"
          class="w-full sm:w-full md:w-full lg:w-full xl:w-3/4 px-4 py-2 border border-gray-500 rounded-lg mt-2 ml-3 focus:border-indigo-800"
          v-model="service.bankAccount"
        />
      </div>

      <div class="mb-4">
        <label
          class="block text-2xl font-medium text-gray-700 sm:text-xl md:text-2xl mt-3"
        >
          Reference Id
          <span class="text-red-500 ml-1">*</span>
        </label>
        <input
          type="Text"
          id="bank_account"
          class="w-full sm:w-full md:w-full lg:w-full xl:w-3/4 px-4 py-2 border border-gray-500 rounded-lg mt-2 ml-3 focus:border-indigo-800"
          v-model="service.referenceId"
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
          v-model="service.month"
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
              <div>Are You Sure To Send This Payment</div>
              <div class="ml-16 mt-2" @click="serviceModal">
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
                  <label class="block text-2xl font-medium text-gray-700 mr-5"
                    >Amount:
                  </label>
                {{ service.amount }}
                </div>
                <div class="flex flex-row">
                  <label class="block text-2xl font-medium text-gray-700 mr-5"
                    >Deposit Date:</label
                  >
                  
                    {{ service.depositDate }}
             
                </div>

                <div class="flex flex-row">
                  <label class="block text-2xl font-medium text-gray-700 mr-5"
                    >companyBankType:</label
                  >

                  
                    {{ service.companyBankType }}
              
                </div>

                <div class="flex flex-row">
                  <label class="block text-2xl font-medium text-gray-700 mr-5"
                    >depositedFromBankAccount:
                  </label>

                
                    {{ service.depositedFromBankAccount }}
                 
                </div>
                <div class="flex flex-row">
                  <label class="block text-2xl font-medium text-gray-700 mr-5"
                    >Bank Reference Id:
                  </label>

                  {{ service.depositedFromBankAccount }}
                </div>

                <div class="flex flex-row">
                  <label class="block text-2xl font-medium text-gray-700 mr-5"
                    >month:</label
                  >

                 {{ service.month }}
                </div>
              </div>

            </div>
            <button
              @click="
                insertServiceData();
                serviceModal();
              "
              class="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-semibold py-2 px-4 rounded"
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
              <p class="text-gray-600 text-2xl">Service Payment Created successfully</p>
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



  <div v-if="noAllowedSecondRequest">
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
              <button @click="noAllowedSecondRequest = ! noAllowedSecondRequest"
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
      serviceBankAccounts: "",
      userId: "663f220b664ec7097cda8493",
      sendPayment: false,
      paymentType:"servicePayment",
      service: {
        amount: "",
        depositDate: "",
        bankType: "",
        bankAccount: "",
        referenceId: "",
      },
      requestedDate: null,
      displayPaymentModal: false,
    };
  },

  mounted() {
   // alert("on mounted");
    console.log("on mounted");
    this.apiClient.get("/api/v1/organization").then((response) => {
      console.log("response for organization", response);
      if (response.data !== null) {
        this.serviceBankAccounts =
          response.data.organization.serviceBankAccounts;
      } else {
        console.log("response in the else");
      }
    });
  },
  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });
  },

  methods: {
    insertServiceData() {
     this.displayPaymentModal=false
      const serviceData = {
        paymentType: this.paymentType,
        debitAmount: this.service.amount,
        depositDate: this.service.depositDate,
        companyBankTypeId: this.service.bankType,
        debitAccountNumber: this.service.bankAccount,
        ReferenceId: this.service.referenceId,
        paymentRequestDate: this.requestedDate,
        rejectedDate: "",
        confirmedDate: "",
        userId: this.userId,
      };
      console.log(serviceData);
      this.apiClient
        .post("/api/v1/serviceHistory",  serviceData)
        .then((response) => {
          console.log("response", response);
          if (response.data.status===1) {
            this.displayPaymentModal = !this.displayPaymentModal;
            this.requestSuccess = true;
          } else {
            this.noAllowedSecondRequest=true;
          }
        });
      this.displayPaymentModal = !this.displayPaymentModal;
    },
    serviceModal() {
      this.displayPaymentModal = false;
      this.sendPayment = true;
    },

    showPaymentDetail() {
      this.displayPaymentModal1 = true;
    },
  },
};
</script>
