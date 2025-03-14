<template>
  <div class="p-4 m-2 bg-white shadow-lg ">
    <Toast ref="toast" />
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center space-x-4 py-4 bg-white rounded-lg">
        <label class="flex items-center space-x-2">
          <span class="text-sm text-blue-600 font-semibold tracking-wide"
            >Show
          </span
          >
          <select
            @change="changeCurrentPage()"
            v-model="itemsPerPage"
            class="border border-gray-300 rounded-md h-6 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 hover:border-blue-400"
          >
            <option
              v-for="option in itemsPerPageOptions"
              :key="option"
              :value="option"
              class="text-gray-700"
            >
              {{ option }}
            </option>
          </select>
        </label>
      </div>
      <div class="flex items-center space-x-2">
        <label for="search" class="custom-label">Search:</label>
        <input
          id="search"
          type="text"
          v-model="searchQuery"
          class="border border-blue-600 rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-blue-300 w-1/2 lg:w-full hover:border-2 border-blue-500"
        />
      </div>
    </div>

    <div class="overflow-x-auto overflow-y-auto">
      <table class="table-auto border-b-2 border-gray-300 overflow-y-auto w-full">
        <thead
          class="border-b-2 border-gray-300 border-r border-t border-l border-gray-300"
        >
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              @click.prevent="sortBy(header.key)"
              class="cursor-pointer border-b border-blue-300 text-left py-2 px-3 text-blue-500"
            >
              <div class="flex items-center">
                <span>{{ header.label }}</span>
                <span v-if="sortKey === header.key" class="ml-2">
                  {{ sortDirection === "asc" ? "▲" : "▼" }}
                </span>
                <span v-else class="ml-2 text-gray-300">⬍</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in paginatedData"
            :key="user._id"
            class="font-bold border-r border-t border-l border-gray-300 bg-white text-gray-500 text-xs hover:bg-blue-100"
          >
            <td
              class="cursor-pointer border-b border-gray-300 py-1 px-3 whitespace-nowrap text-blue-500 font-extrabold"
              @click="navigateToInClient(user._id)"
            >
              {{ user.userCode }}
            </td>
            <td
              class="cursor-pointer border-b border-gray-300 py-1 px-3 whitespace-nowrap"
              @click="navigateToInClient(user._id)"
            >
              {{ user.fullName }}
            </td>
            <td
              class="cursor-pointer border-b border-gray-300 py-1 px-3 whitespace-nowrap"
              @click="navigateToInClient(user._id)"
            >
              {{ user.phoneNumber}}
            </td>
           

            <td
              class="cursor-pointer border-b border-gray-300 py-1 px-3 whitespace-nowrap"
              @click="navigateToInClient(user._id)"
            >
              {{ user.email }}
            </td>
            <td class="border-b border-gray-300 py-2 px-3">
  <div class="flex items-center space-x-2">
    
    <!-- Info Button -->
    <div class="relative group">
      <button
        @click="navigateToInClient(user._id)"
        class="bg-blue-500 text-white px-2 py-2 rounded flex items-center space-x-1 hover:bg-blue-600"
      >
        <i class="fas fa-info-circle"></i>
      </button>
      <span
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
      >
        View Detail
      </span>
    </div>

    <!-- Reset Password Button -->
    <div class="relative group">
      <button
        @click="
          showResetModal = !showResetModal;
          selectedUserToBeResetPassword = user;
        "
        class="bg-yellow-500 text-white px-2 py-2 rounded flex items-center space-x-1 hover:bg-yellow-600"
      >
        <i class="fas fa-sync-alt"></i>
      </button>
      <span
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
      >
        Reset Password
      </span>
    </div>

    <!-- Deactivate Button -->
    <div class="relative group">
      <button
        @click="
          showDeactivateModal = !showDeactivateModal;
          userIdToBeDeactivated = user._id;
        "
        class="bg-pink-500 text-white px-2 py-2 rounded flex items-center space-x-1 hover:bg-red-600"
      >
        <i class="fas fa-ban"></i>
      </button>
      <span
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
      >
        Deactivate User
      </span>
    </div>

    <!-- Delete Button (Only for SuperAdmin) -->
    <div v-if="role === 'SuperAdmin'" class="relative group">
      <button
        @click="
          showDelateModal = !showDelateModal;
          userToBeDeleted = user;
        "
        class="bg-red-500 text-white px-2 py-2 rounded flex items-center space-x-1 hover:bg-red-600"
      >
        <i class="fas fa-trash"></i>
      </button>
      <span
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
      >
        Delete User
      </span>
    </div>

  </div>
</td>

          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center mt-4">
      <div class="text-sm text-gray-600">
        Showing {{ currentRangeStart }} to {{ currentRangeEnd }} of
        {{ filteredData.length }} entries ({{ totalPages }} pages)
      </div>
      <div class="flex items-center space-x-1 overflow-x-auto">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="pr-2 bg-gray-300 hover:bg-gray-400 text-blue-700 rounded disabled:opacity-50"
        >
          ◀
        </button>
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-50 text-blue-500 hover:bg-gray-200',
            'px-3 py-1 rounded text-sm',
          ]"
        >
          {{ page }}
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="pl-2 bg-gray-300 hover:bg-gray-400 text-blue-700 rounded disabled:opacity-50"
        >
          ▶
        </button>
      </div>
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
    <div v-if="showDeactivateModal">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-40"
        >
          <div class="bg-white rounded-lg p-6 border border-orange-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                <div class="flex mb-4">
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
                  <h2 class="text-2xl font-extrabold text-blue-800">
                    Deactivate User
                  </h2>
                </div>
                <!-- Form Content -->
                <form>
                  <div class="mb-4">
                    <label
                      for="reason"
                      class="custom-label text-lg"
                      >Reason for Deactivation</label
                    >
                    <input
                      type="text"
                      id="reason"
                      v-model="deactivationReason"
                      class="custom-input"
                      placeholder="Enter reason"
                      required
                    />
                  </div>
                  <div class="flex  space-x-4 mt-6">
                    <button
                      @click.prevent="deactivate(userIdToBeDeactivated)"
                      type="submit"
                      class="custom-button"
                    >
                      <i class="fas fa-check-circle mr-2"></i>
                      {{ $t("Submit") }}
                    </button>

                    <button
                      @click.prevent="showDeactivateModal = false"
                      class="rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
    <div v-if="showDelateModal">
   <transition name="fade" mode="out-in">
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deleteModalTitle"
    >
      <!-- Modal Content -->
      <div class="bg-white rounded-lg shadow-lg w-96">
        <!-- Modal Header -->
        <div
          class="bg-blue-500 text-white flex items-center justify-between rounded-t-lg px-4 py-3"
        >
          <h2 id="deleteModalTitle" class="text-lg font-semibold">
            Confirm Deletion
          </h2>
          <button
            @click="showDelateModal = false"
            class="text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close Modal"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4 text-gray-700">
          <p>Are you sure you want to delete this user? This action cannot be undone.</p>
        </div>

        <!-- Modal Footer -->
        <div class="flex space-x-3 p-4">
          <button
            @click="confirmUserDelete(userToBeDeleted)" 
            class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <i class="fas fa-check mr-2"></i> Yes, Delete
          </button>
          <button
            @click="showDelateModal = false"
            class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <i class="fas fa-times mr-2"></i> Cancel
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
export default {
  components: { Toast },
  data() {
    return {
      role:"",
      showResetedPasswordModal: false,
      showResetModal: false,
      showDelateModal:false,
      selectedUserToBeResetPassword: "",
      userIdToBeDeactivated: "",
      showResetedPasswordModal: false,
      showDeactivateModal: false,
      userToBeDeleted:"",
      headers: [
        { key: "userCode", label: "Code" },
        { key: "fullName", label: "Full Name" },
        { key: "phoneNumber", label: "Phone Number" },
        { key: "email", label: "Email" },
        { key: "actions", label: "Actions" },
      ],

      data: [],
      searchQuery: "",
      sortKey: "",
      sortDirection: "asc",
      currentPage: 1,
      itemsPerPage: 10,
      itemsPerPageOptions: [3, 5, 10, 20, 50],
    };
  },
  computed: {
    filteredData() {
      if (!this.searchQuery) {
        return this.data;
      }

      if (this.currentPage != 1) {
        this.currentPage = 1;
      }
      return this.data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
    sortedData() {
      if (!this.sortKey) {
        return this.filteredData;
      }
      return [...this.filteredData].sort((a, b) => {
        const compareA = a[this.sortKey];
        const compareB = b[this.sortKey];
        return this.sortDirection === "asc"
          ? compareA > compareB
            ? 1
            : -1
          : compareA < compareB
          ? 1
          : -1;
      });
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.sortedData.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    currentRangeStart() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    currentRangeEnd() {
      return Math.min(
        this.currentPage * this.itemsPerPage,
        this.filteredData.length
      );
    },
    visiblePages() {
      const range = [];
      for (let i = 1; i <= this.totalPages; i++) {
        range.push(i);
      }
      return range;
    },
  },
  created(){
    this.role=localStorage.getItem("role");  },
  async mounted() {
    this.$store.dispatch("commitActiveItem", { activeItem: 'clients' });
    await this.fetchData();
  },
  methods: {
   
confirmUserDelete(userToBeDeleted) {



console.log("user to be dekleted",userToBeDeleted);

 this.$apiDelete('/api/v1/users',userToBeDeleted._id)
   .then(response => {
     console.log("Response:", response);
     this.showDelateModal = false;
     this.$refs.toast.showSuccessToastMessage(response.message);
     setTimeout(() => {
       this.$reloadPage();
     }, 2000);
   })
   .catch(error => {
     console.log("Error:", error);
   });
},
    changeCurrentPage() {
      this.currentPage = 1;
    },
    async fetchData() {
      try {
        const response = await this.$apiGet("/api/v1/users", {
          isActive: true,
        });
        console.log("users are ", response);
        this.data = response.users || [];
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortDirection = "asc";
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },

    async resetPassword(user) {
      console.log("userId is", user._id);
      this.showResetModal = false;
      const payload = {
        id: user._id,
      };
      try {
        await this.$apiPatch(
          "/api/v1/users/resetPasswordByAdmin",
          user._id,
          payload
        ).then((response) => {
          console.log("users", response);
          if (response.status === 1) {
            //alert("reseted");
            this.showResetedPasswordModal = true;

            this.resetedPassword = response.resetedPassword;
            this.$refs.toast.showSuccessToastMessage(response.message);
            this.displayedItems();
          }
        });
      } catch (error) {
        this.errorMessage = error.message;
        this.showError = true;
        console.log("error during reseting", error.status, error.message);
      } finally {
      }
    },

    async deactivate(userId) {
      // alert("deactivate");

      const payload = {
        reason: this.deactivationReason,
        isActive: false,
      };

      console.log("payload", payload);
      this.showDeactivateModal = false;

      try {
        await this.$apiPut(
          "/api/v1/users/active-deactive",
          userId,
          payload
        ).then((response) => {
          console.log("users", response);
          if (response.status === 1) {
            this.$refs.toast.showSuccessToastMessage(response.message);
            this.$reloadPage();
          } else {
            this.showErrorToastMessage("Something went wrong!!");
          }
        });
      } catch (error) {
        console.log("error during activating", error.status, error.message);
        this.$refs.toast.showErrorToastMessage("Something went wrong!!");
      } finally {
      }
    },

    navigateToInClient(clientId) {
      this.$router.push(`/admindashboard/edit-client/${clientId}`);
    },
  },
};
</script>
  