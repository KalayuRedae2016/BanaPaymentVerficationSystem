<template>
 
  <div class="flex justify-center bg-gray-50 min-h-screen ">
    <div
      class="w-full max-w-md sm:max-w-lg py-8 px-4 sm:px-20 mt-8 mb-8 shadow-xl rounded-2xl bg-white mx-3 border border-gray-200"
    >
  
      <div class="grid place-items-center">
        <div>
          <img
            src="../assets/img/banamall1.jpg"
            class="mb-5"
            style="height: 100px; width: 100px"
          />
        </div>
        <h1>banapvs.com</h1>
      </div>

     

  <div v-if="showError" class=" mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Error!</strong>
  <span class="block sm:inline">{{ errorMessage }}</span>
  <button type="button" class="absolute top-0 bottom-0 right-0 px-4 py-3" aria-label="Close" onclick="this.parentElement.style.display='none'">
    <svg class="fill-current h-6 w-6 text-red-700" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <title>Close</title>
      <path d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 10-.707.707L9.293 10l-3.64 3.641a.5.5 0 00.707.707L10 10.707l3.641 3.64a.5.5 0 00.707-.707L10.707 10l3.641-3.641a.5.5 0 000-.707z" />
    </svg>
  </button>
</div>

      <div v-if="loginVisible">
        <!-- <h1 class="text-indigo-800 font-semibold text-2xl">
          {{ $t("signIn") }} <span class="text-white"></span>
        </h1> -->
        <form action="" class="mt-4">
          <div class="mb-4">
            <label class="custom-label" for="username">
              {{ $t("username") }} <span class="text-red-500">*</span>
            </label>
            <div class="pl-3 mb-5">
              <input
                class="custom-input"
                id="username"
                type="text"
                v-model="username"
                placeholder="Enter User Code"
              />
            </div>
            <p v-if="usernameIsRequired" class="text-red-500 mb-6 text-center mt-3 text-sm mb-3">{{ $t('usernameRequired') }}</p>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="p assword"
            >
              {{ $t("password") }} <span class="text-red-500">*</span>
            </label>
            <div class="pl-3">
              <div class="flex flex-row">
              <input
                class="custom-input"
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                :placeholder="$t('passwordPlaceholder')"
              />
              <button
                  @click.prevent="this.showPassword=!this.showPassword"
                  class="ml-5 text-xs my-2 text-blue-500 underline hover:text-blue-700 focus:outline-none"
                >
                  {{ showPassword ? "Hide  " : "Show " }}
                </button>
              </div>
            </div>
            <p v-if="passwordIsRequired" class="text-red-500 mb-6 text-center mt-3 text-sm mb-3">{{ $t('passwordRequired') }}</p>
          </div>
          <div class="flex justify-end">
            <p class="mt-4 text-center text-gray-600">
  <a
    class="text-blue-500 hover:underline cursor-pointer"
    @click="forgetPassword()"
  >
    {{ $t('forgotPassword') }}
  </a>
</p>

          </div>
          <button
            @click.prevent="login()"
            class="mt-5 w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {{ $t('signIn') }}
          </button>
        </form>
      </div>

      <div v-if="forgetPasswordVisible" class="pt-5">
        <div v-if="showForgetPasswordForm">
          <!-- <p class="text-gray-600 mb-6 text-center mt-5">
          {{$t('enterEmailMessage') }}
          </p> -->
          <input
            v-model="resetEmail"
            type="email"
            :placeholder="$t('enterYourEmail')"
            class="custom-input mb-5 "
          />
          <button
            @click="sendEmailToServer()"
            class="mt-5 w-full bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
          {{ $t('sendResetLink') }}
          </button>
          <p class="mt-4 text-center text-gray-600">
            {{ $t('rememberedPassword') }}?
            <router-link
              to="#"
              class="text-blue-500 hover:underline"
              @click="makeLoginVissible"
              > {{ $t('loginHere') }}</router-link
            >
          </p>
          <p v-if="resetEmailIsRequired" class="text-red-600 mb-6 text-center mt-5 text-sm">
            {{ $t('emailRequired') }}
          </p>
        </div>


        <div
          v-if="notifyToSeeEmail"
          class="mt-7 flex flex-col items-center justify-center p-4 bg-gray-50 border border-blue-300 rounded-3xl text-blue-700"
        >
          <svg
            class="w-5 h-5 mb-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2zM4 8h12l4 8H0l4-8zm8 4h-2v2h2v-2zm0-2h-2v1h2V10z"
            />
          </svg>
          <div class="flex flex-col items-center">
            <span class="font-semibold mb-1"> {{ $t('checkYourEmail') }}!</span>

             <span
              >
               {{ $t('passwordResetEmailSent') }}
            </span
            >
            <p class="mt-4 text-center text-gray-600">
              <router-link
                to="#"
                class="text-blue-500 hover:underline"
                @click="makeLoginVissible"
                >{{ $t('backToLogin') }}</router-link
              >
            </p>

          </div>
     
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
      showPassword:false,
      showError:true,
      errorMessage:"",
      showError:false,
      passwordIsRequired: false,
      usernameIsRequired: false,
      username: "",
      password: "",
      confirmPassword: "",
      passwordMismatch: false,
      UsernameEmailTaken: false,
      UserNotFound: false,
      loginVisible: true,
      forgetPasswordVisible: false,
      resetPasswordVisible: false,
      resetEmail: "",
    
      showForgetPasswordForm: false,

      notifyToSeeEmail: false,
      resetEmailIsRequired:false,
      emailNotFound:false,

    };
  },
  mounted() {
    console.log("local is changed =", this.locale);
   
  },

  computed: {
    ...mapGetters(["getToken", "getUserId", "getLocale"]),
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
  },
  methods: {
    makeLoginVissible() {
      this.notifyToSeeEmail=false;
      this.loginVisible = true;
      this.forgetPasswordVisible = false;
      console.log(
        "Forget Password",
        this.loginVisible,
        this.forgetPasswordVisible
      );
    },
    forgetPassword() {
      this.loginVisible = false;
      this.forgetPasswordVisible = true;
      this.showForgetPasswordForm=true;
    },



    sendEmailToServer() {
    

     if(this.resetEmail===''){
      this.showError=true;
      this.errorMessage = "Email is required"
       return;
     }


     const emailData = {
      email:this.resetEmail

     };

 
      this.$apiClient
        .post("/api/v1/users/forgetPassword",emailData)
        .then((response) => {
          console.log("response during reg", response.data);
          if(response.data.status===1){
            //alert("hhhh")
            this.notifyToSeeEmail=true;
            this,this.showError=false;
            this.showForgetPasswordForm=false;
            this.forgetPasswordVisible=true;

          }
        }).catch((error) => {
          console.log("Error registration", error);
          this.showError=true;
          this.errorMessage = "Email Not Found"
          this.showForgetPasswordForm=true;
          this.forgetPasswordVisible=true;
      });

    },
    changeLanguage(event) {
      console.log("event", event.target.value);
      const selectedLanguage = event.target.value;
      this.$store.dispatch("setLocale", { locale: selectedLanguage });
      console.log("local is changed =", this.locale);
    },
    login() {
    
      this.showError=false;
      this.errorMessage="";
    // alert("Login", this.username, this.password);
      if (this.username.trim() === "") {
       this.showError=true;
       this.errorMessage = "Please enter a username";
        return;
      }

      // Check if password is empty
      if (this.password.trim() === "") {
        this.showError=true;
        this.errorMessage = "Please enter a password";
        return;
      }
// if(this.password.trim()!='' && this.username.trim()!=''){
//   //alert("this is the if clause");
//        alert("Username and Password are required.");
//               const token="kkkkkkkkwtttt"; 
//               const  userId="bana001"; 
//               const role="Admin";
//               this.$store.dispatch("login", { token });
//               this.$store.dispatch("commitId", { userId });
//               this.$store.dispatch("commitRole", { role });
//               this.$router.push("/admindashboard/");
//               return;
// }
      const userData = {
        userCode: this.username,
        password: this.password,
      };
      this.$apiClient
        .post("/api/v1/users/login", userData)
        .then((response) => {
          console.log("response during login now");
          
          const { role, token, userId,userCode} = response.data;
          console.log("response", response.data);

          if (response.data.status === 1) {
            console.log("status is 1 and role is ", response.data.role);
            if (role.includes("Admin")) {
              console.log("role=====", role);
              this.$store.dispatch("login", { token });
              this.$store.dispatch("commitId", { userId });
              this.$store.dispatch("commitRole", { role });
              this.$store.dispatch('commitUserCode', { userCode: userCode });
              this.$router.push({ path: '/admindashboard', query: { loginSuccess: 'true' } });
            } else if (role.includes("User")) {
              console.log("role=====", role);
              console.log("the user is user role");
              this.$store.dispatch("login", { token });
              this.$store.dispatch("commitId", { userId });
              this.$store.dispatch("commitRole", { role });
              this.$store.dispatch('commitUserCode', { userCode: userCode });
              this.$router.push({ path: '/userdashboard', query: { loginSuccess: 'true' } });
            } else {
              this.showError=true;
              this.errorMessage=response.data.message;
            }
          } else {
              this.showError=true;
              this.errorMessage=response.data.message;
          }
        })
        .catch((error) => {
         console.log("error",error);

         if (error.response) {
            // The request was made, and the server responded with a status code outside the 2xx range
            console.error('Error code:', error.response.status); // e.g., 401


            console.error('Error message:', error.response.data.message); // Message from server

           
              this.showError=true;
              this.errorMessage=error.response.data.message
  
            
          } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received:', error.request);
            this.showError=true;
            this.errorMessage="Something went wrong!!,No response received";
          } else {
            this.showError=true;
            this.errorMessage="Something went wrong!!";
          }
         
        });
    },
  },
};
</script>
