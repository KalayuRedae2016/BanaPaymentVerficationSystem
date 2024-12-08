<template>

  
  <div>
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
      <span class="block sm:inline">{{ successToastMessage }}</span>
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
  <div
    v-if="organizationCreated === 0"
    class="loader mx-auto w-1/2 mb-16 text-cyan-500 mt-16 md:ml-32"
  ></div>
  <div v-if="organizationCreated === 1" class="p-4">
    <h1 class="text-indigo-800 font-bold">Details</h1>
  </div>


  <div
    v-if="organizationCreated === 1 || organizationCreated === 2"
    class="container flex-col mb-96 bg-white border-t border-indigo-800 -mt-1"
  >
  <div v-if="organizationCreated === 1" class="flex flex-wrap mx-auto p-4">
  <div class="w-full  py-8 -mt-8">
    <div class="flex flex-col md:flex-row md:items-center">
      <div class="flex-grow border-t-2 border-b-2 border-blue-500 p-3 shadow-lg rounded-lg bg-white">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-8">
          <div class="flex flex-col">
            <p class="flex flex-row text-xs mb-2 text-gray-800">
              <span class="w-1/2 lg:w-2/3  ">{{ $t("compName") }}:</span>
              <span class="w-1/3 text-gray-500">{{ companyProfile.companyName }}</span>
            </p>
            <p class="flex flex-row text-xs mb-2 text-gray-800 ">
              <span class="w-1/2 lg:w-2/3 ">{{ $t("compPrefixCode") }}:</span>
              <span class="w-1/3 text-gray-500">{{ companyProfile.companyPrefixCode }}</span>
            </p>
            <p class="flex flex-row text-xs mb-2 text-gray-800 space-x-1">
              <span class="w-1/2 lg:w-2/3  ">{{ $t("companyPhoneNumber") }}:</span>
              <span class="w-1/3 text-gray-500">{{ companyProfile.companyPhoneNumber }}</span>
            </p>
            <p class="flex flex-row text-xs mb-2 text-gray-800 space-x-1">
              <span class="w-1/2 lg:w-2/3    ">{{ $t("compEmail") }}:</span>
              <span class="w-1/2 lg:w-1/3 text-gray-500">{{ companyProfile.companyEmail }}</span>
            </p>
            <p class="flex flex-row text-xs mb-2 text-gray-800 space-x-1">
              <span class="w-1/2 lg:w-2/3  ">{{ $t("compAddress") }}:</span>
              <span class="w-1/2 lg:w-1/3  text-gray-500">{{ companyProfile.companyAddress }}</span>
            </p>
          </div>
        
        </div>

        <div class="font-bold text-lg mt-4 mb-2 divide-y divide-dashed">
          <p class="text-indigo-500 mb-3 mt-4">{{ $t("blockAccounts") }}</p>
          <div class="mt-5">
            <table class="w-full border border-gray-300">
              <thead>
                <tr class="bg-gray-200">
                  <th class="w-1/2 p-3 text-xs tracking-wide text-left text-indigo-800">{{ $t("bankType") }}</th>
                  <th class="w-1/2 p-3 text-xs tracking-wide text-left text-indigo-800">{{ $t("bankAccountNumber") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="account in companyProfile.blockBankAccounts" :key="account._id">
                  <td class="p-3 text-xs text-gray-700 whitespace-nowrap">
                    <span class="p-1.5 text-xs font-medium tracking-wider text-gray-800 rounded-lg bg-gray-200">{{ account.bankType }}</span>
                  </td>
                  <td class="p-3 text-xs text-gray-700 whitespace-nowrap">{{ account.bankAccountNumber }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="font-bold text-xs mt-10 mb-4 divide-y divide-dashed text-indigo-500">
                 {{ $t("serviceAccounts") }}
            <div class="mt-5">
              <table class="w-full border border-gray-300">
                <thead>
                  <tr class="bg-gray-200">
                    <th class="w-1/2 p-3 text-xs tracking-wide text-left text-indigo-800">{{ $t("bankType") }}</th>
                    <th class="w-1/2 p-3 text-xs tracking-wide text-left text-indigo-800">{{ $t("bankAccountNumber") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="account in companyProfile.serviceBankAccounts" :key="account._id">
                    <td class="p-3 text-xs text-gray-700 whitespace-nowrap">
                      <span class="p-1.5 text-xs font-medium tracking-wider text-gray-800 rounded-lg bg-gray-200">{{ account.bankType }}</span>
                    </td>
                    <td class="p-3 text-xs text-gray-700 whitespace-nowrap">{{ account.bankAccountNumber }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="flex mt-5 ">
            <button class="bg-white text-blue-500 hover:bg-blue-100 rounded-full p-2" @click="goToEditPage()">
              <i class="fas fa-edit" ><span class="text-xxs ">Edit</span></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>





    <new-company-profile v-if="organizationCreated === 2"></new-company-profile>
  </div>
</div>
</template>

<script>
import newCompanyProfile from "./newCompaneySettings.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    newCompanyProfile,
  },

  name: "paymentsView",
  data() {
    return {
     successToastMessage:"",
     errorToastMessage:"",
     showErrorToast:false,
     showSuccessToast:false,


      loading: true,
      companyProfile: {
        companyName: "",
        companyPhoneNumber: "",
        companyEmail: "",
        companyAddress: "",
        companyPrefixCode: "",
        blockBankAccounts: [{ bankAccountNumber: "", bankType: "" }],
        serviceBankAccounts: [{ bankAccountNumber: "", bankType: "" }],
      },
      showModal: false,
      organizationCreated: 0,
    };
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
      console.log("the locale", this.getLocale);
      return this.getLocale;
    },
  },
  mounted() {
    if (this.$route.query.fromEmpty === 'true') {
    
     this.showSuccessToastMessage("Your Company Profile Creeated Successfully");
      setTimeout(() => {
        this.$router.push({
      path: `/admindashboard/display-companey`
         });
      }, 2000);
    }
    this.$apiClient
      .get("/api/v1/organization")
      .then((response) => {
        console.log("Org response", response);
        if (response.data.status === 1) {
          if (response.data.organization.length ==0) {
            this.organizationCreated = 2;
            return;
          }
          this.companyProfile = response.data.organization;
          this.organizationCreated = 1;
          console.log("cretaed");
        }
      }) 
      .catch((error) => {
        console.log("Error", error);
        this.organizationCreated = 0;
      });
  },
  methods: {
    showSuccessToastMessage(message) {
    //  alert(message);
      console.log("message", message);
      this.successToastMessage = message
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
    localee() {
      console.log("locale", this.getLocale);
    },
    addBank() {
      this.banks.push({ bankAccount: "", bankType: "" });
    },
    removeBank(index) {
      this.banks.splice(index, 1);
    },

    goToEditPage() {
      this.$router.push("edit-companey");
    },

    addBankService() {
      this.banksServices.push({ bankAccount: "", bankType: "" });
    },
    removeBankService(index) {
      this.banksServices.splice(index, 1);
    },
  },
};
</script>
<style>
.loader {
  --d: 15px;
  width: 2px;
  height: 2px;
  border-radius: 25%;
  color: #687762;
  box-shadow: calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
    calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
    calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
    calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px;
  animation: l27 1s infinite steps(8);
}

.fade-enter-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
