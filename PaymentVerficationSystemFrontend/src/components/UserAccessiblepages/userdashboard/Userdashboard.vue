<template>
  <div class="bg-gray-200">
    <div class="relative md:ml-64">
      <header
        class="z-10 fixed top-0 left-0 right-0 h-16 flex items-center justify-between bg-white shadow-lg px-4 border-b border-gray-400"
      >
        <div class="logo">
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

          <!-- <div
            class="relative mt-3 mr-3 cursor-pointer"
            @click="toggleDropdown('message')"
          >
            <i class="fas fa-envelope text-blue-500 text-xs"></i>
            <span
              style="margin-top: 2px"
              class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-1.5"
            >
              {{ messageCount }}
            </span>
            <ul
              v-show="showEmailDropdown"
              class="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg border-t border-b border-blue-400"
            >
              <li class="m-6 text-blue-500 font-bold">Messages</li>
              <li
                v-for="(message, index) in messages"
                :key="index"
                class="border-b last:border-0"
              >
                <a
                  href="#"
                  class="flex items-start px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  <img
                    src="../../../assets/img/profile.JPG"
                    alt="Notification Image"
                    class="w-10 h-10 rounded-full mr-3"
                  />
                  <div class="flex-1">
                    <p class="text-sm">{{ message.message }}</p>
                    <p class="text-xs text-gray-500">
                      {{ formatDate(message.date) }}
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div> -->

          <div class="relative mt-3 cursor-pointer" @click="toggleDropdown('notifications')"
          >
            <i class="fas fa-bell text-blue-500 text-xs"></i>
            <span
              v-if="notificationCount > 0"
              @click="notificationCliked()"
              style="margin-top: 2px"
              class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-1.5"
            >
              {{ notificationCount }}
            </span>
            <ul
              v-show="showNotificationDropdown"
              class="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg border-t border-b border-blue-400"
            >
              <li class="m-6 text-blue-500 font-bold">Notifications</li>
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
                    src="../../../assets/img/profile.JPG"
                    alt="Notification Image"
                    class="w-10 h-10 rounded-full mr-3"
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
              src="../../../assets/img/profile.JPG"
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
                  @click="changePassword()"
                  class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >Change Password</a
                >
              </li>

              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  @click="logout"
                  >Logout</a
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
      </header>

      <transition name="fade" mode="out-in">
        <div
          v-show="sidebarVisible"
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
          style="margin-top: 67px"
        >
          <ul
            class="absolute left-0 top-0 shadow-lg right-0 w-full bg-white border-t border-blue-500"
            style="margin-top: -3px; margin-left: 0px"
          >
            <li
              @click="dashboard()"
              class="items-center bg-white hover:border-r-4 border-indigo-800 hover:bg-gray-300"
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fa fa-tachometer opacity-75 mr-2 text-md text-teal-600"
                ></i>

                <span> {{ $t("dashboard") }}</span>
              </a>
            </li>

            <li
              @click="deadlines"
              class="items-center bg-white hover:border-r-4 border-indigo-800 hover:bg-gray-300"
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-money-bill-wave opacity-75 mr-2 text-md text-teal-600"
                ></i>

                <span> {{ $t("deadlines") }}</span>
              </a>
            </li>
            <li
              @click="profile()"
              class="items-center bg-white hover:border-r-4 border-indigo-800 hover:bg-gray-300"
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-users opacity-75 mr-2 text-md text-teal-600"
                ></i>

                <span> {{ $t("profile") }} </span>
              </a>
            </li>
            <li
              @click="idCard()"
              class="items-center bg-white hover:border-r-4 border-indigo-800 hover:bg-gray-300"
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-id-card opacity-75 mr-2 text-md text-teal-600"
                ></i>

                <span> {{ $t("idCard") }} </span>
              </a>
            </li>
          </ul>
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
            <div class="w-full md:w-4/12 px-4">
              <div class="text-xs text-blueGray-500 font-semibold py-1">
                Copyright © {{ date }}
                <a
                  href="https://www.creative-tim.com"
                  class="text-blueGray-500 hover:text-blueGray-700 text-xs font-semibold py-1"
                >
                  Grand Tech
                </a>
              </div>
            </div>
            <div class="w-full md:w-8/12 px-4">
              <ul
                class="flex flex-wrap list-none md:justify-end justify-center"
              >
                <li>
                  <a
                    href="#"
                    class="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-3"
                  >
                    GrandTech
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-3"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-3"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-3"
                  >
                    GrandTech License
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
        {
          message: "You have a new friend request.",
          image: "assets/img/profile.JPG",
          userCode: "123",
          activeYear: "",
          activeMonth: "",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          userCode: "321",
          activeYear: "",
          activeMonth: "",
          date: new Date(),
        },
      ],
      notificationCount: 2,
      messageCount: 5, // Example count, replace with your data
      notificationCount: 5, // Example count, replace with your data
      date: new Date().getFullYear(),

      screenSize: "",
      leftsidebardropdown: false,
    };
  },
  mounted() {
    // Add resize event listener
    window.addEventListener("resize", this.checkScreenSize);
    // Initial check on mountss
    this.checkScreenSize();
    //this.startFetching();
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
  methods: {
    // notificationCliked(){
    //   this.notificationCount=0;
    // },
    // navigateToPayment(notification){
    //   alert("in navigate");
    //   console.log("the notification is",notification)
    //     this.$router.push(`/admindashboard/bank-statement/${notification.userCode}`,{
    //       params:{
    //       // activeYear:notification.activeYear,
    //       // activeMonth:activeMonth,
    //      }
    //   })
    // },
    // async fetchPayments() {
    //   this.$apiClient
    //     .get("api/v1/payments")
    //     .then((response) => {
    //       console.log("respanse", response);
    //       if (response.data.length > this.previosPaymentsLength) {
    //         console.log("there is new post please");
    //        this.notifications=response.data.payments.slice(0, response.data.lenght-this.previosPaymentsLength);
    //       }
    //         this.payments = response.data.payments;
    //         this.previosPaymentsLength = response.data.length;
    //     })
    //     .catch((error) => {
    //       console.log("error in the catch", error);
    //    });
    // },
    // startFetching() {
    //   this.fetchPayments(); // Initial fetch
    //   this.intervalId = setInterval(() => this.fetchPayments(), 1000);
    // },
    changePassword() {
      this.$router.push("/userdashboard/change-password");
    },
    
    checkScreenSize() {
      // If the screen width is larger than the md breakpoint, hide the dropdown
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
    dashboard() {
      this.$router.push("/userdashboard");
    },
    profile() {
      this.$router.push("/userdashboard/profile");
    },
    deadlines() {
      this.$router.push("/userdashboard/info");
    },

    idCard() {
      this.$router.push("/userdashboard/id-card");
    },
    changeLanguage(event) {
      // alert("alert")
      const selectedLanguage = event.target.value;
      this.$store.dispatch("setLocale", { locale: selectedLanguage });
    },

    setActive(item) {
      this.$store.dispatch("commitActiveItem", { activeItem: item });

      if (item === "dashboard") {
        this.dashboard();
      } else if (item === "idCard") {
        this.idCard();
      } else if (item === "message") {
        this.message();
      }

      // Add more navigation handling as needed
    },

    dashboard() {
      this.$router.push("/userdashboard");
    },

    profile() {
      this.$router.push("/userdashboard/profile");
    },

    deadline() {
      this.$router.push("/userdashboard/deadline");
    },
    idCard() {
      this.$router.push("/userdashboard/id-card");
    },

    toggleDropdown(target) {
      if (target === "profile") {
        this.showNotificationDropdown = false;
        this.dropdownVisible = !this.dropdownVisible;
        this.showEmailDropdown = false;
      } else if (target === "notifications") {
        this.dropdownVisible = false;
        this.showEmailDropdown = false;
        this.showNotificationDropdown = !this.showNotificationDropdown;
      } else if (target === "sidebar") {
        this.sidebarVisible = !this.sidebarVisible;
      } else {
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
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0.5;
}
</style>