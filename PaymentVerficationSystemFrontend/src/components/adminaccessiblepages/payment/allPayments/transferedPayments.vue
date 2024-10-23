<template>
  <div class="container mx-auto flex flex-col mt-5">
    <div class="px-5 pb-5 flex flex-col bg-white -mt-2">
      <div class="p-4 mt-8 border border-gray-300">
        <div class="flex items-center justify-between mb-6 space-x-4 bg-white p-4 rounded-lg shadow-md">
  <!-- Search Input -->
  <div class="flex-1">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by Name, Email, Username"
      class="w-full px-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
    />
  </div>

  <!-- Payment Type Select -->
  <select
    v-model="paymentType"
    @change="changeSearched(paymentType)"
    class="border border-blue-500 rounded-lg h-10 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
  >
    <option value="" selected disabled>Select Payment Type</option>
    <option value="all">All</option>
    <option value="block">Block</option>
    <option value="service">Service</option>
  </select>
</div>
 
        <div class="overflow-x-auto">
          <table class="w-full border-b border-indigo-500">
            <thead>
              <tr class="bg-gray-200">
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Payment Type
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Transfered From
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Transfered To
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Transfer Date
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Amount
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Reason
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="searchedTransferedPayment in searchedTransferedPayments"
                :key="searchedTransferedPayment._id"
              >
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  <p v-if="searchedTransferedPayment.transferType=='block'" class="bg-blue-100 px-2 rounded-lg"> {{ searchedTransferedPayment.transferType }}</p>
                  <p v-else class="bg-yellow-100 px-2 rounded-lg"> {{ searchedTransferedPayment.transferType }}</p>
                 
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
              </tr>
            </tbody>
          </table>

          <div class="flex flex-row mt-6 items-center justify-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
  <h1 class="mr-4 text-lg font-semibold text-gray-800">Show More:</h1>

  <!-- Items per Page Select -->
  <select
    v-model="paymentTransfersPerpage"
    @change="changePerPageNumber()"
    class="h-10 border border-gray-300 rounded-lg bg-white px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mr-4"
  >
    <option value="" disabled>Select Items</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="10">10</option>
    <option value="50">50</option>
    <option value="100">100</option>
  </select>

  <!-- Previous Page Button -->
  <button
    @click="previosPage"
    class="flex items-center justify-center px-3 py-2 rounded-lg border border-gray-300 text-gray-600 bg-gray-100 hover:bg-gray-200 transition duration-200 mr-2"
    :disabled="currentPage === 1"
  >
    <i class="fas fa-chevron-left"></i>
  </button>

  <!-- Current Page Display -->
  <span
    class="px-4 py-2 rounded-lg border border-gray-300 bg-pink-500 text-white text-center font-bold"
    >{{ currentPage }}</span
  >

  <!-- Next Page Button -->
  <button
    @click="nextPage"
    class="flex items-center justify-center px-3 py-2 rounded-lg border border-gray-300 text-gray-600 bg-gray-100 hover:bg-gray-200 transition duration-200 ml-2"
  >
    <i class="fas fa-chevron-right"></i>
  </button>
</div>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "paymentTransfersView",
  data() {
    return {
      selectMonth: false,
      paymentType: "all",
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
    totalPages() {
      return Math.ceil(this.paymentTransfers.length / this.perPage);
    },
  },
  mounted() {
    this.displayedItems();
    this.fetchOrganization();
  },
  methods: {
    async fetchOrganization() {
      this.$apiClient
        .get("/api/v1/organization/")
        .then((response) => {
          console.log("organization", response.data.organization);
          if (response.data.status == 1) {
            this.paymentTransfers = response.data.organization.paymentTransfers;
            this.searchedTransferedPayments = this.paymentTransfers;
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    async changeSearched(paymentType) {
      this.searchedTransferedPayment="";
      if (paymentType == "all") {
        this.searchedTransferedPayments = this.paymentTransfers.filter(
          (paymentTransfer) =>
            paymentTransfer.transferType == "block" ||
            paymentTransfer.transferType == "service"
        );
      } else if (paymentType == "block") {
        console.log("block", this.paymentTransfers);
        this.searchedTransferedPayments = this.paymentTransfers.filter(
          (paymentTransfer) => paymentTransfer.transferType == "block");
      }else {
         console.log("else payments",this.searchedTransferedPayments);
         this.searchedpaymentTransfers = this.paymentTransfers.filter(
          (paymentTransfer) => {
 
            if (paymentTransfer.transferType == "service") {
              console.log("paymenttransfer", paymentTransfer.transferType);
              return true; 
            } else {
              this.searchedTransferedPayments="";
              console.log("Paymenttransfer else",paymentTransfer.transferType);
              return false; 
            }

          }
        );
         console.log("searched in service", this.searchedTransferedPayments);
      }
    },
    filteredPaymentTransfersInSearch() {
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        this.searchedTransferedPayments =
          this.searchedTransferedPayments.filter(
            (paymentTransfer) =>
              paymentTransfer.transferType.toLowerCase().includes(query) ||
              paymentTransfer.fromBankType.toLowerCase().includes(query)
          );
      }else{
        this.searchedTransferedPayments = this.paymentTransfers;
      }
    },
    changePerPageNumber() {
      this.perPage = this.paymentTransfersPerpage;
      this.displayedItems();
    },
    previosPage() {
      if (this.currentPage > 1 && this.currentPage <= this.totalPages) {
        this.currentPage--;
        this.displayedItems();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.displayedItems();
      }
    },
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      this.searchedTransferedPayments = this.paymentTransfers.slice(
        startIndex,
        endIndex
      );
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