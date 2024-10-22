<template>
  <div class="flex flex-col lg:flex-row xl:flex-row">
    <div class="lg:w-1/3 xl:w-1/3 mb-4 lg:mr-4 xl:mr-4">
      <div class="bg-white rounded shadow p-4 border border-gray-300">
        <h2 class="text-2xl text-indigo-500 font-semibold mb-2">
          Requested Data
        </h2>
        <ul>
          <li class="mb-2">
            <span class="font-semibold text-2xl">Name:</span> John Doe
          </li>
          <li class="mb-2">
            <span class="font-semibold text-2xl">Total:</span> $1000
          </li>
          <li class="mb-2">
            <span class="font-semibold text-2xl">Bank Type:</span> Savings
          </li>
          <li>
            <span class="font-semibold text-2xl">Bank Account:</span> 1234567890
          </li>
        </ul>
      </div>
    </div>
    <div class="lg:w-1/3 xl:w-1/3 mb-4 lg:mx-2 xl:mx-2">
      <div class="bg-white rounded shadow p-4 border border-gray-300">
        <h2 class="text-2xl text-indigo-500 font-semibold mb-2">Bank Result</h2>
        <ul>
          <li class="mb-2">
            <span class="font-semibold text-2xl">Name:</span> Jane Smith
          </li>
          <li class="mb-2">
            <span class="font-semibold text-2xl">Total:</span> $1500
          </li>
          <li class="mb-2">
            <span class="font-semibold text-2xl">Bank Type:</span> Checking
          </li>
          <li>
            <span class="font-semibold text-2xl">Bank Account:</span> 9876543210
          </li>
        </ul>
      </div>
    </div>
    <div class="lg:w-1/3 xl:w-1/3 mb-4 lg:ml-4 xl:ml-4">
      <div class="bg-white rounded shadow p-4 border border-gray-300">
        <h2 class="text-2xl text-indigo-500 font-semibold mb-2">
          Expected Payment
        </h2>
        <ul>
          <li class="mb-2">
            <span class="font-semibold text-2xl">Name:</span> James Johnson
          </li>
          <li class="mb-2">
            <span class="font-semibold text-2xl">Total:</span> $2000
          </li>
          <li class="mb-2">
            <span class="font-semibold text-2xl">Bank Type:</span> Savings
          </li>
          <li>
            <span class="font-semibold text-2xl">Bank Account:</span> 5678901234
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="flex flex-row">
    <button
      @click="confirmModal = !confirmModal"
      class="ml-10 mb-10 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
    >
      Confirm
    </button>
    <button
      @click="rejectModal = !rejectModal"
      class="ml-10 mb-10 bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
    >
      Reject
    </button>
  </div>

  <div v-if="confirmModal">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96">
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
                <h2 class="text-2xl font-bold text-gray-800">Success!</h2>
              </div>
              <p class="text-gray-600 text-2xl">
                Are sure to confirm this Payment request please??
              </p>
              <button
                @click="confirmModal = !confirmModal"
                class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                OK
              </button>
              <button
                @click="confirmModal = !confirmModal"
                class="ml-3 mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Cancel
              </button>
            </div>
          </div>
          <hr class="my-4 md:min-w-full bg-red-500" />
        </div>
      </div>
    </transition>
  </div>

  <div v-if="rejectModal">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96">
              <div class="flex items-center justify-center mb-4 -ml-16">
                <div
                  class="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-4 h-4 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01M12 21h.01"
                    ></path>
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-red-500 ml-5">
                  Failure Payment
                </h2>
              </div>
              <p class="text-pink-600 text-2xl">
                Are sure to reject this Payment Request please??
              </p>
              <button
                @click="rejectModal = !rejectModal"
                class="mt-6 bg-pink-500 hover:bg-green-600 text-white py-1 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                OK
              </button>

              <button
                @click="cancelModal()"
                class="ml-3 mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Cancel
              </button>
            </div>
          </div>
          <hr class="my-4 md:min-w-full bg-red-500" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "verifyView",
  data() {
    return {
      confirmModal: false,
      rejectModal: false,
      clientId: "",
    };
  },
  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });
    this.clientId = this.$route.params.clientId;
  },
  mounted() {
    console.log("client id is ", this.clientId);
  },
  methods: {
    cancelModal() {
      if(this.rejectModal==true){
          this.rejectModal=false
      }
    },
    fetchRequestedData() {
      this.apiClient
        .get(`/api/v1/users/${this.clientId}`)
        .then((response) => {
          console.log("Response", response);
          this.clientProfile = response.data.message;

          console.log("Client Profille", this.clientProfile);

          this.userId = this.clientProfile._id;
          console.log("name", this.clientProfile.name.firstName);
          this.imageData = "data:image/jpeg;base64," + response.data.imageData;

          this.firstName = this.clientProfile.name.firstName;
          this.middleName = this.clientProfile.name.middleName;
          this.lastName = this.clientProfile.name.lastName;

          this.dateOfBirth = this.clientProfile.dateOfBirth;
          this.bankAccount = this.clientProfile.bankAccount;

          this.address = this.clientProfile.address;

          this.username = this.clientProfile.username;
          this.email = this.clientProfile.email;
          this.phoneNumber = this.clientProfile.phoneNumber;
          this.familyMembers = this.clientProfile.familyMembers;
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
        });
    },
    fetchExpectedData(clientId) {
      this.apiClient
        .get(`/api/v1/users/${clientId}`)
        .then((response) => {
          console.log("Response", response);
          this.clientProfile = response.data.message;

          console.log("Client Profille", this.clientProfile);

          this.userId = this.clientProfile._id;
          console.log("name", this.clientProfile.name.firstName);
          this.imageData = "data:image/jpeg;base64," + response.data.imageData;

          this.firstName = this.clientProfile.name.firstName;
          this.middleName = this.clientProfile.name.middleName;
          this.lastName = this.clientProfile.name.lastName;

          this.dateOfBirth = this.clientProfile.dateOfBirth;
          this.bankAccount = this.clientProfile.bankAccount;

          this.address = this.clientProfile.address;

          this.username = this.clientProfile.username;
          this.email = this.clientProfile.email;
          this.phoneNumber = this.clientProfile.phoneNumber;
          this.familyMembers = this.clientProfile.familyMembers;
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
        });
    },
    fetchBankData(clientId) {
      this.apiClient
        .get(`/api/v1/users/${clientId}`)
        .then((response) => {
          console.log("Response", response);
          this.clientProfile = response.data.message;

          console.log("Client Profille", this.clientProfile);

          this.userId = this.clientProfile._id;
          console.log("name", this.clientProfile.name.firstName);
          this.imageData = "data:image/jpeg;base64," + response.data.imageData;

          this.firstName = this.clientProfile.name.firstName;
          this.middleName = this.clientProfile.name.middleName;
          this.lastName = this.clientProfile.name.lastName;

          this.dateOfBirth = this.clientProfile.dateOfBirth;
          this.bankAccount = this.clientProfile.bankAccount;

          this.address = this.clientProfile.address;

          this.username = this.clientProfile.username;
          this.email = this.clientProfile.email;
          this.phoneNumber = this.clientProfile.phoneNumber;
          this.familyMembers = this.clientProfile.familyMembers;
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
        });
    },

    confirmPayment() {
      console.log("confirm calleed");
      this.apiClient
        .patch(`/api/v1/paymentType/${this.localClientId}`, addressData)
        .then((response) => {
          console.log("Response", response);
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
        });
    },
    rejectPayment() {
      //update the rejected field in payment history

      console.log("rejectged called");

      this.apiClient
        .patch(`/api/v1/paymentType/${this.localClientId}`, addressData)
        .then((response) => {
          console.log("Response", response);
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
        });
    },

    printReceipt() {
      window.print();
    },
  },
};
</script>
