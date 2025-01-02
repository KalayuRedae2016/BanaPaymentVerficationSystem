<template>
  <div class="container mx-auto flex flex-col">
    <div class="pb-5 flex flex-col bg-white -mt-2">
      <div class=" ">
        <div
          class="mb-5 flex flex-col lg:flex-row space-x-0 lg:space-x-3 bg-white p-4 rounded-lg shadow-md space-y-2 lg:space-y-0 lg:space-x-0"
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
          <table class="w-full border-b border-indigo-500">
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
              </tr>
            </thead>
            <tbody class="text-xs">
              <tr class="hover:bg-blue-100 border-t border-b border-gray-300 "
                v-for="searchedTransferedPayment in searchedTransferedPayments"
                :key="searchedTransferedPayment._id"
              >
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  <p
                    v-if="searchedTransferedPayment.transferType === 'block'"
                    class="bg-blue-100 px-2 rounded-lg"
                  >
                    {{ searchedTransferedPayment.transferType }}
                  </p>
                  <p v-else class="bg-yellow-100 px-2 rounded-lg">
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

          <div v-if="!searchedTransferedPayments" class="m-5 text-blue-500">
            No Transfered Payments
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

  mounted() {
    // this.displayedItems();
    this.fetchOrganization();
  },
  methods: {
    async fetchOrganization() {
      try { await this.$apiGet("/api/v1/organization/")
        .then((response) => {
          console.log("organization", response.organization);
          if (response.status == 1) {
            this.paymentTransfers = response.organization.paymentTransfers;
            this.searchedTransferedPayments = this.paymentTransfers;
          }
        })
       }catch(error){
          console.log("error", error);
      }finally{

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
        this.openServiceBank=false;
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