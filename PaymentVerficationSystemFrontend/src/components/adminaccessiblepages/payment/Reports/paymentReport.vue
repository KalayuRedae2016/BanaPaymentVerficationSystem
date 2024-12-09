
<template>
  <div class="p-4 border border-gray-300 mt-5">
         <!-- // slect year year -->
    <div class="flex flex-row mb-6 space-x-3">
        <label for="month" class="block text-sm font-medium text-gray-700">Year</label>
        <select
         @change="getPaymentBasedOnYear()"
          v-model="year"
          class="custom-select"
        >
          <option  v-for="year in $years" :key="year" :value="year">{{ year }}</option>
        </select>
    </div>
<!-- //search user -->

    <div class=" -mt-1 text-xs">
      <div class="mb-4">
        <div class="flex flex-col">
          <div class="flex flex-row space-x-4">
            <label for="Search User" class="block text-sm font-medium text-gray-700">Search</label>
            <input
              @keyup.enter="searchUser"
              v-model="keyword"
              id="id-search"
              type="text"
              class="custom-input h-10"
              placeholder="Search by Usercode,Name"
            />
          </div>
          <!-- <p v-if="noUser" class="text-red-500 ml-32"><strong>Hoops! there is no user with this Id <span class="text-blue">{{ currentId }}</span></strong></p> -->
        </div>
      </div>
      <div v-if="showList" class="border-t-4 border-b-4 border-pink-900 border-dotted h-64 overflow-y-auto" id="">
        <div
          class="bg-white px-4 border-b border-blue-900 border-dotted cursor-pointer"
          v-for="(user, userIndex) in filteredUsers"
          :key="userIndex"
          :class="[
            'p-4 border-b cursor-pointer bg-white hover:bg-blue-100',
           
          ]"
          @click="toggleUserSelection(user.userCode)"
        >
          <div class="flex flex-row space-x-5 md:space-x-12 text-xs text-gray-500">
            <p class="font-bold text-blue-800 ">{{ user.userCode }}</p>
            <p class="text-gray-500 font-bold">{{ user.fullName }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- //table  -->
     <div class="overflow-x-auto text-xs ">
    <table v-if="showTable" class="w-full border border-gray-300 mt-5">
      <thead>
        <tr class="bg-gray-200">
          <th class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">UserCode</th>
          <th class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Year</th>
          <th class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Month</th>
          
          <th class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Regular</th>
          <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Subsidy</th>
          <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Urgent</th>
          <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Total Block</th>
          <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Service</th>
          <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Registration Fee</th>
          <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Penalty</th>
          <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Total Service</th>
          <th class="w-32 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800">Detail</th>
        </tr>
      </thead>

      <tbody>
        <!-- Loop through each month of the year -->
        <tr v-for="payment in payments" :key="payment.activeMonth">
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.userCode}}</td>
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.activeYear }}</td>
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.activeMonth }}</td>
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.regularAmountPaid }}</td>
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.subsidyAmountPaid }}</td>
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.urgentAmountPaid }}</td>
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.blockBankAccountPaid }}</td>
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.serviceAmountPaid }}</td>
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.registrationFee }}</td>
  
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.penalityAmountPaid }}</td>
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">{{ payment.serviceBankAccountPaid }}</td>
          <td class="p-3 text-md text-gray-700 whitespace-nowrap">
            <button
              @click="paymentHistoryDetail(payment)"
              class="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            >
              <i class="fas fa-eye mr-2"></i> View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
   <div v-if="showPaymentNotFound" class="text-red-500 my-5 mx-5">
     {{userCode}} has no paid payment in the selected year.
   </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      showList:false,
      showTable: false,
      showPaymentNotFound:false,
      selectYear:false,
      selectMonth:false,
      userCode:"",
      year: new Date().getFullYear(),
      showConfirmModal: false,
      keyword: "",
      filteredUsers: [],
      bankType: "",
      penality: "",
      selectedPayments: [],
      users:[],
      payments:[],
  
    }
  },
  watch: {
    keyword() {
      this.searchUsers(this.keyword);
    },
  },

 mounted() {
    this.$apiClient
      .get("/api/v1/users/", {
        params: {
          isActive: true,
        },
      })
      .then((response) => {
        console.log("users", response.data.message);
        if (response.data !== null) {
          this.users = response.data.users;
          this.filteredUsers = this.users;
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    console.log("These are the users please", this.users);
    this.filteredUsers=this.users;
    console.log("mounted filtered users",this.filteredUsers);
  },
methods: {
  getPaymentBasedOnYear(){
      this.toggleUserSelection(this.userCode)
  },
  paymentHistoryDetail(month){

    console.log("active month",this.month);
 this.$router.push({
  path: `/admindashboard/payment-history-detail/${this.userCode}`,
  query: {
    year: month.activeYear,
    month: month.activeMonth
  }
});
},

showPaymentMethod(){
if(this.year===''){
//  this.showPayment=true,
this.$apiClient.get('api/v1/payments',{
params:{
activeYear:this.year,
activeMonth:this.month,
userCode:this.userCode,
}

})

}
},
toggleUserSelection(userCode) {
  //alert("toggle selection");
  console.log("usercode is",this.userCode)
   this.showList=false;
  this.userCode=userCode;
  this.payments=[];
  console.log("usercode",this.userCode);

  this.showTable=true;
  this.filteredUsers="";
    if(this.year===''){
      this.selectYear=true;
      return;
    }
      this.$apiClient.get(
          `/api/v1/payments/userBalance?&activeYear=${this.year} &userCode=${userCode}`
        )
        .then((response) => {
          console.log("response userbalance",response);
          this.payments= response.data.payments;
          this.showTable=true;
          this.showPaymentNotFound=false;
        })
        .catch((error) => {
          this.showTable=false;
          this.showPaymentNotFound=true;
          console.error("Error fetching user balance:", error);
          
        });
    },

searchUsers(keyword) {
      this.showList=true;
      this.showPaymentNotFound=false;
      this.showTable=false;
      console.log("this users=", this.users);

      this.filteredUsers = this.users.filter((user) => {
        return (
          user.fullName.toLowerCase().includes(keyword.toLowerCase()) ||
          user.userCode.toLowerCase().includes(keyword.toLowerCase())
        );
      });

      console.log("filtered users", this.filteredUsers);
    },
sendToDataBase() {
      console.log("paymentsb", this.selectedPayments);
      if (this.selectedPayments.length === 0) {
        this.paymentVerified = false;
        console.log("length===0");
      } else {
        this.paymentVerified = true;
        this.selectedPayments.forEach((payment) => {
          if (payment.bankType === null || payment.bankType === "") {
            this.paymentVerified = false;
          }
        });
      }
      console.log("paymentsafter", this.selectedPayments);
    },
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
