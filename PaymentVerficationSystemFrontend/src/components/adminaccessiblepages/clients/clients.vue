<template>
  <meta charset="UTF-8" />
  <div class="container mx-auto p-4 flex flex-col">
    <div class="flex flex-row space-x-3">
      <p class="text-blue-800 text-md font-bold">{{ $t("clients") }}</p>
      <button class="text-cyan-500" @click="showDeactivatedUsers()">
      {{ $t('viewDeactivatedUsers') }}
      </button>
    </div>
    <div class="border-t border-indigo-800 mt-3">
      <div
        class="mb-96 border border-gray-200 flex flex-col bg-white rounded-lg shadow-md mt-8 border-t border-r border-l border-gray-200"
      >
        <div class="p-4 mt-8">
          <div class="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
  <!-- Search Input -->
  <div class="flex-1 mr-4">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="$t('searchByNameEmailUsername')"
      class="custom-input w-full h-12 px-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-600"
    />
  </div>
  
  <!-- Add New Client Button -->
  <div>
    <button
      class="bg-blue-800 border border-indigo-500 h-12 px-4 flex items-center text-white font-semibold rounded-lg shadow-sm transition-transform transform hover:bg-blue-500 hover:-translate-y-0.5"
      @click="navigateToCreateClient"
    >
      <svg
        class="w-6 h-6 mr-2"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5V19M5 12H19"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>{{ $t('addNewClient') }}</span>
    </button>
  </div>
</div>

          <div class="overflow-x-auto">
            <table class="w-full border-b border-gray-300">
              <thead>
                <tr class="bg-gray-200">
                  <th
                    class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    {{ $t("number") }}
                  </th>
                  <th
                    class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    {{ $t("userCode") }}
                  </th>
                  <th
                    class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    {{ $t("fullName") }}
                  </th>
                  <th
                    class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    {{ $t("createdAt") }}
                  </th>
                  <th
                    class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    {{ $t("updatedAt") }}
                  </th>
                  <th
                    class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    {{ $t("deactivate") }}
                  </th>
                  <th
                    class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    {{ $t("resetPassword") }}
                  </th>

                  <th
                    class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    {{ $t("detail") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(searchClient, index) in searchedClients"
                  :key="searchClient._id"
                >
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {{ index + 1 }}
                  </td>
                  <td class="p-3 text-sm text-gray-500 whitespace-nowrap">
                    {{ searchClient.userCode }}
                  </td>
                  <td class="p-3 text-sm text-gray-500 whitespace-nowrap">
                    {{ searchClient.fullName }}
                  </td>
                  <td class="p-3 text-sm text-gray-500 whitespace-nowrap">
                    {{ searchClient.formattedCreatedAt }}
                  </td>
                  <td class="p-3 text-sm text-gray-500 whitespace-nowrap">
                    {{ searchClient.formattedUpdatedAt }}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <button
                      @click="
                        showDeactivateModal = !showDeactivateModal;
                        userIdToBeDeactivated = searchClient._id;
                      "
                      class="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center"
                    >
                      <i class="fas fa-user-times mr-2"></i>
                      <!-- Font Awesome icon for deactivation -->
                      {{ $t("") }}
                    </button>
                  </td>

                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <button
                      @click="
                        showResetModal = !showResetModal;
                        selectedUserToBeResetPassword = searchClient;
                      "
                      class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center"
                    >
                      <i class="fas fa-redo-alt mr-2"></i>
                      <!-- Font Awesome icon -->
                      {{ $t("") }}
                    </button>
                  </td>

                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <button
                      @click="navigateToInClient(searchClient._id)"
                      class="flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-gray-800 rounded"
                    >
                      <i class="fas fa-eye mr-2 text-gray-50"></i>
                      {{ $t("") }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
  <!-- Pagination Controls -->
  <div class="flex items-center">
    <!-- Show More Label -->
    <h1 class="mr-4 text-gray-600 font-medium">{{ $t("showMore") }}</h1>
    
    <!-- Select Clients Per Page -->
    <select
      v-model="clientsPerpage"
      @change="changePerPageNumber()"
      class="h-9 border border-gray-300 text-gray-700 rounded-lg shadow-sm px-3 mr-4 focus:outline-none focus:ring focus:border-pink-500"
    >
    <option value="" disabled>{{ $t('select') }}</option>
      <option value="2" selected>2</option>
      <option value="3">3</option>
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>

    <!-- Previous Page Button -->
    <button
      @click="previosPage"
      class="px-3 py-1.5 text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring focus:border-pink-500 transition"
      :disabled="currentPage === 1"
    >
      <i class="fa fa-chevron-left"></i>
    </button>

    <!-- Current Page Display -->
    <span
      class="px-4 py-1.5 bg-indigo-800 text-white font-bold border-t border-b border-gray-300"
    >
      {{ currentPage }}
    </span>

    <!-- Next Page Button -->
    <button
      @click="nextPage"
      class="px-3 py-1.5 text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r-lg shadow-sm focus:outline-none focus:ring focus:border-pink-500 transition"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</div>


            




          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showDeactivateModal">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-lg p-6 border border-orange-500">
          <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96">
              <div class="flex items-center justify-center mb-4">
                <!-- Warning Icon -->
                <svg
                  class="w-8 h-8 text-orange-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h1m0 4h-1m1-4V8h-1v4h1m0 4h-1V8h1m0-4h-1V4h1v4zM12 9V5h.01M4.93 4.93l.08-.08 6.99 6.99M8.34 8.34l6.99 6.99-.08.08M4.93 19.07l6.99-6.99M4.93 4.93l14.14 14.14"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold text-gray-800">
                  Deactivate User
                </h2>
              </div>
              <!-- Form Content -->
              <form>
                <div class="mb-4">
                  <label
                    for="reason"
                    class="block text-lg font-medium text-gray-700"
                    >Reason for Deactivation</label
                  >
                  <input
                    type="text"
                    id="reason"
                    v-model="deactivationReason"
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter reason"
                    required
                  />
                </div>
                <div class="flex justify-end space-x-4 mt-6">
                  <button
                    @click.prevent="deactivate(userIdToBeDeactivated)"
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center justify-center"
                  >
                    <i class="fas fa-check-circle mr-2"></i>
                    {{ $t("Submit") }}
                  </button>

                  <button
                    @click.prevent="showDeactivateModal = false"
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
          <hr class="my-4 md:min-w-full bg-orange-500" />
        </div>
      </div>
    </transition>
  </div>

  <div v-if="showResetModal">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-cyan-500 w-96">
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
                d="M12 9v6m0 0v-6m0 6h6m-6 0H6"
              ></path>
            </svg>
            <h2 class="text-2xl font-bold text-gray-800">
              {{ $t("warning") }}
            </h2>
          </div>
          <p class="text-gray-600 text-lg">
            {{ $t("Do You Want to reset the password of the selected user") }}
          </p>
          <div class="mt-6 flex space-x-5">
            <button
              @click="resetPassword(selectedUserToBeResetPassword)"
              class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {{ $t("yes") }}
            </button>
            <button
              @click="showResetModal = false"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              {{ $t("Cancel") }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <div v-if="showResetedPasswordModal">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div
          class="bg-white rounded-lg p-6 border border-cyan-500 shadow-lg max-w-sm w-full"
        >
          <p class="text-gray-700 text-lg mb-2">
            {{ $t("Password has been reset successfully") }}
          </p>
          <div class="bg-gray-100 p-4 rounded-md mb-4">
            <p class="text-gray-700 text-sm">
              <strong>{{ $t("New Password:") }}</strong> {{ resetedPassword }}
            </p>
          </div>
          <button
            @click="
              showResetedPasswordModal = !showResetedPasswordModal;
              resetedPassword = '';
            "
            class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
          >
            {{ $t("ok") }}
          </button>
        </div>
      </div>
    </transition>
  </div>

  <div v-if="showSuccess">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96">
              <div class="flex items-center mb-4 ml-32">
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
                <h2 class="text-md text-green-800">Success!</h2>
              </div>
              <p class="text-blue-800 text-md ml-8">
                {{ successMessage }}
              </p>
              <button
                @click="showSuccess = false"
                class="ml-8 mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                <h2 class="text-sm font-bold text-gray-800">Error!</h2>
              </div>
              <p class="text-gray-600 text-sm">
                {{ errorMessage }}
              </p>
              <button 
                @click="showError = false"
                class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                OK
              </button>
            </div>
          </div>
          <hr class="my-4 bg-red-500" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: "ClientsView",
  components: {
    //clientsForm,
  },
  data() {
    return {

     showSuccess:false,
     showError:false,
     successMessage:"",
     errorMessage:"",

   
      selectedUserToBeResetPassword: "",
      resetedPassword: "6tyyy",
      showResetedPasswordModal: false,
      showResetModal: false,
      deactivationReason: "",
      userIdToBeDeactivated: "",
      showDeactivateModal: false,
      showFamilyMemberModal: false,
      addingSuccess: false,
      screenSize: "",
      detailModal: false,
      clientId: "",
      clients: [
        // {
        //   _id: "1",
        //   fullName: "Tadesse Gebremicheal Berhe",
        //   firstName: "Tadesse",
        //   middleName: "Gebremicheal",
        //   lastName: "Berhe",
        //   userCode: "BM 0023",
        // },
        // {
        //   _id: "2",
        //   fullName: "Amanuel Kidane",
        //   firstName: "Amanuel",
        //   middleName: "Kidane",
        //   lastName: "Kidane",
        //   userCode: "AM 0045",
        // },
        // More client objects can be added here
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
      handler: "filteredClientsInSearch",
      immediate: true,
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.clients.length / this.perPage);
    },
  },

  mounted() {
    this.$apiClient
      .get("/api/v1/users",{
        params:{
          isActive:true,
        }
      }).then((response)=>{
        console.log("response active users are",response);
        this.clients=response.data.users;
        this.searchedClients=this.clients;
      }).catch((error)=>{
       console.log("error",error);
      });
  },



  methods: {
    resetPassword(user) {
      console.log("userId is",user._id);
      this.showResetModal=false;
      const payload = {
        id: user._id,
        email: user.email,
      };
      this.$apiClient
        .patch("/api/v1/users/resetPasswordByAdmin",payload)
        .then((response) => {
          console.log("users", response.data.message);
          if (response.data.status===1) {
           this.showResetedPasswordModal=true;
           this. resetedPassword=response.data. resetedPassword;
           this.displayedItems();
          }
        })
        .catch((error) => {
            this.errorMessage = error.response.data.message
            this.showError=true;
        });
       },

        deactivate(userId) {
          const payload={
            userId: userId,
            reason: this.deactivationReason,
            isActive: false,
          }

          console.log("payload",payload);
      this.showDeactivateModal=false; 
      this.$apiClient
        .put("/api/v1/users/active-deactive",payload)
        .then((response) => {
          console.log("users", response.data.message);
          if (response.data.status===1) {
            this.successMessage = response.data.message
            this.showSuccess=true;
            this.displayedItems();
          }
        })
        .catch((error) => {
            this.errorMessage = error.response.data.message
            this.showError=true;
        });
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
    fetchUsers() {
      this.$apiClient
        .get("/api/v1/users/", {
          params: {
            isActive: true,
          },
        })
        .then((response) => {
          console.log("users", response.data.message);
          if (response.data !== null) {
            this.searchedClients = response.data.message;
            this.clients = response.data.message;
            console.log("this.clientssearch", this.searchedClients);
            this.displayedItems();
          }
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },

    showFamilyModal() {
      this.showFamilyMemberModal = true;
    },

    navigateToInClient(clientId) {
      this.$router.push(`/admindashboard/edit-client/${clientId}`);
    },
    filteredClientsInSearch() {

      console.log("this users=", this.clients);

      this.searchedClients = this.clients.filter((client) => {
        return (
          client.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          client.userCode.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
    // filteredClientsInSearch() {
    //   console.log("usersearched",this.searchedClients)
    //   console.log("search", this.searchQuery);
    //   if (this.searchQuery !== "") {
    //     console.log("this.current pageinsearch", this.currentPage);
    //     console.log("search",this.searchedClients);

    //     if (this.currentPage) {
    //       //alert("tadesse");
    //       const query = this.searchQuery.toLowerCase().trim();
    //       console.log("query==",query);

    //     this.searchedClients = this.clients.filter((user) => {
    //     return (
    //       user.fullName.toLowerCase().includes(query.toLowerCase()) ||
    //       user.userCode.toLowerCase().includes(query.toLowerCase())
    //     );
    //   });

    //   console.log("searched cleint for checking ",this.searchedClients);

    //   return this.searchedClients;
    //     }else{
    //       console.log("currentPage is not valid", this.currentPage);
    //     }
    //     const query = this.searchQuery.toLowerCase();
    //     return (this.searchedClients = this.searchedClients.filter(
    //       (client) =>
    //         client.firstName.includes(query) ||
    //         client.middleName.includes(query)
    //       // Add more conditions for other table headers
    //     ));
    //   } else {
    //     console.log("searchedClients and it is empty", this.searchedClients);
    //     this.searchedClients = this.clients;
    //     return this.displayedItems();
    //   }
    // },

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
