<template>
  <div class="bg-gray-200">
    <div class="relative md:ml-64">
      <!-- navbar -->
      <!-- <header v-if="!largerScreen" class="z-10 fixed top-0 left-0 right-0 h-16 flex items-center justify-between bg-white shadow-lg px-4 border-b border-gray-400">
        <div class="logo">
          <img
            src="../../../assets/img/BANA1.PNG"
            alt="Logo"
            class="h-8 w-8"
          />
        </div>
       
          <div class="">
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
        <button
          class="md:hidden cursor-pointer text-black opacity-50 md:hidden py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          @click="toggleDropdown('sidebar')"
        >
          <i class="fas fa-bars"></i>
        </button>
       </header> -->

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

          <div
            class="relative mt-3 cursor-pointer"
            @click="toggleDropdown('notifications')"
          >
            <i class="fas fa-bell text-blue-500 text-xs"></i>
            <span v-if="notificationCount>0" @click="notificationCliked()"
              style="margin-top: 2px"
              class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-1.5"
            >
              {{ notificationCount }}
            </span>
            <ul  
              v-show="showNotificationDropdown"
              class=" absolute right-0 mt-2 w-64 bg-white rounded shadow-lg border-t border-b border-blue-400"
            >
              <li class="m-6 text-blue-500 font-bold">{{ $t('notifications') }}</li>
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
              src="../../../assets/img/banamall1.jpg"
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
                  >{{ $t('changePassword') }}</a
                >
              </li>

              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  @click="logout"
                  >{{ $t('logout') }}</a
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
                <span>{{ $t("clientProfile") }}</span>
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
                <span>{{ $t("paymentSetting") }}</span>
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
                <span>{{ $t("newPayments") }}</span>
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
                <span>{{ $t("allPayments") }}</span>
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
                <span>{{ $t("reports") }}</span>
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
                <span>{{ $t("idCard") }}</span>
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
                <span>{{ $t("sendMessage") }}</span>
              </a>
            </li>
          </ul>
        </div>
      </transition>

      <sidebar-component class="border-r border-gray-300"></sidebar-component>
      <div v-if="leftsidebardropdown" class="md:hidden flex flex-col space-y-4">
        <ul
          class="border border-gray-200 md:flex-col md:min-w-full flex flex-col list-none ml-0 mr-0 mt-0"
        >
          <li
            @click="dashboard()"
            class="items-center bg-white hover:border-r-4 border-indigo-800 hover:bg-gray-300"
          >
            <a
              class="ml-4 text-indigo-800 text-xs py-3 font-bold block"
              href="#"
              ><i
                class="fa fa-tachometer opacity-75 mr-2 text-md text-teal-600"
              ></i>

              <span> Dashboard </span>
            </a>
          </li>

          <li
            @click="companyProfile()"
            class="items-center bg-white hover:border-r-4 border-indigo-800 hover:bg-gray-300"
          >
            <a
              class="ml-4 text-indigo-800 text-xs py-3 font-bold block"
              href="#"
              ><i
                class="fas fa-money-bill-wave opacity-75 mr-2 text-md text-teal-600"
              ></i>

              <span> Company Profile </span>
            </a>
          </li>
          <li
            @click="clients()"
            class="items-center bg-white hover:border-r-4 border-indigo-800 hover:bg-gray-300"
          >
            <a
              class="ml-4 text-indigo-800 text-xs py-3 font-bold block"
              href="#"
              ><i
                class="fas fa-users opacity-75 mr-2 text-md text-teal-600"
              ></i>

              <span> Clients Profile </span>
            </a>
          </li>
          <li
            @click="paymentSettings()"
            class="items-center bg-white hover:border-r-4 border-indigo-800 hover:bg-gray-300"
          >
            <a
              class="ml-4 text-indigo-800 text-xs py-3 font-bold block"
              href="#"
              ><i
                class="fa fa-credit-card opacity-75 mr-2 text-md text-teal-600"
              >
              </i>
              <span> Payment Settings </span>
            </a>
          </li>

          <li
            v-if="screenSize === 3"
            class="items-center bg-white hover:border-r-4 border-indigo-800 hover:bg-gray-300"
          >
            <a
              class="ml-4 text-indigo-800 text-xs py-3 font-bold block"
              href="/userdashboard/Messages"
              ><i
                class="fas fa-users opacity-75 mr-2 text-md text-teal-900"
              ></i>
              <span> Messages </span>
            </a>
          </li>
        </ul>
      </div>

      <div class="flex flex-row rightsidbar">
        <main
          class="shadow-1g bg-white w-full border-t border-gray-200 ml-0 mr-0 sm:ml-0 sm:mr-0 md:ml-0 md:ml-[6px] lg:mt-[67px] lg: md:mt-[67px] md:mr-[23 px] xl:mt-[67px] transition-all"
        >
          <router-view />
        </main>
        <div
          v-if="screenSize === 9"
          class="overflow-y:auto fixed top-16 right-0 h-full bg-gray-100 shadow-xl p-4 border-l border-gray-300 w-[250px] mt-[3px]"
        >
          <div class="p-4">
            <h1 class="text-2xl text-indigo-800 font-bold">
              {{ $t("Client Feedbacks") }}
            </h1>

            <hr class="my-4 md:min-w-full bg-pink-500" />
            <div class="flex flex-col space-y-4">
              <!-- Message 1 -->
              <div class="flex items-start">
                <img
                  src="../../../assets/img/profile.JPG"
                  class="w-8 h-8 rounded-full"
                  alt="Avatar"
                />
                <div class="bg-gray-200 rounded-lg p-3 ml-5">
                  <p class="text-gray-800">
                    I have Sent A Payment Request but still i am not confirmed
                  </p>
                  <span class="text-indigo-500 text-xl font-semibold"
                    >Sentt by John</span
                  >
                </div>
              </div>

              <div class="flex items-start">
                <img
                  src="../../../assets/img/profile.JPG"
                  class="w-8 h-8 rounded-full"
                  alt="Avatar"
                />
                <div class="bg-gray-200 rounded-lg p-3 ml-5">
                  <p class="text-gray-800">Do we have Metting This week</p>
                  <span class="text-indigo-500 text-xl font-semibold"
                    >Sent by Tadios</span
                  >
                </div>
              </div>

              <div class="flex items-start">
                <img
                  src="../../../assets/img/profile.JPG"
                  class="w-8 h-8 rounded-full"
                  alt="Avatar"
                />
                <div class="bg-gray-200 rounded-lg p-3 ml-5">
                  <p class="text-gray-800">
                    When will be the celebration please?
                  </p>
                  <span class="text-indigo-500 text-xl font-semibold"
                    >Sent By Gidey</span
                  >
                </div>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-pink-500" />
          </div>
        </div>
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
                  {{ $t('grandTech') }}
                </a>
              </div>
            </div>
            <div class="w-full md:w-8/12 px-4">
              <ul
                class="flex flex-wrap list-none md:justify-end justify-center"
              >
                <li>
                  <a
                    href="https://www.creative-tim.com"
                    class="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-3"
                  >
                  {{ $t('grandTech') }}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.creative-tim.com/presentation"
                    class="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-3"
                  >
                  {{ $t('aboutUs') }}
                  </a>
                </li>
                <li>
                  <a
                    href="http://blog.creative-tim.com"
                    class="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-3"
                  >
                  {{ $t('blog') }}
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/creativetimofficial/tailwind-starter-kit/blob/main/LICENSE.md"
                    class="text-blueGray-600 hover:text-blueGray-800 text-xs font-semibold block py-1 px-3"
                  >
                  {{ $t('grandTechLicense') }} 
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
      previosPaymentsLength:0,
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
          userCode:"123",
          activeYear:"",
          activeMonth:"",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          userCode:"321",
          activeYear:"",
          activeMonth:"",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          userCode:"321",
          activeYear:"",
          activeMonth:"",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          userCode:"321",
          activeYear:"",
          activeMonth:"",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          userCode:"321",
          activeYear:"",
          activeMonth:"",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          userCode:"321",
          activeYear:"",
          activeMonth:"",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          userCode:"321",
          activeYear:"",
          activeMonth:"",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          userCode:"321",
          activeYear:"",
          activeMonth:"",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          userCode:"321",
          activeYear:"",
          activeMonth:"",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          userCode:"321",
          activeYear:"",
          activeMonth:"",
          date: new Date(),
        },
        {
          message: "Your post has been liked.",
          image: "assets/img/profile.JPG",
          userCode:"321",
          activeYear:"",
          activeMonth:"",
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
  created() {
    this.setScreenSize();
    window.addEventListener("resize", this.setScreenSize);
    //this.firstPaymentLength();
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


    notificationCliked(){
      this.notificationCount=0;
    },
   
   
   //this is to show the new notification;


    navigateToPayment(notification){
      alert("in navigate");
      console.log("the notification is",notification)
        this.$router.push(`/admindashboard/bank-statement/${notification.userCode}`,{
          params:{
         }
      })
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


    async fetchPayments() {
      this.$apiClient
        .get("api/v1/payments")
        .then((response) => {
           console.log("respanse", response);
          if (response.data.length > this.previosPaymentsLength) {
           this.notifications=response.data.payments.slice(0, response.data.lenght-this.previosPaymentsLength);
          }
            this.payments = response.data.payments;
            this.previosPaymentsLength = response.data.length;
        })
        .catch((error) => {
          console.log("error in the catch", error);
       });
    },


    startFetching() {
      this.fetchPayments(); // Initial fetch
      this.intervalId = setInterval(() => this.fetchPayments(), 1000);
    },


    changePassword() {
      this.$router.push("/admindashboard/change-password");
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
    //    message() {
    //   this.$router.push("/admindashboard/send-email");
    // },
    // clients() {
    //   this.$router.push("/admindashboard/clients");
    // },
    // reports() {
    //   this.$router.push("/admindashboard/recent-payment-status-report");
    // },

    //   payment() {
    //   this.$router.push("/admindashboard/payments1");
    // },
    //  companyProfile() {
    //   this.$router.push("/admindashboard/display-companey");
    // },
  
    changeLanguage(event) {
      // alert("alert")
      const selectedLanguage = event.target.value;
      this.$store.dispatch("setLocale", { locale: selectedLanguage });
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