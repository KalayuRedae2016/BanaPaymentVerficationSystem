<template>
  <div>
    <div class="p-3 border-b border-blue-800">
        <h4 class="text-indigo-800 mt-1">  {{ $t("changePassword") }}</h4>
    </div>

    <div class="border border-gray-300 m-5 p-5 rounded-lg">
      <form action="">
        <div class="md-4" >
             <label for="oldPassword" class="custom-label"> {{ $t("oldPassword") }}</label>
             <input type="text" class="custom-input ml-3 text-xs text-gray-500" v-model="oldPassword" placeholder="Enter Old Password">
        </div>
        <div class="md-4" >
             <label for="newPassword" class="custom-label"> {{ $t("newPassword") }}</label>
            <input type="password" class="custom-input ml-3 text-xs text-gray-500" v-model="newPassword" placeholder="Enter New Password">
        </div>
        <div class="md-4" >
             <label for="confirmnOldPassword" class="custom-label">  {{ $t("confirmNewPassword") }}</label>
             <input type="password" class="custom-input ml-3  text-xs text-gray-500" v-model="confirmNewPasssord" placeholder="Repeat Password">
        </div>
        <button @click.prevent="changePassword()" class="custom-button mt-5 ml-3">  {{ $t("change") }}</button>
      </form>
    </div>
    <div v-if="showSuccess">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg-lg shadow-lg p-8 w-96">
                <div class="flex items-center justify-center mb-4">
                  <svg
                    class="w-8 h-8 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <h2 class="text-sm font-bold text-gray-800">Success!</h2>
                </div>
                <p class="text-gray-600 text-sm">
                  <!-- Your Comany Profile Created successfully -->
                   {{ successMessage }}
                </p>
                <button
                  @click="
                    showSuccess = !showSuccess;
                    routeToDisplay();
                  "
                  class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg-full focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  OK
                </button>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showWarning">
  <transition name="fade" mode="out-in">
    <div
      class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
    >
      <!-- Modal Content -->
      <div class="bg-white rounded-lg p-6 border border-yellow-500">
        <div class="fixed inset-0 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg shadow-lg p-8 w-96">
            <div class="flex items-center justify-center mb-4">
              <svg
                class="w-8 h-8 text-yellow-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01"
                ></path>
              </svg>
              <h2 class="text-sm font-bold text-gray-800">Warning!</h2>
            </div>
            <p class="text-gray-600 text-sm">
              {{ warningMessage }}
            </p>
            <button
              @click="showWarning = false"
              class="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              OK
            </button>
          </div>
        </div>
        <hr class="my-4 bg-yellow-500" />
      </div>
    </div>
  </transition>
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
  data(){
      return{
          oldPassword:'',
          newPassword:'',
          confirmNewPasssord:'',
          showSuccess:"",
          showWarning:"",
          showError:"",
          successMessage:"",
          errorMessage:"",
          warningMessage:"",
      }
  },
  methods:{
      changePassword(){
        const payload={
            oldPassword:this.oldPassword,
            newPassword:this.newPassword
        }

        this.$apiClient.post('api/v1/password/changePassword').then((response)=>{
            console.log("response");
            if(response.data.status===1){
                this.successMessage=response.data.message;
                this.showSuccess=true;
            }else{
              this.warningMessage=response.data.message;
              this.showWarning=true;
            }
        }).catch((error)=>{
            console.log("error",error);
            this.errorMessage=error.response.data.message;
            this.showError=true;
        })
      }
  }
}
</script>

