<template>
  <div>
    <Toast ref="toast" />

    <div>
      <div class="overflow-x-auto h-96">
        <table class="w-full border-b border-t border-gray-300">
          <thead>
            <tr class="bg-blue-50 text-xs text-blue-500">
              <th
                class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
              >
                Offset Type
              </th>
              <th
                class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
              >
               Offseted From
              </th>
              <!-- <th
                class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
              >
                Offseted By
              </th> -->
              <th
                class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
              >
                Offset Date
              </th>
              <th
                class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
              >
                Amount
              </th>
              <th
                class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
              >
               Ref Number
              </th>
              <th
                class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
              >
                Reason
              </th>
              <th
                v-if="role === 'SuperAdmin'"
                class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="text-xs">
            <tr
              class="hover:bg-blue-100 border-t border-b border-gray-300"
              v-for="searchedTransferedPayment in paymentTransfersss"
              :key="searchedTransferedPayment._id"
            >
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                <p
                  v-if="searchedTransferedPayment.transferType === 'block'"
                  class="px-2 rounded-lg"
                >
                  {{ searchedTransferedPayment.transferType.toUpperCase() }}
                </p>
                <p v-else class="bg-yellow-100 px-2 rounded-lg">
                  {{ searchedTransferedPayment.transferType.toUpperCase() }}
                </p>
              </td>
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                {{ searchedTransferedPayment.fromBankType }}
              </td>
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                {{ searchedTransferedPayment.toBankType }}
              </td>
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                {{ searchedTransferedPayment.formattedTransferDate }}
              </td>
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                {{ searchedTransferedPayment.amount }}
              </td>
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                {{ searchedTransferedPayment.refNumber }}
              </td>
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                {{ searchedTransferedPayment.reason }}
              </td>
              <td
                v-if="role === 'SuperAdmin'"
                class="flex flex-row space-x-2 p-3 text-md text-blue-500 whitespace-nowrap"
              >
                <button
                  class="custom-button"
                  @click="
                    showEditTransferForm = true;
                    paymentToBeEdited = searchedTransferedPayment;
                    createOffset = false;
                  "
                >
                  <i class="fa fa-edit"></i>Edit
                </button>

                <button
                  @click="
                    showDelateModal = !showDelateModal;
                    paymentToBeDelated = searchedTransferedPayment;
                  "
                  class="bg-red-500 text-white px-2 py-2 rounded flex items-center space-x-1 hover:bg-red-600"
                >
                  <i class="fas fa-trash"></i>
                  <span></span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    
        <button
          class="custom-button m-5"
          @click="
            showEditTransferForm = true;
            paymentToBeEdited = {
              transferType: '',     // Reset dropdown
              fromBankType: '',       // Reset text field
              toBankType: '',         // Reset text field
              transferDate: '',       // Reset date field
              amount: 0,              // Reset numeric field
              reason: '',             // Reset text field
              refNumber: ''           // Reset text field
            };
            createOffset = true;
          "
        >
       <i class="fa fa-plus"></i>   New Offset
        </button>
      </div>
    </div>
    <div v-if="showEditTransferForm">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <div
            class="bg-white rounded-lg p-6 border border-cyan-500 px-5 w-2/3"
          >
          <div class="flex flex-row justify-between items-center">
  <div>
    <label class="custom-label text-lg font-bold">
      {{ $t("Edit Transfer Payment") }}
    </label>
  </div>
  <div>
    <svg
      @click="showEditTransferForm = !showEditTransferForm"
      class="w-6 h-6 custom-star hover:text-red-700 transition-colors duration-300 cursor-pointer"
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
              <form class="px-5 py-5">
                <div class="overflow-x-auto h-64">
                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("Offset Type") }}
                      <span class="custom-star ml-1">*</span>
                    </label>

                    <select
                      name=""
                      id=""
                      class="custom-select"
                      v-model="paymentToBeEdited.transferType"
                    >
                       <option value="" disabled> Select Account Type</option>
                      <option value="block">Block</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="custom-label w-1/3 mt-3">
                      Offseted From <span class="custom-star ml-1">*</span>
                    </label>
                    <select
                      name="type"
                      id=""
                      class="custom-input text-xs"
                      v-model="paymentToBeEdited.fromBankType"
                    >
                      <option value="" disabled>Transfer From</option>

                      <template
                        v-if="paymentToBeEdited.transferType === 'block'"
                      >
                        <option
                          v-for="(bank, index) in blockBanks"
                          :key="'block-' + index"
                          :value="bank.bankType"
                        >
                          {{ bank.bankType }}
                        </option>
                      </template>
                      <template
                        v-else-if="paymentToBeEdited.transferType === 'service'"
                      >
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
         
                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("Amount") }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="paymentToBeEdited.amount"
                      class="custom-input"
                      placeholder="Amount"
                    />
                  </div>

                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("Ref Number") }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      v-model="paymentToBeEdited.refNumber"
                      class="custom-input"
                      placeholder="Ref Number"
                    />
                  </div>

                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("Reason") }}
                      <span class="custom-star ml-1">*</span>
                    </label>

                    <input
                      type="text"
                      v-model="paymentToBeEdited.reason"
                      class="custom-input"
                      placeholder="Reason"
                    />
                  </div>
                  <div class="mt-5 mb-32">
                    <div
                      v-for="(attachment, index) in selectedAttachmentsData"
                      :key="index"
                      class="attachment-item"
                    >
                      <div
                        class="border-b border-gray-300 shadow-lg mb-3"
                        v-if="attachment.fileType.startsWith('image/')"
                      >
                        <img
                          :src="'data:image/jpeg;base64,' + attachment.fileData"
                          :alt="attachment.name"
                          class="attachment-image m-4 w-1/2"
                          style="height: auto"
                        />
                        <div class="m-4 text-blue-800">
                          <p>Type: {{ attachment.fileType }}</p>
                          <p>Name: {{ attachment.filename }}</p>
                          <p>Uploaded Date: {{ attachment.uploadedDate }}</p>
                          <div class="flex flex-row space-x-4 my-4">
                            <a
                              href="#"
                              @click="
                                $removeAttachment(
                                  selectedAttachmentsData,
                                  index
                                )
                              "
                              class="text-blue-500"
                              >Remove</a
                            >
                          </div>
                        </div>
                      </div>

                      <!-- If the attachment is a PDF -->
                      <div
                        class="border-b border-gray-300 shadow-lg mb-3"
                        v-if="attachment.fileType === 'application/pdf'"
                      >
                        <iframe
                          :src="
                            'data:application/pdf;base64,' + attachment.fileData
                          "
                          class="attachment-pdf m-4 scroll-hidden"
                          frameborder="0"
                          style="width: 100%; height: 100px"
                        ></iframe>
                        <div class="m-4 text-blue-800">
                          <p>Type: {{ attachment.fileType }}</p>
                          <p>Name: {{ attachment.filename }}</p>
                          <p>Uploaded Date: {{ attachment.uploadedDate }}</p>
                          <div class="flex flex-row space-x-4 my-4">
                            <a
                              href="#"
                              @click="
                                $removeAttachment(
                                  selectedAttachmentsData,
                                  index
                                )
                              "
                              class="text-blue-500"
                              >Remove</a
                            >
                            <a
                              :href="this.$getPdfBlobUrl(attachment.fileData)"
                              target="_blank"
                              class="text-blue-500"
                              >View Pdf</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="border-2 border-dashed border-blue-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500"
                      :class="{ 'border-blue-400 bg-blue-50': isDragging }"
                      @dragover.prevent="$toggleDragState(this, true)"
                      @dragleave="$toggleDragState(this, false)"
                      @drop.prevent="$handleFileInput($event, 'drop', addFiles)"
                    >
                      <p
                        v-if="selectedAttachmentsData.length === 0"
                        class="text-center"
                      >
                        Drag & drop images or PDFs here, or click to select
                      </p>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        class="hidden"
                        ref="fileInput"
                        multiple
                        @change="$handleFileInput($event, 'input', addFiles)"
                      />
                      <button
                        type="button"
                        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        @click="$triggerFileInput($refs.fileInput)"
                      >
                        Browse Files
                      </button>
                      <p class="text-blue-500">
                        Add User Attachment (either Image or PDF)
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  @click.prevent="handleOffsetPayment()"
                  type="submit"
                  class="custom-button"
                >
                  <i class="fas fa-save"> </i>
                  Save
                </button>
              </form>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Toast from "../../../Common/Toast.vue";

export default {
  components: {
    Toast,
  },
  name: "creditTransfer",
  data() {
    return {
      //
      attachmentsData: [],
      newAttachmentsData: [], // Array to store uploaded files and metadata
      isDragging: false,
      //
      createOffset: false,

      paymentToBeEdited: "",
      showEditTransferForm: false,
      // searchedTransferedPayments: [
      //   {
      //     _id: "1",
      //     transferType: "block",
      //     fromBankType: "LIB",
      //     toBankType: "CBE",
      //     formattedTransferDate: "2025-01-21",
      //     amount: "1000.00",
      //     reason: "service payment",
      //   },
      // ],

      paymentTransfersss: [
        {
          _id: "1",
          transferType: "block",
          fromBankType: "CBE",
          toBankType: "LIB",
          formattedTransferDate: "2025-01-21",
          amount: "1000.00",
          reason: "service payment",
          orgId: "1",
          organization: "Bana",
          refNumber: "BMrf324",
        },
      ],

      role: "",
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
      refNumber: "",

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
  created() {
    this.role = localStorage.getItem("role");
  },
  computed: {
    selectedAttachmentsData() {
    return this.createOffset ? this.newAttachmentsData : this.attachmentsData;
  },
    serviceBanks() {
      return this.$store.getters.serviceBanks;
    },
    blockBanks() {
      return this.$store.getters.blockBanks;
    },
  },

  methods: {

    async addFiles(fileList) {
      try {
        const newFiles = await this.$processFilesToAdd(fileList); // Process the files
        if (this.createOffset) {
        //  alert("new");
          // Update newAttachmentsData when createOffset is true
          this.newAttachmentsData = [...this.newAttachmentsData, ...newFiles];
          console.log("newAttachmentsData",this.newAttachmentsData);
          this.selectedAttachmentsData();
        } else {
          //alert("old");
          // Update attachmentsData when createOffset is false
          this.attachmentsData = [...this.attachmentsData, ...newFiles];
          console.log("AttachmentsData",this.attachmentsData);
          this.selectedAttachmentsData();
        }
        console.log(
          "Files successfully added:",
          this.createOffset ? this.newAttachmentsData : this.attachmentsData
        );
      } catch (error) {
        console.error("Error while adding files:", error);
      }
    },
  async handleOffsetPayment() {

    console.log(
        "data",
        this.paymentToBeEdited.transferType,
        this.paymentToBeEdited.fromBankType,
        this.paymentToBeEdited.toBankType,
        this.paymentToBeEdited.transferDate,
        this.paymentToBeEdited.amount,
        this.paymentToBeEdited.refNumber,
        this.paymentToBeEdited.reason
      );

  // console.log(
  //   "data",
  //   this.transferType,
  //   this.fromBankType,
  //   this.toBankType,
  //   this.transferDate,
  //   this.amount,
  //   this.reason
  // );
  
  // this.selectTransferType = false;
  // this.selectTransferFrom = false;
  // this.selectTransferTo = false;
  // this.enterAmount = false;
  // this.notEqualFromTo = false;
  // this.amountNotZero = false;
  // this.enterTransferDate = false;
  // this.showError = false;

  // // Validation
  // if (this.transferType == "" || this.transferType == null) {
  //   this.selectTransferType = true;
  //   return;
  // }
  // if (this.fromBankType == "" || this.fromBankType == null) {
  //   this.selectTransferFrom = true;
  //   return;
  // }
  // if (this.toBankType == "" || this.toBankType == null) {
  //   this.selectTransferTo = true;
  //   return;
  // }
  // if (this.fromBankType == this.toBankType) {
  //   this.notEqualFromTo = true;
  //   return;
  // }
  // if (this.amount === "" || this.amount == null || this.amount === 0) {
  //   this.enterAmount = true;
  //   return;
  // }
  // if (this.transferDate == "") {
  //   this.enterTransferDate = true;
  //   return;
  // }

  // // Prepare the payload
  // const payload = {
  //   transferType: this.transferType,
  //   fromBankType: this.fromBankType,
  //   toBankType: this.toBankType,
  //   amount: this.amount,
  //   reason: this.reason,
  //   transferDate: this.transferDate,
  // };

  // console.log("payload", payload);

  // Process the attachments (could be the same data for both cases)
      const fileArray = (this.createOffset ? this.newAttachmentsData : this.attachmentsData).map((file) => {
        console.log(file.fileData, file.filename, file.fileType);
        return this.$base64ToFile(file.fileData, file.filename, file.fileType);
      });

      const formData = new FormData();
      formData.append("transferCase", "expenditure");
      formData.append("transferType", this.paymentToBeEdited.transferType);
      formData.append("fromBankType", this.paymentToBeEdited.fromBankType);
      formData.append("toBankType", this.paymentToBeEdited.toBankType);
      formData.append("transferDate", this.paymentToBeEdited.transferDate);
      formData.append("amount", this.paymentToBeEdited.amount);
      formData.append("refNumber", this.paymentToBeEdited.refNumber);
      formData.append("reason", this.paymentToBeEdited.reason);
      formData.append("toWhat", "123uyttyy567433nhsdff");
      formData.append("orgId", null);
      // Append files to form data
      fileArray.forEach((file) => {
        formData.append("attachments", file);
      });

  console.log("Form data", formData);

  const customHeaders = {
    "Content-Type": "multipart/form-data",
  };

  try {
        // Determine the appropriate request method and parameters
        const apiRequest = this.createOffset ? this.$apiPost : this.$apiPatch;
        const params = this.createOffset
          ? ["/api/v1/payments/transferFunds", formData, customHeaders] // For POST
          : ["/api/v1/payments/transferFunds", this.transferId, formData, customHeaders]; // For PATCH
        // Make the API request
        await apiRequest(...params).then((response) => {
          console.log("Response from the update/add: ", response);
          console.log("response message",response.message)
     
          if (response.status === 1) {
            this.$refs.toast.showSuccessToastMessage(response.message);
           
            setTimeout(() => {
              this.showEditTransferForm=false;
              this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: 2,
          radioStatus:"serviceOffsets"
        },
      });
          }, 2000);
          
            // this.paymentTransfers = response.updatedTransferFunds;
            // console.log("paymentTransfers: ", this.paymentTransfers);
            // this.searchedTransferedPayments = this.paymentTransfers;
            // console.log("searched Transfered Payments: ", this.searchedTransferedPayments);

            // this.attachmentsData = response.organization.paymentTransfers.attachments;
            // console.log("Attachments are", this.attachmentsData);
      
          }
        });
      } catch (error) {
        console.error("Error in the process", error.status, error.message);
        this.$refs.toast.showErrorToastMessage("Something went wrongmmm!!");
      } finally {

      }
},

  },
};
</script>