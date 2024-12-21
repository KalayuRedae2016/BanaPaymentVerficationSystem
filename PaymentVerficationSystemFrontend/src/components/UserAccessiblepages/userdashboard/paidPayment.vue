<template>
  <div class="text-xs">
    <div class="p-4">
      <div class="flex-row">
        <select
          v-model="year"
          id="month"
          class="w-1/2 custom-select"
          @change="getData()"
        >
          <option value="" disabled>Select Year</option>
          <option v-for="year in $years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <div
        v-if="selectYear"
        class="mt-5 mb-5 w-full p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md shadow-md flex justify-between items-center"
      >
        <div class="flex items-center">
          <i class="fas fa-exclamation-triangle mr-3"></i>
          <p class="text-sm">Please Select Year!!</p>
        </div>
        <button
          class="text-yellow-700 hover:text-yellow-900 focus:outline-none"
          @click="selectYear = !selectYear"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div
        class="space-y-2 mt-3 border-t border-gray-300"
        v-if="selectedPaymentLength >= 1"
      >
        <ul class="bg-white rounded-md shadow-md divide-y divide-gray-200">
          <li
            v-for="(payment, index) in payments"
            :key="index"
            class="flex items-center justify-between px-4 py-1"
          >
            <a
              href="#"
              class="hover:bg-blue-100 hover:text-blue-700 transition duration-150"
            >
              {{ changeMonthIntoString(payment.activeMonth) }}
            </a>
            <button
              @click="viewReceiptAsPDF(payment)"
              class="text-blue-500 hover:underline"
            >
              View Receipt
            </button>
            <button
              @click="downloadReceiptAsPDF(payment)"
              class="text-blue-500 hover:underline"
            >
              Download Receipt
            </button>
          </li>
        </ul>
      </div>
      <div id="pdf-container"></div>

      <!-- <div>
        <div class="ml-5">
          <div class="cursor-pointer" :class="['p-4 border-b cursor-pointer']">
            <div class="flex flex-col space-y-5">
              <div class="border-b border-gray-500">
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
                        Penality
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
                        {{ payment.regular.paidAt }}
                      </td>

                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.regular.daysLate }}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.regular.penalty }}
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
                    </tr>
                    <tr v-if="payment.subsidy.amount > 0">
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        subsidy
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.subsidy.amount }}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.subsidy.paidAt }}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.subsidy.daysLate }}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.subsidy.penalty }}
                      </td>

                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.subsidy.bankType }}
                      </td>

                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.subsidy.TTNumber }}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.subsidy.isPaid }}
                      </td>
                    </tr>
                    <tr v-if="payment.urgent.amount > 0">
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        Urgent
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.urgent.amount }}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.regular.paidAt }}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.urgent.daysLate }}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.urgent.penalty }}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.urgent.bankType }}
                      </td>

                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.urgent.TTNumber }}
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
                        {{ payment.service.paidAt }}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.service.daysLate }}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{ payment.service.penalty }}
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
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex flex-row items-center">
                <p class="text-indigo-800 text-xl font-extrabold"></p>
                <div class="ml-auto">
                  <button @click="printDiv()" class="custom-button">
                    Get Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="w-full flex flex-row hidden" id="printable-area">
      <!-- First Receipt -->
      <div
        class="w-full p-2 receipt border-4"
        style="border: 1px dotted #622e2e"
      >
        <div class="text-blue-800 p-2 relative">
          <img
            src="../../../assets/img/banaReceipt1.jpg"
            alt="Barcode"
            class="mb-3 w-full"
          />
          <div class="flex items-center justify-between">
            <div class="text-xs flex items-center space-x-2" style="">
              <span class="font-semibold">BillCode:</span>
              <span>{{ selectedPayment.billCode }}</span>
            </div>
            <div
              class="text-xs flex items-center space-x-2"
              style="margin-right: 10px"
            >
              <span class="font-semibold">Confirmation Date:</span>
              <span>{{ selectedPayment.confirmedDate }}</span>
            </div>
          </div>

          <h2
            class="text-xs font-semibold mt-2"
            style="color: #622e2e; font-weight: bold"
          >
            Company Information
          </h2>
          <div class="grid grid-cols-2 gap-2 mt-1">
            <div class="bg-white border border-gray-300 p-2 relative">
              <!-- Wrapper for the table and the watermark image -->
              <div class="relative">
                <table
                  class="w-full text-xs relative z-10"
                  style="color: #622e2e; font-weight: bold"
                >
                  <tbody>
                    <tr>
                      <td class="font-semibold">Country:</td>
                      <td>{{ country }}</td>
                    </tr>
                    <tr>
                      <td class="font-semibold">City:</td>
                      <td>{{ city }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="bg-white border border-gray-300 p-2">
              <table
                class="w-full text-xs"
                style="color: #622e2e; font-weight: bold"
              >
                <tbody>
                  <tr>
                    <td class="font-semibold">Email:</td>
                    <td>{{ email }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Tel:</td>
                    <td>{{ tel }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Address:</td>
                    <td>{{ address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="bg-white border border-gray-300 p-2 mt-2 relative">
            <div class="relative">
              <img
                src="../../../assets/img/sample1.jpg"
                alt="Sample Stamp"
                class="absolute inset-0 w-32 h-32 mx-auto my-auto z-10 rounded-full"
              />
              <table class="w-full text-xs table-auto">
                <thead>
                  <tr>
                    <th class="text-left text-[#622e2e] font-bold py-1">
                      Payment Information
                    </th>
                    <th class="text-left"></th>
                    <th class="text-right"></th>
                  </tr>
                </thead>
                <tbody class="text-gray-500 font-bold">
                  <tr class="border-b border-gray-300 border-t border-gray-300">
                    <td class="font-semibold py-1" style="padding-left:20px;">UserCode</td>
                    <td></td>
                    <td style="padding-right:20px;" class="text-right py-1">{{ userCode }}</td>
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td style="padding-left:20px;" class="font-semibold py-1">FullName</td>
                    <td></td>
                    <td style="padding-right:20px;" class="text-right py-1">{{ fullName }}</td>
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td style="padding-left:20px;" class="font-semibold py-1">PaymentTerm</td>
                    <td></td>
                    <td style="padding-right:20px;" class="text-right py-1">{{ paymentTerm }}</td>
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td style="padding-left:20px;" class="font-semibold py-1">Year</td>
                    <td></td>
                    <td style="padding-right:20px;" class="text-right py-1">
                      {{ selectedPayment.activeYear }}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td style="padding-left:20px;" class="font-semibold py-1">Month</td>
                    <td></td>
                    <td style="padding-right:20px;" class="text-right py-1">
                      {{ changeMonthIntoString(selectedPayment.activeMonth) }}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td style="padding-left:20px;" class="font-semibold py-1">Regular Amount</td>
                    <td></td>
                    <td style="padding-right:20px;" class="text-right py-1">
                      {{ selectedPayment.regularAmountPaid }}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td style="padding-left:20px;" class="font-semibold py-1">Subsidy Amount</td>
                    <td></td>
                    <td style="padding-right:20px;" class="text-right py-1">
                      {{ selectedPayment.subsidyAmountPaid }}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td style="padding-left:20px;" class="font-semibold py-1">Urgent Amount</td>
                    <td></td>
                    <td style="padding-right:20px;" class="text-right py-1">
                      {{ selectedPayment.urgentAmountPaid }}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td style="padding-left:20px;" class="font-semibold py-1">Service Amount</td>
                    <td></td>
                    <td style="padding-right:20px;" class="text-right py-1">
                      {{ selectedPayment.serviceAmountPaid }}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td style="padding-left:20px;" class="font-semibold py-1">Penalty</td>
                    <td></td>
                    <td style="padding-right:20px;" class="text-right py-1">
                      {{ selectedPayment.penalityAmountPaid }}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td style="padding-left:20px;" class="font-semibold py-1">Total Block Amount Paid</td>
                    <td></td>
                    <td style="padding-right:20px;" class="text-right py-1">
                      {{
                        selectedPayment.regularAmountPaid +
                        selectedPayment.subsidyAmountPaid +
                        selectedPayment.urgentAmountPaid
                      }}
                    </td>
                  </tr>
                  <tr class="border-b border-gray-300">
                    <td style="padding-left:20px;" class="font-semibold py-1">
                      Total Service Amount Paid
                    </td>
                    <td></td>
                    <td  style="padding-right:20px;" class="text-right py-1">
                      {{
                        selectedPayment.serviceAmountPaid +
                        selectedPayment.penalityAmountPaid
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        
            <div class="mx-auto w-64 h-64 mt-10" id="qrCodeImageContainer"></div>
         
          

          <p class="text-center text-xs mt-2">The Best Mole Ever</p>
          <div
            style="
              display: flex;
              justify-content: center;
              color: #622e2e;
              font-weight: bold;
            "
          >
            <div class="footer" style="margin-bottom: 172.5px">
              &copy; {{ new Date().getFullYear() }} Bana Mole. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container hidden" id="printableee-area">
      <div class="receipt">
        <!-- 
  <div style="border-radius: 5px; font-size: 15px; font-weight: bold; text-align: center; margin: 10px 0; color:white; background-color:#9494b8; padding-top:3px; padding-bottom:3px; display: flex; align-items: center;">
  <img src="../../../../assets/img/banamall2.png" alt="" style="width: 25px; height: 25px; margin-right: 10px;margin-left:10px;">
  <h1 style="margin: 0;">Bana Mall Official Receipt</h1>
</div> -->

        <div style="width: 90%; max-width: 100%; min-width: 100%">
          <img
            src="../../../assets/img/banaReceipt1.jpg"
            alt=""
            style="max-width: 100%; height: auto; display: block"
          />
        </div>

        <div class="receipt-header" style="background-color: white">
          <div class="info">
            <div class="text" style="margin-left: -10px">
              Bill Code: <span>{{ payment.billCode }}</span>
            </div>
            <div class="text">
              <!-- Date(Day-Month-Year):
              <span
                >{{ receiptDate.getDate() }}-{{
                  changeMonthIntoString(receiptDate.getMonth() + 1)
                }}-{{ receiptDate.getFullYear() }}</span
              > -->
            </div>
          </div>
        </div>

        <h2 class="section-title" style="color: #622e2e; font-weight: bold">
          Company Information
        </h2>
        <div class="grid">
          <div class="box">
            <table class="table" style="color: #622e2e; font-weight: bold">
              <tr>
                <td>Country:</td>
                <td>{{ Country }}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{{ City }}</td>
              </tr>
            </table>
          </div>
          <div class="box">
            <table class="table" style="color: #622e2e; font-weight: bold">
              <tr>
                <td>Email:</td>
                <td>{{ Email }}</td>
              </tr>
              <tr>
                <td>Tel:</td>
                <td>{{ Tel }}</td>
              </tr>
              <tr>
                <td>address:</td>
                <td>{{ Address }}</td>
              </tr>
            </table>
          </div>
        </div>

        <h2 class="section-title" style="color: #622e2e; font-weight: bold">
          Payment Information
        </h2>
        <img
          src="../../../assets/img/sample.jpg"
          alt="Sample Stamp"
          class="absolute inset-0 w-64 h-64 mx-auto my-auto"
        />

        <table class="table">
          <tr>
            <td style="color: #333; font-weight: bold">FullName</td>
            <td class="right">{{ payment.fullName }}</td>
          </tr>
          <tr>
            <td style="color: #333; font-weight: bold">UserCode</td>
            <td class="right">{{ payment.userCode }}</td>
          </tr>

          <tr>
            <td style="color: #333; font-weight: bold">Payment Term</td>
            <td class="right">{{ paymentTerm }}</td>
          </tr>
          <tr>
            <td style="color: #333; font-weight: bold">RegFee</td>
            <td class="right">{{ payment.registrationFee }}</td>
          </tr>
          <tr>
            <td style="color: #333; font-weight: bold">Regular Amount</td>
            <td class="right">{{ payment.regular.amount }}</td>
          </tr>

          <tr>
            <td style="color: #333; font-weight: bold">Subsidy Amount</td>
            <td class="right">{{ payment.subsidy.amount }}</td>
          </tr>
          <tr>
            <td style="color: #333; font-weight: bold">Urgent Amount</td>
            <td class="right">{{ payment.urgent.amount }}</td>
          </tr>
          <tr>
            <td style="color: #333; font-weight: bold">Service Amount</td>
            <td class="right">{{ payment.service.amount }}</td>
          </tr>

          <tr>
            <td style="color: #333; font-weight: bold">Penality</td>
            <td class="right">{{ payment.penality.amount }}</td>
          </tr>

          <tr>
            <td style="color: #333; font-weight: bold">Total Block</td>
            <td class="right">
              {{
                payment.regular.amount +
                payment.subsidy.amount +
                payment.urgent.amount
              }}
            </td>
          </tr>
          <tr>
            <td style="color: #333; font-weight: bold">Total Service</td>
            <td class="right">
              {{ payment.penality.amount + payment.service.amount }}
            </td>
          </tr>
        </table>

        <div
          class="signature-section"
          style="color: #622e2e; font-weight: bold"
        >
          <div class="signature-row">
            <div class="signature-block">
              <span>Prepared by: ___________________________</span>
              <span style="margin-left: 11px"
                >Signature: ___________________________</span
              >
            </div>
            <div class="signature-block">
              <span>Received by: _________________________</span>
              <span style="margin-left: 13px"
                >Signature: _________________________</span
              >
            </div>
          </div>

          <div
            class="approval-section"
            style="color: #622e2e; font-weight: bold"
          >
            <div class="approval-block">
              <span>Approval Bank Deposit: ____________________________</span>
              <span style="margin-left: 58px"
                >Signature: ____________________________</span
              >
            </div>
          </div>
          <div style="position: relative; width: 100%; height: 150px">
            <div
              class="w-32 h-32"
              id="qrCodeImageContainer"
              style="
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 40px;
                background-color: lightgray;
              "
            >
              QR Code
            </div>
          </div>
        </div>

        <div
          style="
            display: flex;
            justify-content: center;
            margin-top: 25px;
            margin-bottom: 15px;
            color: #622e2e;
            font-weight: bold;
          "
        >
          <div class="footer">
            &copy; {{ new Date().getFullYear() }} Bana Mole. All rights
            reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcode";
import html2pdf from "html2pdf.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {

      userEmail:"",
      userAddress:"",
      userPhoneNumber:"",
      userGender:"",
      fullName:this.userCode + " " + "Bana User",

      
      selectedPaymentLength: 0,
      selectedPayment: {},
      showList: true,
      printableArea: false,
      year: "",
      month: "",
      selectYear: false,
      selectMonth: false,
      // we will try from db then. but now from static
      paymentTerm: "monthly",
      websiteUrl: "https://bannamall.com/",
      email: "",
      country: "Ethipia",
      tel: "",
      address: "",
      city: "Mekelle",

      receiptDate: new Date(),

      payments: [],

      //
      payment: {
        userCode: "BM0002",
        urgent: {
          amount: 40000,
          bankType: null,
          TTNumber: null,
          _id: "66b4b6dcb669aa17475c9f4c",
          isPaid: false,
          penality: 0,
          paidAt: "2024-08-08T14:57:15.581Z",
        },
        regular: {
          amount: 5000,
          bankType: null,
          TTNumber: null,
          _id: "66b4b6dcb669aa17475c9f4d",
          isPaid: false,
          penality: 0,
          paidAt: "2024-08-08T14:57:15.581Z",
        },
        subsidy: {
          amount: 10000,
          bankType: null,
          TTNumber: null,
          _id: "66b4b6dcb669aa17475c9f4e",
          isPaid: false,
          penality: 0,
          paidAt: "2024-08-08T14:57:15.581Z",
        },
        service: {
          amount: 200,
          bankType: null,
          TTNumber: null,
          _id: "66b4b6dcb669aa17475c9f4f",
          isPaid: false,
          penality: 0,
          paidAt: "2024-08-08T14:57:15.581Z",
        },
        penality: 0,
        baseAmount: 55752,
        totalExpectedAmount: 55000,
        daysLate: -22,
        status: "pending",
        isPaid: false,
        TotalPenality: 0,
      },

      receiptData: {
        confirmedDate: new Date(),
        BillCode: "BC123456",
        Date: "2024-08-06",
        Country: "Ethiopia",
        City: "Mekelle",
        Email: "bana@gmail.com",
        Tel: "096-740-501",
        Address: "Mekelle Kedemay Weyane",
        UserCode: "UC123",
        FullName: "John Doe",
        PaymentTerm: "Monthly",
        PaymentDate: "2024-08-06",
        EmergencyAmount: "1000",
        RegularAmount: "5000",
        ServiceAmount: "2000",
        SubsidyAmount: "1500",
        Penalty: "300",
        DaysLate: "5",
        TransferredAmount: "8500",
        website: "bannamall.com",
      },
    };
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
      console.log("I give this usercode please",this.getUserCode);
      return this.getUserCode;
    },
  },
  watch: {},

  mounted() {
    this.$apiClient
      .get("/api/v1/organization")
      .then((response) => {
        console.log("Org response", response);
        if (response.data.status === 1) {
          console.log(
            "Organization email",
            response.data.organization.companyEmail
          );
          this.email = response.data.organization.companyEmail;
          this.tel = response.data.organization.companyPhoneNumber;
          this.address = response.data.organization.companyAddress;
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
        this.organizationCreated = 0;
      });
    //console.log("payment is",this.payment);
    this.year = new Date().getFullYear();

//find user info
this.$apiClient
      .get(`/api/v1/users/${this.userId}`)
      .then((response) => {
        console.log("Response client profile in unpaid", response);

        this.userEmail= response.data.clientProfile.email;
        this.userAddress= response.data.clientProfile.address;
        this.userGender= response.data.clientProfile.gender;
        this.fullName= response.data.clientProfile.fullName;
        this.userPhoneNumber= response.data.clientProfile.phoneNumber;
        this.userCode= response.data.clientProfile.userCode;
      })
      .catch((error) => {
        console.error("Error fetching client datakk:", error);
      });

    this.getData();


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
    async viewReceiptAsPDF(selectedPayment) {
      console.log("Selected payment:", selectedPayment);

      // Update the selected payment
      this.selectedPayment = selectedPayment;
      await this.generateQRCodeImage();
      // Wait for DOM updates
      await this.$nextTick();

      // Clone the printable area
      const element = document.getElementById("printable-area").cloneNode(true);
      element.classList.remove("hidden");

      // Create a wrapper dv to hold the content and styles
      const wrapperDiv = document.createElement("div");
      wrapperDiv.appendChild(element);
      // Add Tailwind reset styles
      const styleElement = document.createElement("style");
      styleElement.textContent = `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        
        }
        #printable-area {
          height: 100%;
          width: 100%;
          border:2px dotted blue;
        
        }
        @page {
          margin: 0; /* Remove default PDF margins */
        }
      `;
      wrapperDiv.appendChild(styleElement);

      // Configure html2pdf options
      const options = {
        filename: this.userCode,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1, useCORS: true }, // Reduce scale if necessary
        jsPDF: {
          unit: "in",
          format: "a4", // A4 size
          orientation: "portrait", // Portrait orientation
          compress: true, // Compress to reduce file size
        },
      };

      // Generate and open the PDF
      const pdfBlob = await html2pdf()
        .from(wrapperDiv)
        .set(options)
        .outputPdf("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    },

    async downloadReceiptAsPDF(selectedPayment) {
      console.log(selectedPayment);
      this.selectedPayment = selectedPayment;
      await this.generateQRCodeImage();
      // Wait for Vue to update the DOM
      this.$nextTick(() => {
        const element = document
          .getElementById("printable-area")
          .cloneNode(true);
        element.classList.remove("hidden");
        const wrapperDiv = document.createElement("div");
        wrapperDiv.appendChild(element);
        const styleElement = document.createElement("style");
        styleElement.textContent = `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        
        }
        #printable-area {
          height: 100%;
          width: 100%;
          border:2px dotted blue;
        
        }
        @page {
          margin: 0; /* Remove default PDF margins */
        }
      `;
        wrapperDiv.appendChild(styleElement);

        const options = {
          filename: this.fullName + "(" + this.userCode +")",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        html2pdf().from(wrapperDiv).set(options).save();
      });
    },

    getData() {

      console.log("this.usercode is",this.userCode);
      this.$apiClient
        .get(
          `/api/v1/payments/userBalance?&activeYear=${this.year} &userCode=${this.userCode}`
        )
        .then((response) => {
          console.log("response userbalance", response);
          this.payments = response.data.payments;
          console.log("payments of the given year", this.payments);
          this.selectedPaymentLength = 1;
        })
        .catch((error) => {
          this.selectedPaymentLength = 0;
          console.error("Error fetching user balance:", error);
        });
    },

    async generateQRCodeImage() {
    
      const qrData = `"User Code":${this.userCode}, "Full Name": ${this.fullName}, "Phone Number":${this.userPhoneNumber}, "Email":${this.userEmail}, "Address":${this.userAddress}, "Gender":${this.userGender}, "Company":${'https://bannamall.com/'}`;
      
      try {
        const qrCodeImage = await QRCode.toDataURL(qrData, {
          errorCorrectionLevel: "H",
        });
        document.getElementById(
          "qrCodeImageContainer"
        ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    },

 
    showPaymentMethod() {
      if (this.year === "") {
        //  this.showPayment=true,
        this.$apiClient.get("api/v1/payments", {
          params: {
            activeYear: this.year,
            activeMonth: this.month,
            userCode: this.userCode,
          },
        });
      }
    },
  },
};
</script>

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
  /* Ensure background color is set */
  #printable-area {
    background-color: white; /* Use a solid color or adjust as needed */
  }
}

@media print {
  #printable-area {
    display: flex !important;
    flex-direction: row !important;
    width: 100% !important;
    height: 100%;
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
    border: 1px dotted #622e2e; /* Red dotted border */
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
