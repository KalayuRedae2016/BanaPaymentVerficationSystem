<template>
  <div class="mb-10 px-10 py-2  mb-64">
    <div class=" border-b border-indigo-800 mb-5">
      <div class=" flex flex-row mb-5">
        <h1 class="font-extrabold text-indigo-800">Id Card</h1>
      
      </div>
    </div>

    <div class="space-y-4">
  <!-- View Card -->
  <div
    class="flex justify-between items-center w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
    @click="viewCardAsPDF()">
    <span>View Card</span>
    <i class="fas fa-eye text-gray-500"></i>
  </div>

  <!-- Download -->
  <div
    class="flex justify-between items-center w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
    @click="downloadReceiptAsPDF()">
    <span>Download</span>
    <i class="fas fa-download text-gray-500"></i>
  </div>
</div>


    <div class="flex flex-col hidden" id="printable-area">
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
                  fullName }} </span></p>
              <p class="text-blue-500 text-xs">ኣድራሻ/Address:<span class=" ml-2 text-yellow-800 text-xs">{{ userAddress
                  }}</span></p>
              <p class="text-blue-500 font-bold text-xs">ጾታ/Gender:<span
                  class=" ml-2 text-yellow-800 font-bold text-xs">{{ userGender }}</span></p>

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
                <img :src="imageData" alt="" style="height:120px;width:120px;" class="mb-3">
              </div>
              <div class="p-4 space-y-2">
                <p class="text-xs">ተጠቃሚ ኮድ/Usercode:{{ userCode }}</p>
                <p class="text-xs">ሙሉእ ሽም/Full Name:</p>
                <p class="text-xs ml-3">{{ fullName }}</p>
                <p class="text-xs">ጾታ / Sex :{{ userGender }}</p>

              </div>
            </div>
          </div>
          <div class="back w-1/2  ">
            <div class="flex flex-row p-4">
              <div class="w-1/2 text-xs">
                <p class="text-xs">ስልኪ ቁጽሪ/Phone Number</p>
                <p class="ml-5 text-xs">
                  {{ userPhoneNumber }}
                </p>
                <p class="text-xs">ኢመይል /Email</p>
                <p class="ml-5 text-xs">
                  {{ userEmail }}
                </p>
                <p class="text-xs">ኣድራሻ /Address</p>
                <p class="ml-5 text-xs">
                  {{ userAddress }}
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
      userEmail:"",
      userAddress:"",
      userPhoneNumber:"",
      userGender:"",
      fullName:this.userCode + " " + "Bana User",
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
    .get(`/api/v1/users/${localStorage.getItem('userId')}`)
    .then((response) => {
      console.log("Response client profile based on the id", response);

      // Assigning response data to component properties
      this.userEmail = response.data.clientProfile.email;
      this.userAddress = response.data.clientProfile.address;
      this.userGender = response.data.clientProfile.gender;
      this.fullName = response.data.clientProfile.fullName;
      this.userPhoneNumber = response.data.clientProfile.phoneNumber;
      this.userCode = response.data.clientProfile.userCode;
      this.imageData = "data:image/jpeg;base64," + response.data.imageData;

    })
    .catch((error) => {
      console.error("Error fetching client data:", error);
    });

    this.generateQRCodeImage();

  },

  computed: {
    ...mapGetters(["getToken", "getUserId", "getLocale", "getName"]),
    userId() {
      return this.getUserId;
    },
  },
  methods: {
    async viewCardAsPDF() {
  // Clone the printable area
  const element = document.getElementById("printable-area").cloneNode(true);
  element.classList.remove('hidden');

  // Create a temporary div to hold the content and Tailwind styles
  const wrapperDiv = document.createElement("div");
  wrapperDiv.appendChild(element);

  // Fetch the Tailwind CSS file and append it as a <style> tag to the wrapperDiv (if needed)
  const styleElement = document.createElement("style");
  // If your Tailwind CSS is local, ensure it's included in the generated document
  wrapperDiv.appendChild(styleElement);

  // Options for html2pdf conversion
  const options = {
    filename: this.fullName + "(" + this.userCode + ")",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  // Generate the PDF and get its blob
  const pdfBlob = await html2pdf().from(wrapperDiv).set(options).outputPdf("blob");

  // Create a Blob URL for the PDF
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Open the PDF in a new tab for viewing
  window.open(pdfUrl, "_blank");
},

    async generateQRCodeImage() {

      const qrData = `"User Code":${this.userCode}, "Full Name": ${this.fullName}, "Phone Number":${this.userPhoneNumber}, "Email":${this.userEmail}, "Address":${this.userAddress}, "Gender":${this.userGender}, "Company":${'https://bannamall.com/'}`;
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
      
      element.classList.remove('hidden');

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
        filename: this.fullName + "(" + this.userCode + ")",
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
