<template>
  <div class="p-2 rounded-lg border border-gray-300 ">
    <div class="flex flex-col lg:flex-row w-full space-x-0 lg:space-x-4  lg:mb-0">
      <div class="mb-4  w-full lg:w-1/2">
        <div class="flex flex-col">
          <div class="flex flex-row space-x-4">
            <label for="Search User" class="custom-label mt-2">Search</label>
            <input @keyup.enter="searchUser" v-model="keyword" id="id-search" type="text"
              class="rounded-md custom-input h-7" placeholder="Search by Usercode,Name" />
          </div>
        </div>
      </div>

    </div>
    <div v-if="showList"
      class="border-t-2 border-b-2 border-pink-900 border-dotted max-h-64 min-h-1 overflow-y-auto p-2" id="">
      <div class="bg-white px-4 border-b border-blue-900 border-dotted cursor-pointer"
        v-for="(user, userIndex) in filteredUsers" :key="userIndex" :class="[
          'p-4 border-b cursor-pointer bg-white hover:bg-blue-100',

        ]" @click="fetchTotalUserBalance(user._id, user.userCode, user.fullName)">
        <div class="flex flex-row space-x-5 md:space-x-12 text-xs text-gray-500">
          <p class="font-bold text-blue-800 ">{{ user.userCode }}</p>
          <p class="text-gray-500 font-bold">{{ user.fullName }}</p>
        </div>
      </div>
    </div>


    <div v-if="showTable">
      <!-- All Years Report -->
      <div class="text-xs mt-3 border-b border-t border-gray-500 py-3">
        <p class="text-blue-500">All Years Report</p>
        <div class="" v-if="totalUserBalanceLength > 0">

          <div class="mt-3 bg-white p-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
              <div>
                <ul class="space-y-2">
                  <li class="grid grid-cols-2">
                    <strong>Total Regular Amount Paid:</strong> <span>{{ totalUserBalances.totalRegularBalance }}
                      ETB</span>
                  </li>
                  <li class="grid grid-cols-2">
                    <strong>Total Subsidy Amount Paid:</strong> <span>{{ totalUserBalances.totalSubsidyBalance }}
                      ETB</span>
                  </li>
                  <li class="grid grid-cols-2">
                    <strong>Total Urgent Amount Paid:</strong> <span>{{ totalUserBalances.totalUrgentBalance }}
                      ETB</span>
                  </li>

                  <li class="grid grid-cols-2">
                    <strong class="text-blue-500">Total Block Bank Account Paid:</strong> <span>{{
                      totalUserBalances.totalBlockBankAccount
                      }} ETB</span>
                  </li>





                </ul>
              </div>
              <div>
                <ul class="space-y-2">

                  <li class="grid grid-cols-2">
                    <strong>Total Service Amount Paid:</strong> <span>{{ totalUserBalances.totalServiceBalance }}
                      ETB</span>
                  </li>
                  <li class="grid grid-cols-2">
                    <strong>Total Penalty Amount Paid:</strong> <span>{{ totalUserBalances.totalPenalityBalance }}
                      ETB</span>
                  </li>


                  <li class="grid grid-cols-2">
                    <strong class="text-blue-500">Total Service Bank Account Paid:</strong> <span>{{
                      totalUserBalances.totalServiceBankAccount }} ETB</span>
                  </li>

                </ul>


              </div>
              <u>
                <li class="grid grid-cols-2">
                  <strong class="text-green-500">Total Amount Paid:</strong> <span>{{
                    totalUserBalances.totalBlockBankAccount + totalUserBalances.totalServiceBankAccount}} ETB</span>
                </li>

              </u>
            </div>
          </div>
        </div>
        <div v-else class="text-pink-800 mt-5 ml-5"> <span class="text-blue-800 font-bold">{{ fullName }} ({{ userCode
            }})</span> does not have a balance!!!!</div>

      </div>

      <!-- Yearly Report -->
      <div class="border-b border-gray-500 mt-2" v-if="totalUserBalanceLength > 0">
        <div class="text-xs text-blue-500 mt-3">Yearly Report</div>
        <div class="flex flex-row w-2/3 lg:w-1/2 space-x-4 mt-3 ml-3 mb-3">
          <label for="month" class="custom-label text-gray-500 mt-2 ">Year</label>
          <select @change="getPaymentBasedOnYear()" v-model="year" class="rounded-md custom-select h-7">
            <option v-for="year in $years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="overflow-x-auto text-xs ml-3" v-if="showPaymentTable">
          <table class="w-full border border-gray-300 mt-5">
            <thead>
              <tr class="bg-gray-200">
                <th class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">UserCode</th>
                <th class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Year</th>
                <th class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Month</th>
                <th class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Regular</th>
                <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Subsidy</th>
                <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Urgent</th>
                <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Total Block</th>
                <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Service(+ Reg Fee)
                </th>
                <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Penalty</th>
                <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Total Service</th>
                <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in payments" :key="payment.activeMonth">
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.userCode }}</td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.activeYear }}</td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.activeMonth }}</td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.regularAmountPaid }}</td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.subsidyAmountPaid }}</td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.urgentAmountPaid }}</td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.blockBankAccountPaid }}</td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.serviceAmountPaid }}</td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.penalityAmountPaid }}</td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.serviceBankAccountPaid }}</td>
                <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                  <button @click="paymentHistoryDetail(payment)"
                    class="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
                    <i class="fas fa-eye mr-2"></i> View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="justify-center items-center my-3">
            <p class="text-pink-900 text-sm mx-3"> <span class="text-blue-800 font-bold mr-3"> {{ fullName }} ({{ userCode
                }})</span>does not have a balance in the selected year</p>
          </div>
        </div>
        <div v-if="showPaymentNotFound" class="text-blue-500 my-5 mx-5">
          <span class="text-blue-800 font-bold"> {{ fullName }} ({{ userCode }})</span> has no paid payment in the
          selected year.
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      showPaymentTable: false,
      totalUserBalances: {},
      totalUserBalanceLength: 0,
      showList: true,
      showTable: false,
      showPaymentNotFound: false,
      selectYear: false,
      selectMonth: false,
      userCode: "",
      year: "",
      showConfirmModal: false,
      keyword: "",
      filteredUsers: [],
      bankType: "",
      penality: "",
      selectedPayments: [],
      users: [],
      payments: [],

    }
  },
  watch: {
    keyword() {
      this.searchUsers(this.keyword);
    },
  },

  async mounted() {
    try {
      await this.$apiGet("/api/v1/users/", {
        params: {
          isActive: true,
        },
      })
        .then((response) => {
          console.log("users", response);
          if (response.data !== null) {
            this.users = response.users;
            this.filteredUsers = this.users;
          }
        })
    } catch (error) {
      console.error("Error fetching users:", error.status, console.error.message);

    } finally {

    };
    console.log("These are the users please", this.users);
    this.filteredUsers = this.users;
    console.log("mounted filtered users", this.filteredUsers);
  },
  methods: {

    paymentHistoryDetail(month) {

      console.log("active month", this.month);
      this.$router.push({
        path: `/admindashboard/payment-history-detail/${this.userCode}`,
        query: {
          year: month.activeYear,
          month: month.activeMonth
        }
      });
    },
    getPaymentBasedOnYear() {
      this.fetchPaymentReportByYear(this.userCode, this.fullName);
    },
    async showPaymentMethod() {
      if (this.year === '') {
        try {
          await this.$apiGet('api/v1/payments', {
            params: {
              activeYear: this.year,
              activeMonth: this.month,
              userCode: this.userCode,
            }

          })
        } catch (error) {
          console.log("error", error.status, error.message)
        } finally {

        }

      }
    },

    async fetchTotalUserBalance(userId, userCode, fullName) {
      this.showList = false;
      this.showTable = true;
      this.totalUserBalanceLength = 0;
      this.userCode = userCode;
      this.fullName = fullName;
      const params = {
        userId: userId,
        userCode: userCode,
        timeRange: "allTime",
      };
      try {
        await this.$apiGet("/api/v1/payments/reports", params).then(response => {
          console.log("user response all time userlevel report: ", response)
          // this.totalUserBalanceLength=response.items.userBalances.length ;
          this.totalUserBalances = response.items.userBalances.length > 0 ? response.items.userBalances[0] : null;
          console.log("total User balances", this.totalUserBalances);
          this.userCode = this.totalUserBalances.userCode;
          console.log("user code", this.userCode);
          //console.log("length of the fetched reports: ", response.items.userBalances.length );
          if ((this.totalUserBalances.totalBlockBankAccount + this.totalUserBalances.totalServiceBankAccount) > 0) {
            this.totalUserBalanceLength = response.items.userBalances.length
          }
        })
      } catch (error) {
        console.log("error for user balance fetching", error.status, error.message);
      } finally {

      }

    },
    async fetchPaymentReportByYear(userCode, fullName) {
      //alert("hii")
      this.showPaymentTable = false;
      //alert("hii")
      this.fullName = fullName
      //alert("toggle selection");
      console.log("usercode is", this.userCode)
      this.showList = false;
      this.userCode = userCode;
      this.payments = [];
      console.log("usercode", this.userCode);

      this.showTable = true;
      this.filteredUsers = "";

      const params = {
        userCode: this.userCode,
      }
      if (this.year != '') {
        params.activeYear = this.year;
      }
      console.log("params", params);
      try {
        await this.$apiGet(
          '/api/v1/payments/userBalance', params).then((response) => {
            console.log("response userbalance", response);

            if (this.year === '') {
              this.payments = [];
            } else {
              this.payments = response.payments;
              this.showPaymentTable = true;
            }
            this.showTable = true;
            this.showPaymentNotFound = false;
  

          })
      } catch (error) {
        this.showPaymentNotFound = true;
        console.error("Error fetching user balance:", error.status, error.message);
      } finally {

      }
    },
    searchUsers(keyword) {
      this.showList = true;
      this.showPaymentNotFound = false;
      this.showTable = false;
      console.log("this users=", this.users);

      this.filteredUsers = this.users.filter((user) => {
        return (
          user.fullName.toLowerCase().includes(keyword.toLowerCase()) ||
          user.userCode.toLowerCase().includes(keyword.toLowerCase())
        );
      });

      console.log("filtered users", this.filteredUsers);
    },
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
