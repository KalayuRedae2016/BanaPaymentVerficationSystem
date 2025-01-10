<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <!-- Card container -->
    <div class="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-indigo-800 text-center">Manage Banks</h2>

      <!-- Block Banks -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-4">Block Banks</h3>
        <!-- Loop through blockBanks -->
        <div v-for="(selectedBank, index) in blockBanks" :key="'block-' + index" class="mb-6">
          <div class="mb-4">
            <label v-if="selectedBank.bank !== 'newBank'" class="block text-gray-700 font-medium mb-2">Select Block Bank</label>

            <div v-if="selectedBank.bank !== 'newBank'">
              <select
                v-model="selectedBank.bank"
                @change="onBankChange(selectedBank, index, 'block')"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>Select a block bank</option>
                <option v-for="bank in availableBlockBanks" :key="bank" :value="bank">
                  {{ bank }}
                </option>
                <option value="newBank" class="flex items-center space-x-2">
                  <i class="fa fa-plus-circle text-green-500"></i>
                  <span>Other</span>
                </option>
              </select>
            </div>

            <!-- New Bank input fields for block banks -->
            <div v-if="selectedBank.bank === 'newBank'">
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">New Block Bank Name</label>
                <input
                  type="text"
                  v-model="selectedBank.newBankName"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter new block bank name"
                />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">New Account Number</label>
                <input
                  type="text"
                  v-model="selectedBank.newAccountNumber"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter new account number"
                />
              </div>

              <button
                @click="addNewBank(selectedBank, index, 'block')"
                class="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 mt-4"
              >
                Add New Block Bank
              </button>
            </div>
          </div>

          <!-- Account Number input for block banks -->
          <div v-if="selectedBank.bank !== 'newBank'" class="mb-4">
            <label class="block text-gray-700 font-medium mb-2">Account Number</label>
            <input
              type="text"
              v-model="selectedBank.accountNumber"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter account number"
            />
          </div>

          <button @click="removeBank(index, 'block')" class="mt-2 text-white bg-red-600 hover:bg-red-700 p-2 rounded-md">
            Remove
          </button>
        </div>

        <!-- Button to add a new block bank, only if the last selected bank is not 'newBank' -->
        <button
          v-if="blockBanks[blockBanks.length - 1]?.bank !== 'newBank'"
          @click="addBank('block')"
          class="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 mt-6"
        >
          Add New Block Bank
        </button>
      </div>

      <!-- Service Banks -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-4">Service Banks</h3>
        <!-- Loop through serviceBanks -->
        <div v-for="(selectedBank, index) in serviceBanks" :key="'service-' + index" class="mb-6">
          <div class="mb-4">
            <label v-if="selectedBank.bank !== 'newBank'" class="block text-gray-700 font-medium mb-2">Select Service Bank</label>

            <div v-if="selectedBank.bank !== 'newBank'">
              <select
                v-model="selectedBank.bank"
                @change="onBankChange(selectedBank, index, 'service')"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>Select a service bank</option>
                <option v-for="bank in availableServiceBanks" :key="bank" :value="bank">
                  {{ bank }}
                </option>
                <option value="newBank" class="flex items-center space-x-2">
                  <i class="fa fa-plus-circle text-green-500"></i>
                  <span>Other</span>
                </option>
              </select>
            </div>

            <!-- New Bank input fields for service banks -->
            <div v-if="selectedBank.bank === 'newBank'">
              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">New Service Bank Name</label>
                <input
                  type="text"
                  v-model="selectedBank.newBankName"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter new service bank name"
                />
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">New Account Number</label>
                <input
                  type="text"
                  v-model="selectedBank.newAccountNumber"
                  class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter new account number"
                />
              </div>

              <button
                @click="addNewBank(selectedBank, index, 'service')"
                class="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 mt-4"
              >
                Add New Service Bank
              </button>
            </div>
          </div>

          <!-- Account Number input for service banks -->
          <div v-if="selectedBank.bank !== 'newBank'" class="mb-4">
            <label class="block text-gray-700 font-medium mb-2">Account Number</label>
            <input
              type="text"
              v-model="selectedBank.accountNumber"
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter account number"
            />
          </div>

          <button @click="removeBank(index, 'service')" class="mt-2 text-white bg-red-600 hover:bg-red-700 p-2 rounded-md">
            Remove
          </button>
        </div>

        <!-- Button to add a new service bank, only if the last selected bank is not 'newBank' -->
        <button
          v-if="serviceBanks[serviceBanks.length - 1]?.bank !== 'newBank'"
          @click="addBank('service')"
          class="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 mt-6"
        >
          Add New Service Bank
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // List of all available block and service banks
      allBlockBanks: ["CBE", "Awash Bank", "Dashen Bank", "Abyssinia Bank"],
      allServiceBanks: ["Zemen Bank", "Nib Bank", "Bank of Abyssinia", "Bunna Bank"],

      // Selected block and service banks
      blockBanks: [],
      serviceBanks: [],
    };
  },
  computed: {
    // Available block banks: exclude selected ones
    availableBlockBanks() {
      return this.allBlockBanks.filter(bank => 
        !this.blockBanks.some(selectedBank => selectedBank.bank === bank)
      );
    },

    // Available service banks: exclude selected ones
    availableServiceBanks() {
      return this.allServiceBanks.filter(bank => 
        !this.serviceBanks.some(selectedBank => selectedBank.bank === bank)
      );
    }
  },
  methods: {
    // Add a new bank entry to the selected list (block or service)
    addBank(type) {
      if (type === 'block') {
        this.blockBanks.push({ bank: null, accountNumber: "", newBankName: "", newAccountNumber: "" });
      } else {
        this.serviceBanks.push({ bank: null, accountNumber: "", newBankName: "", newAccountNumber: "" });
      }
    },

    // Add a new bank after entering details for it (block or service)
    addNewBank(selectedBank, index, type) {
      if (selectedBank.newBankName && selectedBank.newAccountNumber) {
        if (type === 'block') {
          this.blockBanks.splice(index, 1, {
            bank: selectedBank.newBankName,
            accountNumber: selectedBank.newAccountNumber,
            newBankName: "",
            newAccountNumber: ""
          });
        } else {
          this.serviceBanks.splice(index, 1, {
            bank: selectedBank.newBankName,
            accountNumber: selectedBank.newAccountNumber,
            newBankName: "",
            newAccountNumber: ""
          });
        }
        // Optionally add the new bank to the all banks list
        if (type === 'block') {
          this.allBlockBanks.push(selectedBank.newBankName);
        } else {
          this.allServiceBanks.push(selectedBank.newBankName);
        }
      }
    },

    // Remove a bank from the selected list (block or service)
    removeBank(index, type) {
      if (type === 'block') {
        const bankToRemove = this.blockBanks[index].bank;
        this.blockBanks.splice(index, 1);
        if (bankToRemove && bankToRemove !== 'newBank') {
          this.allBlockBanks.push(bankToRemove);
        }
      } else {
        const bankToRemove = this.serviceBanks[index].bank;
        this.serviceBanks.splice(index, 1);
        if (bankToRemove && bankToRemove !== 'newBank') {
          this.allServiceBanks.push(bankToRemove);
        }
      }
    },
  },
};
</script>
