<template>
  <div class="w-full flex flex-row hidden" id="printable-area">
    <!-- First Receipt -->
    <div class="w-1/2 p-2 receipt border-4 border-red-500 border-dotted">
      <div class="bg-green-200 text-blue-800 p-2">
        <!-- <img src="../../../../assets/img/head.png" alt="Barcode" class="mb-3" /> -->
        <div class="flex items-center justify-between">


          <div class="text-xs flex items-center space-x-2">
            <span class="font-semibold">BillCode:</span>
            <span>{{ payment.billCode }}</span>
          </div>
          <div class="text-xs flex items-center space-x-2">
            <span class="font-semibold">Date:</span>
            <span>{{ receiptDate }}</span>
          </div>


          <div class="w-32 h-32" id="qrCodeImageContainer"></div>
          <!-- <img id="barcode"
            src="../../../../assets/img/bar.png"
            alt="Barcode"
            class="w-16 h-16 barcode"
          /> -->
        </div>

        <h2 class="text-xs font-semibold mt-2">Company Information</h2>
        <div class="grid grid-cols-2 gap-2 mt-1">
          <div class="bg-white border border-gray-300 p-2">
            <table class="w-full text-xs">
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
                <td class="text-right">{{ payment.userCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">FullName</td>
                <td></td>
                <td class="text-right">{{ payment.fullName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">BillCode</td>
                <td></td>
                <td class="text-right">{{ payment.billCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">PaymentTerm</td>
                <td></td>
                <td class="text-right">{{ paymentTerm }}</td>
              </tr>

              <tr>
                <td class="font-semibold">Regular Amount</td>
                <td></td>
                <td class="text-right">{{ payment.regular.amount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Subsidy Amount</td>
                <td></td>
                <td class="text-right">{{ payment.subsidy.amount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Urgent Amount</td>
                <td></td>
                <td class="text-right">{{ payment.urgent.amount }}</td>
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

              <tr class="border border-dotted border-blue-500">
                <td class="font-semibold ml-5">Total Block</td>
                <td></td>
                <td class="text-right">
                  {{
                    payment.regular.amount +
                    payment.subsidy.amount +
                    payment.urgent.amount
                  }}
                </td>
              </tr>
              <tr class="border border-dotted border-blue-500">
                <td class="font-semibold">Total Service</td>
                <td></td>
                <td class="text-right ml-5">
                  {{ payment.penality.amount + payment.service.amount }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="text-xs mt-2">
          <div class="flex justify-between items-center">
            <div class="flex-1">
              <div>Prepared by: ..................................</div>
              <div class="ml-10">
                Signature: ..................................
              </div>
            </div>
            <div class="flex-1 text-right">
              <div>Received by: ..................................</div>
              <div class="ml-10">
                Signature: ..................................
              </div>
            </div>
          </div>
          <div class="mt-2">
            <div>Approval Bank Deposit: ..........................</div>
            <div class="ml-10">
              Signature: ..................................
            </div>
          </div>
        </div>

        <p class="text-center text-xs mt-2">The Best Mole Ever</p>
        <p class="text-center text-xs mt-1">
          &copy; 2024 Bana Mole. All rights reserved.
        </p>
      </div>
    </div>

    <!-- Second Receipt -->
    <div
      class="w-1/2 p-2 receipt border-r-4 border-t-4 border-b-4 border-red-500 border-dotted"
    >
      <div class="bg-green-200 text-blue-800 p-2">
        <img src="../../../../assets/img/head.png" alt="Barcode" class="mb-3" />
        <div class="flex items-center justify-between">
          <div class="text-xs flex items-center space-x-2">
            <span class="font-semibold">BillCode:</span>
            <span>{{ payment.billCode }}</span>
          </div>
          <div class="text-xs flex items-center space-x-2">
            <span class="font-semibold">Date:</span>
            <span>{{ receiptDate }}</span>
          </div>
          <div class="w-32 h-32" id="qrCodeImageContainer1"></div>
          <!-- <img id="barcode"
            src="../../../../assets/img/bar.png"
            alt="Barcode"
            class="w-16 h-16 barcode"
          /> -->
        </div>

        <h2 class="text-xs font-semibold mt-2">Company Information</h2>
        <div class="grid grid-cols-2 gap-2 mt-1">
          <div class="bg-white border border-gray-300 p-2">
            <table class="w-full text-xs">
              <tbody>
                <tr>
                  <td class="font-semibold">Country:</td>
                  <td>{{ payment.Country }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">City:</td>
                  <td>{{ payment.City }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="bg-white border border-gray-300 p-2">
            <table class="w-full text-xs">
              <tbody>
                <tr>
                  <td class="font-semibold">Email:</td>
                  <td>{{ payment.Email }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Tel:</td>
                  <td>{{ payment.Tel }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Address:</td>
                  <td>{{ payment.Address }}</td>
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
                <td class="text-right">{{ payment.UserCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">FullName</td>
                <td></td>
                <td class="text-right">{{ payment.FullName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">BillCode</td>
                <td></td>
                <td class="text-right">{{ payment.BillCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold">PaymentTerm</td>
                <td></td>
                <td class="text-right">{{ payment.PaymentTerm }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Payment Date</td>
                <td></td>
                <td class="text-right">{{ payment.PaymentDate }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Emergency Amount</td>
                <td></td>
                <td class="text-right">{{ payment.EmergencyAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Regular Amount</td>
                <td></td>
                <td class="text-right">{{ payment.RegularAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Service Amount</td>
                <td></td>
                <td class="text-right">{{ payment.ServiceAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Subsidy Amount</td>
                <td></td>
                <td class="text-right">{{ payment.SubsidyAmount }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Penalty</td>
                <td></td>
                <td class="text-right">{{ payment.Penalty }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Days Late</td>
                <td></td>
                <td class="text-right">{{ payment.DaysLate }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Transferred Amount</td>
                <td></td>
                <td class="text-right">{{ payment.TransferredAmount }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="text-xs mt-2">
          <div class="flex justify-between items-center">
            <div class="flex-1">
              <div>Prepared by: ..................................</div>
              <div class="ml-10">
                Signature: ..................................
              </div>
            </div>
            <div class="flex-1 text-right">
              <div>Received by: ..................................</div>
              <div class="ml-10">
                Signature: ..................................
              </div>
            </div>
          </div>
          <div class="mt-2">
            <div>Approval Bank Deposit: ..........................</div>
            <div class="ml-10">
              Signature: ..................................
            </div>
          </div>
        </div>

        <p class="text-center text-xs mt-2">The Best Mole Ever</p>
        <p class="text-center text-xs mt-1">
          &copy; 2024 Bana Mole. All rights reserved.
        </p>
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
        ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
        document.getElementById(
          "qrCodeImageContainer1"
        ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    },

    async printDiv() {
      await this.generateQRCodeImage();
      const printContent = document.getElementById("printable-area").innerHTML;
      const linkElement = document.createElement("link");
      linkElement.href = "/src/assets/css/tailwind.css";
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
