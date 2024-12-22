<template>
    <div>
      <div class="p-3 border-b border-blue-800">
        <h4 class="text-indigo-800 mt-1">{{ $t("changePassword") }}</h4>
      </div>
  
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
  
      <div class="w-full mt-10 space-y-4 mb-10">
        <!-- Change Email Section -->
        <div class="border rounded-lg p-4 shadow-sm mx-5">
          <div
            class="flex justify-between items-center cursor-pointer border-b border-gray-300"
            @click="toggleEmailSection"
          >
            <h2 class="text-lg text-gray-500">Change Email</h2>
            <i
              :class="showEmailForm ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
              class="text-gray-500"
            ></i>
          </div>
          <!-- Change Email Form -->
          <div v-show="showEmailForm" class="mt-4">
            <form action="">
              <label for="email" class="custom-label"
                >New Email</label
              >
              <input
                id="email"
                type="email"
                v-model="newEmail"
                placeholder="Enter your new email"
                class="custom-input"
              />
              <button
                @click.prevent="submitEmail"
                class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update Email
              </button>
            </form>
          </div>
        </div>
  
        <!-- Change Password Section -->
        <div class="border rounded-lg p-4 shadow-sm mx-5">
          <div
            class="border-b border-gray-300 flex justify-between items-center cursor-pointer"
            @click="togglePasswordSection"
          >
            <h2 class="text-lg text-gray-500">Change Password</h2>
            <i
              :class="
                showPasswordForm ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
              "
              class="text-gray-500"
            ></i>
          </div>
          <!-- Change Password Form -->
          <div v-show="showPasswordForm" class="mt-4 space-y-4">
            <form action="">
              <div class="md-4">
                <label for="oldPassword" class="custom-label">
                  {{ $t("oldPassword") }}</label
                >
                <div class="flex flex-row">
                  <input
                   :type="showOldPassword ? 'text' : 'password'"
                    class="custom-input ml-3 text-xs text-gray-500"
                    v-model="oldPassword"
                    placeholder="Enter Old Password"
                  />
                  <button
                    @click.prevent="this.showOldPassword=!this.showOldPassword" 
                    class="text-xs my-2 ml-12 text-blue-500 underline hover:text-blue-700 focus:outline-none"
                  >
                    {{ showOldPassword ? "Hide" : "Show" }}
                  </button>
                </div>
              </div>
              <div class="md-4">
                <label for="newPassword" class="custom-label">
                  {{ $t("newPassword") }}</label
                >
                <div class="flex flex-row">
                  <input
                    :type="showNewPassword ? 'text' : 'password'"
                    class="custom-input ml-3 text-xs text-gray-500"
                    v-model="newPassword"
                    placeholder="Enter New Password"
                  />
                  <button
                    @click.prevent="this.showNewPassword=!this.showNewPassword"
                    class="text-xs my-2 ml-12 text-blue-500 underline hover:text-blue-700 focus:outline-none"
                  >
                    {{ showNewPassword ? "Hide " : "Show " }}
                  </button>
                </div>
              </div>
              <div class="md-4">
                <label for="confirmnOldPassword" class="custom-label">
                  {{ $t("confirmNewPassword") }}</label
                >
                <div class="flex flex-row">
                  <input
                    :type="showConfirmNewPassword ? 'text' : 'password'"
                    class="custom-input ml-3 text-xs text-gray-500"
                    v-model="confirmNewPasssord"
                    placeholder="Repeat Password"
                  />
                  <button
                    @click.prevent="this.showConfirmNewPassword=!this.showConfirmNewPassword"
                    class="text-xs my-2 ml-12 text-blue-500 underline hover:text-blue-700 focus:outline-none"
                  >
                    {{ showConfirmNewPassword ? "Hide " : "Show " }}
                  </button>
                </div>
              </div>
  
              <button
                @click.prevent="changePassword()"
                class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        showOldPassword: false,
        showNewPassword: false,
        showConfirmNewPassword: false,
  
        newEmail: "",
        showEmailForm: false,
        showPasswordForm: false,
        successToastMessage: "",
        errorToastMessage: "",
        showErrorToast: false,
        showSuccessToast: false,
        oldPassword: "",
        newPassword: "",
        confirmNewPasssord: "",
        showSuccess: "",
        showWarning: "",
        showError: "",
        successMessage: "",
        errorMessage: "",
        warningMessage: "",
      };
    },
  
    computed: {
      ...mapGetters(["getToken", "getUserId"]),
      userId() {
        return this.getUserId;
      },
      token() {
        return this.getToken;
      },
    },
    methods: {
      submitEmail() {
        if (this.newEmail == "") {
          this.showErrorToastMessage("New email is required");
          return;
        }
        const payload = {
          newEmail: this.newEmail,
          userId: this.userId,
        };
        this.$apiClient
          .patch("api/v1/users/changeAdminEmail", payload)
          .then((response) => {
            console.log("response");
            if (response.data.status === 1) {
              this.showSuccessToastMessage(response.data.message);
            } else {
              this.showErrorToastMessage("Something went wrong");
            }
          })
          .catch((error) => {
            console.log(error);
            this.showErrorToastMessage("Incorrect current password");
          });
      },
  
      toggleEmailSection() {
        this.showEmailForm = !this.showEmailForm;
      },
      togglePasswordSection() {
        this.showPasswordForm = !this.showPasswordForm;
      },
  
      showSuccessToastMessage(message) {
        this.successToastMessage = message;
        this.showSuccessToast = true;
        setTimeout(() => {
          this.showSuccessToast = false;
        }, 1000);
  
        // Toast will disappear after 3 seconds
      },
      showErrorToastMessage(message) {
        this.errorToastMessage = message;
        this.showErrorToast = true;
        setTimeout(() => {
          this.showErrorToast = false;
        }, 1000);
  
        // Toast will disappear after 3 seconds
      },
  
  
      showWarningToastMessage(message) {
        this.warningToastMessage = message;
        this.showWarningToast = true;
        setTimeout(() => {
          this.showWarningToast = false;
        }, 1000);
        // Toast will disappear after 3 seconds
      },
  
  
  
      
      changePassword() {
        if (this.oldPassword == "") {
          this.showErrorToastMessage("Old password is required");
          return;
        }
        if (this.newPassword == "") {
          this.showErrorToastMessage("New password is required");
          return;
        }
        if (this.confirmNewPasssord == "") {
          this.showErrorToastMessage("Repeat New password is required");
          return;
        }
        if (this.newPassword != this.confirmNewPasssord) {
          this.showErrorToastMessage(
            " Confirm New Password must be the same with new password"
          );
          return;
        }
  
        const payload = {
          currentPassword: this.oldPassword,
          newPassword: this.newPassword,
          userId: this.userId,
        };
  
        this.$apiClient
          .patch("api/v1/users/updatePassword", payload)
          .then((response) => {
            console.log("response");
            if (response.data.status === 1) {
              this.showSuccessToastMessage(response.data.message);
            } else {
              this.showErrorToastMessage("Something went wrong");
            }
          })
          .catch((error) => {
            console.log(error);
            this.showErrorToastMessage("Incorrect current password");
          });
      },
    },
  };
  </script>
  
  