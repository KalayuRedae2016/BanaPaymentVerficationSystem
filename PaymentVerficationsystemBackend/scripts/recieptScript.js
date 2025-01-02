// const mongoose = require('mongoose');
// const Template = require('.././Models/templateModel'); // Adjust the path as necessary

// mongoose.connect('mongodb://localhost:27017/Paymentmanagmentsystem', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const newTemplate = new Template({
//   name: 'reciept',
//   content: `
//    <!DOCTYPE html>
// <html>
// <head>
//   <title>Bana Mole Reciept</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       margin: 0;
//       padding: 20px;
//     }

//     h1 {
//       text-align: center;
//       margin-bottom: 20px;
   
//     }

//     table {
//       width: 100%;
//       border-collapse: collapse;
//       margin-bottom: 20px;
//     }

//     th, td {
//       padding: 10px;
//       text-align: left;
//       border-bottom: 1px solid #ddd;
//     }

//     th {
//       background-color: #f2f2f2;
//     }

//     .right-aligned {
//       text-align: right;
//     }

//     .payment-info {
//       border: 2px solid #b9a6a3;
//       padding: 20px;
//       position: relative;
//     }

//     .payment-info-image {
//       display: block;
//       margin: 0 auto;
    
//       height: 150px;
//       width: 150px;
//       position: absolute;
//       top: 40%;
//       transform: translateY(-50%);
//       left: 35%;
//       transform: translateX(-50%);
//     }

//     .barcode {
//       display: block;
//       margin: 20px auto;
//       max-width: 200px;
//       height: auto;
//     }

//     .company-info {
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       grid-gap: 20px;
//     }
//   </style>
// </head>
// <body>
// <div style="background-color :#85af85 ;color:blue;display: flex; align-items: center; padding-left: 10px;"> <img src="{{Bana Logo}}" alt="Bank Logo" class="payment-info-image1" style="width: 30px;height: 30px;"> <h1>Bana Mole Reciept</h1> </div>
 
//   <h2 style="font-size: medium;">Company Information</h2>

//   <div class="company-info">
//     <table>
//       <tr>
//         <td>Country:</td>
//         <td>Ethiopia</td>
//       </tr>
//       <tr>
//         <td>City:</td>
//         <td>Mekelle</td>
//       </tr>
//     </table>
//     <table>
//       <tr>
//         <td>Email:</td>
//         <td>bana@gmail.com</td>
//       </tr>
//       <tr>
//         <td>Tel:</td>
//         <td>096-740-501</td>
//       </tr>
     
//       <tr>
//         <td>Address:</td>
//         <td>Mekelle kedemay weyane</td>
//       </tr>
//     </table>
//   </div>

//   <div class="payment-info">
//     <img src="{{stamp}}" alt="Bank Logo" class="payment-info-image">
//     <table>
//       <tr>
//         <th>Payment Information</th>
//         <th></th>
//         <th></th>
//       </tr>
//        <tr>
//         <td>UserCode</td>
//         <td></td>
//         <td>{{UserCode}}</td>
//       </tr>

//       <tr>
//         <td>FullName</td>
//         <td></td>
//         <td>{{FullName}}</td>
//       </tr>

//        <tr>
//         <td>BillCode</td>
//         <td></td>
//         <td>{{BillCode}}</td>
//       </tr>

//       <tr>
//         <td>PaymentTerm:</td>
//         <td></td>
//         <td>{{PaymentTerm}}</td>
//       </tr>
  
//       <tr>
//         <td>Payment Date:</td>
//         <td></td>
//         <td>{{ConfirmedDate}}</td>
//       </tr>
//       <tr>

//       <tr>
//         <td>urgentAmount:</td>
//         <td></td>
//         <td>{{urgentAmount}}</td>
//       </tr>
      
//       <tr>
//         <td>RegularAmount:</td>
//         <td></td>
//         <td>{{RegularAmount}}</td>
//       </tr>
      
//       <tr>
//         <td>ServiceAmount:</td>
//         <td></td>
//         <td>{{ServiceAmount}}</td>
//       </tr>
      
//       <tr>
//         <td>SubsidyAmount:</td>
//         <td></td>
//         <td>{{SubsidyAmount}}</td>
//       </tr>

//       <tr>
//         <td>Penality:</td>
//         <td></td>
//         <td>{{Penality}}</td>
//       </tr>
     
//       <tr>
//         <td>Days Late:</td>
//         <td></td>
//         <td>{{DaysLate}}</td>
//       </tr>
      
//       <tr>
//         <td>Transferred Amount:</td>
//         <td></td>
//         <td>{{TransferredAmount}}</td>
//       </tr>
     
//     </table>
//   </div>

//   <img src="{{QrCode}}" alt="Barcode" class="barcode">

//   <p>The Best Mole Ever</p>
//   <p>&copy; 2024 Bana Mole. All rights reserved.</p>
// </body>
// </html>  `,
// });

// // Save the template to the database
// newTemplate.save()
//   .then(() => {
//     //console.log('Template saved successfully.');
//     mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error('Error saving template:', err);
//     mongoose.disconnect();
//   });
