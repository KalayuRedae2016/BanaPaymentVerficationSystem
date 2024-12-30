<template>
  <div>
    <Toast ref="toast"/>
    <div class="border border-gray-300 mt-5 p-5 mx-0 rounded-lg">
      <div class="mb-4 flex flex-col lg:flex-row mx-0 lg:mx-32">
        <label class="custom-label w-1/3 mt-3"> Transfer Type: </label>
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
       
      </div>

      <div class="mb-4 flex flex-col lg:flex-row mx-0 lg:mx-32">
        <label class="custom-label w-1/3 mt-3"> Transfer From: </label>
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
       
      </div>
      <div class="mb-4 flex flex-col lg:flex-row mx-0 lg:mx-32">
        <label class="custom-label w-1/3 mt-3"> Transfer to: </label>
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
       
      </div>

      <div class="mb-4 flex flex-col lg:flex-row mx-0 lg:mx-32">
        <label class="custom-label w-1/3 mt-3"> amount: </label>
        <input
          type="number"
          class="custom-input text-xs"
          v-model="amount"
          placeholder="amount"
        />
        
      </div>
      <div class="mb-4 flex flex-col lg:flex-row mx-0 lg:mx-32">
        <label class="custom-label w-1/3 mt-3"> Transfer Date: </label>
        <input
          type="date"
          class="custom-input text-xs"
          v-model="transferDate"
          placeholder="amount"
        />

       
      </div>
      <div class="mb-4 flex flex-col lg:flex-row mx-0 lg:mx-32">
        <label class="custom-label w-1/3 mt-3"> Reason: </label>
        <div class="flex flex-col w-full space-y-5">
          <input
            type="text"
            class="custom-input text-xs"
            v-model="reason"
            placeholder="Reason"
          />



          <p v-if="selectTransferType" class="text-red-500 text-xs mt-2">
          Please Select Transfer Type!
        </p>
        <p v-if="selectTransferFrom" class="text-red-500 text-xs mt-2">
          Please select a bank from where to be transfer!
        </p>
        <p v-if="selectTransferTo" class="text-red-500 text-xs mt-2">
          Please select a bank to where to be transfer!
        </p>
        <p v-if="notEqualFromTo" class="text-red-500 text-xs mt-2">
          Transfer to and transfer from can not be equal!
        </p>
        <p v-if="enterAmount" class="text-red-500 text-xs mt-2">
          Please Enter amount!
        </p>
        <p v-if="amountNotZero" class="text-red-500 text-xs mt-2">
          amount can not be zero!
        </p>
        <p v-if="enterTransferDate" class="text-red-500 text-xs mt-2">
          Please Enter Transfer Date!
        </p>
        <p v-if="showError" class="text-red-500 text-xs mt-2">
          {{ errorMessage }}
        </p>
          <button
            @click.prevent="addCreditTransfer()"
            class="custom-button w-full lg:w-1/4"
          >
            <i class="fa fa-arrow-right"></i> Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import Toast from '../../../Common/Toast.vue';

export default {
  components:{
      Toast,
  },
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
      amount: 0,
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
      this.showError = false;

      if (this.transferType == "" || this.transferType==null) {
       //this.$refs.toast.showErrorToastMessage("Transfer Type(Either service or Block)is required");
        this.selectTransferType = true;
        return;
      }
      if (this.fromBankType == "" || this.fromBankType==null) {
       // this.showErrorToastMessage("Transfer-From is required");
        this.selectTransferFrom = true;
        return;
      }
      if(this.amount =='' || this.amount==null)
      if (this.toBankType == "" || this.toBankType==null) {
        //this.$refs.toast.showErrorToastMessage("Transfer-To  is required");
        this.selectTransferTo = true;
        return;
      }

      if (this.fromBankType == this.toBankType) {
        //alert("Hiii")
        //this.showErrorToastMessage("You can't transfer from the same bank");
        this.notEqualFromTo = true;
        return;
      }

      if (this.amount === "" || this.amount==null ||this.ammount===0) {
        //this.showErrorToastMessage("amount is required");
        this.enterAmount = true;
        return;
      }



      if (this.transferDate == "") {
        //this.showErrorToastMessage("Transfer Date is required");
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
            this.$refs.toast.showSuccessToastMessage(response.data.message);
          }
        })
        .catch((error) => {

          console.log("error", error);
 
           this.showError = true;
           this.errorMessage = error.response.data.message;
        });
    },
  },
};
</script>