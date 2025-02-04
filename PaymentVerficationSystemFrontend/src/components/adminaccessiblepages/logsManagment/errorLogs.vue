<template>
    <div class="container mx-auto flex flex-col">
      <Toast ref="toast" />
      <div class="pb-5 flex flex-col bg-white -mt-2">
        <div class="mt-5">
          <div class="overflow-x-auto h-96">
            <table class="w-full border border-gray-300">
              <thead>
                <tr class="bg-blue-50 text-xs text-blue-500">
                  <th
                    class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                  >
                    Log Type
                  </th>
                  <th
                    class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                  >
                    Action
                  </th>
                  <th
                    class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                  >
                    Actor
                  </th>
                  <th
                    class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                  >
                    ip Address
                  </th>
                  <th
                    class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                  >
                    Description
                  </th>
                  <th
                    class="w-24 p-3 text-md font-extrabold tracking-wide text-left"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="text-xs">
                <tr
                  class="hover:bg-blue-100 border-t border-b border-gray-300"
                  v-for="logData in logsData"
                  :key="logData._id"
                >
                  <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                    {{ logData.model }}
                  </td>
                  <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                    {{ logData.action }}
                  </td>
                  <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                    {{ logData.actorName }}
                  </td>
                  <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                    {{ logData.ipAddress }}
                  </td>
                  <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                    {{ logData.description }}
                  </td>
                  <td
                    class="flex flex-row space-x-2 p-3 text-md text-blue-500 whitespace-nowrap"
                  >
                    <button
                      class="custom-button"
                      @click="
                        action = logData.action;
                        logDetail = true;
                        detail(logData);
                      "
                    >
                      <i class="fa fa-edit"></i>Detail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="!logsData" class="m-5 text-blue-500">No Logs</div>
          </div>
        </div>
      </div>
  
      <div v-if="logDetail">
        <transition name="fade" mode="out-in">
          <div
            class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
          >
            <div
              class="bg-white rounded-lg p-6 border border-cyan-500 px-5 w-2/3"
            >
              <div class="flex flex-row justify-between items-center">
                <div>
                  <label class="custom-label text-lg font-bold">
                    {{ $t("User Detail") }}
                  </label>
                </div>
                <div>
                  <svg
                    @click="logDetail = !logDetail"
                    class="w-6 h-6 custom-star hover:text-red-700 transition-colors duration-300 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
  
              <hr class="my-4 md:min-w-full bg-red-500" />
  
              <div class="h-96 overflow-y-auto">
                <div class="text-sm mx-0 lg:mx-5 mt-5 mb-5">
                  <div class="text-black-500 font-bold">
                    {{
                      action === "Create"
                        ? "Created User"
                        : action === "Delete"
                        ? "Deleted User"
                        : action === "Update"
                        ? "Data Before Update"
                        : "Unknown Action"
                    }}
                  </div>
                  <div
                    class="flex flex-col lg:flex-row space-x-0 space-y-4 lg:space-y-0"
                  >
                    <!-- <div class="mx-4 p-4 w-full h-full lg:w-1/4 h-64">
            <img
              :src="imageData"
              alt="User Profile Image"
              class="h-64 w-64 lg:w-96"
            />
          </div> -->
  
                    <div class="text-black-500 font-bold"></div>
                    <div class="mt-3 lg:w-full mx-4 lg:mx-0 p-4">
                      <!-- Grid container -->
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <!-- First Column -->
                        <div class="space-y-4">
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-id-badge text-green-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("User Code") }}:
                                {{ clientProfile.userCode }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-user text-yellow-500"></i>
                              <span class="text-sm text-gray-800"
                                >Full Name : {{ clientProfile.fullName }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-user text-yellow-500"></i>
                              <span class="text-sm text-gray-800"
                                >Tig Full Name :
                                {{ clientProfile.tigrignaName }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-venus-mars text-indigo-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Gender") }}:
                                {{ clientProfile.gender }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-calendar-alt text-green-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Age") }}: {{ clientProfile.age }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-map-marker-alt text-blue-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Address") }}:
                                {{ clientProfile.address }}</span
                              >
                            </div>
                          </div>
                        </div>
  
                        <!-- Second Column -->
                        <div class="space-y-4">
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-phone text-purple-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("phoneNumber") }}:
                                {{ clientProfile.phoneNumber }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-envelope text-green-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Email") }}:
                                {{ clientProfile.email }}</span
                              >
                            </div>
                          </div>
  
                          <div v-if="action==='Create' || action==='Update'" class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-map-marker-alt text-blue-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Created at") }}:
                                {{
                                  new Date(
                                    clientProfile.createdAt
                                  ).toLocaleDateString("en-GB")
                                }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-map-marker-alt text-blue-500"></i>
  
                              <span>{{
                      action === "Create"
                        ? "Updated At"
                        : action === "Delete"
                        ? "Deleted At"
                        : action === "Update"
                        ? "Updated At"
                        : "Unknown Action"
                    }}</span>
                              <span class="text-sm text-gray-800"
                                >
                                {{
                                  new Date(
                                    clientProfile.updatedAt
                                  ).toLocaleDateString("en-GB")
                                }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <svg
                                class="w-6 h-6 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 16h-1v-4h1m0 4h-1m1-4V8h-1v4h1m0 4h-1V8h1m0-4h-1V4h1v4zM12 9V5h.01M4.93 4.93l.08-.08 6.99 6.99M8.34 8.34l6.99 6.99-.08.08M4.93 19.07l6.99-6.99M4.93 4.93l14.14 14.14"
                                ></path>
                              </svg>
                              <span class="text-sm text-black"
                                >{{ $t("Current Status") }}:</span
                              >
                              <span
                                class="text-sm text-white px-2 py-0.5 mb-2 rounded-full"
                                :class="
                                  clientProfile.isActive
                                    ? 'bg-blue-500'
                                    : 'bg-yellow-500'
                                "
                              >
                                {{
                                  clientProfile.isActive
                                    ? $t("Active")
                                    : $t("Inactive")
                                }}
                              </span>
                            </div>
                          </div>
  
                          <div
                            v-if="clientProfile.reason"
                            class="bg-white p-1 rounded-md shadow-sm"
                          >
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i
                                class="fas fa-exclamation-circle text-red-500"
                              ></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Reason") }}:
                                {{ clientProfile.reason }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-4 md:min-w-full bg-red-500" />
  
                <div
                  v-if="action === 'Update'"
                  class="text-sm mx-0 lg:mx-5 mt-5 mb-5"
                >
                  <div class="text-black-500 font-bold">Data After Updated</div>
                  <div
                    class="flex flex-col lg:flex-row space-x-0 space-y-4 lg:space-y-0"
                  >
                    <!-- <div class="mx-4 p-4 w-full h-full lg:w-1/4 h-64">
            <img
              :src="imageData"
              alt="User Profile Image"
              class="h-64 w-64 lg:w-96"
            />
          </div> -->
      
  
                    <div class="mt-3 lg:w-full mx-4 lg:mx-0 p-4">
                      <!-- Grid container -->
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <!-- First Column -->
                        <div class="space-y-4">
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-id-badge text-green-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("User Code") }}:
                                {{ updatedClientProfile.userCode }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-user text-yellow-500"></i>
                              <span class="text-sm text-gray-800"
                                >Full Name :
                                {{updatedClientProfile.fullName }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-user text-yellow-500"></i>
                              <span class="text-sm text-gray-800"
                                >Tig Full Name :
                                {{ updatedClientProfile.tigrignaName }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-venus-mars text-indigo-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Gender") }}:
                                {{ updatedClientProfile.gender }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-calendar-alt text-green-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Age") }}:
                                {{ updatedClientProfile.age }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-map-marker-alt text-blue-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Address") }}:
                                {{ updatedClientProfile.address }}</span
                              >
                            </div>
                          </div>
                        </div>
  
                        <!-- Second Column -->
                        <div class="space-y-4">
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-phone text-purple-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("phoneNumber") }}:
                                {{ updatedClientProfile.phoneNumber }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-envelope text-green-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Email") }}:
                                {{ updatedClientProfile.email }}</span
                              >
                            </div>
                          </div>
  
                        
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i class="fas fa-map-marker-alt text-blue-500"></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Updated At") }}:
                                {{
                                  new Date(
                                    updatedClientProfile.updatedAt
                                  ).toLocaleDateString("en-GB")
                                }}</span
                              >
                            </div>
                          </div>
  
                          <div class="bg-white p-1 rounded-md shadow-sm">
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <svg
                                class="w-6 h-6 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 16h-1v-4h1m0 4h-1m1-4V8h-1v4h1m0 4h-1V8h1m0-4h-1V4h1v4zM12 9V5h.01M4.93 4.93l.08-.08 6.99 6.99M8.34 8.34l6.99 6.99-.08.08M4.93 19.07l6.99-6.99M4.93 4.93l14.14 14.14"
                                ></path>
                              </svg>
                              <span class="text-sm text-black"
                                >{{ $t("Current Status") }}:</span
                              >
                              <span
                                class="text-sm text-white px-2 py-0.5 mb-2 rounded-full"
                                :class="
                                  updatedClientProfile.isActive
                                    ? 'bg-blue-500'
                                    : 'bg-yellow-500'
                                "
                              >
                                {{
                                  updatedClientProfile.isActive
                                    ? $t("Active")
                                    : $t("Inactive")
                                }}
                              </span>
                            </div>
                          </div>
                          <div
                            v-if="updatedClientProfile.reason"
                            class="bg-white p-1 rounded-md shadow-sm"
                          >
                            <div
                              class="flex items-center space-x-3 border-b border-gray-300"
                            >
                              <i
                                class="fas fa-exclamation-circle text-red-500"
                              ></i>
                              <span class="text-sm text-gray-800"
                                >{{ $t("Reason") }}:
                                {{ updatedClientProfile.reason }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </template>
  <script>
  import Toast from "../../Common/Toast.vue";
  export default {
    components: {
      Toast,
    },
    name: "paymentTransfersView",
    data() {
      return {
        action: "",
        clientProfile: {},
        updatedClientProfile: {},
  
        logsData: [
          {
            _id: "1",
            model: "user",
            action: "Delate",
            actor: "admin1",
            ipAddress: "49.102.23.45",
            description: "This is the delate function",
          },
        ],
        logDetail: false,
      };
    },
  
    watch: {
      searchQuery: {
        handler: "filteredPaymentTransfersInSearch",
        immediate: true,
      },
    },
  
    computed: {},
    created() {
      this.role = localStorage.getItem("role");
    },
    mounted() {
      // this.displayedItems();
      this.fetchUserLogs();
    },
    methods: {
      detail(logData) {
        const actionMapping = {
          Create: logData.affectedData.user,
          Delete: logData.affectedData.deletedUser,
          Update: logData.affectedData.BeforeUpdate,
        };
        this.action = logData.action;
        this.clientProfile = actionMapping[logData.action] || null;
        if (logData.action === "Update") {
          //alert("hh")
          //console.log('logData.affectedData.updateData',logData.affectedData.updatedData);
          this.updatedClientProfile = logData.affectedData.updatedData;
        }
      },
      async fetchUserLogs() {
        const params = {
          model: "error",
        };
        try {
          await this.$apiGet("/api/v1/logs", params).then((response) => {
            console.log("response error logs", response);
            this.logsData = response.logs;
          });
        } catch (error) {
          console.log("error", error);
        } finally {
        }
      },
    },
  };
  </script>
  
  <style>
  .fade-enter-active {
    transition: opacity 0.3s ease-in-out;
  }
  
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  
  .fade-enter {
    opacity: 0;
  }
  
  .fade-leave-to {
    opacity: 0;
  }
  </style>