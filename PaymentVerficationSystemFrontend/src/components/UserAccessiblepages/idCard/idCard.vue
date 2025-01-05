<template>
  <div class="mb-10 px-10 py-2  mb-64">
    <div class=" border-b border-indigo-800 mb-5">
      <div class=" flex flex-row mb-5">
        <h1 class="font-extrabold text-blue-500">Id Card</h1>
      
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


<div
      class="flex flex-col mx-10 mt-5 borderborder-blue-500 hidden"
      id="printable-area"
    >
      <div
        class="header h-20 w-full bg-gray-100 flex items-center justify-between border-t border-l border-r border-blue-500"
      >
        <div class="flex items-center">
          <img
            src="../../../assets/img/circularlogo.jpg"
            alt=""
            class="h-10 w-10 ml-10"
          />
          <div class="flex flex-col">
            <p class="text-blue-500 ml-5 font-extrabold">ባና ሞል ዲጂታል ኣይዲ ካርድ</p>
            <p class="text-blue-500 ml-5 font-extrabold">
              Banna Mall digital ID Card
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-row h-full items-stretch border border-blue-500">
        <!-- Left Column (Profile Image and User Information) -->
        <div class="flex flex-col w-1/2">
          <!-- Profile Image Section -->
          <div class="mx-auto mt-16">
            <img
              :src="imageData"
              alt="User Image"
              class="h-48 w-48 rounded-full"
            />
          </div>

          <!-- Horizontal Line Above -->
          <div class="mx-auto border-t border-blue-500 mt-4 mb-4"></div>

          <!-- User Information Section -->
          <div class="pl-16 p-4  font-extrabold flex-grow">
            <div class="w-full">
              <div class="flex items-start mt-2">
                <p class="text-blue-500 text-xs w-1/3">ምሉእ ሽም/Full Name:</p>
                <span class="ml-2 text-yellow-800 text-xs break-words">{{
                 fullName
                }}</span>
              </div>
              <div class="flex items-start mt-2">
                <p class="text-blue-500 text-xs w-1/3">ኮድ/User Code:</p>
                <span class="ml-2 text-yellow-800 text-xs break-words">{{
                userCode
                }}</span>
              </div>
           
              <div class="mx-auto flex items-start mt-2">
                <p class="text-blue-500 text-xs w-1/3">ጾታ/Gender:</p>
                <span class="ml-2 text-yellow-800 text-xs break-words">{{
                  userGender
                }}</span>
              </div>
              <div class="mx-auto flex items-start mt-2">
                <p class="text-blue-500 text-xs w-1/3">ሜይል/Email:</p>
                <span class="ml-2 text-yellow-800 text-xs break-words">{{
                  userEmail
                }}</span>
              </div>
              <div class="mx-auto flex items-start mt-2">
                <p class="text-blue-500 text-xs w-1/3">ስልኪ/Phone Number:</p>
                <span class="ml-2 text-yellow-800 text-xs break-words">{{
                 userPhoneNumber 
                }}</span>
              </div>
              <div class="mx-auto flex items-start mt-2">
                <p class="text-blue-500 text-xs w-1/3">ኣድራሻ/Address:</p>
                <span class="ml-2 text-yellow-800 text-xs break-words">{{
                  userAddress
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column (Disclaimer and Barcode) -->
        <div class="w-1/2 border-l border-blue-500 flex flex-col">
          <div class="m-5 flex-grow">
            <!-- Disclaimer Section -->
            <h2 class="mb-5 text-center font-semibold">መተሓሳሰቢ | Disclaimer</h2>
            <div class="flex flex-col rounded-lg space-y-4">
              <div
                class="text-xs font-extrabold border border-blue-500 text-blue-500 rounded p-5"
              >
                This card is only for the person seen in the photo
              </div>
              <div
                class="text-xs font-extrabold border border-blue-500 text-blue-500 rounded p-5"
              >
                This card is used for making payments to Bana
              </div>
              <div
                class="text-xs font-extrabold border border-blue-500 text-blue-500 rounded p-5"
              >
                This card cannot be used for any other purposes
              </div>
            </div>
          </div>

          <!-- Barcode Section Below the Disclaimer -->
          <div class="mx-auto mt-5 mb-5" id="qrCodeImageContainer">
            <!-- QR Code will appear here -->
          </div>
        </div>
      </div>

      <div class="my-3">
        <div class="h-10 bg-gray-100 border border-dashed border-blue-500">
          <p class="text-blue-500 ml-10 pb-5 pt-1">
            Cut in the dotted border and get your id card in pysical format.
          </p>
        </div>
      </div>

      <div class="w-full bg-gray-100 border border-dashed border-blue-500 flex">
        <!-- Front Section -->
        <div
          class="front w-1/2 border-r border-dashed border-blue-500 p-4 flex flex-col rounded-l-lg"
        >
          <!-- Header Section -->
          <div class="header flex items-center justify-between mb-4">
            <div class="flex items-center">
              <img
                src="../../../assets/img/circularlogo.jpg"
                alt="Logo"
                class="h-8 w-8 rounded-full"
              />
              <div class="ml-5">
                <p class="text-gray-500 font-extrabold text-sm">
                  ባና ሞል ዲጂታል ኣይዲ ካርድ
                </p>
                <p class="text-gray-500 font-extrabold text-sm">
                  Banna Mall Digital ID Card
                </p>
              </div>
            </div>
          </div>

          <!-- Image and User Information Section -->
          <div class="flex items-center space-x-4">
            <!-- Image Section -->
            <div class="flex-shrink-0 h-full">
              <img :src="imageData" alt="User Image" class="h-32 w-32" />
            </div>

            <div class="flex flex-col space-y-1 h-full">
              <!-- User Code -->
              <div class="flex flex-col">
                <!-- Field Name -->
                <p class="text-xxs font-semibold text-gray-700">
                  ተጠቃሚ ኮድ | Usercode
                </p>
                <!-- Value -->
                <p class="text-xxs text-gray-800 font-extrabold mt-1 ml-2">
                  {{ userCode }}
                </p>
              </div>

              <!-- Full Name -->
              <div class="flex flex-col">
                <!-- Field Name -->
                <p class="text-xxs font-semibold text-gray-700">
                  ሙሉእ ሽም | Full Name
                </p>
                <!-- Value -->
                <p class="text-xxs text-gray-800 font-extrabold mt-1 ml-2">
                  {{fullName }}
                </p>
              </div>

              <!-- Gender -->
              <div class="flex flex-col">
                <!-- Field Name -->
                <p class="text-xxs font-semibold text-gray-700">ጾታ | Sex</p>
                <!-- Value -->
                <p class="text-xxs text-gray-800 font-extrabold mt-1 ml-2">
                  {{ userGender }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Back Section -->
        <div class="back w-1/2 p-4 flex flex-col rounded-r-lg bg-gray-100">
          <!-- User Contact Information -->
          <div class="flex flex-row space-x-4">
            <div class="w-1/2 text-xs space-y-1">
              <p class="text-xxs font-semibold text-gray-700">
                ስልኪ ቁጽሪ | Phone Number:
              </p>
              <p class="ml-5 text-gray-800 font-extrabold text-xxs">
                {{ userPhoneNumber }}
              </p>
              <p class="text-xxs font-semibold text-gray-700">ኢመይል | Email:</p>
              <p class="ml-5 text-xxs text-gray-800 font-extrabold">
                {{ userEmail }}
              </p>
              <p class="text-xxs font-extrabold text-gray-700">
                ኣድራሻ | Address:
              </p>
              <p class="ml-5 text-xxs text-gray-800 font-extrabold">
                {{ userAddress }}
              </p>
            </div>
            <!-- QR Code Section -->
            <div
              class="w-1/2 flex justify-center items-center rounded-full"
              id="qrCodeImageContainer1"
            >
              <!-- QR Code will appear here -->
            </div>
          </div>

          <!-- Disclaimer Text -->
          <p
            class="text-violet-500 font-bold text-xxs bg-gray-100 p-2 rounded-lg"
          >
            <i class="fas fa-exclamation-circle"></i> If you find this dropped,
            please return it to the intended company or your nearest police
            station. Thanks!
          </p>
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


   this.$apiGetById('/api/v1/users',localStorage.getItem('userId'))
    .then((response) => {
      console.log("response",response)
      this.userEmail = response.clientProfile.email;
      this.userAddress = response.clientProfile.address;
      this.userGender = response.clientProfile.gender;
      this.fullName = response.clientProfile.fullName;
      this.userPhoneNumber = response.clientProfile.phoneNumber;
      this.userCode = response.clientProfile.userCode;
      this.imageData = "data:image/jpeg;base64," + response.imageData;

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
