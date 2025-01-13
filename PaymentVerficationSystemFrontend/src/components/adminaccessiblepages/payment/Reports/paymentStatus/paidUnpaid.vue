<template>
  <div class="container mx-auto flex flex-col">
    <p class="text-md mx-5 mb-5 mt-4 text-blue-500 font-bold">
      See Payment Detail(Only Current Month {{ activeYear }} - {{ activeMonth }})
    </p>
    <div
      class="border-t border-blue-500  pb-5 flex flex-col bg-white -mt-2"
    >
      <div class="p-2 mt-8 0">
        <div
          class="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200"
        >
          <!-- Search Input -->
          <div class="flex-1 mr-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by Name, Email, Username"
              class="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-600"
            />
          </div>

          <!-- Payment Status Dropdown -->
          <select
            class="border border-gray-300 rounded-lg h-12 px-4 text-gray-700 shadow-sm focus:outline-none focus:ring focus:border-blue-600"
            v-model="paymentStatus"
            @change="changeSearched(paymentStatus)"
          >
            <option value="" selected disabled>Select Status</option>
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div class="overflow-x-auto overflow-y-auto h-96 ">
  <!-- Table -->
  <table class="table-auto min-w-full border-collapse">
    <!-- Table Head -->
    <thead class="bg-blue-50 text-white sticky top-0 z-8">
      <tr class="text-blue-500 text-xs">
        <th class="w-24 p-4  font-bold tracking-wide text-left">UserCode</th>
        <th class="w-36 p-4  font-bold tracking-wide text-left">Full Name</th>
        <th class="w-36 p-4  font-bold tracking-wide text-left">Year</th>
        <th class="w-36 p-4  font-bold tracking-wide text-left">Month</th>
        <th class="w-24 p-4  font-bold tracking-wide text-left">Paid/Unpaid</th>
        <th class="w-24 p-4  font-bold tracking-wide text-left">Action</th>
      </tr>
    </thead>
    <!-- Scrollable Table Body -->
    <tbody class="divide-y divide-gray-200 bg-gray-50  overflow-y-auto">
      <tr
      @click="
              paymentHistory(
                searchPayment.userCode,
                searchPayment.fullName,
                searchPayment.activeYear,
                searchPayment.activeMonth,
                searchPayment.status
              )
            "
        v-for="searchPayment in searchedpayments"
        :key="searchPayment._id"
        class="cursor-pointer bg-white hover:shadow-lg hover:bg-gray-100 rounded-lg p-4"
      >
        <td class="p-4 text-xs text-gray-700">
          <span class="font-bold text-indigo-600">{{ searchPayment.userCode }}</span>
        </td>
        <td class="p-4 text-xs text-gray-700 font-bold">
          {{ searchPayment.fullName }}
        </td>
        <td class="p-4 text-xs text-gray-700 font-bold">
              {{ searchPayment.activeYear }}
        </td>
        <td class="p-4 text-xs text-gray-700 font-bold">
          {{ searchPayment.activeMonth }}
        </td>
        <td class="p-4 text-xs">
          <span
            :class="{
              'bg-green-100 text-green-600 font-bold px-2 py-1 rounded': searchPayment.isPaid,
              'bg-red-100 text-red-600 font-bold px-2 py-1 rounded': !searchPayment.isPaid
            }"
          >
            {{ searchPayment.isPaid ? 'Paid' : 'Unpaid' }}
          </span>
        </td>
        <td class="p-4">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded shadow-lg"
            @click="
              paymentHistory(
                searchPayment.userCode,
                searchPayment.fullName,
                searchPayment.activeYear,
                searchPayment.activeMonth,
                searchPayment.status
              )
            "
          >
            <i class="fas fa-info-circle"></i> Detail
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
  name: "paymentsView",
  components: {
    //paymentsForm,
  },
  data() {
    return {
      paymentStatus: "all",
      activeYear: new Date().getFullYear(),
      activeMonth: new Date().getMonth() + 1,
      monthlReport: [],
      count: 1,
      confirmedpayments: [],
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
      searchedpayments: [],

      filteredCleints: [],
      displayedpayments: [],
      currentPage: 1,
      searchQuery: "",
      perPage: 2,
      paymentName: "",
    };
  },

  watch: {
    searchQuery: {
      handler: "filteredpaymentsInSearch",
      immediate: true,
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.payments.length / this.perPage);
    },
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
  async mounted() {
    this.displayedItems(); //for the table
    try { await this.$apiGet("/api/v1/paymentSetting/latest")
      .then((response) => {
        if (response.status === 1) {
          this.activeMonth = response.paymentSetting.activeMonth;
          this.activeYear = response.paymentSetting.activeYear;
          console.log("activeMonth", this.activeMonth, this.activeYear);
        }
      })}
       catch(error){
        console.error(
          "An error occurred while fetching payment sfettings:",
          error
        );
    }finally{

    };
    const mountedOrNot=1;
    this.fetchPayments(mountedOrNot);
  },

  methods: {
    paymentHistory(userCode,fullName,activeYear, activeMonth, status) {
      console.log("userCodeFullName in paid unpaid: " ,fullName);

      if (status == "confirmed") {
        this.$router.push({
          path: `/admindashboard/payment-history-detail/${userCode}`,
          query: {
            year: activeYear,
            month: activeMonth,
          },
        });
      } else {
        // this.$router.push({
        //   path: "/admindashboard/payments1",
        //   query:{
        //     activeTab:1,
        //     userCode:userCode,
        //     userSelected:true,
        //     fullName:fullName
        //   }
        // });

        this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          userCode: userCode,
          fullName: fullName,
          activeTab: 1,
          bankStatement: true,
          radioStatus:"newPayment",
        },
      });
      }
    },
    changeSearched(paymentStatus) {
      if (paymentStatus == "all") {
        this.searchedpayments = this.payments.filter(
          (payment) => payment.isPaid == true || payment.isPaid == false
        );
      }
      if (paymentStatus == "paid") {
        this.searchedpayments = this.payments.filter(
          (payment) => payment.isPaid == true
        );
      }
      if (paymentStatus == "unpaid") {
        this.searchedpayments = this.payments.filter(
          (payment) => payment.isPaid == false
        );
      }
    },
    async fetchPayments(mountedOrNot) {
 
      const params={
        keyword:"latestPayments"
      }
     try { await this.$apiGet("/api/v1/payments/getAllPayments", params)
        .then((response) => {
          console.log("response latest fetch", response);
          if (mountedOrNot == 1) {
            this.payments = response.payments;
            this.searchedpayments = this.payments;
          } else {
            this.payments = response.payments;
          }
        })
      }catch(error){
          console.error("Error fetching payment data:", error.status,error.message);
        }finally{
      };
    },



    navigateProfile(paymentId) {
      console.log("paymentid", paymentId);
      this.$router.push(`/admindashboard/data-table/${paymentId}`);
    },
    verify(paymentId) {
      this.$router.push(`/admindashboard/verify/${paymentId}`);
    },

    filteredpaymentsInSearch() {
      if (this.paymentStatus == "all") {
        // this.payments="";
        this.searchedpayments = this.payments.filter(
          (payment) => payment.isPaid == true || payment.isPaid == false
        );
      }
      if (this.paymentStatus == "paid") {
        // this.payments="";
        this.searchedpayments = this.payments.filter(
          (payment) => payment.isPaid == true
        );
      }
      if (this.paymentStatus == "unpaid") {
        console.log("unpaid");
        this.searchedpayments = this.payments.filter(
          (payment) => payment.isPaid == false
        );
        // this.payments="";
      }
      console.log("payments herd are", this.payments);
      if (this.searchQuery) {
        console.log("searched query is", this.searchQuery);
        console.log("the payments are in the search qeury", this.payments);
        const query = this.searchQuery.toLowerCase();

        this.searchedpayments = this.searchedpayments.filter(
          (payment) =>
            payment.userCode.toLowerCase().includes(query) ||
            payment.fullName.toLowerCase().includes(query)
          // Add more conditions for other table headers
        );
        console.log(
          "this searched ain the searche are ",
          this.searchedpayments
        );
    const mountedOrNot=0;
        this.fetchPayments(mountedOrNot);
        return this.searchedpayments;
      }
      //return this.payments;
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
      this.searchedpayments = this.payments.slice(startIndex, endIndex);
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
  