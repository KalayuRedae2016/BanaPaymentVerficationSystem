<template>
  <div class="container mx-auto flex flex-col">
    <p class="text-md mx-5 mb-5 mt-4 text-blue-500 font-bold">
      Overdue Users
    </p>
    <div
      class="border-t border-blue-500 px-2 pb-5 flex flex-col bg-white -mt-2"
    >
      <div class="py-4 mt-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1 ">
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
                class="text-xs w-full pl-10  py-3 text-gray-700 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <div class="overflow-x-auto overflow-y-auto h-96 ">
        
      
     
        <table class="table-auto min-w-full border-collapse">
    <!-- Table Head -->
    <thead class="bg-blue-50 text-white sticky top-0 z-10">
      <tr class="text-blue-500 text-xs">
        <th class="w-24 p-4  font-bold tracking-wide text-left">UserCode</th>
        <th class="w-36 p-4  font-bold tracking-wide text-left">Full Name</th>
        <th class="w-24 p-4  font-bold tracking-wide text-left">  Overdue Payments</th>
     
      </tr>
    </thead>
    <!-- Scrollable Table Body -->
    <tbody class="divide-y divide-gray-200 bg-gray-50  overflow-y-auto">
      <tr  @click="userOverdueDetails(searchPayment.userCode,searchPayment.fullName)"
       v-for="searchPayment in searchedPayments"
                :key="searchPayment._id"
        class="cursor-pointer bg-white hover:shadow-lg hover:bg-blue-100 rounded-lg p-4"
      >
        <td class="p-4 text-xs text-gray-700">
          <span class="font-bold text-indigo-600">{{ searchPayment.userCode }}</span>
        </td>
        <td class="p-4 text-xs text-gray-700 font-bold">
          {{ searchPayment.fullName }}
        </td>
        
        <td class="p-4">
          <button
           @click="userOverdueDetails(searchPayment.userCode)"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded shadow-lg"
          
          >
            <i class="fas fa-info-circle"></i> View All Overdue
          </button>
        </td>
      </tr>
    </tbody>
  </table>
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
    userOverdueDetails(userCode,fullName) {
      //alert(userCode);
      this.$router.push({
          path: "/admindashboard/payments1",
          query:{
            activeTab:1,
            userCode:userCode,
            userSelected:true,
            fullName:fullName
          }
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
