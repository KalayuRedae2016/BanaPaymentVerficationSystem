<template>
  <div class="container flex-col">
    <div class="px-4 py-2">
      <h2 class="text-md font-bold mt-2 text-indigo-800 font-bold">
        Companey Profile {{ $t("companyProfile") }}
      </h2>
    </div>
    <div
      class="border-t border-indigo-50 mt-1 py-4 md:border-t md:border-indigo-800 "
    >
      <form
        @submit.prevent="insertCompanyProfile()"
        class=""
      >
    <div class="flex flex-col ml-5 mr-5 md:flex-row md:space-x-8 md: mr-8  md:ml-8">
      <div class="flex flex-col w-full md:w-1/2">
        <div class="mb-4">
          <label class="custom-label" for="username"> {{ $t("compName") }} </label>
          <input
            class="custom-input"
            id="comp-name"
            type="text"
            :placeholder=" $t('compName')"
            v-model="companyName"
          />
        </div>

        <div class="mb-4">
          <label class="custom-label" for="username">
            {{ $t("compPhoneNumber") }}<span class="text-red-500 ml-1">*</span>
          </label>
          <input
            class="custom-input"
            id="phone-nu,ber"
            type="text"
            :placeholder="$t('compPhoneNumber') "
            v-model="companyPhoneNumber"
          />
        </div>

        <div class="mb-4">
          <label class="custom-label" for="email">
            {{ $t("compEmail") }}<span class="text-red-500 ml-1">*</span>
          </label>
          <input
            class="custom-input"
            id="email"
            type="text"
            :placeholder="$t('compEmail')"
            v-model="companyEmail"
          />
        </div>
      </div>
       <div class="flex flex-col w-full md:w-1/2">
        <div class="mb-4">
          <label
            class="custom-label"
            for="comp-address"
          >
          {{ $t("compAddress") }}<span class="text-red-500 ml-1">*</span>
          </label>
          <input
            class="custom-input"
            id="comp-address"
            type="text"
            :placeholder="$t('compAddress')"
            v-model="companyAddress"
          />
        </div>
        <div class="mb-4">
          <label
            class="custom-label"
            for="prifex-code"
          >
          {{ $t("compPrefixCode") }}<span class="text-red-500 ml-1">*</span>
          </label>
          <input
            class="custom-input"
            id="prifex-code"
            type="text"
            :placeholder="$t('compPrefixCode')"
            v-model="companyPrefixCode"
          />
        </div>
       </div>
  
      </div>
        

        <div class="rounded-lg-lg px-3 py-3 mt-5">
          <label
            class="custom-label"
          >
          {{ $t("blockAccounts") }}
            <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="border border-gray-300 rounded-lg">
            <div
              v-for="(bank, index) in blockBankAccounts"
              :key="index"
              class="flex flex-row"
            >
              <div class="m-4 flex flex-col w-3/4 md: flex-row">
                <select
                  v-model="bank.bankType"
                  class="custom-select mb-5"
                >
                  <option value="" disabled>{{ $t("selectBankType") }}</option>
                  <option value="CBE">{{ $t("cbe") }}</option>
                  <option value="WEGAGEN">{{ $t("wegagen") }}</option>
                  <option value="LIB">{{ $t("enat") }}</option>
                  <option value="Dashen">{{ $t("dashin") }}</option>
                  <option value="Oromia">{{ $t("oromia") }}</option>
                  <option value="Absinia">{{ $t("absinia") }}</option>
                </select>
                <input
                  type="text"
                  v-model="bank.bankAccountNumber"
                  :placeholder="$t('bankAccountNumber')"
                  class="custom-input"
                />
              </div>

              <button
                @click.prevent="removeBlockBankAccount(index)"
                class="text-pink-500 mb-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <button
              @click.prevent="addBlockBankAccount()"
              class="ml-10 mt-3 mb-5 flex items-center justify-center bg-pink-500 text-white rounded-lg-full w-6 h-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="rounded-lg-lg px-3 py-3 mt-5">
          <label
            class="custom-label"
          >
          {{ $t("serviceAccounts") }}
            <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="border border-gray-300 rounded-lg">
            <div
              v-for="(bank, index) in serviceBankAccounts"
              :key="index"
              class="flex flex-row"
            >
              <div class="m-4 flex flex-col w-3/4 md: flex-row">
                <select
                  v-model="bank.bankType"
                  class="custom-select  mb-5"
                >
                 <option value="" disabled>{{ $t("selectBankType") }}</option>
                  <option value="CBE">{{ $t("cbe") }}</option>
                  <option value="WEGAGEN">{{ $t("wegagen") }}</option>
                  <option value="LIB">{{ $t("enat") }}</option>
                  <option value="Dashen">{{ $t("dashin") }}</option>
                  <option value="Oromia">{{ $t("oromia") }}</option>
                  <option value="Absinia">{{ $t("absinia") }}</option>
                </select>
                <input
                  type="text"
                  v-model="bank. bankAccountNumber"
                  :placeholder="$t('bankAccountNumber')"
                  class="custom-input"
                />
              </div>

              <button
                @click.prevent="removeServiceBankAccount(index)"
                class="text-pink-500 mb-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <button
              @click.prevent="addServiceBankAccount()"
              class="ml-10 mt-3 mb-5 flex items-center justify-center bg-pink-500 text-white rounded-lg-full w-6 h-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          type="submit"
          class="custom-button ml-3 mr-3"
        >
        {{ $t("submit") }}
        </button>
      </form>
    </div>

    <div v-if="createdSuccessfully">
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
                  <h2 class="text-sm font-bold text-gray-800">{{ $t("suiccess") }}</h2>
                </div>
                <p class="text-gray-600 text-sm">
                  <!-- Your Comany Profile Created successfully -->
                   {{ successMessage }}
                </p>
                <button
                  @click="
                    createdSuccessfully = !createdSuccessfully;
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
              <h2 class="text-sm font-bold text-gray-800">{{ $t("warning") }}</h2>
            </div>
            <p class="text-gray-600 text-sm">
              {{ warningMessage }}
            </p>
            <button
              @click="showWarning = false"
              class="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
            {{ $t("ok") }}
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
              <h2 class="text-sm font-bold text-gray-800">{{ $t("error") }}</h2>
            </div>
            <p class="text-gray-600 text-sm">
              {{ errorMessage }}
            </p>
            <button
              @click="showError = false"
              class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
            {{ $t("ok") }}
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
import axios from "axios";
export default {
  name: "paymentsView",
  data() {
    return {
      showError:false,
      showWarning :false,
      warningMessage:"",
      errorMessage:"",
      successMessage:"",
      isInputFocused: false,
      isInputFocused1: false,
      isInputFocused2: false,
      isInputFocused3: false,
      isInputFocused4: false,


        companyNameIsRequired:false,
        companyPhoneNumberIsRequired:false,
        companyEmailIsRequired:false,
        companyPrefixCodeIsRequired:false,
        companyAddressIsRequired:false,
        blockBankAccountsAreRequired:false,
        serviceBankAccountsAreRequired:false,

      createdSuccessfully:false,
      companyName: "",
      companyPhoneNumber: "",
      companyEmail: "",
      companyPrefixCode: "",
      blockBankAccounts: [{ bankType: "",  bankAccountNumber: "" }],
      serviceBankAccounts: [
        {
          bankType: "",
           bankAccountNumber: "",
        },
      ],
      companyAddress: "",
      paymentType: "block",
      days: Array.from({ length: 31 }, (_, i) => i + 1),
    };
  },
  mounted() {
    // this.apiClient.get("/closes").then((response) => {
    //   console.log("closes", response.data);
    //   if (response.data === null) {
    //     this.closepaymentCreated = false;
    //   } else {
    //     this.closepaymentCreated = true;
    //     this.close_setting_data = response.data;
    //     for (let i = 0; i < 1; i++) {
    //       this.single_close_setting_data = this.close_setting_data[i];
    //       this.closeId = this.close_setting_data[i]._id;
    //       console.log("closeId", this.close_chargeId);
    //     }
    //   }
    // });
  },
  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });
  },

  methods: {

    
    routeToDisplay() {
      this.createdSuccessfully = false;
      this.$router.push("/admindashboard/display-companey");
     },

    insertCompanyProfile() {
     if(this.companyName===null ||this.companyPhoneNumber===null ||this.companyEmail===null ||this.companyPrefixCode===null ||this.companyAddress===null || this.blockBankAccounts.length===0 || this.serviceBankAccounts.length===0){
       this.showWarning = true;
       
       return;
     }
      const companeyProfileData = {
        companyName: this.companyName,
        companyPhoneNumber: this.companyPhoneNumber,
        companyEmail: this.companyEmail,
        companyPrefixCode: this.companyPrefixCode,
        companyAddress: this.companyAddress,
        blockBankAccounts: this.blockBankAccounts,
        serviceBankAccounts: this.serviceBankAccounts,
      };

      console.log("companey profile data", companeyProfileData);
      //  console.log("This close created=",this.closepaymentCreated);
      this.$apiClient
        .post("/api/v1/organization", companeyProfileData)
        .then((response) => {
          console.log("response", response);
          if (Number(response.data.status)===1) {
            this.createdSuccessfully = true;
            this.successMessage=response.data.message;
            this.$router.push("/admindashboard/empty-companey");
          }else{
            this.showWarning = true;
            this.warningMessage=response.data.message;
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.showError = true;
          console.log("Error in the catch",error.response.data.message);
        });

      // if (this.closepaymentCreated ===false) {
      //   //console.log("inpost");

      // } else {
      //   console.log("close data", closeData);
      //    console.log("in put");
      //   apiClient
      //     .put(`/closes/${this.closeId}`, closeData)
      //     .then((response) => {
      //       console.log("Update response", response.data);
      //       // handle the response as needed
      //     })
      //     .catch((error) => {
      //       console.log("Error updating close", error);
      //       // handle the error as needed
      //     });
      // }
    },

    addBlockBankAccount() {
      this.blockBankAccounts.push({  bankAccountNumber: "", bankType: "" });
    },
    removeBlockBankAccount(index) {
      this.blockBankAccounts.splice(index, 1);
    },

    addServiceBankAccount() {
      this.serviceBankAccounts.push({  bankAccountNumber: "", bankType: "" });
    },
    removeServiceBankAccount(index) {
      this.serviceBankAccounts.splice(index, 1);
    },
  },
};
</script>
<style>
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
.input-placeholder::placeholder {
  color: rgba(43, 40, 40, 0.664); /* Change this to your desired color */
  /* Example of additional styling */
}
</style>
