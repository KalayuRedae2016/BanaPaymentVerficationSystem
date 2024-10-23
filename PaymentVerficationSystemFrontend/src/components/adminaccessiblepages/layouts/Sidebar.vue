<template>
  <nav
    class="bg-white shadow-lg md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 px-6"
    style="margin-top: 67px"
  >
    <div class="-ml-5 -mr-5">
      <div
        v-if="sidebarVisible"
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative sm:-mt-4 md:mt-0 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
      >
        <div class="flex flex-col space-y-4 bg-white">
          <h1 class="ml-10 text-2lg mt-3 text-indigo-800 font-extrabold">
            {{ $t("verifyPayment") }}
          </h1>

          <hr class="mt-0 md:min-w-full border border-indigo-800" />

          <ul
            class="md:flex-col md:min-w-full flex flex-col list-none ml-0 mr-0 mt-0 space-y-0"
          >
            <li
              @click="setActive('dashboard')"
              class="items-center bg-white hover:bg-gray-300"
              :class="
                activeItem === 'dashboard' ? 'border-r-4 border-indigo-800' : ''
              "
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fa fa-tachometer opacity-75 mr-2 text-md text-pink-600"
                ></i>
                <span>{{ $t("dashboard") }}</span>
              </a>
            </li>

            <li
              @click="setActive('companyProfile')"
              class="items-center bg-white hover:bg-gray-300"
              :class="
                activeItem === 'companyProfile'
                  ? 'border-r-4 border-indigo-800'
                  : ''
              "
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-money-bill-wave opacity-75 mr-2 text-md text-pink-600"
                ></i>
                <span>{{ $t("companyProfile") }}</span>
              </a>
            </li>

            <li
              @click="setActive('clients')"
              class="items-center bg-white hover:bg-gray-300"
              :class="
                activeItem === 'clients' ? 'border-r-4 border-indigo-800' : ''
              "
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-users opacity-75 mr-2 text-md text-pink-600"
                ></i>
                <span>{{ $t("Client Profile") }}</span>
              </a>
            </li>

            <li
              @click="setActive('paymentSetting')"
              class="items-center bg-white hover:bg-gray-300"
              :class="
                activeItem === 'paymentSetting'
                  ? 'border-r-4 border-indigo-800'
                  : ''
              "
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-cogs opacity-75 mr-2 text-md text-pink-600"
                ></i>
                <span>{{ $t("Payment Setting") }}</span>
              </a>
            </li>

            <li
              @click="setActive('newPayment')"
              class="items-center bg-white hover:bg-gray-300"
              :class="
                activeItem === 'newPayment'
                  ? 'border-r-4 border-indigo-800'
                  : ''
              "
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-credit-card opacity-75 mr-2 text-md text-pink-600"
                ></i>
                <span>{{ $t("New Payments") }}</span>
              </a>
            </li>

            <li
              @click="setActive('allPayments')"
              class="items-center bg-white hover:bg-gray-300"
              :class="
                activeItem === 'allPayments'
                  ? 'border-r-4 border-indigo-800'
                  : ''
              "
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-list-alt opacity-75 mr-2 text-md text-pink-600"
                ></i>
                <span>{{ $t("All Payments") }}</span>
              </a>
            </li>

            <li
              @click="setActive('paymentReports')"
              class="items-center bg-white hover:bg-gray-300"
              :class="
                activeItem === 'paymentReports'
                  ? 'border-r-4 border-indigo-800'
                  : ''
              "
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-file-alt opacity-75 mr-2 text-md text-pink-600"
                ></i>
                <span>{{ $t("Reports") }}</span>
              </a>
            </li>

            <li
              @click="setActive('idCard')"
              class="items-center bg-white hover:bg-gray-300"
              :class="
                activeItem === 'idCard' ? 'border-r-4 border-indigo-800' : ''
              "
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-envelope opacity-75 mr-2 text-md text-pink-600"
                ></i>
                <span>{{ $t("Id Card") }}</span>
              </a>
            </li>

            <li
              @click="setActive('message')"
              class="items-center bg-white hover:bg-gray-300"
              :class="
                activeItem === 'message' ? 'border-r-4 border-indigo-800' : ''
              "
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-envelope opacity-75 mr-2 text-md text-pink-600"
                ></i>
                <span>{{ $t("Send Message") }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
//import NotificationDropdownComponent from "./NotificationDropdown.vue";
//import UserDropdownComponent from "./UserDropdown.vue";
export default {
  name: "SideBar",
  data() {
    return {
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
