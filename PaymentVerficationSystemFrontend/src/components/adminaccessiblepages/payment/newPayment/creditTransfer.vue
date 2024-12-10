<template>
  <div>
    <transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transform transition duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="showSuccessToast"
        class="z-20 fixed right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
        role="alert"
      >
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline">{{ successToastMessage }}</span>
      </div>
    </transition>

    <transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transform transition duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="showErrorToast"
        class="z-20 fixed right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
        role="alert"
      >
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ errorToastMessage }}</span>
      </div>
    </transition>

    <div class="border border-gray-300 mt-5 p-5">
      <div class="mb-4">
        <label class="custom-label"> Transfer Type: </label>
        <select
          name="type"
          id=""
          class="custom-input text-xs"
          v-model="transferType"
        >
          <option value="" disabled>Select Transfer Type</option>
          <option value="block">Block</option>
          <option value="service">Service</option>
        </select>
        <p v-if="selectTransferType" class="text-red-500 text-xs mt-2">
          Please Select Transfer Type!
        </p>
      </div>

      <div class="mb-4">
        <label class="custom-label"> Transfer From: </label>
        <select
          name="type"
          id=""
          class="custom-input text-xs"
          v-model="fromBankType"
        >
          <option value="" disabled>Transfer From</option>

          <template v-if="transferType === 'block'">
            <option
              v-for="(bank, index) in blockBanks"
              :key="'block-' + index"
              :value="bank.bankType"
            >
              {{ bank.bankType }}
            </option>
          </template>
          <template v-else-if="transferType === 'service'">
            <option
              v-for="(bank, index) in serviceBanks"
              :key="'service-' + index"
              :value="bank.bankType"
            >
              {{ bank.bankType }}
            </option>
          </template>
        </select>
        <p v-if="selectTransferFrom" class="text-red-500 text-xs mt-2">
          Please select a bank from where to be transfer!
        </p>
      </div>
      <div class="mb-4">
        <label class="custom-label"> Transfer to: </label>
        <select
          name="type"
          id=""
          class="custom-input text-xs"
          v-model="toBankType"
        >
          <option value="" disabled>Transfer To</option>
          <template v-if="transferType === 'block'">
            <option
              v-for="(bank, index) in blockBanks"
              :key="'block-' + index"
              :value="bank.bankType"
            >
              {{ bank.bankType }}
            </option>
          </template>
          <template v-else-if="transferType === 'service'">
            <option
              v-for="(bank, index) in serviceBanks"
              :key="'service-' + index"
              :value="bank.bankType"
            >
              {{ bank.bankType }}
            </option>
          </template>
        </select>

        <p v-if="selectTransferTo" class="text-red-500 text-xs mt-2">
          Please select a bank to where to be transfer!
        </p>
        <p v-if="notEqualFromTo" class="text-red-500 text-xs mt-2">
          Transfer to and transfer from can not be equal!
        </p>
      </div>

      <div class="mb-4">
        <label class="custom-label"> Amount: </label>
        <input
          type="number"
          class="custom-input text-xs"
          v-model="amount"
          placeholder="Amount"
        />
        <p v-if="enterAmount" class="text-red-500 text-xs mt-2">
          Please Enter Amount!
        </p>
        <p v-if="amountNotZero" class="text-red-500 text-xs mt-2">
          Amount can not be zero!
        </p>
      </div>
      <div class="mb-4">
        <label class="custom-label"> Transfer Date: </label>
        <input
          type="date"
          class="custom-input text-xs"
          v-model="transferDate"
          placeholder="Amount"
        />
        <p v-if="enterTransferDate" class="text-red-500 text-xs mt-2">
          Please Enter Transfer Date!
        </p>
      </div>
      <div class="mb-4">
        <label class="custom-label"> Reason: </label>
        <input
          type="text"
          class="custom-input text-xs"
          v-model="reason"
          placeholder="Reason"
        />
      </div>

      <button @click.prevent="addCreditTransfer()" class="custom-button">
        Submit
      </button>
    </div>

    <div v-if="showSuccess">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg-lg shadow-lg p-8 w-96">
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
                  <h2 class="text-sm font-bold text-gray-800">Success!</h2>
                </div>
                <p class="text-gray-600 text-sm">
                  <!-- Your Comany Profile Created successfully -->
                  {{ successMessage }}
                </p>
                <button
                  @click="
                    showSuccess = !showSuccess;
                    routeToDisplay();
                  "
                  class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg-full focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  <h2 class="text-sm font-bold text-gray-800">Error!</h2>
                </div>
                <p class="text-gray-600 text-sm">
                  {{ errorMessage }}
                </p>
                <button
                  @click="showError = false"
                  class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  OK
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
  name: "creditTransfer",
  data() {
    return {
      successToastMessage: "",
      errorToastMessage: "",
      showErrorToast: false,
      showSuccessToast: false,

      fromBankType: "",
      toBankType: "",
      transferType: "",
      reason: "",
      Amount: 0,
      transferDate: "",

      showError: false,
      showSuccess: false,
      successMessage: "",
      errorMessage: "",

      amountNotZero: false,
      selectTransferFrom: false,
      selectTransferTo: false,
      selectTransferType: false,
      enterAmount: false,
      notEqualFromTo: false,
    };
  },

  computed: {
    serviceBanks() {
      return this.$store.getters.serviceBanks;
    },
    blockBanks() {
      return this.$store.getters.blockBanks;
    },
  },

  methods: {
    showSuccessToastMessage(message) {
      //  alert(message);
      console.log("message", message);
      this.successToastMessage = message;
      this.showSuccessToast = true;
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 1000);

      // Toast will disappear after 3 seconds
    },
    showErrorToastMessage(message) {
      this.errorToastMessage = message;
      this.showErrorToast = true;
      setTimeout(() => {
        this.showErrorToast = false;
      }, 1000);

      // Toast will disappear after 3 seconds
    },
    addCreditTransfer() {
      console.log(
        "data",
        this.transferType,
        this.fromBankType,
        this.toBankType,
        this.transferDate,
        this.amount,
        this.reason
      );
      this.selectTransferType = false;
      this.selectTransferFrom = false;
      this.selectTransferTo = false;
      this.enterAmount = false;
      this.notEqualFromTo = false;
      this.amountNotZero = false;
      this.enterTransferDate = false;

      if (this.transferType == "") {
        this.showErrorToastMessage(
          "Transfer Type(Either service or Block)is required"
        );
        this.selectTransferType = true;
        return;
      }
      if (this.fromBankType == "") {
        this.showErrorToastMessage("Transfer-From is required");
        this.selectTransferFrom = true;
        return;
      }
      if (this.toBankType == "") {
        this.showErrorToastMessage("Transfer-To  is required");
        this.selectTransferTo = true;
        return;
      }

      if (this.fromBankType == this.toBankType) {
        //alert("Hiii")
        this.showErrorToastMessage("You can't transfer from the same bank");
        this.notEqualFromTo = true;
        return;
      }

      if (this.amount === "") {
        this.showErrorToastMessage("Amount is required");
        this.enterAmount = true;
        return;
      }

      if (this.amount == 0) {
        this.showErrorToastMessage("Amount can not be zero");
        this.amountNotZero = true;
        return;
      }

      if (this.transferDate == "") {
        this.showErrorToastMessage("Transfer Date is required");
        this.enterTransferDate = true;
        return;
      }
      // this depends on the type
      const payload = {
        transferType: this.transferType,
        fromBankType: this.fromBankType,
        toBankType: this.toBankType,
        amount: this.amount,
        reason: this.reason,
        transferDate: this.transferDate,
        // other properties
      };

      //

      this.$apiClient
        .post("api/v1/payments/transferFunds", payload)
        .then((response) => {
          console.log("response", response);
          if (response.data.status === 1) {
            this.showSuccessToastMessage(response.data.message);
          }
        })
        .catch((error) => {
          this.showErrorToastMessage("Something went wrong");
          // this.errorMessage = error.response.data.message;
          // this.showError = true;
          console.log("error", error);
        });
    },
  },
};
</script>