<template>
  <div class="mb-10 px-10 py-2 ">
    <div class=" border-b border-indigo-800 mb-5">
      <div class=" flex flex-row mb-5">
        <h1 class="font-extrabold text-indigo-800">Id Card</h1>
        <div class="">
          <button
            class="custom-button absolute right-10 flex items-center bg-pink-500 text-white rounded-md hover:bg-pink-600"
            @click="downloadReceiptAsPDF">
            <i class="fas fa-download mr-2 text-pink-500"></i>
            Download
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col" id="printable-area">
      <div class="header h-20 w-full bg-blue-500 flex items-center justify-between">
        <div class="flex items-center">
          <img src="../../../assets/img/circularlogo.jpg" alt="" class="h-10 w-10 ml-10">
          <div class="flex flex-col">
            <p class="text-white ml-5">ባና ሞል ዲጂታል ኣይዲ ካርድ</p>
            <p class="text-white ml-5">Banna Mall digital ID Card </p>
          </div>
        </div>
        <img src="../../../assets/img/tigflag.jpg" alt="" class="h-10 w-16 mr-10 rounded-lg">
      </div>

      <div class="flex flex-row">
        <div class="bg-white border-t-2 border-l-2 border-b-2 border-dashed border-blue-500 flex flex-col w-1/2">
          <div class=" mb-5 flex flex-row justify-center">
            <div class="mt-10 ml-5">
              <img :src="imageData" alt="" class="h-32 w-32" />
            </div>
            <div class="mx-5 mt-8 text-xs">

              <p class="text-blue-500 text-xs">ምሉእ ሽም/Full Name:<span class=" ml-2 text-yellow-800 text-xs">{{
                  user.fullName }} </span></p>
              <p class="text-blue-500 text-xs">ኣድራሻ/Address:<span class=" ml-2 text-yellow-800 text-xs">{{ user.address
                  }}</span></p>
              <p class="text-blue-500 font-bold text-xs">ጾታ/Gender:<span
                  class=" ml-2 text-yellow-800 font-bold text-xs">{{ user.gender }}</span></p>

            </div>
          </div>
          <div class="flex ml-5 mb-5 h-64" id="qrCodeImageContainer">
          </div>
        </div>

        <div class="w-1/2 bg-white border-2 border-dashed border-blue-500 ">
          <div class="m-5">
            <h2 class="mb-5"> መተሓሳሰቢ | Disclaimer </h2>

            <div
              class="flex flex-col w-full bg-gray-50 rounded-lg  border border-blue-500 flex items-center justify-center p-4">
              <p class="text-xs"><i class="far fa-circle text-gray-600 mr-2 text-green-500">
                </i>This card is only for the person seen in the photo</p>
              <p class="text-xs"><i class="far fa-circle text-gray-600 mr-2 text-green-500">
                </i>This card is only for the person seen in the photo</p>
              <p class="text-xs"><i class="far fa-circle text-gray-600 mr-2 text-green-500">
                </i>This card is only for the person seen in the photo</p>




            </div>

          </div>

        </div>
      </div>

      <div class=" my-3">
        <div class="h-10 bg-blue-800  rounded-lg">
          <p class="text-yellow-500 ml-10 font-bold italic">Cut in the dotted border and get your id card. </p>
        </div>
      </div>

      <div class="">
        <div class="w-full  bg-white border-2 border-dashed border-blue-500 flex flex-row rounded-lg">
          <div class="front  border-r-2 border-dashed border-blue-500 w-1/2 flex flex-col">
            <div class="rounded-lg mx-5 mt-3 mb-2 header h-8  flex items-center justify-between">
              <div class="flex items-center">
                <img src="../../../assets/img/circularlogo.jpg" alt="" class="h-8 w-8 ">
                <div class="flex flex-col">
                  <p class="ml-5 text-gray-500 font-extrabold text-sm">ባና ሞል ዲጂታል ኣይዲ ካርድ</p>
                  <p class=" ml-5 text-gray-500 font-extrabold text-sm">Banna Mall Digital ID Card </p>

                </div>

              </div>

              <img src="../../../assets/img/tigflag.jpg" alt="" class="h-6 w-10 mr-10 rounded-lg">
            </div>
            <div class="flex flex-row mx-5">
              <div>
                <img :src="imageData" alt="" style=" hieght:120px;width:120px;" class="mb-3">
              </div>
              <div class="p-4 space-y-2">
                <p class="text-xs">ተጠቃሚ ኮድ/Usercode:{{ user.userCode }}</p>
                <p class="text-xs">ሙሉእ ሽም/Full Name:</p>
                <p class="text-xs ml-3">{{ user.fullName }}</p>
                <p class="text-xs">ጾታ / Sex :{{ user.gender }}</p>

              </div>
            </div>
          </div>
          <div class="back w-1/2  ">
            <div class="flex flex-row p-4">
              <div class="w-1/2 text-xs">
                <p class="text-xs">ስልኪ ቁጽሪ/Phone Number</p>
                <p class="ml-5 text-xs">
                  {{ user.phoneNumber }}
                </p>
                <p class="text-xs">ኢመይል /Email</p>
                <p class="ml-5 text-xs">
                  {{ user.email }}
                </p>
                <p class="text-xs">ኣድራሻ /Address</p>
                <p class="ml-5 text-xs">
                  {{ user.address }}
                </p>


              </div>
              <div class="w-1/2 h-32 w-32" id="qrCodeImageContainer1">

              </div>
            </div>
            <p class="mx-5  mb-2 text-indigo-900 text-xs"><i class="fas fa-exclamation-circle"></i> If you find this
              droped,please give to the intended company or to your closer police station. Thanks!!!</p>
          </div>

        </div>
      </div>
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

      user: "",
      userProfile: "",
      imageData: "",
      showIdCard: false,
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
        this.user = response.data.clientProfile;

        console.log("this.user=", this.user);

        console.log("userid", this.userId);
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
