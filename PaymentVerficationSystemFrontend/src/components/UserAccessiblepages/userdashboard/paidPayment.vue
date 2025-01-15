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
        <ul class="border border-gray-300 bg-white rounded-md shadow-md divide-y divide-gray-200 py-2 mt-5">
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
      <div v-else class="text-pink-800  p-4 text-md">
                  No payments found for the selected year. Please try again with a different year.
      </div>
      <div id="pdf-container"></div>
 </div>
    <div class="w-full flex flex-row hidden" id="printable-area" style="border: brown;">
      <!-- First Receipt -->
      <div
        class="w-full p-2 receipt border-4"
        
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
          <div
            style="
              display: flex;
              justify-content: center;
              color: #622e2e;
              font-weight: bold;
              margin-top: 20px;
            "
          >
            <div class="footer" style="">
              &copy; {{ new Date().getFullYear() }} Bana General Market Mall. All rights
              reserved.
            </div>
          </div>

          <div style="
            margin-top: 100px;
            margin-bottom: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 0.7rem; /* Extremely small text */
            color: #6b21a8; /* Purple color for the text */
          ">
          <div style="font-weight: 800;">
            <span style="color:black; margin-right: 10px;">Powered By</span>Grand Technology Solutions
          </div>
          <div style="
            font-size: 0.7rem; /* Smaller text for email and phone */
            margin-top: 4px;
          ">
            Email: <a href="mailto:info@grandtechsolutions.com"
              style="color: black ; text-decoration: none;">info@grandtechsolutions.com</a> |
            Phone: <a href="tel:+251987014339" style="color:  black; text-decoration: none;">+251987014339</a>
          </div>
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
    this.$apiGet("/api/v1/organization")
      .then((response) => {
        console.log("Org response", response);
        if (response.status === 1) {
          console.log(
            "Organization email",
            response.organization.companyEmail
          );
          this.email = response.organization.companyEmail;
          this.tel = response.organization.companyPhoneNumber;
          this.address = response.organization.companyAddress;
        }
      })
      .catch((error) => {
        console.log("Error", error.message);
        this.organizationCreated = 0;
      });
    //console.log("payment is",this.payment);
    this.year = new Date().getFullYear();

//find user info
this.$apiGetById('/api/v1/users',this.userId)
      .then((response) => {
        console.log("Response client profile in unpaid", response);
        this.userEmail= response.clientProfile.email;
        this.userAddress= response.clientProfile.address;
        this.userGender= response.clientProfile.gender;
        this.fullName= response.clientProfile.fullName;
        this.userPhoneNumber= response.clientProfile.phoneNumber;
        this.userCode= response.clientProfile.userCode;
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
       
        
        }
        #printable-area {
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
        
        }
        #printable-area {
     
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
      const params={
        activeYear: this.year,
        userCode: this.userCode,
        
      }
      this.$apiGet(
          '/api/v1/payments/userBalance',params
        )
        .then((response) => {
          console.log("response userbalance", response);
          this.payments = response.payments;
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

  }
  .receipt {
     /* Prevents page breaks inside receipts */
  }
  
  /* Ensure background color is set */
  #printable-area {
    background-color: white; /* Use a solid color or adjust as needed */
  }
}


</style>
