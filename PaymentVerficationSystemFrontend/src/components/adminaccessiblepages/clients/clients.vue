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
      <button class="custom-button text-xs" @click="showDeactivatedUsers()">
        <i class="fa fa-user-slash" aria-hidden="true"></i> {{ $t("View Deactivated Users") }}
      </button>
    </div>
  </div>
</div>

<clientTable></clientTable>
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
   const params= {
    isActive: true 
   }
    try {
      await this.$apiGet("/api/v1/users",params).then(
        (response) => {
          this.clients = response.users;
          this.searchedClients = this.clients;
        }
      );
    } catch (error) {
      console.log("from api error global", error.status, error.message);
    } finally {
      //this.loading = false; // Stop loading once the request is complete
    }
  },

  methods: {
   
    async resetPassword(user) {
      console.log("userId is", user._id);
      this.showResetModal = false;
      const payload = {
        id: user._id,
        email: user.email,
      };
      try{
      await this.$apiPatch("/api/v1/users/resetPasswordByAdmin",'', payload)
        .then((response) => {
          console.log("users", response);
          if (response.status === 1) {
            this.showResetedPasswordModal = true;
            this.resetedPassword = response.resetedPassword;
            this.$refs.toast.showSuccessToastMessage(response.message);
            this.displayedItems();
          }
        })
      }catch(error){
          this.errorMessage = error.message;
          this.showError = true;
          conmsole.log("error during reseting",error.status,error.message)
        }finally{

        };
    },

    async deactivate(userId) {
      const payload = {
        reason: this.deactivationReason,
        isActive: false,
      };

      console.log("payload", payload);
      this.showDeactivateModal = false;

      try{
        await this.$apiPut("/api/v1/users/active-deactive",userId, payload)
        .then((response) => {
          console.log("users", response);
          if (response.status === 1) {
            this.$refs.toast.showSuccessToastMessage(response.message);
            this.$reloadPage();
          } else {
            this.showErrorToastMessage("Something went wrong!!");
          }
        })
       }catch(error) {
          console.log("error during activating",error.status,error.message);
          this.$refs.toast.showErrorToastMessage("Something went wrong!!");
        }finally{

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
