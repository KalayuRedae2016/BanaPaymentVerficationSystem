<template>
  <div class="mb-10 px-2 py-2">
    <LoadingSpinner :visible="isLoading"/>

    <div class="border-b border-indigo-800 mb-5">
      <div class="flex flex-row mb-5">
        <h1 class="font-extrabold text-blue-500">{{ $t("idCard") }}</h1>
      </div>
    </div>
    <div class="py-6 -mt-1">
      
  <div class="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
  <!-- Search Input -->
  <div class="flex-1 mr-4">
    <input
      v-model="keyword"
      type="text"
      :placeholder="$t('searchByNameEmailUsername')"
      class="custom-input w-full h-12 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-600"
    />
  </div>

</div>

      <div v-if="showList" class="border-t border-blue-900 border-dotted bg-white h-64 overflow-y-auto ">
        <div
          class="p-4 border-b border-blue-900 border-dotted cursor-pointer text-gray-500 text-sm"
          v-for="(user, userIndex) in filteredUsers"
          :key="userIndex"
         
          @click="toggleUserSelection(user)"
        >
          <div class="flex flex-row font-bold ">
            <p class="text-blue-800 w-1/4">{{ user.userCode }}</p>
            <p class="text-gray-600 w-2/3">{{ user.fullName }}</p>
            <p class="text-gray-600 w-2/3">{{ user.email }}</p>
          </div>
        </div>
      </div>


    </div>

    <div v-if="showIdCard" class="flex flex-col lg:flex-row items-center p-8 bg-white border border-gray-300 rounded-xl shadow-lg  space-y-6 lg:space-y-0 lg:space-x-8">
    
    <!-- Left Section: Image and Button (Mobile and Desktop) -->
    <div class="flex flex-col items-center space-y-4 w-full lg:w-1/4 lg:items-start rounded-lg">
      <img :src="imageData" alt="User Profile" class="h-full w-48  object-cover " />
      
  
    </div>

    <!-- Right Section: User Info -->
    <div class="w-full lg:w-1/2 text-center lg:text-left">
      <div class=" text-sm text-gray-500 ml-8">
        <div class="bg-white p-2 rounded-md shadow-sm ">
              <div class="flex items-center space-x-3 border-b border-gray-300 border-t border-gray-300 py-2">
                <i class="fas fa-id-badge text-green-500"></i>

                <span class="text-sm text-gray-800"
                  >{{ $t("User Code") }}:{{ selectedUser.userCode }}</span
                >
              </div>
            </div>

            <div class="bg-white p-2 rounded-md shadow-sm">
              <div class="flex items-center space-x-3 border-b border-gray-300">
                <i class="fas fa-user text-yellow-500"></i>

                <span class="text-sm text-gray-800"
                  >Full Name : {{ selectedUser.fullName }}</span
                >
              </div>
            </div>
        <button
        class="border border-gray-300 mt-4 flex items-center px-6 py-3 text-black text-base font-medium rounded-full transform transition duration-300 ease-in-out hover:bg-blue-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 hover:text-gray-700"
        @click="downloadReceiptAsPDF"
      >
        <i class="fas fa-download mr-3"></i>Id Card
      </button>
      </div>
    </div>
   
  </div>



  <div v-if="showIdCard" class="flex flex-col hidden" id="printable-area">
      <div
        class="header h-20 w-full bg-blue-500 flex items-center justify-between"
      >
        <div class="flex items-center">
          <img
            src="../../../assets/img/circularlogo.jpg"
            alt=""
            class="h-10 w-10 ml-10"
          />
          <div class="flex flex-col">
            <p class="text-white ml-5">ባና ሞል ዲጂታል ኣይዲ ካርድ</p>
            <p class="text-white ml-5">Banna Mall digital ID Card</p>
          </div>
        </div>
      </div>

      <div class="flex flex-row">
        <div
          class="bg-white border-t-2 border-l-2 border-b-2 border-dashed border-blue-500 flex flex-col w-1/2"
        >
          <div class="mb-5 flex flex-row justify-center">
            <div class="mt-10 ml-5">
              <img :src="imageData" alt="" class="h-32 w-32" />
            </div>
            <div class="mx-5 mt-8 text-xs">
              <p class="text-blue-500 text-xs">
                ምሉእ ሽም/Full Name:<span class="ml-2 text-yellow-800 text-xs"
                  >{{ selectedUser.fullName }}
                </span>
              </p>
              <p class="text-blue-500 text-xs">
                ኣድራሻ/Address:<span class="ml-2 text-yellow-800 text-xs">{{
                  selectedUser.address
                }}</span>
              </p>
              <p class="text-blue-500 font-bold text-xs">
                ጾታ/Gender:<span
                  class="ml-2 text-yellow-800 font-bold text-xs"
                  >{{ selectedUser.gender }}</span
                >
              </p>
            </div>
          </div>
          <div class="flex ml-5 mb-5 h-64" id="qrCodeImageContainer"></div>
        </div>

        <div class="w-1/2 bg-white border-2 border-dashed border-blue-500">
          <div class="m-5">
            <h2 class="mb-5">መተሓሳሰቢ | Disclaimer</h2>

            <div
              class="flex flex-col w-full bg-gray-50 rounded-lg border border-blue-500 flex items-center justify-center p-4"
            >
              <p class="text-xs">
                <i class="far fa-circle text-gray-600 mr-2 text-green-500"> </i
                >This card is only for the person seen in the photo
              </p>
              <p class="text-xs">
                <i class="far fa-circle text-gray-600 mr-2 text-green-500"> </i
                >This card is only for the person seen in the photo
              </p>
              <p class="text-xs">
                <i class="far fa-circle text-gray-600 mr-2 text-green-500"> </i
                >This card is only for the person seen in the photo
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="my-3">
        <div class="h-10 bg-blue-800 rounded-lg">
          <p class="text-yellow-500 ml-10 font-bold italic">
            Cut in the dotted border and get your id card.
          </p>
        </div>
      </div>

      <div class="">
        <div
          class="w-full bg-white border-2 border-dashed border-blue-500 flex flex-row rounded-lg"
        >
          <div
            class="front border-r-2 border-dashed border-blue-500 w-1/2 flex flex-col"
          >
            <div
              class="rounded-lg mx-5 mt-3 mb-2 header h-8 flex items-center justify-between"
            >
              <div class="flex items-center">
                <img
                  src="../../../assets/img/circularlogo.jpg"
                  alt=""
                  class="h-8 w-8"
                />
                <div class="flex flex-col">
                  <p class="ml-5 text-gray-500 font-extrabold text-sm">
                    ባና ሞል ዲጂታል ኣይዲ ካርድ
                  </p>
                  <p class="ml-5 text-gray-500 font-extrabold text-sm">
                    Banna Mall Digital ID Card
                  </p>
                </div>
              </div>
            </div>
            <div class="flex flex-row mx-5">
              <div>
                <img
                  :src="imageData"
                  alt=""
                  style="hieght: 120px; width: 120px"
                  class="mb-3"
                />
              </div>
              <div class="p-4 space-y-2">
                <p class="text-xs">
                  ተጠቃሚ ኮድ/Usercode:{{ selectedUser.userCode }}
                </p>
                <p class="text-xs">ሙሉእ ሽም/Full Name:</p>
                <p class="text-xs ml-3">{{ selectedUser.fullName }}</p>
                <p class="text-xs">ጾታ / Sex :{{ selectedUser.gender }}</p>
              </div>
            </div>
          </div>
          <div class="back w-1/2">
            <div class="flex flex-row p-4">
              <div class="w-1/2 text-xs">
                <p class="text-xs">ስልኪ ቁጽሪ/Phone Number</p>
                <p class="ml-5 text-xs">
                  {{ selectedUser.phoneNumber }}
                </p>
                <p class="text-xs">ኢመይል /Email</p>
                <p class="ml-5 text-xs">
                  {{ selectedUser.email }}
                </p>
                <p class="text-xs">ኣድራሻ /Address</p>
                <p class="ml-5 text-xs">
                  {{ selectedUser.address }}
                </p>
              </div>
              <div class="w-1/2 h-32 w-32" id="qrCodeImageContainer1"></div>
            </div>
            <p class="mx-5 mb-2 text-indigo-900 text-xs">
              <i class="fas fa-exclamation-circle"></i> If you find this
              droped,please give to the intended company or to your closer
              police station. Thanks!!!
            </p>
          </div>
        </div>
      </div>
    
    </div>
  </div>
</template>
  
  <script>
import QRCode from "qrcode";
import html2pdf from "html2pdf.js";
import LoadingSpinner from '../../Common/LoadingSpinner.vue'
export default {
  components: {
   
    LoadingSpinner
  },
  data() {
    return {
      isLoading:false,
      showList:true,
      imageData: "",
      selectedUser: "",
      showIdCard: false,
      keyword: "",
      users: [],
      searchedClients: [],
      year: "",
      month: "",
      selectYear: false,
      selectMonth: false,
      paymentTerm: "monthly",
      websiteUrl: "https://bannamall.com/",
      Email: "bannamall@gmail.com",
      Country: "Ethipia",
      Tel: "0967740501",
      Address: "Mekelle Kedemay Weyane",
      City: "Mekelle",
      filteredUsers:{

      }
    };
  },
  
  watch: {
    keyword() {
      // alert("Watch");
      this.searchUsers(this.keyword);
    },
  },

 mounted() {
     this.$apiClient
      .get("/api/v1/users/", {
        params: {
          isActive: true,
        },
      })
      .then((response) => {
        console.log("response data", response.data);
        if (response.data !== null) {
          //alert(this.users)
          this.users = response.data.users;
          this.filteredUsers = this.users;
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    console.log("These are the users please", this.users);
  },

  methods: {
    toggleUserSelection(user) {
      this.isLoading=true

      this.showList=false;
      this.showIdCard = true;
      this.filteredUsers = [];
      this.selectedUser = user;
      this.$apiClient
        .get(`/api/v1/users/${user._id}`)
        .then((response) => {
          console.log("Response client profile", response);
          this.isLoading=false;
          this.clientProfile = response.data.clientProfile;
          this.imageData = "data:image/jpeg;base64," + response.data.imageData;

        })
        .catch((error) => {
          console.error("Error fetching client datakk:", error);
        });

      this.generateQRCodeImage(user);
      console.log("user=", user);
    },

    searchUsers(keyword) {
      this.showList=true;
      this.showIdCard = false;
      this.filteredUsers = this.users.filter((user) => {
        return (
          user.fullName.toLowerCase().includes(keyword.toLowerCase()) ||
          user.userCode.toLowerCase().includes(keyword.toLowerCase())
        );
      });

      console.log("filtered users", this.filteredUsers);
    },
    async generateQRCodeImage(user) {
      console.log("usercode uu", user);
      this.selectedUser = user;
      const qrData = `"User Code":${this.selectedUser.userCode}, "Full Name": ${
        this.selectedUser.fullName
      }, "Phone Number":${this.selectedUser.phoneNumber}, "Email":${
        this.selectedUser.email
      }, "Address":${this.selectedUser.address}, "Gender":${
        this.selectedUser.gender
      }, "ID Giver Company":${"https://bannamall.com/"}`;

      try {
        const qrCodeImage = await QRCode.toDataURL(qrData, {
          errorCorrectionLevel: "H",
        });
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

    async downloadReceiptAsPDF() {
      //  await this.generateQRCodeImage();
      // Clone the printable area
      const element = document.getElementById("printable-area").cloneNode(true);
      element.classList.remove('hidden');
      // Create a temporary div to hold the content and Tailwind styles
      const wrapperDiv = document.createElement("div");
      wrapperDiv.appendChild(element);

      // Fetch the Tailwind CSS file and append it as a <style> tag to the wrapperDiv
      // const tailwindStylesheet = await fetch("https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css")
      //   .then(response => response.text());

      //   alert("look the error still");

      const styleElement = document.createElement("style");
      // styleElement.innerHTML = tailwindStylesheet;

      // Append the Tailwind CSS <style> tag to the cloned document
      wrapperDiv.appendChild(styleElement);

      // Options for html2pdf conversion
      const options = {
        filename: this.selectedUser.fullName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      // Convert the wrapperDiv (which contains the styles and content) to PDF
      html2pdf().from(wrapperDiv).set(options).save();
    },
  },
};
</script>
  