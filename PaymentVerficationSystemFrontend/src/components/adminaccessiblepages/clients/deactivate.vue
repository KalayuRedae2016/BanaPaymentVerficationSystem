<template>
  <div>
    <Toast ref="toast" />
    <div class="container mx-auto p-4 flex flex-col">
      <div class="flex flex-row w-full border-b border-blue-500 pb-1">
        <p class="text-blue-500 text-md font-bold">{{ $t("De-Activated Clients") }}</p>
        <div class="ml-auto flex space-x-2">

          <button class="custom-button text-xs" @click="showActiveUsers()">
            <i class="fa fa-user-slash" aria-hidden="true"></i> {{ $t("View Active Users") }}
          </button>
        </div>
      </div>
    </div>
    <DeactivatedTable></DeactivatedTable>

    <div v-if="showActivationModal">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div class="bg-white rounded-lg p-6 border border-orange-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                <div class="flex items-center justify-center mb-4">
                  <!-- Warning Icon -->
                  <svg class="w-8 h-8 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h1m0 4h-1m1-4V8h-1v4h1m0 4h-1V8h1m0-4h-1V4h1v4zM12 9V5h.01M4.93 4.93l.08-.08 6.99 6.99M8.34 8.34l6.99 6.99-.08.08M4.93 19.07l6.99-6.99M4.93 4.93l14.14 14.14">
                    </path>
                  </svg>
                  <h2 class="text-2xl font-bold text-gray-800">
                    {{ $t("activeUser") }}
                  </h2>
                </div>
                <!-- Form Content -->
                <form>
                  <div class="mb-4">
                    <label for="reason" class="block text-lg font-medium text-gray-700">{{ $t("reasonForActivation")
                      }}</label>
                    <input type="text" id="reason" v-model="deactivationReason"
                      class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter reason" required />
                  </div>
                  <div class="flex justify-end space-x-4 mt-6">
                    <button @click.prevent="showActivationModal = false"
                      class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500">
                      {{ $t("cancel") }}
                    </button>
                    <button @click.prevent="activate(userIdToBeActivated)" type="submit"
                      class="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500">
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
import Toast from '../../Common/Toast.vue'
import DeactivatedTable from './deactivatedTable.vue'
export default {
  name: "ClientsView",
  components: {
    Toast,
    DeactivatedTable
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
      clients: [],

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

  async mounted() {
    this.$store.dispatch("commitActiveItem", { activeItem: 'clients' });
    try {
      const params = {
        isActive: false,
      }
      await this.$apiGet("/api/v1/users",
        params)
        .then((response) => {
          if (response.status === 1) {
            console.log("success fetching users");
            this.clients = response.users;
            this.searchedClients = this.clients;

            console.log("this clients from db", this.clients);
          }
        })
    } catch (error) {
      console.log("eror fetching users", error.status, error.message);
    } finally {

    };
  },

  methods: {
    reloadPage() {
      window.location.reload();
    },

    async activate(userId) {
      this.showActivationModal = false;

      const payload = {
        reason: this.deactivationReason,
        isActive: true,
      };
      console.log("payload", payload);
      this.showDeactivateModal = false;

      try {
        await this.$apiPut("/api/v1/users/active-deactive", userId, payload)
          .then((response) => {
            console.log("users", response);
            if (response.status === 1) {
              this.$refs.toast.showSuccessToastMessage(response.message);
              this.reloadPage();
            }
          })
      } catch (error) {
        console.log("error", error.status, error.message);
        this.$refs.toast.showErrorToastMessage("Something went wrong");
      } finally {

      };
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
