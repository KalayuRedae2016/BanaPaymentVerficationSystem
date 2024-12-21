<template>
  <div class="bg-gray-200">
    <div class="relative md:ml-64">
      <!-- <header v-if="displaythat"
          class="z-10 fixed top-0 left-0 right-0 h-16 flex items-center justify-between bg-white shadow-lg px-4 border-b border-gray-400"
        >
          <div class="logo flex flex-col lg:flex-row">
            <img
              src="../../../assets/img/banamall1.jpg"
              alt="Logo"
              class="h-8 w-8 min-w-8 min-h-8 max-w-8 max-h-8"
            />
          </div>
  
          <div class="flex items-center space-x-4">
            <div class="flex flex-row mr-4">
              <p class="hidden">locale: {{ locale }}</p>
              <select class="text-md text-indigo-800" @change="changeLanguage">
                <option value="" disabled selected>
                  {{ $t("Language") }}
                </option>
                <option value="tigrigna">{{ $t("Tigrigna") }}</option>
                <option value="amharic">{{ $t("Amharic") }}</option>
                <option value="english">English</option>
              </select>
            </div>
  
            <div
              class="relative mt-3 cursor-pointer "
              @click="toggleDropdown('notifications')"
            >
              <i class="fas fa-bell text-blue-500 text-xs"></i>
              <span
                v-if="notificationCount > 0"
                @click="notificationCliked()"
                style="margin-top: 2px ;"
                class="absolute transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-1.5"
              >
                {{ notificationCount }}
              </span>
              <ul style="margin-right:-75px; margin-top:14px;"
                v-show="showNotificationDropdown"
                class="border border-gray-300 absolute right-0 mt-2 w-64 bg-white rounded shadow-lg border-t border-b border-blue-400"
              >
                <li class="m-6 text-blue-500 font-bold">
                  {{ $t("notifications") }}
                </li>
                <li
                  v-for="(notification, index) in notifications"
                  :key="index"
                  class="border-b last:border-0"
                >
                  <a
                    @click="navigateToPayment(notification)"
                    href="#"
                    class="flex items-start px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    <img
                      src="../../../assets/img/banamall1.jpg"
                      alt="Notification Image"
                      class="w-10 h-10 rounded-full mr-3 bg-red-500"
                    />
                    <div class="flex-1">
                      <p class="text-sm">{{ notification.message }}</p>
                      <p class="text-xs text-gray-500">
                        {{ formatDate(notification.date) }}
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
  
            <div class="relative -mt-1" @click="toggleDropdown('profile')">
              <img
                src="../../../assets/img/sampleProfile.jpg"
                alt="User Profile"
                class="h-6 w-6 min-w-6 min-h-6 max-w-6 max-h-6 rounded-full cursor-pointer"
              />
              <ul
                v-show="dropdownVisible"
                class="absolute right-0 mt-4 w-48 bg-white rounded shadow-lg border-t border-b border-blue-400"
              >
                <li>
                  <a
                    href="#"
                    @click="accountSetting()"
                    class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >{{ $t("Account Setting") }}</a
                  >
                </li>
  
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    @click="logout"
                    >{{ $t("logout") }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <button
            class="md:hidden cursor-pointer text-black opacity-50 md:hidden py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            @click="toggleDropdown('sidebar')"
          >
            <i class="fas fa-bars" v-if="!sidebarVisible"></i>
            <i class="fas fa-x text-red-500" v-if="sidebarVisible"></i>
          </button>
        </header> -->

      <header
        class="z-10 fixed top-0 left-0 right-0 h-16 flex items-center justify-between bg-white shadow-md px-4 border-b border-gray-200"
      >
        <!-- Logo Section -->
        <div class="flex items-center">
          <img
            src="../../../assets/img/banamall1.jpg"
            alt="Logo"
            class="h-10 w-10 rounded-full"
          />
          <span class="text-lg font-semibold text-gray-700">Bana</span>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-6">
          <p class="hidden">locale: {{ locale }}</p>
          <select
            class="w-16 md:w-32 text-sm text-indigo-800 border border-gray-300 rounded-md px-2 py-1 focus:ring focus:ring-blue-300"
            @change="changeLanguage"
          >
            <option value="" disabled selected>{{ $t("Language") }}</option>
            <option value="tigrigna">{{ $t("Tigrigna") }}</option>
            <option value="amharic">{{ $t("Amharic") }}</option>
            <option value="english">English</option>
          </select>

          <!-- Notifications -->
          <div class="relative">
            <button
              class="relative text-gray-700 hover:text-blue-500 focus:outline-none"
              aria-label="Notifications"
              @click="toggleDropdown('notifications')"
            >
              <i class="fas fa-bell text-xl"></i>
              <span
                v-if="notificationCount > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5"
              >
                {{ notificationLength }}
              </span>
            </button>
          </div>

          <!-- Profile Dropdown -->
          <div class="relative" @click="toggleDropdown('profile')">
            <button class="focus:outline-none" aria-label="User Profile">
              <img
               :src="profileData || 'https://via.placeholder.com/128'"
                alt="User Profile"
                class="h-8 w-8 rounded-full"
              />
            </button>
            <ul
              v-show="dropdownVisible"
              class="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20"
            >
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  @click="accountSetting"
                >
                  {{ $t("Account Setting") }}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  @click="logout"
                >
                  {{ $t("logout") }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Sidebar Toggle -->
          <button
            class="md:hidden text-xl text-gray-700 focus:outline-none"
            @click="toggleDropdown('sidebar')"
          >
            <i class="fas" :class="[sidebarVisible ? '' : 'fa-bars']"></i>
          </button>
        </div>

        <!-- Notification Dropdown (Outside v-show) -->
        <div
          v-if="showNotificationDropdown"
          class="h-full overflow-y-auto fixed top-16 right-0 w-full md:w-64 bg-white rounded-lg shadow-lg z-30"
        >
          <div class="bg-blue-500 text-white font-semibold px-4 py-2">
            {{ $t("Notifications") }}
          </div>  
          <ul>
            <li
              v-for="(notification, index) in notifications"
              :key="index"
              class="border-b last:border-0"
            >
              <a
                href="#"
                class="flex items-start px-4 py-2 hover:bg-gray-100"
                @click="navigateToPayment(notification)"
              >
                <img
                  src="../../../assets/img/banamall1.jpg"
                  alt="Notification Image"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p class="text-sm font-medium text-gray-800">
                    {{ notification.message }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ formatDate(notification.date) }}
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </header>

      <!-- // sidebar as drop down -->
      <!-- Sidebar Dropdown as a Modal -->
      <transition name="fade" mode="out-in">
        <div
          v-show="sidebarVisible"
          class="flex flex-col fixed inset-0 z-50 items-start bg-black bg-opacity-85"
        >
          <!-- Close Icon -->
          <i
            class="fas fa-x text-white absolute top-5 right-5 cursor-pointer"
            style="font-size: 24px"
            @click="closeDropDownSidebar()"
          ></i>

          <!-- The dropdown menu -->
          <div class="w-full mt-14 px-5 relative" @click.stop>
            <ul
              class="rounded-lg w-full bg-white shadow-lg border-t border-blue-500 overflow-y-auto"
              style="max-height: calc(100vh - 50px); margin-top: 0px"
            >
              <!-- Admin Navigations -->
              <li
                v-if="role === 'Admin'"
                @click="setActive('dashboard')"
                class="w-full items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600 ': activeItem === 'dashboard',
                }"
              >
                <a
                  class="ml-4 flex items-center text-gray-800 py-3 font-medium"
                  href="#"
                >
                  <i class="fas fa-tachometer-alt mr-3 text-teal-600"></i>
                  <span>{{ $t("dashboard") }}</span>
                </a>
              </li>

              <li
                v-if="role === 'Admin'"
                @click="setActive('companyProfile')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600':
                    activeItem === 'companyProfile',
                }"
              >
                <a
                  class="ml-4 flex items-center text-gray-800 py-3 font-medium"
                  href="#"
                >
                  <i class="fas fa-building mr-3 text-teal-600"></i>
                  <span>{{ $t("companyProfile") }}</span>
                </a>
              </li>

              <li
                v-if="role === 'Admin'"
                @click="setActive('clients')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'clients',
                }"
              >
                <a
                  class="ml-4 flex items-center text-gray-800 py-3 font-medium"
                  href="#"
                >
                  <i class="fas fa-users mr-3 text-teal-600"></i>
                  <span>{{ $t("clientProfile") }}</span>
                </a>
              </li>

              <li
                v-if="role === 'Admin'"
                @click="setActive('payment')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'payment',
                }"
              >
                <a
                  class="ml-4 flex items-center text-gray-800 py-3 font-medium"
                  href="#"
                >
                  <i class="fas fa-id-card mr-3 text-teal-600"></i>
                  <span>{{ $t("Payment") }}</span>
                </a>
              </li>

              <li
                v-if="role === 'Admin'"
                @click="setActive('idCard')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'idCard',
                }"
              >
                <a
                  class="ml-4 flex items-center text-gray-800 py-3 font-medium"
                  href="#"
                >
                  <i class="fas fa-id-card mr-3 text-teal-600"></i>
                  <span>{{ $t("idCard") }}</span>
                </a>
              </li>

              <li
                v-if="role === 'Admin'"
                @click="setActive('message')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'message',
                }"
              >
                <a
                  class="ml-4 flex items-center text-gray-800 py-3 font-medium"
                  href="#"
                >
                  <i class="fas fa-envelope mr-3 text-teal-600"></i>
                  <span>{{ $t("sendMessage") }}</span>
                </a>
              </li>

              <!-- User Navigations -->
              <li
                v-if="role === 'User'"
                @click="setActive('userDashboard')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600':
                    activeItem === 'userDashboard',
                }"
              >
                <a
                  class="ml-4 flex items-center text-gray-800 py-3 font-medium"
                  href="#"
                >
                  <i class="fas fa-tachometer-alt mr-3 text-teal-600"></i>
                  <span>{{ $t("dashboard") }}</span>
                </a>
              </li>

              <li
                v-if="role === 'User'"
                @click="setActive('userProfile')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'userProfile',
                }"
              >
                <a
                  class="ml-4 flex items-center text-gray-800 py-3 font-medium"
                  href="#"
                >
                  <i class="fas fa-building mr-3 text-teal-600"></i>
                  <span>{{ $t("Profile") }}</span>
                </a>
              </li>

              <li
                v-if="role === 'User'"
                @click="setActive('deadlines')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'deadlines',
                }"
              >
                <a
                  class="ml-4 flex items-center text-gray-800 py-3 font-medium"
                  href="#"
                >
                  <i class="fas fa-users mr-3 text-teal-600"></i>
                  <span>{{ $t("deadlines") }}</span>
                </a>
              </li>

              <li
                v-if="role === 'User'"
                @click="setActive('userIdCard')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'userIdCard',
                }"
              >
                <a
                  class="ml-4 flex items-center text-gray-800 py-3 font-medium"
                  href="#"
                >
                  <i class="fas fa-id-card mr-3 text-teal-600"></i>
                  <span>{{ $t("Id Card") }}</span>
                </a>
              </li>

              <li
                class="mb-32 border-t border-gray-300 items-center bg-white hover:bg-gray-100 transition"
              >
                <a
                  class="ml-4 flex items-center text-gray-800 py-3 font-medium"
                  href="#"
                >
                  <span></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </transition>

      <sidebar-component class="border-r border-gray-300"></sidebar-component>

      <div class="flex flex-row rightsidbar">
        <main
          class="shadow-1g bg-white w-full border-t border-gray-200 ml-0 mr-0 sm:ml-0 sm:mr-0 md:ml-0 md:ml-[6px] lg:mt-[67px] lg: md:mt-[67px] md:mr-[23 px] xl:mt-[67px] transition-all"
        >
          <router-view />
        </main>
      </div>

      <footer
        class="block py-4 lg:ml-100 md:ml-[85px] md:mr-[15px] lg:mr-350 ml-0 mr-0 xl:mr-[350px] xl:ml-[85px]"
      >
        <div class="container mx-auto px-4">
          <hr class="mb-4 border-b-1 border-blueGray-200" />
          <div
            class="flex flex-wrap items-center md:justify-between justify-center"
          >
            <div class="w-full">
              <ul class="flex flex-col lg:flex-row">
                <li>Copyright © {{ date }}</li>
                <li>
                  <a
                    href="#"
                    class="text-blueGray-500 hover:text-blueGray-700 text-xs font-semibold py-1 px-o lg:px-3"
                  >
                    {{ $t("Grand Technology Solutions ") }}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-0 lg:px-3"
                  >
                    {{ $t("Bana Mall General Trading") }}
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-0 lg:px-3"
                  >
                    {{ $t("aboutUs") }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
  <script>
import SidebarComponent from "../layouts/Sidebar.vue";
import { mapGetters } from "vuex";
export default {
  name: "dashboard-page",
  components: {
    SidebarComponent,
  },
  data() {
    return {
      profileData:"",
      imageData:"",
      notificationLength: 0,
      previosPaymentsLength: 0,
      payments: "",
      previousPostsCount: 0,
      intervalId: null,
      largerScreen: false,
      showNotificationDropdown: false,
      dropdownVisible: false,
      showEmailDropdown: false,
      sidebarVisible: false,
      messages: [
        {
          message: "You have a new friend request.",
          image: "assets/img/profile.JPG",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          date: new Date(),
        },
      ],
      notifications: [
        
      ],
      notificationCount: 2,
      messageCount: 5, // Example count, replace with your data
      notificationCount: 5, // Example count, replace with your data
      date: new Date().getFullYear(),
      screenSize: "",
      leftsidebardropdown: false,
    };
  },
  created() {
    this.setScreenSize();
    window.addEventListener("resize", this.setScreenSize);
    //this.firstPaymentLength();
  },

  beforeDestroy() {
    // Remove resize event listener
    window.removeEventListener("resize", this.checkScreenSize);
  },

  unmounted() {
    window.removeEventListener("resize", this.setScreenSize);
  },
  computed: {
    ...mapGetters(["getToken", "getUserId", "getLocale", "getRole"]),
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
    role() {
      return this.getRole;
    },
  },

  mounted() {
    window.addEventListener("resize", this.checkScreenSize);
    this.checkScreenSize();





    this.$apiGetById("/api/v1/users", this.userId)
      .then((response) => {
        console.log("response in the edit client mounted: ", response);
        this.profileData = "data:image/jpeg;base64," + response.imageData;
      })
      .catch((error) => {
        this.errorMessage = error.message;
        this.pageReload = true; // Set page reload flag
        console.log("error catch: ", error.message);
      })
      .finally(() => {
        if (this.showCurrentPage) {
          console.log("finally true");
          // If the page has been loaded successfully
          this.isLoading = false;
          this.pageReload = false; // Hide the reload page
        } else {
          console.log("finally false");
          // If no response, show the reload page
          this.isLoading = false;
         // this.smoozeReload=true;
          this.pageReload = true;
          this.errorMessage = "Something went wrong, please try again."; // Generic error message
        }
       // console.log("finally");
      });
    this.fetchNotifications();
    setInterval(this.fetchNotifications, 5000);
  },
  methods: {
    closeDropDownSidebar() {
      this.sidebarVisible = false;
    },

    fetchNotifications() {
      const keyword = "allPayments";
      const params = {
        keyword: keyword,
        unSeen: true,
        userId: this.userId,
        role: this.role,
      };
      this.$apiGet("/api/v1/payments/getAllPayments", params)
        .then((response) => {
          console.log("response", response);

          console.log("response from the api payments", response);
          this.notifications = response.payments;
          this.notificationLength = response.payments.length;

          //this.imageData = "data:image/jpeg;base64," + response.imageData;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log("finally completed");
        });
    },

    navigateToPayment(paymentId, userCode) {
      const payload = {
        role: this.role,
        paymentId: paymentId,
      };

      this.$apiPut("/api/v1/payments/markPaymentAsSeen", paymentId, payload)
        .then((response) => {
          console.log("response for payment update", response);
        })
        .catch((error) => {
          console.log("Error: ", error);
        })
        .finally(() => {});

      if (this.role === "Admin") {
        this.$router.push({
          path: `/admindashboard/payment-history-detail/${userCode}`,
          query: {
            year: activeYear,
            month: activeMonth,
          },
        });
      } else {
      }
    },

    firstPaymentLength() {
      this.$apiClient
        .get("api/v1/payments")
        .then((response) => {
          this.previosPaymentsLength = response.data.length;
        })
        .catch((error) => {
          console.log("error in the catch", error);
        });
    },

    accountSetting() {
      if (this.role == "Admin") {
        this.$router.push("/admindashboard/change-password");
      } else {
        this.$router.push("/userdashboard/change-password");
      }
    },
    checkScreenSize() {
      if (window.innerWidth >= 768) {
        this.sidebarVisible = false;
        this.largerScreen = true;
      } else {
        this.largerScreen = false;
      }
    },
    formatDate(date) {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        day: "numeric",
      };
      return new Date(date).toLocaleDateString(undefined, options);
    },

    getFullImagePath(image) {
      return `../../../${image}`;
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
      } else if (item === "userDashboard") {
        // alert("dashboard user")
        this.$router.push("/userdashboard");
      } else if (item === "userProfile") {
        this.$router.push("/userdashboard/profile");
      } else if (item === "deadlines") {
        this.$router.push("/userdashboard/info");
      } else if (item === "userIdCard") {
        this.$router.push("/userdashboard/id-card");
      } else {
        console.log("No route found for ", item);
      }
    },

    changeLanguage(event) {
      // alert("alert")
      this.sidebarVisible = false;
      const selectedLanguage = event.target.value;
      this.$store.dispatch("setLocale", { locale: selectedLanguage });
    },
    toggleDropdown(target) {
      if (target === "profile") {
        this.showNotificationDropdown = false;
        this.dropdownVisible = !this.dropdownVisible;
        this.showEmailDropdown = false;
        this.sidebarVisible = false;
      } else if (target === "notifications") {
        this.dropdownVisible = false;
        this.showEmailDropdown = false;
        this.showNotificationDropdown = !this.showNotificationDropdown;
        this.sidebarVisible = false;
      } else if (target === "sidebar") {
        this.sidebarVisible = !this.sidebarVisible;
      } else {
        this.sidebarVisible = false;
        this.dropdownVisible = false;
        this.showNotificationDropdown = false;
        this.showEmailDropdown = !this.showEmailDropdown;
      }
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
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0.5;
}

/* Add transition effect for the overlay */
.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}

/* Add close button hover effects */
button {
  transition: color 0.2s ease-in-out;
}
</style>