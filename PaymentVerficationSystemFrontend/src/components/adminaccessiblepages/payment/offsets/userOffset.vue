<template>
  <div class="border-zigzag">
    <Toast ref="toast" />
    <div>
      <div class="overflow-x-auto h-96">
        <table class="w-full border-b border-t border-gray-300">
          <thead>
            <tr class="bg-blue-50 text-xs text-blue-500">
              <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                Offset Type
              </th>
              <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                Offseted From
              </th>
              <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                Offseted User
              </th>
              <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                Offset Date
              </th>
              <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                Ref Number
              </th>
              <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                Amount
              </th>
              <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                Reason
              </th>
              <th v-if="role === 'SuperAdmin'" class="w-24 p-3 text-md font-extrabold tracking-wide text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="text-xs">
            <tr class="hover:bg-blue-100 border-t border-b border-gray-300"
              v-for="searchedTransferedPayment in searchedTransferedPayments" :key="searchedTransferedPayment._id">
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                <p v-if="searchedTransferedPayment.transferType === 'block'" class="px-2 rounded-lg">
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
                {{ searchedTransferedPayment.toWhat }}
              </td>
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                {{ searchedTransferedPayment.transferDate }}
              </td>
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                {{ searchedTransferedPayment.refNumber }}
              </td>
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                {{ searchedTransferedPayment.amount }}
              </td>

              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                {{ searchedTransferedPayment.reason }}
              </td>
              <td v-if="role === 'SuperAdmin'"
                class="flex flex-row space-x-2 p-3 text-md text-blue-500 whitespace-nowrap">
                <button class="custom-button" @click="
                  showEditTransferForm = true;
                showAddEditForm = true;
                paymentToBeEdited = searchedTransferedPayment;
                createOffset = false;
                attachmentsData = searchedTransferedPayment.attachments
                userOffsetId = searchedTransferedPayment.transferId
                  ">
                  <i class="fa fa-edit"></i>Edit
                </button>

                <button @click="
                  showDelateModal = !showDelateModal;
                paymentToBeDelated = searchedTransferedPayment;
                " class="bg-red-500 text-white px-2 py-2 rounded flex items-center space-x-1 hover:bg-red-600">
                  <i class="fas fa-trash"></i>
                  <span></span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="custom-button m-5" @click="
          showEditTransferForm = true;
        showAddEditForm = false;
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
        ">
          <i class="fa fa-plus"></i> New Offset
        </button>
      </div>
    </div>
    <div v-if="showEditTransferForm">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div class="bg-white rounded-lg p-6 border border-cyan-500 px-5 w-2/3">
            <div class="flex flex-row justify-between items-center">
              <div>
                <label class="custom-label text-lg font-bold ml-5">
                  {{ $t("Perform Offset Payment") }}
                </label>
              </div>
              <div>
                <svg @click="showEditTransferForm = !showEditTransferForm"
                  class="w-6 h-6 custom-star hover:text-red-700 transition-colors duration-300 cursor-pointer"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <hr class="my-4 md:min-w-full bg-red-500" />

            <div class="overflow-x-auto">
              <div v-if="createOffset">
                <div class="mx-5">
                  <!-- Search Input -->
                  <div class="flex-1 w-full">
                    <input v-model="searchQuery" type="text" @input="filteredUsersInSearch"
                      :placeholder="$t('searchByNameEmailUsername')"
                      class="custom-input w-full h-12 px-4 text-gray-700 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-600" />
                  </div>
                </div>
                <!-- //least of searched users -->

                <div v-if="showList" class="m-5 border-t border-blue-900 border-dotted ">
                  <div class="px-4 border-b border-blue-900 border-dotted cursor-pointer" v-for="user in searchedUsers"
                    :key="user._id" :class="[
                      'bg-white p-4 border-b cursor-pointer hover:bg-blue-100',
                    ]" @click="
                      showPaymentAmmount(user);
                    showList = false;
                    showAddEditForm = false;
                    ">
                    <div class="text-xs flex flex-row space-x-5 md:space-x-12 text-gray-500">
                      <p class="font-bold text-blue-800">{{ user.userCode }}</p>
                      <p class="text-gray-500 font-bold">{{ user.fullName }}</p>
                    </div>
                  </div>
                </div>

                <div v-if="showPaymentAmount" class="mx-5 flex flex-col border border-gray-300 p-4 my-4 rounded-lg">
                  <div v-for="(userBalance, index) in userBalances" :key="index">
                    <div class="p-4 bg-gray-100 rounded-lg shadow-md overflow-y-auto max-h-64">
                      <table class="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                          <tr class="bg-gray-200">
                            <th class="px-4 py-2 text-left border border-gray-300">Label</th>
                            <th class="px-4 py-2 text-left border border-gray-300">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="px-4 py-2 border border-gray-300">Total Regular Balance</td>
                            <td class="px-4 py-2 border border-gray-300">{{ userBalance.totalRegularBalance }}</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-2 border border-gray-300">Total Subsidy Balance</td>
                            <td class="px-4 py-2 border border-gray-300">{{ userBalance.totalSubsidyBalance }}</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-2 border border-gray-300">Total Urgent Balance</td>
                            <td class="px-4 py-2 border border-gray-300">{{ userBalance.totalUrgentBalance }}</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-2 border border-gray-300">Total Service Balance</td>
                            <td class="px-4 py-2 border border-gray-300">{{ userBalance.totalServiceBalance }}</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-2 border border-gray-300">Total Penalty Balance</td>
                            <td class="px-4 py-2 border border-gray-300">{{ userBalance.totalPenalityBalance }}</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-2 border border-gray-300">Blocked User Withdrawal</td>
                            <td class="px-4 py-2 border border-gray-300">{{ userBalance.blockUserWithdrawal }}</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-2 border border-gray-300">Service User Withdrawal</td>
                            <td class="px-4 py-2 border border-gray-300">{{ userBalance.serviceUserWithdrawal }}</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-2 border border-gray-300">Total Block Bank Account</td>
                            <td class="px-4 py-2 border border-gray-300">{{ userBalance.totalBlockBankAccount }}</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-2 border border-gray-300">Total Service Bank Account</td>
                            <td class="px-4 py-2 border border-gray-300">{{ userBalance.totalServiceBankAccount }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button @click="
                    (showAddEditForm = true), (showPaymentAmount = false);
                    " class="custom-button w-full lg:w-1/4 mt-3">
                  <i class="fa fa-user mr-2"></i>  Confirm Offset
                  </button>
                  </div>
                 
                </div>
             
              </div>
        <div class="max-h-64 overflow-y-auto">
  
              <form class="px-5 py-5" v-if="showAddEditForm">
                <div class="">
                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("Offset Type") }}
                      <span class="custom-star ml-1">*</span>
                    </label>

                    <select name="" id="" class="custom-select" v-model="paymentToBeEdited.transferType">
                      <option value="" disabled> Select Account Type</option>
                      <option value="all">All</option>
                      <option value="block">Block</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="custom-label w-1/3 mt-3">
                      Offseted From <span class="custom-star ml-1">*</span>
                    </label>
                    <select name="type" id="" class="custom-input text-xs" v-model="paymentToBeEdited.fromBankType">
                      <option value="" disabled>Transfer From</option>

                      <template v-if="paymentToBeEdited.transferType === 'block'">
                        <option v-for="(bank, index) in blockBanks" :key="'block-' + index" :value="bank.bankType">
                          {{ bank.bankType }}
                        </option>
                      </template>
                      <template v-else-if="paymentToBeEdited.transferType === 'service'">
                        <option v-for="(bank, index) in serviceBanks" :key="'service-' + index" :value="bank.bankType">
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
                    <input type="text" v-model="paymentToBeEdited.amount" class="custom-input" placeholder="Amount" />
                  </div>

                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("Ref Number") }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <input type="text" v-model="paymentToBeEdited.refNumber" class="custom-input"
                      placeholder="Ref Number" />
                  </div>

                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("Reason") }}
                      <span class="custom-star ml-1">*</span>
                    </label>

                    <input type="text" v-model="paymentToBeEdited.reason" class="custom-input" placeholder="Reason" />
                  </div>
                  <div class="mt-5 mb-32">
                    <div v-for="(attachment, index) in selectedAttachmentsData" :key="index" class="attachment-item">
                      <div class="border-b border-gray-300 shadow-lg mb-3"
                        v-if="attachment.fileType.startsWith('image/')">
                        <img :src="'data:image/jpeg;base64,' + attachment.fileData" :alt="attachment.name"
                          class="attachment-image m-4 w-1/2" style="height: auto" />
                        <div class="m-4 text-blue-800">
                          <p>Type: {{ attachment.fileType }}</p>
                          <p>Name: {{ attachment.filename }}</p>
                          <p>Uploaded Date: {{ attachment.uploadedDate }}</p>
                          <div class="flex flex-row space-x-4 my-4">
                            <a href="#" @click="
                              $removeAttachment(
                                selectedAttachmentsData,
                                index
                              )
                              " class="text-blue-500">Remove</a>
                          </div>
                        </div>
                      </div>

                      <!-- If the attachment is a PDF -->
                      <div class="border-b border-gray-300 shadow-lg mb-3"
                        v-if="attachment.fileType === 'application/pdf'">
                        <iframe :src="'data:application/pdf;base64,' + attachment.fileData
                          " class="attachment-pdf m-4 scroll-hidden" frameborder="0"
                          style="width: 100%; height: 100px"></iframe>
                        <div class="m-4 text-blue-800">
                          <p>Type: {{ attachment.fileType }}</p>
                          <p>Name: {{ attachment.filename }}</p>
                          <p>Uploaded Date: {{ attachment.uploadedDate }}</p>
                          <div class="flex flex-row space-x-4 my-4">
                            <a href="#" @click="
                              $removeAttachment(
                                selectedAttachmentsData,
                                index
                              )
                              " class="text-blue-500">Remove</a>
                            <a :href="this.$getPdfBlobUrl(attachment.fileData)" target="_blank"
                              class="text-blue-500">View Pdf</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="border-2 border-dashed border-blue-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500"
                      :class="{ 'border-blue-400 bg-blue-50': isDragging }"
                      @dragover.prevent="$toggleDragState(this, true)" @dragleave="$toggleDragState(this, false)"
                      @drop.prevent="$handleFileInput($event, 'drop', addFiles)">
                      <p v-if="selectedAttachmentsData.length === 0" class="text-center">
                        Drag & drop images or PDFs here, or click to select
                      </p>
                      <input type="file" accept="image/*,application/pdf" class="hidden" ref="fileInput" multiple
                        @change="$handleFileInput($event, 'input', addFiles)" />
                      <button type="button" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        @click="$triggerFileInput($refs.fileInput)">
                        Browse Files
                      </button>
                      <p class="text-blue-500">
                        Add User Attachment (either Image or PDF)
                      </p>
                    </div>
                  </div>
                </div>

                <button @click.prevent="handleOffsetPayment()" type="submit" class="custom-button">
                  <i class="fas fa-save"> </i>
                  Save
                </button>
              </form>
            </div>
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

      userBalances: [],
      userOffsetId: "",
      userId: "6791f57835ba41e701b5fde9",
      showAddEditForm: false,
      searchedTransferedPayments: [],
      paymentTransfersss: [],


      attachmentsData: [],
      newAttachmentsData: [], // Array to store uploaded files and metadata
      isDragging: false,
      createOffset: false,

      paymentToBeEdited: "",
      showEditTransferForm: false,

      showList: false,
      showOffsetForm: false,
      userCode: "",
      showPaymentAmount: false,
      searchedUsers: [],
      users: [],
      searchQuery: "",

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
  watch: {
    searchQuery: {
      handler: "filteredusersInSearch",
      immediate: true,
    },
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
  async mounted() {
    try {
      await this.$apiGet("/api/v1/users", {
        params: {
          isActive: true,
        },
      }).then((response) => {
        console.log("response active users are", response);
        this.users = response.users;
        this.searchedUsers = [...this.users];
        console.log("searched users are", this.searchedusers);
      });
    } catch (error) {
      console.log("error", error);
    } finally {
    }

    await this.fetchUserOffsets()
  },
  methods: {
    async addFiles(fileList) {
      try {
        const newFiles = await this.$processFilesToAdd(fileList); // Process the files
        if (this.createOffset) {
          //  alert("new");
          // Update newAttachmentsData when createOffset is true
          this.newAttachmentsData = [...this.newAttachmentsData, ...newFiles];
          console.log("newAttachmentsData", this.newAttachmentsData);
          this.selectedAttachmentsData();
        } else {
          //alert("old");
          // Update attachmentsData when createOffset is false
          this.attachmentsData = [...this.attachmentsData, ...newFiles];
          console.log("AttachmentsData", this.attachmentsData);
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
    async showPaymentAmmount(user) {
      this.showPaymentAmount = true;
      this.userCode = user.userCode;

      const params = {
        userId: user._id,
        userCode: user.userCode,
        timeRange: "allTime",
      };

      try {
        await this.$apiGet("/api/v1/payments/reports", params).then(response => {
          console.log("user response all time: ", response)
          this.userBalances = response.items.userBalances;
          console.log("userBalances: ", this.userBalances);
          console.log("userBalances length:", this.userBalances.length)
        })
      } catch (error) {
        console.log("error for user balance fetching", error.status, error.message);
      } finally {

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

      console.log("fileArray", fileArray);

      const formData = new FormData();
      formData.append("transferCase", "userWithdrawal");
      formData.append("transferType", this.paymentToBeEdited.transferType);
      formData.append("fromBankType", this.paymentToBeEdited.fromBankType);
      formData.append("transferDate", this.paymentToBeEdited.transferDate);
      formData.append("amount", this.paymentToBeEdited.amount);
      formData.append("refNumber", this.paymentToBeEdited.refNumber);
      formData.append("reason", this.paymentToBeEdited.reason);
      formData.append("toWhat", this.userId);
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
          : ["/api/v1/payments/transferFunds", this.userOffsetId, formData, customHeaders]; // For PATCH
        // Make the API request
        await apiRequest(...params).then((response) => {
          console.log("Response from the update/add: ", response);
          console.log("response message", response.message)

          if (response.status === 1) {
            this.$refs.toast.showSuccessToastMessage(response.message);

            setTimeout(() => {
              this.showEditTransferForm = false;
              this.$router.push({
                path: "/admindashboard/payments1",
                query: {
                  activeTab: 2,
                  radioStatus: "serviceOffsets"
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
    filteredUsersInSearch() {
      this.showList = true;
      this.showPaymentAmount = false;
      this.showOffsetForm = false;
      this.showAddEditForm = false;

      console.log("Search query: ", this.searchQuery);
      if (this.searchQuery.trim() !== "") {
        const query = this.searchQuery.toLowerCase();
        this.searchedUsers = this.users.filter(
          (client) =>
            client.fullName.toLowerCase().includes(query) ||
            client.userCode.toLowerCase().includes(query)
        );
        console.log("Filtered searchedUsers: ", this.searchedUsers);
      } else {
        // Reset to the full list when search query is empty
        this.searchedUsers = [...this.users];
      }
    },
    async fetchUserOffsets() {
      try {
        const params = {
          transferCase: "userWithdrawal",
        }
        await this.$apiGet("/api/v1/payments/transferFunds", params).then((response) => {
          console.log("response from fetch transfers", response);
          if (response.status == 1) {
            this.paymentTransfers = response.transferFunds;
            // this.paymentTransfers= Object.keys(response.transferFunds)
            //   .filter(key => !isNaN(key)) // Keep only numeric keys
            //   .map(key =>response.transferFunds[key]);
            console.log("payments transfers and searched user offsets in org called in mounted", this.paymentTransfers)
            this.searchedTransferedPayments = this.paymentTransfers;
            // this.attachmentsData=this.response.transferFunds.attachments
            console.log("attachments data", this.attachmentsData);
          }
        });
      } catch (error) {
        console.log("error", error);
      } finally {
      }
    },
  },
};
</script>