<template>
  <div class="pb-20 shadow-lg">
    <div class="border-b border-blue-500">
      <p class="text-blue-800 font-bold px-4 pb-4 pt-3">Edit Client Profile</p>
    </div>
    <div class="">
      <div class="mb-16">
        <div class="">
          <div
            class="flex flex-col space-x-12 lg:space-x-0 lg:flex-row bg-white rounded-lg p-4 mt-10 w-full sm:w-auto"
          >
            <div class="w-full lg:w-1/4 flex justify-center">
              <img
                :src="imageData"
                alt="User Profile Image"
                class="w-32 h-32 border border-gray-200 p-3 rounded-full"
              />
            </div>

            <div class="w-full lg:w-2/3 mt-16 lg:mt-0">
              <div class="w-full flex flex row mb-2 text-xs text-gray-600">
                <strong class="w-1/2">{{ $t("Usercode") }} </strong>
                <span class="w-1/2"> {{ clientProfile.userCode }}</span>
              </div>

              <div class="flex flex-row mb-2 text-xs text-gray-600">
                <strong class="w-1/2">{{ $t("firstName") }} :</strong>
                <span class="w-1/2 ml-3 text-xs">
                  {{ clientProfile.firstName }}</span
                >
              </div>

              <div class="flex flex-row mb-2 text-xs text-gray-600">
                <strong class="w-1/2">Middle Name :</strong>
                <span class="w-1/2 ml-3 text-xs">
                  {{ clientProfile.middleName }}</span
                >
              </div>
              <div class="flex flex-row mb-2 text-xs text-gray-600">
                <strong class="w-1/2">Last Name :</strong>
                <span class="w-1/2 ml-3 text-xs">
                  {{ clientProfile.lastName }}</span
                >
              </div>

              <div class="flex flex-row mb-2 text-xs text-gray-600">
                <strong class="w-1/2">Gender :</strong>
                <span class="w-1/2 ml-3 text-xs">
                  {{ clientProfile.gender }}</span
                >
              </div>

              <div class="flex flex-row mb-2 text-xs text-gray-600">
                <strong class="w-1/2">Age :</strong>
                <span class="w-1/2 ml-3 text-xs"> {{ clientProfile.age }}</span>
              </div>

              <div class="flex flex-row mb-2 text-xs text-gray-600">
                <strong class="w-1/2">Address :</strong>
                <span class="w-1/2 ml-3 text-xs">
                  {{ clientProfile.address }}</span
                >
              </div>

              <div class="flex flex-row mb-2 text-xs text-gray-600">
                <strong class="w-1/2">Email :</strong>
                <span class="w-1/2 ml-3 text-xs">
                  {{ clientProfile.email }}</span
                >
              </div>

              <div class="flex flex-row mb-2 text-xs text-gray-600">
                <strong class="w-1/2">Phone Number :</strong>
                <span class="w-1/2 ml-3 text-xs">
                  {{ clientProfile.phoneNumber }}</span
                >
              </div>
            </div>
            <div class="1/4">
              <button
                @click="showEditModal = true"
                class="text-xs mt-3 h-10 text-indigo-500 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <i class="fas fa-edit mr-2"></i>Edit
              </button>
            </div>
          </div>
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
            <div class="scroll-y" style="height: 400px">
              <form>
                <div class="flex flex-col lg:flex-row">
                  <img
                    :src="imageData"
                    alt="User Profile Image"
                    class="w-32 h-32 rounded-full"
                  />
                  <input
                    class="mb-5 ml-3 mt-5 lg:mt-16"
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="handleImageInput"
                  />
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
                  <h2 class="text-xs text-green-800">Success!</h2>
                </div>
                <p class="text-blue-800 text-xs ml-8">
                  {{ successMessage }}
                </p>
                <button
                  @click="showSuccess = false"
                  class="ml-8 mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  <h2 class="text-sm font-bold text-gray-800">Error!</h2>
                </div>
                <p class="text-gray-600 text-sm">
                  {{ errorMessage }}
                </p>
                <button
                  @click="showError = false"
                  class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  OK
                </button>
              </div>
            </div>
            <hr class="my-4 bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
    
    <script>
import detail from "./profileEdit/detail.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    detail,
  },
  data() {
    return {
      showSuccess: false,
      showError: false,
      errorMessage: "",
      successMessage: "",

      showEditModal: false,
      displayDetail: false,
      imageData: "",
      imageFile: "",
      clientId: "",

      clientProfile: {
        firstName: "Tadesse",
        middleName: "Gebremicheal",
        lastName: "Berhe",
        age: "27",
        gender: "male",
        address: "mekelle",
        email: "tadiosgb26@gmail.com",
        phoneNumber: "0967740501",
        userCode: "BM0001",
        imageData: "",
        _id: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getToken", "getUserId", "getLocale", "getName"]),
    userId() {
      return this.getUserId;
    },
    token() {
      return this.getToken;
    },

    locale() {
      this.$i18n.locale = this.getLocale;
      return this.getLocale;
    },
    name() {
      return this.getName;
    },
  },
  mounted() {
    this.clientId = this.userId;

    console.log("client Id", this.clientId);

    this.$apiClient
      .get(`/api/v1/users/${this.clientId}`)
      .then((response) => {
        console.log("Response client profile", response);

        this.clientProfile = response.data.clientProfile;
        this.imageData = "data:image/jpeg;base64," + response.data.imageData;
      })
      .catch((error) => {
        console.error("Error fetching client datakk:", error);
      });
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
      this.$apiClient
        .patch(`/api/v1/users/${this.clientProfile._id}`, formData)
        .then((response) => {
          console.log("response from the update: " ,response);
          if (response.data.status === 1) {
            this.clientProfile =response.data.updatedUser;
            this.imageData = "data:image/jpeg;base64," + this.imageFile;
            this.showSuccess = true;
            this.successMessage = response.data.message;
            
          }
        })
        .catch((error) => {
          console.log("error in the updating", error);
          this.showError = true;
          this.errorMessage = error.response.data.message;
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