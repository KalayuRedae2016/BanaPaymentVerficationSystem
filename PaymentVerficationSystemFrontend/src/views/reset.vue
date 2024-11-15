<template>
  <div>
  <div class="flex justify-center">
    <div
      class="w-full max-w-md sm:max-w-lg py-8 px-4 sm:px-20 md border border-cyan-800 mt-16 rounded-2xl"
    >
      <!-- logo and language -->

      <div class="grid place-items-center">
        <div>
          <img
            src="../assets/img/bana.PNG"
            class="mb-5"
            style="height: 100px; width: 100px"
          />
        </div>
        <h1>Banapvs.com</h1>
      </div>
      <div v-if="resetPasswordVisible" class="">
        <div class="">
          <h2 class="text-2xl font-bold mb-4 text-center text-blue-800">
            Change Your Password
          </h2>
          <p class="text-gray-600 mb-6 text-center">
            Enter your New password to update your account.
          </p>
          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="custom-input"
          />
          <input
            v-model="confirmPssword"
            type="password"
            placeholder="Confirm password"
            class="custom-input mt-5"
          />
          <button
            @click.prevent="changePassword()"
            class="mt-5 w-full bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ $t("Reset Password") }}
          </button>
        </div>
      </div>
    </div>
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
export default {
  data() {
    return {

      showError:false,
      errorMessage:"",


      resetPasswordVisible: true,
      password: "",
      confirmPassword: "",
    };
  },
  mounted() {
    this.token = this.$route.params.token;
   
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
            console.log("response from reset",response)
            if (response.data.status === 1) {
                const token=response.data.token;
                const userId=response.data.userId;
                const role=response.data.role;
              if (response.data.role=="Admin") {
                console.log("he is admin",role);
                this.$store.dispatch("login", { token });
                this.$store.dispatch("commitId", { userId }); 
                this.$store.dispatch("commitRole", { role });
                this.$router.push("/admindashboard/");
              } else if (response.data.role=="User") {
                console.log("he/she is user",role);
                this.$store.dispatch("login", { token });
                this.$store.dispatch("commitId", { userId });
                this.$store.dispatch("commitRole", { role });
                this.$router.push("/userdashboard");
              }
            }
          })
          .catch((error) => {
            console.log("Error reseting", error);
          });
      }
    },
  },
};
</script>
