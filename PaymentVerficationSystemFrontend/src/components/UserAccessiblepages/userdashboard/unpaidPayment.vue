<template>
  <div class="p-4">
 

    <div
      
      class=" "
    >
      <div class="text-gray-700 text-sm font-bold ml-1">
        <p>User Code: {{ userCode }}</p>
        <p>Full Name: {{fullName }}</p>
      </div>

      <div class="border-t-2 border-blue-500 border-dotted mt-5" v-if="payments.length >0">
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
                  
                    <td v-if="!payment.regular.isPaid" class="px-3 text-sm text-red-700 whitespace-nowrap">
                     {{ payment.regular.penality }} 
        
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
                    <td v-if="!payment.subsidy.isPaid" class="px-3 text-sm text-red-700 whitespace-nowrap">
                      
                     {{ payment.subsidy.penality }}
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
                    <td v-if="!payment.urgent.isPaid" class="px-3 text-sm text-red-700 whitespace-nowrap">
                     
                    {{ payment.urgent.penality }}
                    </td>
                    <td v-else class="px-3 text-sm text-red-700 whitespace-nowrap">
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
                    <td v-else class="px-3 text-sm text-blue-700 whitespace-nowrap">
                      <!-- {{ payment.service.penality }} -->
                     Not needed
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


      <div v-else class="mt-5 border border-gray-200 rounded-lg p-5 text-blue-500 ">
        There is no opened unpaid Payment
      </div>

      <!-- this is the end of the forloop -->
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
  this.$apiGetById('/api/v1/users/',localStorage.getItem('userId'))
    .then((response) => {
      console.log("Response client profile based on the id", response);
      this.userEmail = response.clientProfile.email;
      this.userAddress = response.clientProfile.address;
      this.userGender = response.clientProfile.gender;
      this.fullName = response.clientProfile.fullName;
      this.userPhoneNumber = response.clientProfile.phoneNumber;
      this.userCode = response.clientProfile.userCode;
      console.log("Usercode is=" ,response.clientProfile.userCode);
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
      const params={
        keyword: localStorage.getItem('userCode'),
        paymentStatus: "Not Paid",
      }
      this.$apiGet('/api/v1/payments/search',params)
        .then((response) => {
          console.log("not paid are",response)
          if (response.status === 1) {
            this.fullName = response.fullName;
            this.userCode = response.userCode;
            this.payments = response.items;
            console.log("response for the unapid ", response);
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
