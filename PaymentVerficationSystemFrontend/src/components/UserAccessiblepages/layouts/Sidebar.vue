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
              @click="deadlines()"
              class="items-center bg-white hover:border-r-4 border-indigo-800 hover:bg-gray-300"
            >
              <a
                class="ml-4 text-indigo-800 text-2lg py-3 font-bold block"
                href="#"
                ><i
                  class="fas fa-money-bill-wave opacity-75 mr-2 text-md text-teal-600"
                ></i>

                <span> {{ $t("DeadLines") }}</span>
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

                <span> {{ $t("Profile") }} </span>
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
                  class="fas fa-users opacity-75 mr-2 text-md text-teal-600"
                ></i>

                <span> ID Card </span>
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
      sidebarVisible: false,
      collapseShow: "hidden",
      screenSize: "",
      isOpen: false,
    };
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
    idCard(){
      this.$router.push("/userdashboard/id-card");
    },
    togglePaymentSetting() {
      this.isOpen = !this.isOpen;
    },
    checkScreenSize() {
      // If the screen width is larger than the md breakpoint, hide the dropdown
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
      this.$router.push("/userdashboard");
    },
    profile(){
      this.$router.push('/userdashboard/profile')
    },
    deadlines(){
      this.$router.push('/userdashboard/info')
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
