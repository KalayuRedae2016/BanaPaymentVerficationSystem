<template>
    <div class="" style="">
      <div class="flex flex-row z-0">
        <div
          @click="previousPage()"
          v-if="currentStep === 2 || currentStep === 3 || currentStep === 4"
          class="flex items-center mt-4 ml-4 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 mr-2 text-indigo-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          <span class="text-gray-500">Back</span>
        </div>
        <h1 class="ml-5 text-2xl mt-4 text-indigo-800 font-bold">
          Register Client
        </h1>
      </div>
      <div class="ml-4 mr-4">
        <hr class="my-4 md:min-w-full bg-blue-900 border border-blue-700" />
      </div>
  
      <div class="flex flex-col">
        <div v-if="currentStep === 1" class="mt-3">
          <h1 class="mt-5 mb-5 ml-5 text-indigo-800 font-extrabold">
            Client Details
          </h1>
          <div class="flex flex-col lg:flex-row lg:space-x-12 ml-8 mr-8">
            <!-- First Name -->
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                First Name
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter First Name"
                style="padding-left: 16px"
                v-model="name.firstName"
              />
  
              <p v-if="passwordIsRequired" class="text-red-500 text-xs mt-1 ml-10">Password is required</p>
            </div>
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Middle Name
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Your Middle Name"
                style="padding-left: 16px"
                v-model="name.middleName"
              />
            </div>
          </div>
  
          <div class="flex flex-col lg:flex-row lg:space-x-12 mt-5 ml-8 mr-8">
            <!-- First Name -->
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Last Name
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Last Name"
                style="padding-left: 16px"
                v-model="name.lastName"
              />
            </div>
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Date of Birth
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Date of Birth"
                style="padding-left: 16px"
                v-model="dateOfBirth"
              />
            </div>
          </div>
  
          <div class="flex flex-col lg:flex-row lg:space-x-12 mt-5 ml-8 mr-8">
            <!-- First Name -->
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Gender
                <span class="text-red-500 ml-1">*</span>
              </label>
              <select
                class="ml-3 border border-indigo-800 w-full border-indigo-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base h-12"
                required
                style="padding-left: 16px"
                v-model="gender"
              >
                <option value="" disabled selected>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Martial Status
                <span class="text-red-500 ml-1">*</span>
              </label>
              <select
                class="border border-indigo-800 ml-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base h-12"
                required
                v-model="martialStatus"
              >
                <option value="" disabled selected>Select Martial Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Married</option>
              </select>
            </div>
          </div>
  
          <div class="flex flex-col lg:flex-row lg:space-x-12 mt-5 ml-8 mr-8">
            <!-- First Name -->
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Age
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Age"
                style="padding-left: 16px"
                v-model="age"
              />
            </div>
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Profession
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Your Profession"
                style="padding-left: 16px"
                v-model="profession"
              />
            </div>
          </div>
  
          <div
            class="flex flex-col lg:flex-row lg:space-x-12 mt-5 ml-8 mr-8 mb-5"
          >
            <!-- First Name -->
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Bank Account
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Your Bank Account"
                style="padding-left: 16px"
                v-model="bank_account"
              />
            </div>
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Choose Image
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                class="ml-3 mt-5"
                type="file"
                ref="fileInput"
                accept="image/*"
                @change="handleFileInput"
              />
            </div>
          </div>
        </div>
  
        <div v-if="currentStep === 2" class="mt-3">
          <h1 class="mt-5 mb-5 ml-5 text-indigo-800 font-extrabold">
            Client Address
          </h1>
          <div class="flex flex-col lg:flex-row lg:space-x-12 ml-8 mr-8">
            <!-- First Name -->
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Country
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Your Country"
                style="padding-left: 16px"
                v-model="address.country"
              />
            </div>
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                State
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Your State"
                style="padding-left: 16px"
                v-model="address.state"
              />
            </div>
          </div>
  
          <div class="flex flex-col lg:flex-row lg:space-x-12 ml-8 mr-8 mt-5">
            <!-- First Name -->
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Zone
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Your Zone"
                style="padding-left: 16px"
                v-model="address.zone"
              />
            </div>
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Wereda
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Your Wereda"
                style="padding-left: 16px"
                v-model="address.wereda"
              />
            </div>
          </div>
          <div
            class="flex flex-col lg:flex-row lg:space-x-12 ml-8 mr-8 mt-5 mb-5"
          >
            <!-- First Name -->
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Kebelle
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter First Name"
                style="padding-left: 16px"
                v-model="address.kebelle"
              />
            </div>
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                City
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Your City"
                style="padding-left: 16px"
                v-model="address.city"
              />
            </div>
          </div>
        </div>
  
        <div v-if="currentStep === 3" class="mt-3">
          <h1 class="mt-5 mb-5 ml-5 text-indigo-800 font-extrabold">
            Contacts and Creditials
          </h1>
          <div class="flex flex-col lg:flex-row lg:space-x-12 ml-8 mr-8">
            <!-- First Name -->
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Email
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Your Email"
                style="padding-left: 16px"
                v-model="contactInfo.email"
              />
            </div>
  
                   <div class="w-full">
                     <label
                      class=" block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                    >
                      Phone Number
                      <span class="text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex flex-row  ml-3 ">
                     <select v-model="selectedCountryCode" class="h-12 mt-3 w-16  block border-t border-l border-b border-indigo-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="" disabled selected>+251 (ET)</option>
                      <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.code }} ({{ country.name }})</option>
                    </select>
                    <input
                      type="text"
                      class="border border-indigo-800 ml-0 mt-3 -mr-3 w-full border-gray-300  sm:text-sm md:text-base h-12"
                      required
                      placeholder="Enter Your Phone Number"
                      style="padding-left: 16px"
                      v-model="phoneNumber"
                    />
                    </div>
                     </div>
            <!-- <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Phone Number
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="phonenumber"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter your phone number"
                style="padding-left: 16px"
                v-model="contactInfo.phoneNumber"
              />
            </div> -->
          </div>
  
          <div class="flex flex-col lg:flex-row lg:space-x-12 ml-8 mr-8 mt-5">
            <!-- First Name -->
  
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                username
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="Enter Your Zone"
                style="padding-left: 16px"
                v-model="username"
              />
            </div>
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Password
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                class="border border-indigo-800 ml-3 mt-3  w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="***********"
                style="padding-left: 16px"
                v-model="password"
              />
            </div>
          </div>
  
          <div class="flex flex-col lg:flex-row lg:space-x-12 ml-8 mr-8 mt-5">
            <div class="w-full">
              <label
                class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
              >
                Confirm Password
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                class="border border-indigo-800 ml-3 mt-3  w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                required
                placeholder="***********"
                style="padding-left: 16px"
                v-model="confirmPassword"
              />
            </div>
  
            <div class="w-full">
              <div class="flex flex-col sm:flex-row justify-between items-center">
                <h1 class="mt-10 mb-5 ml-5 text-indigo-800 font-extrabold">
                  Family Members Detail
                </h1>
                <div class="flex mt-16 mb-5 mr-5 sm:mt-0 sm:mb-0">
                  <button
                    @click="addFamilyMembers()"
                    class="mt-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-3"
                  >
                    <i class="fas fa-plus"></i> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div v-if="currentStep === 4" class="mt-3">
          <div class="flex flex-col sm:flex-row justify-between items-center">
            <h1 class="mt-5 mb-5 ml-5 text-indigo-800 font-extrabold">
              Family Members Detail
            </h1>
          </div>
  
          <div v-if="addFamily">
            <div class="flex flex-col lg:flex-row lg:space-x-12 ml-8 mr-8">
              <!-- First Name -->
  
              <div class="w-full">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  First Name
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                  required
                  placeholder="Enter First Name"
                  style="padding-left: 16px"
                  v-model="familyMembers.firstName"
                />
              </div>
              <div class="w-full">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  middle Name
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                  required
                  placeholder="Enter Middle Name"
                  style="padding-left: 16px"
                  v-model="familyMembers.middleName"
                />
              </div>
            </div>
  
            <div class="flex flex-col lg:flex-row lg:space-x-12 ml-8 mr-8 mt-5">
              <!-- First Name -->
  
              <div class="w-full">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Last Name
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                  required
                  placeholder="Enter Last Name"
                  style="padding-left: 16px"
                  v-model="familyMembers.lastName"
                />
              </div>
  
              <div class="w-full">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Gender
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <select
                  class="ml-3 border border-indigo-800 w-full border-indigo-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base h-12"
                  required
                  style="padding-left: 16px"
                  v-model="familyMembers.gender"
                >
                  <option value="" disabled selected>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div
              class="flex flex-col lg:flex-row lg:space-x-12 ml-8 mr-8 mt-5 mb-5"
            >
              <!-- First Name -->
  
              <div class="w-full">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Relation Ship
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                  required
                  placeholder="Enter Relation Ship"
                  style="padding-left: 16px"
                  v-model="familyMembers.relationShip"
                />
              </div>
              <div class="w-full">
                <label
                  class="block text-sm font-medium text-gray-700 sm:text-base md:text-lg"
                >
                  Phone Number
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  class="border border-indigo-800 ml-3 mt-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-teal-500 sm:text-sm md:text-base h-12"
                  required
                  placeholder="Enter Your Phone Number"
                  style="padding-left: 16px"
                  v-model="familyMembers.phoneNumber"
                />
              </div>
            </div>
          </div>
        </div>
  
        <div class="ml-3 mb-5 -mt-8">
          <div v-if="currentStep === 1 || currentStep === 2" class="ml-8 mr-8">
            <button
              @click="currentStepIncriment"
              class="w-full bg-indigo-700 text-white font-semibold py-2 rounded mt-8"
            >
              Next
            </button>
          </div>
  
          <div v-if="currentStep === 3 || currentStep === 4" class="ml-8 mr-8">
            <button
              @click="register()"
              class="w-full bg-indigo-700 text-white font-semibold py-2 rounded mt-16"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
      <!-- Additional Fields (hidden by default) -->
      <!-- <div id="additionalFields" class=" mt-6">
       Back Icon -->
      <!-- <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2 text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        <span class="text-gray-500">Back</span>
      </div> -->
  
      <!-- Gender -->
      <!-- <div class="relative mt-4">
        <input id="gender" type="text" class="w-full px-4 py-2 h-12 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-indigo-500 pl-10">
        <label for="gender" class="absolute top-2 left-4 transition-all pointer-events-none text-gray-500">Gender</label>
        <span class="absolute top-2 left-2 text-red-500">*</span>
      </div> -->
  
      <!-- Marital Status -->
      <!-- <div class="relative mt-4">
        <input id="maritalStatus" type="text" class="w-full px-4 py-2 h-12 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-indigo-500 pl-10">
        <label for="maritalStatus" class="absolute top-2 left-4 transition-all pointer-events-none text-gray-500">Marital Status</label>
        <span class="absolute top-2 left-2 text-red-500">*</span>
      </div>
    </div>  -->
    </div>
  </template>
  
  <script>
  //import Phone from './phone.vue';
  import axios from "axios";
  export default {
    components: {
      //Phone
    },
    data() {
      return {
        selectedCountryCode: '', // stores the selected country code
        phoneNumber: '', // stores the phone number
        countries: [
        
          { code: '+93', name: 'Afghanistan' },
          { code: '+355', name: 'Albania' },
          { code: '+213', name: 'Algeria' },
          { code: '+376', name: 'Andorra' },
          { code: '+244', name: 'Angola' },
          // Add more countries starting with A to C here
          { code: '+61', name: 'Australia' },
          { code: '+43', name: 'Austria' },
          { code: '+994', name: 'Azerbaijan' },
          { code: '+1242', name: 'Bahamas' },
          { code: '+973', name: 'Bahrain' },
          { code: '+880', name: 'Bangladesh' },
          { code: '+1246', name: 'Barbados' },
          { code: '+375', name: 'Belarus' },
          { code: '+32', name: 'Belgium' },
          { code: '+501', name: 'Belize' },
          { code: '+229', name: 'Benin' },
          { code: '+1441', name: 'Bermuda' },
          { code: '+975', name: 'Bhutan' },
          { code: '+591', name: 'Bolivia' },
          { code: '+387', name: 'Bosnia and Herzegovina' },
          { code: '+267', name: 'Botswana' },
          { code: '+55', name: 'Brazil' },
          { code: '+246', name: 'British Indian Ocean Territory' },
          { code: '+1284', name: 'British Virgin Islands' },
          { code: '+673', name: 'Brunei' },
          { code: '+359', name: 'Bulgaria' },
          { code: '+226', name: 'Burkina Faso' },
          { code: '+257', name: 'Burundi' },
          { code: '+855', name: 'Cambodia' },
          { code: '+237', name: 'Cameroon' },
          { code: '+1', name: 'Canada' },
          { code: '+238', name: 'Cape Verde' },
          { code: '+599', name: 'Caribbean Netherlands' },
          { code: '+1345', name: 'Cayman Islands' },
          { code: '+236', name: 'Central African Republic' },
          { code: '+235', name: 'Chad' },
          { code: '+56', name: 'Chile' },
          { code: '+86', name: 'China' },
          { code: '+57', name: 'Colombia' },
          { code: '+269', name: 'Comoros' },
          { code: '+243', name: 'Congo (DRC)' },
          { code: '+242', name: 'Congo (Republic)' },
          { code: '+682', name: 'Cook Islands' },
          { code: '+506', name: 'Costa Rica' },
          // Add more countries here
        ],
        
        firstNameIsRequired:true,
        middleNameIsRequired:true,
        lastNameIsRequired:true,
  
        imageFile:'',
        addFamily: false,
        skipFamily: false,
        isFocused: false,
        isGenderSelected: false,
        currentStep: 1,
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
        years: [],
        username: "",
        password: "",
        confirmPassword: "",
        name: {
          firstName: "",
          middleName: "",
          lastName: "",
        },
        address: {
          country: "",
          state: "",
          zone: "",
          wereda: "",
          kebelle: "",
          city: "",
        },
        contactInfo: {
          email: "",
          phoneNumber: "",
        },
        dateOfBirth:'',
        age: "",
        gender: "",
        selectedGender: "",
        bank_account: "",
        profession: "",
        martialStatus: "",
        familyMembers: {
          firstName: "",
          middleName: "",
          lastName: "",
          profession: "",
          martialStatus: "",
          gender: "",
          relationShip: "",
          phoneNumber: "",
        },
      };
    },
    mounted() {
      this.years = this.generateYearsArray(1914, 100).concat(
        this.generateYearsArray(2024, 100)
      );
    },
    created() {
      this.apiClient = axios.create({
        baseURL: "http://localhost:8081", // Set your base URL here
      });
    },
    methods: {
      handleFileInput() {
        const fileInput = this.$refs.fileInput;
        if (fileInput && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          this.imageFile=file;
          // Rest of your code to handle the file
        }
      },
      addFamilyMembers() {
        this.addFamily = true;
        this.currentStepIncriment();
      },
      skipFamilyMembers() {
        this.skipFamily = true;
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
      onBackIconClick() {
        // Handle back icon click
        console.log("Back icon clicked");
      },
      currentStepIncriment() {
        if (this.currentStep <= 3) {
          this.currentStep++;
        }
  
        //alert(this.counter);
      },
      previousPage() {
        this.currentStep--;
      },
  
      generateYearsArray(startYear, numYears) {
        const years = [];
        for (let i = 0; i < numYears; i++) {
          years.push(startYear + i);
        }
        return years;
      },
  
      register() {
        // const fileInput = this.$refs.fileInput;
        // console.log("Fileinput",fileInput);
        // const file = fileInput.files[0];
        if(this.firstName===null){
          this.firstNameIsRequired=true;
          return;
        }
        if(this.middleName===null){
          this.middleNameIsRequired=true;
          return;
        }
        if(this.lastName===null){
          this.lastNameIsRequired=true;
          return;
        }
        if (this.password !== this.confirmPassword) {
          console.log(this.password);
          console.log(this.confirmPassword);
          this.passwordMismatch = true;
          return;
        }
  
    
        
        const formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);
        formData.append("address", JSON.stringify(this.address));
        formData.append("name", JSON.stringify(this.name));
        formData.append("dateOfBirth", JSON.stringify(this.dateOfBirth));
        formData.append("gender", this.gender);
        formData.append("age", this.age);
        formData.append("profession", this.profession);
        formData.append("martialStatus", this.martialStatus);
        formData.append("contactInfo", JSON.stringify(this.contactInfo));
        formData.append("bank_account", this.bank_account);
  
        formData.append("familyMembers", JSON.stringify(this.familyMembers));
        formData.append("image", this.imageFile);
  
        console.log("form data",formData);
  
        const userData = {
          username: this.username,
          password: this.password,
          address: this.address,
          name: this.name,
          dateOfBirth: this.dateOfBirth,
          gender: this.gender,
          contactInfo: this.contactInfo,
          bank_account: this.bank_account,
          profession: this.profession,
          famillyMembers: this.familyMembers,
          martialStatus: this.martialStatus,
          age: this.age,
        };
        console.log("The user data is", userData);
  
        // const usernameValue = formData.get('username');
        // console.log("username.form=",usernameValue);
  
        this.apiClient
          .post("/blogs", formData)
          .then((response) => {
            console.log("response", response);
            // const { roles, accessToken, id } = response.data;
            if (response.data.status === 1) {
              console.log("succssfully registered");
            } else {
              console.log("either email or username  is taken");
              this.UsernameEmailTaken = true;
            }
          })
          .catch((error) => {
            if (error.response) {
              // The server responded with an error status code (e.g., 4xx or 5xx)
              const statusCode = error.response.status;
              const responseData = error.response.data;
  
              if (statusCode === 500) {
                // Internal server error
                console.log("Internal server error:", responseData.error);
                // Handle the error accordingly
              } else if (statusCode === 400) {
                // Bad request error
                console.log("Bad request error:", responseData.error);
                // Handle the error accordingly
              } else {
                // Other types of errors
                console.log("Unknown error:", responseData.error);
                // Handle the error accordingly
              }
            } else if (error.request) {
              // The request was made, but no response was received
              console.log("Network error:", error.request);
              // Handle the error accordingly
            } else {
              // Other types of errors
              console.log("Unknown error:", error.message);
              // Handle the error accordingly
            }
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
  <!-- <template>
      <div style="margin-top: 100px;">
        <h1 class="text-2xl font-bold mb-4">Blogs</h1>
        <div v-for="(blog, index) in visibleBlogs" :key="index" class="bg-white shadow-lg rounded-lg p-6 mb-4">
          <h2 class="text-xl font-bold mb-2">{{ blog.title }}</h2>
          <p class="text-gray-600">{{ blog.description }}</p>
        </div>
        <button v-if="shouldShowLoadMoreButton" @click="loadMore" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
          Load More
        </button>
      </div>
    </template>
    
    <script>
    //import axios from 'axios';
    
    export default {
      data() {
        return {
       blogs: [
        {
          title: "Blog 1",
          description: "Description for Blog 1"
        },
        {
          title: "Blog 2",
          description: "Description for Blog 2"
        },
        {
          title: "Blog 3",
          description: "Description for Blog 3"
        },
        {
          title: "Blog 4",
          description: "Description for Blog 4"
        },
        {
          title: "Blog 5",
          description: "Description for Blog 5"
        },
        {
          title: "Blog 6",
          description: "Description for Blog 6"
        },
        {
          title: "Blog 7",
          description: "Description for Blog 7"
        },
        {
          title: "Blog 8",
          description: "Description for Blog 8"
        },
        {
          title: "Blog 9",
          description: "Description for Blog 9"
        },
        {
          title: "Blog 10",
          description: "Description for Blog 10"
        },
        {
          title: "Blog 1",
          description: "Description for Blog 1"
        },
        {
          title: "Blog 2",
          description: "Description for Blog 2"
        },
        {
          title: "Blog 3",
          description: "Description for Blog 3"
        },
        {
          title: "Blog 4",
          description: "Description for Blog 4"
        },
        {
          title: "Blog 5",
          description: "Description for Blog 5"
        },
        {
          title: "Blog 6",
          description: "Description for Blog 6"
        },
        {
          title: "Blog 7",
          description: "Description for Blog 7"
        },
        {
          title: "Blog 8",
          description: "Description for Blog 8"
        },
        {
          title: "Blog 9",
          description: "Description for Blog 9"
        },
        {
          title: "Blog 10",
          description: "Description for Blog 10"
        },
        {
          title: "Blog 1",
          description: "Description for Blog 1"
        },
        {
          title: "Blog 2",
          description: "Description for Blog 2"
        },
        {
          title: "Blog 3",
          description: "Description for Blog 3"
        },
        {
          title: "Blog 4",
          description: "Description for Blog 4"
        },
        {
          title: "Blog 5",
          description: "Description for Blog 5"
        },
        {
          title: "Blog 6",
          description: "Description for Blog 6"
        },
        {
          title: "Blog 7",
          description: "Description for Blog 7"
        },
        {
          title: "Blog 8",
          description: "Description for Blog 8"
        },
        {
          title: "Blog 9",
          description: "Description for Blog 9"
        },
        {
          title: "Blog 10",
          description: "Description for Blog 10"
        }
        // Add more blog objects as needed
      ], // Array to store all blogs
          visibleBlogs: [], // Array to store the currently visible blogs
          blogsPerPage: 5, // Number of blogs to display per page
          currentPage: 1 // Current page of blogs
        };
      },
      created() {
        // Fetch blogs from the server
      //   axios.get('/api/blogs')
      //     .then(response => {
      //       this.blogs = response.data;
      //       this.loadMore(); // Load initial set of blogs
      //     })
      //     .catch(error => {
      //       console.error(error);
      //     });
      this.loadMore();
      },
      methods: {
        loadMore() {
          const startIndex = (this.currentPage - 1) * this.blogsPerPage;
          const endIndex = startIndex + this.blogsPerPage;
          this.visibleBlogs = this.blogs.slice(0, endIndex);
          this.currentPage++;
        }
      },
      computed: {
        shouldShowLoadMoreButton() {
          return this.visibleBlogs.length < this.blogs.length;
        }
      }
    };
    </script>
    
    <style>
    /* Add Tailwind CSS classes or custom styles if needed */
    </style> -->
  