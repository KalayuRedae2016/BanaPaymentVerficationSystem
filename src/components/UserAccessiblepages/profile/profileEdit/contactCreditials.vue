<template>
  <div v-if="showModal">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="flex flex-row">
            <div>Edit User Contacts and Creditials</div>
            <div class="ml-64">
              <svg
                @click="showModal = !showModal"
                class="w-6 h-6 text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer"
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
            </div>
          </div>

          <hr class="my-4 md:min-w-full bg-red-500" />

          <div class="">
            <form class="px-5 py-5">
              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Phone Number
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localPhoneNumber"
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Email
                  <span class="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localEmail"
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Username
                  <span class="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  id="closeAmount"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localUsername"
                />
              </div>
              <button
                @click="editContactCreditial()"
                type="submit"
                class="bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
              <i class="fas fa-save"><span class="text-md ml-3">Save</span></i>
              </button>
            </form>
          </div>

          <hr class="my-4 md:min-w-full bg-red-500" />
        </div>
      </div>
    </transition>
  </div>

  <div v-if="editingSuccess">
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
              <p class="text-gray-600 text-2xl">User Contacts and Creditials Edited successfully</p>
              <button @click="pushToItSelf()"
                class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
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
</template>

<script>
import  axios from 'axios';
export default {
  data() {
    return {
      token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzI3NjY0MjU2Zjg4YWI5ZTI0ZTI5NiIsImlhdCI6MTcxNTI2MDA1OSwiZXhwIjoxNzE1Mjc4MDU5fQ.I8_x1-ayMlOMxdb_UarL9N0s0wkZ2089-RXze4CUT-s",
      showModal: true,
      editingSuccess:false,
      localPhoneNumber: "",
      localEmail: "",
      localUsername: "",
      localClientId:"",
    };
  },
  props: {
    clientId: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });
  },
  mounted() {
    this.localPhoneNumber = this.phoneNumber;
    this.localEmail = this.email;
    this.localUsername = this.username;
    this.localClientId=this.clientId;
    console.log("id,phone,email,username",this.localClientId,this.localPhoneNumber,this.localEmail,this.localUsername);
  },
  methods: {
    pushToItSelf(){
     // alert("putitself")
      this.editingSuccess=false
      // Navigate to a temporary route
        this.$router.push(`/userdashboard/empty/${this.localClientId}`);
    },
    editContactCreditial() {
        this.editingSuccess=true;
        this.showModal=false;
        const contactCredital={
            phoneNumber: this.localPhoneNumber,
            email: this.localEmail,
            username: this.localUsername,
        }
      this.apiClient
      .patch(`/api/v1/users/updateMe/${this.localClientId}`,  contactCredital, {
          headers: {
            authorization:this.token,
          }
        })
        .then((response) => {
          console.log("Response", response);
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
        });
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>
