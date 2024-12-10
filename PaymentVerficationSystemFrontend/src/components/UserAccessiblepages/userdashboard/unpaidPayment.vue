<template>
  <div class="p-4">
 

    <div
      
      class=" "
    >
      <div class="text-gray-700 text-sm font-bold">
        <p>User Code: {{ userCode }}</p>
        <p>Full Name: {{ fullName }}</p>
      </div>

      <div class="border-t-2 border-blue-500 border-dotted mt-5" v-if="payments">
        <div
          class="p-4 border-b-2 border-blue-500 border-dotted cursor-pointer"
          v-for="(payment, paymentIndex) in payments"
          :key="paymentIndex"
          @click="changePaymentSelection(payment.id, paymentIndex)"
          :class="[
            'p-4 border-b cursor-pointer',
          
          ]"
        >
          <div class="mt-4 flex flex-col space-y-5">
            <div class="flex flex-row items-center">
              <div class="flex flex-col">
                <p class="text-blue-800 text-xs font-extrabold bg-blue-100 rounded-lg p-2">Month: {{ changeMonthIntoString(payment.activeMonth) }}</p>
                
               
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full bg-white">
                <thead>
                  <tr class="bg-gray-200">
                    <th
                      class="w-24 px-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Metric
                    </th>
                    <th
                      class="w-24 px-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Amount
                    </th>
                    
                    <th
                      class="w-24 px-3 text-sm font-extrabold tracking-wide text-left text-red-800"
                    >
                      Expected Penality
                    </th>
                  
                    <th
                      class="w-32 px-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Paid
                    </th>
                   
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-300">
                    <td class="px-3  text-sm text-gray-700 whitespace-nowrap ">
                       <span class="  rounded-md">Regular</span>
                    </td>
                    <td class="px-3  text-sm text-gray-700 whitespace-nowrap ">
                     {{ payment.regular.amount }}
                    </td>
                  
                    <td v-if="!payment.regular.isPaid" class="px-3 text-sm text-gray-700 whitespace-nowrap">
                      Not calculated
        
                    </td>
                    <td v-else class="px-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.regular.penality }}
                      
                    </td>
                    <td class="px-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.regular.isPaid }}
                    </td>

                   
                   
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td class="px-3 text-sm text-gray-700 whitespace-nowrap">
                      subsidy
                    </td>
                    <td class="px-3 text-sm text-gray-700 whitespace-nowrap">
                     {{ payment.subsidy.amount }}
                    </td>
                    <td v-if="!payment.subsidy.isPaid" class="px-3 text-sm text-gray-700 whitespace-nowrap">
                      
                      Not calculated
                    </td>
                    <td v-else class="px-3 text-sm text-gray-700 whitespace-nowrap">
                      <!-- {{ payment.subsidy.penality }} -->
                      {{ payment.subsidy.penality }}
                    </td>
                    <td class="px-3 text-sm text-gray-700 whitespace-nowrap">
                    {{ payment.subsidy.isPaid }}
                    </td>
                  
                  </tr>
                  <tr  class="border-b border-gray-300">
                    <td class="px-3 text-sm text-gray-700 whitespace-nowrap">
                      Urgent
                    </td>
                    <td class="px-3 text-sm text-gray-700 whitespace-nowrap">
                     {{ payment.urgent.amount }}
                    </td>
                    <td v-if="!payment.urgent.isPaid" class="px-3 text-sm text-gray-700 whitespace-nowrap">
                     
                      Not calculated
                    </td>
                    <td v-else class="px-3 text-sm text-gray-700 whitespace-nowrap">
                      <!-- {{ payment.urgent.penality }} -->
                      {{ payment.urgent.penality }}
                    </td>
                    <td class="px-3 text-sm text-gray-700 whitespace-nowrap">
                   {{ payment.urgent.isPaid }}
                    </td>
                  </tr>
                  <tr  class="border-b border-gray-300">
                    <td class="px-3 text-sm text-gray-700 whitespace-nowrap">
                      Service
                    </td>
                    <td class="px-3 text-sm text-gray-700 whitespace-nowrap">
                     {{ payment.service.amount }}
                    </td>
                    <td v-if="payment.service.isPaid" class="px-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.service.penality }}
                 
                    </td>
                    <td v-else class="px-3 text-sm text-gray-700 whitespace-nowrap">
                      <!-- {{ payment.service.penality }} -->
                      Not calculated
                    </td>
                    <td class="px-3 text-sm text-gray-700 whitespace-nowrap">
                     {{ payment.service.isPaid }}
                    </td>
                    
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
      <div v-else>
        Nothing to pay
      </div>

      <!-- this is the end of the forloop -->
    </div>

    <div
      v-if="nothingToPay"
      class="py-6 px-6 -mt-1 border-t border-blue-500 w-full mb-64"
    >
      <div
        class="relative p-6 bg-blue-100 border border-green-300 rounded-lg shadow-md flex justify-between items-center"
      >
        <span class="text-green-800 font-semibold text-lg w-2/3 text-sm">
          <span class="text-blue-800 text-sm">{{ fullName }} </span> has
          successfully completed all payments. No payments are currently overdue
          or in progress. Any open payments will be processed in the next month.
          <span class="text-blue-800">!!!</span>
        </span>
        <a
          href="/admindashboard/payment-history"
          class="text-sm w-1/4 text-blue-600 hover:text-blue-800 font-medium text-lg ml-4"
        >
          See Payment History
        </a>
        <div
          class="absolute top-0 right-0 -mt-3 -mr-3 w-6 h-6 bg-green-500 rounded-full"
        ></div>
      </div>
    </div>

    <div v-if="showPaymentDetailModal">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="flex flex-row">
              <div>Do You want to confirm The following Details</div>
              <div class="ml-64">
                <svg
                  @click="closeModal()"
                  class="w-6 h-6 custom-star hover:text-red-700 transition-colors duration-300 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <hr class="my-4 md:min-w-full bg-red-500" />

            <div class="overflow-y-auto" style="height: 300px">
              <form class="px-5 py-5">
                <div class="regular p-4">
                  <p class="text-blue-500">Regular Payment</p>
                  <div class="ml-3">
                    <p class="text-gray-400">regular Amount :5000</p>
                    <p class="text-gray-400">regular Paid Penality :30</p>
                    <p class="text-gray-400">bank Type:LIB</p>
                    <p class="text-gray-400">TTNumber:LIB096ty</p>
                  </div>
                </div>
                <div class="subsidy border-dotted border-t border-blue-800 p-4">
                  <p class="text-blue-500">Subsidy Payment</p>
                  <div class="ml-3">
                    <p class="text-gray-400">subsidy Amount :5000</p>
                    <p class="text-gray-400">subsidy Paid Penality :30</p>
                    <p class="text-gray-400">bank Type:LIB</p>
                    <p class="text-gray-400">TTNumber:LIB096ty</p>
                  </div>
                </div>
                <div class="urgent border-dotted border-t border-blue-800 p-4">
                  <p class="text-blue-500">Urgent Payment</p>
                  <div class="ml-3">
                    <p class="text-gray-400">urgent Amount :5000</p>
                    <p class="text-gray-400">urgent Paid Penality :30</p>
                    <p class="text-gray-400">bank Type:LIB</p>
                    <p class="text-gray-400">TTNumber:LIB096ty</p>
                  </div>
                </div>
                <div
                  class="service border-dotted border-t border-b border-blue-800 p-4"
                >
                  <p class="text-blue-500">Service Payment</p>
                  <div class="ml-3">
                    <p class="text-gray-400">service Amount :5000</p>
                    <p class="text-gray-400">service Paid Penality :30</p>
                    <p class="text-gray-400">bank Type:LIB</p>
                    <p class="text-gray-400">TTNumber:LIB096ty</p>
                  </div>
                </div>
              </form>
            </div>

            <hr class="my-4 md:min-w-full bg-red-500" />
            <button
              type="submit"
              @click="sendToDataBase()"
              class="ml-8 bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <i class="fas fa-save">
                <span class="text-md ml-3"> Yes </span>
              </i>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userEmail:"",
      userAddress:"",
      userPhoneNumber:"",
      userGender:"",
      fullName:this.userCode + " " + "Bana User",

      allPaymentSuccess: false,
      confirmedSuccessfully: "",
      paymentType: "",
      payBeforeThisMonth: false,
      nothingToPay: false,
      placeholderText: "-----------",
      fullName: "",
      nothingToPay: false,
      displayPaymentForm: true,
      getReceipt: false,
      showPaymentDetailModal: false,
      noSelectionCount: 0,
      previosSelected: -1,
      paymentVerified: true,
      showConfirmModal: false,
      keyword: "",
      filteredUsers: [],
      bankType: "",
      penality: "",
      selectedPayments: [],
      userId: "",
      userCode: "",
      payments: [],
      fillFields: false,
      enterUser: false,
      isVisible: false,
      noUser: false,
      searchId: "",
      currentId: "",
      selectedUser: null,
      payments: [],
    }
  },
  computed: {
    ...mapGetters([
      "getToken",
      "getUserId",
      "getLocale",
      "getName",
      "getUserCode",
    ]),

    userId() {
      return this.getUserId;
    },
    token() {
      return this.getToken;
    },

    locale() {
      this.$i18n.locale = this.getLocale;
      return this.getLocale;
    },
    name() {
      return this.getName;
    },

    userCode() {
      return this.getUserCode;
    },
  },
  mounted() {
console.log("this usercode and userId are",this.userCode,this.userId);
  this.$apiClient
    .get(`/api/v1/users/${localStorage.getItem('userId')}`)
    .then((response) => {
      console.log("Response client profile based on the id", response);
      this.userEmail = response.data.clientProfile.email;
      this.userAddress = response.data.clientProfile.address;
      this.userGender = response.data.clientProfile.gender;
      this.fullName = response.data.clientProfile.fullName;
      this.userPhoneNumber = response.data.clientProfile.phoneNumber;
      this.userCode = response.data.clientProfile.userCode;
      console.log("Usercode is=" ,response.data.clientProfile.userCode);
    })
    .catch((error) => {
      console.error("Error fetching client data:", error);
    });
     this.fetchNotPaid();
  },
  methods: {
    changeMonthIntoString(month) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      console.log("month of month", months[month]);

      if (month >= 1 && month <= 12) {
        return months[month - 1];
      }
      return "Invalid month";
    },
    fetchNotPaid() {
      //this.userCode
      this.$apiClient
        .get(`/api/v1/payments/search?keyword=${localStorage.getItem('userCode')}`)
        .then((response) => {
          console.log("not paid are",response)
          if (response.data.status === 1) {
            this.fullName = response.data.fullName;
            this.userCode = response.data.userCode;
            this.payments = response.data.items;
            console.log("response for the unapid ", response.data);
          } else {
            //this.nothingToPay = true;
            console.log("nothing tp pay");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
