<template>
  <div class="flex justify-center bg-gray-50 min-h-screen">
    <div
      class="w-full max-w-md sm:max-w-lg py-8 px-4 sm:px-20 mt-8 mb-8 shadow-xl rounded-2xl bg-white mx-3 border border-gray-200"
    >
      <div class="grid place-items-center">
        <div>
          <img
            src="../assets/img/banamall1.jpg"
            class="mb-5 mt-5"
            style="height: 100px; width: 100px"
          />
        </div>
      </div>

      <div
        v-if="showError"
        class="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ errorMessage }}</span>
        <button
          type="button"
          class="absolute top-0 bottom-0 right-0 px-4 py-3"
          aria-label="Close"
          onclick="this.parentElement.style.display='none'"
        >
          <svg
            class="fill-current h-6 w-6 text-red-700"
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
      <form v-if="loginVisible" >
        <div
          v-for="(field, key) in formSchema.login.fields"
          :key="key"
          class="mb-4"
        >
          <label :for="field.for" class="custom-label">
            {{ field.label }}
            <span class="text-red-500" v-if="field.rules.required">*</span>
          </label>
         
          <input
            v-bind="getInputProps(field)"
            v-model="formSchema.login.fields[key].value"
            :class="{
              'custom-input-error': errors[key],
              'custom-input': !errors[key],
            }"
            @blur="validateFields()"
          />
    
          <p v-if="errors[key]" class="text-red-500 text-sm mt-2 ml-5">
            {{ errors[key] }}
          </p>
        </div>
        <div class="flex justify-end">
            <p class="mt-4 text-center text-gray-600">
              <a
                class="text-blue-500 hover:underline cursor-pointer"
                @click="forgetPassword()"
              >
                {{ $t("forgotPassword") }}
              </a>
            </p>
          </div>

        <button  @click.prevent="login" class="custom-button w-full mt-5">
          {{ $t("signIn") }}
        </button>
      </form>

   



      <div v-if="forgetPasswordVisible" class="pt-5 mt-8">
        <div v-if="showForgetPasswordForm">
          <input
            v-model="resetEmail"
            type="email"
            :placeholder="$t('enterYourEmail')"
            class="custom-input mb-5 mt-10"
          />
          <button
            @click="sendEmailToServer()"
            class="custom-button w-full mt-5"
          >
            {{ $t("sendResetLink") }}
          </button>
          <p class="mt-4 text-center text-gray-600">
            {{ $t("rememberedPassword") }}?
            <router-link
              to="#"
              class="text-blue-500 hover:underline"
              @click="makeLoginVissible"
            >
              {{ $t("loginHere") }}</router-link
            >
          </p>
          <p
            v-if="resetEmailIsRequired"
            class="text-red-600 mb-6 text-center mt-5 text-sm"
          >
            {{ $t("emailRequired") }}
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
            <span class="font-semibold mb-1"> {{ $t("checkYourEmail") }}!</span>

            <span>
              {{ $t("passwordResetEmailSent") }}
            </span>
            <p class="mt-4 text-center text-gray-600">
              <router-link
                to="#"
                class="text-blue-500 hover:underline"
                @click="makeLoginVissible"
                >{{ $t("backToLogin") }}</router-link
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
import { formSchema } from "@/utils/formSchema"; // Import the global form schema

export default {
  data() {
    return {
      formSchema: formSchema,

      showPassword: false,
      showError: true,
      errorMessage: "",
      showError: false,
      passwordIsRequired: false,
      usernameIsRequired: false,
      username: "",
      password: "",
      errors: {},
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
      resetEmailIsRequired: false,
      emailNotFound: false,
    };
  },
  mounted() {
    console.log("local is changed =", this.locale);
    if (this.$route.query.fp) {
      this.loginVisible = false;
      this.forgetPasswordVisible = true;
      this.showForgetPasswordForm = true;
    }
    if (this.$route.query.ne) {
      this.notifyToSeeEmail = true;
      this.showError = false;
      this.showForgetPasswordForm = false;
      this.forgetPasswordVisible = true;
      this.loginVisible = false;
    }
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
    getInputProps(field) {
      return {
        type: field.type,
        placeholder: field.placeholder,
      };
    },
    makeLoginVissible() {
      this.notifyToSeeEmail = false;
      this.loginVisible = true;
      this.forgetPasswordVisible = false;
      console.log(
        "Forget Password",
        this.loginVisible,
        this.forgetPasswordVisible
      );
    },
    forgetPassword() {
      //alert("callled")

      this.loginVisible = false;
      this.forgetPasswordVisible = true;
      this.showForgetPasswordForm = true;
      this.$router.push({
        path: "/",
        query: {
          fp: true,
        },
      });
    },

    sendEmailToServer() {
      if (this.resetEmail === "") {
        this.showError = true;
        this.errorMessage = "Email is required";
        return;
      }

      const emailData = {
        email: this.resetEmail,
      };

      this.$apiClient
        .post("/api/v1/users/forgetPassword", emailData)
        .then((response) => {
          console.log("response during reg", response.data);
          if (response.data.status === 1) {
            //alert("hhhh")
            this.notifyToSeeEmail = true;
            this.showError = false;
            this.showForgetPasswordForm = false;
            this.forgetPasswordVisible = true;
            this.loginVisible = false;
            this.$router.push({
              path: "/",
              query: {
                ne: true,
              },
            });
          }
        })
        .catch((error) => {
          console.log("Error registration", error);
          this.showError = true;
          this.errorMessage = "Email Not Found";
          this.showForgetPasswordForm = true;
          this.forgetPasswordVisible = true;
          this.notifyToSeeEmail = false;
        });
    },
    changeLanguage(event) {
      console.log("event", event.target.value);
      const selectedLanguage = event.target.value;
      this.$store.dispatch("setLocale", { locale: selectedLanguage });
      console.log("local is changed =", this.locale);
    },

    validateFields(){
      this.errors = {}; // Reset errors before validating
      let isValid = true;
      const formName = "login"; // The form name (e.g., 'login')

      // Loop through the fields to validate
      for (const fieldKey in this.formSchema.login.fields) {
        const field = this.formSchema.login.fields[fieldKey];
        const validationResult = this.$validateField(
          formName, // Form name
          fieldKey, // Field name
          field.value, // Field value
          this.formSchema // Form schema imported
        );

        // If invalid, set the error message
        if (!validationResult.valid) {
          // Use Vue 2's reactivity by directly assigning the error
          this.errors[fieldKey] = validationResult.message;
          isValid = false;
        } else {
          // If valid, clear any previous error
          this.errors[fieldKey] = null;
        //this.login();
        }
      }
    },
    login() {
      

      // If the form is valid, proceed with the login logic
     
        const userData = {
          userCode: this.formSchema.login.fields.username.value,
          password: this.formSchema.login.fields.password.value,
        }

        this.$apiClient
          .post("/api/v1/users/login", userData)
          .then((response) => {
            // Handle successful login response
            const { role, token, userId, userCode,email} = response.data;
            if (response.data.status === 1) {
              this.formSchema.login.fields.password.value="";

              // Dispatch actions based on role
              if (role.includes("Admin")) {
                this.$store.dispatch("login", { token });
                this.$store.dispatch("commitId", { userId });
                this.$store.dispatch("commitRole", { role });
                 console.log("role is given from the server",role);
                this.$store.dispatch("commitUserCode", { userCode });
                this.$store.dispatch("commitEmail", { email });
                this.$router.push({ path: "/admindashboard", query: { loginSuccess: "true" } });
              } else if (role.includes("User")) {
                this.$store.dispatch("login", { token });
                this.$store.dispatch("commitId", { userId });
                this.$store.dispatch("commitRole", { role });
                this.$store.dispatch("commitUserCode", { userCode });
                this.$store.dispatch("commitEmail", { email });
                this.$router.push({ path: "/userdashboard", query: { loginSuccess: "true" } });
              } else {
                this.showError = true;
                this.errorMessage = response.data.message;
              }
            } else {
              this.showError = true;
              this.errorMessage = response.data.message;
            }
          })
          .catch((error) => {
            this.showError = true;
            this.errorMessage = error.response?.data.message || "Something went wrong!";
          });
     
    },
  },
};
</script>
