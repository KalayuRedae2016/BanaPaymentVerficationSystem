<template>
  <div class="flex flex-col ">
    <div class="pb-5 flex flex-col -mt-2">
      <div class="-ml-3 rounded-lg p-1 lg:p-3 text-xs">
        <div
          class="border-t border-gray-200 flex flex-col lg:flex-row items-center justify-between mb-6 space-x-0 lg:space-x-2 bg-white p-4 rounded-lg shadow-md space-y-3 lg:space-y-0"
        >
          <!-- Search Input -->

          <!-- Payment Status Select -->

          <select
            v-model="paymentStatus"
            @change="changeSearched(paymentStatus)"
            class="w-full lg:w-1/4 border border-gray-300 rounded-lg h-10 px-0 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="" selected disabled>Select Status</option>
            <option value="all">All</option>
            <option value="paid" class="text-green-500">Paid/Confirmed</option>
            <option value="unpaid" class="text-yellow-500">Pending</option>
            <option value="overdue" class="text-red-500">Overdue</option>
          </select>

          <!-- Year Select -->
          <select
            v-model="selectedYear"
            @change="changeSearched(paymentStatus)"
            class="w-full lg:w-1/4 border border-gray-300 rounded-lg h-10 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="" disabled>Select Year</option>
            <option value="all">All</option>
            <option v-for="year in $years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>

          <!-- Month Select (conditional rendering) -->
          <select
            v-if="selectMonth"
            v-model="selectedMonth"
            @change="changeSearched(paymentStatus)"
            class="w-full lg:w-1/4 border border-gray-300 rounded-lg h-10 px-0 lg:px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="" disabled>Select Month</option>
            <option value="all">All</option>
            <option
              v-for="month in $months"
              :key="month.value"
              :value="month.value"
            >
              {{ month.name }}
            </option>
          </select>
          <div class="flex-1 w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by Name, Email, Username"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
        </div>

        <div class="overflow-x-auto overflow-y-auto h-96">
  <!-- Table -->
  <table class="table-auto min-w-full border-collapse border-b border-gray-300">
    <!-- Table Head -->
    <thead class="bg-blue-50 text-white sticky top-0 z-10">
      <tr class="text-blue-500 text-xs">
        <th class="w-24 p-4 font-bold tracking-wide text-left">UserCode</th>
        <th class="w-36 p-4 font-bold tracking-wide text-left">Full Name</th>
        <th class="w-36 p-4 font-bold tracking-wide text-left">Year</th>
        <th class="w-36 p-4 font-bold tracking-wide text-left">Month</th>
        <th class="w-24 p-4 font-bold tracking-wide text-left">Paid/Unpaid</th>
        <th class="w-24 p-4 font-bold tracking-wide text-left">Action</th>
      </tr>
    </thead>
    <!-- Scrollable Table Body -->
    <tbody class="divide-y divide-gray-200 bg-gray-50 overflow-y-auto">
      <tr
      @click="paymentHistory(
              searchPayment.userCode,
              searchPayment.fullName,
              searchPayment.activeYear,
              searchPayment.activeMonth,
              
              searchPayment.status
            )"
        v-for="searchPayment in searchedpayments"
        :key="searchPayment._id"
        class="cursor-pointer bg-white hover:shadow-lg hover:bg-blue-100 rounded-lg p-4"
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
        <td class="p-4 text-xs" >
          <span
            :class="{
              'bg-green-100 text-green-600 font-bold px-2 py-1 rounded': searchPayment.isPaid,
              'bg-yellow-100 text-yellow-600 font-bold px-2 py-1 rounded': (!searchPayment.isPaid && searchPayment.status==='pending'),
              'bg-red-100 text-red-600 font-bold px-2 py-1 rounded': (!searchPayment.isPaid && searchPayment.status==='overdue')
            }"
          >
            <span v-if="searchPayment.isPaid">Paid</span>
            <span v-else-if="!searchPayment.isPaid && searchPayment.status==='pending'">pending</span>
            <span v-else-if="!searchPayment.isPaid && searchPayment.status==='overdue'">Overdue</span>
          </span>
        </td>
        <td class="p-4">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded shadow-lg"
            @click="paymentHistory(
              searchPayment.userCode,
              searchPayment.fullName,
              searchPayment.activeYear,
              searchPayment.activeMonth,
              searchPayment.status
            )"
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
import * as XLSX from "xlsx";
export default {
  name: "paymentsView",
  components: {
    //paymentsForm,
  },
  data() {
    return {
      selectMonth: false,
      paymentStatus: "",
      activeYear: new Date().getFullYear(),
      activeMonth: new Date().getMonth() + 1,
      selectedYear: "",
      selectedMonth: "",
      monthlReport: [],
      count: 1,
      confirmedpayments: [],
      paymentsPerpage: "",
      paymentType: "",
      timeRange: "",
      year: "",
      semiYear: "",
      month: "all",
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
  this.displayedItems(); // Initialize table data

  try {
    const response = await this.$apiClient.get("/api/v1/paymentSetting/latest");
    if (response.data.status === 1) {
      this.activeMonth = response.data.paymentSetting.activeMonth;
      this.activeYear = response.data.paymentSetting.activeYear;
      console.log("activeMonth", this.activeMonth, this.activeYear);
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching payment settings:",
      error
    );
  }

  // First, fetch payments
  await this.fetchPayments();

  // Then evaluate conditions based on the query status
  if (this.$route.query.status === "confirmed") {
    this.paymentStatus = "paid";
    this.changeSearched(this.paymentStatus);
  } else if (this.$route.query.status === "overdue") {
    this.paymentStatus = "overdue";
    this.changeSearched(this.paymentStatus);
  }
},

  methods: {
    exportToExcel() {
      if (this.searchedpayments.length > 0) {
        console.log("This searched payments", this.searchedpayments);
        const data = this.searchedpayments.map((payment) => ({
          "Full Name": payment.fullName,
          "User Code": payment.userCode,
          Billcode: payment.billCode,
          Year: payment.activeYear,
          Month: payment.activeMonth,
          Regular: payment.regular.amount,
          Subsidy: payment.subsidy.amount,
          Urgent: payment.urgent.amount,
          "Total Block":
            payment.regular.amount +
            payment.subsidy.amount +
            payment.urgent.amount,
          "Reg Fee": payment.registrationFee,
          "Monthly Service": payment.service.amount,
          Penality: payment.penality.amount,
          "Total Service":
            payment.service.amount +
            payment.penality.amount +
            payment.registrationFee,
          Status: payment.status,
        }));
        // Create a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create a workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Items");

        // Write the workbook to a file and trigger download
        XLSX.writeFile(workbook, "items.xlsx");
      } else {
        alert("Nothing To download");
      }
    },

    paymentHistory(userCode,fullName, activeYear, activeMonth, status) {
      //alert("hii");
      if (status == "confirmed") {
        this.$router.push({
          path: `/admindashboard/payment-history-detail/${userCode}`,
          query: {
            year: activeYear,
            month: activeMonth,
          },
        });
      } else {
        this.$router.push({
          path: "/admindashboard/payments1",
          query:{
            activeTab:1,
            userCode:userCode,
            userSelected:true,
            fullName:fullName
          }
        });
      }
    },

    async fetchPayments() {
      const keyword = "allPayments";
     await  this.$apiClient
        .get("/api/v1/payments/getAllPayments", 
          {
            params:{
              keyword: keyword,
            }
          }
        )
        .then((response) => {
          console.log("response in the all payment nnnnnnn ", response);
          this.payments = response.data.payments;
          this.searchedpayments = this.payments;
          console.log("in fetch");
        })
        .catch((error) => {
          console.error("Error fetching payment data:", error);
        });
    },
    async changeSearched(paymentStatus) {
      //alert("hiiii")
      if (paymentStatus == "all" || paymentStatus == "") {
        if (this.selectedYear == "" || this.selectedYear == "all") {
          this.searchedpayments = this.payments.filter(
            (payment) => payment.isPaid == true || payment.isPaid == false
          );
          console.log(
            "this paymentsss either ser'' or all ",
            this.searchedpayments
          );
          return;
        } else {
          this.selectMonth = true;
          console.log("selected month", this.selectedMonth);

          if (this.selectedMonth == "" || this.selectedMonth == "all") {
            this.searchedpayments = this.payments.filter(
              (payment) => payment.activeYear == this.selectedYear
            );
          } else {
            this.searchedpayments = this.payments.filter(
              (payment) =>
                payment.activeYear == this.selectedYear &&
                payment.activeMonth == this.selectedMonth
            );
          }
        }
        //console.log("this ser payments in other year", this.searchedpayments)
        return;
      } else if (paymentStatus == "paid") {
       // alert("paid")
        if (this.selectedYear == "" || this.selectedYear == "all") {
          this.searchedpayments = this.payments.filter(
            (payment) => payment.isPaid == true && payment.status == "confirmed"
          );
        } else {
          this.selectMonth = true;
          if (this.selectedMonth == "" || this.selectedMonth == "all") {
            this.searchedpayments = this.payments.filter(
              (payment) =>
                payment.isPaid == true &&
                payment.activeYear == this.selectedYear &&
                payment.status == "confirmed"
            );
          } else {
            this.searchedpayments = this.payments.filter(
              (payment) =>
                payment.isPaid == true &&
                payment.activeYear == this.selectedYear &&
                payment.activeMonth == this.selectedMonth &&
                payment.status == "confirmed"
            );
          }
        }
        console.log("this in paid only", this.searchedpayments);
      } else if (this.paymentStatus == "unpaid") {
        if (this.selectedYear == "" || this.selectedYear == "all") {
          this.searchedpayments = this.payments.filter(
            (payment) => payment.isPaid == false && payment.status == "pending"
          );
          console.log("this in unpaid only", this.searchedpayments);
        } else {
          this.selectMonth = true;
          if (this.selectedMonth == "" || this.selectedMonth == "all") {
            this.searchedpayments = this.payments.filter(
              (payment) =>
                payment.isPaid == false &&
                payment.activeYear == this.selectedYear &&
                payment.status == "pending"
            );
          } else {
            this.searchedpayments = this.payments.filter(
              (payment) =>
                payment.isPaid == false &&
                payment.activeYear == this.selectedYear &&
                payment.activeMonth == this.selectedMonth &&
                payment.status == "pending"
            );
          }
        }
      } else {
       // alert("overdue")
        console.log("payments",this.payments);
        if (this.selectedYear == "" || this.selectedYear == "all") {
          this.searchedpayments = this.payments.filter(
            (payment) => payment.isPaid == false && payment.status == "overdue"
          );
          console.log("this in unpaid only", this.searchedpayments);
        } else {
          this.selectMonth = true;
          if (this.selectMonth == "" || this.selectMonth == "all") {
            this.searchedpayments = this.payments.filter(
              (payment) =>
                payment.isPaid == false &&
                payment.activeYear == this.selectedYear &&
                payment.status == "overdue"
            );
          } else {
            this.searchedpayments = this.payments.filter(
              (payment) =>
                payment.isPaid == false &&
                payment.activeYear == this.selectedYear &&
                payment.activeMonth == this.selectedMonth &&
                payment.status == "overdue"
            );
          }
        }
      }
    },

    filteredpaymentsInSearch() {
      //console.log("this payment in filter", this.payments);
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        this.searchedpayments = this.payments.filter(
          (payment) =>
            payment.userCode.toLowerCase().includes(query) ||
            payment.fullName.toLowerCase().includes(query)
        );
      }
    },

    navigateProfile(paymentId) {
      console.log("paymentid", paymentId);
      this.$router.push(`/admindashboard/data-table/${paymentId}`);
    },
    verify(paymentId) {
      this.$router.push(`/admindashboard/verify/${paymentId}`);
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