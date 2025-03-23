<template>
  <div>
    <Toast ref="toast"/>
    <!-- <div
      v-if="organizationCreated ===0"
      class="loader mx-auto w-1/2 mb-16 text-cyan-500 mt-16 md:ml-32"
    ></div> -->
    <LoadingSpinner :visible="isLoading"/>
    <div v-if="organizationCreated === 1" class="p-4">
      <h1 class="text-blue-500 font-bold">Company Details</h1>
    </div>

    <div
      v-if="organizationCreated === 1 || organizationCreated === 2"
      class="container flex-col bg-white border-t border-blue-500 -mt-1"
    >
      <div v-if="organizationCreated === 1" class="m-4 flex flex-wrap  p-4 border border-gray-300 rounded-lg">
        <div class="w-full py-8 -mt-8">
          <div class="flex flex-col md:flex-row md:items-center">
            <div
              class="flex-grow  p-3 rounded-lg bg-white"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div class="flex flex-col space-y-4">
                  <!-- Company Name -->
                  <div class="bg-white border-b border-dotted p-4 rounded-md">
                    <div class="flex items-center space-x-3">
                      <i class="fas fa-building text-indigo-500"></i>
                      <span class="font-semibold text-sm"
                        >{{ $t("compName") }}:</span
                      >
                      <span class="text-xs text-gray-800">{{
                        companyProfile.companyName
                      }}</span>
                    </div>
                  </div>

                  <!-- Company Prefix Code -->
                  <div class="bg-white border-b border-dotted p-4 rounded-md">
                    <div class="flex items-center space-x-3">
                      <i class="fas fa-code text-blue-500"></i>
                      <span class="font-semibold text-sm"
                        >{{ $t("compPrefixCode") }}:</span
                      >
                      <span class="text-xs text-gray-800">{{
                        companyProfile.companyPrefixCode
                      }}</span>
                    </div>
                  </div>

                  <!-- Phone Number -->
                  <div class="bg-white border-b border-dotted p-4 rounded-md">
                    <div class="flex items-center space-x-3">
                      <i class="fas fa-phone text-green-500"></i>
                      <span class="font-semibold text-sm"
                        >{{ $t("companyPhoneNumber") }}:</span
                      >
                      <span class="text-xs text-gray-800">{{
                        companyProfile.companyPhoneNumber
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col space-y-4">
                  <!-- Company Email -->
                  <div class="bg-white border-b border-dotted p-4 rounded-md">
                    <div class="flex items-center space-x-3">
                      <i class="fas fa-envelope text-yellow-500"></i>
                      <span class="font-semibold text-sm"
                        >{{ $t("Company Email") }}:</span
                      >
                      <span class="text-xs text-gray-800">{{
                        companyProfile.companyEmail
                      }}</span>
                    </div>
                  </div>

                  <!-- Company Address -->
                  <div class="bg-white border-b border-dotted p-4 rounded-md">
                    <div class="flex items-center space-x-3">
                      <i class="fas fa-map-marker-alt text-red-500"></i>
                      <span class="font-semibold text-sm"
                        >{{ $t("compAddress") }}:</span
                      >
                      <span class="text-xs text-gray-800">{{
                        companyProfile.companyAddress
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="font-bold text-sm  mt-4 mb-2 divide-y divide-dashed">
                <p class="text-indigo-500 mb-3 mt-4">
                  {{ $t("blockAccounts") }}
                </p>
                <div class="mt-5">
                  <table class="w-full border border-gray-300">
                    <thead>
                      <tr class="bg-gray-200">
                        <th
                          class="w-1/2 p-3 text-xs tracking-wide text-left text-indigo-800"
                        >
                          {{ $t("bankType") }}
                        </th>
                        <th
                          class="w-1/2 p-3 text-xs tracking-wide text-left text-indigo-800"
                        >
                          {{ $t("bankAccountNumber") }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr  
                        v-for="account in companyProfile.blockBankAccounts"
                        :key="account._id"
                      >
                        <td class="p-3 text-xs text-gray-700 whitespace-nowrap">
                          <i class="fas fa-university mr-3 text-purple-500"></i>
                          <span
                            class="p-1.5 text-xs  tracking-wider text-blue-500 rounded-lg bg-blue-50 font-bold"
                            >{{ account.bankType }}</span
                          >
                        </td>
                        <td class="p-3 text-xs text-gray-400 whitespace-nowrap">
                          {{ account.bankAccountNumber }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  class="font-bold text-sm  mt-10 pt-5 mb-4 divide-y divide-dashed text-indigo-500"
                >
                  {{ $t("serviceAccounts") }}
                  <div class="mt-5">
                    <table class="w-full border border-gray-300">
                      <thead>
                        <tr class="bg-gray-200">
                          <th
                            class="w-1/2 p-3 text-xs tracking-wide text-left text-indigo-800"
                          >
                            {{ $t("bankType") }}
                          </th>
                          <th
                            class="w-1/2 p-3 text-xs tracking-wide text-left text-indigo-800"
                          >
                            {{ $t("bankAccountNumber") }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="account in companyProfile.serviceBankAccounts"
                          :key="account._id"
                        >
                        <td class="p-3 text-xs text-gray-700 whitespace-nowrap">
                          <i class="fas fa-university mr-3 text-purple-500"></i>
                          <span
                            class="p-1.5 text-xs  tracking-wider text-blue-500 rounded-lg bg-blue-50 font-bold"
                            >{{ account.bankType }}</span
                          >
                        </td>
                        <td class="p-3 text-xs text-gray-400 whitespace-nowrap">
                          {{ account.bankAccountNumber }}
                        </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="flex mt-5">
                  <button
                    class="custom-button"
                    @click="goToEditPage()"
                  >
                    <i class="fas fa-edit mr-2"
                      ></i
                    >Edit
                  </button>

                  <button
                    class="ml-3 custom-button"
                    @click="deleteModal=true"
                  >
                    <i class="fas fa-trash-alt  text-red-500 mr-2"
                      ></i
                    >Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <new-company-profile
        v-if="organizationCreated === 2"
        :companyProfile="companyProfile" 
       :organizationCreated="organizationCreated" 
       @update-organization="handleUpdate"
      ></new-company-profile>


    </div>

    <div v-if="deleteModal">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500 w-96">
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
                  d="M12 9v6m0 0v-6m0 6h6m-6 0H6"
                ></path>
              </svg>
              <h2 class="text-2xl font-bold text-gray-800">
                {{ $t("warning") }}
              </h2>
            </div>


            <p class="text-gray-600 text-lg">
              {{ $t("Do you want to delete the organization") }}
            </p>

            <div class="mt-6 flex space-x-5">
              <button
                @click="deleteOrg()"
                class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {{ $t("yes") }}
              </button>
              <button
                @click="deleteModal = false"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {{ $t("Cancel") }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

  
</template>

<script>
import newCompanyProfile from "./newCompaneySettings.vue";
import { mapGetters } from "vuex";
import LoadingSpinner from '../../Common/LoadingSpinner.vue';
import Toast from '../../Common/Toast.vue'
export default {

  components: {
    newCompanyProfile,
    LoadingSpinner,
    Toast,
  },

  name: "paymentsView",

  data() {
    return {
      deleteModal:false,
      successToastMessage: "",
      errorToastMessage: "",
      showErrorToast: false,
      showSuccessToast: false,

      loading: true,
      isLoading:false,

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


 async  mounted() {
  this.$store.dispatch("commitActiveItem", { activeItem: 'companyProfile' });
    if (this.$route.query.fromEmpty === "true") {
      this.$refs.toast.showSuccessToastMessage(
        "Your Company Profile Creeated Successfully"
      );
      setTimeout(() => {
        this.$router.push({
          path: `/admindashboard/display-companey`,
        });
      }, 2000);
    }


   this.isLoading = true;

   try {
        await this.$apiGet('/api/v1/organization').then((response) => {
        if (response.status === 1) {
          console.log("from org response",response)
          this.isLoading = false;
          if (response.organization.length == 0) {
            this.organizationCreated = 2;
            return;
          }
          this.companyProfile = response.organization;
          this.organizationCreated = 1;
          console.log("cretaed");
        }
      })
     } catch(error) {
        console.log("Error from the organization", error);
        this.organizationCreated = 2;
        this.isLoading = false;
      }finally{

      }
  },

  methods: {

  deleteOrg(){
    try{
      this.$apiDelete('/api/v1/organization','','').then((response)=>{
      console.log("response",response);
      this.$refs.toast.showSuccessToastMessage("Org Delated Successfully");
      this.$reloadPage();
      });
    }catch(error){
      this.$refs.toast.showErrorToastMessage(error.message);
      console.log("error status,error message",error.status,error.message)
    }finally{

    }
    },

    handleUpdate(data) {
      this.companyProfile = data.companyProfile;
      this.organizationCreated = data.organizationCreated;
      this.$refs.toast.showSuccessToastMessage(data.toastMessage);
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
