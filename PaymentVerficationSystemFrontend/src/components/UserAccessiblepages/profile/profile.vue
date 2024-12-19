<template>
  <div class="ml-10 mr-5 mb-10">
   
    <p class="text-indigo-800 font-extrabold text-md mb-10 mt-3">Your Profile</p>
    <div class="border-t border-gray-300 -mt-6 ">
    <div class="flex flex-wrap pt-10">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="`px-4 py-2  mb-2 mr-2 ${
          activeTab === index
            ? 'bg-gray-300 border-b-4 border-blue-500 text-blue-500 font-extrabold text-md'
            : 'bg-gray-100 text-indigo-700 font-extrabold text-md'
        } `"
        @click="activateTab(index)"
      >
        {{ tab }}
      </button>
    </div>

    <div class="">
      <div
        v-show="activeTab === 0"
        class="border-t border-r border-l border-gray-300"
      >
        <!-- Content for the first tab -->

        <div
          class="flex flex-row bg-white shadow-md rounded-lg p-6 w-full sm:w-auto"
        >
          <div class="ml-10 mt-5 mb-10">
            <h1 class="mb-5 text-indigo-800 font-bold text-md">
              Client Detail
            </h1>
            <img
              :src="imageData"
              alt="User Profile Image"
              class="w-64 h-64 border border-gray-400"
            />
            <p class="mb-2 text-sm mt-5 text-gray-600">
              <strong>{{ $t("Name") }} :</strong>
              <span class="ml-3 text-md"> {{ firstName }}</span>
            </p>

            <p class="mb-2 text-sm text-gray-600">
              <strong>Middle Name :</strong>

              <span class="ml-3 text-sm"> {{ middleName }}</span>
            </p>
            <p class="mb-2 text-sm text-gray-600">
              <strong>Last Name :</strong>
              <span class="ml-3 text-sm"> {{ lastName }}</span>
            </p>

            <p class="mb-2 text-sm text-gray-600">
              <strong>Date Of Birth :</strong>
              <span class="ml-3 text-sm"> {{ localizedDateOfBirth }}</span>
            </p>
          </div>

          <button
            @click="editDetail = !editDetail"
            class="text-md mt-3 h-10 text-indigo-500 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i class="fas fa-edit mr-2"></i>Edit
          </button>
        </div>
      </div>

      <div
        v-show="activeTab === 1"
        class="border-t border-r border-l border-gray-300"
      >
        <!-- Content for the second tab -->
        <div
          class="flex flex-row space-x-12 bg-white shadow-md rounded-lg p-6 w-full sm:w-auto"
        >
          <div class="ml-10 mt-5 mb-10">
            <h1 class="mb-5 text-indigo-800 font-bold text-md">Client Address</h1>
            <div class="mb-2">
              <p class="mb-2 text-sm text-gray-600">
                <strong>State :</strong>
                <span class="ml-3 text-sm"> {{ address.country }}</span>
              </p>
              <p class="mb-2 text-sm text-gray-600">
                <strong>State :</strong>
                <span class="ml-3 text-sm"> {{ address.state }}</span>
              </p>
              <p class="mb-2 text-sm text-gray-600">
                <strong>Zone :</strong>
                <span class="ml-3 text-sm"> {{ address.zone }}</span>
              </p>
              <p class="mb-2 text-sm text-gray-600">
                <strong>Wereda :</strong>
                <span class="ml-3 text-sm"> {{ address.wereda }}</span>
              </p>
              <p class="mb-2 text-sm text-gray-600">
                <strong>Kebele :</strong>
                <span class="ml-3 text-sm"> {{ address.kebelle }}</span>
              </p>
              <p class="mb-2 text-sm text-gray-600">
                <strong>City :</strong>
                <span class="ml-3 text-sm"> {{ address.city }}</span>
              </p>
            </div>
          </div>

          <button
            @click="editAddress = !editAddress"
            class="text-md mt-3 h-10 text-indigo-500 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i class="fas fa-edit mr-2"></i>Edit
          </button>
        </div>
      </div>
      <div
        v-show="activeTab === 2"
        class="border-t border-r border-l border-gray-300"
      >
        <!-- Content for the third tab -->
        <div
          class="flex flex-row space-x-12 bg-white shadow-md rounded-lg p-6 w-full sm:w-auto"
        >
          <div class="ml-10 mt-5 mb-10">
            <h1 class="mb-5 text-indigo-800 font-bold text-md">
              Contacts and Creditails
            </h1>
            <p class="mb-2 text-sm text-indigo-900">
              <strong>Phone Number :</strong> {{ clientProfile.phoneNumber }}
            </p>
            <p class="mb-2 text-sm text-indigo-900">
              <strong>Email :</strong> {{ clientProfile.email }}
            </p>
          </div>
          <button
            @click="editContactCreditial = !editContactCreditial"
            class="text-md mt-3 h-10 text-indigo-500 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i class="fas fa-edit mr-2"></i>Edit
          </button>
        </div>
      </div>
      <div
        v-show="activeTab === 3"
        class="border-t border-r border-l border-gray-300"
      >
        <!-- Content for the third tab -->
        <div
          class="flex flex-row space-x-12 bg-white shadow-md rounded-lg p-6 w-full sm:w-auto"
        >
          <div class="ml-10 mt-5 mb-10">
            <div class="flex items-center justify-between px-8 py-2">
              <h2 class="text-md font-bold -ml-8 text-indigo-800">
                Family Members
              </h2>
            </div>
            <ul class="px-10 py-10">
              <li
                v-for="member in clientProfile.familyMembers"
                :key="member._id"
                class="mb-2"
              >
                <div class="flex flex-row border-b border-gray-500 mb-5">
                  <div class="flex flex-col space-y-4 pb-5">
                    <p class="font-bold text-gray-600 text-sm mt-5">
                      First Name :
                      <span class="font-bold text-indigo-600 ml-5">{{
                        member.firstName
                      }}</span>
                    </p>
                    <p class="font-bold text-gray-600 text-sm">
                      Middle Name :
                      <span class="font-bold text-indigo-600 text-sm ml-5">{{
                        member.middleName
                      }}</span>
                    </p>
                    <p class="font-bold text-gray-600 text-sm">
                      Last Name :
                      <span class="font-bold text-indigo-600 text-sm">{{
                        member.lastName
                      }}</span>
                    </p>
                    <p class="font-bold text-gray-600 text-sm">
                      Gender :
                      <span class="font-bold text-indigo-600 text-sm">{{
                        member.gender
                      }}</span>
                    </p>
                    <p class="font-bold text-gray-600 text-sm">
                      Phone Number :
                      <span class="font-bold text-indigo-600 text-sm">{{
                        member.phoneNumber
                      }}</span>
                    </p>
                    <p class="font-bold text-gray-600 text-sm">
                      Relation Ship :
                      <span class="font-bold text-indigo-600 text-sm">{{
                        member.relationShip
                      }}</span>
                    </p>
                  </div>

                  <button
                    @click="editFamily1(member)"
                    class="text-sm ml-10 mt-5 h-10 text-indigo-900 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <i class="fas fa-edit mr-2"></i>Edit
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <button
            @click="addFamily = !addFamily"
            class="mt-5 h-10 text-indigo-500 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i class="fas fa-plus mr-2"></i>Add Member
          </button>
        </div>
      </div>
      <div
        v-show="activeTab === 4"
        class="border-t border-r border-l border-gray-300"
      >
        <!-- Content for the third tab -->
        <div class="bg-white shadow-md rounded-lg p-6 w-full sm:w-auto">
          <div class="ml-10 mt-5 mb-10">
            <h1>Documents</h1>
          </div>
        </div>
      </div>
    </div>

    <detail
      :clientId="clientId"
      :imageData="imageData"
      :firstName="firstName"
      :middleName="middleName"
      :lastName="lastName"
      :dateOfBirth="dateOfBirth"
      :bankAccount="bankAccount"
      :status="status"
      v-if="editDetail"
    >
    </detail>

    <address-view :clientId="clientId" :address="address" v-if="editAddress">
    </address-view>

    <contact-creditials
      :clientId="clientId"
      :username="username"
      :email="email"
      :phoneNumber="phoneNumber"
      v-if="editContactCreditial"
    >
    </contact-creditials>

    <family-members
      @update-status="handleStatusChange"
      :clientId="clientId"
      :family-members="singleFamilyMember"
      v-if="editFamily"
    >
    </family-members>

    <add-family-member
      :clientId="clientId"
      :family-members="singleFamilyMember"
      v-if="addFamily"
    >
    </add-family-member>
  </div>
</div>
</template>

<script>
import detail from "./profileEdit/detail.vue";
import addressView from "./profileEdit/address.vue";
import axios from "axios";
import ContactCreditials from "./profileEdit/contactCreditials.vue";
import familyMembers from "./profileEdit/familyMembers.vue";

import addFamilyMember from "./profileEdit/addFamilyMember.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    detail,
    addressView,
    ContactCreditials,
    familyMembers,
    addFamilyMember,
  },
  data() {
    return {
      clientId: "663f220b664ec7097cda8493",

      status: "Active",
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      bankAccount: "",

      username: "",
      email: "",
      phoneNumber: "",
      singleFamilyMember: {},

      status: "active",
      editDetail: false,
      editAddress: false,

      editFamily: false,

      addFamily: false,
      editContactCreditial: false,
      imageData: "",
      activeTab: 0,
      activeTab1: 0,

      address: {
        country: "",
        state: "",
        zone: "",
        wereda: "",
        kebelle: "",
        city: "",
      },

      tabs: [
        "Detail",
        "Address",
        "Contacts and creditials",
        "Familly Members",
        "Documents",
      ],

      clientProfile: [],
    };
  },
  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });
    //   this.clientId = this.$route.params.clientId;
    this.clientId = "663f220b664ec7097cda8493";
    this.fetchClientData(this.clientId);
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },

  mounted() {
    // console.log("token",this.$store.state.token);
    //console.log("userId",this.$store.getters.getUserId);
  },

  methods: {
    handleStatusChange(status) {
      console.log("status", status);
      if (status == "closed") {
        this.editFamily = false;
      }
    },
    activateTab(index) {
      this.activeTab = index;
    },
    activateTab1(index) {
      this.activeTab1 = index;
    },
    editFamily1(member) {
      //alert(this.editFamily);
      console.log("member", member);
      this.singleFamilyMember = member;
      this.editFamily = true;
      console.log("edit family", this.editFamily);
      //this.editFamily=false;
    },

    fetchClientData(clientId) {
      console.log("fetch method is called");
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
  },
};
</script> -->
