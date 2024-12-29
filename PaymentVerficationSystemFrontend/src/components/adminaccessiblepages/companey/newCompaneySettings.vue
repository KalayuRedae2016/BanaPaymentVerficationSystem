<template>
  <div class="container flex-col">
    <Toasst ref="toast" />
    <div class="px-4 py-2">
      <h2 class="text-md font-bold mt-2 text-indigo-800 font-bold">
        {{ $t("companyProfile") }}
      </h2>
    </div>

    <div
      class="border-t border-indigo-50 mt-1 py-4 md:border-t md:border-indigo-800 px-4"
    >
      <form
        @submit.prevent="insertCompanyProfile()"
        class="border border-gray-300 rounded-lg py-5"
      >
        <div
          class="flex flex-col ml-5 mr-5 md:flex-row md:space-x-8 md: mr-8 md:ml-8"
        >
          <div class="flex flex-col w-full md:w-1/2">
            <div class="mb-4">
              <label class="custom-label" for="username">
                {{ $t("compName") }} 
              </label>
              <input
                class="custom-input"
                id="comp-name"
                type="text"
                :placeholder="$t('compName')"
                v-model="companyName"
              />
      
            </div>

            <div class="mb-4">
              <label class="custom-label" for="username">
                {{ $t("compPhoneNumber")
                }}<span class="text-red-500 ml-1">*</span>
              </label>
              <input
                class="custom-input"
                id="phone-nu,ber"
                type="text"
                :placeholder="$t('compPhoneNumber')"
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
              <label class="custom-label" for="comp-address">
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
              <label class="custom-label" for="prifex-code">
                {{ $t("compPrefixCode")
                }}<span class="text-red-500 ml-1">*</span>
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

        <div class="rounded-lg mx-3 px-3 py-3 mt-5">
          <label class="custom-label">
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
                <select v-model="bank.bankType" class="custom-select mb-5">
                  <option value="" disabled>{{ $t("selectBankType") }}</option>
                  <option value="CBE">{{ $t("CBE") }}</option>
                  <option value="WEGAGEN">{{ $t("WEGAGEN") }}</option>
                  <option value="LIB">{{ $t("LIB") }}</option>
                  <option value="DASHEN">{{ $t("DASHEN") }}</option>
                  <option value="OROMIA">{{ $t("OROMIA") }}</option>
                  <option value="ABYSSINIA">{{ $t("ABYSSINIA") }}</option>
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
        <div class="rounded-lg-lg mx-3 px-3 py-3 mt-5">
          <label class="custom-label">
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
                <select v-model="bank.bankType" class="custom-select mb-5">
                  <option value="" disabled>{{ $t("selectBankType") }}</option>
                  <option value="CBE">{{ $t("CBE") }}</option>
                  <option value="WEGAGEN">{{ $t("WEGAGEN") }}</option>
                  <option value="LIB">{{ $t("LIB") }}</option>
                  <option value="DASHEN">{{ $t("DASHEN") }}</option>
                  <option value="OROMIA">{{ $t("OROMIA") }}</option>
                  <option value="ABYSSINIA">{{ $t("ABYSSINIA") }}</option>
                </select>
                <input
                  type="text"
                  v-model="bank.bankAccountNumber"
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
             <div class="mx-8 my-5">
              <p  v-if="companyPrefixCodeIsRequired" class="text-red-500 text-xs">Prefix Code is required</p>
              <p  v-if="companyEmailIsRequired" class="text-red-500 text-xs">Email is required</p>
              <p  v-if="companyAddressIsRequired" class="text-red-500 text-xs">Address is required</p>
              <p  v-if="companyPhoneNumberIsRequired" class="text-red-500 text-xs">Phone Number is required</p>
              <p  v-if="companyNameIsRequired" class="text-red-500 text-xs">Compnay Name is required</p>
              <p  v-if="showError" class="text-red-500 text-xs">{{ errorMessage}}</p>
            
            </div>
        <button type="submit" class="custom-button ml-6 mr-3">
          <i class="fa fa-arrow-right"></i> {{ $t("submit") }}
        </button>
      </form>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Toast from "../../Common/Toast.vue";
export default {
  name: "paymentsView",
  components: {
    Toast,
  },
  data() {
    return {
      successToastMessage: "",
      errorToastMessage: "",
      showErrorToast: false,
      showSuccessToast: false,

      showError: false,
      showWarning: false,
      warningMessage: "",
      errorMessage: "",
      successMessage: "",
      isInputFocused: false,
      isInputFocused1: false,
      isInputFocused2: false,
      isInputFocused3: false,
      isInputFocused4: false,

      companyNameIsRequired: false,
      companyPhoneNumberIsRequired: false,
      companyEmailIsRequired: false,
      companyPrefixCodeIsRequired: false,
      companyAddressIsRequired: false,
      blockBankAccountsAreRequired: false,
      serviceBankAccountsAreRequired: false,

      createdSuccessfully: false,
      companyName: "",
      companyPhoneNumber: "",
      companyEmail: "",
      companyPrefixCode: "",
      blockBankAccounts: [{ bankType: "", bankAccountNumber: "" }],
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
      this.companyNameIsRequired = false;
      this.companyEmailIsRequired = false;
      this.companyPhoneNumberIsRequired = false;
      this.companyAddressIsRequired = false;
      this.companyPrefixCodeIsRequired = false;

      if (this.companyName ==="" || this.companyName === null) {
        
        //alert("hii");

        this.companyNameIsRequired=true;
        return;
      }
      if (this.companyPhoneNumber ==="" || this.companyPhoneNumber === null) {
        this.companyPhoneNumberIsRequired=true;
        return;
      }
      
      if (this.companyEmail ==="" || this.companyEmail === null) {
        this.companyEmailIsRequired=true;
        return;
      }



      if ((this.companyAddress ==="" || this.companyAddress === null)) {
          this.companyAddressIsRequired=true;
          return;
      }

      if (this.companyPrefixCode == "" || this.companyPrefixCode === null) {
        this.companyPrefixCodeIsRequired=true;
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
          if (Number(response.data.status) === 1) {
            this.$router.push("/admindashboard/empty-companey");
          } else {
            this.showErrorToastMessage("Something went wrong");
          }
        })
        .catch((error) => {
          if(error.response.data){
            this.showError=true;
            this.errorMessage = error.response.data.message;
          }
          console.log(error);
        });
    },

    addBlockBankAccount() {
      this.blockBankAccounts.push({ bankAccountNumber: "", bankType: "" });
    },
    removeBlockBankAccount(index) {
      this.blockBankAccounts.splice(index, 1);
    },

    addServiceBankAccount() {
      this.serviceBankAccounts.push({ bankAccountNumber: "", bankType: "" });
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
