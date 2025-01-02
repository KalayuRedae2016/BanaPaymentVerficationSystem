<template>
  <div class="mb-10 px-2 py-2">
    <LoadingSpinner :visible="isLoading" />

    <div class="border-b border-indigo-800 mb-5">
      <div class="flex flex-row mb-5">
        <h1 class="font-extrabold text-blue-500">{{ $t("idCard") }}</h1>
      </div>
    </div>
    <div class="py-6 -mt-1">
      <div
        class="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200"
      >
        <div class="flex-1 mr-4">
          <input
            v-model="keyword"
            type="text"
            :placeholder="$t('searchByNameEmailUsername')"
            class="custom-input w-full h-12 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-600"
          />
        </div>
      </div>

      <div
        v-if="showList"
        class="border-t border-blue-900 border-dotted bg-white h-64 overflow-y-auto"
      >
        <div
          class="p-4 border-b border-blue-900 border-dotted cursor-pointer text-gray-500 text-sm"
          v-for="(user, userIndex) in filteredUsers"
          :key="userIndex"
          @click="toggleUserSelection(user)"
        >
          <div class="flex flex-row font-bold">
            <p class="text-blue-800 w-1/4">{{ user.userCode }}</p>
            <p class="text-gray-600 w-2/3">{{ user.fullName }}</p>
            <p class="text-gray-600 w-2/3">{{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showIdCard"
      class="flex flex-col lg:flex-row items-center p-8 bg-white border border-gray-300 shadow-lg space-y-6 lg:space-y-0 lg:space-x-8"
    >
      <!-- Left Section: Image and Button (Mobile and Desktop) -->
      <div
        class="flex flex-col items-center space-y-4 w-full lg:w-1/4 lg:items-start rounded-lg"
      >
        <img
          :src="imageData"
          alt="User Profile"
          class="mt-5 h-full w-48 object-cover"
        />
      </div>

      <!-- Right Section: User Info -->
      <div class="w-full lg:w-1/2 text-center lg:text-left">
        <div class="text-sm text-gray-500 ml-8">
          <div class="bg-white p-2 rounded-md shadow-sm">
            <div
              class="flex items-center space-x-3 border-b border-gray-300 border-t border-gray-300 py-2"
            >
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
          <button class="custom-button mt-3" @click="downloadReceiptAsPDF">
            <i class="fas fa-download mr-3"></i>Download Id Card
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="showIdCard"
      class="flex flex-col mx-10 mt-5 border border-white hidden"
      id="printable-area"
    >
      <div
        class="header h-20 w-full bg-blue-100 flex items-center justify-between border-b border-white"
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

      <div class="flex flex-row">
        <div class="flex flex-col bg-blue-100 0 w-1/2">
          <!-- Image Section -->
          <div class="mx-auto mt-16">
            <img
              :src="imageData"
              alt="User Image"
              class="h-48 w-48 rounded-full"
            />
          </div>

          <!-- Horizontal Line Above -->
          <div class="mx-auto border-t border-white mt-4 mb-4"></div>

          <!-- User Information Section -->
          <div class="pl-16 bg-blue-100 p-4 mt-5 font-extrabold">
            <div class="w-full">
              <div class="flex items-start mt-2">
                <p class="text-blue-500 text-xs w-1/3">ምሉእ ሽም/Full Name:</p>
                <span class="ml-2 text-yellow-800 text-xs break-words">{{
                  selectedUser.fullName
                }}</span>
              </div>
              <div class="mx-auto flex items-start mt-2">
                <p class="text-blue-500 text-xs w-1/3">ኣድራሻ/Address:</p>
                <span class="ml-2 text-yellow-800 text-xs break-words">{{
                  selectedUser.address
                }}</span>
              </div>
              <div class="mx-auto flex items-start mt-2">
                <p class="text-blue-500 text-xs w-1/3">ጾታ/Gender:</p>
                <span class="ml-2 text-yellow-800 text-xs break-words">{{
                  selectedUser.gender
                }}</span>
              </div>
            </div>
          </div>

          <!-- Horizontal Line Below -->
          <div class="border-b border-white mt-4 mb-4"></div>

          <!-- Barcode Section -->
          <div class="mx-auto mt-5 mb-5" id="qrCodeImageContainer">
            <!-- QR Code will appear here -->
          </div>
        </div>

        <!-- Disclaimer Section -->
        <div class="w-1/2 bg-blue-100 border-l border-white">
          <div class="m-5">
            <h2 class="mb-5 text-center font-semibold">መተሓሳሰቢ | Disclaimer</h2>
            <div class="flex flex-col rounded-lg space-y-4">
              <div
                class="text-xs font-extrabold border border-white text-blue-500 rounded p-5"
              >
                This card is only for the person seen in the photo
              </div>
              <div
                class="text-xs font-extrabold border border-white text-blue-500 rounded p-5"
              >
                This card is used for making payments to Bana
              </div>
              <div
                class="text-xs font-extrabold border border-white text-blue-500 rounded p-5"
              >
                This card cannot be used for any other purposes
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div class="my-3">
        <div class="h-10 bg-blue-100 border border-dashed border-blue-500">
          <p class="text-blue-500 ml-10 pb-3">
            Cut in the dotted border and get your id card in pysical format.
          </p>
        </div>
      </div>

      <div class="w-full bg-blue-100 border border-dashed border-blue-500 flex">
        <!-- Front Section -->
        <div
          class="front w-1/2 bg-blue-100 border-r border-dashed border-blue-500 p-4 flex flex-col rounded-l-lg"
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
              <img
                :src="imageData"
                alt="User Image"
                class="h-32 w-32 rounded-md object-cover"
              />
            </div>

            <div
              class="flex flex-col items-center justify-center space-y-2 h-full"
            >
              <div>
                <p class="text-xxs font-semibold text-gray-700">
                  ተጠቃሚ ኮድ | Usercode
                </p>
                <p class="text-xxs text-gray-800 mt-1 ml-10 font-extrabold">
                  {{ selectedUser.userCode }}
                </p>
              </div>
              <!-- Full Name -->
              <div>
                <p class="text-xxs font-semibold text-gray-700">
                  ሙሉእ ሽም | Full Name
                </p>
                <p class="text-xxs text-gray-800 mt-1 ml-10 font-extrabold">
                  {{ selectedUser.fullName }}
                </p>
              </div>
              <!-- Gender -->
              <div>
                <p class="text-xxs font-semibold text-gray-700">ጾታ | Sex</p>
                <p class="text-xxs text-gray-800 ml-10 font-extrabold">
                  {{ selectedUser.gender }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Back Section -->
        <div class="back w-1/2 p-4 flex flex-col rounded-r-lg bg-blue-100">
          <!-- User Contact Information -->
          <div class="flex flex-row space-x-4">
            <div class="w-1/2 text-xs space-y-1">
              <p class="text-xxs font-semibold text-gray-700">
                ስልኪ ቁጽሪ | Phone Number:
              </p>
              <p class="ml-5 text-gray-800 font-extrabold text-xxs">
                {{ selectedUser.phoneNumber }}
              </p>
              <p class="text-xxs font-semibold text-gray-700">ኢመይል | Email:</p>
              <p class="ml-5 text-xxs text-gray-800 font-extrabold">
                {{ selectedUser.email }}
              </p>
              <p class="text-xxs font-extrabold text-gray-700">
                ኣድራሻ | Address:
              </p>
              <p class="ml-5 text-xxs text-gray-800 font-extrabold">
                {{ selectedUser.address }}
              </p>
            </div>
            <!-- QR Code Section -->
            <div
              class="w-1/2 flex justify-center items-center"
              id="qrCodeImageContainer1"
            >
              <!-- QR Code will appear here -->
            </div>
          </div>

          <!-- Disclaimer Text -->
          <p
            class="text-violet-500 font-bold text-xxs bg-blue-100 p-2 rounded-lg"
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
import QRCode from "qrcode";
import html2pdf from "html2pdf.js";
import LoadingSpinner from "../../Common/LoadingSpinner.vue";
export default {
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      showList: true,
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
      filteredUsers: {},
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
      this.isLoading = true;

      this.showList = false;
      this.showIdCard = true;
      this.filteredUsers = [];
      this.selectedUser = user;
      this.$apiClient
        .get(`/api/v1/users/${user._id}`)
        .then((response) => {
          console.log("Response client profile", response);
          this.isLoading = false;
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
      this.showList = true;
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
        ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code" style='height:200px;'/>`;
        document.getElementById(
          "qrCodeImageContainer1"
        ).innerHTML = `<img src="${qrCodeImage}" alt="QR Code" style='height:130px;width:130px;'/>`;
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    },

    async downloadReceiptAsPDF() {
      //  await this.generateQRCodeImage();
      // Clone the printable area
      const element = document.getElementById("printable-area").cloneNode(true);
      element.classList.remove("hidden");
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
  