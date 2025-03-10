<template>
    <div class="p-4 m-2 bg-white shadow-lg mb-32">
      <Toast ref="toast" />
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center space-x-4 py-4 bg-white rounded-lg">
          <label class="flex items-center space-x-2">
            <span class="text-sm text-blue-600 font-semibold tracking-wide"
              >Show</span
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
  
      <div class="overflow-x-auto overflow-y-auto w-full">
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
                {{ user.email }}
              </td>
              <td class="border-b border-gray-300 py-2 px-3">
                <div class="flex items-center space-x-2">
                  <button
                    @click="navigateToInClient(user._id)"
                    class="bg-blue-500 text-white px-2 rounded flex items-center space-x-1 hover:bg-blue-600"
                  >
                    <i class="fas fa-info-circle"></i>
                    <span>Detail</span>
                  </button>
                  
                  <button
                    @click="
                      showActivateModal = !showActivateModal;
                      userIdToBeActivated = user._id;
                    "
                    class="bg-blue-500 text-white px-2 rounded flex items-center space-x-1 hover:bg-blue-700"
                  >
                    <i class="fa fa-bolt"></i>
                    <span>activate</span>
                  </button>
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
  
    
   
      <div v-if="showActivateModal">
        <transition name="fade" mode="out-in">
          <div
            class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
          >
            <div class="bg-white rounded-lg p-6 border border-orange-500">
              <div class="fixed inset-0 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                  <div class="flex mb-4">
                    <!-- Warning Icon -->
                    <svg
  class="w-8 h-8 text-blue-500 mr-2"
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
                     Activate User
                    </h2>
                  </div>
                  <!-- Form Content -->
                  <form>
                    <div class="mb-4">
                      <label
                        for="reason"
                        class="custom-label text-lg"
                        >Reason for Activation</label
                      >
                      <input
                        type="text"
                        id="reason"
                        v-model="activationReason"
                        class="custom-input"
                        placeholder="Enter reason"
                        required
                      />
                    </div>
                    <div class="flex space-x-4 mt-6 ">
                      <button
                        @click.prevent="activate(userIdToBeActivated)"
                        type="submit"
                        class="custom-button"
                      >
                        <i class="fas fa-check-circle mr-2"></i>
                        {{ $t("Submit") }}
                      </button>
  
                      <button
                        @click.prevent="showActivateModal = false"
                        class="rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4  focus:outline-none focus:ring-2 focus:ring-gray-500"
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
    </div>
  </template>
    
    <script>
  import Toast from "../../Common/Toast.vue";
  export default {
    components: { Toast },
    data() {
      return {
        showResetedPasswordModal: false,
        showResetModal: false,
  
        selectedUserToBeResetPassword: "",
        userIdToBeDeactivated: "",
        showResetedPasswordModal: false,
        showActivateModal: false,
  
        headers: [
          { key: "userCode", label: "Code" },
          { key: "fullName", label: "Full Name" },
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
    async mounted() {
      this.$store.dispatch("commitActiveItem", { activeItem: 'clients' });
      await this.fetchData();
    },
    methods: {
      changeCurrentPage() {
        this.currentPage = 1;
      },
      async fetchData() {
        try {
          const response = await this.$apiGet("/api/v1/users", {
            isActive: false,
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
  
  
  
      async activate(userId) {
        // alert("deactivate");
  
        const payload = {
          reason: this.deactivationReason,
          isActive: true,
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
    