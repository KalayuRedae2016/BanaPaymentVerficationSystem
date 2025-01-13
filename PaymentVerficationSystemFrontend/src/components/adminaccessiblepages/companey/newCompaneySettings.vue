<template>
  <div class="container flex-col">


    <Toast ref="toast" />
    <LoadingSpinner :visible="isLoading" />

    <div class="px-4 py-2">
      <h2 class="text-md font-bold mt-2 text-indigo-800 font-bold">
        {{ $t("companyProfile") }}
      </h2>
    </div>

    <div class="border-t border-indigo-50 mt-1 py-4 md:border-t md:border-indigo-800 px-4">
      <form @submit.prevent="insertCompanyProfile()" class="border border-gray-300 rounded-lg py-5">
        <div class="flex flex-col ml-5 mr-5 md:flex-row md:space-x-8 md: mr-8 md:ml-8">
          <div class="flex flex-col w-full md:w-1/2">
            <div class="mb-4">
              <label class="custom-label" for="username">
                {{ $t("compName") }}
              </label>
              <input class="custom-input" id="comp-name" type="text" :placeholder="$t('compName')"
                v-model="companyName" />
            </div>

            <div class="mb-4">
              <label class="custom-label" for="username">
                {{ $t("compPhoneNumber")
                }}<span class="text-red-500 ml-1">*</span>
              </label>
              <input class="custom-input" id="phone-nu,ber" type="text" :placeholder="$t('compPhoneNumber')"
                v-model="companyPhoneNumber" />
            </div>

            <div class="mb-4">
              <label class="custom-label" for="email">
                {{ $t("compEmail") }}<span class="text-red-500 ml-1">*</span>
              </label>
              <input class="custom-input" id="email" type="text" :placeholder="$t('compEmail')"
                v-model="companyEmail" />
            </div>
          </div>
          <div class="flex flex-col w-full md:w-1/2">
            <div class="mb-4">
              <label class="custom-label" for="comp-address">
                {{ $t("compAddress") }}<span class="text-red-500 ml-1">*</span>
              </label>
              <input class="custom-input" id="comp-address" type="text" :placeholder="$t('compAddress')"
                v-model="companyAddress" />
            </div>
            <div class="mb-4">
              <label class="custom-label" for="prifex-code">
                {{ $t("compPrefixCode")
                }}<span class="text-red-500 ml-1">*</span>
              </label>
              <input class="custom-input" id="prifex-code" type="text" :placeholder="$t('compPrefixCode')"
                v-model="companyPrefixCode" />
            </div>
          </div>
        </div>

        <div class="rounded-lg mx-3 px-3 py-3 mt-5 ">


          <label class="custom-label mb-5">
            {{ $t("blockAccounts") }}
          </label>

          <div v-if="blockBankAccounts.length > 0" class="border border-blue-500 p-4 rounded-lg">

            <div class="border border-blue-300 rounded-lg p-2 mb-1 w-full bg-blue-50"
              v-for="(bank, index) in blockBankAccounts" :key="index">
              <div v-if="bank.bankType !== '' && bank.bankAccountNumber !== ''"
                class="flex flex-row justify-between items-center">
                <!-- Bank Type -->
                <div class="flex flex-row w-3/4 lg:flex-row space-x-12">
                  <p class=" font-medium w-1/2 text-blue-800">{{ bank.bankType }}</p>
                  <p class="text-blue-800 w-1/2">{{ bank.bankAccountNumber }}</p>
                </div>

                <!-- Remove Icon -->
                <button @click="removeBlockBankAccount(index)"
                  class="w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700">
                  <i class="fa fa-times"></i>
                </button>
              </div>

            </div>

          </div>
          <p class="text-red-500 m-5 text-xs" v-if="blockBankTypeIsRequired">{{ errorMessage }}</p>
          <p class="text-red-500 m-5 text-xs" v-if="blockBankAccountNumberIsRequired">{{ errorMessage }}</p>
          <p class="text-red-500 m-5 text-xs" v-if="blockBankExist">{{ errorMessage }}</p>


          <div>
            <div class="flex flex-row">
              <div class="flex flex-row w-full space-x-3 mt-5">
                <select v-model="blockBankType" class="custom-select" @change="checkOther(blockBankType)">
                  <option value="" disabled>{{ $t("selectBankType") }}</option>
                  <option v-for="(bank, index) in availableBlockBanks" :key="index" :value="bank">{{ bank }}</option>
                  <option value="other">{{ $t("other") }}</option>
                </select>
                <input type="text" v-model="blockBankAccountNumber" :placeholder="$t('bankAccountNumber')"
                  class="custom-input" />

                <button class="custom-button h-10 mt-2 flex items-center justify-center w-full md:w-auto"
                  @click.prevent="pushBlockAccount(blockBankType, blockBankAccountNumber)">
                  <i class="fa fa-plus mr-2"></i> Add
                </button>
              </div>
            </div>
          </div>
        </div>


        <hr class="mx-5 border border-blue-300">

        <div class="rounded-lg mx-3 px-3 py-3 mt-5 ">
          <label class="custom-label mb-5">
            {{ $t("serviceAccounts") }}

          </label>

          <div v-if="serviceBankAccounts.length > 0" class="border border-gray-300 p-4 rounded-lg">
            <div class="border border-blue-300 rounded-lg p-2 mb-1 w-full bg-blue-50"
              v-for="(bank, index) in serviceBankAccounts" :key="index">
              <div v-if="bank.bankType !== '' && bank.bankAccountNumber !== ''"
                class="flex flex-row justify-between items-center">
                <!-- Bank Type -->
                <div class="flex flex-row w-3/4 lg:flex-row space-x-12">
                  <p class=" font-medium w-1/2 text-blue-800">{{ bank.bankType }}</p>
                  <p class="text-blue-800 w-1/2">{{ bank.bankAccountNumber }}</p>
                </div>

                <!-- Remove Icon -->
                <button @click="removeServiceBankAccount(index)"
                  class="w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-700">
                  <i class="fa fa-times"></i>
                </button>
              </div>

            </div>
          </div>

          <p class="text-red-500 m-5 text-xs " v-if="serviceBankTypeIsRequired">{{ errorMessage }}</p>
          <p class="text-red-500 m-5 text-xs" v-if="serviceBankAccountNumberIsRequired">{{ errorMessage }}</p>
          <p class="text-red-500 m-5 text-xs" v-if="serviceBankExist">{{ errorMessage }}</p>

          <div>
            <div class="flex flex-row">
              <div class="flex flex-row w-full space-x-3 mt-5">
                <select v-model="serviceBankType" class="custom-select" @change="checkOtherService(serviceBankType)">
                  <option value="" disabled>{{ $t("selectBankType") }}</option>
                  <option v-for="(bank, index) in availableServiceBanks" :key="index" :value="bank">{{ bank }}</option>
                  <option value="other">{{ $t("other") }}</option>
                </select>
                <input type="text" v-model="serviceBankAccountNumber" :placeholder="$t('bankAccountNumber')"
                  class="custom-input" />

                <button class="custom-button h-10 mt-2 flex items-center justify-center w-full md:w-auto"
                  @click.prevent="pushServiceAccount(serviceBankType, serviceBankAccountNumber)">
                  <i class="fa fa-plus mr-2"></i> Add
                </button>
              </div>
            </div>
          </div>
        </div>





        <div class="mx-8 my-5">
          <p v-if="companyPrefixCodeIsRequired" class="text-red-500 text-xs">
            Prefix Code is required
          </p>
          <p v-if="companyEmailIsRequired" class="text-red-500 text-xs">
            Email is required
          </p>
          <p v-if="companyAddressIsRequired" class="text-red-500 text-xs">
            Address is required
          </p>
          <p v-if="companyPhoneNumberIsRequired" class="text-red-500 text-xs">
            Phone Number is required
          </p>
          <p v-if="companyNameIsRequired" class="text-red-500 text-xs">
            Compnay Name is required
          </p>
          <p v-if="showError" class="text-red-500 text-xs">
            {{ errorMessage }}
          </p>
        </div>
        <button type="submit" class="custom-button ml-6 mr-3">
          <i class="fa fa-arrow-right"></i> {{ $t("save") }}
        </button>
      </form>
    </div>


    <div v-if="otherBlockSelected">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-25">
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 ">
                <div class="flex flex-row space-x-16 lg:space-x-64">
                  <h1 class="mb-5 text-indigo-800 text-md font-bold">
                    {{ $t("addBlockAccount") }}
                  </h1>
                  <svg @click="otherBlockSelected = !otherBlockSelected; blockBankType = ''"
                    class="w-8 h-10 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <form action="" class="">
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankName") }}
                    </label>
                    <input class="custom-input" id="bank-name" type="text" :placeholder="$t('bankType')"
                      v-model="newBlockBankType" />
                  </div>
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankAccountNumber") }}
                    </label>
                    <input class="custom-input" id="comp-name" type="text" :placeholder="$t('bankAccountNumber')"
                      v-model="newBlockBankAccountNumber" />
                  </div>


                  <p v-if="newBlockBankExist" class="text-red-500 my-3 my-3">Bank is already exist</p>
                  <p v-if="newBlockBankTypeIsRequired" class="text-red-500 my-3 text-xs">{{ errorMessage }}</p>
                  <p v-if="newBlockBankAccountNumberIsRequired" class="text-red-500 my-3 text-xs">{{ errorMessage }}</p>


                  <button @click.prevent="pushNewBlockAccount(newBlockBankType, newBlockBankAccountNumber)"
                    class="custom-button bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2">
                    <i class="fa fa-plus"></i>
                    <span>{{ $t("add") }}</span>
                  </button>
                </form>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
    <div v-if="otherServiceSelected">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-25">
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 ">
                <div class="flex flex-row space-x-16 lg:space-x-64">
                  <h1 class="mb-5 text-indigo-800 text-md font-bold">
                    {{ $t("addServiceAccount") }}
                  </h1>
                  <svg @click="otherServiceSelected = !otherServiceSelected; serviceBankType = ''"
                    class="w-8 h-10 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <form action="" class="">
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankName") }}
                    </label>
                    <input class="custom-input" id="bank-name" type="text" :placeholder="$t('bankType')"
                      v-model="newServiceBankType" />
                  </div>
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankAccountNumber") }}
                    </label>
                    <input class="custom-input" id="comp-name" type="text" :placeholder="$t('bankAccountNumber')"
                      v-model="newServiceBankAccountNumber" />
                  </div>


                  <p v-if="newServiceBankExist" class="text-red-500 my-3 my-3">Bank is already exist</p>
                  <p v-if="newServiceBankTypeIsRequired" class="text-red-500 my-3 text-xs">{{ errorMessage }}</p>
                  <p v-if="newServiceBankAccountNumberIsRequired" class="text-red-500 my-3 text-xs">{{ errorMessage }}
                  </p>


                  <button @click.prevent="pushNewServiceAccount(newServiceBankType, newServiceBankAccountNumber)"
                    class="custom-button bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2">
                    <i class="fa fa-plus"></i>
                    <span>{{ $t("add") }}</span>
                  </button>
                </form>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
  </div>

</template>

<script>

import Toast from "../../Common/Toast.vue";
import LoadingSpinner from '../../Common/LoadingSpinner.vue';

export default {

  name: "paymentsView",
  components: {
    Toast,
    LoadingSpinner,
  },
  props: ['companyProfile', 'organizationCreated'],
  data() {
    return {
      companyProfile: '',
      isLoading: false,
      toastMessage:"",

      //start status for block
      blockBankTypeIsRequired: false,
      blockBankAccountNumberIsRequired: false,
      newBlockBankTypeIsRequired: false,
      newBlockBankAccountNumberIsRequired: false,
      otherBlockSelected: false,
      blockBankExist: false,
      newBlockBankExist: false,
      showOtherForm: false,

      //end of status for block


      //start for service
      serviceBankTypeIsRequired: false,
      serviceBankAccountNumberIsRequired: false,
      newServiceBankTypeIsRequired: false,
      newServiceBankAccountNumberIsRequired: false,
      otherServiceSelected: false,
      serviceBankExist: false,
      newServiceBankExist: false,
      showOtherServiceForm: false,
      //end status for service


      blockBankType: "",
      blockBankAccountNumber: "",
      newBlockBankType: '',
      newBlockBankAccountNumber: "",

      serviceBankType: "",
      serviceBankAccountNumber: "",
      newServiceBankType: '',
      newServiceBankAccountNumber: "",



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
      blockBankAccounts: [],
      serviceBankAccounts: [],
      companyAddress: "",
      paymentType: "block",
      days: Array.from({ length: 31 }, (_, i) => i + 1),

      availableBlockBanks: [
        'CBE', 'LIB', 'WEGAGEN', 'HBRET', 'OROMIA', 'DASHEN', 'SNKE', 'ENAT', 'AHADU', 'AWASH'
      ],
      availableServiceBanks: [
        'CBE', 'LIB', 'WEGAGEN', 'HBRET', 'OROMIA', 'DASHEN', 'SNKE', 'ENAT', 'AHADU', 'AWASH'
      ]

    };
  },
  methods: {
    updateParentData() {
      this.$emit('update-organization', {
        companyProfile: this.companyProfile,
        organizationCreated: 1,
        toastMessage:this.toastMessage,
      });
    },
    removeServiceBankAccount(index) {
      this.newServiceBankExist = false;
      this.serviceBankExist = false;
      this.showError = false;
      this.serviceBankAccounts.splice(index, 1);
    },
    pushServiceAccount(serviceBankType, serviceBankAccountNumber) {
      this.serviceBankTypeIsRequired = false;
      this.serviceBankAccountNumberIsRequired = false;
      this.serviceBankExist = false;
      this.showError = false;
      this.errorMessage = "";


      if (!serviceBankType) {
        this.serviceBankTypeIsRequired = true;
        this.errorMessage = "Please Select a Service Bank Type"
        return;
      }


      if (!serviceBankAccountNumber) {
        this.serviceBankAccountNumberIsRequired = true;
        this.errorMessage = "Service Bank Account Number Is Required";
        return;
      }

      const isBankTypePresent = this.serviceBankAccounts.some(
        (account) => account.bankType === serviceBankType
      );

      if (isBankTypePresent) {
        // Set error message and flag if bank type exists
        this.serviceBankExist = true;
        this.errorMessage = "Bank is already added";
      } else {
        // Add new bank type and reset error state
        this.serviceBankAccounts.push({
          bankType: serviceBankType,
          bankAccountNumber: serviceBankAccountNumber,
        });
        this.showError = false;
        this.errorMessage = "";

      }
    },
    pushNewServiceAccount(serviceBankType, serviceBankAccountNumber) {

      this.newServiceBankTypeIsRequired = false;
      this.newServiceBankAccountNumberIsRequired = false;
      this.newServiceBankExist = false;
      this.errorMessage = "";

      if (!serviceBankType) {
        this.newServiceBankTypeIsRequired = true;
        this.errorMessage = "New Service Bank Type Is Required"
        return;
      }

      if (!serviceBankAccountNumber) {
        this.newServiceBankAccountNumberIsRequired = true;
        this.errorMessage = "New Bank Account Number Is Required";
        return;
      }


      // Check if the bank type already exists
      const isBankTypePresent = this.serviceBankAccounts.some(
        (account) => account.bankType.toLowerCase() === serviceBankType.toLowerCase()
      );


      if (isBankTypePresent) {
        // Set error message and flag if bank type exists
        this.newServiceBankExist = true;
        this.errorMessage = "Bank is already Exist";
      } else {
        // Add new bank type and reset error state
        this.otherServiceSelected = false;
        this.serviceBankAccounts.push({
          bankType: serviceBankType,
          bankAccountNumber: serviceBankAccountNumber,
        });
        this.showError = false;
        this.errorMessage = "";
      }
    },
    checkOtherService(bankType) {
      if (bankType == "other") {
        this.serviceBankType = '',
          this.serviceBankAccountNumber = '',
          this.serviceBankExist = false;
        this.otherServiceSelected = true;
      }
    },
    removeBlockBankAccount(index) {
      this.newBlockBankExist = false;
      this.blockBankExist = false;
      this.showError = false;

      this.blockBankAccounts.splice(index, 1);
    },
    pushBlockAccount(blockBankType, blockBankAccountNumber) {

      // alert(blockBankAccountNumber)

      this.blockBankTypeIsRequired = false;
      this.blockBankAccountNumberIsRequired = false;
      this.blockBankExist = false;
      this.showError = false;
      this.errorMessage = "";


      if (!blockBankType) {
        this.blockBankTypeIsRequired = true;
        this.errorMessage = "Please Select a Block Bank Type"
        return;
      }


      if (!blockBankAccountNumber) {
        this.blockBankAccountNumberIsRequired = true;
        this.errorMessage = "Block Bank Account Number Is Required";
        return;
      }




      const isBankTypePresent = this.blockBankAccounts.some(
        (account) => account.bankType === blockBankType
      );

      if (isBankTypePresent) {
        // Set error message and flag if bank type exists
        this.blockBankExist = true;
        this.errorMessage = "Bank is already added";
      } else {
        // Add new bank type and reset error state
        this.blockBankAccounts.push({
          bankType: blockBankType,
          bankAccountNumber: blockBankAccountNumber,
        });
        this.showError = false;
        this.errorMessage = "";


      }
    },
    pushNewBlockAccount(blockBankType, blockBankAccountNumber) {

      this.newBlockBankTypeIsRequired = false;
      this.newBlockBankAccountNumberIsRequired = false;
      this.newBlockBankExist = false;
      this.errorMessage = "";


      if (!blockBankType) {
        this.newBlockBankTypeIsRequired = true;
        this.errorMessage = "New Block Bank Type Is Required"
        return;
      }

      if (!blockBankAccountNumber) {
        this.newBlockBankAccountNumberIsRequired = true;
        this.errorMessage = "New Bank Account Number Is Required";
        return;
      }




      // Check if the bank type already exists
      const isBankTypePresent = this.blockBankAccounts.some(
        (account) => account.bankType.toLowerCase() === blockBankType.toLowerCase()
      );


      if (isBankTypePresent) {
        // Set error message and flag if bank type exists
        this.newBlockBankExist = true;
        this.errorMessage = "Bank is already Exist";
      } else {
        // Add new bank type and reset error state
        this.otherBlockSelected = false;
        this.blockBankAccounts.push({
          bankType: blockBankType,
          bankAccountNumber: blockBankAccountNumber,
        });
        this.showError = false;
        this.errorMessage = "";
      }
    },
    checkOther(bankType) {
      if (bankType == "other") {
        this.blockBankType = '',
          this.blockbBankAccountNumber = '',
          this.blockBankExist = false;
        this.otherBlockSelected = true;
      }
    },
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

      if (this.companyName === "" || this.companyName === null) {

        this.companyNameIsRequired = true;
        return;
      }
      if (this.companyPhoneNumber === "" || this.companyPhoneNumber === null) {
        this.companyPhoneNumberIsRequired = true;
        return;
      }

      if (this.companyEmail === "" || this.companyEmail === null) {
        this.companyEmailIsRequired = true;
        return;
      }

      if (this.companyAddress === "" || this.companyAddress === null) {
        this.companyAddressIsRequired = true;
        return;
      }

      if (this.companyPrefixCode == "" || this.companyPrefixCode === null) {
        this.companyPrefixCodeIsRequired = true;
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
      this.isLoading = true;
      try {
        this.$apiPost("/api/v1/organization", companeyProfileData)
          .then((response) => {
            console.log("response from creatinghhh", response);
            if (response.status == 1) {
              this.isLoading = false;
              this.companyProfile = response.organization;
              this.toastMessage=response.message;
              this.updateParentData();
            }
          })
      } catch (error) {
        console.log("error during insert org", error.status, error.message);
        this.showError = true;
        this.errorMessage = error.message;
      } finally {

      };
    },

    addBlockBankAccount() {

      this.blockBankAccounts.push({ bankAccountNumber: "", bankType: "" });

    },

    addServiceBankAccount() {
      this.serviceBankAccounts.push({ bankAccountNumber: "", bankType: "" });
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
  color: rgba(43, 40, 40, 0.664);
  /* Change this to your desired color */
  /* Example of additional styling */
}
</style>
