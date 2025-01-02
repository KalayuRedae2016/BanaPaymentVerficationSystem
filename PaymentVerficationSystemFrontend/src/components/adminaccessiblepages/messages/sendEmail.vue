<template>
  <div>
    <Toast ref="toast"/>
    <!-- this is the page to send email -->
    <div class="container mx-auto p-4 flex flex-col">
      <div class="flex flex-row space-x-3">
        <p class="text-blue-500 text-md font-bold">{{ $t("Send Message") }}</p>
      </div>
 

      <div class="border-t border-blue-500 mt-3 text-xs">
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
                    <td class="p-4 text-md text-gray-700 hidden h-8">
                      <span class="font-bold text-indigo-600">{{
                        index + 1
                      }}</span>
                    </td>
                    <td class="p-4 text-md text-gray-700 h-6">
                      <span class="font-bold text-indigo-600">{{
                        searchClient.userCode
                      }}</span>
                    </td>
                    <td class="p-4 text-md text-gray-700 font-bold h-6">
                      {{ searchClient.fullName }}
                    </td>
                    <td class="p-4 text-md text-gray-700 font-bold h-6">
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

            <p class="text-red-500" v-if="subjectIsRequired">Subject is required</p>
            <p class="text-red-500" v-if="messageIsRequired">Message is required</p>
            <p class="text-red-500" v-if="showError">{{ errorMessage }}</p>
            <p class="text-red-500" v-if="selectAtLeastOneEmail">Please Select At least one email to send the message</p>



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



  </div>
</template>

<script>
import Toast from '../../Common/Toast.vue'
export default {
  name: "usersView",
  components: {
    Toast,
  },
  data() {
    return {
      selectAtLeastOneEmail:false,
      subjectIsRequired:false,
      messageIsRequired:false,
      
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

  async mounted() {
    this.searchedusers = this.users;
      try { await this.$apiGet("/api/v1/users", {
        params: {
          isActive: true,
        },
      })
      .then((response) => {
        console.log("response active users are", response);
        this.users = response.users;
        this.searchedusers = this.users;
      })
    }catch(error) {
        console.log("error", error);
    }finally {

    };
  },

  methods: {
    

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
    async sendMessage() {

      this.showError=false;
      this.subjectIsRequired=false;
      this.messageIsRequired=false;
      this.selectAtLeastOneEmail=false;

      if (this.subject == "" || this.subject==null) {
        this.subjectIsRequired=true;

        //this.showErrorToastMessage("Subject is required");
        return;
      }
      if (this.message == "" || this.message == null) {
        this.messageIsRequired=true;
        //this.showErrorToastMessage("Message is required");
        return;
      }
      if (this.emails == "" || this.emails.length===0) {
        this.selectAtLeastOneEmail=true;
        //this.showErrorToastMessage("Please select users to send message");
        return;
      }
      const emailList = {
        subject: this.subject,
        message: this.message,
        emails: this.emails,
      };

      console.log(emailList);

      try { 
        await this.$apiPost("/api/v1/users/sendEmails", emailList)
        .then((response) => {
          console.log("users", response.message);
          if (response.status === 1) {
            this.searchedusers = this.users; //response.data.message;
            this.displayedItems();
            this.$refs.toast.showSuccessToastMessage(response.message);
            this.$reloadPage();
            
          }
        })
       }catch(error)  {
          console.error("Error fetching users:", error);
          this.showErrorToastMessage("Something went wrong");
        }finally{

        };
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
  }

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
