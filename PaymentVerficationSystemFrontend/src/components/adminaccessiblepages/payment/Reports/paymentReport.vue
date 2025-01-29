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

        ]" @click="toggleUserSelection(user.userCode, user.fullName)">
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
        <div v-if="totalUserBalances.totalAmountPaid>0" class="mt-3 bg-white p-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            <div>
              <ul class="space-y-2">
                <li class="grid grid-cols-2">
                  <strong>Total Amount Paid:</strong> <span>{{ totalUserBalances.totalAmountPaid }} ETB</span>
                </li>
                <li class="grid grid-cols-2">
                  <strong>Total Block Bank Account Paid:</strong> <span>{{ totalUserBalances.totalBlockBankAccountPaid
                    }} ETB</span>
                </li>
                <li class="grid grid-cols-2">
                  <strong>Total Penalty Amount Paid:</strong> <span>{{ totalUserBalances.totalPenalityAmountPaid }}
                    ETB</span>
                </li>
                <li class="grid grid-cols-2">
                  <strong>Total Registration Paid:</strong> <span>{{ totalUserBalances.totalRegistrationPaid }}
                    ETB</span>
                </li>
                <li class="grid grid-cols-2">
                  <strong>Total Regular Amount Paid:</strong> <span>{{ totalUserBalances.totalRegularAmountPaid }}
                    ETB</span>
                </li>
              </ul>
            </div>
            <div>
              <ul class="space-y-2">
                <li class="grid grid-cols-2">
                  <strong>Total Service Amount Paid:</strong> <span>{{ totalUserBalances.totalServiceAmountPaid }}
                    ETB</span>
                </li>
                <li class="grid grid-cols-2">
                  <strong>Total Service Bank Account Paid:</strong> <span>{{
                    totalUserBalances.totalServiceBankAccountPaid }} ETB</span>
                </li>
                <li class="grid grid-cols-2">
                  <strong>Total Subsidy Amount Paid:</strong> <span>{{ totalUserBalances.totalSubsidyAmountPaid }}
                    ETB</span>
                </li>
                <li class="grid grid-cols-2">
                  <strong>Total Urgent Amount Paid:</strong> <span>{{ totalUserBalances.totalUrgentAmountPaid }}
                    ETB</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="mt-5 ml-5"> <span class="text-blue-800 font-bold">{{fullName}} ({{ userCode }})</span> This user does not have a balance!!!!</div>
      </div>

      <!-- Yearly Report -->
      <div class="border-b border-gray-500 mt-2">
        <div class="text-xs text-blue-500 mt-3">Yearly Report</div>
        <div class="flex flex-row w-full lg:w-1/2 space-x-4 mt-3 ml-3">
          <label for="month" class="custom-label text-gray-500 mt-2 mr-4 lg:mr-0">Year</label>
          <select @change="getPaymentBasedOnYear()" v-model="year" class="rounded-md custom-select h-7">
            <option v-for="year in $years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <!-- Table -->
        <div class="overflow-x-auto text-xs ml-3">
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
        <p class="text-pink-900 text-sm">No balance for the selected user !!!</p>
      </div>
        </div>
        <div v-if="showPaymentNotFound" class="text-blue-500 my-5 mx-5">
          <span class="text-pink-800">{{ fullName }}({{ userCode }})</span> has no paid payment in the selected year.
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalUserBalances: {},
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
    getPaymentBasedOnYear() {
      this.toggleUserSelection(this.userCode)
    },
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
    async toggleUserSelection(userCode, fullName) {

      this.fullName = fullName
      //alert("toggle selection");
      console.log("usercode is", this.userCode)
      this.showList = false;
      this.userCode = userCode;
      this.payments = [];
      console.log("usercode", this.userCode);

      this.showTable = true;
      this.filteredUsers = "";
      if (this.year === '') {
        this.selectYear = true;
        return;
      }
      const params = {
        activeYear: this.year,
        activeMonth: this.month,
        userCode: this.userCode,
      }
      try {
        await this.$apiGet(
          '/api/v1/payments/userBalance', params).then((response) => {
            console.log("response userbalance", response);
            this.payments = response.payments;
            this.showTable = true;
            this.showPaymentNotFound = false;
            this.totalUserBalances = response.userBalances;
          })
      } catch (error) {
        this.showTable = false;
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
