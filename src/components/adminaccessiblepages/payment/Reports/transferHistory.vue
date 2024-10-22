<template>
  <div class="container mx-auto flex flex-col">
    <p class="text-md mx-5 mb-5 mt-4 text-indigo-800 font-bold">
      Transfer History
    </p>

   
    <div
      class="border-t border-blue-500 px-5 pb-5 flex flex-col bg-white -mt-2"
    >
      <div class="p-4 mt-8 border border-gray-300">

        <table class="w-full border-b border-indigo-500 ">
            <thead>
              <tr class="bg-gray-200">
                <th
           
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Banks
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Transfer From
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Transfer To
                </th>
              </tr>
            

            </thead>
            <tbody>
              <tr
                
              > 
              <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                   LIB
                </td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                 20000
                </td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                40000
                </td>
              </tr>
            </tbody>
            </table>
        <div class="flex items-center justify-between mb-4 mt-5">
          <div class="flex-1 mr-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by Name,Email,Userame"
              class="w-full px-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div></div>
        </div>
        <div class="overflow-x-auto">

  

          <table class="w-full border-b border-indigo-500">
            <thead>
              <tr class="bg-gray-200">
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Transfer Type
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Transfer from
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Trnasfer To
                </th>

                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Amount
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Transfer Date
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
                v-for="searchtransferPayment in searchedtransferPayments"
                :key="searchtransferPayment._id"
              >
              <td class="p-3 text-md whitespace-nowrap">
                 {{ searchtransferPayment.transferType }}
                </td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  {{ searchtransferPayment.fromBankType }}
                </td>

                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  {{ searchtransferPayment.toBankType }}
                </td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  {{ searchtransferPayment.amount }}
                </td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  {{ searchtransferPayment.transferDate }}
                </td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  {{ searchtransferPayment.reason}}
                </td>
              </tr>
            </tbody>
          </table>

          <div class="flex flex-row mt-4">
            <div class="pagination flex items-center justify-center mt-4">
              <h1 class="mr-2">Show More</h1>
              <select
                v-model="transferPaymentsPerpage"
                @change="changePerPageNumber()"
                class="h-7 border border-gray-500 mr-3 rounded-md"
              >
                <option value="" disabled>Show More</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <button
                @click="previosPage"
                class="px-2 py-1 rounded border border-gray-500 text-pink-500 hover:bg-gray-200 mr-2"
              >
                <i class="fas fa-chevron-left"></i>
              </button>
              <span
                class="px-2 py-1 rounded border border-gray-500 bg-pink-500 text-white"
                >{{ currentPage }}</span
              >
              <button
                @click="nextPage"
                class="px-2 py-1 rounded border border-gray-500 text-pink-500 hover:bg-gray-200 ml-2"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
//import transferPaymentsForm from "./transferPaymentsForm/transferPaymentForm.vue";
export default {
  name: "transferPaymentsView",
  components: {
    //transferPaymentsForm,
  },
  data() {
    return {
      count: 1,
      confirmedtransferPayments: [],
      transferPaymentsPerpage: "",
      paymentType: "",
      timeRange: "",
      year: "",
      semiYear: "",
      month: "",
      day: "",
      transferPayments: [
        {
          _id: "1",
          fromBankType: "LIB",
          toBankType: "WEGAGEN",
          transferType: "Block",
          reason: "change customer",
          amount: 1000,
          transferDate:"06-05-2024",
        },
        {
          _id: "2",
          fromBankType: "LIB",
          toBankType: "WEGAGEN",
          transferType: "Block",
          reason: "change customer",
          amount: 1000,
          transferDate:"21-23-2024",
        },
        {
          _id: "3",
          fromBankType: "LIB",
          toBankType: "WEGAGEN",
          transferType: "service",
          reason: "change customer",
          amount: 1000,
          transferDate:"22-07-2024",
        },
      ],
      screenSize: "",
      detailModal: false,
      searchedtransferPayments: [],
      displayedtransferPayments: [],
      currentPage: 1,
      searchQuery: "",
      perPage: 2,
      transferPaymentName: "",
    };
  },

  watch: {
    searchQuery: {
      handler: "filteredtransferPaymentsInSearch",
      immediate: true,
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.transferPayments.length / this.perPage);
    },
    // displayedItems() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.items.slice(startIndex, endIndex);
    // }
  },
  created() {
    this.paymentType = this.$route.query.paymentType;
    this.year = this.$route.query.year;
    this.reportType = this.$route.query.reportType;
    this.timeRange = this.$route.query.timeRange;
    this.semiYear = this.$route.query.semiYear;
    this.month = this.$route.query.month;
    this.day = this.$route.query.day;
  },
  mounted() {
    this.displayedItems();
    console.log("transferPayments", this.transferPayments);
  },

  methods: {
    userOverdueDetails(user) {
      this.$router.push(`/admindashboard/bank-statement/${user.fromBankType}`, {
        params: {
          fromBankType: this.fromBankType,
        },
      });
    },
    navigateProfile(transferPaymentId) {
      console.log("transferPaymentid", transferPaymentId);
      this.$router.push(`/admindashboard/data-table/${transferPaymentId}`);
    },
    verify(transferPaymentId) {
      this.$router.push(`/admindashboard/verify/${transferPaymentId}`);
    },

    filteredtransferPaymentsInSearch() {
      console.log("called");
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        return (this.searchedtransferPayments = this.transferPayments.filter(
          (transferPayment) =>
            transferPayment.fromBankType.toLowerCase().includes(query) ||
            transferPayment.toBankType.toLowerCase().includes(query)
          // Add more conditions for other table headers
        ));
      } else {
        this.displayedItems();
      }
      return this.transferPayments;
    },
    changePerPageNumber() {
      this.perPage = this.transferPaymentsPerpage;
      this.displayedItems();
    },

    previosPage() {
      if (this.currentPage > 1 && this.currentPage <= this.totalPages) {
        this.currentPage--;
        // console.log(this.currentPage);
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
      this.searchedtransferPayments = this.transferPayments.slice(
        startIndex,
        endIndex
      );
    },

    goBack() {
      this.$router.push("/admindashboard/payment-report"); // Navigates back to the previous page
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
  