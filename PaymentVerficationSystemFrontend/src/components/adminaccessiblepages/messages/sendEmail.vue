<template>
<div>
  <!-- this is the page to send email -->
  <div class="container mx-auto p-4 flex flex-col">
    <div class="flex flex-row space-x-3">
      <p class="text-blue-800 text-md font-bold">{{ $t("sendEMessage") }}</p>
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
      class="z-20 fixed right-5  bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
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
      class="z-20 fixed right-5  bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
      role="alert"
    >
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">{{ errorToastMessage }}</span>
    </div>
  </transition> 

    <div class="border-t border-indigo-800 mt-3 text-xs">
      <div
        class="mb-96 border border-gray-200 flex flex-col bg-white rounded-lg shadow-md mt-8 border-t border-r border-l border-gray-200"
      >
        <form action="">
          <div class="mb-4 mx-4 mt-5">
            <label class="custom-label" for="subject">
              {{ $t('subject') }}<span class="text-red-500 ml-1">*</span>
            </label>
            <input
              class="custom-input"
              id="subject"
              type="email"
              placeholder="subject"
              v-model="subject"
            />
          </div>

          <div class="mb-4 mx-4">
            <label for="message" class="block text-gray-700 font-medium mb-2"
              >{{ $t("message")
              }}<span class="text-red-500 ml-1">*</span></label
            >
            <textarea
              id="message"
              v-model="message"
              class="custom-input"
              rows="6"
              required
            ></textarea>
          </div>

          <div class="flex flex-row space-x-5 mb-4 mx-4 mt-5 text-xs">
            <label class="custom-label text-xs" for="search">
              {{ $t("sendTo")}}:<span class="text-red-500 ml-1 ">*</span>
            </label>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('searchByNameEmailUsername')"
              class="custom-input"
            />
          </div>

          <div class="overflow-x-auto">
            <table class="w-full border-b border-gray-300">
              <thead>
                <tr class="bg-gray-200">
                  <th
                    class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                  >
                  {{ $t("check")}}
                    <input
                      type="checkbox"
                      v-model="selectAll"
                      @change="selectDeselectAll()"
                    />
                  </th>
                  <th
                    class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    {{ $t("number") }}
                  </th>
                  <!-- <th
                      class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                    >
                      {{ $t("userCode") }}
                    </th> -->
                  <th
                    class="w-24 p-3 text-xs font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    {{ $t("fullName") }}
                  </th>
                  <th
                    class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    {{ $t("email") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(searchClient, index) in searchedusers"
                  :key="searchClient._id"
                >
                  <td class="p-3 text-xs text-gray-500 whitespace-nowrap">
                    <input
                      type="checkbox"
                      :checked="emails.includes(searchClient.email)"
                      @change="selectDeselectEmail(searchClient.email)"
                    />
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {{ index + 1 }}
                  </td>

                  <!-- <td class="p-3 text-xl text-gray-500 whitespace-nowrap">
                      {{ searchClient.userCode }}
                    </td> -->
                  <td class="p-3 text-xs text-gray-500 whitespace-nowrap">
                    {{ searchClient.firstName }} {{ searchClient.middleName }}
                    {{ searchClient.lastName }}
                  </td>
                  <td class="p-3 text-xs text-gray-500 whitespace-nowrap">
                    {{ searchClient.email }}
                  </td>
                </tr>
              </tbody>
            </table>

          
          </div>
          <div class="pagination flex items-center justify-center mt-4">
              <h1 class="mr-2 text-sm">{{ $t("showMore") }}</h1>
              <select
                v-model="usersPerpage"
                @change="changePerPageNumber()"
                class="h-7 border border-gray-500 mr-3 rounded-md"
              >
                <option value="2" selected >2</option>
                <option value="3">3</option>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <button
                @click.prevent="previosPage"
                class="text-sm px-2 py-1 rounded border border-gray-500 text-pink-500 hover:bg-gray-200 mr-2"
              >
                <i class="fa fa-chevron-left"></i>
              </button>
              <span
                class="text-sm px-2 py-1 rounded border border-gray-500 bg-pink-500 text-white"
                >{{ currentPage }}</span
              >
              <button
                @click.prevent="nextPage"
                class="px-2 py-1 rounded border border-gray-500 text-pink-500 hover:bg-gray-200 ml-2"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          <button @click.prevent="sendMessage()" class="m-4 custom-button">
            {{ $t("sendMessage")}}
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
                <h2 class="text-md text-green-800">{{ $t("success")}}!</h2>
              </div>
              <p class="text-blue-800 text-md ml-8">
                {{ successMessage }}
              </p>
              <button
                @click="showSuccess = false"
                class="ml-8 mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
              {{ $t("ok")}}
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
                <h2 class="text-sm font-bold text-gray-800">{{ $t("error")}}!</h2>
              </div>
              <p class="text-gray-600 text-sm">
                {{ errorMessage }}
              </p>
              <button 
                @click="showError = false"
                class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
              {{ $t("ok")}}
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
     successToastMessage:"",
     errorToastMessage:"",
     showErrorToast:false,
     showSuccessToast:false,


     showError:false,
     showSuccess:false,
     successMessage:"",
     errorMessage: "",
  
      messageSentSuccessfully:false,
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
      .get("/api/v1/users",{
        params:{
          isActive:true,
        }
      }).then((response)=>{
        console.log("response active users are",response);
        this.users=response.data.users;
        this.searchedusers=this.users;
      }).catch((error)=>{
       console.log("error",error);
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
      this.emails=[];
      if (this.selectAll) {
        this.emails = this.users.map((user) => user.email);
        console.log("emails", this.emails);
      } else {
        this.emails = [];
        console.log("Deselected all emails ", this.emails);
      }
    },
    sendMessage() {

      if(this.subject==''){
        this.showErrorToastMessage("Subject is required");
        return;
      }
      if(this.message==''){
        this.showErrorToastMessage("Message is required");
        return;
      }
      if(this.emails==''){
        this.showErrorToastMessage("Please select users to send message");
        return;
      }
      const emailList = {
        subject: this.subject,
        message: this.message,
        emails: this.emails,
      };

      
      console.log(emailList);
      this.$apiClient.post("/api/v1/users/sendEmails", emailList)
        .then((response) => {
          console.log("users", response.data.message);
          if (response.data.status===1) {
            this.searchedusers = this.users;//response.data.message;
            this.displayedItems();
            this.showSuccessToastMessage("Email sent successfully");
            // this.showSuccess=true;
            // this.successMessage = response.data.message;
            this.selectAll=false;
          }
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          this.showErrorToastMessage("Something went wrong")
        });
      this.emails=[];
     
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
       this.searchedusers=this.users
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
          if (response.data.status===1) {
            this.searchedusers = response.data.message;
            this.users = response.data.message;
            this.messageSentSuccessfully=true;
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
      if (this.searchQuery !== "") {
        console.log("this.current pageinsearch", this.currentPage);
        if (this.currentPage) {
          const query = this.searchQuery.toLowerCase();
          return (this.searchedusers = this.users.filter(
            (client) =>
              client.firstName.includes(query) ||
              client.middleName.includes(query) ||
              client.lastName.includes(query) ||
              client.userCode.includes(query)
            // Add more conditions for other table headers
          ));

        }
        const query = this.searchQuery.toLowerCase();
        return (this.searchedusers = this.searchedusers.filter(
          (client) =>
            client.name.firstName.includes(query) ||
            client.name.middleName.includes(query)
          // Add more conditions for other table headers
        ));
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
        return (this.searchedusers = this.users.slice(
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
