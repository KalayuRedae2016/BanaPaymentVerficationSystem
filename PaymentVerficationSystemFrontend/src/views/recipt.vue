<template>
    <div class="flex flex-col md:flex-row p-1">
      <!-- First Receipt -->
      <div class="w-full md:w-1/2 p-2 border-r border-dotted border-gray-400">
        <div class="bg-green-200 text-blue-800 p-2">
          <div class="flex items-center justify-between">
            <h1 class="text-xs font-bold">Bana Mole Receipt</h1>
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
      <div class="w-full md:w-1/2 p-2">
        <div class="bg-green-200 text-blue-800 p-2">
          <div class="flex items-center justify-between">
            <h1 class="text-xs font-bold">Bana Mole Receipt</h1>
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
                  <td class="font-semibold">
  Payment Date</td>
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
          TransferredAmount: "8500"
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
          TransferredAmount: "9900"
        }
      };
    }
  };
  </script>
  <style scoped>
  body {
    font-size: 0.5rem;
  }
  </style>