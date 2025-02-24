<template>
  <div>

    <div class="relative bg-gradient-to-r from-blue-500 to-blue-300 text-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center overflow-hidden">
    <div class="md:w-1/2 flex justify-center md:justify-start">
      <div class="w-60 md:w-72 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">✔</div>
        <p class="text-lg text-blue-700 font-semibold mt-4">SHOP Panel</p>
        <div class="mt-2 space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-green-400">✔</span> Answer surveys
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-400">✔</span> Get paid instantly
          </div>
        </div>
      </div>
    </div>
    <div class="md:w-1/2 text-center md:text-left">
      <h2 class="text-xl md:text-2xl font-semibold">Make money doing surveys</h2>
      <h1 class="text-3xl md:text-5xl font-bold my-2">Get up to <span class="text-white">$4.9</span> per answer</h1>
      <div class="mt-4 space-y-2">
        <p class="flex items-center gap-2 text-lg">
          <span class="text-green-400">✔</span> Fun and free to join
        </p>
        <p class="flex items-center gap-2 text-lg">
          <span class="text-green-400">✔</span> Fast and easy payment
        </p>
      </div>
      <div class="relative z-10 mt-6">
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg">
          START MAKING MONEY
        </button>
      </div>
    </div>
    
    <!-- Enhanced 3D wave effect to simulate road perspective -->
    <div class="absolute bottom-0 left-0 w-full z-0">
      <svg viewBox="0 0 1440 320" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <path fill="#3b82f6" fill-opacity="1" d="M0,240L80,220C160,200,320,160,480,180C640,200,800,260,960,270C1120,280,1280,240,1360,220L1440,200V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"></path>
        <path fill="#1e3a8a" fill-opacity="1" d="M0,280L80,260C160,240,320,200,480,220C640,240,800,280,960,290C1120,300,1280,260,1360,240L1440,220V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"></path>
        <path fill="#0f172a" fill-opacity="1" d="M0,320L80,300C160,280,320,240,480,260C640,280,800,300,960,310C1120,320,1280,280,1360,260L1440,240V320H1360C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320H0Z"></path>
      </svg>
    </div>
  </div>

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
      const formData = new FormData();
      if(this.newEmail=='' || this.newEmail==null){
        this.newEmailIsRequired=true;
        return;
      } 
      formData.append("email", this.newEmail);
      try { await this.$apiPatch('/api/v1/users',this.userId, formData)
        .then((response) => {
          console.log("response from the update: " ,response);
          if (response.status === 1) {
            const email=response.updatedUser.email;
            this.newEmail=response.updatedUser.email;
            this.$store.dispatch("commitEmail", {  email});
            this.$refs.toast.showSuccessToastMessage(response.message);
            this.$reloadPage();
          }
        })}
        catch(error) {
          console.log("error email chnage",error.status,error.message);
          this.$refs.toast.showErrorToastMessage("Somthing went wrong!!");
          this.showError=true;
          this.errorMessage=error.message;
        }finally{
          console.log("email change finally");
        };
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
  
  