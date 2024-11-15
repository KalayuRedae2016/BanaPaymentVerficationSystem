<template>
  <div class="flex justify-center">
    <div
      class="w-full max-w-md sm:max-w-lg py-8 px-4 sm:px-20 md border border-indigo-300 mt-16 rounded-2xl"
    >
  
      <div class="grid place-items-center">
        <div>
          <img
            src="../assets/img/banamall.jpg"
            class="mb-5"
            style="height: 100px; width: 100px"
          />
        </div>
        <h1>banapvs.com(49.13.235.6)</h1>
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
                :placeholder="$t(' usernamePlaceholder')"
              />
            </div>
            <p v-if="usernameIsRequired" class="text-red-500 mb-6 text-center mt-3 text-sm mb-3">User name is required</p>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="p assword"
            >
              {{ $t("password") }} <span class="text-red-500">*</span>
            </label>
            <div class="pl-3">
              <input
                class="custom-input"
                id="password"
                type="password"
                v-model="password"
                :placeholder="$t('passwordPlaceholder')"
              />
            </div>
            <p v-if="passwordIsRequired" class="text-red-500 mb-6 text-center mt-3 text-sm mb-3">Password is required</p>
          </div>
          <div class="flex justify-end">
            <p class="mt-4 text-center text-gray-600">
              <router-link
                to="#"
                class="text-blue-500 hover:underline"
                @click="forgetPassword()"
                >Forget Password</router-link
              >
            </p>
          </div>
          <button
            @click.prevent="login()"
            class="mt-5 w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
        </form>
      </div>

      <div v-if="forgetPasswordVisible">
        <div v-if="showForgetPasswordForm">
          <p class="text-gray-600 mb-6 text-center mt-5">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <input
            v-model="resetEmail"
            type="email"
            placeholder="Enter your email"
            class="custom-input mb-5"
          />
          <button
            @click="sendEmailToServer()"
            class="mt-5 w-full bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send Reset Link
          </button>
          <p class="mt-4 text-center text-gray-600">
            Remembered your password?
            <router-link
              to="#"
              class="text-blue-500 hover:underline"
              @click="makeLoginVissible"
              >Login here</router-link
            >
          </p>
          <p v-if="resetEmailIsRequired" class="text-red-600 mb-6 text-center mt-5 text-sm">
           Email is required to reset your password.
          </p>
        </div>
        <div
          v-if="notifyToSeeEmail"
          class="mt-7 flex flex-col items-center justify-center p-4 bg-blue-100 border border-blue-300 rounded-lg text-blue-700"
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
            <span class="font-semibold mb-1">Check your email!</span>
            <span
              >We've sent a password reset link to your email. Please follow the
              instructions to reset your password.</span
            >
          </div>

          <!-- <p class="mt-4 text-center text-gray-600">
              I have remembered my password?
            <router-link
              to="#"
              class="text-blue-500 hover:underline"
              @click="makeLoginVissible"
              >Login </router-link
            >
          </p> -->
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
    
      showForgetPasswordForm: true,
      notifyToSeeEmail: false,
      resetEmailIsRequired:false,
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
    },
    sendEmailToServer() {
      //alert("Sending email to: " + this.resetEmail);
     if(this.resetEmail===''){
      //alert("Email is required to reset your password.");
       this.resetEmailIsRequired=true;
       return;
     }
     const emailData = {
      email:this.resetEmail

     };
      this.notifyToSeeEmail=true;
      this.showForgetPasswordForm=false;
      this.$apiClient
        .post("/api/v1/users/forgetPassword",emailData)
        .then((response) => {
          console.log("response during reg", response.data);
          this.successRegister = true;
        })
        .catch((error) => {
          console.log("Error registration", error);
        });
    },
    changeLanguage(event) {
      console.log("event", event.target.value);
      const selectedLanguage = event.target.value;
      this.$store.dispatch("setLocale", { locale: selectedLanguage });
      console.log("local is changed =", this.locale);
    },
    login() {
    // alert("Login", this.username, this.password);
      if (this.username.trim() === "") {
        this.usernameIsRequired = true;
        this.UserNotFound = false;
        this.passwordIsRequired = false;
        return;
      }

      // Check if password is empty
      if (this.password.trim() === "") {
        this.passwordIsRequired = true;
        this.usernameIsRequired = false;
        this.UserNotFound = false;



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
          console.log("response");

          const { role, token, userId,userCode} = response.data;
          console.log("response", response.data);

          if (response.data.status === 1) {
            console.log("status is 1 and role is ", response.data.role);
            if (role.includes("Admin")) {
              console.log("role=====", role);
              this.$store.dispatch("login", { token });
              this.$store.dispatch("commitId", { userId });
              this.$store.dispatch("commitRole", { role });

              this.$store.dispatch("commitUserCode", { userCode });

              this.$router.push("/admindashboard/");
            } else if (role.includes("User")) {
              console.log("role=====", role);
              console.log("the user is user role");
              this.$store.dispatch("login", { token });
              this.$store.dispatch("commitId", { userId });
              this.$store.dispatch("commitRole", { role });
              this.$store.dispatch("commitUserCode", { userCode });
              this.$router.push("/userdashboard");
            } else {
              console.log("unauthorized user");
            }
          } else {
            this.UserNotFound = true;
          }
        })
        .catch((error) => {
          console.log("eror in catch", error);
          this.passwordIsRequired = false;
          this.usernameIsRequired = false;
          this.UserNotFound = true;
        });
    },
  },
};
</script>
