<template>
  <div class="mt-16 lg:mt-2 p-4 mx-2 mb-2 bg-white shadow-lg mb-40">
    <Toast ref="toast" />
    <div v-if="isAuthenticated" class="overflow-x-auto">
      <table class="table-auto border-b-2 border-gray-300 w-full">
        <thead class="border-b-2 border-gray-300">
          <tr>
            <th v-for="header in headers" :key="header.key"
              class="border-b border-blue-300 text-left py-2 px-3 text-blue-500">
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bank, index) in bankData" :key="bank._id" class="border-b border-gray-300 hover:bg-blue-100">
            <td class="py-2 px-3">{{ index + 1 }}</td>
            <td class="py-2 px-3">{{ bank.bankType }}</td>
            <td class="py-2 px-3">{{ bank.key }}</td>
            <td class="py-2 px-3">
              <button @click="openModal(bank)" class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                <i class="fa fa-refresh"></i>
              </button>
              <button @click="copyApiKey(bank.key)"
                class="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                <i class="fa fa-copy"></i> Copy
              </button>
            </td>

          </tr>
        </tbody>
      </table>

      <button class="custom-button m-5" @click="closeApiKeyView()">Close Api Key View</button>
    </div>

    <div v-else class="flex flex-col   min-h-screen w-full mt-8">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <div class="text-center">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Access Your API Keys</h2>
          <p class="text-gray-600 mb-6">Securely view and manage your API keys with ease.</p>
          <button @click="enterPassword = true"
            class="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300">
            View API Keys
          </button>
        </div>
      </div>

   
    </div>
    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">Confirm Regeneration</h3>
          <button @click="closeModal" class="modal-close-btn">×</button>
        </div>
        <div class="modal-body">
          <p>Do you want to regenerate the API key for "{{ currentBankName }}"?</p>
        </div>
        <div class="modal-footer">
          <button @click="regenerateApiKey" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            OK
          </button>
          <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div v-if="enterPassword" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">Api Key Password</h3>
          <button @click="enterPassword = !enterPassword" class="modal-close-btn">×</button>
        </div>
        <div class="modal-body">
          <p>Enter Api Key Password</p>
        </div>
        <input class="custom-input" type="text" v-model="apiKeyPassword">

        <p v-if="showError" class="text-red-500 ml-1 text-xs mt-3">{{ errorMessage }}</p>


        <div class="modal-footer">
          <button @click="viewApiKey" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            OK
          </button>
          <button @click="enterPassword = false" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Toast from "../../Common/Toast.vue";
export default {
  components: { Toast },
  data() {
    return {
      showError: false,
      errorMessage: "Wrong Api Password! Please insert the password again??",
      bankApiKeyToBeEdited: '',
      apiKeyPassword: "",
      enterPassword: false,
      isAuthenticated: false,
      isModalVisible: false,
      currentBankName: '',
      headers: [
        { key: "No.", label: "No." },
        { key: "Bank", label: "Bank" },
        { key: "ApiKey", label: "Bank API Key" },
        { key: "actions", label: "Actions" },
      ],
      bankData: [],
    };
  },
  mounted() {
    this.$store.dispatch("commitActiveItem", { activeItem: 'Apikeys' });
    if (this.$route.query.isAuthenticatedOpened === 'true') {
   
      if(localStorage.getItem('apiKeyPassword')!=''){
        const params = {
        password:localStorage.getItem('apiKeyPassword'),
      }
      this.isAuthenticated = true;
      this.fetchApiKeyEvenAuthenticated(params)
      
      }else{
        this.isAuthenticated = false;
        this.enterPassword=true;
      }
     
    } else {
    }
  },
  methods: {
    closeApiKeyView(){
      this.$store.dispatch("commitApiKeyPassword", { apiKeyPassword: ''});
      this.$router.push({
          path:'/admindashboard/bank-api-key',
      })
    },
    viewApiKey() {
      if (this.apiKeyPassword != '' || this.apiKeyPassword != null) {
        const params = {
          password: this.apiKeyPassword,
        }
        this.fetchApiKeyEvenAuthenticated(params); 
      }
    },
    async fetchApiKeyEvenAuthenticated(params) {
      try {
        await this.$apiGet("/api/v1/organization/apikey", params).then((response) => {
          console.log("response for the api key", response);
          this.bankData = response.data;
          console.log("bankdata", this.bankData)
          this.isAuthenticated = true;
          console.log("apiKey password",this.apiKeyPassword)
          this.$store.dispatch("commitApiKeyPassword", { apiKeyPassword: this.apiKeyPassword || localStorage.getItem("apiKeyPassword") });
        this.enterPassword=false;
        this.makeQueryTrue();
        });
      } catch (error) {
        console.log("error in the editing", error.status, error.message);
        //this.$refs.toast.showErrorToastMessage("Wrong Api Key password!!");
      this.showError=true;
      this.errorMessage="Wrong Api Key password!!"
      } finally {
        this.isLoading = false;
      }
    },

    makeQueryTrue(){
      this.$router.push({
          path:'/admindashboard/bank-api-key',
          query:{
            isAuthenticatedOpened:true,
          }
        })
    },
    async regenerateApiKey() {
      this.isModalVisible=false;
      const payload = {
        password: localStorage.getItem('apiKeyPassword'),
      }

      console.log("payload", payload);
      try {
        await this.$apiPatch(
          "/api/v1/organization/apikey",
          this.bankApiKeyToBeEdited,
          payload
        ).then((response) => {
          console.log("generated response", response);
          this.$refs.toast.showSuccessToastMessage("Key Regenerated Succussfully");
          this.$reloadPage()
        });
      } catch (error) {
        console.log("error in the editing", error.status, error.message);
        this.$refs.toast.showErrorToastMessage("Wrong Api Key password!!");
      } finally {
        this.isLoading = false;
      }
    },
    copyApiKey(apiKey) {
      const tempInput = document.createElement("input");
      tempInput.value = apiKey;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      this.$refs.toast.showSuccessToastMessage("Bank Api-key Copied");
    },

    openModal(bank) {
      this.bankApiKeyToBeEdited = bank._id;
      this.currentBankName = bank.bankType;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.currentBankName = '';
    },

  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  margin-top: 10px;
}

.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-footer button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-footer .bg-red-500 {
  background-color: #ef4444;
}

.modal-footer .bg-red-500:hover {
  background-color: #dc2626;
}

.modal-footer .bg-gray-500 {
  background-color: #6b7280;
}

.modal-footer .bg-gray-500:hover {
  background-color: #4b5563;
}
</style>