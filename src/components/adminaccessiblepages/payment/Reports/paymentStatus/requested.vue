<template>
  <div class="container mx-auto p-4 flex flex-col">
  
    <!-- {{ paymentType }} {{ year }} -->
    <p class="text-2xl mt-10 mb-5  text-blue-800 font-semibold">Users Who Requests Regular payment.</p>
    <div
      class="border border-gray-300 flex flex-col bg-white rounded-lg shadow-md mt-8 border-t border-r border-l border-gray-200"
    >
      <div class="p-4 mt-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex-1 mr-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by Name,Email,Userame"
              class="text-2xl w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div></div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full border-b border-indigo-500">
            <thead>
              <tr class="bg-gray-200">
                <th
                  class="w-24 p-3 text-xl font-extrabold tracking-wide text-left text-indigo-800"
                >
                  No.
                </th>
                <th
                  class="w-24 p-3 text-xl font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Name
                </th>
                <th
                  class="w-32 p-3 text-xl font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Total Requested
                </th>
                <th
                  class="w-32 p-3 text-xl font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Verify User
                </th>
                <th
                  class="w-32 p-3 text-xl font-extrabold tracking-wide text-left text-indigo-800"
                >
                  Profile
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="searchClient in searchedClients"
                :key="searchClient._id"
              >
              <td class="p-3 text-xl text-gray-700 whitespace-nowrap">
                {{ index + 1 }}
                </td>
                <td class="p-3 text-2xl text-gray-700 whitespace-nowrap font-semibold">
                  {{ searchClient.name.firstName }} {{ searchClient.name.middleName }}
                  {{ searchClient.name.lastName }}
                </td>

                <td class="p-3 text-2xl text-gray-700 whitespace-nowrap">
                 50000
                </td>
                <td class="p-3 text-2xl text-gray-700 whitespace-nowrap">
                  <button @click="verify(searchClient._id)"
                    class="flex items-center px-4 py-2 bg-white hover:bg-cyan-500 text-gray-800 rounded"
                  >
                    <i class="mr-2 text-blue-500 fas fa-check-circle"></i>
                  </button>
                </td>
                <td class="p-3 text-2xl text-blue-700 whitespace-nowrap">
                  <button @click="navigateProfile(searchClient._id)"
                    class="flex items-center px-4 py-2 bg-white hover:bg-cyan-500 text-blue-500 rounded"
                  >
                    <i class="fas fa-user"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>


        <div class="flex flex-row mt-4 ">
           
          <div class="pagination flex items-center justify-center mt-4">
            <h1 class="mr-2">Show More</h1>
            <select
              v-model="clientsPerpage"
              @change="changePerPageNumber()"
              class="h-7 border border-gray-500 mr-3 rounded-md"
            >
              <option value="" disabled>Show More</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <button
              @click="previosPage"
              class="px-2 py-1 rounded border border-gray-500 text-pink-500 hover:bg-gray-200 mr-2"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <span
              class="px-2 py-1 rounded border border-gray-500 bg-pink-500 text-white"
              >{{ currentPage }}</span
            >
            <button
              @click="nextPage"
              class="px-2 py-1 rounded border border-gray-500 text-pink-500 hover:bg-gray-200 ml-2"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <div class=" ml-5 font-extrabold text-gray-500 text-xl mt-4"> <h1> Total Confirmed Capital <i class="fa fa-equals text-xl"></i><span class="text-teal-600 text-xl">50000000 Birr</span></h1></div>
        </div>
        </div>
      </div>
    </div>
  </div>
  <div class=" ml-5 mr-5 mt-16 mb-16">
      <hr class="my-4 md:min-w-full border border-gray-400" />
    </div>
</template>
<script>
//import clientsForm from "./clientsForm/clientForm.vue";
import axios from "axios";
export default {
  name: "ClientsView",
  components: {
    //clientsForm,
  },
  data() {
    return {
      confirmedClients: [],
      clientsPerpage: "",

      paymentType: "",
      timeRange: "",
      year: "",
      semiYear: "",
      month: "",
      day: "",

      screenSize: "",
      detailModal: false,
      searchedClients: [],
      clients: [],
      filteredCleints: [],
      displayedClients: [],
      currentPage: 1,
      searchQuery: "",
      perPage: 2,
      clientName: "",
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
    // displayedItems() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.items.slice(startIndex, endIndex);
    // }
  },
  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });

    this.paymentType = this.$route.query.paymentType;
    this.year = this.$route.query.year;
    this.reportType = this.$route.query.reportType;
    this.timeRange = this.$route.query.timeRange;
    this.semiYear = this.$route.query.semiYear;
    this.month = this.$route.query.month;
    this.day = this.$route.query.day;

    // console.log(this.paymentType, this.year, this.reportType);

    // this.apiClient
    //   .get(
    //     `/api/v1/requested?timeRange=${this.timeRange}&y=${this.year}&month=${this.month}&paymentType=${this.paymentType}`
    //   )
    //   .then((response) => {
    //     this.confirmedData = response.data;
    //     const totalConfirmedCapital=response.data;
    //     console.log(totalConfirmedCapital);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching client data:", error);
    //   });

      this.apiClient
      .get("/api/v1/users")
      .then((response) => {
        if (response.data !== null) {
          console.log("clients", response.data.message);
          this.clients = response.data.message;
          this.searchedClients = this.clients;
          console.log("Those clients ", this.searchedClients);
        }
      })
      .catch((error) => {
        console.log("Error uploading exel client file", error);
      });
  },
  mounted() {
    this.displayedItems();
    //fetch here the confirmed data please using the axios 
    //alert(this.paymentType);

    
  },

  methods: {
    navigateProfile(clientId) {
      this.$router.push(`/admindashboard/data-table/${clientId}`);
    },
    verify(clientId){
      this.$router.push(`/admindashboard/verify/${clientId}`);
    },

    filteredClientsInSearch() {
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        return (this.searchedClients = this.clients.filter(
          (client) =>
            client.name.firstName.toLowerCase().includes(query) ||
            client.name.middleName.toLowerCase().includes(query)
          // Add more conditions for other table headers
        ));
      } else {
        this.displayedItems();
      }
      return this.clients;
    },
    changePerPageNumber() {
      this.perPage = this.clientsPerpage;
      this.displayedItems();
    },

    previosPage() {
      if (this.currentPage > 1 && this.currentPage <= this.totalPages) {
        this.currentPage--;
        // console.log(this.currentPage);
        this.displayedItems();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.displayedItems();
      }
    },
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      this.searchedClients = this.clients.slice(startIndex, endIndex);
    },
  
    goBack() {
      this.$router.push("/admindashboard/payment-report");// Navigates back to the previous page
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
