<template>
  <div class="flex flex-col">
    <Toast ref="toast" />

    <div class="pb-5 flex flex-col -mt-2">
      <div class="-ml-3 rounded-lg p-1 lg:p-3 text-xs">
        <div
          class="flex flex-col lg:flex-row items-center justify-between mb-2 space-x-0 lg:space-x-2 bg-white p-4 rounded-lg space-y-3 lg:space-y-0"
        >
          <!-- Search Input -->

          <!-- Payment Status Select -->

          <select
            v-model="paymentStatus"
            @change="changeSearched(paymentStatus)"
            class="text-gray-400 w-full lg:w-1/4 border border-blue-600 rounded-lg h-7 px-0 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
            class="text-gray-400 w-full lg:w-1/4 border border-blue-600 rounded-lg h-7 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
            class="w-full lg:w-1/4 border border-blue-600 rounded-lg h-7 px-0 lg:px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
              class="w-full h-7 px-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
        </div>

        <div class="overflow-x-auto overflow-y-auto h-96">
          <!-- Table -->
          <table
            class="table-auto min-w-full border-collapse border-b border-gray-300 shadow-lg border-t border-gray-300"
          >
            <!-- Table Head -->
            <thead class="bg-blue-50 text-white sticky top-0 z-10">
              <tr class="text-blue-500 text-xs">
                <th class="w-24 p-4 font-bold tracking-wide text-left">
                  UserCode
                </th>
                <th class="w-36 p-4 font-bold tracking-wide text-left">
                  Full Name
                </th>
                <th class="w-36 p-4 font-bold tracking-wide text-left">Year</th>
                <th class="w-36 p-4 font-bold tracking-wide text-left">
                  Month
                </th>
                <th class="w-24 p-4 font-bold tracking-wide text-left">
                  Paid/Unpaid
                </th>
                <th class="w-24 p-4 font-bold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>
            <!-- Scrollable Table Body -->
            <tbody class="divide-y divide-gray-200 bg-gray-50 overflow-y-auto">
              <tr
                v-for="searchPayment in searchedpayments"
                :key="searchPayment._id"
                class="cursor-pointer bg-white hover:shadow-lg hover:bg-blue-100 rounded-lg p-4"
              >
                <td class="p-4 text-xs text-gray-700">
                  <span class="font-bold text-indigo-600">{{
                    searchPayment.userCode
                  }}</span>
                </td>
                <td
                  @click="
                    paymentHistory(
                      searchPayment.userCode,
                      searchPayment.fullName,
                      searchPayment.activeYear,
                      searchPayment.activeMonth,

                      searchPayment.status
                    )
                  "
                  class="p-4 text-xs text-gray-700 font-bold"
                >
                  {{ searchPayment.fullName }}
                </td>
                <td
                  @click="
                    paymentHistory(
                      searchPayment.userCode,
                      searchPayment.fullName,
                      searchPayment.activeYear,
                      searchPayment.activeMonth,

                      searchPayment.status
                    )
                  "
                  class="p-4 text-xs text-gray-700 font-bold"
                >
                  {{ searchPayment.activeYear }}
                </td>
                <td
                  @click="
                    paymentHistory(
                      searchPayment.userCode,
                      searchPayment.fullName,
                      searchPayment.activeYear,
                      searchPayment.activeMonth,

                      searchPayment.status
                    )
                  "
                  class="p-4 text-xs text-gray-700 font-bold"
                >
                  {{ searchPayment.activeMonth }}
                </td>
                <td
                  @click="
                    paymentHistory(
                      searchPayment.userCode,
                      searchPayment.fullName,
                      searchPayment.activeYear,
                      searchPayment.activeMonth,

                      searchPayment.status
                    )
                  "
                  class="p-4 text-xs"
                >
                  <span
                    :class="{
                      'bg-green-100 text-green-600 font-bold px-2 py-1 rounded':
                        searchPayment.isPaid,
                      'bg-yellow-100 text-yellow-600 font-bold px-2 py-1 rounded':
                        !searchPayment.isPaid &&
                        searchPayment.status === 'pending',
                      'bg-red-100 text-red-600 font-bold px-2 py-1 rounded':
                        !searchPayment.isPaid &&
                        searchPayment.status === 'overdue',
                    }"
                  >
                    <span v-if="searchPayment.isPaid">Paid</span>
                    <span
                      v-else-if="
                        !searchPayment.isPaid &&
                        searchPayment.status === 'pending'
                      "
                      >pending</span
                    >
                    <span
                      v-else-if="
                        !searchPayment.isPaid &&
                        searchPayment.status === 'overdue'
                      "
                      >Overdue</span
                    >
                  </span>
                </td>
                <td class="p-4 flex flex-row space-x-2">
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

                  <button
                    @click="
                      paymentToBeDelated = searchPayment;
                      showDelateModal = !showDelateModal;
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
        </div>

        <div>
          <button @click="deletePaymentsModal = true" class="custom-button m-3">
            <i class="fas fa-trash-alt text-red-500"></i>
            <span class="ml-2">Delete All Payments</span>
          </button>
        </div>

        <div v-if="a" class="mx-5 text-blue-500 text-lg">
          No Opened,Overdue,Confirmed Payments
        </div>
      </div>
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
              <p>
                Are you sure you want to delete this user? This action cannot be
                undone.
              </p>
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

    <div v-if="deletePaymentsModal">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500 w-96">
            <div class="flex items-center justify-center mb-4">
              <svg
                class="w-8 h-8 text-red-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v6m0 0v-6m0 6h6m-6 0H6"
                ></path>
              </svg>
              <h2 class="text-2xl font-bold text-gray-800">
                {{ $t("warning") }}
              </h2>
            </div>

            <p class="text-gray-600 text-lg">
              {{ $t("Do you want to delete all Payments") }}
            </p>

            <div class="mt-6 flex space-x-5">
              <button
                @click="deleteAllPayments()"
                class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {{ $t("yes") }}
              </button>
              <button
                @click="deletePaymentsModal = false"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {{ $t("Cancel") }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import * as XLSX from "xlsx";
import Toast from "../../../Common/Toast.vue";
export default {
  name: "paymentsView",
  components: {
    //paymentsForm,
    Toast,
  },
  data() {
    return {
      paymentToBeDelated: "",
      deletePaymentsModal: false,
      paymentLength: 0,
      role: "",
      showDelateModal: false,
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
    this.role = localStorage.getItem("role");
  },

  async mounted() {
    this.displayedItems(); // Initialize table data

    try {
      await this.$apiGet("/api/v1/paymentSetting/latest").then((response) => {
        if (response.status === 1) {
          this.activeMonth = response.paymentSetting.activeMonth;
          this.activeYear = response.paymentSetting.activeYear;
          console.log("activeMonth", this.activeMonth, this.activeYear);
        }
      });
    } catch (error) {
      console.error(
        "An error occurred while fetching payment settings:",
        error.status,
        error.message
      );
    } finally {
    }

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
    confirmPaymentDelete(paymentToBeDelated) {
      console.log("payment to be deleted", paymentToBeDelated._id);
      try {
        this.$apiDelete("/api/v1/payments/deletePayment", paymentToBeDelated._id).then(
          (response) => {
            console.log("response", response);
            this.$refs.toast.showSuccessToastMessage(
              "Payment deleted Successfully"
            );
          }
        );
      } catch (error) {
        this.$refs.toast.showErrorToastMessage(error.message);
        console.log("error status,error message", error.status, error.message);
      } finally {
      }
    },

    deleteAllPayments() {
      try {
        this.$apiDelete("/api/v1/payments/deletePayments", "", "").then(
          (response) => {
            console.log("response", response);
            this.$refs.toast.showSuccessToastMessage(
              "All Payments Delated Successfully"
            );
          }
        );
      } catch (error) {
        this.$refs.toast.showErrorToastMessage(error.message);
        console.log("error status,error message", error.status, error.message);
      } finally {
      }
    },
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

    paymentHistory(userCode, fullName, activeYear, activeMonth, status) {
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
          query: {
            userCode: userCode,
            fullName: fullName,
            activeTab: 1,
            bankStatement: true,
            radioStatus: "newPayment",
          },
        });
      }
    },
    async fetchPayments() {
      const params = {
        keyword: "allPayments",
      };
      try {
        await this.$apiGet("/api/v1/payments/getAllPayments", params).then(
          (response) => {
            console.log("response in the all payment nnnnnnn ", response);
            this.payments = response.payments;
            this.searchedpayments = this.payments;
            if (response.payments != null) {
              this.paymentLength = response.payments.length;
            }
          }
        );
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
      }
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
        console.log("payments", this.payments);
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