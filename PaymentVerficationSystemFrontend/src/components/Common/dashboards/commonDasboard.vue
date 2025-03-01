<template>
  <div class="bg-gray-200">
   <commonSmoozer ref="smoozer"/>
    <div class="relative md:ml-64">
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
          <span class="text-lg font-semibold text-blue-500">Bana</span>
        </div>
      
        <!-- Right Section -->
        <div class="flex items-center space-x-6">
          <p class="hidden">locale: {{ locale }}</p>
          <select
            class="w-16 md:w-32 text-sm text-blue-500 border border-gray-300 rounded-md px-2 py-1 focus:ring focus:ring-blue-300"
            @change="changeLanguage"
          >
            <option value="" disabled selected>{{ $t("Language") }}</option>
            <option value="tigrigna">{{ $t("Tigrigna") }}</option>
            <option value="amharic">{{ $t("Amharic") }}</option>
            <option value="english">English</option>
          </select>
    
          <div class="relative">
            <button
              class="relative text-blue-500 hover:text-blue-500 focus:outline-none"
              aria-label="Notifications"
              @click="toggleDropdown('notifications')"
            >
              <i class="fas fa-bell text-xl"></i>
              <span
                v-if="notificationLength > 0"
                class="absolute -top-3 -right-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5"
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
            <li  v-if="role==='SuperAdmin' || role==='Admin'">
                <a
                  href="#"
                  class="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                  @click="help"
                >
                  {{ $t("Help") }}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                  @click="accountSetting"
                >
                  {{ $t("Account Setting") }}
                </a>
              </li>
             
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                  @click="logout"
                >
                  {{ $t("logout") }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Sidebar Toggle -->
          <button
            class="md:hidden text-xl text-blue-500 focus:outline-none"
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
              class="border-b last:border-0"
            >
              <a
                href="#"
                class="flex items-start px-4 py-2 hover:bg-gray-100"
                @click="navigateToPayment(notification)"
              >
                
               
              </a>
            </li>

            
          </ul>
          <div v-if="notificationLength ===9" class="mx-10 mt-5 text-blue-500 border border-gray-100 p-5">No notifications</div>
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
                  :src="'data:image/jpeg;base64,'+ notification.imageData || 'https://via.placeholder.com/128'"
                  alt="Notification Image"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p class="text-sm font-bold text-blue-500">
                    Paid for {{ notification.activeYear}} - {{ notification.activeMonth }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ notification.createdAt }}
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
          class="flex flex-col fixed inset-0 z-50 items-start bg-blue-500 bg-opacity-85"
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
                v-if="role === 'Admin'  ||role==='SuperAdmin'"
                @click="setActive('dashboard')"
                class="w-full items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600 ': activeItem === 'dashboard',
                }"
              >
                <a
                  class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                  href="#"
                >
                  <i class="fas fa-tachometer-alt mr-3 text-teal-600"></i>
                  <span>{{ $t("dashboard") }}</span>
                </a>
              </li>

              <li
                v-if="role=== 'Admin' ||role==='SuperAdmin'"
                @click="setActive('companyProfile')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600':
                    activeItem === 'companyProfile',
                }"
              >
                <a
                  class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                  href="#"
                >
                  <i class="fas fa-building mr-3 text-teal-600"></i>
                  <span>{{ $t("companyProfile") }}</span>
                </a>
              </li>

              <li
                v-if="role === 'Admin'  ||role==='SuperAdmin'"
                @click="setActive('clients')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'clients',
                }"
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
                v-if="role === 'Admin'  ||role==='SuperAdmin'"
                @click="setActive('payment')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'payment',
                }"
              >
                <a
                  class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                  href="#"
                >
                  <i class="fas fa-id-card mr-3 text-teal-600"></i>
                  <span>{{ $t("Payment") }}</span>
                </a>
              </li>

              <li
                v-if="role === 'Admin'  ||role==='SuperAdmin'"
                @click="setActive('idCard')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'idCard',
                }"
              >
                <a
                  class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                  href="#"
                >
                  <i class="fas fa-id-card mr-3 text-teal-600"></i>
                  <span>{{ $t("idCard") }}</span>
                </a>
              </li>

              <li
                v-if="role === 'Admin'  ||role==='SuperAdmin'"
                @click="setActive('message')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'message',
                }"
              >
                <a
                  class="ml-4 flex items-center text-blue-500 py-3 font-bold"
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
                  class="ml-4 flex items-center text-blue-500 py-3 font-bold"
                  href="#"
                >
                  <i class="fas fa-tachometer-alt mr-3 text-teal-600"></i>
                  <span>{{ $t("dashboard") }}</span>
                </a>
              </li>

              <li
                v-if="checkPermission"
                @click="setActive('userProfile')"
                class="items-center bg-white hover:bg-gray-100 transition"
                :class="{
                  'border-r-4 border-indigo-600': activeItem === 'userProfile',
                }"
              >
                <a
                  class="ml-4 flex items-center text-blue-500 py-3 font-bold"
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
                  class="ml-4 flex items-center text-blue-500 py-3 font-bold"
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
                  class="ml-4 flex items-center text-blue-500 py-3 font-bold"
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
                  class="ml-4 flex items-center text-blue-500 py-3 font-bold"
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





  <footer class="block py-6 bg-gray-100">
  <div class="container mx-auto px-6">
    <!-- Divider -->
    <hr class="mb-6 border-gray-300" />

    <!-- Footer Content -->
    <div class="flex flex-col lg:flex-row justify-between items-center w-full">
      <!-- Left Content -->
      <div class="text-center lg:text-left mb-4 lg:mb-0 w-full lg:w-auto">
        <a
          href="https://bannamall.com/"
          class="text-blue-600 hover:text-blue-800 text-lg font-bold block"
        >
          {{ $t("Bana General Market Mall") }}
        </a>
        <p class="text-gray-500 text-sm mt-2">
          Copyright © {{ date }}
        </p>
      </div>

      <!-- Right Content -->
      <div class="flex flex-col lg:flex-row items-center justify-center lg:justify-end w-full lg:w-auto">
        <p class="text-gray-500 text-sm font-semibold lg:mr-2">
          Powered By
        </p>
        <a
          href="https://grandtechsolutions.com"
          class="text-purple-700 hover:text-purple-900 text-lg font-bold"
        >
          {{ $t("Grand Technology Solutions") }}
        </a>
      </div>
    </div>
  </div>
  </footer>


    </div>
  </div>
</template>
  <script>
import SidebarComponent from "../layouts/Sidebar.vue";
import commonSmoozer from "../commonSmoozer.vue"
import { mapGetters } from "vuex";

export default {
  name: "dashboard-page",
  components: {
    SidebarComponent,
    commonSmoozer
  },
  data() {
    return {
      checkPermission:false,
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
      role:localStorage.getItem("role"),
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
    this.role=localStorage.getItem("role");
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

 async  mounted() {
    // if(localStorage.getItem("token")===null){
    //   this.$router.push({ path: "/" });
    // }else{

    // }

    window.addEventListener("resize", this.checkScreenSize);
    this.checkScreenSize();

    await  this.$apiGetById("/api/v1/users", this.userId)
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

      await this.fetchNotifications();
    //this.showToast();
   //setInterval(this.fetchNotifications, 5000);
  },
  methods: {

    toggleDarkMode() {
      document.body.classList.toggle('dark');
    },
   help(){
this.$router.push('/admindashboard/user-manual')
   },
    closeDropDownSidebar() {
      this.sidebarVisible = false;
    },

    fetchNotifications() {
     // this.$toast.success("This is a success message!");

      const params = {
        userId: this.userId,
        role: this.role,
      };
      this.$apiGet("/api/v1/payments/getNotifications", params)
        .then((response) => {
          console.log("response from the api payments notfications", response);
          this.notifications = response.paymentNotifications;
          this.notificationLength = response.length;
           this.imageData = "data:image/jpeg;base64," + response.imageData;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log("finally completed");
      });
    },

    navigateToPayment(notification) {
      this.showNotificationDropdown=false;
        console.log("notification",notification._id)
          const payload = {
            paymentId: notification._id,
            role: this.role,
          };
      this.$apiPut("/api/v1/payments/markPaymentAsSeen", notification._id, payload)
        .then((response) => {
          console.log("response for payment update", response);
        })
        .catch((error) => {
          console.log("Error: ", error);
        })
        .finally(() => {
          console.log("finally done");
       });

      if (this.role === "Admin" ||this.role==="SuperAdmin") {
        
        this.$router.push({
          path: `/admindashboard/payment-history-detail/${notification.userCode}`,
          query: {
            year: notification.activeYear,
            month: notification.activeMonth,
          },
        });
      } else {
        this.$router.push({
          path: "/userdashboard/",
          query: {
            year: notification.activeYear,
            month: notification.activeMonth,
          },
        });
       
      }
    },

    firstPaymentLength() {
        this.$apiGet('/api/v1/payments').then((response) => {
            this.previosPaymentsLength=response.length;
        }).catch((error) => {
          console.log("error in the catch", error);
        }).finally(() =>{
          console.log("finally completed");
        });
    },

    accountSetting() {
      if (this.role == "Admin" ||this.role==="SuperAdmin") {
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