<template>
  <div>
    <Toast ref="toast" />
    <div class="p-3 border-b border-blue-800">
      <h4 class="text-indigo-800 mt-1">{{ $t("changePassword") }}</h4>
    </div>

    <div class="w-full lg:w-3/4 lg:mx-auto mt-10 space-y-4 mb-10">
      <!-- Change Password Section -->
      <div class="mx-5">
        <div class="mt-4  py-4 ml-0 lg:ml-10">
          <form action="flex flex-col">
            <div class="flex flex-col lg:flex-row mb-4" v-if="role=='Admin'">
              <label for="" class="custom-label w-full lg:w-1/3 mt-3"
                >New Email</label
              >
              <div class="w-full flex flex-col">
                <input
                  type="email"
                  class="w-full custom-input ml-3 text-xs text-gray-500"
                  v-model="newEmail"
                />

                <p
                  v-if="newEmailIsRequired"
                  class="text-red-500 text-xs ml-3 mt-2"
                >
                  NewEmail is required
                </p>
              </div>
            </div>

            <div class="mb-4">
              <div class="flex flex-col lg:flex-row">
                <label for="" class="custom-label w-full lg:w-1/3 mt-3"
                  >Old Password</label
                >
                <div class="flex flex-col w-full">
                  <input
                    :type="showOldPassword ? 'text' : 'password'"
                    class="custom-input ml-3 text-xs text-gray-500"
                    v-model="oldPassword"
                  />
                  <p
                    v-if="oldPasswordIsRequired"
                    class="text-red-500 ml-3 text-xs"
                  >
                    Old password is required
                  </p>
                </div>
              </div>
            </div>


            <div class="mb-4">
              <div class="flex flex-col lg:flex-row">
                <label for="" class="custom-label w-full lg:w-1/3 mt-3"
                  >New Password</label
                >
                <div class="w-full flex flex-col">
                  <input
                    type="password"
                    class="custom-input ml-3 text-xs text-gray-500"
                    v-model="newPassword"
                  />
                  <p
                    v-if="newPasswordIsRequired"
                    class="text-red-500 text-xs ml-3"
                  >
                    New password is required
                  </p>
                </div>
              </div>
            </div>


            <div class="mb-4">
              <div class="flex flex-col lg:flex-row">
                <label for="" class="custom-label w-full lg:w-1/3"
                  >Confirm Password</label
                >
                <div class="flex flex-col w-full ml-4 ">
                  <input
                    type="password"
                    class="custom-input text-xs text-gray-500 "
                    v-model="confirmNewPasssord"
                  />
                  <p
                    v-if="confirmNewPasssordIsRequired"
                    class="text-red-500 ml-3 text-xs"
                  >
                    Confirm password is required
                  </p>

                  <p
                    v-if="mismachPassword"
                    class="text-red-500 text-red-500 text-xs ml-3"
                  >
                    Password Missmach Occured
                  </p>

                  <button
                    @click.prevent="changeSetting()"
                    class="custom-button w-1/4 mt-5 "
                  >
                    <i class="fas fa-eye-slash custom-icon"></i>
                    Update
                  </button>
                </div>
              </div>
            </div>
         
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
import Toast from "../Toast.vue";
export default {
  components: {
    Toast,
  },
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      showConfirmNewPassword: false,
      newEmail: "",

      newEmailIsRequired: false,
      oldPasswordIsRequired: false,
      newPasswordIsRequired: false,
      confirmNewPasssordIsRequired: false,
      mismachPassword: false,

      showEmailForm: false,
      showPasswordForm: false,
      oldPassword: "",
      newPassword: "",
      confirmNewPasssord: "",

      errorMessage: "",
    };
  },

  computed: {
    ...mapGetters(["getToken", "getUserId", "getRole"]),
    userId() {
      return this.getUserId;
    },
    token() {
      return this.getToken;
    },
    role() {
      return this.getRole;
    },
  },

  methods: {
    toggleEmailSection() {
      this.showEmailForm = !this.showEmailForm;
    },
    togglePasswordSection() {
      this.showPasswordForm = !this.showPasswordForm;
    },

    changeSetting() {
      this.oldPasswordIsRequired = false;
      this.newPasswordIsRequired = false;
      this.confirmNewPasssordIsRequired = false;
      this.mismachPassword = false;
      this.newEmailIsRequired = false;
    if(this.role==='Admin'){
      if (this.newEmail == null || this.newEmail == "") {
        this.newEmailIsRequired = true;
        return;
      }

    }


      if (this.oldPassword == "" || this.oldPassword == null) {
        this.oldPasswordIsRequired = true;
        return;
      }
      if (this.newPassword == "" || this.newPassword == null) {
        this.newPasswordIsRequired = true;
        return;
      }
      if (this.confirmNewPasssord == "" || this.confirmNewPasssord == null) {
        this.confirmNewPasssordIsRequired = true;
        return;
      }
      if (this.newPassword != this.confirmNewPasssord) {
        this.mismachPassword = true;
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
          console.log("response", response);
          if (response.data.status === 1) {
            this.$refs.toast.showSuccessToastMessage(response.data.message);
          } else {
            //this.$refs.toast.showErrorToastMessage("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
          //this.showErrorToastMessage("Incorrect current password");
        });
    },
  },
};
</script>
  
  