<template>
  <div class="mb-48">
    <Toast ref="toast" />
    <div class="container mx-auto p-4 flex flex-col">
      <div class="flex flex-row w-full border-b border-blue-500 pb-1">
        <p class="text-blue-500 text-md font-bold">{{ $t("Active Clients") }}</p>
        <div class="ml-auto flex space-x-2">
          <button @click.prevent="navigateToCreateClient()" class="custom-button text-xs ">
            <i class="fa fa-add mr-2 "></i>Add
          </button>
          <button class="custom-button text-xs" @click="editPermissionModal = true">
            <i class="fa fa-cog icon" aria-hidden="true"></i> {{ $t("Open Edit Profile") }}
          </button>
          <button class="custom-button text-xs" @click="showDeactivatedUsers()">
            <i class="fa fa-user-slash" aria-hidden="true"></i> {{ $t("View Deactivated Users") }}
          </button>
        </div>
      </div>
    </div>

    <clientTable></clientTable>

    <div v-if="editPermissionModal">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500 w-96 lg:w-1/2">
            <div class="flex flex-row items-center">
              <!-- Text on the left -->
              <div class="text-blue-500 font-bold">Grant Permissions </div>

              <!-- Icon on the right -->
              <div class="ml-auto" @click="
                editPermissionModal = !editPermissionModal;
              ">
                <svg class="w-6 h-6 text-red-500 hover:text-red-700 transition-colors duration-300 cursor-pointer"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div class="flex flex-row mb-5 mt-5">

              <input v-model="searchQuery" type="text" :placeholder="$t('searchByNameEmailUsername')"
                class="custom-input" />
            </div>

            <div class="overflow-x-auto overflow-y-auto max-h-64 border border-gray-300 p-4">
              <!-- Table -->
              <table class="table-auto min-w-full border-collapse">
                <!-- Table Head -->
                <thead class=" text-white sticky top-0 z-0">
                  <tr class="text-blue-500 ">
                    <th class="w-24 p-4 font-bold text-left">
                      {{ $t("check") }}
                      <input type="checkbox" class="ml-2" v-model="selectAll" @change="selectDeselectAll()" />
                    </th>
                    <th class="w-24 p-4 font-bold text-left">
                      {{ $t("userCode") }}
                    </th>
                    <th class="w-24 p-4 font-bold text-left">
                      {{ $t("fullName") }}
                    </th>

                  </tr>
                </thead>
                <!-- Scrollable Table Body -->
                <tbody class="divide-y divide-gray-200 bg-gray-50 ">
                  <tr @click="selectDeselectUser(searchClient._id)" v-for="(searchClient, index) in searchedusers"
                    :key="searchClient._id"
                    class="cursor-pointer bg-white hover:shadow-lg hover:bg-gray-100 rounded-lg h-8">
                    <td class="text-md text-gray-700">
                      <input type="checkbox" class="pl-4 rounded focus:ring focus:ring-indigo-300"
                        :checked="selectedUsers.includes(searchClient._id)"
                        @change="selectDeselectUser(searchClient._id)" />
                    </td>
                    <td class=" text-xs text-gray-700 hidden h-8">
                      <span class="font-bold text-indigo-600">{{
                        index + 1
                      }}</span>
                    </td>
                    <td class=" text-xs text-gray-700 h-6">
                      <span class="font-bold text-indigo-600">{{
                        searchClient.userCode
                      }}</span>
                    </td>
                    <td class="text-xs text-gray-700 font-bold h-6">
                      {{ searchClient.fullName }}
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <!-- <div class="flex flex-row mt-2">
              <label for="" class="custom-label w-1/4 mt-3">Close Date</label>
              <input type="text" class="custom-input w-2/3">
            </div> -->
            <div class="w-full my-2 bg-blue-100 border-t blue-200 p-2 text-blue-700">
              Total selected :
              <span class="text-gray-600 font-extrabold ">{{
                selectedUsers.length
              }}</span>
            </div>

            <p class="my-2 text-red-500 text-xs" v-if="selectAtLeastOneUser">Select At list One User??</p>

            <div class="mt-2 flex space-x-5">
              <button @click="giveRejectPermission(true)" class="custom-button">
                <i class="fa fa-check"></i> {{ $t("Give Permission") }}
              </button>
              <button @click="giveRejectPermission(false)" class="custom-button bg-red-500">
                <i class="fa fa-times text-white"></i> {{ $t("Reject Permission") }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

</template>
<script>
import Toast from "../../Common/Toast.vue";
import clientTable from './clientsTable.vue'
export default {
  name: "ClientsView",
  components: {
    Toast,
    clientTable,
  },
  data() {
    return {
      //
      selectAtLeastOneUser: false,
      selectedUsers: [],
      searchedusers: [],
      clientId: "",
      users: [],
      selectAll: false,
      //
      editPermissionModal: false,
      successToastMessage: "",
      errorToastMessage: "",
      showErrorToast: false,
      showSuccessToast: false,

      showSuccess: false,
      showError: false,
      successMessage: "",
      errorMessage: "",

      selectedUserToBeResetPassword: "",
      userIdToBeDeactivated: "",
      resetedPassword: "6tyyy",
      showResetedPasswordModal: false,
      showDeactivateModal: false,
      showResetModal: false,
      deactivationReason: "",


      showFamilyMemberModal: false,
      addingSuccess: false,
      screenSize: "",
      detailModal: false,
      clientId: "",
      clients: [
      ],
      searchedClients: [],
      showMoreChanged: false,
      filteredCleints: [],
      displayedClients: [],
      currentPage: 1,
      searchQuery: "",
      perPage: 5,
      clientName: "",
      clientsPerpage: "",

    };
  },


  watch: {


    searchQuery: {
      handler: "filteredusersInSearch",
      immediate: true,
    },

    selectedUserIds(newIds) {
      this.selectedUsers = this.users.filter((user) =>
        newIds.includes(user._id)
      );
      console.log(this.selectedUsers);
    },

  },

  computed: {
    totalPages() {
      return Math.ceil(this.clients.length / this.perPage);
    },
  },

  async mounted() {
    const params = {
      isActive: true
    }
    try {
      await this.$apiGet("/api/v1/users", params).then(
        (response) => {
          this.clients = response.users;
          this.searchedClients = this.clients;
          this.searchedusers = this.clients;
        }
      );
    } catch (error) {
      console.log("from api error global", error.status, error.message);
    } finally {
      //this.loading = false; // Stop loading once the request is complete
    }
  },

  methods: {
    selectDeselectUser(userId) {
    
      console.log("selectDeselectEmail", userId);
      const index = this.selectedUsers.indexOf(userId);
      if (index === -1) {
        // Email is not selected, add it to the 'emails' array
        this.selectedUsers.push(userId);
        console.log("selected userd", this.selectedUsers);
      } else {
        // Email is selected, remove it from the 'emails' array
        this.selectedUsers.splice(index, 1);
        console.log("Deselected user ", userId);
      }
      console.log("selected Users", this.selectedUsers);
    },


    selectDeselectAll() {
      this.selectedUsers = [];
      if (this.selectAll) {
        this.selectedUsers = this.clients.map((user) => user._id);
        console.log("selectedUsers", this.selectedUsers);
      } else {
        this.selectedUsers = [];
        console.log("Deselected all users ", this.selectedUsers);
      }
    },

  async giveRejectPermission(editPermission) {
  this.showError = false;
  this.selectAtLeastOneUser = false;

  // Validate selected users
  if (this.selectedUsers == "" || this.selectedUsers.length === 0) {
    this.selectAtLeastOneUser = true;
    return;
  }

  // Prepare the payload
  const userList = {
    userIds: this.selectedUsers,
    permittedBy: localStorage.getItem("userId"),
    editPermission: editPermission, // Pass true or false dynamically
  };
  console.log("userList", userList);

  try {
    // Make the API call
    await this.$apiPatch("/api/v1/users/edituserPermission", '', userList)
      .then((response) => {
        console.log("users", response.message);
        this.$refs.toast.showSuccessToastMessage(response.message);
        this.searchedusers = this.users; // Update the users
        this.editPermissionModal = false; // Close the modal
      });
  } catch (error) {
    console.error("Error fetching users:", error);
    this.showErrorToastMessage("Something went wrong");
  } finally {
    this.selectedUsers = []; // Reset selected users
  }
}
,
    async resetPassword(user) {
      console.log("userId is", user._id);
      this.showResetModal = false;
      const payload = {
        id: user._id,
        email: user.email,
      };
      try {
        await this.$apiPatch("/api/v1/users/resetPasswordByAdmin", '', payload)
          .then((response) => {
            console.log("users", response);
            if (response.status === 1) {
              this.showResetedPasswordModal = true;
              this.resetedPassword = response.resetedPassword;
              this.$refs.toast.showSuccessToastMessage(response.message);
              this.displayedItems();
            }
          })
      } catch (error) {
        this.errorMessage = error.message;
        this.showError = true;
        conmsole.log("error during reseting", error.status, error.message)
      } finally {

      };
    },

    async deactivate(userId) {
      const payload = {
        reason: this.deactivationReason,
        isActive: false,
      };

      console.log("payload", payload);
      this.showDeactivateModal = false;

      try {
        await this.$apiPut("/api/v1/users/active-deactive", userId, payload)
          .then((response) => {
            console.log("users", response);
            if (response.status === 1) {
              this.$refs.toast.showSuccessToastMessage(response.message);
              this.$reloadPage();
            } else {
              this.showErrorToastMessage("Something went wrong!!");
            }
          })
      } catch (error) {
        console.log("error during activating", error.status, error.message);
        this.$refs.toast.showErrorToastMessage("Something went wrong!!");
      } finally {

      }
    },


    navigateToInClient(clientId) {
      this.$router.push(`/admindashboard/edit-client/${clientId}`);
    },


    showDeactivatedUsers() {
      this.$router.push(`/admindashboard/deactivate`);
    },


    changePerPageNumber() {
      this.perPage = this.clientsPerpage;
      this.showMoreChanged = true;
      console.log("perpage is", this.perPage);
      //this.searchedClients=this.clients
      this.displayedItems();
    },


    // filteredClientsInSearch() {
    //   console.log("this users=", this.clients);

    //   this.searchedClients = this.clients.filter((client) => {
    //     return (
    //       client.fullName
    //         .toLowerCase()
    //         .includes(this.searchQuery.toLowerCase()) ||
    //       client.userCode.toLowerCase().includes(this.searchQuery.toLowerCase())
    //     );
    //   });
    // },


    filteredusersInSearch() {
      // alert("tadios");
      console.log("search", this.searchQuery);
      console.log("this.users", this.users);

      if (this.searchQuery !== "") {
        const query = this.searchQuery.toLowerCase();
        this.searchedusers = this.clients.filter(
          (client) =>
            client.fullName.toLowerCase().includes(query) ||
            client.userCode.toLowerCase().includes(query)
          // Add more conditions for other table headers
        );
        console.log("searched clients: ", this.searchedusers);
        return this.searchedusers;
      } else {
        console.log("searchedusers and it is empty", this.searchedusers);
        this.searchedusers = this.clients;
        return this.displayedItems();
      }
    },
    previosPage() {
      if (this.currentPage > 1 && this.currentPage <= this.totalPages) {
        this.currentPage--;
        // console.log(this.currentPage);
        this.displayedItems();
      }
    },
    nextPage() {
      console.log("this.currentPage", this.currentPage);
      console.log("this.perpage", this.perPage);
      console.log("totalpages", this.totalPages);

      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.displayedItems();
      }
    },
    displayedItems() {
      if (this.showMoreChanged) {
        console.log("show more changed is true");
        this.currentPage = 1;
        const startIndex = 0;
        const endIndex = startIndex + this.perPage;
        this.showMoreChanged = false;
        this.searchedClients = this.clients.slice(startIndex, endIndex);
        console.log("this.searchedClients", this.searchedClients);

        return this.searchedClients;
      } else {
        console.log("show more changed is false");
        console.log("this.currentPage", this.currentPage); // "2"
        console.log("this.perpage", this.perPage); // "2"

        const startIndex =
          (parseInt(this.currentPage) - 1) * parseInt(this.perPage);
        console.log("start index", startIndex); // (2 - 1) * 2 = 2

        const endIndex = startIndex + parseInt(this.perPage);
        console.log("end index", endIndex); // 2 + 2 = 4

        console.log("this.searchedClients", this.searchedClients);
        return (this.searchedClients = this.clients.slice(
          startIndex,
          endIndex
        ));
      }
    },
    navigateToCreateClient() {
      this.$router.push("/admindashboard/create-client");
    },
    goBack() {
      this.$router.push("/admindashboard"); // Navigates back to the previous page
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
</style>
