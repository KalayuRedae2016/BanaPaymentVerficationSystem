<template>
  <div class="container mx-auto flex flex-col">
    <Toast ref="toast"/>
    <div class="pb-5 flex flex-col bg-white -mt-2">
      <div class=" ">
        <div
          class="mb-2 flex flex-col lg:flex-row space-x-0 lg:space-x-3 bg-white p-4 rounded-lg shadow-md space-y-2 lg:space-y-0 lg:space-x-0"
        >
          <select
            v-model="paymentType"
            @change="changeSearched(paymentType)"
            class="w-full text-xs border border-gray-300 rounded-lg h-10 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="" selected disabled>Select Account Type</option>
            <option value="all">All</option>
            <option value="block">Block</option>
            <option value="service">Service</option>
          </select>

          <select
            v-if="openBlockBank"
            v-model="blockBank"
            @change="changeSearched(paymentType)"
            class="w-full text-xs border border-gray-300 rounded-lg h-10 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="" selected disabled>Select Block Bank</option>
            <option value="all">All</option>
            <option
              v-for="(bank, index) in blockBanks"
              :key="'block-' + index"
              :value="bank.bankType"
            >
              {{ bank.bankType }}
            </option>
          </select>

          <select
            v-if="openServiceBank"
            v-model="serviceBank"
            @change="changeSearched(paymentType)"
            class="w-full text-xs border border-gray-300 rounded-lg h-10 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="" selected disabled>Select Service Bank</option>
            <option value="all">All</option>
            <option
              v-for="(bank, index) in serviceBanks"
              :key="'block-' + index"
              :value="bank.bankType"
            >
              {{ bank.bankType }}
            </option>
          </select>
          <select
            v-if="openOutGoingInComing"
            v-model="outGoingIncoming"
            @change="changeSearched(paymentType)"
            class="w-full text-xs border border-gray-300 rounded-lg h-10 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="" selected disabled>Select Transfer Type</option>
            <option value="outgoing">Outgoing Transfer</option>
            <option value="incoming">Incoming Transfer</option>
          </select>
        </div>
        <div class="overflow-x-auto h-96">
          <table class="w-full border-b border-t border-gray-300">
            <thead>
              <tr class="bg-blue-50 text-xs text-blue-500">
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                >
                  Payment Type
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                >
                  Transfered From
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                >
                  Transfered To
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                >
                  Transfer Date
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                >
                  Amount
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                >
                  Reason
                </th>
                <th v-if="role==='SuperAdmin'"
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="text-xs">
              <tr
                class="hover:bg-blue-100 border-t border-b border-gray-300"
                v-for="searchedTransferedPayment in searchedTransferedPayments"
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
                  {{ searchedTransferedPayment.reason }}
                </td>
                <td v-if="role==='SuperAdmin'"
                  class="flex flex-row space-x-2 p-3 text-md text-blue-500 whitespace-nowrap"
                >
                  <button
                  v-if="role==='SuperAdmin1'"
                    class="custom-button"
                    @click="
                      showEditTransferForm = true;
                      paymentToBeEdited = searchedTransferedPayment;
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
          <div v-if="!searchedTransferedPayments" class="m-5 text-blue-500">
            No Transfered Payments
          </div>
        </div>
      </div>
    </div>

    <div v-if="showEditTransferForm">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <div class="bg-white rounded-lg p-6 border border-cyan-500 px-5">
            <div class="flex flex-row">
              <div>
                <label class="custom-label text-lg font-bold">{{
                  $t("Edit Transfer Payment")
                }}</label>
              </div>
              <div class="ml-20 lg:ml-64">
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
                      {{ $t("Account Type") }}
                      <span class="custom-star ml-1">*</span>
                    </label>

                    <select
                      name=""
                      id=""
                      class="custom-select"
                      v-model="paymentToBeEdited.transferType"
                    >
                      <option value="block">Block</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label class="custom-label w-1/3 mt-3">
                      Transfer From  <span class="custom-star ml-1">*</span>
                    </label>
                    <select
                      name="type"
                      id=""
                      class="custom-input text-xs"
                      v-model="paymentToBeEdited.fromBankType"
                    >
                      <option value="" disabled>Transfer From</option>

                      <template v-if="paymentToBeEdited.transferType === 'block'">
                        <option
                          v-for="(bank, index) in blockBanks"
                          :key="'block-' + index"
                          :value="bank.bankType"
                        >
                          {{ bank.bankType }}
                        </option>
                      </template>
                      <template v-else-if="paymentToBeEdited.transferType === 'service'">
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
                    <label class="custom-label w-1/3 mt-3">
                      Transfer to  <span class="custom-star ml-1">*</span>
                    </label>
                    <select
                      name="type"
                      id=""
                      class="custom-input text-xs"
                      v-model="paymentToBeEdited.toBankType"
                    >
                      <option value="" disabled>Transfer To</option>
                      <template v-if="paymentToBeEdited.transferType === 'block'">
                        <option
                          v-for="(bank, index) in blockBanks"
                          :key="'block-' + index"
                          :value="bank.bankType"
                        >
                          {{ bank.bankType }}
                        </option>
                      </template>

                      <template v-else-if="paymentToBeEdited.transferType === 'service'">
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
                    />
                  </div>
                </div>
                <button
                  @click="editTransferPayment()"
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

  <div v-if="showDelateModal">
   <transition name="fade" mode="out-in">
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deleteModalTitle"
    >
      <!-- Modal Content -->
      <div class="bg-white rounded-lg shadow-lg w-96">
        <!-- Modal Header -->
        <div
          class="bg-blue-500 text-white flex items-center justify-between rounded-t-lg px-4 py-3"
        >
          <h2 id="deleteModalTitle" class="text-lg font-semibold">
            Confirm Deletion
          </h2>
          <button
            @click="showDelateModal = false"
            class="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close Modal"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4 text-gray-700">
          <p>Are you sure you want to delete this Transfered Payment? This action cannot be undone.</p>
        </div>

        <!-- Modal Footer -->
        <div class="flex space-x-3 p-4">
          <button
            @click="confirmPaymentDelete(paymentToBeDelated)"
            class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <i class="fas fa-check mr-2"></i> Yes, Delete
          </button>
          <button
            @click="showDelateModal = false"
            class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <i class="fas fa-times mr-2"></i> Cancel
          </button>
        </div>
      </div>
    </div>
  </transition>
</div>

  </div>
</template>
<script>
import Toast from '../../../Common/Toast.vue'
export default {
  components:{
Toast,
  },
  name: "paymentTransfersView",
  data() {
    return {
      role:'',
      paymentToBeDelated:"",
      paymentToBeEdited: {
          fromBankType: "",
          toBankType: "",
          transferType: "",
      },

      showDelateModal:false,

      showEditTransferForm: false,
      openBlockBank: false,
      openServiceBank: false,
      serviceBank: "all",
      blockBank: "all",

      outGoingIncoming: "",
      openOutGoingInComing: false,

      selectMonth: false,
      paymentType: "",
      activeYear: new Date().getFullYear(),
      activeMonth: new Date().getMonth() + 1,
      selectedYear: "",
      selectedMonth: "",
      paymentTransfersPerpage: "",
      paymentTransfers: [],
      searchedTransferedPayments: [],
      currentPage: 1,
      searchQuery: "",
      perPage: 2,
    };
  },

  watch: {
    searchQuery: {
      handler: "filteredPaymentTransfersInSearch",
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
    totalPages() {
      return Math.ceil(this.paymentTransfers.length / this.perPage);
    },
  },
created(){
this.role=localStorage.getItem("role");
},
  mounted() {
    // this.displayedItems();
    this.fetchOrganization();
  },
  methods: {

    confirmPaymentDelete(paymentToBeDeleted) {
 
  this.$apiDelete('/api/v1/payments/transferFunds',paymentToBeDeleted._id)
    .then(response => {
      console.log("Response:", response);
      this.showDelateModal = false;

      this.$refs.toast.showSuccessToastMessage(response.message);

      setTimeout(() => {
        this.$reloadPage();
      }, 2000);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}
,
    editTransferPayment() {
      this.showEditTransferForm = false;
      try { 
        this.apiPut('/api/payments/transfers/',this.paymentToBeEdited);
        console.log("edited payment", this.paymentToBeEdited);
      }catch(error){
        console.log("error", error);
      }finally{

      }
    },
    async fetchOrganization() {
      try {
        await this.$apiGet("/api/v1/organization/").then((response) => {
          console.log("organization", response.organization);
          if (response.status == 1) {
            this.paymentTransfers = response.organization.paymentTransfers;
            this.searchedTransferedPayments = this.paymentTransfers;
          }
        });
      } catch (error) {
        console.log("error", error);
      } finally {
      }
    },

    async changeSearched(paymentType) {
      this.openBlockBank = false;
      this.openServiceBank = false;
      this.openOutGoingInComing = false;

      this.searchedTransferedPayment = "";
      if (paymentType == "all") {
        this.searchedTransferedPayments = this.paymentTransfers.filter(
          (paymentTransfer) =>
            paymentTransfer.transferType == "block" ||
            paymentTransfer.transferType == "service"
        );
      } else if (paymentType == "block") {
        this.openBlockBank = true;
        this.openServiceBank = false;
        console.log("block", this.paymentTransfers);

        this.searchedTransferedPayments = this.paymentTransfers.filter(
          (paymentTransfer) =>
            paymentTransfer.transferType == "block" &&
            (paymentTransfer.toBankType == this.blockBank ||
              paymentTransfer.fromBankType == this.blockBank)
        );
        if (this.blockBank == "all") {
          //alert("all if")
          this.searchedTransferedPayments = this.paymentTransfers.filter(
            (paymentTransfer) => paymentTransfer.transferType == "block"
          );
          return;
        } else {
          //alert("else")
          this.openOutGoingInComing = true;

          if (this.outGoingIncoming == "outgoing") {
            // alert("outgoing");
            console.log("outgoing");
            this.searchedTransferedPayments = this.paymentTransfers.filter(
              (paymentTransfer) =>
                paymentTransfer.transferType == "block" &&
                paymentTransfer.fromBankType == this.blockBank
            );

            return;
          } else if (this.outGoingIncoming == "incoming") {
            // alert("ingoing")
            this.searchedTransferedPayments = this.paymentTransfers.filter(
              (paymentTransfer) =>
                paymentTransfer.transferType == "block" &&
                paymentTransfer.toBankType == this.blockBank
            );
            return;
          } else {
            this.searchedTransferedPayments = this.paymentTransfers.filter(
              (paymentTransfer) =>
                paymentTransfer.transferType == "block" &&
                (paymentTransfer.toBankType == this.blockBank ||
                  paymentTransfer.fromBankType == this.blockBank)
            );
          }
        }
      } else {
        this.openServiceBank = true;
        console.log("service", this.paymentTransfers);

        this.searchedTransferedPayments = this.paymentTransfers.filter(
          (paymentTransfer) =>
            paymentTransfer.transferType == "service" &&
            (paymentTransfer.toBankType == this.serviceBank ||
              paymentTransfer.fromBankType == this.serviceBank)
        );
        if (this.serviceBank == "all") {
          //alert("all if")
          this.searchedTransferedPayments = this.paymentTransfers.filter(
            (paymentTransfer) => paymentTransfer.transferType == "service"
          );
          return;
        } else {
          //alert("else")
          this.openOutGoingInComing = true;

          if (this.outGoingIncoming == "outgoing") {
            // alert("outgoing");
            console.log("outgoing");
            this.searchedTransferedPayments = this.paymentTransfers.filter(
              (paymentTransfer) =>
                paymentTransfer.transferType == "service" &&
                paymentTransfer.fromBankType == this.serviceBank
            );

            return;
          } else if (this.outGoingIncoming == "incoming") {
            // alert("ingoing")
            this.searchedTransferedPayments = this.paymentTransfers.filter(
              (paymentTransfer) =>
                paymentTransfer.transferType == "service" &&
                paymentTransfer.toBankType == this.serviceBank
            );
            return;
          } else {
            this.searchedTransferedPayments = this.paymentTransfers.filter(
              (paymentTransfer) =>
                paymentTransfer.transferType == "service" &&
                (paymentTransfer.toBankType == this.serviceBank ||
                  paymentTransfer.fromBankType == this.serviceBank)
            );
          }
        }
      }
    },
    filteredPaymentTransfersInSearch() {
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();

        console.log("before searched", this.searchedTransferedPayments);

        this.searchedTransferedPayments =
          this.searchedTransferedPayments.filter(
            (paymentTransfer) =>
              paymentTransfer.transferType.toLowerCase().includes(query) ||
              paymentTransfer.fromBankType.toLowerCase().includes(query)
          );

        console.log("searched", this.searchedTransferedPayments);
      } else {
        this.searchedTransferedPayments = this.paymentTransfers;
      }
    },
  },
};
</script>

<style>
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
</style>