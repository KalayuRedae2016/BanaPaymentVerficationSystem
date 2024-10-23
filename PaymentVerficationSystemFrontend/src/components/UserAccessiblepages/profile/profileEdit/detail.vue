<template>
  <div v-if="showModal">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="flex flex-row">
            <div>Edit User Detail</div>
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

          <hr class="my-4 md:min-w-full bg-red-500" />

          <div class="">
            <form class="px-5 py-5">
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
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  First Name
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localFirstName"
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-sm"
                >
                  Middle Name
                  <span class="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localMiddleName"
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Last Name
                  <span class="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  id="closeAmount"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localLastName"
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Date Of Birth፡
                  <span class="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="date"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localDateOfBirth"
                />
              </div>
              <button
                @click="editDetail()"
                type="submit"
                class="bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <i class="fas fa-save"
                  ><span class="text-md ml-3">Save</span></i
                >
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
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
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
                <h2 class="text-md font-bold text-gray-800">Success!</h2>
              </div>
              <p class="text-gray-600 text-md">
                User Detail Edited successfully
              </p>
              <button
                @click="pushToItSelf()"
                class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                OK
              </button>
            </div>
          </div>
          <hr class="my-4 md:min-w-full bg-red-500" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzI3NjY0MjU2Zjg4YWI5ZTI0ZTI5NiIsImlhdCI6MTcxNTI4MDE0NywiZXhwIjoxNzE1Mjk4MTQ3fQ.Z0B82rQqEj3gkgZ4geKq-AUcmKJjeurw3aqeR4yxJFM",
      editingSuccess: false,
      showModal: true,
      localFirstName: "",
      localMiddleName: "",
      localLastName: "",
      localDateOfBirth: "",
      localBankAccount: "",
      localStatus: "",
      localClientId: "",
      localImageData: "",
      imageFile: "",

      name: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      date: "4/6/2024",
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
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    bankAccount: {
      type: String,
      //required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },

  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
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
    if (this.localDateOfBirth !== null) {
      this.date = this.localDateOfBirth;
    }
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
      this.$router.push(`/userdashboard/empty/${this.localClientId}`);
    },
    editDetail() {
      //this.editingSuccess = true;
      this.showModal = false;

      this.name.firstName = this.localFirstName;
      this.name.middleName = this.localMiddleName;
      this.name.lastName = this.localLastName;
      console.log("the passed id is", this.localClientId);

      const formData = new FormData();
      if (this.imageFile && this.imageFile !== null && this.imageFile !== "") {
        formData.append("profileImage", this.imageFile);
      }
      formData.append("name.firstName", this.name.firstName);
      formData.append("name.middleName", this.name.middleName);
      formData.append("name.lastName", this.name.lastName);
      formData.append("dateOfBirth", this.localDateOfBirth);

      // formData.append("bankAccount", this.bankAccount);

      console.log("formdata", formData);
      // console.log("date",this.localDateOfBirth);
      // console.log("userdetail",userDetail);

      this.apiClient
        .patch(`/api/v1/users/updateMe/${this.localClientId}`, formData, {
          headers: {
            authorization: this.token,
          },
        })
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
    closeEditSuccess() {
      this.editingSuccess = false;
      this.$router.push("/userdashboard/profile");
    },
  },
};
</script>
