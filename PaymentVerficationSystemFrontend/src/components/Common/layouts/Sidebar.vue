<template>
  <nav
    class="bg-white shadow-lg md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 px-6 shadow-md"
    style="margin-top: 67px"
  >
    <div class="-ml-5 -mr-5 ">
      <div
        v-if="sidebarVisible"
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative sm:-mt-4 md:mt-0 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
      >
        <div class="flex flex-col space-y-4 bg-white">
          <h1 class=" text-md mt-3 text-blue-500 font-extrabold">
            {{ $t("Payment Management") }}
          </h1>

      
          <hr class="mt-0 md:min-w-full border border-blue-300" />

          <ul class="mt-3 flex flex-col list-none space-y-1">
            <!-- //admin navigations  -->
                               <!-- Dashboard -->
            <li
              v-if="role=== 'Admin'"
              @click="setActive('dashboard')"
              class="items-center bg-white hover:bg-gray-100 transition "
              :class="
                activeItem === 'dashboard' ? 'border-r-4 border-indigo-600' : ''
              "
            >
              <a
                class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                href="#"
              >
                <i class="fas fa-tachometer-alt mr-3 text-teal-600"></i>
                <span>{{ $t("dashboard") }} </span>
              </a>
            </li>

            <!-- Company Profile -->
            <li
              v-if="role === 'Admin'"
              @click="setActive('companyProfile')"
              class="items-center bg-white hover:bg-gray-100 transition"
              :class="
                activeItem === 'companyProfile'
                  ? 'border-r-4 border-indigo-600'
                  : ''
              "
            >
              <a
                class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                href="#"
              >
                <i class="fas fa-building mr-3 text-teal-600"></i>
                <span>{{ $t("companyProfile") }}</span>
              </a>
            </li>

            <!-- Clients -->
            <li
              v-if="role === 'Admin'"
              @click="setActive('clients')"
              class="items-center bg-white hover:bg-gray-100 transition"
              :class="
                activeItem === 'clients' ? 'border-r-4 border-indigo-600' : ''
              "
            >
              <a
                class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                href="#"
              >
                <i class="fas fa-users mr-3 text-teal-600"></i>
                <span>{{ $t("clientProfile") }}</span>
              </a>
            </li>

            <li
              v-if="role === 'Admin'"
              @click="setActive('payment')"
              class=" items-center bg-white hover:bg-gray-100 transition"
              :class="
                activeItem === 'payment' ? 'border-r-4 border-indigo-600' : ''
              "
            >
              <a
                class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                href="#"
              >
                <i class="fas fa-credit-card mr-3 text-teal-600"></i>
                <span>{{ $t("Payment") }}</span>
              </a>
            </li>
            <!-- ID Card -->
            <li
              v-if="role === 'Admin'"
              @click="setActive('idCard')"
              class=" items-center bg-white hover:bg-gray-100 transition"
              :class="
                activeItem === 'idCard' ? 'border-r-4 border-indigo-600' : ''
              "
            >
              <a
                class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                href="#"
              >
                <i class="fas fa-id-card mr-3 text-teal-600"></i>
                <span>{{ $t("idCard") }}</span>
              </a>
            </li>

            <!-- Send Message -->
            <li
              v-if="role === 'Admin'"
              @click="setActive('message')"
              class="items-center bg-white hover:bg-gray-100 transition"
              :class="
                activeItem === 'message' ? 'border-r-4 border-indigo-600' : ''
              "
            >
              <a
                class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                href="#"
              >
                <i class="fas fa-envelope mr-3 text-teal-600"></i>
                <span>{{ $t("sendMessage") }}</span>
              </a>
            </li>

            <!-- // user navigations -->

            <li
              v-if="role === 'User'"
              @click="setActive('userDashboard')"
              class="items-center bg-white hover:bg-gray-100 transition"
              :class="
                activeItem === 'userDashboard' ? 'border-r-4 border-indigo-600' : ''
              "
            >
              <a
                class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                href="#"
              >
                <i class="fas fa-tachometer-alt mr-3 text-teal-600"></i>
                <span>{{ $t("dashboard") }} </span>
              </a>
            </li>

            <!-- Company Profile -->
            <li
              v-if="role === 'User'"
              @click="setActive('userProfile')"
              class="items-center bg-white hover:bg-gray-100 transition"
              :class="
                activeItem === 'userProfile'
                  ? 'border-r-4 border-indigo-600'
                  : ''
              "
            >
              <a
                class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                href="#"
              >
                <i class="fas fa-building mr-3 text-teal-600"></i>
                <span>{{ $t("Profile") }}</span>
              </a>
            </li>

            <!-- Clients -->
            <li
              v-if="role === 'User'"
              @click="setActive('deadlines')"
              class="items-center bg-white hover:bg-gray-100 transition"
              :class="
                activeItem === 'deadlines' ? 'border-r-4 border-indigo-600' : ''
              "
            >
              <a
                class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                href="#"
              >
                
                <i class="fas fa-clock mr-3 text-teal-600"></i>
                <span>{{ $t("deadlines") }}</span>
              </a>
            </li>

            <li
              v-if="role === 'User'"
              @click="setActive('userIdCard')"
              class=" items-center bg-white hover:bg-gray-100 transition"
              :class="
                activeItem === 'userIdCard' ? 'border-r-4 border-indigo-600' : ''
              "
            >
              <a
                class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                href="#"
              >
                <i class="fas fa-id-card mr-3 text-teal-600"></i>
                <span>{{ $t("idCard") }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>



<script>
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  data() {
    return {
      paymentSubmenu: [
        { key: "paymentSetting", label: "paymentSetting", icon: "fas fa-cogs" },
        { key: "newPayment", label: "newPayments", icon: "fas fa-credit-card" },
        { key: "allPayments", label: "allPayments", icon: "fas fa-list-alt" },
        { key: "paymentReports", label: "reports", icon: "fas fa-file-alt" },
      ],
      paymentMenuOpen: false,
      activeItem: "dashboard",
      dashboardSelected: true,
      compPorifleSelected: false,
      paymentSettingSelected: false,
      newPaymentSelected: false,
      paymentReportsSelected: false,
      clientProfileSelected: false,
      allPaymentsSelected: false,
      sendMessageSelected: false,
      sidebarVisible: false,
      collapseShow: "hidden",
      screenSize: "",
      isOpen: false,
      role:localStorage.getItem("role"),
    };
  },


  computed: {
    ...mapGetters(["getToken", "getUserId", "getLocale"]),
    userId() {
      return this.getUserId;
    },
    
    activeItem() {
      return this.$store.getters.getActiveItem;
    },
  },
  mounted() {


    this.role=localStorage.getItem("role");
    console.log("role in mouinted",localStorage.getItem("role"))


  
    // Add resize event listener
    window.addEventListener("resize", this.checkScreenSize);
    // Initial check on mountss
    this.checkScreenSize();
  },

  beforeDestroy() {
    // Remove resize event listener
    window.removeEventListener("resize", this.checkScreenSize);
  },
  created() {
    this.role=localStorage.getItem("role");
    this.setScreenSize();
    window.addEventListener("resize", this.setScreenSize);
  },
  unmounted() {
    window.removeEventListener("resize", this.setScreenSize);
  },
  methods: {
    togglePayments() {
      this.paymentMenuOpen = !this.paymentMenuOpen;
    },
    setActive(item) {
      this.$store.dispatch("commitActiveItem", { activeItem: item });
      // Update the active item
      // You can also handle route navigation here if needed
      if (item === "dashboard") {
        this.$router.push("/admindashboard");
      } else if (item === "companyProfile") {
        this.$router.push("/admindashboard/display-companey");
      } else if (item === "clients") {
        this.$router.push("/admindashboard/clients");
        //this.clients();
      } else if (item === "payment") {
        this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: 0,
        },
      });
      } else if (item === "idCard") {
        this.$router.push("/admindashboard/id-card");
      } else if (item === "message") {
        this.$router.push("/admindashboard/send-email");
      }else if(item === "userDashboard") {
       // alert("dashboard user")
        this.$router.push("/userdashboard");
      }
      else if(item === "userProfile") {
        this.$router.push("/userdashboard/profile");
      }
      else if(item === "deadlines") {
        this.$router.push("/userdashboard/info");
      }
      else if(item === "userIdCard") {
        this.$router.push("/userdashboard/id-card");
      }else{
        console.log("No route found for ", item);
      }
    },


  
    togglePaymentSetting() {
      this.isOpen = !this.isOpen;
    },
    checkScreenSize() {
      if (window.innerWidth >= 768) {
        this.sidebarVisible = true;
      }
      if (window.innerWidth < 768) {
        this.sidebarVisible = false;
      }
    },
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },
    dashboard() {
      this.$router.push("/admindashboard");
    },

    payment() {
      this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: 0,
        },
      });
    },



   
    

 
    setScreenSize() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        this.screenSize = 1; //sm;
      } else if (screenWidth < 768) {
        this.screenSize = 2; //md;
      } else if (screenWidth < 1024) {
        this.screenSize = 3; //lg;
      } else {
        this.screenSize = 4; //xl;
      }
    },
  },
  components: {
    // NotificationDropdownComponent,
    //UserDropdownComponent,
  },
};
</script>
<style scoped>
.border-r-4 {
  border-right-width: 4px;
}
</style>