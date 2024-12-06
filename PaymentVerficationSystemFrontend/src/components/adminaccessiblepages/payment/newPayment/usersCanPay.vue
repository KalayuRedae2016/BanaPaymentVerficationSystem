<template>
  <div>
 <div class="py-4">
   <div class="pt-6 -mt-1">
     <div class="mb-4">
       <div class="flex flex-col">
         <div class="flex flex-row space-x-4 px-5">
           <input
             @keyup.enter="searchUser"
             v-model="keyword"
             id="id-search"
             type="text"
             class="custom-input h-10 text-xs"
             placeholder="Search by Usercode,Name"
           />
         </div>
         <!-- <p v-if="noUser" class="text-red-500 ml-32"><strong>Hoops! there is no user with this Id <span class="text-blue">{{ currentId }}</span></strong></p> -->
       </div>
     </div>

     <div class="border-t border-blue-900 border-dotted h-64 overflow-y-auto" v-if="showUserList">
       <div
         class="px-4 border-b border-blue-900 border-dotted cursor-pointer"
         v-for="(user, userIndex) in filteredUsers"
         :key="userIndex"
         :class="[
           'p-4 border-b cursor-pointer',
           {
             'bg-blue-200 ': user.userselected, 
             'bg-gray-50': !user.userselected, 
           },
         ]"
         @click="navigateToPayment(user.userCode)"
       >
         <div class="text-xs flex flex-row space-x-5 md:space-x-12  text-gray-500">
           <p>{{ user.userCode }}</p>
           <p>{{ user.fullName }}</p>
         </div>
       </div>
     </div>
   </div>
 </div>

 <div v-if="bankStatement">
   <div class="p-4 text-lg">
     <!-- //for displaying the Head title  -->
     <h1 class="text-md font-bold mb-4 text-indigo-800">
       Manual Confirmation from bank statement
     </h1>
     <!-- // the whole functiolality is over here -->
     <div v-if="!nothingToPay"
       class="py-6 -mt-1 border-t border-blue-500"
     >
        <!-- for displ;aying the usercode and full name above the table -->
       <div class="text-gray-800 font-semibold bg-blue-50 py-4 text-md  text-xs">
         <p>
           <i class="fas fa-chevron-right mr-3 text-pink-500 ml-1"></i>
           User Code:<span class="text-blue-900  ml-1"
             >{{ userCode }}
           </span>
         </p>
         <p class="">
           <i class="fas fa-chevron-right mr-3 text-pink-500 ml-1"></i>
           
           <span class="text-indigo-800"> Full
             Name: <span class="ml-1">{{ fullName }}</span></span>
         </p>
       </div>
       <!-- // displayin the payments each in a table for one user please -->
       <div class="border-t border-blue-900  mt-5 text-xs">
         <div
           class="p-4 border-b border-blue-900 cursor-pointer"
           v-for="(payment, paymentIndex) in payments"
           :key="paymentIndex"
           @click="changePaymentSelection(payment.id, paymentIndex)"
           :class="[
             'p-4 border-b cursor-pointer',
             {
               'bg-blue-100 ': payment.paymentSelected, // Background color when selected
               'bg-gray-100': !payment.paymentSelected, // Default background color
             },
           ]"
         >
           <div class="mt-4 flex flex-col space-y-5">
             <div class="flex flex-row items-center">
               <div class="flex flex-col">
                 <p class="text-indigo-800 text-xs font-extrabold">
                   <i class="fas fa-chevron-right mr-3 text-pink-500"></i>
                   <span class="text-xs"
                     >{{ payment.activeYear }} -
                     {{ payment.activeMonthInString }}</span
                   >
                 </p>

                 <p class="mt-3 text-red-500" v-if="payment.permitSelect">
                   Youcan't pay before you pay months before this month please
                 </p>
               </div>
             </div>

             <div class="overflow-x-auto">
               <table class="w-full bg-white">
                 <thead>
                   <!-- // head of the tables -->
                   <tr class="bg-gray-200">
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Metric
                     </th>
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Amount
                     </th>
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Payment Date
                     </th>

                     <th
                       class="w-32 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Bank Type
                     </th>
                     <th
                       class="w-32 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       TT Number
                     </th>
                     <th
                       class="w-32 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Paid
                     </th>
                     <th
                       class="w-32 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Action
                     </th>
                   </tr>
                 </thead>
                 <tbody>
                   <!-- // this tr is for the regular data -->
                   <tr>
                     <td class=" px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p
                         class="bg-blue-100 px-2 text-indigo-800 font-extrabold rounded-lg"
                       >
                         Regular
                       </p>
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <!-- <input readonly type="text" class="custom-input h-7" :value="payment.regular.amount"
                       @input="payment.regular.amount = $event.target.value" /> -->

                       <p>{{ payment.regular.amount }}</p>
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.regular.isPaid">
                         {{ payment.regular.paidAt }}
                       </p>
                       <input
                         v-if="!payment.regular.isPaid"
                         type="Date"
                         class="custom-input h-7"
                         @change="fetchRegularPenality(payment)"
                         :value="payment.regular.paidAt"
                         @input="payment.regular.paidAt = $event.target.value"
                       />
                       <p
                         v-if="payment.verifyRegularPaymentDate"
                         class="text-red-500"
                       >
                         Payment Date is required
                       </p>
                     </td>

                     <td class="px-3 text-xs text-gray-700  ">
                       <p v-if="payment.regular.isPaid">
                         {{ payment.regular.bankType }}
                       </p>
                       <select
                         v-if="!payment.regular.isPaid"
                         class="custom-select  text-xs px-3 py-2.5 leading-tight flex-shrink-0"
                         v-model="payment.regular.bankType"
                        style="width:150px;">
                         <option value="" disabled selected>Bank Type</option>
                         <option value="LIB">LIB</option>
                         <option value="WEGAGEN">WEGAGEN</option>
                         <option value="CBE">CBE</option>
                       </select>

                       <p
                         v-if="payment.verifyRegularBankType"
                         class="text-red-500"
                       >
                         Bank Type is required
                       </p>
                     </td>

                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.regular.isPaid">
                         {{ payment.regular.TTNumber }}
                       </p>
                       <input
                         v-if="!payment.regular.isPaid"
                         type="text"
                         class="custom-input h-7"
                         v-model="payment.regular.TTNumber"
                        style="width:150px;"/>
                       <p
                         v-if="payment.verifyRegularTTNumber"
                         class="text-red-500"
                       >
                         TTNumber is required
                       </p>
                     </td>

                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p>{{ payment.regular.isPaid }}</p>
                     </td>
                     <td
                       v-if="!payment.regular.isPaid"
                       class="px-3 text-xs text-gray-700 whitespace-nowrap relative"
                     >
                       <!-- Confirmation Text Above Button -->
                       <div
                         v-if="paymentIndex === blockConfirmedIndex"
                         class="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 bg-blue-800 text-white text-xs px-2 py-1 rounded"
                         style="margin-top: 0.5rem; margin-left: 2rem"
                       >
                         Confirm
                       </div>

                       <!-- Confirm Button -->
                       <button
                         @click="
                           confirmUnconfirmRegular(
                             payment.regular,
                             payment.billCode,
                             payment.activeYear,
                             payment.activeMonth,
                             paymentIndex
                           )
                         "
                         class="custom-button bg-blue-500 text-white flex items-center p-2 rounded hover:bg-blue-600"
                         @mouseenter="
                           showBlockConfirmUnConfirmText(
                             paymentIndex,
                             'conShow'
                           )
                         "
                         @mouseleave="hideBlockConfirmUnConfirmText('conhide')"
                       >
                         <span
                           class="flex items-center justify-center bg-white rounded-full p-1"
                         >
                           <!-- Circular white background -->
                           <i class="fas fa-check-circle text-pink-500"></i>
                           <!-- Pink check icon -->
                         </span>
                       </button>
                     </td>

                     <td
                       v-if="payment.regular.isPaid"
                       class="px-3 text-xs text-gray-700 whitespace-nowrap relative"
                     >
                       <!-- Confirmation Text Above Button -->
                       <div
                         v-if="blockUnconfirmIndex"
                         class="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 bg-blue-800 text-white text-xs px-2 py-1 rounded"
                         style="margin-top: 0.5rem; margin-left: 2.25rem"
                       >
                         Unconfirm
                       </div>

                       <!-- Confirm Button -->
                       <button
                         @click="
                           confirmUnconfirmRegular(
                             payment.regular,
                             payment.billCode,
                             payment.activeYear,
                             payment.activeMonth,
                             paymentIndex
                           )
                         "
                         class="custom-button bg-blue-500 text-white flex items-center p-2 rounded hover:bg-blue-600"
                         @mouseenter="
                           showBlockConfirmUnConfirmText(
                             paymentIndex,
                             'unconShow'
                           )
                         "
                         @mouseleave="
                           hideBlockConfirmUnConfirmText('unconhide')
                         "
                       >
                         <span
                           class="flex items-center justify-center bg-white rounded-full p-1"
                         >
                           <i class="fas fa-times text-pink-500"></i>
                           <!-- Change icon color to pink -->
                         </span>
                       </button>
                     </td>
                   </tr>
                   <!-- // for the subsidy -->
                   <tr v-if="payment.subsidy.amount > 0">
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p
                         class="bg-cyan-100 px-2 text-indingo-800 font-extrabold rounded-lg"
                       >
                         Subsidy
                       </p>
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <input
                         v-if="!payment.subsidy.isPaid"
                         readonly
                         type="text"
                         class="custom-input h-7"
                         :value="payment.subsidy.amount"
                         @input="payment.subsidy.amount = $event.target.value"
                         style="width:150px;" />

                       <p v-else>{{ payment.subsidy.amount }}</p>
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.subsidy.isPaid">
                         {{ payment.subsidy.paidAt }}
                       </p>

                       <input
                         v-if="
                           payment.subsidy.amount > 0 &&
                           !payment.subsidy.isPaid
                         "
                         type="Date"
                         class="custom-input h-7"
                         @change="fetchSubsidyPenality(payment)"
                         :value="payment.subsidy.paidAt"
                         @input="payment.subsidy.paidAt = $event.target.value"
                       />

                       <p
                         v-if="payment.verifySubsidyPaymentDate"
                         class="text-red-500"
                       >
                         Payment Date is required
                       </p>

                       <p v-if="payment.subsidy.amount == 0">
                         -------------------------
                       </p>
                     </td>

                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.subsidy.isPaid">
                         {{ payment.subsidy.bankType }}
                       </p>
                       <select
                         v-if="
                           payment.subsidy.amount > 0 &&
                           !payment.subsidy.isPaid
                         "
                         class="custom-select w-64 text-xs px-3 py-2.5 leading-tight"
                         v-model="payment.subsidy.bankType"
                       >
                         <option value="" disabled selected>Bank Type</option>
                         <option value="LIB">LIB</option>
                         <option value="WEGAGEN">WEGAGEN</option>
                         <option value="CBE">CBE</option>
                       </select>
                       <p
                         v-if="payment.verifySubsidyBankType"
                         class="text-red-500"
                       >
                         Bank Type is required
                       </p>
                       <p v-if="payment.subsidy.amount == 0">
                         -------------------------
                       </p>
                     </td>

                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.subsidy.isPaid">
                         {{ payment.subsidy.TTNumber }}
                       </p>
                       <input
                         v-if="
                           payment.subsidy.amount > 0 &&
                           !payment.subsidy.isPaid
                         "
                         type="text"
                         class="custom-input h-7"
                         v-model="payment.subsidy.TTNumber"
                       />
                       <p
                         v-if="payment.verifySubsidyTTNumber"
                         class="text-red-500"
                       >
                         TTNumber is required
                       </p>
                       <p v-if="payment.subsidy.amount == 0">
                         -------------------------
                       </p>
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p>{{ payment.subsidy.isPaid }}</p>
                     </td>
                     <td
                       v-if="!payment.subsidy.isPaid"
                       class="px-3 text-xs text-gray-700 whitespace-nowrap relative"
                     >
                       <!-- Confirmation Text Above Button -->
                       <div
                         v-if="paymentIndex === subsidyConfirmedIndex"
                         class="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 bg-blue-800 text-white text-xs px-2 py-1 rounded"
                         style="margin-top: 0.5rem; margin-left: 2rem"
                       >
                         Confirm
                       </div>

                       <!-- Confirm Button -->
                       <button
                         @click="
                           confirmUnconfirmSubsidy(
                             payment.subsidy,
                             payment.billCode,
                             payment.activeYear,
                             payment.activeMonth,
                             paymentIndex
                           )
                         "
                         class="custom-button bg-blue-500 text-white flex items-center p-2 rounded hover:bg-blue-600"
                         @mouseenter="
                           showSubsidyConfirmUnConfirmText(
                             paymentIndex,
                             'conShow'
                           )
                         "
                         @mouseleave="
                           hideSubsidyConfirmUnConfirmText('conhide')
                         "
                       >
                         <span
                           class="flex items-center justify-center bg-white rounded-full p-1"
                         >
                           <!-- Circular white background -->
                           <i class="fas fa-check-circle text-pink-500"></i>
                           <!-- Pink check icon -->
                         </span>
                       </button>
                     </td>

                     <td
                       v-if="payment.subsidy.isPaid"
                       class="px-3 text-xs text-gray-700 whitespace-nowrap relative"
                     >
                       <!-- Confirmation Text Above Button -->
                       <div
                         v-if="subsidyUnconfirmIndex"
                         class="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 bg-blue-800 text-white text-xs px-2 py-1 rounded"
                         style="margin-top: 0.5rem; margin-left: 2.25rem"
                       >
                         Unconfirm
                       </div>

                       <!-- Confirm Button -->
                       <button
                         @click="
                           confirmUnconfirmSubsidy(
                             payment.subsidy,
                             payment.billCode,
                             payment.activeYear,
                             payment.activeMonth,
                             paymentIndex
                           )
                         "
                         class="custom-button bg-blue-500 text-white flex items-center p-2 rounded hover:bg-blue-600"
                         @mouseenter="
                           showSubsidyConfirmUnConfirmText(
                             paymentIndex,
                             'unconShow'
                           )
                         "
                         @mouseleave="
                           hideSubsidyConfirmUnConfirmText('unconhide')
                         "
                       >
                         <span
                           class="flex items-center justify-center bg-white rounded-full p-1"
                         >
                           <i class="fas fa-times text-pink-500"></i>
                           <!-- Change icon color to pink -->
                         </span>
                       </button>
                     </td>
                   </tr>
                   <!-- //for the urgent data -->
                   <tr v-if="payment.urgent.amount > 0">
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p
                         class="bg-pink-100 px-2 text-indigo-800 font-extrabold rounded-lg"
                       >
                         Urgent
                       </p>
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.urgent.isPaid">
                         {{ payment.urgent.amount }}
                       </p>
                       <input
                         v-if="!payment.urgent.isPaid"
                         readonly
                         type="text"
                         class="custom-input h-7"
                         :value="payment.urgent.amount"
                         @input="payment.urgent.amount = $event.target.value"
                       />
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.urgent.isPaid">
                         {{ payment.urgent.paidAt }}
                       </p>
                       <input
                         v-if="!payment.urgent.isPaid"
                         type="Date"
                         class="custom-input h-7"
                         @change="fetchUrgentPenality(payment)"
                         :value="payment.urgent.paidAt"
                         @input="payment.urgent.paidAt = $event.target.value"
                       />
                       <p
                         v-if="payment.verifyUrgentPaymentDate"
                         class="text-red-500"
                       >
                         Payment Date is required
                       </p>
                       <p v-if="payment.urgent.amount == 0">
                         -------------------------
                       </p>
                     </td>

                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.urgent.isPaid">
                         {{ payment.urgent.bankType }}
                       </p>
                       <select
                         v-if="
                           payment.urgent.amount > 0 && !payment.urgent.isPaid
                         "
                         class="custom-select w-64 text-xs px-3 py-2.5 leading-tight"
                         v-model="payment.urgent.bankType"
                       >
                         <option value="" disabled selected>Bank Type</option>
                         <option value="LIB">LIB</option>
                         <option value="WEGAGEN">WEGAGEN</option>
                         <option value="CBE">CBE</option>
                       </select>
                       <p
                         v-if="payment.verifyUrgentBankType"
                         class="text-red-500"
                       >
                         Bank Type is required
                       </p>
                       <p v-if="payment.urgent.amount == 0">
                         -------------------------
                       </p>
                     </td>

                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.urgent.isPaid">
                         {{ payment.urgent.TTNumber }}
                       </p>
                       <input
                         v-if="
                           payment.urgent.amount > 0 && !payment.urgent.isPaid
                         "
                         type="text"
                         class="custom-input h-7"
                         v-model="payment.urgent.TTNumber"
                       />
                       <p
                         v-if="payment.verifyUrgentTTNumber"
                         class="text-red-500"
                       >
                         TTNumber is required
                       </p>
                       <p v-if="payment.urgent.amount == 0">
                         -------------------------
                       </p>
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p>{{ payment.urgent.isPaid }}</p>
                     </td>
                     <td
                       v-if="!payment.urgent.isPaid"
                       class="px-3 text-xs text-gray-700 whitespace-nowrap relative"
                     >
                       <!-- Confirmation Text Above Button -->
                       <div
                         v-if="paymentIndex === urgentConfirmedIndex"
                         class="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 bg-blue-800 text-white text-xs px-2 py-1 rounded"
                         style="margin-top: 0.5rem; margin-left: 2rem"
                       >
                         Confirm
                       </div>
                       <!-- Confirm Button -->
                       <button
                         @click="
                           confirmUnconfirmUrgent(
                             payment.urgent,
                             payment.billCode,
                             payment.activeYear,
                             payment.activeMonth,
                             paymentIndex
                           )
                         "
                         class="custom-button bg-blue-500 text-white flex items-center p-2 rounded hover:bg-blue-600"
                         @mouseenter="
                           showUrgentConfirmUnConfirmText(
                             paymentIndex,
                             'conShow'
                           )
                         "
                         @mouseleave="
                           hideUrgentConfirmUnConfirmText('conhide')
                         "
                       >
                         <span
                           class="flex items-center justify-center bg-white rounded-full p-1"
                         >
                           <!-- Circular white background -->
                           <i class="fas fa-check-circle text-pink-500"></i>
                           <!-- Pink check icon -->
                         </span>
                       </button>
                     </td>
                     <td
                       v-if="payment.urgent.isPaid"
                       class="px-3 text-xs text-gray-700 whitespace-nowrap relative"
                     >
                       <!-- Confirmation Text Above Button -->
                       <div
                         v-if="urgentUnconfirmedIndex"
                         class="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 bg-blue-800 text-white text-xs px-2 py-1 rounded"
                         style="margin-top: 0.5rem; margin-left: 2.25rem"
                       >
                         Unconfirm
                       </div>

                       <!-- Confirm Button -->
                       <button
                         @click="
                           confirmUnconfirmUrgent(
                             payment.urgent,
                             payment.billCode,
                             payment.activeYear,
                             payment.activeMonth,
                             paymentIndex
                           )
                         "
                         class="custom-button bg-blue-500 text-white flex items-center p-2 rounded hover:bg-blue-600"
                         @mouseenter="
                           showUrgentConfirmUnConfirmText(
                             paymentIndex,
                             'unconShow'
                           )
                         "
                         @mouseleave="
                           hideUrgentConfirmUnConfirmText('unconhide')
                         "
                       >
                         <span
                           class="flex items-center justify-center bg-white rounded-full p-1"
                         >
                           <i class="fas fa-times text-pink-500"></i>
                           <!-- Change icon color to pink -->
                         </span>
                       </button>
                     </td>
                   </tr>
                  <!-- for the service data -->
                   <tr>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p
                         class="bg-yellow-100 px-2 text-indigo-800 font-extrabold rounded-lg"
                       >
                         Service
                       </p>
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.service.isPaid">
                         {{ payment.service.amount }}
                       </p>
                       <input
                         v-if="!payment.service.isPaid"
                         type="text"
                         class="custom-input h-7 w-32"
                         :value="payment.service.amount"
                         @input="payment.service.amount = $event.target.value"
                       />
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.service.isPaid">
                         {{ payment.service.paidAt }}
                       </p>
                       <input
                         v-if="!payment.service.isPaid"
                         type="Date"
                         class="custom-input h-7"
                         :value="payment.service.paidAt"
                         @input="payment.service.paidAt = $event.target.value"
                       />
                       <p
                         v-if="payment.verifyServicePaymentDate"
                         class="text-red-500"
                       >
                         Payment Date is required
                       </p>
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.service.isPaid">
                         {{ payment.service.bankType }}
                       </p>
                       <select
                         v-if="!payment.service.isPaid"
                         class="custom-select w-64 text-xs px-3 py-2.5 leading-tight"
                         v-model="payment.service.bankType"
                       >
                         <option value="" disabled selected>Bank Type</option>
                         <option value="LIB">LIB</option>
                         <option value="WEGAGEN">WEGAGEN</option>
                         <option value="CBE">CBE</option>
                       </select>
                       <p
                         v-if="payment.verifyServiceBankType"
                         class="text-red-500"
                       >
                         Bank Type is required
                       </p>
                     </td>

                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p v-if="payment.service.isPaid">
                         {{ payment.service.TTNumber }}
                       </p>
                       <input
                         v-if="!payment.service.isPaid"
                         type="text"
                         class="custom-input h-7"
                         v-model="payment.service.TTNumber"
                       />
                       <p
                         v-if="payment.verifyServiceTTNumber"
                         class="text-red-500"
                       >
                         TTNumber is required
                       </p>
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p>{{ payment.service.isPaid }}</p>
                     </td>
                     <td
                       v-if="!payment.service.isPaid"
                       class="px-3 text-xs text-gray-700 whitespace-nowrap relative"
                     >
                       <!-- Confirmation Text Above Button -->
                       <div
                         v-if="paymentIndex === serviceConfirmedIndex"
                         class="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 bg-blue-800 text-white text-xs px-2 py-1 rounded"
                         style="margin-top: 0.5rem; margin-left: 2rem"
                       >
                         Confirm
                       </div>

                       <!-- Confirm Button -->
                       <button
                         @click="
                           confirmUnconfirmService(
                             payment.service,
                             payment.billCode,
                             payment.activeYear,
                             payment.activeMonth,
                             paymentIndex
                           )
                         "
                         class="custom-button bg-blue-500 text-white flex items-center p-2 rounded hover:bg-blue-600"
                         @mouseenter="
                           showServiceConfirmUnConfirmText(
                             paymentIndex,
                             'conShow'
                           )
                         "
                         @mouseleave="
                           hideServiceConfirmUnConfirmText('conhide')
                         "
                       >
                         <span
                           class="flex items-center justify-center bg-white rounded-full p-1"
                         >
                           <!-- Circular white background -->
                           <i class="fas fa-check-circle text-pink-500"></i>
                           <!-- Pink check icon -->
                         </span>
                       </button>
                     </td>

                     <td
                       v-if="payment.service.isPaid"
                       class="px-3 text-xs text-gray-700 whitespace-nowrap relative"
                     >
                       <!-- Confirmation Text Above Button -->
                       <div
                         v-if="serviceUnconfirmIndex"
                         class="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 bg-blue-800 text-white text-xs px-2 py-1 rounded"
                         style="margin-top: 0.5rem; margin-left: 2.25rem"
                       >
                         Unconfirm
                       </div>

                       <!-- Confirm Button -->
                       <button
                         @click="
                           confirmUnconfirmService(
                             payment.service,
                             payment.billCode,
                             payment.activeYear,
                             payment.activeMonth,
                             paymentIndex
                           )
                         "
                         class="custom-button bg-blue-500 text-white flex items-center p-2 rounded hover:bg-blue-600"
                         @mouseenter="
                           showServiceConfirmUnConfirmText(
                             paymentIndex,
                             'unconShow'
                           )
                         "
                         @mouseleave="
                           hideServiceConfirmUnConfirmText('unconhide')
                         "
                       >
                         <span
                           class="flex items-center justify-center bg-white rounded-full p-1"
                         >
                           <i class="fas fa-times text-pink-500"></i>
                           <!-- Change icon color to pink -->
                         </span>
                       </button>
                     </td>
                   </tr>
                 </tbody>
               </table>
             </div>
             <!-- // this is a table for the penality total for each payment incluiding the regular,subsidy,urgent only -->
             <div class="overflow-x-auto">
               <table class="w-full bg-white">
                 <thead>
                   <tr class="bg-gray-200">
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Metric
                     </th>
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Regular Penality
                     </th>
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Subsidy Penality
                     </th>
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Urgent Penality
                     </th>
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Total Penality
                     </th>
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Payment Date
                     </th>
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Bank Type
                     </th>
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       TTNumber
                     </th>
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Paid
                     </th>
                     <th
                       class="w-24 px-3 text-xxs font-extrabold tracking-wide text-left text-indigo-800"
                     >
                       Action
                     </th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p
                         class="bg-red-200 px-2 text-indigo-800 font-extrabold rounded-lg"
                       >
                         Penality
                       </p>
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       {{ payment.regular.penality }}
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       {{ payment.subsidy.penality }}
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       {{ payment.urgent.penality }}
                     </td>
                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       {{
                         payment.regular.penality +
                         payment.subsidy.penality +
                         payment.urgent.penality
                       }}
                     </td>

                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <input
                         v-if="
                           payment.regular.penality +
                             payment.subsidy.penality +
                             payment.urgent.penality >
                             0 && !payment.penality.isPaid
                         "
                         type="Date"
                         class="custom-input h-7"
                         v-model="payment.penality.paidAt"
                         @input="payment.penality.paidAt = $event.target.value"
                       />

                       <p
                         v-if="
                           payment.regular.penality +
                             payment.subsidy.penality +
                             payment.urgent.penality >
                             0 && payment.penality.isPaid
                         "
                       >
                         {{ payment.penality.paidAt }}
                       </p>
                       <p
                         v-if="
                           payment.regular.penality +
                             payment.subsidy.penality +
                             payment.urgent.penality ==
                           0
                         "
                       >
                         -------
                       </p>
                       <p
                         v-if="payment.verifyPenalityPaymentDate"
                         class="text-red-500"
                       >
                         Payment Date is required
                       </p>
                     </td>

                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <select
                         v-if="
                           payment.regular.penality +
                             payment.subsidy.penality +
                             payment.urgent.penality >
                           0
                         "
                         class="custom-select w-64 text-xs px-3 py-2.5 leading-tight"
                         v-model="payment.penality.bankType"
                         @input="
                           payment.penality.bankType = $event.target.value
                         "
                      style="width:100px"  >
                         <option value="" disabled selected>Bank Type</option>
                         <option value="LIB">LIB</option>
                         <option value="WEGAGEN">WEGAGEN</option>
                         <option value="CBE">CBE</option>
                       </select>
                       <p v-else>--------</p>
                       <p
                         v-if="payment.verifyPenalityBankType"
                         class="text-red-500"
                       >
                         Bank Type is required
                       </p>
                     </td>

                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <input
                         v-if="
                           payment.regular.penality +
                             payment.subsidy.penality +
                             payment.urgent.penality >
                           0
                         "
                         type="text"
                         class="custom-input h-7"
                         v-model="payment.penality.TTNumber"
                         @input="
                           payment.penality.TTNumber = $event.target.value
                         "
                        style="width:100px" />
                       <p v-else>--------</p>
                       <p
                         v-if="payment.verifyPenalityTTNumber"
                         class="text-red-500"
                       >
                         TTNumber is required
                       </p>
                     </td>

                     <td class="px-3 text-xs text-gray-700 whitespace-nowrap">
                       <p
                         v-if="
                           payment.regular.amount +
                             payment.subsidy.penality +
                             payment.urgent.penality >
                           0
                         "
                       >
                         {{ payment.penality.isPaid }}
                       </p>
                       <p v-else>--------</p>
                     </td>

                     <td
                       v-if="!payment.penality.isPaid"
                       class="px-3 text-xs text-gray-700 whitespace-nowrap relative"
                     >
                       <div
                         v-if="paymentIndex === penalityConfirmedIndex"
                         class="absolute top-0 left-1/2 transform -translate-x-1/2 mb-1 bg-blue-800 text-white text-xs px-2 py-1 rounded"
                         style="margin-top: 0.5rem; margin-left: 2rem"
                       >
                         Confirm
                       </div>
                       <button
                         v-if="
                           payment.regular.penality +
                             payment.subsidy.penality +
                             payment.urgent.penality >
                           0
                         "
                         @click="
                           confirmUnconfirmPenality(
                             payment.activeYear,
                             payment.activeMonth,
                             payment.penality,
                             payment.billCode,
                             payment.regular.penality,
                             payment.subsidy.penality,
                             payment.urgent.penality,
                             paymentIndex
                           )
                         "
                         class="custom-button bg-blue-500 text-white flex items-center p-2 rounded hover:bg-blue-600"
                         @mouseenter="
                           showPenalityConfirmUnConfirmText(
                             paymentIndex,
                             'conShow'
                           )
                         "
                         @mouseleave="
                           hidePenalityConfirmUnConfirmText('conhide')
                         "
                       >
                         <span
                           class="flex items-center justify-center bg-white rounded-full p-1"
                         >
                           <i class="fas fa-check-circle text-pink-500"></i>
                           <!-- Pink check icon -->
                         </span>
                       </button>
                       <p
                         v-else
                         class="bg-pink-100 text-indigo-800 p-1 font-extrabold"
                       >
                         Action Not Needed
                       </p>
                     </td>
                     <td
                       v-if="payment.penality.isPaid"
                       class="px-3 text-xs text-gray-700 whitespace-nowrap relative"
                     >
                       <p
                         class="bg-pink-100 text-indigo-800 p-1 font-extrabold"
                       >
                         Action Not Needed
                       </p>
                     </td>
                   </tr>
                 </tbody>
               </table>
               <p
                 v-if="payment.confirmRegularSubsisyUrgentFirst"
                 class="text-red-500 ml-5 mt-3"
               >
                 Please confirm regular, subsidy and urgent payments first ??
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>
<!-- // for displaying nothing is to display message if the user do not have the payment to be paid -->
     <div v-if="nothingToPay"
       class="py-6  -mt-1 border-t border-blue-500 w-full mb-64"
     >
       <div
         class="flex flex-col md:flex-row relative p-2 bg-blue-50 border border-gray-300 rounded-lg shadow-md flex justify-between items-center"
       >
         <span class="w-full lg:w-1/2 text-green-800 font-semibold text-lg  text-xs">
           <span class="text-blue-800 text-xs">{{ fullName }} </span> has
           successfully completed all payments. No payments are currently
           overdue or in progress. Any open payments will be processed in the
           next month.
           <span class="text-blue-800">!!!</span>
         </span>
         <a
           @click="userLevelReport()"
           href="#"
           class="w-full lg: w-1/3 text-xs  text-blue-600 hover:text-blue-800 font-medium text-lg "
         >
           See Payment History
         </a>
         <div
           class="absolute top-0 right-0 -mt-3 -mr-3 w-6 h-6 bg-green-500 rounded-full"
         ></div>
       </div>
     </div>
     <!-- // for confirming we need ti show the detail to ensure he/she is confirmeing verified data -->
     <div v-if="showPaymentDetailModal">
       <transition name="fade" mode="out-in">
         <div
           class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50 rounded-lg"
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
           </div>
         </div>
       </transition>
     </div>
     <!-- //showing the confirmed success message for the adminstrator of the system -->
     <div v-if="confirmedSuccessfully">
       <transition name="fade" mode="out-in">
         <div
           class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
         >
           <!-- Modal Content -->
           <div class="bg-white rounded-lg-lg p-6 border border-cyan-500">
             <div class="fixed inset-0 flex items-center justify-center z-50">
               <div class="bg-white rounded-lg-lg shadow-lg p-8 w-96">
                 <div class="flex items-center justify-center mb-4">
                   <svg
                     class="w-8 h-8 text-green-500 mr-2"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                   >
                     <path
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-width="2"
                       d="M5 13l4 4L19 7"
                     ></path>
                   </svg>
                   <h2 class="text-xs font-bold text-gray-800">Success!</h2>
                 </div>
                 <p class="text-gray-600 text-xs">
                   Your {{ paymentType }} confirmed successfully
                 </p>
                 <button
                   @click="confirmedSuccessfully = !confirmedSuccessfully"
                   class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg-full focus:outline-none focus:ring-2 focus:ring-green-500"
                 >
                   OK
                 </button>
               </div>
             </div>
             <hr class="my-4 md:min-w-full bg-red-500" />
           </div>
         </div>
       </transition>
     </div>
     <!-- //this is also for success message -->
     <div v-if="allPaymentSuccess">
       <transition name="fade" mode="out-in">
         <div
           class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
         >
           <!-- Modal Content -->
           <div class="bg-white rounded-lg-lg p-6 border border-cyan-500">
             <div class="fixed inset-0 flex items-center justify-center z-50">
               <div class="bg-white rounded-lg-lg shadow-lg p-8 w-96">
                 <div class="flex items-center justify-center mb-4">
                   <svg
                     class="w-8 h-8 text-green-500 mr-2"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                   >
                     <path
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-width="2"
                       d="M5 13l4 4L19 7"
                     ></path>
                   </svg>
                   <h2 class="text-xs font-bold text-gray-800">Success!</h2>
                 </div>
                 <p class="text-gray-600 text-xs">
                   Your {{ paymentType }} confirmed successfully
                 </p>
                 <button
                   @click="callGetReceipt()"
                   class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg-full focus:outline-none focus:ring-2 focus:ring-green-500"
                 >
                   OK
                 </button>
               </div>
             </div>
             <hr class="my-4 md:min-w-full bg-red-500" />
           </div>
         </div>
       </transition>
     </div>
   </div>
   <!-- // this is also for the confirming modal for the system administrator -->
   <div v-if="showConfirmModal">
     <transition name="fade" mode="out-in">
       <div
         class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
       >
         <!-- Modal Content -->
         <div
           class="bg-white rounded-lg p-6 border border-cyan-800 shadow-lg w-96"
         >
           <!-- Modal Header -->
           <div
             class="flex items-center justify-between bg-indigo-800 text-white rounded-t-lg px-4 py-2"
           >
             <h2 class="text-lg font-semibold">Payment Confirmation</h2>
             <i
               class="fas fa-times cursor-pointer"
               @click="showConfirmModal = false"
             ></i>
           </div>

           <!-- Modal Body -->
           <div class="p-6">
             <p class="text-blue-500" v-if="paymentConfirm">
               Do you want to confirm this payment with the following details?
             </p>
             <p class="text-red-500" v-if="paymentUnconfirm">
               Do you want to unconfirm this payment with the following
               details?
             </p>

             <div class="ml-4 mt-4">
               <div v-if="paymentType === 'regular'" class="space-y-2">
                 <p>
                   <i class="fas fa-coins text-yellow-500"></i> Regular Amount:
                   {{ regularPayment.amount }}
                 </p>
                 <p>
                   <i class="fas fa-hashtag text-blue-500"></i> Regular
                   TTNumber: {{ regularPayment.TTNumber }}
                 </p>
                 <p>
                   <i class="fas fa-university text-green-500"></i> Regular
                   Bank Type: {{ regularPayment.bankType }}
                 </p>
                 <p>
                   <i class="fas fa-calendar-alt text-purple-500"></i> Regular
                   Payment Date: {{ regularPayment.paidAt }}
                 </p>
               </div>
               <div v-else-if="paymentType === 'subsidy'" class="space-y-2">
                 <p>
                   <i class="fas fa-coins text-yellow-500"></i> Subsidy Amount:
                   {{ subsidyPayment.amount }}
                 </p>
                 <p>
                   <i class="fas fa-hashtag text-blue-500"></i> Subsidy
                   TTNumber: {{ subsidyPayment.TTNumber }}
                 </p>
                 <p>
                   <i class="fas fa-university text-green-500"></i> Subsidy
                   Bank Type: {{ subsidyPayment.bankType }}
                 </p>
                 <p>
                   <i class="fas fa-calendar-alt text-purple-500"></i> Subsidy
                   Payment Date: {{ subsidyPayment.paymentDate }}
                 </p>
               </div>
               <div v-else-if="paymentType === 'urgent'" class="space-y-2">
                 <p>
                   <i class="fas fa-coins text-yellow-500"></i> Urgent Amount:
                   {{ urgentPayment.amount }}
                 </p>
                 <p>
                   <i class="fas fa-hashtag text-blue-500"></i> Urgent
                   TTNumber: {{ urgentPayment.TTNumber }}
                 </p>
                 <p>
                   <i class="fas fa-university text-green-500"></i> Urgent Bank
                   Type: {{ urgentPayment.bankType }}
                 </p>
                 <p>
                   <i class="fas fa-calendar-alt text-purple-500"></i> Urgent
                   Payment Date: {{ urgentPayment.paidAt }}
                 </p>
               </div>
               <div v-else-if="paymentType === 'service'" class="space-y-2">
                 <p>
                   <i class="fas fa-coins text-yellow-500"></i> Service Amount:
                   {{ servicePayment.amount }}
                 </p>
                 <p>
                   <i class="fas fa-hashtag text-blue-500"></i> Service
                   TTNumber: {{ servicePayment.TTNumber }}
                 </p>
                 <p>
                   <i class="fas fa-university text-green-500"></i> Service
                   Bank Type: {{ servicePayment.bankType }}
                 </p>
                 <p>
                   <i class="fas fa-calendar-alt text-purple-500"></i> Service
                   Payment Date: {{ servicePayment.paidAt }}
                 </p>
               </div>
               <div v-else-if="paymentType === 'penality'" class="space-y-2">
                 <p>
                   <i class="fas fa-coins text-yellow-500"></i> Penalty Amount:
                   {{ penalityPayment.amount }}
                 </p>
                 <p>
                   <i class="fas fa-hashtag text-blue-500"></i> Penalty
                   TTNumber: {{ penalityPayment.TTNumber }}
                 </p>
                 <p>
                   <i class="fas fa-university text-green-500"></i> Penalty
                   Bank Type: {{ penalityPayment.bankType }}
                 </p>
                 <p>
                   <i class="fas fa-calendar-alt text-purple-500"></i> Penalty
                   Payment Date: {{ penalityPayment.paidAt }}
                 </p>
               </div>
             </div>
           </div>

           <!-- Modal Footer -->
           <div class="flex justify-end space-x-4 mt-6">
             <button
               @click="yesConfirmed()"
               class="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
             >
               <i class="fas fa-check mr-2"></i> OK
             </button>
             <button
               @click="showConfirmModal = false"
               class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
             >
               <i class="fas fa-times mr-2"></i> Cancel
             </button>
           </div>
         </div>
       </div>
     </transition>
   </div>
 </div>
</div> 
</template>

<script>
export default {
 data() {
   return {
     showUserList:false,
     paymentStatus: 'newPayment',
     noSelectionCount: 0,
     previosSelected: -1,
     paymentVerified: true,
     showConfirmModal: false,
     keyword: "",
     filteredUsers: [],
     users: [],




     //new bank statement 
     bankStatement:false,
      blockConfirmedIndex: null,
    blockUnconfirmIndex: false,

subsidyConfirmedIndex: null,
subsidyUnconfirmIndex: false,

urgentConfirmedIndex: null,
urgentUnconfirmedIndex: false,

serviceConfirmedIndex: null,
serviceUnconfirmIndex: null,

penalityConfirmedIndex: null,
penalityUnconfirmIndex: false,

userCode: "",
fullName: "",
showConfirmModal: false,
activeYear: "",
activeMonth: "",
includePending: true,
paymentConfirm: false,
paymentUnconfirm: false,

paymentType: "",
regularPayment: {},
subsidyPayment: {},
urgentPayment: {},
servicePayment: {},
penalityPayment: {},

payBeforeThisMonth: false,
nothingToPay: false,
placeholderText: "-----------",
nothingToPay: false,
getReceipt: false,
paymentVerified: true,
keyword: "",
filteredUsers: [],
payments: [],
payload: {
 paymentType: "",
 billcode: "",
 activeYear: "",
 activeMonth: "",
},
   };
 },
 watch: {
   keyword() {
     this.searchUsers(this.keyword);
   },
  
 },

 mounted() {

   //this.filteredUsers=this.users;
   this.$apiClient
     .get("/api/v1/users/", {
       params: {
         isActive: true,
       },
     })
     .then((response) => {
       console.log("users", response.data.users);
       if (response.data !== null) {
         this.users = response.data.users;
         this.searchedClients = this.users;
         console.log("this users",this.users);
       }
     })
     .catch((error) => {
       console.error("Error fetching users:", error);
     });
   console.log("These are the users please", this.users);


   //bank statement 
  //  this.userCode = this.$route.params.userCode;
  //  if (this.$route.query.pending == 0) {
  //    this.includePending = true;
  //  }
  //  console.log("usercode is from routre is ", this.userCode);
  //  this.fetchUnPaid();
   // this.changeMonthIntoString(1);
 },
 methods: {
   navigateToPayment(userCode) {
    // console.log("userCode", userCode);
     //this.$router.push(`/admindashboard/bank-statement/${userCode}`);
     this.bankStatement=true;
     this.showUserList=false;
     console.log("userCode",userCode);
     this.userCode=userCode;
     this.fetchUnPaid();
    
   },

   toggleUserSelection(userIndex) {
 
  
     this.filteredUsers.forEach((user) => (user.userselected = false));
     this.filteredUsers[userIndex].userselected = true;
     this.filteredUsers.forEach((user) => {
       if (!user.userselected) {
         user.payments.forEach((payment) => {
           if (payment.selected) {
             payment.selected = false;
             payment.bankSelected = true;
           }
         });
       }
     });

     if (this.previosSelected !== userIndex) {
       this.selectedPayments = [];
     }
     this.previosSelected = userIndex;
     console.log(this.selectedPayments);

    
   },

   searchUsers(keyword) {
    this.showUserList=true;
    this.bankStatement=false;
     console.log("this users=", this.users);

     this.filteredUsers = this.users.filter((user) => {
       return (
         user.fullName.toLowerCase().includes(keyword.toLowerCase()) ||
         user.userCode.toLowerCase().includes(keyword.toLowerCase())
       );
     });

     console.log("filtered users", this.filteredUsers);
   },
   sendToDataBase() {
     console.log("paymentsb", this.selectedPayments);
     if (this.selectedPayments.length === 0) {
       this.paymentVerified = false;
       console.log("length===0");
     } else {
       this.paymentVerified = true;
       this.selectedPayments.forEach((payment) => {
         if (payment.bankType === null || payment.bankType === "") {
           this.paymentVerified = false;
         }
       });
     }
     console.log("paymentsafter", this.selectedPayments);
   },

   confirmDetails() {
     console.log("current id", this.searchId);
     if (this.searchId === "") {
       //  console.log("Please Enter the Id");
       this.enterUser = true;
       return;
     }
     this.selectedUser = this.users.find((user) => user.id === this.searchId);
     if (this.selectedUser == null) {
       this.noUser = true;
       //  console.log("There is No user with the given Id");

       return;
     }
     if (
       this.formData.month === "" &&
       this.formData.regular === "" &&
       this.formData.subsidy === "" &&
       this.formData.urgent === "" &&
       this.formData.service === ""
     ) {
       //console.log("Please fill all the fields");
       this.fillFields = true;
       return;
     } else {
       this.isVisible = true;
     }
   },

   //bank statement

   showBlockConfirmUnConfirmText(paymentIndex, conUncon) {
     // //alert("hhhh")
     // Show confirmation text when hovering over the button
     if (conUncon == "conShow") {
       this.blockConfirmedIndex = paymentIndex;
     } else {
       // //alert("hi");
       this.blockUnconfirmIndex = true;
     }
   },
   hideBlockConfirmUnConfirmText(conUncon) {
     // //alert("hiding");
     if (conUncon == "conhide") {
       this.blockConfirmedIndex = null;
     } else {
       // //alert("hello")
       this.blockUnconfirmIndex = false;
     }
   },
   showSubsidyConfirmUnConfirmText(paymentIndex, conUncon) {
     // //alert("hhhh")
     // Show confirmation text when hovering over the button
     if (conUncon == "conShow") {
       this.subsidyConfirmedIndex = paymentIndex;
     } else {
       // //alert("hi");
       this.subsidyUnconfirmIndex = true;
     }
   },
   hideSubsidyConfirmUnConfirmText(conUncon) {
     // //alert("hiding");
     if (conUncon == "conhide") {
       this.subsidyConfirmedIndex = null;
     } else {
       // //alert("hello")
       this.subsidyUnconfirmIndex = false;
     }
     l;
   },
   showUrgentConfirmUnConfirmText(paymentIndex, conUncon) {
     ////alert("hhhh")
     // Show confirmation text when hovering over the button
     if (conUncon == "conShow") {
       this.urgentConfirmedIndex = paymentIndex;
     } else {
       // //alert("hi");
       this.urgentUnconfirmedIndex = true;
     }
   },
   hideUrgentConfirmUnConfirmText(conUncon) {
     // //alert("hiding");
     if (conUncon == "conhide") {
       this.urgentConfirmedIndex = null;
     } else {
       ////alert("hello")
       this.urgentUnconfirmedIndex = false;
     }
   },

   showServiceConfirmUnConfirmText(paymentIndex, conUncon) {
     // //alert("hhhh")
     // Show confirmation text when hovering over the button
     if (conUncon == "conShow") {
       this.serviceConfirmedIndex = paymentIndex;
     } else {
       // //alert("hi");
       this.serviceUnconfirmIndex = true;
     }
   },
   hideServiceConfirmUnConfirmText(conUncon) {
     // //alert("hiding");
     if (conUncon == "conhide") {
       this.serviceConfirmedIndex = null;
     } else {
       // //alert("hello")
       this.serviceUnconfirmIndex = false;
     }
   },
   showPenalityConfirmUnConfirmText(paymentIndex, conUncon) {
     //alert("penality");
     if (conUncon == "conShow") {
       //alert("confirm")
       this.penalityConfirmedIndex = paymentIndex;
     } else {
       this.penalityUnconfirmIndex = true;
     }
   },
   hidePenalityConfirmUnConfirmText(conUncon) {
     // alert("hiding");
     if (conUncon == "conhide") {
       this.penalityConfirmedIndex = null;
     } else {
       // //alert("hello")
       this.penalityUnconfirmIndex = false;
     }
   },

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
   callGetReceipt() {
     this.allPaymentSuccess = false;
     this.getReceipt = true;
   },
   userLevelReport() {
     console.log("user level report is");
     const activeTab = 2;
     this.$router.push({
       path: "/admindashboard/payments1",
       query: {
         activeTab: activeTab,
         reportLevel: "userLevelReport",
       },
     });
   },


   fetchUnPaid() {
     this.$apiClient
       .get(`/api/v1/payments/search?keyword=${this.userCode}`)
       .then((response) => {
         console.log("response from the paymentnunpaid data", response.data);
         if (response.data.status === 1) {
           if (response.data.items.length === 0) {
             this.fullName=response.data.fullName;
             //console.log("itmes become zero");
             this.nothingToPay = true;
             
           } else if (response.data.items.paid) {
             this.printDiv();
           }
         }
         if (this.includePending) {
           this.payments = response.data.items;
           this.fullName = response.data.items[0].fullName;
         } else {
           this.payments = this.payments.filter(
             (payment) => payment.status == "overdue"
           );
         }

         this.payments = this.payments.map((payment) => {
           payment.activeMonthInString = this.changeMonthIntoString(
             payment.activeMonth
           );
           return payment;
         });

         this.payments.forEach((payment) => {
           if (payment.regular.bankType == null) {
             payment.regular.bankType = "";
           }
           if (payment.subsidy.bankType == null) {
             payment.subsidy.bankType = "";
           }
           if (payment.urgent.bankType == null) {
             // //alert("urgent is empty");
             payment.urgent.bankType = "";
             //  console.log("ttn",payment.urgent.TTNumber);
           }
           if (payment.service.bankType == null) {
             payment.service.bankType = "";
           }
           if (payment.penality.bankType == null) {
             payment.penality.bankType = "";
           }
         });

         console.log("payment ufter set to empty", this.payments);
       })
       .catch((error) => {
         console.error(error);
       });
   },
   yesConfirmed() {
     console.log("yesConfirmed");
     console.log("thispayload", this.payload);
     this.showConfirmModal = false;

     if (this.paymentType == "regular") {
       this.sendRegularToDb();
     } else if (this.paymentType == "subsidy") {
       this.sendSubsidyToDb();
     } else if (this.paymentType == "urgent") {
       this.sendUrgentToDb();
     } else if (this.paymentType == "service") {
       this.sendServiceToDb();
     } else {
       this.sendPenalityToDb();
     }
   },
   sendRegularToDb() {
     this.payload.regular.isPaid = true;
     console.log("this payload", this.payload);

     console.log("payments", this.payments);

     // //alert("regular to db");

     console.log("payload", this.payload);

     this.$apiClient
       .patch("/api/v1/payments/confirm", this.payload, {
         headers: {
           "Content-Type": "application/json",
         },
       })
       .then((response) => {
         console.log("this reponse after confirmation", response.data);

         if (response.data.items.isPaid) {
           this.$router.push({
             path: `/admindashboard/payment-history-detail/${response.data.items.userCode}`,
             query: {
               year: this.activeYear,
               month: this.activeMonth,
             },
           });
         } else {
           this.fetchUnPaid();
         }
       })
       .catch((error) => {
         console.log("Error regular confirming", error);
       });
   },
   sendSubsidyToDb() {
     this.payload.subsidy.isPaid = true;
     console.log("this payload", this.payload);
     this.$apiClient
       .patch("/api/v1/payments/confirm", this.payload, {
         headers: {
           "Content-Type": "application/json",
         },
       })
       .then((response) => {
         if (response.data.items.isPaid) {
           this.$router.push({
             path: `/admindashboard/payment-history-detail/${response.data.items.userCode}`,
             query: {
               year: this.activeYear,
               month: this.activeMonth,
             },
           });
         } else {
           this.fetchUnPaid();
         }
       })
       .catch((error) => {
         console.log("Error service confirming", error);
       });
   },
   sendUrgentToDb() {
     this.payload.urgent.isPaid = true;
     console.log("this payload", this.payload);

     this.$apiClient
       .patch("/api/v1/payments/confirm", this.payload, {
         headers: {
           "Content-Type": "application/json",
         },
       })
       .then((response) => {
         if (response.data.items.isPaid) {
           this.$router.push({
             path: `/admindashboard/payment-history-detail/${response.data.items.userCode}`,
             query: {
               year: this.activeYear,
               month: this.activeMonth,
             },
           });
         } else {
           this.fetchUnPaid();
         }
       })
       .catch((error) => {
         console.log("Error service confirming", error);
       });
   },
   sendServiceToDb() {
     this.payload.service.isPaid = true;

     console.log("this payload", this.payload);
     this.$apiClient
       .patch("/api/v1/payments/confirm", this.payload, {
         headers: {
           "Content-Type": "application/json",
         },
       })
       .then((response) => {
         if (response.data.items.isPaid) {
           this.$router.push({
             path: `/admindashboard/payment-history-detail/${response.data.items.userCode}`,
             query: {
               year: this.activeYear,
               month: this.activeMonth,
             },
           });
         } else {
           this.fetchUnPaid();
         }
       })
       .catch((error) => {
         console.log("Error service confirming", error);
       });
   },
   sendPenalityToDb() {
     this.payload.penality.isPaid = true;
     console.log("this payload", this.payload);

     this.$apiClient
       .patch("/api/v1/payments/confirm", this.payload, {
         headers: {
           "Content-Type": "application/json",
         },
       })
       .then((response) => {
         if (response.data.items.isPaid) {
           this.$router.push({
             path: `/admindashboard/payment-history-detail/${response.data.items.userCode}`,
             query: {
               year: this.activeYear,
               month: this.activeMonth,
             },
           });
         } else {
           this.fetchUnPaid();
         }
       })
       .catch((error) => {
         console.log("Error service confirming", error);
       });
   },

   confirmUnconfirmRegular(
     regularPayment,
     billcode,
     activeYear,
     activeMonth,
     paymentIndex
   ) {
     console.log("regular payment===", regularPayment);
     this.paymentType = "regular";
     this.activeYear = activeYear;
     this.activeMonth = activeMonth;
     if (paymentIndex > 0) {
       this.payments[paymentIndex].permitSelect = true;
       return;
     } else {
       this.payments[paymentIndex].permitSelect = false;
     }
     if (this.payments[paymentIndex].regular.paidAt === null) {
       this.payments[paymentIndex].verifyRegularPaymentDate = true;
       return;
     } else if (this.payments[paymentIndex].regular.bankType === null) {
       // console.log("regular by=null");
       this.payments[paymentIndex].verifyRegularPaymentDate = false;
       this.payments[paymentIndex].verifyRegularBankType = true;
       return;
     } else if (this.payments[paymentIndex].regular.TTNumber === null) {
       this.payments[paymentIndex].verifyRegularPaymentDate = false;
       this.payments[paymentIndex].verifyRegularBankType = false;
       this.payments[paymentIndex].verifyRegularTTNumber = true;
       return;
     } else {
       this.payments[paymentIndex].verifyRegularPaymentDate = false;
       this.payments[paymentIndex].verifyRegularBankType = false;
       this.payments[paymentIndex].verifyRegularTTNumber = false;
     }

     if (regularPayment.isPaid) {
       this.paymentUnconfirm = true;
       this.paymentConfirm = false;
     } else {
       this.paymentConfirm = true;
       this.paymentUnconfirm = false;
     }

     const payload = {
       billCode: billcode,
       regular: regularPayment,
     };
     this.payload = payload;
     this.regularPayment = regularPayment;
     this.showConfirmModal = true;
   },
   confirmUnconfirmSubsidy(
     subsidyPayment,
     billcode,
     activeYear,
     activeMonth,
     paymentIndex
   ) {
     console.log("subsidy");

     this.activeYear = activeYear;
     this.activeMonth = activeMonth;

     this.paymentType = "subsidy";
     if (paymentIndex > 0) {
       this.payments[paymentIndex].permitSelect = true;
       return;
     } else {
       this.payments[paymentIndex].permitSelect = false;
     }

     if (this.payments[paymentIndex].subsidy.paidAt === null) {
       this.payments[paymentIndex].verifySubsidyPaymentDate = true;

       return;
     } else if (this.payments[paymentIndex].subsidy.bankType === null) {
       this.payments[paymentIndex].verifySubsidyBankType = true;
       this.payments[paymentIndex].verifySubsidyPaymentDate = false;
       return;
     } else if (this.payments[paymentIndex].subsidy.TTNumber === null) {
       this.payments[paymentIndex].verifySubsidyBankType = false;
       this.payments[paymentIndex].verifySubsidyPaymentDate = false;
       this.payments[paymentIndex].verifySubsidyTTNumber = true;
       return;
     } else {
       this.payments[paymentIndex].verifySubsidyPaymentDate = false;
       this.payments[paymentIndex].verifySubsidyBankType = false;
       this.payments[paymentIndex].verifySubsidyTTNumber = false;
     }

     if (subsidyPayment.isPaid) {
       this.paymentUnconfirm = true;
       this.paymentConfirm = false;
       //subsidyPayment.isPaid = !subsidyPayment.isPaid;
     } else {
       this.paymentUnconfirm = false;
       this.paymentConfirm = true;
       //subsidyPayment.isPaid = !subsidyPayment.isPaid;
     }

     const payload = {
       billCode: billcode,
       subsidy: subsidyPayment,
     };

     this.payload = payload;
     this.subsidyPayment = subsidyPayment;
     this.showConfirmModal = true;
   },
   confirmUnconfirmUrgent(
     urgentPayment,
     billcode,
     activeYear,
     activeMonth,
     paymentIndex
   ) {
     this.paymentType = "urgent";

     this.activeYear = activeYear;
     this.activeMonth = activeMonth;

     if (paymentIndex > 0) {
       this.payments[paymentIndex].permitSelect = true;
       return;
     } else {
       this.payments[paymentIndex].permitSelect = false;
     }

     if (this.payments[paymentIndex].urgent.paidAt === null) {
       console.log("in paymentType");
       this.payments[paymentIndex].verifyUrgentPaymentDate = true;

       return;
     } else if (this.payments[paymentIndex].urgent.bankType === null) {
       console.log("in bankType");
       this.payments[paymentIndex].verifyUrgentBankType = true;
       this.payments[paymentIndex].verifyUrgentPaymentDate = false;

       return;
     } else if (this.payments[paymentIndex].urgent.TTNumber === null) {
       console.log("ttn");
       this.payments[paymentIndex].verifyUrgentTTNumber = true;
       this.payments[paymentIndex].verifyUrgentBankType = false;
       this.payments[paymentIndex].verifyUrgentPaymentDate = false;
       return;
     } else {
       this.payments[paymentIndex].verifyUrgentPaymentDate = false;
       this.payments[paymentIndex].verifyUrgentBankType = false;
       this.payments[paymentIndex].verifyUrgentTTNumber = false;
     }

     if (urgentPayment.isPaid) {
       this.paymentUnconfirm = true;
       this.paymentConfirm = false;
       urgentPayment.isPaid = !urgentPayment.isPaid;
     } else {
       this.paymentUnconfirm = false;
       this.paymentConfirm = true;
       urgentPayment.isPaid = !urgentPayment.isPaid;
     }

     const payload = {
       billCode: billcode,
       urgent: urgentPayment,
     };
     this.payload = payload;
     this.urgentPayment = urgentPayment;
     this.showConfirmModal = true;
   },
   confirmUnconfirmService(
     servicePayment,
     billcode,
     activeYear,
     activeMonth,
     paymentIndex
   ) {
     this.paymentType = "service";

     this.activeYear = activeYear;
     this.activeMonth = activeMonth;

     console.log("Confirm Unconfirm service penalility");
     if (paymentIndex > 0) {
       this.payments[paymentIndex].permitSelect = true;
       return;
     } else {
       this.payments[paymentIndex].permitSelect = false;
     }
     console.log("servicePayment", servicePayment);

     if (this.payments[paymentIndex].service.paidAt === null) {
       this.payments[paymentIndex].verifyServicePaymentDate = true;

       return;
     } else if (this.payments[paymentIndex].service.bankType === null) {
       this.payments[paymentIndex].verifyServiceBankType = true;
       this.payments[paymentIndex].verifyServicePaymentDate = false;

       return;
     } else if (this.payments[paymentIndex].service.TTNumber === null) {
       this.payments[paymentIndex].verifyServiceTTNumber = true;
       this.payments[paymentIndex].verifyServiceBankType = false;
       this.payments[paymentIndex].verifyServicePaymentDate = false;
       return;
     } else {
       this.payments[paymentIndex].verifyServicePaymentDate = false;
       this.payments[paymentIndex].verifyServiceBankType = false;
       this.payments[paymentIndex].verifyServiceTTNumber = false;
     }

     if (servicePayment.isPaid) {
       this.paymentUnconfirm = true;
       this.paymentConfirm = false;
       servicePayment.isPaid = !servicePayment.isPaid;
     } else {
       this.paymentUnconfirm = false;
       this.paymentConfirm = true;
       servicePayment.isPaid = !servicePayment.isPaid;
     }

     servicePayment.daysLate = null;
     const payload = {
       billCode: billcode,
       service: servicePayment,
       activeMonth: activeMonth,
       activeYear: activeYear,
     };
     this.payload = payload;
     this.servicePayment = servicePayment;
     this.showConfirmModal = true;
   },
   confirmUnconfirmPenality(
     activeYear,
     activeMonth,
     penalityPayment,
     billcode,
     regularPenality,
     subsidyPenality,
     urgentPenality,
     paymentIndex
   ) {
     console.log("3 of them", this.payments[paymentIndex].penality.bankType);

     console.log("confirm modal is", this.showConfirmModal);
     console.log("penality Payment", penalityPayment);
     this.paymentType = "penality";
     this.activeYear = activeYear;
     this.activeMonth = activeMonth;
     if (paymentIndex > 0) {
       this.payments[paymentIndex].permitSelect = true;
       return;
     } else {
       this.payments[paymentIndex].permitSelect = false;
     }

     if (this.payments[paymentIndex].penality.paidAt === null) {
       this.payments[paymentIndex].verifyPenalityPaymentDate = true;
       return;
     } else {
       this.payments[paymentIndex].verifyPenalityPaymentDate = false;
     }

     if (
       this.payments[paymentIndex].penality.bankType === null ||
       this.payments[paymentIndex].penality.bankType == ""
     ) {
       this.payments[paymentIndex].verifyPenalityBankType = true;
       return;
     } else {
       alert(this.payments[paymentIndex].penality.bankType);
       this.payments[paymentIndex].verifyPenalityPaymentDate = false;
       this.payments[paymentIndex].verifyPenalityBankType = false;
     }
     if (this.payments[paymentIndex].penality.TTNumber === null) {
       this.payments[paymentIndex].verifyPenalityTTNumber = true;
       return;
     } else {
       //alert("how")
       this.payments[paymentIndex].verifyPenalityPaymentDate = false;
       this.payments[paymentIndex].verifyPenalityBankType = false;
       this.payments[paymentIndex].verifyPenalityTTNumber = false;
     }
     if (
       !this.payments[paymentIndex].regular.isPaid ||
       !this.payments[paymentIndex].subsidy.isPaid ||
       !this.payments[paymentIndex].urgent.isPaid
     ) {
       //alert("confirm first");
       this.payments[paymentIndex].confirmRegularSubsisyUrgentFirst = true;
       //return;
     } else {
       // alert("normal");
       this.payments[paymentIndex].confirmRegularSubsisyUrgentFirst = false;
     }

     //penalityPayment.isPaid = !penalityPayment.isPaid;

     penalityPayment.amount =
       Number(regularPenality) +
       Number(subsidyPenality) +
       Number(urgentPenality);
     if (penalityPayment.isPaid) {
       // alert("if")
       this.paymentUnconfirm = true;
       this.paymentConfirm = false;
       //penalityPayment.isPaid = !penalityPayment.isPaid;
     } else {
       //alert("else");
       this.paymentUnconfirm = false;
       this.paymentConfirm = true;
       //penalityPayment.isPaid = !penalityPayment.isPaid;
     }

     const payload = {
       billCode: billcode,
       penality: penalityPayment,
     };

     this.payload = payload;
     this.penalityPayment = penalityPayment;
     //alert("i reach here");
     this.showConfirmModal = true;
   },
   fetchRegularPenality(selectedPayment) {
     //alert("fetch penality called");

     console.log("active year ,month,paid at for regular selected",selectedPayment.activeYear,selectedPayment.activeMonth,selectedPayment.regular.paidAt);


     console.log("in fetch regluar penality", selectedPayment);
     this.$apiClient
       .get("api/v1/payments/penality", {
         params: {
           activeYear: selectedPayment.activeYear,
           activeMonth: selectedPayment.activeMonth,
           paymentType: "regular",
           paymentDate: selectedPayment.regular.paidAt,
         },
       })
       .then((response) => {
         console.log("response from regular penality latest from kaliye", response.data);
         this.payments.forEach((payment) => {
           if (payment._id === selectedPayment._id) {
             payment.regular.penality = response.data.penality;
             console.log("payment regular penality", payment.regular.penality);
             // payment.regular.daysLate = 10;
           }
         });
       })
       .catch((error) => {
         console.log(error);
       });
   },
   fetchSubsidyPenality(selectedPayment) {
     //alert("fetch penality called");

     console.log("in fetch subsidy penality", selectedPayment);

     this.$apiClient
       .get("api/v1/payments/penality", {
         params: {
           activeYear: selectedPayment.activeYear,
           activeMonth: selectedPayment.activeMonth,
           paymentType: "subsidy",
           paymentDate: selectedPayment.subsidy.paidAt,
         },
       })
       .then((response) => {
         console.log("response subsidy penality", response.data);
         this.payments.forEach((payment) => {
           if (payment._id === selectedPayment._id) {
             payment.subsidy.penality = response.data.penality;
             payment.subsidy.daysLate = response.data.daysLate;
           }
         });
       })
       .catch((error) => {
         console.log(error);
       });
   },
   fetchUrgentPenality(selectedPayment) {
     console.log("in fetch urgent penality", selectedPayment);
     this.$apiClient
       .get("api/v1/payments/penality", {
         params: {
           activeYear: selectedPayment.activeYear,
           activeMonth: selectedPayment.activeMonth,
           paymentType: "urgent",
           paymentDate: selectedPayment.urgent.paidAt,
         },
       })
       .then((response) => {
         console.log("response urgent penality", response.data);
         this.payments.forEach((payment) => {
           if (payment._id === selectedPayment._id) {
             payment.urgent.penality = response.data.penality;
             payment.urgent.daysLate = response.data.daysLate;
           }
         });
       })
       .catch((error) => {
         console.log(error);
       });
   },
   changePaymentSelection(paymentId) {
     console.log("paymentId", paymentId);
     this.payments.forEach((payment) => {
       // Check if the payment belongs to the given userId
       if (payment.id === paymentId) {
         // Set the selected property of the payment to true
         payment.paymentSelected = true;
         console.log("true");
       } else {
         // Set the selected property of other payments to false
         payment.paymentSelected = false;
         console.log("true");
       }
     });
   },
   goToSearcUser() {
     console.log("pressed");
     this.$router.push("admindashboard/user-for-bank-statement");
   },
   sendToDataBase() {
     const year = new Date().getFullYear();
     const month = new Date().getMonth() + 1;
     const userId = "bana0001";
     const instant = true;
     this.$router.push({
       path: "/admindashboard/general-receipt",
       query: { year, month, userId, instant },
     });
   },
   openModal() {
     console.log("This is the value given", this.payments);
     this.showPaymentDetailModal = true;
   },
   closeModal() {
     this.showPaymentDetailModal = false;
   },
 },
};
</script>

<style>
/* Add any custom styles here */
</style>
