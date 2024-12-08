<template>
  <div>
    <div class="p-3 border-b border-blue-800">
        <h4 class="text-indigo-800 mt-1">  {{ $t("changePassword") }}</h4>
    </div>


    <transition
    enter-active-class="transform transition duration-300 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transform transition duration-300 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      v-if="showSuccessToast"
      class="z-20 fixed right-5  bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
      role="alert"
    >
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline">{{ succesToastMessage }}</span>
    </div>
  </transition> 

      <transition
    enter-active-class="transform transition duration-300 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transform transition duration-300 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <div
      v-if="showErrorToast"
      class="z-20 fixed right-5  bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
      role="alert"
    >
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">{{ errorToastMessage }}</span>
    </div>
  </transition> 

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
  
</div>
</template>

<script>

export default {
  data(){
      return{
        successToastMessage:"",
     errorToastMessage:"",
     showErrorToast:false,
     showSuccessToast:false,
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
    showSuccessToastMessage(message) {
      this.successToastMessage = message;
      this.showSuccessToast = true;
      setTimeout(() => {
       
        this.showSuccessToast = false;
      }, 1000); 
      
      // Toast will disappear after 3 seconds
    },
    showErrorToastMessage(message) {
      this.errorToastMessage = message;
      this.showErrorToast = true;
      setTimeout(() => {
       
        this.showErrorToast = false;
      }, 1000); 
      
      // Toast will disappear after 3 seconds
    },
      changePassword(){

        if(this.oldPassword==""){
          this.showErrorToastMessage("Old password is required")
          return;
        }
        if(this.newPassword==""){
          this.showErrorToastMessage("New password is required")
          return;
        }
        if(this.confirmNewPasssord==""){
          this.showErrorToastMessage("Repeat New password is required")
          return;
        }
        if(this.newPassword!=this.confirmNewPasssord ){
          this.showErrorToastMessage(" Confirm New Password must be the same with new password")
          return;
        }
        const payload={
            oldPassword:this.oldPassword,
            newPassword:this.newPassword
        }

        this.$apiClient.post('api/v1/password/changePassword',payload).then((response)=>{
            console.log("response");
            if(response.data.status===1){
              this.showSuccessToastMessage(response.data.message)
            }else{
              this.showErrorToastMessage("Something went wrong")
            }
        }).catch((error)=>{
            console.log("error",error);
           this.showErrorToastMessage("Something went wrong")
        })
      }
  }
}
</script>

