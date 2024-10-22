<template>
  <div class="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Generate a Receipt</h1>
    <p class="text-lg text-gray-600 mb-6">Click the button below to generate and print your receipt.</p>
    <button
      @click="printDiv"
      class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
    >
      Print Receipt
    </button>
  </div>


  <div class="w-full flex flex-row hidden" id="printable-area">
    <!-- First Receipt -->
    <div class="w-1/2 p-2 receipt border-r-4 border-red-500 border-dotted">
      <div class="bg-green-200 text-blue-800 p-2">
        <img src="../assets/img/head.png" alt="Barcode" class="mb-3" />
        <div class="flex items-center justify-between">
          <div class="text-xs flex items-center space-x-2">
            <span class="font-semibold">BillCode:</span>
            <span>{{ receipt1.BillCode }}</span>
          </div>
          <div class="text-xs flex items-center space-x-2">
            <span class="font-semibold">Date:</span>
            <span>{{ receipt1.Date }}</span>
          </div>
          <img src="../assets/img/bar.png" alt="Barcode" class="w-16 h-16" />
        </div>

        <h2 class="text-xs font-semibold mt-2">Company Information</h2>
        <div class="grid grid-cols-2 gap-2 mt-1">
          <div class="bg-white border border-gray-300 p-2">
            <table class="w-full text-xs">
              <tbody>
                <tr>
                  <td class="font-semibold">Country:</td>
                  <td>{{ receipt1.Country }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">City:</td>
                  <td>{{ receipt1.City }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="bg-white border border-gray-300 p-2">
            <table class="w-full text-xs">
              <tbody>
                <tr>
                  <td class="font-semibold">Email:</td>
                  <td>{{ receipt1.Email }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Tel:</td>
                  <td>{{ receipt1.Tel }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Address:</td>
                  <td>{{ receipt1.Address }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white border border-gray-300 p-2 mt-2 relative">
          <table class="w-full text-xs">
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
                <td class="text-right">{{ receipt1.UserCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">FullName</td>
                <td></td>
                <td class="text-right">{{ receipt1.FullName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">BillCode</td>
                <td></td>
                <td class="text-right">{{ receipt1.BillCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">PaymentTerm</td>
                <td></td>
                <td class="text-right">{{ receipt1.PaymentTerm }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Payment Date</td>
                <td></td>
                <td class="text-right">{{ receipt1.PaymentDate }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Emergency Amount</td>
                <td></td>
                <td class="text-right">{{ receipt1.EmergencyAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Regular Amount</td>
                <td></td>
                <td class="text-right">{{ receipt1.RegularAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Service Amount</td>
                <td></td>
                <td class="text-right">{{ receipt1.ServiceAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Subsidy Amount</td>
                <td></td>
                <td class="text-right">{{ receipt1.SubsidyAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Penalty</td>
                <td></td>
                <td class="text-right">{{ receipt1.Penalty }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Days Late</td>
                <td></td>
                <td class="text-right">{{ receipt1.DaysLate }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Transferred Amount</td>
                <td></td>
                <td class="text-right">{{ receipt1.TransferredAmount }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="text-xs mt-2">
          <div class="flex justify-between items-center">
            <div class="flex-1">
              <div>Prepared by: ..................................</div>
              <div>Signature: ..................................</div>
            </div>
            <div class="flex-1 text-right">
              <div>Received by: ..................................</div>
              <div>Signature: ..................................</div>
            </div>
          </div>
          <div class="mt-2">
            <div>Approval Bank Deposit: ..........................</div>
            <div>Signature: ..................................</div>
          </div>
        </div>

        <p class="text-center text-xs mt-2">The Best Mole Ever</p>
        <p class="text-center text-xs mt-1">
          &copy; 2024 Bana Mole. All rights reserved.
        </p>
      </div>
    </div>

    <!-- Second Receipt -->
    <div class="w-1/2 p-2 receipt">
      <div class="bg-green-200 text-blue-800 p-2">
        <img src="../assets/img/head.png" alt="Barcode" class="mb-3" />
        <div class="flex items-center justify-between">
          <div class="text-xs flex items-center space-x-2">
            <span class="font-semibold">BillCode:</span>
            <span>{{ receipt2.BillCode }}</span>
          </div>
          <div class="text-xs flex items-center space-x-2">
            <span class="font-semibold">Date:</span>
            <span>{{ receipt2.Date }}</span>
          </div>
          <img src="../assets/img/bar.png" alt="Barcode" class="w-16 h-16" />
        </div>

        <h2 class="text-xs font-semibold mt-2">Company Information</h2>
        <div class="grid grid-cols-2 gap-2 mt-1">
          <div class="bg-white border border-gray-300 p-2">
            <table class="w-full text-xs">
              <tbody>
                <tr>
                  <td class="font-semibold">Country:</td>
                  <td>{{ receipt2.Country }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">City:</td>
                  <td>{{ receipt2.City }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="bg-white border border-gray-300 p-2">
            <table class="w-full text-xs">
              <tbody>
                <tr>
                  <td class="font-semibold">Email:</td>
                  <td>{{ receipt2.Email }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Tel:</td>
                  <td>{{ receipt2.Tel }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Address:</td>
                  <td>{{ receipt2.Address }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white border border-gray-300 p-2 mt-2 relative">
          <table class="w-full text-xs">
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
                <td class="text-right">{{ receipt2.UserCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">FullName</td>
                <td></td>
                <td class="text-right">{{ receipt2.FullName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">BillCode</td>
                <td></td>
                <td class="text-right">{{ receipt2.BillCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">PaymentTerm</td>
                <td></td>
                <td class="text-right">{{ receipt2.PaymentTerm }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Payment Date</td>
                <td></td>
                <td class="text-right">{{ receipt2.PaymentDate }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Emergency Amount</td>
                <td></td>
                <td class="text-right">{{ receipt2.EmergencyAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Regular Amount</td>
                <td></td>
                <td class="text-right">{{ receipt2.RegularAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Service Amount</td>
                <td></td>
                <td class="text-right">{{ receipt2.ServiceAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Subsidy Amount</td>
                <td></td>
                <td class="text-right">{{ receipt2.SubsidyAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Penalty</td>
                <td></td>
                <td class="text-right">{{ receipt2.Penalty }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Days Late</td>
                <td></td>
                <td class="text-right">{{ receipt2.DaysLate }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Transferred Amount</td>
                <td></td>
                <td class="text-right">{{ receipt2.TransferredAmount }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="text-xs mt-2">
          <div class="flex justify-between items-center">
            <div class="flex-1">
              <div>Prepared by: ..................................</div>
              <div>Signature: ..................................</div>
            </div>
            <div class="flex-1 text-right">
              <div>Received by: ..................................</div>
              <div>Signature: ..................................</div>
            </div>
          </div>
          <div class="mt-2">
            <div>Approval Bank Deposit: ..........................</div>
            <div>Signature: ..................................</div>
          </div>
        </div>

        <p class="text-center text-xs mt-2">The Best Mole Ever</p>
        <p class="text-center text-xs mt-1">
          &copy; 2024 Bana Mole. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      receipt1: {
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
      },
      receipt2: {
        BillCode: "BC654321",
        Date: "2024-08-06",
        Country: "Ethiopia",
        City: "Mekelle",
        Email: "bana@gmail.com",
        Tel: "096-740-501",
        Address: "Mekelle Kedemay Weyane",
        UserCode: "UC456",
        FullName: "Jane Smith",
        PaymentTerm: "Quarterly",
        PaymentDate: "2024-08-06",
        EmergencyAmount: "1500",
        RegularAmount: "6000",
        ServiceAmount: "2500",
        SubsidyAmount: "2000",
        Penalty: "400",
        DaysLate: "3",
        TransferredAmount: "9900",
      },
    };
  },
  methods: {
  printDiv() {
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
        <title>Print</title>
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
    };
  },
},

};
</script>
