<template>
  <div class="flex flex-col mt-5">
    <div class="pb-5 flex flex-col -mt-2">
      <div class="mt-8 -ml-3 rounded-lg p-1 lg:p-3 text-xs">
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

        <div class="overflow-x-auto">
          <div class="">
            <table class="w-full bg-white shadow-md">
              <thead>
                <tr class="bg-gray-200">
                  <th
                    class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800 text-xs"
                  >
                    UserCode
                  </th>
                  <th
                    class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    Full Name
                  </th>
                  <th
                    class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    Status
                  </th>
                  <th
                    class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class=" "
                  v-for="searchPayment in searchedpayments"
                  :key="searchPayment._id"
                >
                  <td class="p-3 text-xs text-gray-500 whitespace-nowrap">
                    <p class="px-3 rounded-lg">
                      {{ searchPayment.userCode }}
                    </p>
                  </td>

                  <td class="p-3 text-xs text-gray-500 whitespace-nowrap">
                    <p class="px-3 rounded-lg">
                      {{ searchPayment.fullName }}
                    </p>
                  </td>

                  <td class="p-3 text-xs text-gray-500 whitespace-nowrap">
                    <p class="px-3 rounded-lg">
                      {{ searchPayment.status }}
                    </p>
                  </td>
                  <td class="py-1 text-xs text-gray-500 whitespace-nowrap">
                    <button
                      class="mb-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 text-sm rounded flex items-center space-x-1"
                      @click="
                        paymentHistory(
                          searchPayment.userCode,
                          searchPayment.activeYear,
                          searchPayment.activeMonth,
                          searchPayment.status
                        )
                      "
                    >
                      <i class="fas fa-file-alt text-pink-500 text-xs"></i>
                      <span>Detail</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      
        </div>
        <div
            class="p-2 flex flex-col md:flex-row space-y-3 md:space-y-0 space-x-12 items-center mt-2 bg-white  rounded-lg shadow-md border border-gray-200"
          >
            <!-- Pagination Controls -->
            <div class="flex items-center">
              <!-- Select Payments Per Page -->
              <label
                for="payments-per-page"
                class="hidden mr-2 text-gray-600 font-medium"
                >Show:</label
              >
              <select
                id="payments-per-page"
                v-model="paymentsPerpage"
                @change="changePerPageNumber()"
                class="h-9 border border-gray-300 text-gray-700 rounded-lg shadow-sm px-3 mr-4 focus:outline-none focus:ring focus:border-pink-500"
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

            <button
              class=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1  px-3 text-sm rounded flex items-center space-x-1"
              @click="exportToExcel()"
            >
              <i class="fas fa-download text-pink-500"></i>
              <span>Excel</span>
            </button>
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

  mounted() {
    this.displayedItems(); //for the table
    this.$apiClient
      .get("/api/v1/paymentSetting/latest")
      .then((response) => {
        if (response.data.status === 1) {
          this.activeMonth = response.data.paymentSetting.activeMonth;
          this.activeYear = response.data.paymentSetting.activeYear;
          console.log("activeMonth", this.activeMonth, this.activeYear);
        }
      })
      .catch((error) => {
        console.error(
          "An error occurred while fetching payment sfettings:",
          error
        );
      });
    this.fetchPayments();
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

    paymentHistory(userCode, activeYear, activeMonth, status) {
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
        this.$router.push(`/admindashboard/bank-statement/${userCode}`);
      }
    },

    async fetchPayments() {
      const keyword = "allPayments";
      this.$apiClient
        .get("/api/v1/payments/getAllPayments", {
          params: {
            keyword: keyword,
          },
        })
        .then((response) => {
          console.log("response in the all payment ", response);
          this.payments = response.data.payments;
          this.searchedpayments = this.payments;
          console.log("in fetch");
        })
        .catch((error) => {
          console.error("Error fetching payment data:", error);
        });
    },
    async changeSearched(paymentStatus) {
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