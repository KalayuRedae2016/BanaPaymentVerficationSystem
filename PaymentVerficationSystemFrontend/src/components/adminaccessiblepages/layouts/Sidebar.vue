<template>
  <nav
    class="bg-white shadow-lg md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 px-6 shadow-md"
    style="margin-top: 67px"
  >
    <div class="-ml-5 -mr-5">
      <div
        v-if="sidebarVisible"
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative sm:-mt-4 md:mt-0 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
      >
        <div class="flex flex-col space-y-4 bg-white">
          

          <h1 class="ml-10 text-md mt-3 text-indigo-800 font-extrabold">
            {{ $t("Payment Management") }}
          </h1>

          <hr class="mt-0 md:min-w-full border border-indigo-800" />

          <ul class="mt-3 flex flex-col list-none space-y-1">
    <!-- Dashboard -->
    <li
      @click="setActive('dashboard')"
      class="items-center bg-white hover:bg-gray-100 transition"
      :class="activeItem === 'dashboard' ? 'border-r-4 border-indigo-600' : ''"
    >
      <a class="ml-4 flex items-center text-gray-800 py-3 font-medium" href="#">
        <i class="fas fa-tachometer-alt mr-3 text-teal-600"></i>
        <span>{{ $t('dashboard') }}</span>
      </a>
    </li>

    <!-- Company Profile -->
    <li
      @click="setActive('companyProfile')"
      class="items-center bg-white hover:bg-gray-100 transition"
      :class="activeItem === 'companyProfile' ? 'border-r-4 border-indigo-600' : ''"
    >
      <a class="ml-4 flex items-center text-gray-800 py-3 font-medium" href="#">
        <i class="fas fa-building mr-3 text-teal-600"></i>
        <span>{{ $t('companyProfile') }}</span>
      </a>
    </li>

    <!-- Clients -->
    <li
      @click="setActive('clients')"
      class="items-center bg-white hover:bg-gray-100 transition"
      :class="activeItem === 'clients' ? 'border-r-4 border-indigo-600' : ''"
    >
      <a class="ml-4 flex items-center text-gray-800 py-3 font-medium" href="#">
        <i class="fas fa-users mr-3 text-teal-600"></i>
        <span>{{ $t('clientProfile') }}</span>
      </a>
    </li>

    <!-- Payments (Collapsible) -->
    <li
      class="border-t  border-gray-300 items-center bg-white hover:bg-gray-100 transition"
      :class="paymentMenuOpen ? 'bg-gray-50' : ''"
    >
      <div
        class="  ml-4 flex items-center justify-between py-3 font-medium text-gray-800 cursor-pointer"
        @click="togglePayments"
      >
        <div class="flex items-center">
          <i class="fas fa-wallet mr-3 text-teal-600"></i>
          <span>{{ $t('payments') }}</span>
        </div>
        <i :class="paymentMenuOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
      </div>

      <ul v-show="paymentMenuOpen" class=" ml-6 mt-2 space-y-1">
        <li
          v-for="(item, index) in paymentSubmenu"
          :key="index"
          @click="setActive(item.key)"
          class="-ml-3 bg-white hover:bg-gray-100 transition"
          :class="activeItem === item.key ? 'border-r-4 border-indigo-600' : ''"
        >
          <a class="flex items-center text-gray-800 py-2 font-medium" href="#">
            <i :class="item.icon + ' mr-3 text-blue-600 mx-3'"></i>
            <span class="">{{ $t(item.label) }}</span>
          </a>
        </li>
      </ul>
    </li>

    <!-- ID Card -->
    <li
      @click="setActive('idCard')"
      class="border-t  border-gray-300 items-center bg-white hover:bg-gray-100 transition"
      :class="activeItem === 'idCard' ? 'border-r-4 border-indigo-600' : ''"
    >
      <a class="ml-4 flex items-center text-gray-800 py-3 font-medium" href="#">
        <i class="fas fa-id-card mr-3 text-teal-600"></i>
        <span>{{ $t('idCard') }}</span>
      </a>
    </li>

    <!-- Send Message -->
    <li
      @click="setActive('message')"
      class="items-center bg-white hover:bg-gray-100 transition"
      :class="activeItem === 'message' ? 'border-r-4 border-indigo-600' : ''"
    >
      <a class="ml-4 flex items-center text-gray-800 py-3 font-medium" href="#">
        <i class="fas fa-envelope mr-3 text-teal-600"></i>
        <span>{{ $t('sendMessage') }}</span>
      </a>
    </li>
  </ul>
        </div>
      </div>
    </div>
  </nav>
</template>



<script>
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
    };
  },
  computed: {
    activeItem() {
      return this.$store.getters.getActiveItem;
    }
  },
  mounted() {
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
      this.$store.dispatch('commitActiveItem', { activeItem: item });
      // Update the active item
      // You can also handle route navigation here if needed
      if (item === "dashboard") {
       this.dashboard();
      } else if (item === "companyProfile") {
       this.companyProfile();
      } else if (item === "clients") {
        this.clients();
      }
      else if(item ==="paymentSetting"){
        this.paymentSetting();
      }
      else if(item ==="paymentReports"){
        this.paymentReports();
      }
      else if(item ==="newPayment"){
        this.newPayment();
      }
      else if(item ==="allPayments"){
        this.allPayments();
      }
      else if(item ==="idCard"){
        this.idCard();
      }
      else if(item ==="message"){
       this.message();
      }
       
      // Add more navigation handling as needed
    },
    idCard() {
      this.$router.push("/admindashboard/id-card");
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

    paymentSetting() {
      this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: 0,
        },
      });
    },

    newPayment() {
      this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: 1,
        },
      });
    },

    allPayments() {
      this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: 2,
        },
      });
    },
    paymentReports() {
      this.$router.push({
        path: "/admindashboard/payments1",
        query: {
          activeTab: 3,
          reportLevel: "userLevelReport",
        },
      });
    },

    message() {
      this.sendMessageSelected = true;
      this.$router.push("/admindashboard/send-email");
    },
    clients() {
      this.$router.push("/admindashboard/clients");
    },

    companyProfile() {
      this.$router.push("/admindashboard/display-companey");
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