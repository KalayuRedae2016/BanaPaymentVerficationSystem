<template>
  <div class="container mx-auto py-8">
    <div class="flex flex-row ">
      <Chart class=""></Chart>
      <div class="border-l border-gray-300 mt-20">
        <h1 class="text-indigo-800 font-extrabold text-xl ml-16 -mb-5 -mt-20">
          {{ $t("All Reports") }}
        </h1>

        <div
          class=""
        >
          <div
            class="border-t border-gray-300 bg-white shadow-md rounded-lg p-6 mr-5 ml-5 h-40 mt-16"
          >
            <h3 class="font-semibold mb-4 text-indigo-500 text-xl">
              {{ $t("Capital Report") }}
            </h3>

            <p class="text-gray-600 text-xl">Total Block:689450000</p>
            <p class="text-gray-600 text-xl">Total service:</p>
            <a
              href="#"
              class="text-blue-800 hover:underline mt-4 font-extrabold text-sm"
              @click="viewCapitalReport"
              >View Details</a
            >
          </div>

          <!-- Card 2: Payments -->
          <div
            class="border-t border-gray-300 bg-white shadow-md rounded-lg p-6 mr-5 ml-5 h-40 mt-16"
          >
            <h3 class="font-semibold mb-4 text-indigo-400 text-xl">
              {{ $t("Payments Report") }}
            </h3>

            <p class="text-gray-600">See The Status of the payments</p>

            <a
              href="#"
              class="text-blue-800 hover:underline mt-4 font-extrabold text-sm"
              @click="viewPaymentsReport"
              >View Details</a
            >
          </div>

          <!-- Card 3: Charges -->
          <div
            class="border-t border-gray-300 bg-white shadow-md rounded-lg p-6 mr-5 ml-5 h-40 mt-16"
          >
            <h3 class="font-semibold mb-4 text-red-500 text-xl">
              {{ $t("Charges") }}
            </h3>

            <p class="text-gray-600 text-sm">Total Charge:</p>
            <a
              href="#"
              class="text-blue-800 hover:underline mt-4 font-extrabold text-sm"
              @click="viewChargeslReport"
              >View Details</a
            >
          </div>

          <!-- Card 4: Clients -->
          <div
            class="border-t border-gray-300 bg-white shadow-md rounded-lg p-6 mr-5 ml-5 h-40 mt-16"
          >
            <h3 class="font-semibold mb-4 text-indigo-400 text-xl">
              {{ $t("Clients") }}
            </h3>

            <p class="text-gray-600 text-xl ">Total Clients:<span class="text-indigo-800">{{ clientLength }}</span></p>
            <a
              href="#"
              class="text-blue-800 hover:underline mt-4 font-extrabold text-sm"
              @click="viewClients()"
              >View Details</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Chart from "../Reports/charts/charts.vue";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  components: {
    Chart,
  },
  name: "CapitalReport",
  data() {
    return {
      internetConnected: false,
      activeTab: 0,
      tabs: ["This Month Payment", "This Month Capital", "This Month Charge"],
      clientLength: 0,
    };
  },

  computed: {
    ...mapGetters(["getToken", "getUserId", "getLocale"]),
    userId() {
      return this.getUserId;
    },
    token() {
      return this.getToken;
    },
    locale() {
      this.$i18n.locale = this.getLocale;
      return this.getLocale;
    },
  },
  created() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8081", // Set your base URL here
    });

    this.apiClient
      .post("/api/v1/number-of-all-clients}")
      .then((response) => {
        this.clientProfile = response.data;
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  },
  mounted() {
    // Simulating internet connection check
    setTimeout(() => {
      this.internetConnected = true;
    }, 100000);
    console.log("this.$apiClient===", this.$apiClient);
    console.log("othervariable is===", this.$otherVariable);
    // this.apiClient
    //   .post("/api/v1/number-of-all-payments-this-month}")
    //   .then((response) => {
    //     this.clientProfile = response.data;
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching client data:", error);
    //   });
    // this.apiClient
    //   .post("/api/v1/number-of-all-capital-this-month}")
    //   .then((response) => {
    //     this.clientProfile = response.data;
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching client data:", error);
    //   });
    // this.apiClient
    //   .post("/api/v1/number-of-all-charges-this-month}")
    //   .then((response) => {
    //     this.clientProfile = response.data;
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching client data:", error);
    //   });

    // this.apiClient
    //   .post("/api/v1/number-of-all-payments}")
    //   .then((response) => {
    //     this.clientProfile = response.data;
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching client data:", error);
    //   });
    // this.apiClient
    //   .post("/api/v1/number-of-all-capital}")
    //   .then((response) => {
    //     this.clientProfile = response.data;
    //
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching client data:", error);
    //   });
    // this.apiClient
    //   .post("/api/v1/number-of-all-charges}")
    //   .then((response) => {
    //     this.clientProfile = response.data;
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching client data:", error);
    //   });
    this.apiClient
      .get("/api/v1/users")
      .then((response) => {
        console.log("response",response)
        this.clientProfile = response.data;
        this.clientLength=response.data.result;
        console.log("clientlength",this.clientLength)
      })
      .catch((error) => {
        console.error("Error fetching client data:", error);
      });
  },
  methods: {
    viewCapitalReport() {
      this.$router.push("/admindashboard/capital-report");
    },
    viewPaymentsReport() {
      this.$router.push("/admindashboard/payment-report");
    },
    viewChargeslReport() {
      this.$router.push("/admindashboard/charges");
    },
    viewClients() {
      this.$router.push("/admindashboard/clients");
    },
    activateTab(index) {
      this.activeTab = index;
    },
  },
};
</script>
