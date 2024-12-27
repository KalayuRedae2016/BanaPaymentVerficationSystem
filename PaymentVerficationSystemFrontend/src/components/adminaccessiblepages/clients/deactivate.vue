<template>
  <div>
    <div class="container mx-auto p-4 flex flex-col">
     

      <div class="flex flex-row w-full">
        <p class="text-blue-500 text-md font-bold">{{ $t("Deactivated Clients") }}</p>
        <button class="text-blue-500 ml-auto font-bold" @click="showActiveUsers()">
          {{ $t("View Activated Users") }}
        </button>
      </div>

      <transition
        enter-active-class="transform transition duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transform transition duration-300 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div
          v-if="showSuccessToast"
          class="z-20 fixed right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          role="alert"
        >
          <strong class="font-bold">Success!</strong>
          <span class="block sm:inline">{{ successToastMessage }}</span>
        </div>
      </transition>
      <transition
        enter-active-class="transform transition duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transform transition duration-300 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div
          v-if="showErrorToast"
          class="z-20 fixed right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
          role="alert"
        >
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{{ errorToastMessage }}</span>
        </div>
      </transition>
      <div class="border-t border-blue-500 mt-3">
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
  
  </div>
</div>













            <div class="overflow-x-auto">
              <table class="w-full border-b border-gray-300 bg-white">
                <thead class="bg-blue-50">
                  <tr class="text-blue-500">
                    <th
                      class="w-24 p-3 text-sm font-extrabold tracking-wide text-left"
                    >
                      {{ $t("number") }}
                    </th>
                    <th
                      class="w-24 p-3 text-sm font-extrabold tracking-wide text-left"
                    >
                      {{ $t("userCode") }}
                    </th>
                    <th
                      class="w-48 p-3 text-sm font-extrabold tracking-wide text-left"
                    >
                      {{ $t("fullName") }}
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left"
                    >
                      {{ $t("activate") }}
                    </th>
                    <th
                      class="w-32 p-3 text-sm font-extrabold tracking-wide text-left"
                    >
                      {{ $t("detail") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(searchClient, index) in searchedClients"
                    :key="searchClient._id"
                    class="cursor-pointer hover:bg-blue-100 transition duration-200"
                  >
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap" @click="navigateToInClient(searchClient._id)">
                      {{ index + 1 }}
                    </td>
                    <td class="p-3 text-md text-gray-700" @click="navigateToInClient(searchClient._id)">
                      <span class="text-indigo-600">{{
                        searchClient.userCode
                      }}</span>
                    </td>
                    <td class="p-3 text-sm text-gray-500 whitespace-nowrap" @click="navigateToInClient(searchClient._id)">
                      {{ searchClient.firstName }} {{ searchClient.middleName }}
                      {{ searchClient.lastName }}
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button
                        @click="
                          showActivationModal = !showActivationModal;
                          userIdToBeActivated = searchClient._id;
                        "
                        class="flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      >
                        <i class="fas fa-check-circle mr-2"></i>
                        {{ $t("activate") }}
                      </button>
                    </td>
                    <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button
                        @click="navigateToInClient(searchClient._id)"
                        class="flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-cyan-300"
                      >
                        <i class="fas fa-eye mr-2"></i>
                        {{ $t("viewDetails") }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Pagination -->
              <div class="flex items-center justify-center mt-4">
                <span class="mr-2 font-bold">{{ $t("showMore") }}:</span>
                <select
                  v-model="clientsPerpage"
                  @change="changePerPageNumber"
                  class="h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <button
                  @click="previosPage"
                  class="ml-3 px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <i class="fa fa-chevron-left"></i>
                </button>
                <span
                  class="mx-3 px-3 py-1 rounded border bg-pink-500 text-white text-sm font-bold"
                >
                  {{ currentPage }}
                </span>
                <button
                  @click="nextPage"
                  class="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showActivationModal">
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
                    {{ $t("activeUser") }}
                  </h2>
                </div>
                <!-- Form Content -->
                <form>
                  <div class="mb-4">
                    <label
                      for="reason"
                      class="block text-lg font-medium text-gray-700"
                      >{{ $t("reasonForActivation") }}</label
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
                      @click.prevent="showActivationModal = false"
                      class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      {{ $t("cancel") }}
                    </button>
                    <button
                      @click.prevent="activate(userIdToBeActivated)"
                      type="submit"
                      class="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {{ $t("activate") }}
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
      showSuccessToast: false,
      showErrorToast: false,
      successToastMessage: "",
      errorToastMessage: "",
      showError: false,
      showSuccess: false,
      sucessMessage: "",
      errorMessage: "",
      deactivationReason: "",

      userIdToBeActivated: "",
      showActivationModal: false,
      showFamilyMemberModal: false,
      addingSuccess: false,
      screenSize: "",
      detailModal: false,
      searchedClients: [],
      clientId: "",
      clients: [
        {
          _id: "1",
          fullName: "Tadesse Gebremicheal berhe",
          firstName: "tadesse",
          middleName: "gebremicheal",
          lastName: "berehe",
          userCode: "BM 0023",
        },
      ],

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
      .get("/api/v1/users", {
        params: {
          isActive: false,
        },
      })
      .then((response) => {
        if (response.data.status === 1) {
          console.log("success fetching users");
          this.clients = response.data.users;
          this.searchedClients = this.clients;

          console.log("this clients from db", this.clients);
        }
      })
      .catch((error) => {
        console.log("eror fetching users", error);
      });
  },

  methods: {
    reloadPage() {
    window.location.reload();
    },
    showSuccessToastMessage(message) {
      this.successToastMessage = message;
      this.showSuccessToast = true;
      setTimeout(() => {
        this.showSuccessToast = false;
      }, 1000);

      // Toast will disappear after 3 seconds
    },
    showErrorToastMessage(message) {
      this.errorToastMessage = message;
      this.showErrorToast = true;
      setTimeout(() => {
        this.showErrorToast = false;
      }, 1000);

      // Toast will disappear after 3 seconds
    },
    activate(userId) {
      
      this.showActivationModal = false;
      const payload = {
        userId: userId,
        reason: this.deactivationReason,
        isActive: true,
      };
      console.log("payload", payload);
      this.showDeactivateModal = false;

      this.$apiClient
        .put("/api/v1/users/active-deactive", payload)
        .then((response) => {
          console.log("users", response);
          if (response.data.status === 1) {
            this.showSuccessToastMessage(response.data.message);
            this.reloadPage();
          }
        })
        .catch((error) => {
          console.log(error);
          // this.errorMessage = error.response.data.message
          // this.showError=true;
          this.showErrorToastMessage("Something went wrong");
        });
    },
    showActiveUsers() {
      this.$router.push(`/admindashboard/clients`);
    },
    changePerPageNumber() {
      this.perPage = this.clientsPerpage;
      this.showMoreChanged = true;
      console.log("perpage is", this.perPage);
      //this.searchedClients=this.clients
      this.displayedItems();
    },
    saveFamilyMember() {
      this.showFamilyMemberModal = false;
      const familyNewData = {
        familyMembers: this.familyMembers,
      };

      console.log("id=", this.clientId);
      this.apiClient
        .post(`/api/v1/users/family/${this.clientId}`, familyNewData)
        .then((response) => {
          console.log("Response", response);
          this.addingSuccess = true;
        }).catch;
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
          client.fullName
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          client.userCode.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });

      console.log("filtered users", this.searchedClients);
    },
    // filteredClientsInSearch() {
    //   console.log("search", this.searchQuery);
    //   if (this.searchQuery !== "") {
    //     console.log("this.current pageinsearch", this.currentPage);
    //     if (this.currentPage) {
    //       const query = this.searchQuery.toLowerCase();
    //       return (this.searchedClients = this.clients.filter(
    //         (client) =>
    //           client.firstName.includes(query) ||
    //           client.middleName.includes(query) ||
    //           client.lastName.includes(query) ||
    //           client.userCode.includes(query)
    //         // Add more conditions for other table headers
    //       ));
    //     }
    //     const query = this.searchQuery.toLowerCase();
    //     return (this.searchedClients = this.searchedClients.filter(
    //       (client) =>
    //         client.name.firstName.includes(query) ||
    //         client.name.middleName.includes(query)
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
