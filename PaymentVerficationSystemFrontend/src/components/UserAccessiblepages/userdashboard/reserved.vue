<template>
    <div>
    <div class="p-4">
      <div class="flex flex-row space-x-5">
          <div class="flex flex-row   w-1/2 space-x-3">
          <label for="month" class="block text-sm font-medium text-gray-700">Year</label>
          <select
            v-model="year"
            id="month"
            class="custom-select"
            @click="getData()"
          >
            <option value="" disabled>Select Year</option>
             <option  v-for="year in $years" :key="year" :value="year">{{year}}</option>
          </select>
        </div>
        <div class=" flex flex-row w-1/2 space-x-3">
          <label for="month" class="block text-sm font-medium text-gray-700"
            >Month</label
          >
          <select v-model="month"  id="month" class="custom-select" @change="getData()">
            <option value="" disabled>Select Month</option>
            <option v-for="month in $months" :key="month" :value="month.value">{{month.name}}</option>
          </select>
        </div>
      </div>
      <div>
        <div class=" ml-5 ">
          <div
            class="cursor-pointer"
          
            :class="[
              'p-4 border-b cursor-pointer',
            
            ]"
          >
            <div class=" flex flex-col space-y-5">
            
  
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
                      {{payment.regular.amount}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.regular.paidAt}}
                      </td>
  
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.regular.daysLate}}
                      </td>
                      <td
                        class="p-3 text-sm text-gray-700 whitespace-nowrap "
                      >
                     
                        {{payment.regular.penalty}}
                      </td>
  
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{payment.regular.bankType}}
                      </td>
  
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{payment.regular.TTNumber}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{payment.regular.isPaid}}
                      </td>
                    
                    </tr>
                    <tr v-if="payment.subsidy.amount>0">
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        subsidy
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.subsidy.amount}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.subsidy.paidAt}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{payment.subsidy.daysLate}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                     {{payment.subsidy.penalty}}
                      </td>
  
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.subsidy.bankType}}
                      </td>
  
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{payment.subsidy.TTNumber}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{payment.subsidy.isPaid}}
                      </td>
                     
  
                    </tr>
                    <tr v-if="payment.urgent.amount>0">
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        Urgent
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.urgent.amount}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{payment.regular.paidAt}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.urgent.daysLate}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.urgent.penalty}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.urgent.bankType}}
                      </td>
  
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{payment.urgent.TTNumber}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {{payment.urgent.isPaid}}
                      </td>
                    </tr>
                    <tr>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        Service
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.service.amount}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.service.paidAt}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{payment.service.daysLate}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{payment.service.penalty}}
                      </td>
  
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.service.bankType}}
                      </td>
  
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {{payment.service.TTNumber}}
                      </td>
                      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                       {{payment.service.isPaid}}
                      </td>
                    
                    </tr>
                  </tbody>
                </table>
              </div>
           <div class="flex flex-row items-center">
                <p class="text-indigo-800 text-xl font-extrabold">
                 
                </p>
                <div class="ml-auto">
                  <button
                    @click="printDiv()"
                    class="custom-button"
                  >
                    Get Receipt
                  </button>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  
   <div class="w-full flex flex-row hidden" id="printablee-area">
    <!-- First Receipt -->
    <div class="w-full p-2 receipt border-4 border-red-500 border-dotted">
      <div class="bg-green-200 text-blue-800 p-2 relative">
        <img src="../../../assets/img/head.png" alt="Barcode" class="mb-3 w-full" />
        <div class="flex items-center justify-between">
          <div class="text-xs flex items-center space-x-2">
            <span class="font-semibold">BillCode:</span>
            <span>{{ payment.billCode }}</span>
          </div>
          <div class="text-xs flex items-center space-x-2">
            <span class="font-semibold">Confirmation Date:</span>
            <span>{{ payment.confirmedDate }}</span>
          </div>
        </div>
  
        <h2 class="text-xs font-semibold mt-2">Company Information</h2>
        <div class="grid grid-cols-2 gap-2 mt-1">
          <div class="bg-white border border-gray-300 p-2 relative">
            <!-- Wrapper for the table and the watermark image -->
            <div class="relative">
            <table class="w-full text-xs relative z-10">
                <tbody>
                  <tr>
                    <td class="font-semibold">Country:</td>
                    <td>{{ Country }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">City:</td>
                    <td>{{ City }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="bg-white border border-gray-300 p-2">
            <table class="w-full text-xs">
              <tbody>
                <tr>
                  <td class="font-semibold">Email:</td>
                  <td>{{ Email }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Tel:</td>
                  <td>{{ Tel }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Address:</td>
                  <td>{{ Address }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <div class="bg-white border border-gray-300 p-2 mt-2 relative">
          <div class="relative">
            <img src="../../../assets/img/sample.jpg" alt="Sample Stamp" class="absolute inset-0 w-64 h-64  mx-auto my-auto ">
            <table class="w-full text-xs relative z-10">
              <thead>
                <tr>
                  <th class="text-left">Payment Information</th>
                  <th class="text-left"></th>
                  <th class="text-right"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-semibold">UserCode</td>
                  <td></td>
                  <td class="text-right">{{ payment.userCode }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">FullName</td>
                  <td></td>
                  <td class="text-right">{{ payment.fullName }}</td>
                </tr>
              
                <tr>
                  <td class="font-semibold">PaymentTerm</td>
                  <td></td>
                  <td class="text-right">{{ paymentTerm }}</td>
                </tr>
               
                
                <tr>
                  <td class="font-semibold">Regular Amount</td>
                  <td></td>
                  <td class="text-right">{{payment.regular.amount }}</td>
                </tr>
               
                <tr>
                  <td class="font-semibold">Subsidy Amount</td>
                  <td></td>
                  <td class="text-right">{{ payment.subsidy.amount}}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Urgent Amount</td>
                  <td></td>
                  <td class="text-right">{{ payment.urgent.amount}}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Service Amount</td>
                  <td></td>
                  <td class="text-right">{{ payment.service.amount }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Penalty</td>
                  <td></td>
                  <td class="text-right">{{ payment.penality.amount }}</td>
                </tr>
                
                <tr>
                  <td class="font-semibold">Total Block Amount Paid</td>
                  <td></td>
                  <td class="text-right">{{ payment.regular.amount + payment.subsidy.amount + payment.urgent.amount }}</td>
                </tr>
                <tr v-if="payment.penality.amount>0">
                  <td class="font-semibold">Total Service Amount Paid</td>
                  <td></td>
                  <td class="text-right">{{ payment.service.amount + payment.penality.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
         
        </div>
        <div class=" mx-auto w-32 h-32 mt-10" id="qrCodeImageContainer"></div>
  
     
        <p class="text-center text-xs mt-2">The Best Mole Ever</p>
        <p class="text-center text-xs mt-1">
          &copy; 2024 Bana Mole. All rights reserved.
        </p>
      </div>
     </div>
    </div>
  
    <div class="container hidden" id="printable-area">
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
          <img src="../../../assets/img/sample.jpg" alt="Sample Stamp" class="absolute inset-0 w-64 h-64  mx-auto my-auto ">
           
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
  import QRCode from 'qrcode';
  import { mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        year:"",
        month:"",
        selectYear:false,
        selectMonth:false,
         // we will try from db then. but now from static
        paymentTerm:"monthly",
        websiteUrl: "https://bannamall.com/",
        Email: "bannamall@gmail.com",
        Country: "Ethipia",
        Tel: "0967740501",
        Address: "Mekelle Kedemay Weyane",
        City: "Mekelle",
        receiptDate: new Date(),
        //
         payment: {
          "urgent": {
          "amount": 40000,
          "bankType": null,
          "TTNumber": null,
          "_id": "66b4b6dcb669aa17475c9f4c",
          "isPaid": false,
          "penality": 0,
          "paidAt": "2024-08-08T14:57:15.581Z"
        },
        "regular": {
          "amount": 5000,
          "bankType": null,
          "TTNumber": null,
          "_id": "66b4b6dcb669aa17475c9f4d",
          "isPaid": false,
          "penality": 0,
          "paidAt": "2024-08-08T14:57:15.581Z"
        },
        "subsidy": {
          "amount": 10000,
          "bankType": null,
          "TTNumber": null,
          "_id": "66b4b6dcb669aa17475c9f4e",
          "isPaid": false,
          "penality": 0,
          "paidAt": "2024-08-08T14:57:15.581Z"
        },
        "service": {
          "amount": 200,
          "bankType": null,
          "TTNumber": null,
          "_id": "66b4b6dcb669aa17475c9f4f",
          "isPaid": false,
          "penality": 0,
          "paidAt": "2024-08-08T14:57:15.581Z"
        },
        "penality": 0,
        "baseAmount": 55752,
        "totalExpectedAmount": 55000,
        "daysLate": -22,
        "status": "pending",
        "isPaid": false,
        "TotalPenality": 0
      },
      
    
  
  
   receiptData: {
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
          website:"bannamall.com"
        },
      };
    },
    computed: {
      ...mapGetters(["getToken", "getUserId", "getLocale", "getName","getUserCode"]),
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
  
      userCode(){
        return this.getUserCode();
      }
  
    },
    watch: {
     
    },
  
    mounted() {
      //const userCode = this.userCode();
      const userCode="BM0001";
  
      this.$apiClient.get(`/api/v1/payments/latestPayment`,{
        params:{
          userCode: userCode
        }
      }).then((response) => {
          console.log("response latestConfirmed is",response.data);
          this.payment=response.data.payment;
      }).catch((error) => {
        console.log(error);
      });
    },
    methods: {
     
   getData(){
    if(this.year==''){
      this.selectYear=true;
      return;
    }
    if(this.month==''){
      this.selectMonth=true;
      return;
    }
  
     const userCode="BM0001";
      //const userCode = this.userCode();
  
      this.$apiClient
        .get("/api/v1/payments/paymentbyMonth", {
          params: {
            userCode: userCode,
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
  
  async generateQRCodeImage() {
   const qrData = `Bana Receipt For User`
   
   try {
      const qrCodeImage = await QRCode.toDataURL(qrData, { errorCorrectionLevel: 'H' });
      document.getElementById('qrCodeImageContainer').innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  },
  
   async printDiv() {
    // First, generate the QR code image
    await this.generateQRCodeImage();
        const printContent = document.getElementById("printable-area").innerHTML;
        // Create a link element to read the Tailwind CSS file
        const linkElement = document.createElement("link");
        linkElement.href = "/src/assets/css/tailwind.css"; // Adjust the path as necessary
        linkElement.rel = "stylesheet";
  
        // Create a new window for printing
        const printWindow = window.open(
          "",
          "",
          `height=${window.innerHeight},width=${window.innerWidth}`
        );
        printWindow.document.open();
  
        // Write the content to the new window
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
                  height:100%;
                  
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
  
        // Ensure that the print dialog opens and window closes after printing
        printWindow.onload = function () {
          printWindow.focus();
          printWindow.print();
        };
        printWindow.onafterprint = function () {
          printWindow.close();
          this.nothingToPay = true;
        };
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
  /* Add any custom styles here */
  </style>
  