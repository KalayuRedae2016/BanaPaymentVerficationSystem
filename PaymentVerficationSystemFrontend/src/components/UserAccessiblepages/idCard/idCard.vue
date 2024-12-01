<template>
  <div class="mb-10 px-10 py-2 ">
    <div class=" border-b border-indigo-800 mb-5">
      <div class=" flex flex-row mb-5">
  <h1 class="font-extrabold text-indigo-800">Id Card</h1>
  <div class="">
    <button class="custom-button absolute right-10 flex items-center bg-pink-500 text-white rounded-md hover:bg-pink-600" @click="downloadReceiptAsPDF">
      <i class="fas fa-download mr-2 text-pink-500"></i> 
      Download
    </button>
  </div>
</div>
</div>
 



   
<div   class="flex flex-col hidden " id="printable-area" >
       <h1>hiii</h1>
  </div>
</div>
</template>

<script>
import QRCode from 'qrcode';
import html2pdf from 'html2pdf.js';
import { mapGetters } from "vuex";
export default {
  data() {
    return {

      user:"",
      userProfile:"",
      imageData:"",
      showIdCard:false,
      year: "",
      month: "",
      selectYear: false,
      selectMonth: false,
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
    };
  },
  mounted() {


    this.$apiClient
            .get(`/api/v1/users/${this.userId}`)
            .then((response) => {
              console.log("Response client profile", response);
              this.clientProfile = response.data.clientProfile;
              this.user=response.data.clientProfile;

                  console.log("this.user=",this.user);

                console.log("userid",this.userId);
              this.imageData = "data:image/jpeg;base64," + response.data.imageData;         
              this.generateQRCodeImage(this.user);

            })
            .catch((error) => {
             console.error("Error fetching client datakk:", error);
         });
       
         this.generateQRCodeImage(this.userId);
  },

  computed: {
    ...mapGetters(["getToken", "getUserId", "getLocale", "getName"]),
    userId() {
      return this.getUserId;
    },
  },
  methods: {
    async generateQRCodeImage(userId) {

      const qrData = `"User Code":${userId.userCode}, "Full Name": ${userId.fullName}, "Phone Number":${userId.phoneNumber}, "Email":${userId.email}, "Address":${userId.address}, "Gender":${userId.gender}, "ID Giver Company":${'https://bannamall.com/'}`;
  
  try {
    const qrCodeImage = await QRCode.toDataURL(qrData, { errorCorrectionLevel: 'H' });
    document.getElementById('qrCodeImageContainer').innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
    document.getElementById('qrCodeImageContainer1').innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
 
  } catch (error) {
    console.error('Error generating QR code:', error);
  }

     
    },

    async downloadReceiptAsPDF() {




      //  await generateQRCodeImage();

      // Clone the printable area
      const element = document.getElementById("printable-area").cloneNode(true);

      // Create a temporary div to hold the content and Tailwind styles
      const wrapperDiv = document.createElement('div');
      wrapperDiv.appendChild(element);

      //Fetch the Tailwind CSS file and append it as a <style> tag to the wrapperDiv
      const tailwindStylesheet = await fetch("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css")
        .then(response => response.text());

      //   alert("look the error still");

      const styleElement = document.createElement("style");
       styleElement.innerHTML = tailwindStylesheet;

      // Append the Tailwind CSS <style> tag to the cloned document
      wrapperDiv.appendChild(styleElement);



      // Options for html2pdf conversion
      const options = {
        filename: 'receipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      // Convert the wrapperDiv (which contains the styles and content) to PDF
      html2pdf().from(wrapperDiv).set(options).save();
    }
  }

};
</script>
