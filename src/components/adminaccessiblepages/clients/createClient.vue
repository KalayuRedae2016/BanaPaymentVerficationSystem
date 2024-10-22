<template>
  <div class="" style="">
    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200">
  <!-- Left Section: Register Client Title and Import Excel -->
  <div class="flex items-center space-x-6">
    <h1 class="text-xl text-indigo-800 font-bold">Register Client</h1>

    <label for="file-upload" class="cursor-pointer text-blue-700 font-medium hover:text-white hover:bg-blue-500 py-2 px-4 border border-blue-500 rounded-lg transition">
      <span>Import Client From Excel</span>
      <input id="file-upload" type="file" class="hidden" ref="fileInputExcel" @change="handleFileInput" />
    </label>
  </div>

  <!-- Right Section: View Clients Link -->
  <a href="#" @click="viewClients()" class="text-blue-500 font-medium hover:underline">
    View Clients
  </a>
</div>

   
   
    <div class="flex flex-row z-0 border-t border-blue-500">
      <div class="flex items-center justify-between mb-4">
        <div class="m-5">
         

      
        </div>
      </div>
    </div>
    <div
      class="flex flex-col mx-4 space-y-3 md:space-y-0 md:flex-row md:space-x-5"
    >
      <div class="w-full space-y-3 md:w-1/2">
        <div class="w-full">
          <label class="custom-label" for="firstName">
            First Name
            <span class="text-red-500 ml-1">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            class="custom-input"
            placeholder=" First Name"
            style="padding-left: 16px"
            v-model="firstName"
          />

          <p v-if="firstNameIsRequired" class="text-red-500 text-sm mt-1 ml-10">
            First Name is required
          </p>
        </div>
        <div class="w-full">
          <label class="custom-label" for="middleName">
            Middle Name
            <span class="text-red-500 ml-1">*</span>
          </label>
          <input
            id="midleName"
            type="text"
            class="custom-input"
            placeholder="  Middle Name"
            style="padding-left: 16px"
            v-model="middleName"
          />

          <p
            v-if="middleNameIsRequired"
            class="text-red-500 text-sm mt-1 ml-10"
          >
            Middle Name is required
          </p>
        </div>

        <div class="w-full">
          <label class="custom-label" for="lastName">
            Last Name
            <span class="text-red-500 ml-1">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            class="custom-input"
            placeholder=" Last Name"
            style="padding-left: 16px"
            v-model="lastName"
          />
          <p v-if="lastNameIsRequired" class="text-red-500 text-sm mt-1 ml-10">
            Last Name is required
          </p>
        </div>
        <div class="w-full">
          <label class="custom-label " for="lastName">
            <span class="text-cyan-500">Tigrigna Full Name</span>
            <span class="text-red-500 ml-1">*</span>
          </label>
          <input
            id="Full Name"
            type="text"
            class="custom-input"
            placeholder="ምሉእ ስም አእቲ"
            style="padding-left: 16px"
            v-model="fullName"
          />
          <p v-if="fullNameIsRequired" class="text-red-500 text-sm mt-1 ml-10">
            Full Name is required
          </p>
        </div>

        <div class="w-full">
          <label class="custom-label" for="gender">
            Gender
            <span class="text-red-500">*</span>
          </label>
          <select
            id="gender"
            class="custom-select"
            style="padding-left: 16px"
            v-model="gender"
          >
            <option value="" disabled selected>gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p v-if="genderIsRequired" class="text-red-500 text-sm mt-1 ml-10">
            Gender is required
          </p>
        </div>

        <div class="w-full">
          <label class="custom-label"> Age <span>*</span></label>
          <input
            id="age"
            type="number"
            class="custom-input"
            required
            placeholder=" Age"
            style="padding-left: 16px"
            v-model="age"
          />
        </div>
        <p v-if="ageIsRequired" class="text-red-500 text-sm mt-1 ml-10">
          Age is required
        </p>
      </div>

      <div class="w-full space-y-3 md:space-y-3 md:w-1/2">
        <div class="w-full">
          <label class="custom-label" for="address">
            Address
            <span class="text-red-500 ml-1">*</span>
          </label>
          <input
            id="address"
            type="text"
            class="custom-input"
            placeholder="state-zone-city-subsity"
            style="padding-left: 16px"
            v-model="address"
          />
          <p v-if="addressIsRequired" class="text-red-500 text-sm mt-1 ml-10">
            Address is required
          </p>
        </div>
        <div class="w-full">
          <label class="custom-label" for="email">
            Email
            <span class="text-red-500 ml-1">*</span>
          </label>
          <input
            id="email"
            type="text"
            class="custom-input"
            placeholder="Email"
            style="padding-left: 16px"
            v-model="email"
          />
          <p v-if="emailIsRequired" class="text-red-500 text-sm mt-1 ml-10">
            Email is required
          </p>
        </div>
        <div class="w-full">
          <label class="custom-label">
            Phone Number
            <span class="text-red-500">*</span>
          </label>
          <div class="flex flex-row">
            <select
              v-model="phoneNumberCode"
              class="rounded-lg h-12 mt-3 w-16 block border-t border-l border-b border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option
                v-for="country in countries"
                :key="country.code"
                :value="country.code"
              >
                {{ country.code }} ({{ country.name }})
              </option>
            </select>
            <input
              type="text"
              class="rounded-sm custom-input h-12 mt-3"
              required
              placeholder="Phone Number"
              style="padding-left: 16px"
              v-model="phoneNumber"
            />
          </div>
          <p
            v-if="phoneNumberIsRequired"
            class="text-red-500 text-sm mt-1 ml-10"
          >
            Phone Number is required
          </p>
        </div>

        <div class="w-full">
          <label class="custom-label">
            Choose Profile Image
            <span class="text-red-500 ml-1">*</span>
          </label>
          <input
            class="custom-input mt-5"
            type="file"
            ref="fileInput"
            accept="image/*"
            @change="handleImageInput"
          />
          <p v-if="imageIsRequired" class="text-red-500 text-sm mt-1 ml-10">
            Profile Image is required
          </p>
        </div>
      </div>
    </div>
    <div class="ml-4 mr-8">
      <div class="w-1/2">
        <button
          @click="register()"
          class="mt-5 w-full bg-indigo-700 text-white font-semibold py-2 rounded mb-8"
        >
          SUBMIT
        </button>
      </div>
    </div>
  </div>

  <div v-if="importExelFilePressed">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96">
              <div class="flex items-center flex-row space-x-3">
                <p class="text-blue-600 text-2xl">
                  Do You Want To Import This File ??
                </p>

                <svg
                  @click="importExelFilePressed = !importExelFilePressed"
                  class="w-10 h-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>

              <button
                @click="importClientsFromExel()"
                class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                YES
              </button>
            </div>
          </div>
          <hr class="my-4 md:min-w-full bg-red-500" />
        </div>
      </div>
    </transition>
  </div>
  <div v-if="showSuccess">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-cyan-500">
          <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96">
              <div class="flex items-center mb-4 ml-32">
                <svg
                  class="w-8 h-8 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <h2 class="text-md text-green-800">Success!</h2>
              </div>
              <p class="text-blue-800 text-md ml-8">
                {{ successMessage }}
              </p>
              <button
                @click="showSuccess = false"
                class="ml-8 mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                OK
              </button>
            </div>
          </div>
          <hr class="my-4 md:min-w-full bg-red-500" />
        </div>
      </div>
    </transition>
  </div>

  <div v-if="showError">
    <transition name="fade" mode="out-in">
      <div
        class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
      >
        <!-- Modal Content -->
        <div class="bg-white rounded-lg p-6 border border-red-500">
          <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg p-8 w-96">
              <div class="flex items-center justify-center mb-4">
                <svg
                  class="w-8 h-8 text-red-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <h2 class="text-sm font-bold text-gray-800">Error!</h2>
              </div>
              <p class="text-gray-600 text-sm">
                {{ errorMessage }}
              </p>
              <button 
                @click="showError = false"
                class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                OK
              </button>
            </div>
          </div>
          <hr class="my-4 bg-red-500" />
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  components: {
    //Phone
  },
  data() {
    return {

      showSuccess:false,
      showError:false,
      errorMessage:"",
      successMessage:"",

      duplicateEmailError:false,
      duplicateEntry:false,
      errorRegister:false,
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      age: "",
      gender: "",
      selectedGender: "",
      //helper fields
      years: [],
      phoneNumberCode: "+251",
      //field conditions
      importExelFilePressed: false,
      importSuccess: false,
      successRegister: false,
      //exel files
      exelClientData: "",
      importClientFromExel: false,
      selectedCountryCode: "", // stores the selected country code
      // stores the phone number
      countries: [
        { code: "+251", name: "Eth" },
        { code: "+93", name: "Afghanistan" },
        { code: "+355", name: "Albania" },
        { code: "+213", name: "Algeria" },
        { code: "+376", name: "Andorra" },
        { code: "+244", name: "Angola" },
        // Add more countries starting with A to C here
        { code: "+61", name: "Australia" },
        { code: "+43", name: "Austria" },
        { code: "+994", name: "Azerbaijan" },
        { code: "+1242", name: "Bahamas" },
        { code: "+973", name: "Bahrain" },
        { code: "+880", name: "Bangladesh" },
        { code: "+1246", name: "Barbados" },
        { code: "+375", name: "Belarus" },
        { code: "+32", name: "Belgium" },
        { code: "+501", name: "Belize" },
        { code: "+229", name: "Benin" },
        { code: "+1441", name: "Bermuda" },
        { code: "+975", name: "Bhutan" },
        { code: "+591", name: "Bolivia" },
        { code: "+387", name: "Bosnia and Herzegovina" },
        { code: "+267", name: "Botswana" },
        { code: "+55", name: "Brazil" },
        { code: "+246", name: "British Indian Ocean Territory" },
        { code: "+1284", name: "British Virgin Islands" },
        { code: "+673", name: "Brunei" },
        { code: "+359", name: "Bulgaria" },
        { code: "+226", name: "Burkina Faso" },
        { code: "+257", name: "Burundi" },
        { code: "+855", name: "Cambodia" },
        { code: "+237", name: "Cameroon" },
        { code: "+1", name: "Canada" },
        { code: "+238", name: "Cape Verde" },
        { code: "+599", name: "Caribbean Netherlands" },
        { code: "+1345", name: "Cayman Islands" },
        { code: "+236", name: "Central African Republic" },
        { code: "+235", name: "Chad" },
        { code: "+56", name: "Chile" },
        { code: "+86", name: "China" },
        { code: "+57", name: "Colombia" },
        { code: "+269", name: "Comoros" },
        { code: "+243", name: "Congo (DRC)" },
        { code: "+242", name: "Congo (Republic)" },
        { code: "+682", name: "Cook Islands" },
        { code: "+506", name: "Costa Rica" },
        // Add more countries here
      ],

      //user detail
      firstNameIsRequired: false,
      middleNameIsRequired: false,
      lastNameIsRequired: false,
      genderIsRequired: false,
      imageIsRequired: false,
      ageIsRequired: false,
      addressIsRequired: false,
      emailIsRequired: false,
      phoneNumberIsRequired: false,
      

      imageFile: "",
      exelFile: "",
      addFamily: false,

      isFocused: false,
      isGendered: false,
      days: Array.from({ length: 31 }, (_, i) => i + 1),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  mounted() {
    this.years = this.generateYearsArray(1914, 100).concat(
      this.generateYearsArray(2024, 100)
    );
  },
  created() {
    // this.$apiClient = axios.create({
    //   baseURL: "http://localhost:8081/", // Set your base URL here
    // });
  },
  methods: {
    viewClients() {
      this.$router.push("/admindashboard/clients");
    },

    importClientsFromExel() {
      this.importExelFilePressed = false;
      console.log("This.exel", this.exelFile);
      const formData = new FormData();
      formData.append("file", this.exelFile);
      if (this.exelFile !== null) {
        this.$apiClient
          .post("/api/v1/users/importUsers", formData)
          .then((response) => {
            console.log("import response",response);
            if (response.data.success===1) {
              this.successMessage=response.data.message;
              this.showSuccess=true;
            }
          })
          .catch((error) => {
            this.showError=true;
            this.errorMessage=error.response.data.message;
          });
      }
    },
    handleImageInput() {
      const fileInput = this.$refs.fileInput;
      console.log("fileInput", fileInput);
      if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        this.imageFile = file;
      }
    },

    handleFileInput() {
      console.log("This is the onchange calledddddd");
      const fileInput = this.$refs.fileInputExel;
      if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        this.exelFile = file;
        this.importExelFilePressed = true;
        console.log("this.presses", this.importExelFilePressed);
        // Rest of your code to handle the file
      } else {
        console.log("No file selected");
      }
    },

    handleFocus() {
      this.isFocused = true;
    },
    handleBlur() {
      this.isFocused = false;
    },
    selectGender(gender) {
      this.selectedGender = gender;
      this.isFocused = false;
    },
    onSubmit() {
      // Handle form submission
      console.log("Form submitted:", this.formData);
    },

    generateYearsArray(startYear, numYears) {
      const years = [];
      for (let i = 0; i < numYears; i++) {
        years.push(startYear + i);
      }
      return years;
    },

    register() {
      //  console.log("FamillyMembers", this.familyMembers);
      console.log("register called");
      if (this.firstName === "") {
        this.firstNameIsRequired = true;
        return;
      }

      if (this.middleName === "") {
        this.firstNameIsRequired = false;
        this.middleNameIsRequired = true;
        return;
      }

      if (this.lastName === "") {
        this.firstNameIsRequired = false;
        this.middleNameIsRequired = false;
        this.lastNameIsRequired = true;
        return;
      }

      if (this.gender === "") {
        this.firstNameIsRequired = false;
        this.middleNameIsRequired = false;
        this.lastNameIsRequired = false;
        this.genderIsRequired = true;
        return;
      }

      if (this.age === "") {
        this.firstNameIsRequired = false;
        this.middleNameIsRequired = false;
        this.lastNameIsRequired = false;
        this.genderIsRequired = false;
        this.ageIsRequired = true;
        return;
      }

      if (this.address === "") {
        this.firstNameIsRequired = false;
        this.middleNameIsRequired = false;
        this.lastNameIsRequired = false;
        this.genderIsRequired = false;
        this.ageIsRequired = false;
        this.addressIsRequired = true;
        return;
      }

      if (this.email === "") {
        this.firstNameIsRequired = false;
        this.middleNameIsRequired = false;
        this.lastNameIsRequired = false;
        this.genderIsRequired = false;
        this.ageIsRequired = false;
        this.addressIsRequired = false;
        this.emailIsRequired = true;
        return;
      }

      if (this.phoneNumber === "") {
        this.firstNameIsRequired = false;
        this.middleNameIsRequired = false;
        this.lastNameIsRequired = false;
        this.genderIsRequired = false;
        this.ageIsRequired = false;
        this.addressIsRequired = false;
        this.emailIsRequired = false;
        this.phoneNumberIsRequired = true;
        return;
      } else if (this.imageFile === "") {
        this.firstNameIsRequired = false;
        this.middleNameIsRequired = false;
        this.lastNameIsRequired = false;
        this.genderIsRequired = false;
        this.ageIsRequired = false;
        this.addressIsRequired = false;
        this.emailIsRequired = false;
        this.phoneNumberIsRequired = false;
        this.imageIsRequired =true;
      }else{
        this.firstNameIsRequired = false;
        this.middleNameIsRequired = false;
        this.lastNameIsRequired = false;
        this.genderIsRequired = false;
        this.ageIsRequired = false;
        this.addressIsRequired = false;
        this.emailIsRequired = false;
        this.phoneNumberIsRequired = false;
        this.imageIsRequired =false;
      }

      const fullPhoneNumber = this.phoneNumberCode + this.phoneNumber;
      console.log(
        "data",
        this.firstName,
        this.middleName,
        this.lastName,
        this.gender,
        this.age,
        this.address,
        this.email,
        fullPhoneNumber
      );

      const formData = new FormData();
      formData.append("firstName", this.firstName);
      formData.append("middleName", this.middleName);
      formData.append("lastName", this.lastName);
      formData.append("gender", this.gender);
      formData.append("age", this.age);
      formData.append("address", this.address);
      formData.append("email", this.email);
      formData.append("phoneNumber", fullPhoneNumber);
      formData.append("profileImage", this.imageFile);
      formData.append("fullName",this.fullName);
      console.log("image", this.imageFile);
      this.$apiClient
        .post("/api/v1/users/signup", formData)
        .then((response) => {
          if(response.data.status===1){
           this.successMessage=response.data.message;
           this.showSuccess=true;
          }
        })
        .catch((error) => {
        this.errorMessage=error.response.data.message;
        this.showError=true;
        });
    },
  },
};
</script>
<style scoped>
.label-top {
  top: -0.17rem;
}
.w-full input::placeholder {
  margin-left: 16px;
}
</style>
