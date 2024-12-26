<template>
  <div>
    <!-- this is the page to send email -->
    <div class="container mx-auto p-4 flex flex-col">
      <div class="flex flex-row space-x-3">
        <p class="text-blue-500 text-md font-bold">{{ $t("Send Message") }}</p>
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
          <span class="block sm:inline">{{ succesToastMessage }}</span>
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

      <div class="border-t border-indigo-800 mt-3 text-xs">
        <div
          class="border border-gray-200 flex flex-col bg-white rounded-lg shadow-md mt-8 border-t border-r border-l border-gray-200"
        >
          <form action="" class="mx-4 lg:mx-16 mt-8">
            <div class="flex flex-col lg:flex-row">
              <label class="custom-label w-1/4 mt-3" for="subject">
                {{ $t("subject") }}<span class="text-red-500 ml-1">*</span>
              </label>
              <input
                class="custom-input"
                id="subject"
                type="email"
                placeholder="subject"
                v-model="subject"
              />
            </div>

            <div class="flex flex-col lg:flex-row mt-10">
              <label for="message" class="custom-label w-1/4 mt-5"
                >{{ $t("message")
                }}<span class="text-red-500 ml-1">*</span></label
              >
              <textarea
                id="message"
                v-model="message"
                class="custom-text-area"
                rows="6"
                required
              ></textarea>
            </div>

            <div class="flex flex-row mb-5 mt-5">
              <label class="custom-label text-xs w-1/4 mt-5" for="search">
                {{ $t("sendTo") }}:<span class="text-red-500 ml-1">*</span>
              </label>
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="$t('searchByNameEmailUsername')"
                class="custom-input"
              />
            </div>

            <div class="overflow-x-auto overflow-y-auto max-h-96">
              <!-- Table -->
              <table
                class="table-auto min-w-full border-collapse border-b border-gray-300"
              >
                <!-- Table Head -->
                <thead class="bg-blue-50 text-white sticky top-0 z-0">
                  <tr class="text-blue-500">
                    <th class="w-24 p-4 font-bold text-left">
                      {{ $t("check") }}
                      <input
                        type="checkbox"
                        class="ml-2"
                        v-model="selectAll"
                        @change="selectDeselectAll()"
                      />
                    </th>
                    <th class="w-24 p-4 font-bold text-left">
                      {{ $t("userCode") }}
                    </th>
                    <th class="w-24 p-4 font-bold text-left">
                      {{ $t("fullName") }}
                    </th>
                    <th class="w-24 p-4 font-bold text-left">
                      {{ $t("email") }}
                    </th>
                  </tr>
                </thead>
                <!-- Scrollable Table Body -->
                <tbody
                  class="divide-y divide-gray-200 bg-gray-50 overflow-y-auto max-h-96"
                >
                  <tr
                    @click="selectDeselectEmail(searchClient.email)"
                    v-for="(searchClient, index) in searchedusers"
                    :key="searchClient._id"
                    class="cursor-pointer bg-white hover:shadow-lg hover:bg-gray-100 rounded-lg h-8"
                  >
                    <td class="text-md text-gray-700">
                      <input
                        type="checkbox"
                        class="pl-4 rounded focus:ring focus:ring-indigo-300"
                        :checked="emails.includes(searchClient.email)"
                        @change="selectDeselectEmail(searchClient.email)"
                      />
                    </td>
                    <td class="p-0 text-md text-gray-700 hidden h-8">
                      <span class="font-bold text-indigo-600">{{
                        index + 1
                      }}</span>
                    </td>
                    <td class="p-0 text-md text-gray-700 h-6">
                      <span class="font-bold text-indigo-600">{{
                        searchClient.userCode
                      }}</span>
                    </td>
                    <td class="p-0 text-md text-gray-700 font-bold h-6">
                      {{ searchClient.fullName }}
                    </td>
                    <td class="p-0 text-md text-gray-700 font-bold h-6">
                      {{ searchClient.email }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="w-full mt-5 bg-blue-100 border-t blue-200 p-4 text-blue-700"
            >
              Total selected :
              <span class="text-gray-600 font-extrabold">{{
                emails.length
              }}</span>
            </div>
            <button
              @click.prevent="sendMessage()"
              class="my-4 w-full lg:w-1/4 custom-button text-lg"
            >
              <i class="fas fa-envelope"></i> {{ $t("sendMessage") }}
            </button>
          </form>
        </div>
      </div>
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
                  <h2 class="text-md text-green-800">{{ $t("success") }}!</h2>
                </div>
                <p class="text-blue-800 text-md ml-8">
                  {{ successMessage }}
                </p>
                <button
                  @click="showSuccess = false"
                  class="ml-8 mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {{ $t("ok") }}
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
                  <h2 class="text-sm font-bold text-gray-800">
                    {{ $t("error") }}!
                  </h2>
                </div>
                <p class="text-gray-600 text-sm">
                  {{ errorMessage }}
                </p>
                <button
                  @click="showError = false"
                  class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {{ $t("ok") }}
                </button>
              </div>
            </div>
            <hr class="my-4 bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "usersView",
  components: {
    //usersForm,
  },
  data() {
    return {
      successToastMessage: "",
      errorToastMessage: "",
      showErrorToast: false,
      showSuccessToast: false,

      showError: false,
      showSuccess: false,
      successMessage: "",
      errorMessage: "",

      messageSentSuccessfully: false,
      selectAll: false,
      showFamilyMemberModal: false,
      addingSuccess: false,
      screenSize: "",
      detailModal: false,
      searchedusers: [],
      subject: "",
      message: "",
      selectedUserIds: [],
      selectedUsers: [],
      clientId: "",
      emails: [],
      users: [
        // {
        //   _id: "1",
        //   userCode:"bana01",
        //   firstName: "John",
        //   middleName: "A.",
        //   lastName: "Doe",
        //   email: "bruhtesheme@gmail.com",
        // },
        // {
        //   _id: "2",
        //   userCode:"bana02",
        //   firstName: "Jane",
        //   middleName: "B.",
        //   lastName: "Smith",
        //   email: "tadiosgb26@gmail.com",
        // },
        // {
        //   _id: "3",
        //   userCode:"bana03",
        //   firstName: "Emily",
        //   middleName: "C.",
        //   lastName: "Jones",
        //   email: "hailomasegede@gmail.com",
        // },
      ],
      showMoreChanged: false,
      filteredCleints: [],
      displayedusers: [],
      currentPage: 1,
      searchQuery: "",
      perPage: 5,
      clientName: "",
      usersPerpage: "",
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
      return Math.ceil(this.users.length / this.perPage);
    },
  },

  mounted() {
    this.searchedusers = this.users;
    this.$apiClient
      .get("/api/v1/users", {
        params: {
          isActive: true,
        },
      })
      .then((response) => {
        console.log("response active users are", response);
        this.users = response.data.users;
        this.searchedusers = this.users;
      })
      .catch((error) => {
        console.log("error", error);
      });
  },

  methods: {
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
    selectDeselectEmail(email) {
      console.log("selectDeselectEmail", email);
      const index = this.emails.indexOf(email);
      if (index === -1) {
        // Email is not selected, add it to the 'emails' array
        this.emails.push(email);
        console.log("selected emails", this.emails);
      } else {
        // Email is selected, remove it from the 'emails' array
        this.emails.splice(index, 1);
        console.log("Deselected email ", email);
      }
      console.log("emails", this.emails);
    },
    selectDeselectAll() {
      this.emails = [];
      if (this.selectAll) {
        this.emails = this.users.map((user) => user.email);
        console.log("emails", this.emails);
      } else {
        this.emails = [];
        console.log("Deselected all emails ", this.emails);
      }
    },
    sendMessage() {
      if (this.subject == "") {
        this.showErrorToastMessage("Subject is required");
        return;
      }
      if (this.message == "") {
        this.showErrorToastMessage("Message is required");
        return;
      }
      if (this.emails == "") {
        this.showErrorToastMessage("Please select users to send message");
        return;
      }
      const emailList = {
        subject: this.subject,
        message: this.message,
        emails: this.emails,
      };

      console.log(emailList);
      this.$apiClient
        .post("/api/v1/users/sendEmails", emailList)
        .then((response) => {
          console.log("users", response.data.message);
          if (response.data.status === 1) {
            this.searchedusers = this.users; //response.data.message;
            this.displayedItems();
            this.showSuccessToastMessage("Email sent successfully");
            // this.showSuccess=true;
            // this.successMessage = response.data.message;
            this.selectAll = false;
          }
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          this.showErrorToastMessage("Something went wrong");
        });
      this.emails = [];
    },
    updateSelectedUsers() {
      console.log(this.selectedUserIds);
      this.selectedUsers = this.users.filter((user) =>
        this.selectedUserIds.includes(user._id)
      );
      console.log(this.selectedUsers);
    },

    changePerPageNumber() {
      this.perPage = this.usersPerpage;
      this.showMoreChanged = true;
      console.log("perpage is", this.perPage);
      this.searchedusers = this.users;
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
          if (response.data.status === 1) {
            this.searchedusers = response.data.message;
            this.users = response.data.message;
            this.messageSentSuccessfully = true;
            //console.log("this.userssearch", this.searchedusers);
            //this.displayedItems();
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

    filteredusersInSearch() {
      //alert("tadios");
      console.log("search", this.searchQuery);
      console.log("this.users", this.users);

      if (this.searchQuery !== "") {
        const query = this.searchQuery.toLowerCase();
        this.searchedusers = this.users.filter(
          (client) =>
            client.fullName.toLowerCase().includes(query) ||
            client.userCode.toLowerCase().includes(query)
          // Add more conditions for other table headers
        );
        console.log("searched clients: ", this.searchedusers);
        return this.searchedusers;
      } else {
        console.log("searchedusers and it is empty", this.searchedusers);
        this.searchedusers = this.users;
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
        this.searchedusers = this.users.slice(startIndex, endIndex);
        console.log("this.searchedusers", this.searchedusers);

        return this.searchedusers;
      } else {
        console.log("show more changed is false");
        console.log("this.currentPage", this.currentPage); // "2"
        console.log("this.perpage", this.perPage); // "2"

        const startIndex =
          (parseInt(this.currentPage) - 1) * parseInt(this.perPage);
        console.log("start index", startIndex); // (2 - 1) * 2 = 2

        const endIndex = startIndex + parseInt(this.perPage);
        console.log("end index", endIndex); // 2 + 2 = 4

        console.log("this.searchedusers", this.searchedusers);
        return (this.searchedusers = this.users.slice(startIndex, endIndex));
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
