<template>
  <div>
  <div class="border border-gray-300 mt-5 p-5">
    <div class="mb-4">
      <label class="custom-label"> Transfer Type: <span v-if="selectTransferType" class="text-red-500">Please Select Transfer Type!</span> </label>
      <select name="type" id="" class="custom-input text-xs" v-model="transferType">
        <option value="" disabled>Select Transfer Type</option>
        <option value="block">Block</option>
        <option value="service">Service</option>
      </select>
    </div>
    <div class="mb-4">
      <label class="custom-label"> Transfer From:  <span v-if="selectTransferFrom" class="text-red-500">Please select a bank from where to be transfer!</span></label>
      <select name="type" id="" class="custom-input text-xs" v-model="fromBankType">
        <option value="" disabled >Transfer From</option>
        <option 
    v-for="(bank, index) in $blockBanks" 
    :key="index" 
    :value="bank.bankType">
    {{ bank.bankType }}
  </option>
     
      </select>
    </div>
    <div class="mb-4">
      <label class="custom-label"> Transfer to:  <span v-if="selectTransferTo" class="text-red-500">Please select a bank to where to be transfer!</span>
        <span v-if="notEqualFromTo" class="text-red-500">Transfer to and transfer from can not be equal!</span>
      </label>
      <select name="type" id="" class="custom-input text-xs" v-model="toBankType">
        <option value="" disabled >Transfer To</option>
        <option value="LIB">LIB</option>
        <option value="WEGAGEN">WEGAGEN</option>
        <option value="CBE">CBE</option>
      </select>
    </div>
    
    <div class="mb-4">
      <label class="custom-label"> Amount: <span v-if="enterAmount" class="text-red-500">Please Enter Amount!</span></label>
      <input type="number" class="custom-input text-xs" v-model="amount" placeholder="Amount" />
    </div>
    <div class="mb-4">
      <label class="custom-label"> Transfer Date: <span v-if="enterTransferDate" class="text-red-500">Please Enter Transfer Date!</span></label>
      <input type="date" class="custom-input text-xs" v-model="transferDate" placeholder="Amount" />
    </div>
    <div class="mb-4">
      <label class="custom-label"> Reason: </label>
      <input type="text" class="custom-input text-xs" v-model="reason" placeholder="Reason" />
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


      fromBankType :"",
      toBankType: "",
      transferType: "",
      reason:"",
      Amount: 0,
      transferDate:"",



      showError: false,
      showSuccess: false,
      successMessage: "",
      errorMessage: "",

      selectTransferFrom: false,
      selectTransferTo: false,
      selectTransferType:false,
      enterAmount: false,
      notEqualFromTo: false,

    };
  },
  methods: {
    addCreditTransfer() {
      console.log("transferto",this.toBankType);
      this.selectTransferType = false;
      this.selectTransferFrom = false;
      this.selectTransferTo= false;
      this.enterAmount = false;
      this.notEqualFromTo = false;
   
     if(this.transferType == ""){
      this.selectTransferType = true;
      return;
     }
     if(this.fromBankType == ""){
      this.selectTransferFrom = true;
      return;
     }
     if(this.fromBankType==this.toBankType) {
      this.notEqualFromTo = true;
      return;
     }
     if(this.toBankType == ""){
      this.selectTransferTo= true;
      return;
     }

    if(this.amount == 0){
      this.enterAmount=true;
      return
    }
   if(this.transferDate==""){
     this.enterTransferDate=true;
     return
   }
   // this depends on the type
      const payload = {
        transferType: this.transferType,
        fromBankType: this.fromBankType,
        toBankType: this.toBankType,
        amount:this.amount,
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
            this.successMessage = response.data.message;
            this.showSuccess = true;
          } else {
            this.warningMessage = response.data.message;
            this.showWarning = true;
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.showError = true;
          console.log("error", error);
        });
    },
  },
};
</script>