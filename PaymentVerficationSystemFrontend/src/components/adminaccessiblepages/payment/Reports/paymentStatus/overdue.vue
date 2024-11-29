<template>
  <div class="container mx-auto flex flex-col">
    <p class="text-md mx-5 mb-5 mt-4 text-indigo-800 font-bold">
      Overdue Users
    </p>
    <div
      class="border-t border-blue-500 px-5 pb-5 flex flex-col bg-white -mt-2"
    >
      <div class="p-4 mt-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1 mr-4">
            <div class="relative">
              <!-- Search Icon -->
              <span
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 19a8 8 0 100-16 8 8 0 000 16zm7-7l-3-3"
                  />
                </svg>
              </span>

              <!-- Search Input -->
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by Name, Email, Username"
                class="w-full pl-10 pr-4 py-3 text-gray-700 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-b border-indigo-500">
            <thead>
              <tr class="bg-gray-200">
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  UserCode
                </th>
                <th
                  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Full Name
                </th>
                <th
                  class="w-32 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Overdue Payments
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="searchPayment in searchedPayments"
                :key="searchPayment._id"
              >
                <td class="p-3 text-xs text-gray-500 whitespace-nowrap">
                  {{ searchPayment.userCode }}
                </td>

                <td class="p-3 text-xs text-gray-500 whitespace-nowrap">
                  {{ searchPayment.fullName }}
                </td>
                <td class="p-3 text-xs whitespace-nowrap">
                  <button
                    @click="userOverdueDetails(searchPayment.userCode)"
                    class="flex items-center px-4 py-2 bg-white hover:bg-blue-100 text-blue-500 rounded"
                  >
                    <i class="fas fa-times-circle"></i>
                    <!-- Use Font Awesome class here -->
                    <span class="ml-2">View All Overdue</span>
                    <!-- Optional text label -->
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <!-- Pagination Controls -->
            <div class="flex items-center">
              <!-- Select Payments Per Page -->
              <label
                for="payments-per-page"
                class="mr-2 text-gray-600 font-medium"
                >Show:</label
              >
              <select
                id="payments-per-page"
                v-model="paymentsPerpage"
                @change="changePerPageNumber()"
                class="h-9 border border-gray-300 text-gray-500 rounded-lg shadow-sm px-3 mr-4 focus:outline-none focus:ring focus:border-pink-500"
              >
                <option value="" disabled>Select</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>

              <!-- Previous Page Button -->
              <button
                @click="previosPage"
                class="px-3 py-1.5 text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring focus:border-pink-500 transition"
                :disabled="currentPage === 1"
              >
                <i class="fas fa-chevron-left"></i>
              </button>

              <!-- Current Page Display -->
              <span
                class="px-4 py-1.5 bg-indigo-800 text-white font-bold border-t border-b border-gray-300"
              >
                {{ currentPage }}
              </span>

              <!-- Next Page Button -->
              <button
                @click="nextPage"
                class="px-3 py-1.5 text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-lg shadow-sm focus:outline-none focus:ring focus:border-pink-500 transition"
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
//import paymentsForm from "./paymentsForm/paymentForm.vue";
import axios from "axios";
export default {
  name: "ClientsView",
  components: {
    //paymentsForm,
  },
  data() {
    return {
      count: 1,
      confirmedClients: [],
      paymentsPerpage: "",

      paymentType: "",
      timeRange: "",
      year: "",
      semiYear: "",
      month: "",
      day: "",
      payments: [],
      screenSize: "",
      detailModal: false,
      searchedPayments: [],

      filteredCleints: [],
      displayedClients: [],
      currentPage: 1,
      searchQuery: "",
      perPage: 2,
      paymentName: "",
    };
  },

  watch: {
    searchQuery: {
      handler: "filteredClientsInSearch",
      immediate: true,
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.payments.length / this.perPage);
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
    console.log("payments", this.payments);

    const allTimeRange = "allTime";
    this.$apiClient
      .get(`/api/v1/payments/reports?timeRange=${allTimeRange}`)
      .then((response) => {
        console.log("allThe Time", response);
        this.payments =
          response.data.items.categorizedPayments.overdue.payments;
        this.searchedPayments = this.payments;
        console.log("thispayments: " ,this.searchedPayments);
      })
      .catch((error) => {
        console.log("Error fetching total overdue", error.response.data.error);
      });
  },

  methods: {
    userOverdueDetails(userCode) {
      //alert(userCode);
      this.$router.push(`/admindashboard/bank-statement/${userCode}`, {
        params: {
          userCode: "BM0001",
          pending: 0,
        },
      });
    },
    navigateProfile(paymentId) {
      console.log("paymentid", paymentId);
      this.$router.push(`/admindashboard/data-table/${paymentId}`);
    },
    verify(paymentId) {
      this.$router.push(`/admindashboard/verify/${paymentId}`);
    },

    filteredClientsInSearch() {
      console.log("called");
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        return (this.searchedPayments = this.payments.filter(
          (payment) =>
            payment.user.toLowerCase().includes(query) ||
            payment.billCode.toLowerCase().includes(query)
          // Add more conditions for other table headers
        ));
      } else {
        this.displayedItems();
      }
      return this.payments;
    },
    changePerPageNumber() {
      this.perPage = this.paymentsPerpage;
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
      this.searchedPayments = this.payments.slice(startIndex, endIndex);
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
