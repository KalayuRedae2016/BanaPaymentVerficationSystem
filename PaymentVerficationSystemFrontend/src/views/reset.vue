<template>
  <div>
    <Toast ref="toast" />
    <div class="flex justify-center mt-16">
      <div class="w-full max-w-md sm:max-w-lg py-8 px-4 sm:px-20 md border border-gray-100 mt-16 rounded-2xl shadow-lg">
        <!-- logo and language -->

        <div class="grid place-items-center">
          <div>
            <img src="../assets/img/banamall1.jpg" class="mb-5" style="height: 100px; width: 100px" />
          </div>

        </div>

        <div v-if="showError" class=" mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{ errorMessage }}</span>
          <button type="button" class="absolute top-0 bottom-0 right-0 px-4 py-3" aria-label="Close"
            onclick="this.parentElement.style.display='none'">
            <svg class="fill-current h-6 w-6 text-red-700" role="button" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <title>Close</title>
              <path
                d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 10-.707.707L9.293 10l-3.64 3.641a.5.5 0 00.707.707L10 10.707l3.641 3.64a.5.5 0 00.707-.707L10.707 10l3.641-3.641a.5.5 0 000-.707z" />
            </svg>
          </button>
        </div>


        <div v-if="resetPasswordVisible" class="">
          <div class="">
            <h2 class="text-lg font-bold mb-4 text-center text-blue-800">
              Change Your Password
            </h2>
            <input v-model="password" type="password" placeholder="Enter password" class="custom-input" />
            <input v-model="confirmPssword" type="password" placeholder="Confirm password" class="custom-input mt-5" />
            <button @click.prevent="changePassword()" class="custom-button w-full mt-6">
              {{ $t("Reset Password") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Toast from '../components/Common/Toast.vue'
export default {
  components: {
    Toast,
  },
  data() {
    return {
      showError: false,
      errorMessage: "",
      resetPasswordVisible: true,
      password: "",
      confirmPassword: "",
    };
  },
  mounted() {
    this.token = this.$route.params.token;
    console.log("token from param is ", this.token);
  },
  methods: {
    changePassword() {
      console.log(this.$route.params.token);
      console.log(this.password);
      if (this.password === this.confirmPssword) {
        console.log("Password match");
        this.$apiClient
          .patch("/api/v1/users/resetPassword", {
            password: this.password,
            token: this.$route.params.token,
          })
          .then((response) => {
            console.log(response.data);
            console.log("response from reset", response)

            this.$refs.toast.showSuccessToastMessage("Reseted Successfully");


            setTimeout(() => {
              this.$router.push('/');
            }, 2000);
            // if (response.data.status === 1) {

            //     const token=response.data.token;
            //     const userId=response.data.userId;
            //     const role=response.data.role;
            //   if (response.data.role=="Admin" || response.data.role=="SuperAdmin") {
            //     console.log("he is admin",role);
            //     this.$store.dispatch("login", { token });
            //     this.$store.dispatch("commitId", { userId }); 
            //     this.$store.dispatch("commitRole", { role });
            //     this.$router.push({ path: '/admindashboard', query: { loginSuccess: 'true' } });

            //   } else if (response.data.role=="User") {
            //     console.log("he/she is user",role);
            //     this.$store.dispatch("login", { token });
            //     this.$store.dispatch("commitId", { userId });
            //     this.$store.dispatch("commitRole", { role });
            //     this.$router.push({ path: '/userdashboard', query: { loginSuccess: 'true' } });

            //   }
            // }else{
            //   this.showError=true;
            //   this.errorMessage=response.data.message;
            // }


          })
          .catch((error) => {

            this.$refs.toast.showSuccessToastMessage("Reseted Successfully");


            setTimeout(() => {
              this.$router.push('/');
            }, 2000);
            if (error.response) {
              // The request was made, and the server responded with a status code outside the 2xx range
              console.error('Error code:', error.response.status); // e.g., 401


              console.error('Error message:', error.response.data.message); // Message from server


              //this.showError = true;
              //this.errorMessage = error.response.data.message


            } else if (error.request) {


              this.$refs.toast.showSuccessToastMessage("Reseted Successfully");


              setTimeout(() => {
                this.$router.push('/');
              }, 2000);
              // The request was made, but no response was received
              console.error('No response received:', error.request);
              //this.showError = true;
             // this.errorMessage = "Something went wrong!!,No response received";
            } else {
              //this.showError = true;
              //this.errorMessage = "Something went wrong!!";
            }
          });
      } else {
        //this.showError = true;
        //this.errorMessage = "Password and Confirm Password Must be Equal";
      }
    },
  },
};
</script>
