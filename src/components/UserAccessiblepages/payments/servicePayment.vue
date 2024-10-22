<template>

<div class=" ml-10 mr-5 mt-8">
    <div class="flex">
      <button
    v-for="(tab, index) in tabs"
    :key="index"
    :class="`px-4 py-2  mb-2 mr-2 ${
      activeTab1 === index
        ? 'bg-gray-200 border-b border-indigo-800 text-indigo-700 fornt-extrabold'
        : 'bg-gray-200 text-indigo-700'
    } `"
    @click="activateTab1(index)"
  >
    {{ tab }}
  </button>
    </div>
</div>

<div
        v-show="activeTab1=== 0"
        class="border-t border-r border-l border-gray-300"
      >
        <!-- Content for the first tab -->

        <div
          class="bg-white shadow-md rounded-lg p-6 w-full sm:w-auto "
        >
          <div class="flex flex-row space-x-5">
            <h1 class="mb-5 text-indigo-800 font-extrabold">
              THIS MONTH IS:<span class="text-indigo font-extrabold">JULY</span>
            </h1>
          </div>

          <table class="w-full">
            <thead>
              <tr class="bg-gray-300">
                <th
                  class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Metric
                </th>
                <th
                  class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Total
                </th>
                <th
                  class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <span
                    class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-teal-200 rounded-lg bg-opacity-50"
                    >Block
                  </span>
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  16/10/2021
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button
                    class="flex items-center px-4 py-2 bg-indigo-500 hover:bg-cyan-500 text-white rounded"
                  >
                    <i class="fas fa-eye mr-2"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <span
                    class="p-1.5 text-xs font-medium uppercase tracking-wider text-indigo-500 bg-green-500 rounded-lg bg-opacity-50"
                    >Service</span
                  >
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  16/10/2021
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button
                    class="flex items-center px-4 py-2 bg-indigo-500 hover:bg-cyan-500 text-white rounded"
                  >
                    <i class="fas fa-eye mr-2"></i>
                  </button>
                </td>
              </tr>

              <tr>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <span
                    class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-red-700 rounded-lg bg-opacity-50"
                    >Subsidy</span
                  >
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  16/10/2021
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button
                    class="flex items-center px-4 py-2 bg-indigo-500 hover:bg-cyan-500 text-white rounded"
                  >
                    <i class="fas fa-eye mr-2"></i>
                  </button>
                </td>
              </tr>

              <tr>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <span
                    class="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-pink-400 rounded-lg bg-opacity-50"
                    >Argent</span
                  >
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  16/10/2021
                </td>
                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button
                    class="flex items-center px-4 py-2 bg-indigo-500 hover:bg-cyan-500 text-white rounded"
                  >
                    <i class="fas fa-eye mr-2"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <h1 class="text-indigo-800 font-extrabold">Total amount:</h1>
        </div>
      </div>
  <div style="" class="flex flex-col justify-center">
    <div
      class="bg-auto bg-no-repeat bg-center ..."
      style="background-image: url(...)"
    ></div>
    <div class="border-b border-gray-200 dark:border-gray-700">
      <ul
        class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
      >
        <li
          class="me-2"
          :class="{
            'text-blue-500': isHistoryActive,
            'text-gray-600': !isHistoryActive,
          }"
        >
          <a
            @click="
              isHistoryActive = true;
              isPaymentActive = false;
            "
            href="#"
            class="inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-blue-500 hover:border-gray-300 dark:hover:text-gray-300 group"
          >
            <div class="bg-teal-500 rounded-full p-1">
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14v8m0-8V3" />
              </svg>
            </div>
            <div class="text-2xl font-extrabold ...">
              <span
                class="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-cyan-500"
              >
                Service Payment History
              </span>
            </div>
          </a>
        </li>

        <li
          @click="
            isHistoryActive = false;
            isPaymentActive = true;
          "
          class="me-2"
          :class="{
            'text-blue-500': isPaymentActive,
            'text-gray-500': !isPaymentActive,
          }"
        >
          <a
            href="#"
            class="inline-flex items-center justify-center p-4 text-teal-600 border-b-2 rounded-t-lg"
            aria-current="page"
          >
            <svg
              class="w-4 h-4 me-2 text-blue-600 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path
                d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857
           8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857
            1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857
             1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857
              18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857
               1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 
               16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"
              />
            </svg>
            <div class="text-2xl font-extrabold ...">
              <span
                class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-violet-500"
              >
                Make New Payment
              </span>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <div
      v-if="isHistoryActive"
      class="flex flex-col md:flex-row justify-center md:space-x-12"
    >
      <div class="flex flex-col">
        <h1 class="text-2xl mb-4 itallic">Service Payments History</h1>
        <div
          class="flex flex-col space-x-0 sm:flex-col space-x-0 md:flex-col space-x-0 lg:flex-col xl:flex-row xl:space-x-4"
        >
          <div>
            <h2 class="text-lg font-bold mb-2">
              Un Confirmed Payments History
            </h2>
            <table class="border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-200">
                  <th class="py-2 px-4 border-b text-cyan-500">
                    Requested Amount
                  </th>
                  <th class="py-2 px-4 border-b text-cyan-500">
                    Requested Date
                  </th>
                  <th class="py-2 px-4 border-b text-cyan-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="unconfiremed in unconfirmedPayments" :key="unconfiremed._id">
                  <td class="py-2 px-4 border-b">{{ unconfiremed.amount }}</td>
                  <td class="py-2 px-4 border-b">{{ unconfiremed.paymentRequestDate }}</td>
                  <button @click="showPaymentDetail(unconfiremed)"
                    class="px-4 py-2 text-sm font-medium text-black bg-green-200 rounded-md hover:bg-cyan-500"
                    
                  >
                    Deatil
                  </button>
                </tr>
               
              </tbody>
            </table>
          </div>


          <div>
            <h2 class="text-lg font-bold mb-2">Confirmed Payments History</h2>
            <table class="border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-200">
                  <th class="py-2 px-4 border-b text-teal-500">
                    Confirmed Amount
                  </th>
                  <th class="py-2 px-4 border-b text-teal-500">
                    Confirmed Date
                  </th>
                  <th class="py-2 px-4 border-b text-teal-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="confirmed in confirmedPayments" :key="confirmed._id">
                  <td class="py-2 px-4 border-b">{{ confirmed.amount }}</td>
                  <td class="py-2 px-4 border-b">{{ confirmed.confirmedDate}}</td>
                  <button
                    class="px-4 py-2 text-sm font-medium text-black bg-green-200 rounded-md hover:bg-cyan-500"
                  >
                    Deatil
                  </button>
                </tr>
              </tbody>
            </table>
          </div>


         <div v-if="unpaidPayments">
            <h2 class="text-lg font-bold mb-2">Unpaid Payments History</h2>
            <table class="border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-200">
                  <th class="py-2 px-4 border-b text-teal-500">
                 Amount
                  </th>
                  <th class="py-2 px-4 border-b text-teal-500">
                  month
                  </th>
                  <th class="py-2 px-4 border-b text-teal-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="unpaid in unpaidPayments" :key="unpaid._id">
                  <td class="py-2 px-4 border-b">{{ unpaid.amount }}</td>
                  <td class="py-2 px-4 border-b">{{ unpaid.date}}</td>
                  <button
                    class="px-4 py-2 text-sm font-medium text-black bg-green-200 rounded-md hover:bg-cyan-500"
                  >
                    Deatil
                  </button>
                </tr>
              </tbody>
            </table>
          </div>



          <div>
            <h2 class="text-lg font-bold mb-2"> Rejected Payments History</h2>
            <table class="border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-200">
                  <th class="py-2 px-4 border-b text-red-500">
                  Rejected Amount
                  </th>
                  <th class="py-2 px-4 border-b text-red-500">
                    Rejected Date
                  </th>
                  <th class="py-2 px-4 border-b text-red-500">
                    Reject Reason
                  </th>
                  <th class="py-2 px-4 border-b text-red-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rejected in rejectedPayments" :key="rejected._id">
                  <td class="py-2 px-4 border-b">{{ rejected.amount}}</td>
                  <td class="py-2 px-4 border-b">{{ rejected.date}}</td>
                  <td class="py-2 px-4 border-b">{{ rejected.reason}}</td>
                  <button
                    class="px-4 py-2 text-sm font-medium text-black bg-green-200 rounded-md hover:bg-cyan-500"
                  >
                    Deatil
                  </button>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex justify-center mt-2"
      @click="displayPaymentModal = !displayPaymentModal"
    >
      <!-- <button class="-ml-32 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  <i class="fas fa-credit-card mr-2"></i> Pay
</button> -->
    </div>



    <div v-if="displayPaymentModal">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="font-extrabold text-xl mt-2 mb-4">
              <div class="flex flex-row">
                <div>Are You Sure To Send This Payment</div>
                <div class="ml-16 mt-2" @click="closeModal">
                  <svg
                    class="w-6 h-6 text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer"
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
            </div>
            <div
              class="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300"
            >
              <h2 class="text-xl font-semibold mb-4">Receipt</h2>
              <div class="flex mb-4">
                <div class="w-1/2">
                  <label class="block text-lg font-medium text-gray-700"
                    >Amount:</label
                  >
                  <label class="block text-lg font-medium text-gray-700"
                    >Deposit Date:</label
                  >
                  <label class="block text-lg font-medium text-gray-700"
                    >Bank Account:</label
                  >
                  <label class="block text-lg font-medium text-gray-700"
                    >Bank:</label
                  >
                  <label class="block text-lg font-medium text-gray-700"
                    >reference ID:</label
                  >
                  <label class="block text-lg font-medium text-gray-700"
                    >Requested Date:</label
                  >
                </div>
                <div class="w-1/2">
                  <p class="text-gray-900 text-lg">{{service.amount}}</p>
                  <p class="text-gray-900 text-lg">{{service.depositedDate}}</p>
                  <p class="text-gray-900 text-lg">{{service.bank_account}}</p>
                  <p class="text-gray-900 text-lg">{{service.bank}}</p>
                  <p class="text-gray-900 text-lg">{{service.reference_id}}</p>
                  <p class="text-gray-900 text-lg">{{requestedDate}}</p>
                </div>
              </div>
              <button @click="servicePaymentData"
                class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded"
              >
                Send
              </button>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>


    <div v-if="displayPaymentModal1">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="font-extrabold text-xl mt-2 mb-4">
              <div class="flex flex-row">
                <div>service payment detail</div>
                <div class="ml-16 mt-2" @click="this.displayPaymentModal1=!this.displayPaymentModal1">
                  <svg
                    class="w-6 h-6 text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer"
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
            </div>
            <div
              class="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300"
            >
              <h2 class="text-xl font-semibold mb-4"> Unconfirmed Details </h2>
              <div class="flex mb-4">
                <div class="w-1/2">
                  <label class="block text-lg font-medium text-gray-700"
                    >Amount:</label
                  >
                  <label class="block text-lg font-medium text-gray-700"
                    >Deposit Date:</label
                  >
                  <label class="block text-lg font-medium text-gray-700"
                    >Bank Account:</label
                  >
                  <label class="block text-lg font-medium text-gray-700"
                    >Bank:</label
                  >
                  <label class="block text-lg font-medium text-gray-700"
                    >reference ID:</label
                  >
                  <label class="block text-lg font-medium text-gray-700"
                    >Requested Date:</label
                  >
                </div>
                <div class="w-1/2">
                  <p class="text-gray-900 text-lg">{{ unconfiremd_payment_detail.amount }}</p>
                  <p class="text-gray-900 text-lg">{{ unconfiremd_payment_detail.depositedDate }}</p>
                  <p class="text-gray-900 text-lg">{{unconfiremd_payment_detail.bankAccount}}</p>
                  <p class="text-gray-900 text-lg">{{unconfiremd_payment_detail.bankType}}</p>
                  <p class="text-gray-900 text-lg">{{unconfiremd_payment_detail.bankReferenceId}}</p>
                  <p class="text-gray-900 text-lg">{{unconfiremd_payment_detail.paymentRequestDate}}</p>
                </div>
              </div>
            
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
    <div v-if="isPaymentActive" class="border border-teal-500 mr-5">
      <form  class="max-w-md ml-5 mt-10 mb-10">
        <div class="mb-4">
          <label for="amount" class="block mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            v-model="service.amount"
            class="w-full border-gray-300 border rounded p-2"
          />
        </div>

        <div class="mb-4">
          <label for="depositedDate" class="block mb-2">Deposited Date</label>
          <input
            type="date"
            id="deposited date"
            v-model="service.depositedDate"
            class="w-full border-gray-300 border rounded p-2"
          />
        </div>
        <div class="mb-4">
          <label for="depositedDate" class="block mb-2">Reference ID</label>
          <input
            type="text"
            id="referenceid"
            v-model="service.reference_id"
            class="w-full border-gray-300 border rounded p-2"
          />
        </div>

        <div class="mb-4">
          <label for="requestedBank" class="block mb-2">Requested Bank</label>
          <select
            id="requestedBank"
            v-model="service.bank"
            class="w-full border-gray-300 border rounded p-2"
          >
            <option value="" disabled>Select Bank</option>
            <option value="ethio">Ethio Bank</option>
            <option value="lion">Lion Bank</option>
            <option value="wegagen">Wegagen Bank</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="depositedDate" class="block mb-2">Bank Account</label>
          <input
            type="text"
            id="bank_account"
            v-model="service.bank_account"
            class="w-full border-gray-300 border rounded p-2"
          />
        </div>
        <div class="text-center">
          <button
            @click.prevent="this.displayPaymentModal = !this.displayPaymentModal;"
            type="submit"
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: "DoctorChild1",
  data() {
    return {
      internetConnected: false,
      activeTab1: 0,
      tabs: ["Requested", "Confirmed", "Rejected"],

      userId:'660fc82bad10da91bc084791',
      unpaidPayments:false,
      unconfirmedPayments: [],
      confirmedPayments: [],
      rejectedPayments: [],

      unconfiremd_payment_detail:'',

      sendPayment:false,
      isPaymentActive: false,
      isHistoryActive: true,
      service: {
        amount: "",
        depositedDate: "",
        bank: "",
        bank_account: "",
        reference_id:'',
      },
      requestedDate:null,

      histryActive: true,
      AddNeyPayment: false,
      activeTab: "viewHistory",
      displayPaymentModal: false,
      displayPaymentModal1: false,
      screenSize: "",
      paymentHistory: [
        { amount: 100, date: "2022-01-01", status: "Approved" },
        { amount: 200, date: "2022-02-01", status: "Requested" },
        { amount: 150, date: "2022-03-01", status: "Rejected" },
        // Add more payment entries as needed
      ],
    };
  },

  mounted() {
    this.updateScreenSize();
    window.addEventListener("resize", this.updateScreenSize);

    
    this.apiClient.get(`/payment-history-service/${this.userId}`).then((response) => {
      this.paymentHistory = response.data;
      console.log("paymenthistoryof this user is",this.paymentHistory);

        for (let i = 0; i < this.paymentHistory.length; i++) {
        const payment = this.paymentHistory[i];
        console.log("payment i",payment);
        if (payment.confirmedDate=== null && payment.rejectedDate === null) {
          
          this.unconfirmedPayments.push(payment);
        

        } else if (payment.confirmedDate!== null) {
          this.confirmedPayments.push(payment);
          console.log("unconfirmed",this.unconfirmedPayments);

        } else if (payment.rejectedDate !== null) {
          this.rejectedPayments.push(payment);

        }
      }

      console.log("unconfirmed",this.unconfirmedPayments);
      console.log("confirmed",this.confirmedPayments);
      console.log("rejected",this.rejectedPayments);

        if(response.data===null){
          //this.servicepaymentCreated=false;
        }else{

          // this.servicepaymentCreated=true;
          // this.service_setting_data=response.data;
          }
        });

     // check unpaid.
      // this.apiClient.get("/unpaid").then((response) => { 
      //   this.unpaidPayments=response.data;

      
      //   });
  
  },
  created(){
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    this.requestedDate = new Date().toLocaleDateString(undefined, options).split('/').reverse().join('-');
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenSize);
  },
  methods: {

    servicePaymentData(){

      const servicePayment={
        amount:this.service.amount,
        depositDate:this.service.depositedDate,
        bankType:this.service.bank,
        bankAccount:this.service.bank_account,
        bankReferenceId:this.service.reference_id,
        paymentRequestDate:this.requestedDate,
        rejectedDate:'',
        confirmedDate:'',
        userId:this.userId,
      }

   
  
     
       
        this.apiClient.post("/payment-history-service",servicePayment).then((response) => { 
          console.log("response",response);
          if(response.data===null){
            //this.servicepaymentCreated=false;
          }else{

            // this.servicepaymentCreated=true;
            // this.service_setting_data=response.data;
              }
            });
            
            this.displayPaymentModal = !this.displayPaymentModal;

    },

    activateTab1(index) {
      this.activeTab = index;
    },

    handleClick(event) {
      const button = event.target;
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      button.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    },
    updateScreenSize() {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1920) {
        this.screenSize = "2xl";
      } else if (screenWidth >= 1440) {
        this.screenSize = "xl";
      } else if (screenWidth >= 1024) {
        this.screenSize = "lg";
      } else if (screenWidth >= 768) {
        this.screenSize = "md";
      } else {
        this.screenSize = "sm";
      }
    },
    closeModal() {
      //alert('CALED BUTTON')
      this.displayPaymentModal = false;
      this.sendPayment=true;
    },

    showPaymentDetail(unconfirmed) {
      console.log(unconfirmed);
      this.unconfiremd_payment_detail=unconfirmed;
      this.displayPaymentModal1 = true;
      
    },
    MakePayementActive() {
      this.isHistoryActive = false;
      this.isPaymentActive = true;
    },
    MakeHistoryActive() {
      this.isPaymentActive = false;
      this.isHistoryActive = true;
    },
  },
};
</script>

<style>
@media (max-width: 768px) {
  .flex-col {
    flex-direction: column;
  }
  .md:flex-row {
    flex-direction: row;
  }
  .md:space-x-12 > * + * {
    margin-top: 1rem;
  }
}
table {
  width: 100%;
  margin-bottom: 1rem;
}
th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
th {
  font-weight: bold;
}
tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
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
