<template>
  <div class="container mx-auto flex flex-col mt-5 ">
    <div class="pb-5 flex flex-col bg-white -mt-2 ">
      <div class="mt-8 ">
        <div
          class="flex flex-col lg:flex-row items-center justify-between mb-6 space-x-0 lg:space-x-1  bg-white p-4 rounded-lg shadow-md space-y-2 lg:space-x-0"
        >
          <!-- Search Input -->
          <div class="flex-1 w-full lg:w-3/4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by Name, Email, Username"
              class=" text-xs w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <!-- Payment Type Select -->
          <select
            v-model="paymentType"
            @change="changeSearched(paymentType)"
            class="w-full lg:w-1/4 text-xs border border-gray-300 rounded-lg h-10 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="" selected disabled>Select Payment Type</option>
            <option value="all">All</option>
            <option value="block">Block</option>
            <option value="service">Service</option>
          </select>
        </div>

        <div class="overflow-x-auto h-96">
  <table class="w-full border-b border-indigo-500">
    <thead>
      <tr class="bg-blue-50 text-xs text-blue-500">
        <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left ">
          Payment Type
        </th>
        <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left ">
          Transfered From
        </th>
        <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left ">
          Transfered To
        </th>
        <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left ">
          Transfer Date
        </th>
        <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left ">
          Amount
        </th>
        <th class="w-24 p-3 text-md font-extrabold tracking-wide text-left ">
          Reason
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="searchedTransferedPayment in searchedTransferedPayments" :key="searchedTransferedPayment._id">
        <td class="p-3 text-md text-gray-700 whitespace-nowrap">
          <p
            v-if="searchedTransferedPayment.transferType === 'block'"
            class="bg-blue-100 px-2 rounded-lg"
          >
            {{ searchedTransferedPayment.transferType }}
          </p>
          <p
            v-else
            class="bg-yellow-100 px-2 rounded-lg"
          >
            {{ searchedTransferedPayment.transferType }}
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
      </tr>
    </tbody>

   
  </table>

  <div v-if="!searchedTransferedPayments" class="">No Transfered Payments</div>
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
      this.searchedTransferedPayment = "";
      if (paymentType == "all") {
        this.searchedTransferedPayments = this.paymentTransfers.filter(
          (paymentTransfer) =>
            paymentTransfer.transferType == "block" ||
            paymentTransfer.transferType == "service"
        );
      } else if (paymentType == "block") {
        console.log("block", this.paymentTransfers);
        this.searchedTransferedPayments = this.paymentTransfers.filter(
          (paymentTransfer) => paymentTransfer.transferType == "block"
        );
      } else {
        console.log("else payments", this.searchedTransferedPayments);
        this.searchedpaymentTransfers = this.paymentTransfers.filter(
          (paymentTransfer) => {
            if (paymentTransfer.transferType == "service") {
              console.log("paymenttransfer", paymentTransfer.transferType);
              return true;
            } else {
              this.searchedTransferedPayments = "";
              console.log("Paymenttransfer else", paymentTransfer.transferType);
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
      } else {
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