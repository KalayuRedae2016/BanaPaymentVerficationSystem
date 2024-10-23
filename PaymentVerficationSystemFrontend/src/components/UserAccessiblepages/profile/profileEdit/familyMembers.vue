<template>
  <div v-if="showModal">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="flex flex-row">
            <div>Edit Family Membrs</div>
            <div class="ml-64">
              <svg
                @click="closeModal()"
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
                  First Name
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localFamilyMembers.firstName"
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Middle Name
                  <span class="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localFamilyMembers.middleName"
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Last Name
                  <span class="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  id="closeAmount"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localFamilyMembers.lastName"
                />
              </div>

              <div class="w-full">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Gender
                  <span class="text-red-500 ml-1">*</span>
                </label>

                <select
                  class="mb-3 border border-indigo-800 w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base h-12"
                  required
                  style="padding-left: 16px"
                  v-model="localFamilyMembers.gender"
                >
                  <option value="" disabled selected>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  RelationShip
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="closeAmount"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localFamilyMembers.relationShip"
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Phone Number
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="closeAmount"
                  class="w-full px-4 py-2 border border-gray-400 rounded"
                  v-model="localFamilyMembers.phoneNumber"
                />
              </div>
              <button
                @click="editFamilyMeber()"
                type="submit"
                class="bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <i class="fas fa-save"
                  ><span class="text-md ml-3">Save</span></i
                >
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
            <div class="bg-white rounded-3xl shadow-lg p-8 w-96">
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
                Family Member Editted successfully
              </p>
              <button
                @click="pushToItSelf()"
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
import { faLaptopHouse } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default {
  data() {
    return {
      token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzI3NjY0MjU2Zjg4YWI5ZTI0ZTI5NiIsImlhdCI6MTcxNTI4MDE0NywiZXhwIjoxNzE1Mjk4MTQ3fQ.Z0B82rQqEj3gkgZ4geKq-AUcmKJjeurw3aqeR4yxJFM",
      editingSuccess: false,
      localClientId: "",
      showModal: true,
      localFamilyMembers: {
        _id: 1,
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        relationShip: "",
        phoneNumber: "",
      },
    };
  },
  props: {
    clientId: "",
    familyMembers: {
      type: Object,
    },
  },
  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });
  },
  mounted() {
    console.log("mounted called");
    this.localFamilyMembers = this.familyMembers;
    this.localClientId = this.clientId;
    console.log("familyMemberslocal", this.localFamilyMembers);
  },

  methods: {
    pushToItSelf(){
     // alert("putitself")
      this.editingSuccess=false
      // Navigate to a temporary route
        this.$router.push(`/userdashboard/empty/${this.localClientId}`);
    },
    editFamilyMeber() {
      this.editingSuccess = true;
      this.showModal = false;
      const familyData = {
        familyMembers: this.localFamilyMembers,
      };
      this.apiClient
      .patch(`/api/v1/users/updateMe/${this.localClientId}`,  familyData, {
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
      this.$emit("update-status", "closed");
    },
  },
};
</script>
