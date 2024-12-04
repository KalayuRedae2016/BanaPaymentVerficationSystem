<template>
  <div class="p-4">
 

    <div
      
      class=" "
    >
      <div class="text-blue-800 font-extrabold">
        <p>{{ userCode }}</p>
        <p>{{ fullName }}</p>
      </div>

      <div class="border-t border-blue-900 ml-5 mt-5">
        <div
          class="p-4 border-b border-blue-900 cursor-pointer"
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
                <p class="text-indigo-800 text-xl font-extrabold"></p>
                Month:{{ payment.activeMonth }}
                <p class="mt-3 text-red-500" v-if="payment.permitSelect">
                  Youcan't pay before you pay months before this month please
                </p>
                <p
                  v-if="payment.confirmRegularSubsisyUrgentFirst"
                  class="text-red-500 mt-3"
                >
                  Please confirm regular, subsidy and urgent payments first
                </p>
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
                      class="w-24 px-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Expected Penality
                    </th>
                  
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Paid
                    </th>
                   
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      Regular
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                     {{ payment.regular.amount }}
                    </td>
                  
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.regular.penality }}
                    </td>
                  
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.regular.isPaid }}
                    </td>

                   
                   
                  </tr>
                  <tr>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      subsidy
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                     {{ payment.subsidy.amount }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.subsidy.penality }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {{ payment.subsidy.isPaid }}
                    </td>
                  
                  </tr>
                  <tr>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      Urgent
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                     {{ payment.urgent.amount }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.urgent.penality }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                   {{ payment.urgent.isPaid }}
                    </td>
                  </tr>
                  <tr>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      Service
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                     {{ payment.service.amount }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.service.penality }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                     {{ payment.service.isPaid }}
                    </td>
                    
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
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
      payments: [
        {
          fullName: "John Doe",
          userCode: "JD123",
          activeYear: 2024,
          activeMonth: "August",
          id: 1,
       
          regular: {
            paidAt: "2024-04-03",
            isPaid: false,
            amount: 100,
            penality: 0,
            bankType: "",
            TTNumber: null,
          },
          subsidy: {
            paidAt: null,
            isPaid: false,
            amount: 50,
            penality: 0,
            bankType: "WEGAGEN",
            TTNumber: null,
          },
          urgent: {
            paidAt: null,
            isPaid: false,
            amount: 200,
            penality: 0,
            bankType: "",
            TTNumber: null,
          },
          service: {
            paidAt: null,
            isPaid: false,
            amount: 75,
            penality: 0,
            bankType: "",
            TTNumber: null,
          },
          penality: {
            paidAt: null,
            isPaid: false,
            amount: 20,
            penality: 0,
            bankType: "",
            TTNumber: null,
          },
        },

        {
          id: 2,
          fullName: "Jane Smith",
          userCode: "JS456",
          activeYear: 2024,
          activeMonth: "August",
          paymentSelected: false,
          permitSelect: false,
          confirmRegularSubsisyUrgentFirst: false,
          regular: {
            paidAt: null,
            isPaid: false,
            amount: 150,
            penality: 0,
            bankType: "",
            TTNumber: null,
          },
          subsidy: {
            paidAt: null,
            isPaid: false,
            amount: 75,
            penality: 0,
            bankType: "",
            TTNumber: null,
          },
          urgent: {
            paidAt: null,
            isPaid: false,
            amount: 300,
            penality: 0,
            bankType: "",
            TTNumber: null,
          },
          service: {
            paidAt: null,
            isPaid: false,
            amount: 100,
            penality: 0,
            bankType: "",
            TTNumber: null,
          },
          penality: {
            paidAt: null,
            isPaid: false,
            amount: 30,
            penality: 0,
            bankType: "",
            TTNumber: null,
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters(["getToken", "getUserId", "getLocale", "getName"]),
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
  },
  mounted() {

    //  const userCode = this.userCode;
    //  console.log(userCode);

    //  this.fetchUnPaid();
  },
  methods: {
    fetchUnPaid() {
      this.$apiClient
        .get(`/api/v1/payments/search?keyword=${this.userCode}`)
        .then((response) => {
          if (response.data.status === 1) {
            this.fullName = response.data.fullName;
            this.userCode = response.data.userCode;
            this.payments = response.data.items;
            console.log("response", response.data);
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
