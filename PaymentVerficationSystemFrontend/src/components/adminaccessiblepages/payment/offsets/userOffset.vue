<template>
  <div class="border-zigzag">
    <Toast ref="toast" />

    <div class="">
      <div
        class="flex items-center justify-between mb-6 bg-white py-4 rounded-lg"
      >
        <!-- Search Input -->
        <div class="flex-1 lg:mx-35">
          <input
            v-model="searchQuery"
            type="text"
            @input="filteredUsersInSearch"
            :placeholder="$t('searchByNameEmailUsername')"
            class="custom-input w-full h-12 px-4 text-gray-700 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-600"
          />
        </div>
      </div>
      <!-- //least of searched users -->

      <div
        v-if="showList"
        class="lg:mx-35 mb-5 border-t border-blue-900 border-dotted max-h-64 overflow-y-auto"
      >
        <div
          class="px-4 border-b border-blue-900 border-dotted cursor-pointer"
          v-for="user in searchedUsers"
          :key="user._id"
          :class="['bg-white p-4 border-b cursor-pointer hover:bg-blue-100']"
          @click="
            showPaymentAmmount(user);
            showList = false;
          "
        >
          <div
            class="text-xs flex flex-row space-x-5 md:space-x-12 text-gray-500"
          >
            <p class="font-bold text-blue-800">{{ user.userCode }}</p>
            <p class="text-gray-500 font-bold">{{ user.fullName }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showPaymentAmount"
      class="lg:mx-40 flex flex-col border border-gray-500 p-4 my-4 rounded-lg"
    >
      <p>Display offset amount of the user {{ userCode }}</p>

      <button
        @click="
          showOffsetForm = true;
          showPaymentAmount = false;
        "
        class="custom-button w-full lg:w-1/6 mt-3"
      >
        Offset
      </button>
    </div>

    <div v-if="showOffsetForm">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div
            class="bg-white rounded-lg p-1 shadow-lg lg:w-2/3 "
          >
            <div
              class="border border-gray-300 rounded-lg p-3 bg-white text-black"
            >
              <div
                class="bg-blue-500 border border-gray-200 flex items-center justify-between text-white rounded-t-lg px-4 py-2"
              >
                <h2 class="text-lg font-semibold text-white">Do you want to make offset for this user !!!</h2>
                <i
                  class="fas fa-times cursor-pointer"
                  @click="showOffsetForm = false"
                ></i>
              </div>

              <div class="py-5 mx-0 mb-5 lg:px-4 h-96 overflow-y-auto">
                <div class="mb-4 flex flex-col lg:flex-row mx-0 ">
                  <label class="custom-label w-1/3 mt-3">
                    Transfer Type:
                  </label>
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

                <div class="mb-4 flex flex-col lg:flex-row mx-0 lg">
                  <label class="custom-label w-1/3 mt-3">
                    Transfer From:
                  </label>
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
                <div class="mb-4 flex flex-col lg:flex-row mx-0 ">
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

                <div class="mb-4 flex flex-col lg:flex-row mx-0 ">
                  <label class="custom-label w-1/3 mt-3"> amount: </label>
                  <input
                    type="number"
                    class="custom-input text-xs"
                    v-model="amount"
                    placeholder="amount"
                  />
                </div>
                <div class="mb-4 flex flex-col lg:flex-row mx-0 ">
                  <label class="custom-label w-1/3 mt-3">
                    Transfer Date:
                  </label>
                  <input
                    type="date"
                    class="custom-input text-xs"
                    v-model="transferDate"
                    placeholder="amount"
                  />
                </div>

                <div class="mb-4 flex flex-col lg:flex-row mx-0 ">
                  <label class="custom-label w-1/3 mt-3"> Reason: </label>
                  <div class="flex flex-col w-full space-y-5">
                    <input
                      type="text"
                      class="custom-input text-xs"
                      v-model="reason"
                      placeholder="Reason"
                    />

                    <div class="mt-5">
                      <!-- Drag and Drop Area -->
                      <div
                        class="border-2 border-dashed border-blue-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500"
                        :class="{ 'border-blue-400 bg-blue-50': isDragging }"
                        @dragover.prevent="onDragOver"
                        @dragleave="onDragLeave"
                        @drop.prevent="onDrop"
                      >
                        <p v-if="files.length === 0" class="text-center">
                          Drag & drop images or PDFs here, or click to select
                        </p>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          class="hidden"
                          ref="fileInput"
                          multiple
                          @change="onFileChange"
                        />
                        <button
                          type="button"
                          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          @click="selectFile"
                        >
                          Browse Files
                        </button>
                        <p class="text-blue-500">
                          Add User Atachement either Image or PDF
                        </p>
                      </div>

                      <!-- File List -->
                      <div v-if="files.length > 0" class="mt-4">
                        <p class="font-semibold text-blue-500">
                          Choosen Files:
                        </p>
                        <ul class="space-y-4 mt-2">
                          <li
                            v-for="(file, index) in files"
                            :key="index"
                            class="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-gray-300 rounded"
                          >
                            <div v-if="isImage(file)" class="w-16 h-16">
                              <img
                                :src="file.preview"
                                alt="Preview"
                                class="object-cover w-full h-full rounded"
                              />
                            </div>
                            <div
                              v-else
                              class="w-16 h-16 flex items-center justify-center text-sm text-gray-600 bg-gray-100 rounded"
                            >
                              <p>PDF</p>
                            </div>
                            <div class="flex-1">
                              <p class="text-sm font-medium text-gray-800">
                                {{ file.name }}
                              </p>
                              <p class="text-xs text-gray-500">
                                {{ formatSize(file.size) }}
                              </p>
                              <input
                                v-model="file.description"
                                type="text"
                                placeholder="Enter description"
                                class="custom-input"
                              />
                            </div>
                            <button
                              class="text-red-500 hover:text-red-600"
                              @click="removeFile(index)"
                            >
                              <i class="fa fa-x text-xs mt-10"></i>
                            </button>
                          </li>
                        </ul>
                        <!-- <button
          @click="uploadFiles"
          class="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Upload All
        </button> -->
                      </div>
                    </div>

                    <p
                      v-if="selectTransferType"
                      class="text-red-500 text-xs mt-2"
                    >
                      Please Select Transfer Type!
                    </p>
                    <p
                      v-if="selectTransferFrom"
                      class="text-red-500 text-xs mt-2"
                    >
                      Please select a bank from where to be transfer!
                    </p>
                    <p
                      v-if="selectTransferTo"
                      class="text-red-500 text-xs mt-2"
                    >
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
                    <p
                      v-if="enterTransferDate"
                      class="text-red-500 text-xs mt-2"
                    >
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
      showList: false,
      showOffsetForm: false,
      userCode: "",
      showPaymentAmount: false,
      searchedUsers: [],
      users: [],
      searchQuery: "",
      //
      files: [], // Array to store uploaded files and metadata
      isDragging: false, // To style drag area on drag events
      //
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
  },
  methods: {
    showPaymentAmmount(user) {
      this.showPaymentAmount = true;
      this.userCode = user.userCode;
      const params = {
        userId: user._id,
        userCode: user.userCode,
        isActive: user.isActive,
      };

      try {
        this.$apiGet("/api/v1/payments/tatalUserPayment", params).then(
          (response) => {
            if (response.status === 1) {
              userPayments = response.payments;
            }
          }
        );
      } catch (error) {
        console.log("error", error);
      } finally {
        console.log("finally");
      }
    },
    // Format file size
    formatSize(size) {
      if (size < 1024) return `${size} B`;
      else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
      else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    },
    // Trigger file input dialog
    selectFile() {
      this.$refs.fileInput.click();
    },
    // Handle file change event
    onFileChange(event) {
      const selectedFiles = Array.from(event.target.files);
      this.addFiles(selectedFiles);
    },
    // Add files to the list
    addFiles(fileList) {
      fileList.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.files.push({
            file,
            name: file.name,
            size: file.size,
            description: "",
            preview: file.type.startsWith("image/") ? reader.result : null,
          });
        };
        if (file.type.startsWith("image/")) reader.readAsDataURL(file);
        else
          this.files.push({
            file,
            name: file.name,
            size: file.size,
            description: "",
          });
      });
    },
    // Handle drag over
    onDragOver() {
      this.isDragging = true;
    },
    // Handle drag leave
    onDragLeave() {
      this.isDragging = false;
    },
    // Handle file drop
    onDrop(event) {
      this.isDragging = false;
      const droppedFiles = event.dataTransfer.files;
      this.addFiles(Array.from(droppedFiles));
    },
    // Remove a file from the list
    removeFile(index) {
      this.files.splice(index, 1);
    },
    // Upload files to the server
    async uploadFiles() {
      if (!this.files.length) {
        alert("No files to upload!");
        return;
      }

      const formData = new FormData();
      // Append JSON stringified files data
      formData.append("filesData", JSON.stringify(this.files));
      alert("Uploading files");
      // try {
      //   const response = await axios.post("/upload", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
      //   console.log("Upload successful:", response.data);
      //   alert("Files uploaded successfully!");
      //   this.files = []; // Clear the list on successful upload
      // } catch (error) {
      //   console.error("Upload failed:", error);
      //   alert("Error uploading files!");
      // }
    },
    // Check if the file is an image
    isImage(file) {
      return file.preview !== null;
    },
    //
    filteredUsersInSearch() {
      this.showList = true;
      this.showPaymentAmount = false;
      this.showOffsetForm = false;

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

      if (this.transferType == "" || this.transferType == null) {
        //this.$refs.toast.showErrorToastMessage("Transfer Type(Either service or Block)is required");
        this.selectTransferType = true;
        return;
      }
      if (this.fromBankType == "" || this.fromBankType == null) {
        // this.showErrorToastMessage("Transfer-From is required");
        this.selectTransferFrom = true;
        return;
      }
      if (this.amount == "" || this.amount == null)
        if (this.toBankType == "" || this.toBankType == null) {
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

      if (this.amount === "" || this.amount == null || this.ammount === 0) {
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

      try {
        await this.$apiPost("api/v1/payments/transferFunds", payload).then(
          (response) => {
            console.log("response", response);
            if (response.status === 1) {
              this.$refs.toast.showSuccessToastMessage(response.message);
            }
          }
        );
      } catch (error) {
        console.log("error", error.status, error.message);
        this.showError = true;
        this.errorMessage = error.message;
      } finally {
      }
    },
  },
};
</script>