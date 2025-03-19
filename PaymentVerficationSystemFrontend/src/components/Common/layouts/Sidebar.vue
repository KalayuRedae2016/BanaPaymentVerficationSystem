<template>
  <nav
    class="bg-gray-50 shadow-lg fixed md:top-0 md:bottom-0 md:overflow-y-auto flex flex-col md:w-64 z-10 px-6 py-4"
    style="margin-top: 67px ;margin-left:-255px;"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-lg text-blue-600 font-bold">
        {{ $t("Payment Management") }}
      </h1>
    </div>
    
    <hr class="border-gray-300 mb-4" />

    <ul class="space-y-1">
      <li
        v-if="role === 'Admin' || role === 'SuperAdmin'"
        @click="setActive('dashboard')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-tachometer-alt text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("dashboard") }}</span>
      </li>

      <li
        v-if="role === 'Admin' || role === 'SuperAdmin'"
        @click="setActive('companyProfile')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'companyProfile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-building text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("companyProfile") }}</span>
      </li>

      <li
        v-if="role === 'Admin' || role === 'SuperAdmin'"
        @click="setActive('clients')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'clients' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-users text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("clientProfile") }}</span>
      </li>

      <li
        v-if="role === 'Admin' || role === 'SuperAdmin'"
        @click="setActive('payment')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'payment' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-credit-card text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("Payment") }}</span>
      </li>

      <li
        v-if="role === 'Admin' || role === 'SuperAdmin'"
        @click="setActive('idCard')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'idCard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-id-card text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("idCard") }}</span>
      </li>

      <li
        v-if="role === 'Admin' || role === 'SuperAdmin'"
        @click="setActive('message')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'message' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-envelope text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("sendMessage") }}</span>
      </li>

      <li
        v-if="role === 'Admin' || role === 'SuperAdmin'"
        @click="setActive('logs')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'logs' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-file-alt text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("Logs") }}</span>
      </li>

      <li
        v-if="role === 'Admin' || role === 'SuperAdmin'"
        @click="setActive('Apikeys')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'Apikeys' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-file-alt text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("Api Keys") }}</span>
      </li>
      <li
        v-if="role === 'User'"
        @click="setActive('userDashboard')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'userDashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-tachometer-alt text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("dashboard") }}</span>
      </li>

      <li
        v-if="role === 'User' && canEditDetails ===true"
        @click="setActive('userProfile')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'userProfile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-user-circle text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("Profile") }}</span>
      </li>

      <li
        v-if="role === 'User'"
        @click="setActive('deadlines')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'deadlines' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-clock text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("Payments Info") }}</span>
      </li>

      <li
        v-if="role === 'User'"
        @click="setActive('userIdCard')"
        class="flex items-center p-3 rounded-md transition cursor-pointer"
        :class="activeItem === 'userIdCard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
      >
        <i class="fas fa-id-card text-teal-600 mr-3"></i>
        <span class="font-medium">{{ $t("idCard") }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  data() {
    return {

      canEditDetails:false,
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
    window.addEventListener("resize", this.checkScreenSize);
    this.checkScreenSize();
  },

  beforeDestroy() {
    // Remove resize event listener
    window.removeEventListener("resize", this.checkScreenSize);
  },
  async created() {
    this.role=localStorage.getItem("role");
    this.setScreenSize();
    window.addEventListener("resize", this.setScreenSize)
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
      this.activeItem = item;
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
      } else if(item === "logs") {
      this.$router.push("/admindashboard/logs");
      }
      else if (item === "idCard") {
        this.$router.push("/admindashboard/id-card");
      } else if (item === "message") {
        this.$router.push("/admindashboard/send-email");
      }
      else if(item === "Apikeys") {
        this.$router.push("/admindashboard/bank-api-key");
      }


      else if(item === "userDashboard") {
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
      }
     
      else{
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