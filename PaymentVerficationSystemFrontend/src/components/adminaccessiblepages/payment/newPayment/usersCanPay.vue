<template>
  <div class="py-4">
  

    <div class="py-6 -mt-1">
      <div class="mb-4">
        <div class="flex flex-col">
          <div class="flex flex-row space-x-4">
            <input
              @keyup.enter="searchUser"
              v-model="keyword"
              id="id-search"
              type="text"
              class="custom-input h-10"
              placeholder="Search by Usercode,Name"
            />
          </div>
          <!-- <p v-if="noUser" class="text-red-500 ml-32"><strong>Hoops! there is no user with this Id <span class="text-blue">{{ currentId }}</span></strong></p> -->
        </div>
      </div>

      <div class="border-t border-blue-900 border-dotted h-64 overflow-y-auto">
        <div
          class="px-4 border-b border-blue-900 border-dotted cursor-pointer"
          v-for="(user, userIndex) in filteredUsers"
          :key="userIndex"
          :class="[
            'p-4 border-b cursor-pointer',
            {
              'bg-blue-200 ': user.userselected, 
              'bg-gray-50': !user.userselected, 
            },
          ]"
          @click="navigateToPayment(user.userCode)"
        >
          <div class="text-xs flex flex-row space-x-5 md:space-x-12  text-gray-500">
            <p>{{ user.userCode }}</p>
            <p>{{ user.fullName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentStatus: 'newPayment',
      noSelectionCount: 0,
      previosSelected: -1,
      paymentVerified: true,
      showConfirmModal: false,
      keyword: "",
      filteredUsers: [],
    
      users: [],
    };
  },
  watch: {
    keyword() {
      this.searchUsers(this.keyword);
    },
  },

  mounted() {

    //this.filteredUsers=this.users;
    this.$apiClient
      .get("/api/v1/users/", {
        params: {
          isActive: true,
        },
      })
      .then((response) => {
        console.log("users", response.data.users);
        if (response.data !== null) {
          this.users = response.data.users;
          this.searchedClients = this.users;
          console.log("this users",this.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    console.log("These are the users please", this.users);
  },
  methods: {
    navigateToPayment(userCode) {
      console.log("userCode", userCode);
      this.$router.push(`/admindashboard/bank-statement/${userCode}`);
    },

    toggleUserSelection(userIndex) {
      this.filteredUsers.forEach((user) => (user.userselected = false));
      this.filteredUsers[userIndex].userselected = true;
      this.filteredUsers.forEach((user) => {
        if (!user.userselected) {
          user.payments.forEach((payment) => {
            if (payment.selected) {
              payment.selected = false;
              payment.bankSelected = true;
            }
          });
        }
      });

      if (this.previosSelected !== userIndex) {
        this.selectedPayments = [];
      }
      this.previosSelected = userIndex;
      console.log(this.selectedPayments);
    },

    searchUsers(keyword) {
      console.log("this users=", this.users);

      this.filteredUsers = this.users.filter((user) => {
        return (
          user.fullName.toLowerCase().includes(keyword.toLowerCase()) ||
          user.userCode.toLowerCase().includes(keyword.toLowerCase())
        );
      });

      console.log("filtered users", this.filteredUsers);
    },
    sendToDataBase() {
      console.log("paymentsb", this.selectedPayments);
      if (this.selectedPayments.length === 0) {
        this.paymentVerified = false;
        console.log("length===0");
      } else {
        this.paymentVerified = true;
        this.selectedPayments.forEach((payment) => {
          if (payment.bankType === null || payment.bankType === "") {
            this.paymentVerified = false;
          }
        });
      }
      console.log("paymentsafter", this.selectedPayments);
    },

    confirmDetails() {
      console.log("current id", this.searchId);
      if (this.searchId === "") {
        //  console.log("Please Enter the Id");
        this.enterUser = true;
        return;
      }
      this.selectedUser = this.users.find((user) => user.id === this.searchId);
      if (this.selectedUser == null) {
        this.noUser = true;
        //  console.log("There is No user with the given Id");

        return;
      }
      if (
        this.formData.month === "" &&
        this.formData.regular === "" &&
        this.formData.subsidy === "" &&
        this.formData.urgent === "" &&
        this.formData.service === ""
      ) {
        //console.log("Please fill all the fields");
        this.fillFields = true;
        return;
      } else {
        this.isVisible = true;
      }
    },
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
