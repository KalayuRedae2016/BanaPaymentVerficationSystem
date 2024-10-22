<template>
    <div class="bg-green-200 text-blue-800 p-4">
 
      <div class="flex items-center space-x-4">
        <h1 class="text-2xl font-bold">Bana Mole Receipt</h1>
      </div>
  

      <h2 class="text-lg font-semibold mt-4">Company Information</h2>
      <div class="grid grid-cols-2 gap-4 mt-2">
        <div class="bg-white border border-gray-300 p-4">
          <table class="w-full">
            <tbody>
              <tr>
                <td class="font-semibold">Country:</td>
                <td>Ethiopia</td>
              </tr>
              <tr>
                <td class="font-semibold">City:</td>
                <td>Mekelle</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bg-white border border-gray-300 p-4">
          <table class="w-full">
            <tbody>
              <tr>
                <td class="font-semibold">Email:</td>
                <td>bana@gmail.com</td>
              </tr>
              <tr>
                <td class="font-semibold">Tel:</td>
                <td>096-740-501</td>
              </tr>
              <tr>
                <td class="font-semibold">Address:</td>
                <td>Mekelle Kedemay Weyane</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
 
      <div class="bg-white border border-gray-300 p-4 mt-4 relative">
        <img src="../../../../assets/img/bar.png" alt="Payment Image" class="w-36 h-36 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> -->
        <table class="w-full">
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
              <td class="text-right">lkk</td>
            </tr>
            <tr>
              <td class="font-semibold">FullName</td>
              <td></td>
              <td class="text-right">mm</td>
            </tr>
            <tr>
              <td class="font-semibold">BillCode</td>
              <td></td>
              <td class="text-right">kkk</td>
            </tr>
            <tr>
              <td class="font-semibold">PaymentTerm</td>
              <td></td>
              <td class="text-right">{{ PaymentTerm }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Payment Date</td>
              <td></td>
              <td class="text-right">kkk</td>
            </tr>
            <tr>
              <td class="font-semibold">Emer</td>
              <td></td>
              <td class="text-right">kk</td>
            </tr>
            <tr>
              <td class="font-semibold">RegularAmount</td>
              <td></td>
              <td class="text-right">kkk</td>
            </tr>
            <tr>
              <td class="font-semibold">ServiceAmount</td>
              <td></td>
              <td class="text-right">kkk</td>
            </tr>
            <tr>
              <td class="font-semibold">SubsidyAmount</td>
              <td></td>
              <td class="text-right">kkk</td>
            </tr>
            <tr>
              <td class="font-semibold">Penality</td>
              <td></td>
              <td class="text-right">kk</td>
            </tr>
            <tr>
              <td class="font-semibold">jjj</td>
              <td></td>
              <td class="text-right">{{ DaysLate }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Transferred Amount</td>
              <td></td>
              <td class="text-right">kkk</td>
            </tr>
          </tbody>
        </table>
      </div>
  
    
     <img src="../../../../assets/img/bar.png" alt="Barcode" class="block mx-auto mt-4 max-w-xs">
 
      <p class="text-center mt-4">The Best Mole Ever</p>
      <p class="text-center text-sm mt-1">&copy; 2024 Bana Mole. All rights reserved.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        PaymentTerm: 'Example Term', 
        DaysLate: 'Example Days' 
      };
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  