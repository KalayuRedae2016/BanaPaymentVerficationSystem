<template>
  <div>
    <div>
      <!-- Import and Use LoadingIndicator -->
      <LoadingIndicator :visible="isLoading" />
    </div>
    <div v-if="!isLoading">
      <div class="border-b border-blue-500">
        <p class="text-blue-800 font-bold px-4 pb-4 pt-3">
          {{ $t("Edit Client Profile") }}
        </p>
      </div>
      <div></div>
      <transition
        enter-active-class="transform transition duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transform transition duration-300 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div
          v-if="showSuccessToast"
          class="z-20 fixed right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          role="alert"
        >
          <strong class="font-bold">Success!</strong>
          <span class="block sm:inline">{{ succesToastMessage }}</span>
        </div>
      </transition>

      <transition
        enter-active-class="transform transition duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transform transition duration-300 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div
          v-if="showErrorToast"
          class="z-20 fixed right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
          role="alert"
        >
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{ errorToastMessage }}</span>
        </div>
      </transition>

      <div
        v-if="formEmptyEditProfilemmm"
        class="mx-10 mt-5 bg-blue-100 border border-green-400 text-blue-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline">User profile edited successfully.</span>
        <button
          type="button"
          class="absolute top-0 bottom-0 right-0 px-4 py-3"
          aria-label="Close"
          onclick="this.parentElement.style.display='none'"
        >
          <svg
            class="fill-current h-6 w-6 text-green-700"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 10-.707.707L9.293 10l-3.64 3.641a.5.5 0 00.707.707L10 10.707l3.641 3.64a.5.5 0 00.707-.707L10.707 10l3.641-3.641a.5.5 0 000-.707z"
            />
          </svg>
        </button>
      </div>

      <div class="text-sm mx-0 lg:mx-5 mt-5 mb-5">
        <div
          class="flex flex-col md:flex-row space-x-0 space-y-4 lg:space-y-0 border-t border-gray-300 shadow-lg"
        >
          <div class="m-4 w-full h-full md:w-1/4 h-64 bg-gray-500">
            <img
              :src="imageData"
              alt="User Profile Image"
              class="h-64 w-full lg:w-64 lg:w-96"
            />
          </div>

          <div class="mt-3 mx-auto lg:w-2/3">
            <div class="bg-white p-2 rounded-md shadow-sm mt-3">
              <div class="flex items-center space-x-3 border-b border-gray-300">
                <i class="fas fa-id-badge text-green-500"></i>

                <span class="text-sm text-gray-800"
                  >{{ $t("User Code") }}:{{ clientProfile.userCode }}</span
                >
              </div>
            </div>

            <div class="bg-white p-2 rounded-md shadow-sm">
              <div class="flex items-center space-x-3 border-b border-gray-300">
                <i class="fas fa-user text-yellow-500"></i>

                <span class="text-sm text-gray-800"
                  >Full Name : {{ clientProfile.fullName }}</span
                >
              </div>
            </div>

            <div class="bg-white p-2 rounded-md shadow-sm mt-3">
              <div class="flex items-center space-x-3 border-b border-gray-300">
                <i class="fas fa-calendar-alt text-green-500"></i>

                <span class="text-sm text-gray-800"
                  >{{ $t("Age") }}:{{ clientProfile.age }}</span
                >
              </div>
            </div>

            <div class="bg-white p-2 rounded-md shadow-sm">
              <div class="flex items-center space-x-3 border-b border-gray-300">
                <i class="fas fa-venus-mars text-indigo-500"></i>

                <span class="text-sm text-gray-800"
                  >{{ $t("Gender") }}:{{ clientProfile.gender }}</span
                >
              </div>
            </div>

            <div class="bg-white p-2 rounded-md shadow-sm">
              <div class="flex items-center space-x-3 border-b border-gray-300">
                <i class="fas fa-map-marker-alt text-blue-500"></i>

                <span class="text-sm text-gray-800"
                  >{{ $t("Address") }}:{{ clientProfile.address }}</span
                >
              </div>
            </div>

            <div class="bg-white p-2 rounded-md shadow-sm">
              <div class="flex items-center space-x-3 border-b border-gray-300">
                <i class="fas fa-phone text-purple-500"></i>

                <span class="text-sm text-gray-800"
                  >{{ $t("phoneNumber") }}:{{ clientProfile.phoneNumber }}</span
                >
              </div>
            </div>

            <div class="bg-white p-2 rounded-md shadow-sm">
              <div class="flex items-center space-x-3 border-b border-gray-300">
                <i class="fas fa-envelope text-green-500"></i>

                <span class="text-sm text-gray-800"
                  >{{ $t("Email") }}:{{ clientProfile.email }}</span
                >
              </div>
            </div>

            <button
              @click="showEditModal = true"
              class="border border-gray-200 mt-5 mb-5 p-2 rounded-lg hover:bg-blue-50 ml-2 text-blue-500"
            >
              <i class="fas fa-edit mr-2"></i>Edit
            </button>
          </div>
        </div>
      </div>

      <div v-if="showEditModal" style="height: 400px">
        <transition name="fade" mode="out-in">
          <div
            class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
          >
            <div class="bg-white rounded-lg p-6 border border-cyan-500">
              <div class="flex justify-between items-center">
                <div>Edit User Profile</div>
                <div>
                  <svg
                    @click="showEditModal = !showEditModal"
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
              <div >
                <form>

                  <div style="height: 350px" class="scroll-y" >
                  <div 
                    class="flex flex-col lg:flex-row items-center gap-6 p-4 border border-blue-300 rounded-lg"
                  >
                    <!-- Image Container -->
                    <div class="relative w-32 h-32">
                      <img
                        :src="imageData || 'https://via.placeholder.com/128'"
                        alt="User Profile Image"
                        class="w-full h-full rounded-lg border-4 border-gray-300 object-cover shadow-md"
                      />
                      <!-- Overlay Icon on Hover -->
                      <div
                        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition duration-300"
                      >
                        <i class="fas fa-camera text-white text-3xl"></i>
                      </div>
                    </div>

                    <!-- Custom File Input -->
                    <div class="relative">
                      <label
                        for="fileInput"
                        class="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
                      >
                        <i class="fas fa-upload mr-2"></i>Choose Image
                      </label>
                      <input
                        id="fileInput"
                        type="file"
                        ref="fileInput"
                        accept="image/*"
                        @change="handleImageInput"
                        class="hidden"
                      />
                      <p class="text-sm text-gray-500 mt-2">JPG, PNG, or GIF</p>
                    </div>
                  </div>

                  <div class="mb-4 mt-10">
                    <label class="custom-label">
                      {{ $t("firstName") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      class="custom-input"
                      v-model="clientProfile.firstName"
                      :placeholder="$t('firstName')"
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                    >
                      {{ $t("middleName") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      class="custom-input"
                      v-model="clientProfile.middleName"
                      :placeholder="$t('middleName')"
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                    >
                      {{ $t("lastName") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="closeAmount"
                      class="custom-input"
                      v-model="clientProfile.lastName"
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
                      style="padding-left: 16px"
                      v-model="clientProfile.gender"
                    >
                      <option value="" disabled selected>Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div class="mb-4">
                    <label
                      class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                    >
                      {{ $t("age") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      id="closeAmount"
                      class="custom-input"
                      v-model="clientProfile.age"
                      :placeholder="$t('age')"
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                    >
                      {{ $t("email") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="closeAmount"
                      class="custom-input"
                      v-model="clientProfile.email"
                      :placeholder="$t('email')"
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                    >
                      {{ $t("phoneNumber") }}
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="closeAmount"
                      class="custom-input"
                      v-model="clientProfile.phoneNumber"
                      :placeholder="$t('phoneNumber')"
                    />
                  </div>
                </div>
                  <button
                    @click.prevent="editDetail()"
                    type="submit"
                    class="bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <i class="fas fa-save"
                      ><span class="text-xs ml-3">{{ $t("save") }}</span></i
                    >
                  </button>
                </form>
              </div>

              <hr class="my-4 md:min-w-full bg-red-500" />
            </div>
          </div>
        </transition>
      </div>

      <div v-if="showSuccess">
        <transition name="fade" mode="out-in">
          <div
            class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
          >
            <!-- Modal Content -->
            <div class="bg-white rounded-lg p-6 border border-cyan-500">
              <div class="fixed inset-0 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                  <div class="flex items-center mb-4 ml-32">
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
                    <h2 class="text-xs text-green-800">{{ $t("success") }}!</h2>
                  </div>
                  <p class="text-blue-800 text-xs ml-8">
                    {{ successMessage }}
                  </p>
                  <button
                    @click="showSuccess = false"
                    class="ml-8 mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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

      <div v-if="showError">
        <transition name="fade" mode="out-in">
          <div
            class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
          >
            <!-- Modal Content -->
            <div class="bg-white rounded-lg p-6 border border-red-500">
              <div class="fixed inset-0 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                  <div class="flex items-center justify-center mb-4">
                    <svg
                      class="w-8 h-8 text-red-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    <h2 class="text-sm font-bold text-gray-800">
                      {{ $t("error") }}!
                    </h2>
                  </div>
                  <p class="text-gray-600 text-sm">
                    {{ errorMessage }}
                  </p>
                  <button
                    @click="showError = false"
                    class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {{ $t("ok") }}
                  </button>
                </div>
              </div>
              <hr class="my-4 bg-red-500" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import detail from "./profileEdit/detail.vue";
import LoadingIndicator from "../../Common/LoadingSpinner.vue";

export default {
  components: {
    detail,
    LoadingIndicator,
  },
  data() {
    return {
      isLoading: false,
      data: null,
      showSuccessToast: false,
      showErrorToast: false,
      succesToastMessage: "",
      errorToastMessage: "",

      formEmptyEditProfile: false,
      showSuccess: false,
      showError: false,
      errorMessage: "",
      successMessage: "",

      showEditModal: false,
      displayDetail: false,
      imageData: "",
      imageFile: "",
      clientId: "",

      clientProfile: {},
    };
  },

  mounted() {
    this.loadingLoader();
    this.clientId = this.$route.params.clientId;
    this.$apiClient
      .get(`/api/v1/users/${this.clientId}`)
      .then((response) => {
        this.isLoading = false;
        console.log("Response client profile", response);
        this.clientProfile = response.data.clientProfile;
        this.imageData = "data:image/jpeg;base64," + response.data.imageData;
      })
      .catch((error) => {
        console.error("Error fetching client datakk:", error);
      });
    // this.loadingLoader()
  },
  methods: {
    async loadingLoader() {
      this.isLoading = true; // Show loading
      try {
        // Simulating a fetch call
        // setTimeout(() => {
        //   this.data = "Sample Data from Server";
        //   this.isLoading = false; // Hide loading
        // }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
        this.isLoading = false; // Hide loading on error
      }
    },
    reloadPage() {
      window.location.reload();
    },
    showSuccessToastMessage(message) {
      this.succesToastMessage = message;
      this.showSuccessToast = true;
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 1000);
    },

    showErrorToastMessage(message) {
      this.errorToastMessage = message;
      this.showErrorToast = true;
      setTimeout(() => {
        this.showErrorToast = false;
      }, 1000);
    },
    handleImageInput() {
      const fileInput = this.$refs.fileInput;
      console.log("fileInput", fileInput);
      if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        this.imageFile = file;
        // Rest of your code to handle the file
      }
    },
    editDetail() {
      //alert("mmm");
      this.showEditModal = false;
      const formData = new FormData();
      if (this.imageFile && this.imageFile !== null && this.imageFile !== "") {
        formData.append("profileImage", this.imageFile);
      }
      formData.append("firstName", this.clientProfile.firstName);
      formData.append("middleName", this.clientProfile.middleName);
      formData.append("lastName", this.clientProfile.lastName);
      formData.append("age", this.clientProfile.age);
      formData.append("address", this.clientProfile.address);
      formData.append("email", this.clientProfile.email);
      formData.append("phoneNumber", this.clientProfile.phoneNumber);
      formData.append("gender", this.clientProfile.gender);

      console.log("client id", this.clientProfile._id);
      this.isLoading = true;
      this.$apiClient
        .patch(`/api/v1/users/${this.clientProfile._id}`, formData)
        .then((response) => {
          console.log("response of client finder", response);
          if (response.data.status === 1) {
            console.log("response.data is 1");
            this.isLoading = false;
            this.showSuccessToastMessage("User edited");
            this.reloadPage();
          }
        })
        .catch((error) => {
          console.log("error in the updating", error);
          this.showErrorToastMessage("Something went wrong");
        });
    },
  },
};
</script>
<style>
.custom-paragraph {
  @apply text-blue-700 text-sm font-bold mt-5 mb-5;
}
.loader {
  --d: 15px;
  width: 2px;
  height: 2px;
  border-radius: 25%;
  color: #687762;
  box-shadow: calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
    calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
    calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
    calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px;
  animation: l27 1s infinite steps(8);
}
</style>