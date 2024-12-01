<template>
    <div>
      <div class="container hidden" id="printable-area">
      <!-- Receipt 1 -->
      <div class="receipt">
        <div class="receipt-header">
          <div class="info">
            <div class="text">BillCode: <span>12345</span></div>
            <div class="text">Date: <span>01/12/2024</span></div>
            <div class="w-32 h-32" id="qrCodeImageContainer"></div>
          </div>
        </div>
  
        <h2 class="section-title">Company Information</h2>
        <div class="grid">
          <div class="box">
            <table class="table">
              <tr>
                <td>Country:</td>
                <td>USA</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>New York</td>
              </tr>
            </table>
          </div>
          <div class="box">
            <table class="table">
              <tr>
                <td>Email:</td>
                <td>example@example.com</td>
              </tr>
              <tr>
                <td>Tel:</td>
                <td>+1-555-5555</td>
              </tr>
            </table>
          </div>
        </div>
  
        <h2 class="section-title">Payment Information</h2>
        <table class="table">
          <tr>
            <td>UserCode</td>
            <td class="right">00123</td>
          </tr>
          <tr>
            <td>FullName</td>
            <td class="right">John Doe</td>
          </tr>
          <tr>
            <td>Regular Amount</td>
            <td class="right">$500</td>
          </tr>
          <tr>
            <td>Subsidy Amount</td>
            <td class="right">$200</td>
          </tr>
          <tr>
            <td>Total</td>
            <td class="right">$700</td>
          </tr>
        </table>
  
        <div class="signature-section">
          <!-- First Row: Prepared by and Received by -->
          <div class="signature-row">
            <div class="signature-block">
              <span>Prepared by: ______________</span>
              <span>Signature: ______________</span>
            </div>
            <div class="signature-block">
              <span>Received by: ______________</span>
              <span>Signature: ______________</span>
            </div>
          </div>
  
          <!-- Second Row: Approval -->
          <div class="approval-section">
            <div class="approval-block">
              <span>Approval Bank Deposit: ______________</span>
              <span>Signature: ______________</span>
            </div>
          </div>
        </div>
  
        <div class="footer">
          &copy; 2024 Bana Mole. All rights reserved.
        </div>
      </div>
  
      <!-- Receipt 2 -->
      <div class="receipt">
        <div class="receipt-header">
          <div class="info">
            <div class="text">BillCode: <span>67890</span></div>
            <div class="text">Date: <span>01/12/2024</span></div>
            <div class="" id="qrCodeImageContainer1" ></div>
          </div>
        </div>
  
        <h2 class="section-title">Company Information</h2>
        <div class="grid">
          <div class="box">
            <table class="table">
              <tr>
                <td>Country:</td>
                <td>USA</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>New York</td>
              </tr>
            </table>
          </div>
          <div class="box">
            <table class="table">
              <tr>
                <td>Email:</td>
                <td>example@example.com</td>
              </tr>
              <tr>
                <td>Tel:</td>
                <td>+1-555-5555</td>
              </tr>
            </table>
          </div>
        </div>
  
        <h2 class="section-title">Payment Information</h2>
        <table class="table">
          <tr>
            <td>UserCode</td>
            <td class="right">00123</td>
          </tr>
          <tr>
            <td>FullName</td>
            <td class="right">John Doe</td>
          </tr>
          <tr>
            <td>Regular Amount</td>
            <td class="right">$500</td>
          </tr>
          <tr>
            <td>Subsidy Amount</td>
            <td class="right">$200</td>
          </tr>
          <tr>
            <td>Total</td>
            <td class="right">$700</td>
          </tr>
        </table>
  
        <div class="signature-section">
          <!-- First Row: Prepared by and Received by -->
          <div class="signature-row">
            <div class="signature-block">
              <span>Prepared by: ______________</span>
              <span>Signature: ______________</span>
            </div>
            <div class="signature-block">
              <span>Received by: ______________</span>
              <span>Signature: ______________</span>
            </div>
          </div>
  
          <!-- Second Row: Approval -->
          <div class="approval-section">
            <div class="approval-block">
              <span>Approval Bank Deposit: ______________</span>
              <span>Signature: ______________</span>
            </div>
          </div>
        </div>
  
        <div class="footer">
          &copy; 2024 Bana Mole. All rights reserved.
        </div>
      </div>
    </div>
    <div class="">
      <div class="py-3  -mt-1 border-t border-blue-500">
        <p class="text-indigo-800 font-bold px-4">View and Get Receipt</p>
        <div class="border-t border-blue-900 ml-5 mt-5 px-3">
          <div class="mt-4 flex flex-col space-y-5">
            <div class="flex flex-row w-full bg-blue-100">
              <!-- Left Column: User Information -->
              <div class="text-gray-800 font-semibold py-4 text-md">
                <p>
                  <i class="fas fa-chevron-right mr-3 text-pink-500 ml-3"></i>User
                  Code:
                  <span class="text-blue-900 text-sm ml-5">{{
                    payment.userCode
                  }}</span>
                </p>
                <p>
                  <i class="fas fa-chevron-right mr-3 text-pink-500 ml-3"></i>
                  Full Name:
                  <span class="text-indigo-800 text-sm ml-5">{{
                    payment.fullName
                  }}</span>
                </p>
                <p>
                  <i class="fas fa-chevron-right mr-3 text-pink-500 ml-3"></i>
                  Report For:
                  <span class="text-indigo-800 text-sm ml-5"
                    >{{ payment.activeMonth }} {{ payment.activeYear }}</span
                  >
                </p>
              </div>
  
              <!-- Right Column: Print Button -->
              <div class="ml-auto">
                <button
                  @click="printDiv()"
                  class="custom-button mt-8 mr-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  <i class="fas fa-print text-pink-500"></i> Print
                </button>
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
                      Payment Date
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Days Late
                    </th>
                  
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Bank Type
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      TT Number
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Paid
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                     
                      <p class="bg-blue-100 text-blue-800 px-2 rounded-lg font-bold">Regular</p>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p>{{ payment.regular.amount }}</p>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p>{{ payment.regular.paidAt }}</p>
                    </td>
  
  
  
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p>{{ payment.regular.daysLate }}</p>
                    </td>
  
  
                    
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.regular.bankType }}
                    </td>
  
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.regular.TTNumber }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.regular.isPaid }}
                    </td>
  
                    <td
                      @click="showEditModalDetail(payment.billCode,payment.regular, 'regular',payment.activeMonth,payment.activeYear)"
                      class="p-3 text-sm text-gray-700 whitespace-nowrap"
                    >
                      <button class="custom-button">
                        <i class="fas fa-edit text-pink-500"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="payment.subsidy.amount > 0">
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p class="bg-cyan-100 text-cyan-800 px-2 rounded-lg font-bold">Subsidy</p>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.subsidy.amount }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p v-if="payment.subsidy.amount > 0">
                        {{ payment.subsidy.paidAt }}
                      </p>
                      <p v-else>----------------</p>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p>
                        {{ payment.subsidy.daysLate }}
                      </p>
                      
                    </td>
  
                    
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p v-if="payment.subsidy.amount > 0">
                        {{ payment.subsidy.bankType }}
                      </p>
                      <p v-else>--------------</p>
                    </td>
  
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p v-if="payment.subsidy.amount > 0">
                        {{ payment.subsidy.TTNumber }}
                      </p>
                      <p v-else>-------------</p>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p v-if="payment.subsidy.amount > 0">
                        {{ payment.subsidy.isPaid }}
                      </p>
                      <p v-else>Not needed</p>
                    </td>
  
                    <td
                      v-if="payment.subsidy.amount > 0"
                      class="p-3 text-sm text-gray-700 whitespace-nowrap"
                    >
                      <button
                        @click="showEditModalDetail(payment.billCode,payment.subsidy, 'subsidy',payment.activeMonth,payment.activeYear)"
                        class="custom-button"
                      >
                        <i class="fas fa-edit text-pink-500"></i>
                      </button>
                    </td>
  
                    <td
                      v-if="payment.subsidy.amount == 0"
                      class="p-3 text-sm text-gray-700 whitespace-nowrap"
                    >
                      Action Not Needed;
                    </td>
                  </tr>
  
                  <tr v-if="payment.urgent.amount > 0">
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p class="bg-pink-100 text-blue-800 px-2 rounded-lg font-bold">Urgent</p>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.urgent.amount }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.urgent.paidAt }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
               
                        {{ payment.urgent.daysLate }}
                  
                    </td>
                   
  
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p v-if="payment.urgent.amount > 0">
                        {{ payment.urgent.bankType }}
                      </p>
                      <p v-else>--------------</p>
                    </td>
  
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p v-if="payment.urgent.amount > 0">
                        {{ payment.urgent.TTNumber }}
                      </p>
                      <p v-else>-------------</p>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p v-if="payment.urgent.amount > 0">
                        {{ payment.urgent.isPaid }}
                      </p>
                      <p v-else>Not needed</p>
                    </td>
                    <td
                      v-if="payment.urgent.amount > 0"
                      class="p-3 text-sm text-gray-700 whitespace-nowrap"
                    >
                      <button
                        @click="showEditModalDetail(payment.billCode,payment.urgent, 'urgent',payment.activeMonth,payment.activeYear)"
                        class="custom-button"
                      >
                        <i class="fas fa-edit text-pink-500"></i>
                      </button>
                    </td>
  
                    <td
                      v-if="payment.urgent.amount == 0"
                      class="p-3 text-sm text-gray-700 whitespace-nowrap"
                    >
                      Action Not Needed;
                    </td>
                  </tr>
                  <tr>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p class="bg-yellow-100 text-blue-800 px-2 rounded-lg font-bold">Service</p>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.service.amount }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.service.paidAt }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                     <p v-if="!payment.service.dayslate">
                      {{ payment.service.daysLate }}
                     </p>
                     <p else>0</p>
  
                    </td>
                    
  
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.service.bankType }}
                    </td>
  
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.service.TTNumber }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{ payment.service.isPaid }}
                    </td>
                    <td
                      @click="showEditModalDetail(payment.billCode,payment.service, 'service',payment.activeMonth,payment.activeYear)"
                      class="p-3 text-sm text-gray-700 whitespace-nowrap"
                    >
                      <button class="custom-button">
                        <i class="fas fa-edit text-pink-500"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="overflow-x-auto">
              <table class="">
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
                      Regular Penality
                    </th>
                    <th
                      class="w-24 px-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Subsidy Penality
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Urgent Penality
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Total Penality
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Paid At
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Bank Type
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      TT Number
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Paid
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p class="bg-red-300 text-blue-800 px-2 rounded-lg font-bold">Penality</p>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      
                      <p class="bg-red-100 text-blue-800 px-2 rounded-lg font-bold">{{ payment.regular.amount }}</p>
                   
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                     
                      <p class="bg-red-100 text-blue-800 px-2 rounded-lg font-bold"> {{ payment.subsidy.amount }}</p>
                   
                    </td>
  
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    
                      <p class="bg-red-100 text-blue-800 px-2 rounded-lg font-bold">  {{ payment.urgent.amount }}</p>
                   
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    
                      <p class="bg-red-100 text-blue-800 px-2 rounded-lg font-bold">  {{ payment.penality.amount }}</p>
                   
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p v-if="payment.penality.amount > 0">
                        {{ payment.penality.paidAt }}
                        
                      </p>
                      <p v-else>----</p>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p v-if="payment.penality.bankType > 0">
                        {{ payment.penality.bankType }}
                      </p>
                      <p v-else>----</p>
                    </td>
  
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p v-if="payment.penality.amount > 0">
                        {{ payment.penality.TTNumber }}
                      </p>
                      <p v-else>----</p>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <p v-if="payment.penality.amount > 0">
                        {{ payment.penality.isPaid }}
                      </p>
                      <p v-else>Not Needed</p>
                    </td>
                    <td
                      @click="showEditModalDetail(payment.billCode,payment.penality, 'penality',payment.activeMonth,payment.activeYear)"
                      class="p-3 text-sm text-gray-700 whitespace-nowrap"
                    >
                      <button class="custom-button">
                        <i class="fas fa-edit text-pink-500"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div v-if="showEditModal">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="flex flex-row">
              <div>Edit Payment Detail</div>
              <div class="ml-64">
                <svg
                  @click="showEditModal = !showEditModal"
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
  
            <div class="">
              <form class="px-5 py-5">
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium text-gray-700 sm:text-base md:text-sm"
                  >
                    Payment Date
                    <span class="custom-star ml-1">*</span>
                  </label>
  
                  <input
                    @change="fetchPenality(paymentType, paidt)"
                    type="date"
                    class="w-full px-4 py-2 border border-gray-400 rounded"
                    placeholder="Payment Date"
                    v-model="paidAt"
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium text-gray-700 sm:text-base md:text-sm"
                  >
                    Bank Type
                    <span class="custom-star ml-1">*</span>
                  </label>
  
                  <select
                    v-model="bankType"
                    class="border border-gray-400 w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base h-10"
                  >
                    <option value="">Select Bank Type</option>
                    <option value="CBE">CBE</option>
                    <option value="WEGAGEN">Wegagen</option>
                    <option value="LIB">LIB</option>
                    <option value="Dashen">Dashen</option>
                    <option value="Oromia">Oromia</option>
                    <option value="Absinia">Absinia</option>
                  </select>
                </div>
  
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium text-gray-700 sm:text-base md:text-sm"
                  >
                    Payment Date
                    <span class="custom-star ml-1">*</span>
                  </label>
  
                  <input
                    type="TTNumber"
                    class="w-full px-4 py-2 border border-gray-400 rounded"
                    placeholder="TTNumber"
                    v-model="TTNumber"
                  />
                </div>
                <button
                  @click.prevent="saveChanges()"
                  type="submit"
                  class="bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  <i class="fas fa-save"
                    ><span class="text-md ml-3">Save Changes</span></i
                  >
                </button>
              </form>
            </div>
  
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
    </div>
  </template>
  
  <script>
  import QRCode from "qrcode";
  export default {
    data() {
      return {
        //for editing error and success
        showSuccess: false,
        showError: false,
        errorMessage: "",
        successMessage: "",
        selectedPayment:"",
        paidAt: null,
        TTNumber: "",
        bankType: "",
        paymentType: "",
        penality: "",
        showEditModal: false,
  
        payload:"",
        //from query or from payment;
        userCode: "",
        activeYear: "",
        activeMonth: "",
        billCode: "",
  
        // we will try from db then. but now from static
        paymentTerm: "monthly",
        websiteUrl: "https://bannamall.com/",
        Email: "bannamall@gmail.com",
        Country: "Ethipia",
        Tel: "0967740501",
        Address: "Mekelle Kedemay Weyane",
        City: "Mekelle",
        receiptDate: new Date(),
        //
  
        payment: {
          fullName: "Tadesse",
          activeYear: "2024",
          activeMonth: "january",
          userCode: "bana1",
          receiptDate: "",
          billCode: "BC123456",
          paymentTerm: "Monthly",
  
          regular: {
            amount: 500,
            penality: 200,
            paidAt: "2024-07-08",
            bankType: "WEGAGEN",
            TTNumber: "TT123456",
            isPaid: true,
            daysLate: 3,
          },
          subsidy: {
            amount: 10000,
            penality: 200,
            paidAt: "2024-05-01",
            bankType: "LIB",
            TTNumber: "TT123456",
            isPaid: true,
            daysLate: 3,
          },
          urgent: {
            amount: 40000,
            penality: 200,
            paidAt: "2024-5-1",
            bankType: "LIB",
            TTNumber: "TT123456",
            isPaid: true,
            daysLate: 3,
          },
          service: {
            amount: 200,
            penality: 200,
            paidAt: "2024-5-1",
            bankType: "LIB",
            TTNumber: "TT123456",
            isPaid: true,
            daysLate: 3,
          },
          penality: {
            amount: 500,
            penality: 200,
            paidAt: "2024-05-01",
            bankType: "LIB",
            TTNumber: "TT123456",
            isPaid: true,
            daysLate: 3,
          },
        },
      };
    },
  
    mounted() {
      this.userCode = this.$route.params.userCode || "Default UserCode";
      this.year = this.$route.query.year || "Default Year";
      this.month = this.$route.query.month || "Default Month";
  
      console.log("usercode,year,month", this.userCode, this.year, this.month);
      this.$apiClient
        .get("/api/v1/payments/paymentbyMonth", {
          params: {
            userCode: this.userCode,
            activeYear: this.year,
            activeMonth: this.month,
          },
        })
        .then((response) => {
          console.log("response pp", response);
          this.payment = response.data.payment;
          console.log("this payment is billcode ", this.payment.billCode);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  
    methods: {
  
  
      fetchPenality(paymentType, paidAt) {
        this.$apiClient
          .get("api/v1/payments/penality", {
            params: {
              activeYear: this.selectedPayment.activeYear,
              activeMonth: this.selectedPayment.activeMonth,
              paymentType: paymentType,
              paymentDate: paidAt,
            },
          })
          .then((response) => {
            this.payment.paymentTpe.penality = response.data.message;
          })
          .catch((error) => {
            console.log(error);
          });
      },
  
  
      showEditModalDetail(billCode,payment, paymentType,activeMonth,activeYear) {
        console.log("payment type: " ,paymentType);
           this.bankType = payment.bankType;
           this.TTNumber = payment.TTNumber;
           this.paidAt = payment.paidAt;
           this.paymentType = paymentType;
           this.billCode = billCode;
  
           this.activeMonth=activeMonth;
           this.activeYear=activeYear;
  
          
  
           this.selectedPayment=payment;
           this.selectedPayment.activeMonth=activeMonth;
           this.selectedPayment.activeYear=activeYear;
  
           this.showEditModal = true;
  
  
      },
  
  
      saveChanges() {
        if (this.paymentType === "regular") {
          this.payload = {
            billCode: this.billCode,
            regular:this.selectedPayment
          };
        }
        if (this.paymentType === "subsidy") {
          this.payload = {
            billCode: this.billCode,
            subsidy: this.selectedPayment
          };
        }
        if (this.paymentType === "urgent") {
          this.payload = {
            billCode: this.billCode,
            urgent: this.selectedPayment
          };
        }
        if (this.paymentType === "service") {
          this.payload = {
            billCode: this.billCode,
            service: this.selectedPayment
          };
        }
        if (this.paymentType === "penality") {
          this.payload = {
            billCode: this.billCode,
            service: this.selectedPayment
          };
        }
        console.log("Payload", this.payload);
        // Send the PATCH request with JSON payload
        this.$apiClient
          .patch("/api/v1/payments/update", this.payload, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log("Response from service confirming", response.data);
            // this.fetchUnPaid();
          })
          .catch((error) => {
            console.log("Error confirming", error);
            
          });
  
        this.showEditModal = false;
      },
  
      async generateQRCodeImage() {
        const qrData = `Bana ${this.paymentTerm} Report,UserCode: ${this.payment.userCode}, Full Name: ${this.payment.fullName},Year:${this.payment.activeYear},Month:${this.payment.activeMonth},BillCode:${this.payment.billCode},Email:${this.Email},Website:${this.websiteUrl}`;
        try {
          // Generate QR code as a data URL (image) without rendering it to a canvas
          const qrCodeImage = await QRCode.toDataURL(qrData, {
            errorCorrectionLevel: "H",
          });
  
          // You can now use qrCodeImage in an <img> tag directly
          document.getElementById(
            "qrCodeImageContainer"
          ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code" style="height:100px; width:100px;" /> `;
          document.getElementById(
            "qrCodeImageContainer1"
          ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code"  style="height:100px; width:100px;" />`;
        } catch (error) {
          console.error("Error generating QR code:", error);
        }
      },
  
      async printDiv() {
        await this.generateQRCodeImage();
        const printContent = document.getElementById("printable-area").innerHTML;
        const linkElement = document.createElement("link");
        linkElement.href = "/assets/css/tailwind.min.csss";
        linkElement.rel = "stylesheet";
        const printWindow = window.open(
          "",
          "",
          `height=${window.innerHeight},width=${window.innerWidth}`
        );
        printWindow.document.open();
        printWindow.document.write(`
        <html>
          <head>
            <style>
              @media print {
                #printable-area {
                  display: flex !important;
                  flex-direction: row !important;
                  width: 100% !important;
                }
                .receipt {
                  flex: 1 !important;
                  min-width: 0 !important;
                  page-break-inside: avoid; /* Prevents page breaks inside receipts */
                }
                body {
                  margin: 0 !important;
                  padding: 0 !important;
                }
  
                   .container {
        display: flex;
        flex-direction: row;
        width: 100%;
      }
  
      .receipt {
        flex: 1;
        padding: 10px;
        border: 4px dotted #ef4444; /* Red dotted border */
      }
  
      .receipt:nth-child(2) {
        border-left: none;
      }
  
      .receipt-header {
        background-color: #bbf7d0; /* Light green */
        color: #1d4ed8; /* Dark blue text */
        padding: 10px;
      }
  
      .receipt-header .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
  
      .receipt-header .info .text {
        font-size: 10px;
        font-weight: bold;
      }
  
      .receipt-header .qr {
        width: 80px;
        height: 80px;
        background: #e5e7eb; /* Placeholder for QR Code */
        margin-left: 10px;
      }
  
      .section-title {
        font-size: 12px;
        font-weight: bold;
        margin-top: 10px;
      }
  
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
        margin-top: 5px;
      }
  
      .box {
        background: #ffffff;
        border: 1px solid #d1d5db;
        padding: 5px;
      }
  
      .table {
        width: 100%;
        font-size: 10px;
        border-collapse: collapse;
      }
  
      .table th,
      .table td {
        padding: 2px;
        text-align: left;
      }
  
      .table .right {
        text-align: right;
      }
  
      .signature-section {
        margin-top: 15px;
        font-size: 10px;
      }
  
      .signature-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
  
      .signature-block {
        width: 45%;
        text-align: left;
      }
  
      .signature-block span {
        display: block;
        margin-bottom: 5px;
      }
  
      .approval-section {
        margin-top: 10px;
        font-size: 10px;
      }
  
      .approval-block span {
        display: block;
        margin-bottom: 5px;
      }
                /* Ensure background color is set */
                #printable-area {
                  background-color: white; /* Use a solid color or adjust as needed */
                }
              }
            </style>
            ${linkElement.outerHTML} <!-- Include the Tailwind CSS link -->
          </head>
          <body>
            <div id="printable-area">
              ${printContent}
            </div>
          </body>
        </html>
      `);
        printWindow.document.close();
        printWindow.onload = function () {
          printWindow.focus();
          printWindow.print();
        };
        printWindow.onafterprint = function () {
          printWindow.close();
        };
      },
    },
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
  