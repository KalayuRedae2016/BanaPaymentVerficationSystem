<template>
    <div>
      <Toast ref="toast" />
      <div class="p-3 border-b border-blue-800">
        <h4 class="text-indigo-800 mt-1">{{ $t("changePassword") }}</h4>
      </div>
  

      <div class="w-full mt-10 space-y-4 mb-10">
        <!-- Change Email Section -->
        <div  v-if="role==='Admin'" class="border rounded-lg p-4 shadow-sm mx-5">
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

              <p v-if="emailIsRequired" class="text-red-500">Email is required</p>
              <button
                @click.prevent="editEmail"
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

                <p v-if="oldPasswordIsRequired" class="text-red-500">Old password is required</p>
                <p v-if="newPasswordIsRequired" class="text-red-500">New password is required</p>
                <p v-if="confirmNewPasssordIsRequired" class="text-red-500">Confirm password is required</p>
                <p v-if="mismachPassword" class="text-red-500">Password Missmach Occured</p>
                  
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
  import Toast from '../Toast.vue'
  export default {
    components:{
      Toast,
    },
    data() {
      return {
        showOldPassword: false,
        showNewPassword: false,
        showConfirmNewPassword: false,
        newEmail: "",

        emailIsRequired:false,
        oldPasswordIsRequired:false,
        newPasswordIsRequired:false,
        confirmNewPasssordIsRequired:false,
        mismachPassword:false,



        showEmailForm: false,
        showPasswordForm: false,
        oldPassword: "",
        newPassword: "",
        confirmNewPasssord: "",
       
        errorMessage: "",
      };
    },
  
    computed: {
      ...mapGetters(["getToken", "getUserId","getRole"]),
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

      editEmail() {
       if(this.role=="Admin"){
        if(this.newEmail==null || this.newEmail=="") {
          this.emailIsRequired=true;
          return
        }
        const payload={
          email: this.newEmail,
        }
      this.$apiPatch("/api/v1/users", this.userId, payload)
        .then(() => {
          this.$refs.toast.showSuccessToastMessage("User updated");
        })
        .catch((error) => {
          console.log("error",error);
          this.showError=true;
          this.errorMessage="Something went wrong"
        }).finally(() => {
         console.log("error finally");
        });
      }
    },
   
  
      toggleEmailSection() {
        this.showEmailForm = !this.showEmailForm;
      },
      togglePasswordSection() {
        this.showPasswordForm = !this.showPasswordForm;
      },
  
     
  
  
      
      changePassword() {

        this.oldPasswordIsRequired=false;
        this.newPasswordIsRequired=false;
        this.confirmNewPasssordIsRequired=false;
        this.mismachPassword=false;

        if (this.oldPassword == "" ||this.oldPassword==null) {
          this.oldPasswordIsRequired=true
          return;
        }
        if (this.newPassword == "" || this.newPassword==null) {
         this.newPasswordIsRequired=true;
          return;
        }
        if (this.confirmNewPasssord == "" ||this.confirmNewPasssord==null) {
          this.confirmNewPasssordIsRequired=true;
          return;
        }
        if (this.newPassword != this.confirmNewPasssord) {
          this.mismachPassword=true;
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
            console.log("response",response);
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
  
  