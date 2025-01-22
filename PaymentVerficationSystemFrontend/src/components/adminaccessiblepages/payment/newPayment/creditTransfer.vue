<template>
  <div>
 
    <Toast ref="toast"/>
    <div v-if="role==='SuperAdmin'" class="mt-5 p-5 mx-0 rounded-lg ">
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
          placeholder="Transfer Date"
        />

       
      </div>
      <div class="mb-4 flex flex-col lg:flex-row mx-0 lg:mx-32">
        <label class="custom-label w-1/3 mt-3"> Ref Number: </label>
        <input
          type="text"
          class="custom-input text-xs"
          v-model="refNumber"
          placeholder="Ref Number"
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
         
        </div>
      </div>




      <div class="w-2/3 mx-auto">
        <div v-for="(attachment, index) in attachmentsData" :key="index" class="attachment-item">
          <div class="border-b border-gray-300 shadow-lg mb-3" v-if="attachment.fileType.startsWith('image/')">
            <img :src="'data:image/jpeg;base64,' + attachment.fileData" :alt="attachment.name"
              class="attachment-image m-4 w-1/2 " style=" height: auto;" />
            <div class="m-4 text-blue-800">

              <p>Type: {{ attachment.fileType }}</p>
              <p>Name: {{ attachment.filename }}</p>
              <p>Uploaded Date: {{ attachment.uploadedDate }}</p>
              <div class="flex flex-row space-x-4 my-4 ">
                <a href="#" @click="$removeAttachment(attachmentsData, index)" class="text-blue-500">Remove</a>
              </div>
            </div>
          </div>

          <!-- If the attachment is a PDF -->
          <div class="border-b border-gray-300 shadow-lg mb-3" v-if="attachment.fileType === 'application/pdf'">
            <iframe :src="'data:application/pdf;base64,' + attachment.fileData" class="attachment-pdf m-4 scroll-hidden"
              frameborder="0" style="width: 100%; height: 100px;"></iframe>
            <div class="m-4 text-blue-800">

              <p>Type: {{ attachment.fileType }}</p>
              <p>Name: {{ attachment.filename }}</p>
              <p>Uploaded Date: {{ attachment.uploadedDate }}</p>


              <div class="flex flex-row space-x-4 my-4 ">
                <a href="#" @click="$removeAttachment(attachmentsData, index)" class="text-blue-500">Remove</a>
                <a :href="this.$getPdfBlobUrl(attachment.fileData)" target="_blank" class="text-blue-500">
                  View Pdf
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          class="border-2 border-dashed border-blue-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500"
          :class="{ 'border-blue-400 bg-blue-50': isDragging }" @dragover.prevent="$toggleDragState(this, true)"
          @dragleave="$toggleDragState(this, false)" @drop.prevent="$handleFileInput($event, 'drop', addFiles)">
          <p v-if="length === 0" class="text-center">
            Drag & drop images or PDFs here, or click to select
          </p>
          <input type="file" accept="image/*,application/pdf" class="hidden" ref="fileInput" multiple
            @change="$handleFileInput($event, 'input', addFiles)" />
          <button type="button" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            @click="$triggerFileInput($refs.fileInput)">
            Browse Files
          </button>
          <p class="text-blue-500">Add User Attachment (either Image or PDF)</p>
        </div>
      </div>
      <div class="w-2/3 mx-auto mt-5">
        <button
            @click.prevent="addCreditTransfer()"
            class="custom-button w-full lg:w-1/4"
          >
            <i class="fa fa-arrow-right"></i> Submit
          </button>
      </div>
     
    </div>

    
    <div v-else class="mx-5">
      <p class="text-pink-800">You have no permision to make transfer payments !!! </p>
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
  //


      attachmentsData: [ ], 

      length:0,
      // Array to store uploaded files and metadata
      isDragging: false, // To style drag area on drag events

      //
      role:"",
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
      refNumber:"",

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
 created(){
 this.role=localStorage.getItem("role");
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


async addFiles(fileList) {
  const newFiles = await this.$processFilesToAdd(fileList); // Process the files
  this.attachmentsData = [...(this.attachmentsData || []), ...newFiles]; // Merge old and new files
}

,
//

    async addCreditTransfer() {
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
      if(!this.refNumber.isNull){
        this.showError = true;
        this.errorMessage = "Reference Number is required";
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
   
      console.log("payload",payload);

      //


      const fileArray = this.attachmentsData.map((file) => {
        console.log(file.fileData, file.filename, file.fileType);
        return this.$base64ToFile(file.fileData, file.filename, file.fileType);
      });


      const formData = new FormData();
      formData.append("transferCase","bankTransfer");
      formData.append("transferType", this.transferType);
      formData.append("fromBankType", this.fromBankType);
      formData.append("toBankType", this.toBankType);
      formData.append("transferDate", this.transferDate);
      formData.append("amount", this.amount);
      formData.append("refNumber",this.refNumber);
      formData.append("reason", this.reason);
      formData.append("orgId",this.orgId);
      formData.append("transferCase","bankTransfer");
      formData.append("organization", this.organization);
      fileArray.forEach(file => {
        formData.append('attachments', file); // Attach files to the form data
      });

      const customHeaders = {
        "Content-Type": "multipart/form-data",
      };
     try {await this.$apiPost("api/v1/payments/transferFunds", formData,customHeaders)
        .then((response) => {
          console.log("response", response);
          if (response.status === 1) {
            this.$refs.toast.showSuccessToastMessage(response.message);
          }
        })
      }catch(error) {
          console.log("error", error.status, error.message);
           this.showError = true;
           this.errorMessage = error.message;
        }finally{

      }
    },
  },
};
</script>