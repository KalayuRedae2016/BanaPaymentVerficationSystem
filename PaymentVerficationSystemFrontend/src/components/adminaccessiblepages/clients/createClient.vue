<template>
  <div>
    <Toast ref="toast" />
    <div class="" style="">
      <div
        class="flex items-center justify-between p-3 bg-white border-b border-blue-500"
      >
        <div class="flex items-center space-x-6">
          <h1 class="text-xl text-blue-500 font-bold">
            {{ $t("registerClient") }}
          </h1>
        </div>
      </div>

      <div class="flex flex-row space-x-6 mt-5 ml-5">
        <label
          for="file-upload"
          class="px-3 cursor-pointer text-blue-700 font-medium hover:text-white hover:bg-blue-500 rounded-lg"
        >
          <span> {{ $t("Import users(excel)") }}</span>
          <input
            id="file-upload"
            type="file"
            class="hidden"
            ref="fileInputExcel"
            @change="handleFileInput"
          />
        </label>
        <a
          href="#"
          @click="viewClients()"
          class="text-blue-500 font-medium hover:underline"
        >
          {{ $t("viewClients") }}
        </a>
      </div>

      <div
        class="mt-3 flex flex-col mx-4 space-y-3 md:space-y-0 md:flex-row md:space-x-5 border border-gray-300 p-3 rounded-lg"
      >
        <div class="w-full space-y-3 md:w-1/2">
          <div class="w-full">
            <label class="custom-label" for="firstName">
              {{ $t("firstName") }}
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              class="custom-input text-xs"
              :placeholder="$t('firstName')"
              style="padding-left: 16px"
              v-model="firstName"
            />
          </div>
          <div class="w-full">
            <label class="custom-label" for="middleName">
              {{ $t("middleName") }}
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input
              id="midleName"
              type="text"
              class="custom-input text-xs"
              :placeholder="$t('middleName')"
              style="padding-left: 16px"
              v-model="middleName"
            />
          </div>

          <div class="w-full">
            <label class="custom-label" for="lastName">
              {{ $t("lastName") }}
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              class="custom-input text-xs"
              :placeholder="$t('lastName')"
              style="padding-left: 16px"
              v-model="lastName"
            />
          </div>
          <div class="w-full">
            <label class="custom-label" for="lastName">
              <span class="text-cyan-500"> {{ $t("tigrignaFullName") }}</span>
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input
              id="Full Name"
              type="text"
              class="custom-input text-xs"
              :placeholder="$t('tigrignaFullName')"
              style="padding-left: 16px"
              v-model="tigrignaFullName"
            />
          </div>

          <div class="w-full">
            <label class="custom-label" for="gender">
              {{ $t("gender") }}
              <span class="text-red-500">*</span>
            </label>
            <select
              id="gender"
              class="custom-select text-xs"
              style="padding-left: 16px"
              v-model="gender"
            >
              <option value="" disabled selected>{{ $t("gender") }}</option>
              <option value="Male">{{ $t("male") }}</option>
              <option value="Female">{{ $t("female") }}</option>
            </select>
          </div>
          <div class="w-full">
            <label class="custom-label"> {{ $t("age") }} <span>*</span></label>
            <input
              id="age"
              type="number"
              class="custom-input text-xs"
              required
              :placeholder="$t('age')"
              style="padding-left: 16px"
              v-model="age"
            />
          </div>
        </div>

        <div class="w-full space-y-3 md:space-y-3 md:w-1/2">
          <div class="w-full">
            <label class="custom-label" for="address">
              {{ $t("address") }}
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input
              id="address"
              type="text"
              class="custom-input text-xs"
              placeholder="Address"
              style="padding-left: 16px"
              v-model="address"
            />
          </div>
          <div class="w-full">
            <label class="custom-label" for="email">
              {{ $t("email") }}
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input
              id="email"
              type="text"
              class="custom-input text-xs"
              :placeholder="$t('email')"
              style="padding-left: 16px"
              v-model="email"
            />
            <p v-if="emailIsRequired" class="text-red-500 text-sm mt-1 ml-10">
              {{ $t("emailRequired") }}
            </p>
          </div>
          <div class="w-full">
            <label class="custom-label">
              {{ $t("phoneNumber") }}
              <span class="text-red-500">*</span>
            </label>
            <div class="flex flex-row">
              <select v-model="phoneNumberCode" class="custom-select w-1/4">
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
                class="rounded-sm custom-input h-10 text-xs ml-2 w-3/4"
                required
                :placeholder="$t('phoneNumber')"
                style="padding-left: 16px"
                v-model="phoneNumber"
              />
            </div>
          </div>

          <div class="w-full">
            <label class="custom-label">
              {{ $t("chooseProfileImage") }}
              <span class="text-red-500 ml-1"></span>
            </label>
            <input
              class="custom-input text-xs"
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="handleImageInput"
            />
          </div>
          <div class="w-full" v-if="role === 'SuperAdmin'">
            <label class="custom-label"> {{ $t("Role") }} <span>*</span></label>
            <select v-model="userRole" class="custom-select">
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
      </div>
      <div class="mx-5 mt-5">
        <!-- Drag and Drop Area -->
        <div
          class="border-2 border-dashed border-blue-400 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500"
          :class="{ 'border-blue-400 bg-blue-50': isDragging }"
          @dragover.prevent="onDragOver"
          @dragleave="onDragLeave"
          @drop.prevent="onDrop"
        >
          <p v-if="files.length === 0" class="text-center">
            Drag & drop images or PDFs here, or click to select
          </p>
          <input
            type="file"
            accept="image/*,application/pdf"
            class="hidden"
            ref="fileInput"
            multiple
            @change="onFileChange"
          />
          <button
            type="button"
            class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            @click="selectFile"
          >
            Browse Files
          </button>
          <p class="text-blue-500">Add User Atachement either Image or PDF</p>
        </div>

        <!-- File List -->
        <div v-if="files.length > 0" class="mt-4">
          <p class="font-semibold text-blue-500">Choosen Files:</p>
          <ul class="space-y-4 mt-2">
            <li
              v-for="(file, index) in files"
              :key="index"
              class="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-gray-300 rounded"
            >
              <div v-if="isImage(file)" class="w-16 h-16">
                <img
                  :src="file.preview"
                  alt="Preview"
                  class="object-cover w-full h-full rounded"
                />
              </div>
              <div
                v-else
                class="w-16 h-16 flex items-center justify-center text-sm text-gray-600 bg-gray-100 rounded"
              >
                <p>PDF</p>
              </div>
              <!-- <div class="flex-1">
                <p class="text-sm font-medium text-gray-800">{{ file.name }}</p>
                <p class="text-xs text-gray-500">{{ formatSize(file.size) }}</p>
                <input
                  v-model="file.description"
                  type="text"
                  placeholder="Enter description"
                  class="custom-input"
                />
              </div> -->
              <button
                class="text-red-500 hover:text-red-600"
                @click="removeFile(index)"
              >
                <i class="fa fa-x text-xs mt-10"></i>
              </button>
            </li>
          </ul>
          <!-- <button
        @click="uploadFiles"
        class="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Upload All
      </button> -->
        </div>
      </div>

      <div class="ml-4 mr-8 mt-5">
        <p v-if="firstNameIsRequired" class="text-red-500 text-sm mt-1 ml-10">
          {{ $t("firstNameRequired") }}
        </p>
        <p v-if="middleNameIsRequired" class="text-red-500 text-sm mt-1 ml-10">
          {{ $t("middleNameRequired") }}
        </p>
        <p v-if="lastNameIsRequired" class="text-red-500 text-sm mt-1 ml-10">
          {{ $t("lastNameRequired") }}
        </p>
        <p v-if="fullNameIsRequired" class="text-red-500 text-sm mt-1 ml-10">
          {{ $t("fullNameRequired") }}
        </p>
        <p v-if="genderIsRequired" class="text-red-500 text-sm mt-1 ml-10">
          {{ $t("genderRequired") }}
        </p>
        <p v-if="ageIsRequired" class="text-red-500 text-sm mt-1 ml-10">
          {{ $t("ageRequired") }}
        </p>
        <p v-if="addressIsRequired" class="text-red-500 text-sm mt-1 ml-10">
          {{ $t("addressRequired") }}
        </p>
        <p v-if="phoneNumberIsRequired" class="text-red-500 text-sm mt-1 ml-10">
          {{ $t("phoneNumberRequired") }}
        </p>
        <p v-if="imageIsRequired" class="text-red-500 text-sm mt-1 ml-10">
          {{ $t("profileImageRequired") }}
        </p>
        <p v-if="showErrorMessage" class="text-red-500 text-sm mt-1 ml-10">
          {{ errorMessage }}
        </p>
        <div class="w-1/2">
          <button @click="register()" class="mt-3 w-32 custom-button mb-5">
            <i class="fa fa-arrow-right"></i> {{ $t("submit") }}
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
                    {{ $t("doYouWantToImportFile") }}
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
                  {{ $t("Yes") }}
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
                  <h2 class="text-md text-green-800">{{ $t("success") }}</h2>
                </div>
                <p class="text-blue-800 text-md ml-8">
                  {{ successMessage }}
                </p>
                <button
                  @click="showSuccess = false"
                  class="ml-8 mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {{ $t("ok") }}
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
                  <h2 class="text-sm font-bold text-gray-800">
                    {{ $t("error") }}
                  </h2>
                </div>
                <p class="text-gray-600 text-sm">
                  {{ errorMessage }}
                </p>
                <button
                  @click="showError = false"
                  class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {{ $t("ok") }}
                </button>
              </div>
            </div>
            <hr class="my-4 bg-red-500" />
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
  data() {
    return {
      files: [], // Array to store uploaded files and metadata
      isDragging: false, // To style drag area on drag events

      role: "",

      userRole: "User",

      errorMessage: "",
      showErrorMessage: false,
      duplicateEmailError: false,
      duplicateEntry: false,
      errorRegister: false,
      firstName: "",
      middleName: "",
      lastName: "",
      tigrignaFullName: "",
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
    this.role = localStorage.getItem("role");
  },
  methods: {
    //

    // Format file size
    formatSize(size) {
      if (size < 1024) return `${size} B`;
      else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
      else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    },

    // Trigger file input dialog
    selectFile() {
      this.$refs.fileInput.click();
    },

    // Handle file change event
    onFileChange(event) {
      const selectedFiles = Array.from(event.target.files);
      this.addFiles(selectedFiles);
    },

    // Add files to the list
    addFiles(fileList) {
      fileList.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.files.push({
            file,
            name: file.name,
            size: file.size,
            description: "",
            preview: file.type.startsWith("image/") ? reader.result : null,
            
          });
        };
        if (file.type.startsWith("image/")) reader.readAsDataURL(file);
        else
          this.files.push({
            file,
            name: file.name,
            size: file.size,
            description: "",
          });
      });
    },

    // Handle drag over
    onDragOver() {
      this.isDragging = true;
    },

    // Handle drag leave
    onDragLeave() {
      this.isDragging = false;
    },

    // Handle file drop
    onDrop(event) {
      this.isDragging = false;
      const droppedFiles = event.dataTransfer.files;
      this.addFiles(Array.from(droppedFiles));
    },

    // Remove a file from the list
    removeFile(index) {
      this.files.splice(index, 1);
    },

    // Upload files to the server
    async uploadFiles() {
      if (!this.files.length) {
        alert("No files to upload!");
        return;
      }

      const formData = new FormData();
      // Append JSON stringified files data
      formData.append("filesData", JSON.stringify(this.files));
      alert("Uploading files");
      // try {
      //   const response = await axios.post("/upload", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
      //   console.log("Upload successful:", response.data);
      //   alert("Files uploaded successfully!");
      //   this.files = []; // Clear the list on successful upload
      // } catch (error) {
      //   console.error("Upload failed:", error);
      //   alert("Error uploading files!");
      // }
    },

    // Check if the file is an image
    isImage(file) {
      return file.preview !== null;
    },

    ///

    base64ToFile(base64, fileName, mimeType) {
      const byteString = atob(base64.split(",")[1]); // Decode base64
      const ab = new ArrayBuffer(byteString.length); // Create ArrayBuffer
      const ia = new Uint8Array(ab);

      // Fill the Uint8Array with byte values
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // Create a Blob and return it as a File
      const blob = new Blob([ab], { type: mimeType });
      return new File([blob], fileName, { type: mimeType });
    },

    async register() {
      //alert("hadgo")
      this.showErrorMessage = false;
      this.firstNameIsRequired = false;
      this.middleNameIsRequired = false;
      this.lastNameIsRequired = false;
      this.genderIsRequired = false;
      this.ageIsRequired = false;
      this.addressIsRequired = false;
      this.emailIsRequired = false;
      this.phoneNumberIsRequired = false;
      this.imageIsRequired = false;
      //  console.log("FamillyMembers", this.familyMembers);
      console.log("register called");
      if (this.firstName === "") {
        this.firstNameIsRequired = true;
        return;
      }

      if (this.middleName === "") {
        this.middleNameIsRequired = true;
        return;
      }

      if (this.lastName === "") {
        this.lastNameIsRequired = true;
        return;
      }

      if (this.gender === "") {
        this.genderIsRequired = true;
        return;
      }

      if (this.age === "") {
        this.ageIsRequired = true;
        return;
      }

      if (this.address === "") {
        this.addressIsRequired = true;
        return;
      }
      if (this.phoneNumber === "") {
        this.phoneNumberIsRequired = true;
        return;
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

      if (!this.files.length) {
        alert("No files to upload!");
        return;
      }

      if (!this.files.length) {
        alert("No files to upload!");
        return;
      }else{
        console.log("and the length this.files", this.files.length, this.files);
      }



      //console.log("and the length this.files", this.files.length, this.files);


      const fileArray = this.files.map((file) => {
        const { preview, name } = file;
        const mimeType = preview.split(";")[0].split(":")[1]; // Extract MIME type
        return this.base64ToFile(preview, name, mimeType);
      });
    console.log("file array is the atachements with no description are ",fileArray.length,fileArray);


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
      formData.append("role", this.userRole);
      formData.append("tigrignaName", this.tigrignaFullName);
      // formData.append("attachements", JSON.stringify(this.files));

      formData.append("attachements", fileArray);

      console.log("image", this.imageFile);
      console.log("formData", formData);
      console.log("image file ", this.imageFile);

      const customHeaders = {
        "Content-Type": "multipart/form-data",
      };
      try {
        await this.$apiPost(
          "/api/v1/users/signup",
          formData,
          customHeaders
        ).then((response) => {
          if (response.status === 1) {
            this.$refs.toast.showSuccessToastMessage(response.message);
            this.$reloadPage();
          }
        });
      } catch (error) {
        console.log("error from server", error.status, error.message);
        this.showErrorMessage = true;
        this.errorMessage = error.message;

        if (error.status === 404) {
          console.log("it is 404");
          this.errorMessage = "";
          this.$refs.toast.showWarningToastMessage(
            "Please Create a payment Setting"
          );
          // this.$reloadPage();
        }
      } finally {
      }
    },
    viewClients() {
      this.$router.push("/admindashboard/clients");
    },

    importClientsFromExel() {
      this.importExelFilePressed = false;
      console.log("This.exel", this.exelFile);
      const formData = new FormData();
      formData.append("file", this.exelFile);

      if (this.exelFile !== null) {
        try {
          this.$apiPost("/api/v1/users/importUsers", formData).then(
            (response) => {
              if (response.$apiPostsuccess === 1) {
                this.$refs.toast.showSuccessToastMessage(response.message);
              }
            }
          );
        } catch (error) {
          console.log("import error", error.status, error.message);
          this.showErrorToastMessage("Something went wrong");
        } finally {
        }
      }
    },

    handleImageInput() {
      //  alert("fileinput");
      const fileInput = this.$refs.fileInput;
         console.log("fileInput", fileInput);
      if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        this.imageFile = file;
      }

      console.log("Selected file:", this.imageFile);
      console.log("File type:", this.imageFile.type); // This should be 'image/jpeg', 'image/png', etc.
      console.log("File size:", this.imageFile.size); // Check size to ensure it's within acceptable limits
      console.log("File name:", this.imageFile.name); // Check the name of the file

      if (!this.imageFile.type.startsWith("image/")) {
        console.log("Not a valid image file.");
      } else {
        console.log("Image is valid.");
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
        this.showErrorToastMessage("No file selected,Or Invalid format");
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
