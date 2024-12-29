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
        class="z-20 fixed right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
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
        class="z-20 fixed right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <new-company-profile
        v-if="organizationCreated === 2"
      ></new-company-profile>
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
      successToastMessage: "",
      errorToastMessage: "",
      showErrorToast: false,
      showSuccessToast: false,

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
    if (this.$route.query.fromEmpty === "true") {
      this.showSuccessToastMessage(
        "Your Company Profile Creeated Successfully"
      );
      setTimeout(() => {
        this.$router.push({
          path: `/admindashboard/display-companey`,
        });
      }, 2000);
    }
    this.$apiClient
      .get("/api/v1/organization")
      .then((response) => {
        console.log("Org response ", response);
        if (response.data.status === 1) {
          if (response.data.organization.length == 0) {
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
