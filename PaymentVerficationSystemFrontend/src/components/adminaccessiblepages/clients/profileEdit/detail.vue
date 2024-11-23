<template>
  <div>
    <div v-if="showModal">
    <transition name="fade" mode="out-in">
      <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="flex flex-row">
            <div>{{ $t("editUserDetail") }}</div>
            <div class="ml-64">
              <svg
                @click="showModal = !showModal"
                class="w-6 h-6 text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer"
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

          <hr class="my-4 md:bg-red-500" />
          <div class="scroll-y" style="height: 500px;">
            <form>
              <div class="flex flex-row">
                <img
                  :src="localImageData"
                  alt="User Profile Image"
                  class="w-32 h-32"
                />
                <input
                  class="ml-3 mt-16"
                  type="file"
                  ref="fileInput"
                  accept="image/*"
                  @change="handleImageInput"
                />
              </div>

              <div class="mb-4">
                <label class="custom-label">
                  {{ $t("firstName") }}
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  class="custom-input"
                  v-model="localFirstName"
                  :placeholder="$t('firstName')"
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg">
                  {{ $t("middleName") }}
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  class="custom-input"
                  v-model="localMiddleName"
                  :placeholder="$t('middleName')"
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg">
                  {{ $t("lastName") }}
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="closeAmount"
                  class="custom-input"
                  v-model="localLastName"
                  :placeholder="$t('lastName')"
                />
              </div>
              
              <div class="w-full">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Gender
                  <span class="text-red-500 ml-1">*</span>
                </label>

                <select
                  class="mb-3 border border-indigo-800 w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base h-12"
                  required
                  style="padding-left: 16px"
                  v-model="localGender"
                >
                  <option value="" disabled selected>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
             
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg">
                  {{ $t("age") }}
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  id="closeAmount"
                  class="custom-input"
                  v-model="localAge"
                  :placeholder="$t('age')"
                />
              </div>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg">
                  {{ $t("email") }}
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="closeAmount"
                  class="custom-input"
                  v-model="localEmail"
                  :placeholder="$t('email')"
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg">
                  {{ $t("phoneNumber") }}
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="closeAmount"
                  class="custom-input"
                  v-model="localPhoneNumber"
                  :placeholder="$t('phoneNumber')"
                />
              </div>

              <button
                @click="editDetail()"
                type="submit"
                class="bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <i class="fas fa-save"><span class="text-md ml-3">{{ $t("save") }}</span></i>
              </button>
              
            </form>
          </div>

          <hr class="my-4 md:min-w-full bg-red-500" />
        </div>
      </div>
    </transition>
  </div>

  <div v-if="editingSuccess">
    <transition name="fade" mode="out-in">
      <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96">
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
                <h2 class="text-2xl font-bold text-gray-800">{{ $t("success") }}</h2>
              </div>
              <p class="text-gray-600 text-2xl">
                {{ $t("userDetailEdited") }}
              </p>
              <button
                @click="pushToItSelf()"
                class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {{ $t("ok") }}
              </button>
            </div>
          </div>
          <hr class="my-4 md:min-w-full bg-red-500" />
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      editingSuccess: false,
      showModal: true,
      localFirstName: "kk",
      localMiddleName: "hh",
      localLastName: "gg",
      localDateOfBirth: "",
      localBankAccount: "",
      localStatus: "",
      localClientId: "",
      localImageData: "",
      imageFile: "",
      localAge:"",
      localAddress:"",
      localEmail:"",
      localPhoneNumber:"",
      localGender:"",

    };
  },
  props: {
    clientId: {
      type: String,
    },
    imageData: {
      type: String,
      //required: true
    },
    firstName: {
      type: String,
     
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    age: {
    
      
    },
    gender: {
      type: String,
     
    },
    address: {},
    email: {},
    phoneNumber: {},

    status: {
      type: String,
      required: true,
    },
  },

  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081",
    });
  },

  mounted() {
    this.localFirstName = this.firstName;
    this.localMiddleName = this.middleName;
    this.localLastName = this.lastName;
    this.localDateOfBirth = this.dateOfBirth;
    this.localBankAccount = this.bankAccount;
    this.localStatus = this.status;
    this.localClientId = this.clientId;
    this.localImageData = this.imageData;
    this.localAge=this.age;
    this.localEmail=this.email;
    this.localPhoneNumber=this.phoneNumber;
    this.localAddress=this.address;
    this.localGender=this.gender;

    console.log("clientId", this.localClientId);
  },

  methods: {
    handleImageInput() {
      const fileInput = this.$refs.fileInput;
      console.log("fileInput", fileInput);
      if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        this.imageFile = file;
        // Rest of your code to handle the file
      }
    },
    pushToItSelf() {
      // alert("putitself")
      this.editingSuccess = false;
      // Navigate to a temporary route
      this.$router.push(`/admindashboard/empty/${this.localClientId}`);
    },
    editDetail() {
      //this.editingSuccess = true;
      this.showModal = false;
  
      console.log("the passed id is", this.localClientId);

      const formData = new FormData();

      console.log("image file is", this.imageFile);
      console.log("the local image is ", this.localImageData);

      if (this.imageFile && this.imageFile !== null && this.imageFile !== "") {
        formData.append("profileImage", this.imageFile);
      }
         //console.log("data",this.localFirstName,this.middleName,this.lastName,this.age,this.address,this.email,this.phoneNumber,this.gender); 
      formData.append("firstName", this.localFirstName);
      formData.append("middleName", this.localMiddleName);
      formData.append("lastName", this.localLastName);
      formData.append("age", this.localAge);
      formData.append("address", this.localAddress);
      formData.append("email", this.localEmail);
      formData.append("phoneNumber", this.localPhoneNumber);
      formData.append("gender", this.localGender);
      console.log("formdata", formData);
      this.$apiClient
        .patch(`/api/v1/users/${this.localClientId}`, formData)
        .then((response) => {
          this.editingSuccess = true;
          console.log("Response", response);
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
        });
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
<style>
.scroll-y {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #a0aec0 #f7fafc;
}
</style>