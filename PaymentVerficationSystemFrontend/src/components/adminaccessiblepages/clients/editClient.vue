<template>
  <div>
    <div>
      <!-- Import and Use LoadingIndicator -->

      <Toast ref="toast" />
      <ReloadPage :visible="pageReload" :message="errorMessage" />
      <LoadingSpinner :visible="isLoading" />
      <CommonSmoozer ref="smoother" />
    </div>
    <div v-if="showCurrentPage">
      <div class="border-b border-blue-500">
        <p class="text-blue-800 font-bold px-4 pb-4 pt-3">
          {{ $t("Edit Client Profile") }}
        </p>
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
            class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-80"
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
              <div>
                <form>
                  <div style="height: 350px" class="scroll-y">
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
                        <p class="text-sm text-gray-500 mt-2">
                          JPG, PNG, or GIF
                        </p>
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
                        class="custom-label"
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
                        class="custom-label"
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
                        class="custom-label"
                      >
                        Gender
                        <span class="text-red-500 ml-1">*</span>
                      </label>

                      <select
                        class="custom-select"
                        style="padding-left: 16px"
                        v-model="clientProfile.gender"
                      >
                        <option value="" disabled selected>
                          Select gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div class="mb-4">
                      <label
                        class="custom-label"
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
                        class="custom-label"
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
                        class="custom-label"
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
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "../../Common/LoadingSpinner.vue";
import Toast from "../../Common/Toast.vue";
import ReloadPage from "../../Common/reloadPage.vue";
import CommonSmoozer from "../../Common/commonSmoozer.vue";

export default {
  components: {
    Toast,
    LoadingSpinner,
    ReloadPage,
    CommonSmoozer
  },
  data() {
    return {
      smoozeReload:false,
      showCurrentPage: false,
      pageReload: false,
      isLoading: false,
      data: null,
      errorMessage: "",
      showEditModal: false,
      imageData: "",
      imageFile: "",
      clientId: "",
      clientProfile: {},
    };
  },

  mounted() {
    this.isLoading = true;
    this.pageReload = false; // Start with the page not being reloaded

    this.clientId = this.$route.params.clientId;
    console.log("client id: ", this.clientId);

    this.$apiGetById("/api/v1/users", this.clientId)
      .then((response) => {
        console.log("response in the edit client mounted: ", response);
        // this.$refs.toast.showSuccessToastMessage(response.message);
        this.clientProfile = response.clientProfile;
        this.imageData = "data:image/jpeg;base64," + response.imageData;
        this.showCurrentPage = true; // Page is successfully loaded
      })
      .catch((error) => {
        this.errorMessage = error.message;
        this.pageReload = true; // Set page reload flag
        console.log("error catch: ", error.message);
      })
      .finally(() => {
        if (this.showCurrentPage) {
          console.log("finally true");
          // If the page has been loaded successfully
          this.isLoading = false;
          this.pageReload = false; // Hide the reload page
        } else {
          console.log("finally false");
          // If no response, show the reload page
          this.isLoading = false;
         // this.smoozeReload=true;
          this.pageReload = true;
          this.errorMessage = "Something went wrong, please try again."; // Generic error message
        }
       // console.log("finally");
      });
  },

  methods: {
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

      this.$apiPatch("/api/v1/users", this.clientProfile._id, formData)
        .then(() => {
          this.$refs.toast.showSuccessToastMessage("User updated");
          this.showCurrentPage = true;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.pageReload = true; // Set page reload flag
          console.log("error catch: ", error.message);
        }).finally(() => {
          if (this.showCurrentPage) {
            // If the page has been loaded successfully

            this.isLoading = false;
            this.pageReload = false; // Hide the reload page
            this.$refs.smoother.startSmoothReload();
            console.log("finally true");
          } else {
            console.log("finally false");
            // If no response, show the reload page
            this.isLoading = false;
            this.pageReload = true;
            this.errorMessage = "Something went wrong, please try again."; // Generic error message
          }
        
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