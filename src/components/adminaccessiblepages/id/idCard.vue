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
   
  
      <div class="py-6  -mt-1">
      <div class="mb-4">
        <div class="flex flex-col">
          <div class="flex flex-row space-x-4">
            <input
           
              v-model="keyword"
              id="id-search"
              type="text"
              class="custom-input h-10"
              placeholder="Search by Usercode,Name"
            />
          </div>
          <!-- <p v-if="noUser" class="text-red-500 ml-32"><strong>Hoops! there is no user with this Id <span class="text-blue">{{ currentId }}</span></strong></p> -->
        </div>
      </div>

      <div class="border-t border-blue-900 border-dotted">
        <div
          class="p-4 border-b border-blue-900 border-dotted cursor-pointer"
          v-for="(user, userIndex) in filteredUsers"
          :key="userIndex"
          :class="[
            'p-4 border-b cursor-pointer',
            {
              'bg-blue-200 ': user.userselected, // Background color when selected
              'bg-gray-50': !user.userselected, // Default background color
            },
          ]"
          @click="toggleUserSelection(user)"
        >
          <div class="mt-4 flex flex-row space-x-5 md:space-x-12">
            <p>{{ user.userCode }}</p>
            <p>{{ user.fullName }}</p>
          </div>
        </div>
      </div>
    </div>
     
  
      <div  v-if="showIdCard" class="flex flex-col" id="printable-area">
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
                <img
                 :src="imageData"
                 alt="" 
                 class="h-32 w-32" />
              </div>
              <div class="mx-5 mt-8 text-xs">
  
                <p class="text-blue-500 text-xs">ምሉእ ሽም/Full Name:<span class=" ml-2 text-yellow-800 text-xs">{{ selectedUser.fullName }} </span></p>
                <p class="text-blue-500 text-xs">ኣድራሻ/Address:<span class=" ml-2 text-yellow-800 text-xs">{{ selectedUser.address }}</span></p>
                <p class="text-blue-500 font-bold text-xs">ጾታ/Gender:<span class=" ml-2 text-yellow-800 font-bold text-xs">{{ selectedUser.gender }}</span></p>
  
              </div>
            </div>
            <div class="flex ml-5 mb-5 h-64" id="qrCodeImageContainer" >
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
                  <img   :src="imageData" alt="" style=" hieght:120px;width:120px;" class="mb-3">
                </div>
                <div class="p-4 space-y-2">
                  <p class="text-xs">ተጠቃሚ ኮድ/Usercode:{{ selectedUser.userCode}}</p>
                  <p class="text-xs">ሙሉእ ሽም/Full Name:</p>
                  <p class="text-xs ml-3">{{ selectedUser.fullName }}</p>
                  <p class="text-xs">ጾታ / Sex :{{ selectedUser.gender }}</p>
  
                </div>
              </div>
            </div>
            <div class="back w-1/2  ">
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
                <div class="w-1/2 h-32 w-32" id="qrCodeImageContainer1">

                </div>
              </div>
              <p class="mx-5  mb-2 text-indigo-900 text-xs"><i class="fas fa-exclamation-circle"></i> If you find this droped,please give to the intended company or to your closer police station. Thanks!!!</p>
            </div>
  
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import QRCode from 'qrcode';
  import html2pdf from 'html2pdf.js';
  export default {
    data() {
      return {
        imageData:"",
        selectedUser:"",
        showIdCard:false,
        keyword:"",
        users:[],
        searchedClients:[],
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
          this.users = response.data.users;
          this.searchedClients = this.users;
          console.log("this users",this.users);
          console.log("this.imageData",this.imageData);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    console.log("These are the users please", this.users);
    },
  
  
    methods: {

   toggleUserSelection(user) {
    this.showIdCard=true;
    this.filteredUsers=[];
    this.selectedUser=user;
    this.$apiClient
        .get(`/api/v1/users/${user._id}`)
        .then((response) => {
          console.log("Response client profile", response);

          this.clientProfile = response.data.clientProfile;
          this.imageData = "data:image/jpeg;base64," + response.data.imageData;
        })
        .catch((error) => {
         console.error("Error fetching client datakk:", error);
     });


     this.generateQRCodeImage(user);
    console.log("user=",user);

    }, 

    searchUsers(keyword) {
        this.showIdCard=false;
      this.filteredUsers = this.users.filter((user) => {
        return (
          user.fullName.toLowerCase().includes(keyword.toLowerCase()) ||
          user.userCode.toLowerCase().includes(keyword.toLowerCase())
        );
      });

      console.log("filtered users", this.filteredUsers);
    },
      async generateQRCodeImage(user) {
        console.log("usercode uu",user);
        this.selectedUser=user;
        const qrData = `"User Code":${this.selectedUser.userCode}, "Full Name": ${this.selectedUser.fullName}, "Phone Number":${this.selectedUser.phoneNumber}, "Email":${this.selectedUser.email}, "Address":${this.selectedUser.address}, "Gender":${this.selectedUser.gender}, "ID Giver Company":${'https://bannamall.com/'}`;
  
        try {
          const qrCodeImage = await QRCode.toDataURL(qrData, { errorCorrectionLevel: 'H' });
          document.getElementById('qrCodeImageContainer').innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
          document.getElementById('qrCodeImageContainer1').innerHTML = `<img src="${qrCodeImage}" alt="QR Code" />`;
       
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      },
  
      async downloadReceiptAsPDF() {
        //  await this.generateQRCodeImage();
        // Clone the printable area
        const element = document.getElementById("printable-area").cloneNode(true);
  
        // Create a temporary div to hold the content and Tailwind styles
        const wrapperDiv = document.createElement('div');
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
  