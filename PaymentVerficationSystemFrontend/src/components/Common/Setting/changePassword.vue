<template>
  <div>



    <Toast ref="toast" />
    <div class="p-3 border-b border-blue-300">
      <h4 class="text-blue-500 mt-1">{{ $t("Profile Setting") }}</h4>
    </div>
    <div class="w-full   mt-10  mb-10">
    <!-- Change Email Section -->
    <div class="mx-5" v-if="role==='Admin' || role==='SuperAdmin'">
      <div class="mt-4 py-4 ml-0  border-t border-gray-100 rounded-lg shadow-md">
        <div
          class="flex justify-between items-center cursor-pointer p-4 border-b border-gray-300 text-blue-80"
       
        >
          <label class="text-gray-700 font-medium custom-label">Change Email</label>
          <!-- <i
            :class="emailVisible ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
            class="text-gray-500"
          ></i> -->
        </div>
        <form
        
          class="flex flex-col  rounded-lg p-5 mt-2 mr-4 lg:mr-32"
        >
          <div class="flex flex-col lg:flex-row mb-4" v-if="role === 'Admin' ||role==='SuperAdmin'">
            <label for="newEmail" class="custom-label w-full lg:w-1/3 mt-3">
            Email
            </label>
            <div class="w-full flex flex-col">
              <input
                id="newEmail"
                type="email"
                class="w-full custom-input ml-3 text-xs text-gray-500"
                v-model="newEmail"
              />
              <button class="custom-button my-5 w-full lg:w-32 ml-3 text-xs " @click.prevent="changeEmail()">
                <i class="fa fa-edit mr-2"></i>Update</button>
              <p
                v-if="newEmailIsRequired"
                class="text-red-500 text-xs ml-3 mt-2"
              >
                New Email is required
              </p>
              <p
                v-if="showEmailError"
                class="text-red-500 text-xs ml-3 mt-2"
              >
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="mx-5">
      <div class="mt-4 py-4 ml-0 border-t border-gray-100 rounded-lg shadow-md">
        <div
          @click="toggleSection('password')"
          class="flex justify-between items-center cursor-pointer p-4 border-b border-gray-300 text-blue-800 "
>
        <label class="font-medium custom-label text-blue-500 text-lg ">Change Password</label>
        </div>
        
        <form
         
          class="flex flex-col  rounded-lg p-5 mt-2 mr-4 lg:mr-32"
        >
          <div class="mb-4">
            <div class="flex flex-col lg:flex-row">
              <label for="oldPassword" class="custom-label w-full lg:w-1/3 mt-3">
                Old Password
              </label>
              <div class="flex flex-col w-full">
                <input
                  id="oldPassword"
                  :type="showOldPassword ? 'text' : 'password'"
                  class="custom-input ml-3 text-xs text-gray-500"
                  v-model="oldPassword"
                />
               
              </div>
            </div>
          </div>
          <div class="mb-4">
            <div class="flex flex-col lg:flex-row">
              <label for="newPassword" class="custom-label w-full lg:w-1/3 mt-3">
                New Password
              </label>
              <div class="w-full flex flex-col">
                <input
                  id="newPassword"
                  type="password"
                  class="custom-input ml-3 text-xs text-gray-500"
                  v-model="newPassword"
                />
              
              </div>
            </div>
          </div>

          <div class="mb-4 lg:-mr-3">
            <div class="flex flex-col lg:flex-row">
              <label
                for="confirmNewPassword"
                class="custom-label w-full lg:w-1/3"
              >
                Confirm Password
              </label>
              <div class="flex flex-col w-full ml-4">
                <input
                  id="confirmNewPassword"
                  type="password"
                  class="custom-input text-xs text-gray-500"
                  v-model="confirmNewPasssord"
                />
                <p
                  v-if="oldPasswordIsRequired"
                  class="text-red-500 ml-3 text-xs"
                >
                  Old password is required
                </p>
                <p
                  v-if="confirmNewPasssordIsRequired"
                  class="text-red-500 ml-3 text-xs"
                >
                  Confirm password is required
                </p>

                <p
                  v-if="mismatchPassword"
                  class="text-red-500 text-red-500 text-xs ml-3"
                >
                  Password mismatch occurred
                </p>

                <p
                  v-if="newPasswordIsRequired"
                  class="text-red-500 text-xs ml-3"
                >
                  New password is required
                </p>
                <p
                  v-if="showError"
                  class="text-red-500 text-xs ml-3"
                >
                  {{ errorMessage }}
                </p>
                <button
                  @click.prevent="changePassword()"
                   class="custom-button w-full lg:w-32 mt-5 text-xs"
                >
                <i class="fa fa-edit mr-2"></i>  Update
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
      showEmailError:false,
      emailVisible: false,
      passwordVisible: false,
      role:"",
      showOldPassword: false,
      showNewPassword: false,
      showConfirmNewPassword: false,
      newEmail: "",

      newEmailIsRequired: false,
      oldPasswordIsRequired: false,
      newPasswordIsRequired: false,
      confirmNewPasssordIsRequired: false,
      mismatchPassword: false,

      showEmailForm: false,
      showPasswordForm: false,
      oldPassword: "",
      newPassword: "",
      confirmNewPasssord: "",

      showError:false,

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
  created(){
    this.newEmail=localStorage.getItem("email");
     console.log("email",this.newEmail);
    this.role=localStorage.getItem("role")
    console.log("roleinsetting",this.role);
  },

  methods: {
   async  changeEmail() {
  
      if(this.newEmail=='' || this.newEmail==null){
        this.newEmailIsRequired=true;
        return;
      } 

      const payload ={
        email: this.newEmail,
      }

      try {
  const response = await this.$apiPatch('/api/v1/users/updateMe', '', payload);
  
  console.log("Response from the update: update me", response);
  if (response.status === 1) {
    this.$store.dispatch("commitEmail", { email: response.updatedUser.email});
    this.$refs.toast.showSuccessToastMessage("Email updated successfully");
    this.$reloadPage();
  }
} catch (error) {
  console.log("Error while changing email:", error.status, error.message);
  this.showEmailError = true;
  this.errorMessage = error.message;
} 

    },

   async changePassword() {
 
      this.oldPasswordIsRequired = false;
      this.newPasswordIsRequired = false;
      this.confirmNewPasssordIsRequired = false;
      this.mismachPassword = false;
      this.showError = false;


      if (this.oldPassword == "" || this.oldPassword == null) {
       // alert("old")
        this.oldPasswordIsRequired = true;
        return;
      }

      if (this.newPassword == "" || this.newPassword == null) {
        //alert("new")
        this.newPasswordIsRequired = true;
        return;
      }
      if(this.newPassword.length<8){
        //alert("length")

        this.errorMessage="Password should be at least 8 characters long";
        this.showError=true;
        return;
      }
      if (this.confirmNewPasssord == "" || this.confirmNewPasssord == null) {
        alert("mismuch")
        this.confirmNewPasssordIsRequired = true;
        return;
      }
      if (this.newPassword != this.confirmNewPasssord) {
      // alert("hhh")
        this.mismatchPassword = true;
        return;
      }

      const payload = {
        currentPassword: this.oldPassword,
        newPassword: this.newPassword,
        userId: this.userId,
      };
   

      try { 
        
        await this.$apiPatch("api/v1/users/updatePassword",this.userId, payload)
        .then((response) => {
          if (response.status === 1) {
            this.$refs.toast.showSuccessToastMessage(response.message);
            this.$reloadPage();
          } 
        })

      }catch(error)  {
            console.log("error", error.status,error.message);
            this.errorMessage=error.message;
            this.showError=true;
        }finally{
          console.log("change password finally")
      };

    },
  },
};
</script>
  
  