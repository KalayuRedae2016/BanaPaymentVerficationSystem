<template>
  <div>
    <LoadingSpinner :visible="isLoading" />
    <Toast ref="toast" />
    <div class="container flex-col bg-white">
      <div class="flex flex-row">
        <h2 class="text-md font-bold text-blue-500 mt-3 ml-4">
          {{ $t("Edit Company Setting") }}
        </h2>
      </div>

      <div class="flex flex-wrap mx-auto pb-8 border-t border-blue-500 mt-4 p-4">
        <div v-if="!closepaymentCreated" class="w-full border border-gray-300 rounded-lg">
          <div class="mx-3">
            <form class="mt-8">
              <div class="flex flex-col">
                <label class="custom-label mb-5 font-bold text-lg">
                  {{ $t("Company Profile") }}
                </label>
                <div class="flex flex-col md:flex-row md:space-x-5 p-4 border border-gray-300 rounded-lg ">

                  <div class="flex flex-col md:w-1/2">



                    <div class="mb-4">
                      <label class="custom-label">
                        {{ $t("compName") }}
                        <span class="custom-star ml-1">*</span>
                      </label>

                      <input type="text" id="companyName" class="custom-input ml-3 text-xs text-gray-500"
                        v-model="companyName" placeholder="Company Name" />
                    </div>

                    <div class="mb-4">
                      <label class="custom-label ">
                        {{ $t("Company Email") }}
                        <span class="custom-star ml-1 ">*</span>
                      </label>

                      <input type="text" id="companyEmail" class="custom-input ml-3 text-xs text-gray-500"
                        v-model="companyEmail" placeholder="Email" />
                    </div>

                    <div class="mb-4">
                      <label class="custom-label">
                        {{ $t("companyPhoneNumber") }}
                        <span class="custom-star ml-1">*</span>
                      </label>

                      <input type="text" id="companyPhoneNumber" class="custom-input ml-3 text-xs text-gray-500"
                        v-model="companyPhoneNumber" placeholder="Phone Number" />
                    </div>

                  </div>

                  <div class="flex flex-col md:w-1/2">
                    <div class="mb-4">
                      <label class="custom-label">
                        {{ $t("Company PrefixCode") }}
                        <span class="custom-star ml-1">*</span>
                      </label>
                      <input type="text" id="companyPrefixCode" class="custom-input ml-3 text-xs text-gray-500"
                        v-model="companyPrefixCode" placeholder="Prefix Code" />
                    </div>
                    <div class="mb-4">
                      <label class="custom-label">
                        {{ $t("compAddress") }}
                        <span class="custom-star ml-1">*</span>
                      </label>

                      <input type="text" id="companyAddress" class="custom-input ml-3 text-xs text-gray-500"
                        v-model="companyAddress" placeholder="Address" />
                    </div>
                    <Button class="custom-button w-32 ml-5" @click.prevent="seeChange()"> <i class="fa fa-save"></i>
                      Save</Button>
                  </div>
                </div>
              </div>

              <hr class=" border border-gray-300 w-full my-5">

              <div class="rounded-lg py-3 mt-5">
                <label class="custom-label mb-5 text-lg font-bold"> {{ $t("blockAccounts") }} </label>
                <div class="border border-gray-300 overflow-x-auto">
                  <table class="w-full border-b border-gray-300">
                    <thead>
                      <tr class="bg-gray-200">
                        <th class="w-24 p-3 text-sm tracking-wide text-left text-indigo-800">
                          {{ $t("bankType") }}
                        </th>
                        <th class="w-32 p-3 text-sm tracking-wide text-left text-indigo-800">
                          {{ $t("bankAccount") }}
                        </th>
                        <th class="w-32 p-3 text-sm tracking-wide text-left text-indigo-800">
                          {{ $t("Actions") }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="account in blockBankAccounts" :key="account._id">
                        <td class="p-3 text-xs text-gray-700 whitespace-nowrap">
                          <i class="fas fa-university mr-3 text-purple-500"></i>
                          <span class="p-1.5 text-xs tracking-wider text-blue-500 rounded-lg bg-blue-50 font-bold">{{
                            account.bankType }}</span>
                        </td>
                        <td class="p-3 text-xs text-gray-400 whitespace-nowrap">
                          {{ account.bankAccountNumber }}
                        </td>

                        <td class="p-3 text-sm whitespace-nowrap">
                          <i @click="editBlockAccountModal(account)" class="fas fa-edit mr-2 text-blue-700"></i>

                          <i @click="confirmDeleteBlockAccount(account)" class="fas fa-trash-alt custom-star"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>


                  <!-- <div
                    v-for="(account, index) in addedBlockBankAccounts"
                    :key="index"
                    class="flex flex-row space-x-3 lg:space-x-0 items-center space-y-3 m-5 md:flex-row md:space-x-5 md:space-y-0"
                  >
                    <div
                      class="flex flex-col lg:flex-row space-y-2 lg:space-y-2 space-x-0 lg:space-x-3"
                    >
                      <select
                        v-model="account.bankType"
                        class="custom-select"
                        @change="trackNewBlockBankType(account.bankType)"
                      >
                        <option value="" disabled>
                          {{ $t("selectBankType") }}
                        </option>

                        <option value="CBE">{{ $t("CBE") }}</option>
                        <option value="WEGAGEN">{{ $t("WEGAGEN") }}</option>
                        <option value="LIB">{{ $t("LIB") }}</option>
                        <option value="DASHEN">{{ $t("DASHEN") }}</option>
                        <option value="OROMIA">{{ $t("OROMIA") }}</option>
                        <option value="ABYSSINIA">{{ $t("ABYSSINIA") }}</option>
                        <option value="other" class="text-indigo-800 font-bold">
                          {{ $t("other") }}
                        </option>
                      </select>
                      <input
                        type="text"
                        v-model="account.bankAccountNumber"
                        :placeholder="$t('bankAccountNumber')"
                        class="custom-input"
                      />
                    </div>

                    <button
                      @click.prevent="removeBlockBankAccount(index)"
                      class="text-pink-500 mb-5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
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
                    </button>
                  </div> -->


              <p class="text-red-500 m-5 text-xs" v-if="blockBankTypeIsRequired">{{ errorMessage }}</p>
              <p class="text-red-500 m-5 text-xs" v-if="blockBankAccountNumberIsRequired">{{ errorMessage }}</p>
              <p class="text-red-500 m-5 text-xs" v-if="blockBankExist">{{ errorMessage }}</p>


                  <div class="mx-5 mb-5">
                    <div class="flex flex-row">
                      <div class="flex flex-row w-full space-x-3 mt-5">
                        <select v-model="blockBankType" class="custom-select" @change="checkOther(blockBankType)">
                          <option value="" disabled>{{ $t("selectBankType") }}</option>
                          <option v-for="(bank, index) in availableBlockBanks" :key="index" :value="bank">{{ bank }}
                          </option>
                          <option value="other">{{ $t("other") }}</option>
                        </select>
                        <input type="text" v-model="blockBankAccountNumber" :placeholder="$t('bankAccountNumber')"
                          class="custom-input" />

                        <button class="custom-button h-10 mt-2 flex items-center justify-center w-full md:w-auto"
                          @click.prevent="pushBlockAccount(blockBankType, blockBankAccountNumber)">
                          <i class="fa fa-save mr-2"></i> Save
                        </button>

                      </div>
                    </div>
                  </div>


                  <!-- 
                  <div class="flex flex-row">
                    <button
                      @click.prevent="addBlockBankAccount()"
                      class="ml-10 mt-3 mb-5 flex items-center justify-center bg-blue-500 text-white rounded-full w-10 h-10 hover:bg-green-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>


                    <button
                      @click.prevent="seeChange()"
                      class="ml-10 mt-3 mb-5 custom-button"
                    >
            
                      <i class="fa fa-save mr-2"></i>Save
                    </button>
                  </div> -->
                </div>
              </div>
              <hr class=" border border-gray-300 w-full my-5">
              <div class="rounded-lg py-3 mt-5">
                <label class="custom-label font-bold text-lg mb-5">
                  {{ $t("serviceAccounts") }}
                </label>

                <div class="border border-gray-300 overflow-x-auto">
                  <table class="w-full border-b border-gray-300">
                    <thead>
                      <tr class="bg-gray-200">
                        <th class="w-24 p-3 text-sm tracking-wide text-left text-indigo-800">
                          {{ $t("bankType") }}
                        </th>
                        <th class="w-32 p-3 text-sm tracking-wide text-left text-indigo-800">
                          {{ $t("bankAccountNumber") }}
                        </th>
                        <th class="w-32 p-3 text-sm tracking-wide text-left text-indigo-800">
                          {{ $t("detail") }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="account in serviceBankAccounts" :key="account._id">
                        <td class="p-3 text-xs text-gray-700 whitespace-nowrap">
                          <i class="fas fa-university mr-3 text-purple-500"></i>
                          <span class="p-1.5 text-xs tracking-wider text-blue-500 rounded-lg bg-blue-50 font-bold">{{
                            account.bankType }}</span>
                        </td>
                        <td class="p-3 text-xs text-gray-400 whitespace-nowrap">
                          {{ account.bankAccountNumber }}
                        </td>

                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <i @click="editServiceAccountModal(account)" class="fas fa-edit mr-2 text-blue-500"></i>
                          <i @click="confirmDeleteServiceAccount(account)" class="fas fa-trash-alt custom-star">
                          </i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- <div
                    v-for="(account, index) in addedServiceBankAccounts"
                    :key="index"
                    class="flex flex-row space-x-2 items-center space-y-5 m-5 md:flex-row md:space-y-0"
                  >
                    <div
                      class="flex flex-col lg:flex-row space-y-2 lg:space-y-2"
                    >
                      <select
                        v-model="account.bankType"
                        class="custom-select"
                        @change="trackNewServiceBankType(account.bankType)"
                      >
                        <option value="" disabled>
                          {{ $t("selectBankType") }}
                        </option>
                        <option value="CBE">{{ $t("CBE") }}</option>
                        <option value="WEGAGEN">{{ $t("WEGAGEN") }}</option>
                        <option value="LIB">{{ $t("LIB") }}</option>
                        <option value="DASHEN">{{ $t("DASHEN") }}</option>
                        <option value="OROMIA">{{ $t("OROMIA") }}</option>
                        <option value="ABYSSINIA">{{ $t("ABYSSINIA") }}</option>
                        <option value="other" class="text-indigo-800 font-bold">
                          {{ $t("other") }}
                        </option>
                      </select>

                      <input
                        type="text"
                        v-model="account.bankAccountNumber"
                        :placeholder="$t('bankAccountNumber')"
                        class="custom-input ml-0 lg:ml-5"
                      />
                    </div>
                    <button
                      @click.prevent="removeServiceBankAccount(index)"
                      class="text-pink-500 mb-5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
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
                    </button>
                  </div> -->
                  <p class="text-red-500 m-5 text-xs " v-if="serviceBankTypeIsRequired">{{ errorMessage }}</p>
                  <p class="text-red-500 m-5 text-xs" v-if="serviceBankAccountNumberIsRequired">{{ errorMessage }}</p>
                  <p class="text-red-500 m-5 text-xs" v-if="serviceBankExist">{{ errorMessage }}</p>

                  <div class="mx-5 mb-5">
                    <div class="flex flex-row">
                      <div class="flex flex-row w-full space-x-3 mt-5">
                        <select v-model="serviceBankType" class="custom-select"
                          @change="checkOtherService(serviceBankType)">
                          <option value="" disabled>{{ $t("selectBankType") }}</option>
                          <option v-for="(bank, index) in availableServiceBanks" :key="index" :value="bank">{{ bank }}
                          </option>
                          <option value="other" class="mb-96">{{ $t("other") }}</option>
                        </select>
                        <input type="text" v-model="serviceBankAccountNumber" :placeholder="$t('bankAccountNumber')"
                          class="custom-input" />

                        <button class="custom-button h-10 mt-2 flex items-center justify-center w-full md:w-auto"
                          @click.prevent="pushServiceAccount(serviceBankType, serviceBankAccountNumber)">
                          <i class="fa fa-save mr-2"></i> Save
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="flex flex-row">
                    <button
                      @click.prevent="addServiceBankAccount()"
                      class="ml-10 mt-3 mb-5 flex items-center justify-center bg-blue-500 text-white rounded-full w-10 h-10 hover:bg-green-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                    <button
                      @click.prevent="seeChange()"
                      class="ml-10 mt-3 mb-5 custom-button"
                    >
            
                      <i class="fa fa-save mr-2"></i>Save
                    </button>
                  </div> -->
                </div>


              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showEditBlockModal">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div class="bg-white rounded-lg p-6 border border-cyan-500 px-5">
            <div class="flex flex-row">
              <div><label class="custom-label text-lg font-bold">{{ $t("editBlockAccount") }}</label></div>
              <div class="ml-20 lg:ml-64">
                <svg @click="showEditBlockModal = !showEditBlockModal"
                  class="w-6 h-6 custom-star hover:text-red-700 transition-colors duration-300 cursor-pointer"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <hr class="my-4 md:min-w-full bg-red-500" />

            <div class="">
              <form class="px-5 py-5">
                <div class="mb-4">
                  <label class="custom-label">
                    {{ $t("bankType") }}

                    <span class="custom-star ml-1">*</span>
                  </label>

                  <input type="text"
                   v-model="editedBlockAccount.bankType" 
                   class="custom-input"
                   readonly/>
                </div>

                <div class="mb-4">
                  <label class="custom-label ">
                    {{ $t("bankAccount") }}
                    <span class="custom-star ml-1">*</span>
                  </label>

                  <input type="text" class="custom-input" v-model="editedBlockAccount.bankAccountNumber"
                    placeholder="Bank Account" />
                </div>
                <button @click="saveEditedBlockAccount" type="submit" class="custom-button">
                  <i class="fas fa-save">
                  </i>
                  Save
                </button>
              </form>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>


    </div>

    <div v-if="showEditServiceModal">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="flex flex-row">
              <div><label class="custom-label font-bold text-lg">{{ $t("editServiceAccount") }}</label></div>
              <div class="ml-16 lg:ml-64">
                <svg @click="showEditServiceModal = !showEditServiceModal"
                  class="w-6 h-6 custom-star hover:text-red-700 transition-colors duration-300 cursor-pointer"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <hr class="my-4 md:min-w-full bg-red-500" />

            <div class="">
              <form class="px-5 py-5">
                <div class="mb-4">
                  <label class="custom-label">
                    {{ $t("bankType") }}
                    <span class="custom-star ml-1">*</span>
                  </label>
                  <input type="text"
                    v-model="editedServiceAccount.bankType"
                    readonly
                    class="custom-input"
                  >
                </div>

                <div class="mb-4">
                  <label class="custom-label">
                    {{ $t("bankAccountNumber") }}
                    <span class="custom-star ml-1">*</span>
                  </label>

                  <input type="text" class="custom-input" v-model="editedServiceAccount.bankAccountNumber"
                    placeholder="Bank Account" />
                </div>
                <button @click="saveEditedServiceAccount" type="submit" class="custom-button">
                  <i class="fas fa-save">
                  </i>
                  Save Changes
                </button>
              </form>
            </div>

            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>

    <div v-if="otherBlockSelected">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-25">
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 ">
                <div class="flex flex-row space-x-16 lg:space-x-64">
                  <h1 class="mb-5 text-indigo-800 text-md font-bold">
                    {{ $t("addBlockAccount") }}
                  </h1>
                  <svg @click="otherBlockSelected = !otherBlockSelected; blockBankType = ''"
                    class="w-8 h-10 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <form action="" class="">
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankName") }}
                    </label>
                    <input class="custom-input" id="bank-name" type="text" :placeholder="$t('bankType')"
                      v-model="newBlockBankType" />
                  </div>
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankAccountNumber") }}
                    </label>
                    <input class="custom-input" id="comp-name" type="text" :placeholder="$t('bankAccountNumber')"
                      v-model="newBlockBankAccountNumber" />
                  </div>


                  <p v-if="newBlockBankExist" class="text-red-500 my-3 my-3">Bank is already exist</p>
                  <p v-if="newBlockBankTypeIsRequired" class="text-red-500 my-3 text-xs">{{ errorMessage }}</p>
                  <p v-if="newBlockBankAccountNumberIsRequired" class="text-red-500 my-3 text-xs">{{ errorMessage }}</p>


                  <button @click.prevent="pushNewBlockAccount(newBlockBankType, newBlockBankAccountNumber)"
                    class="custom-button bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2">
                    <i class="fa fa-plus"></i>
                    <span>{{ $t("add") }}</span>
                  </button>
                </form>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
    <div v-if="otherServiceSelected">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-25">
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 ">
                <div class="flex flex-row space-x-16 lg:space-x-64">
                  <h1 class="mb-5 text-indigo-800 text-md font-bold">
                    {{ $t("addServiceAccount") }}
                  </h1>
                  <svg @click="otherServiceSelected = !otherServiceSelected; serviceBankType = ''"
                    class="w-8 h-10 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <form action="" class="">
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankName") }}
                    </label>
                    <input class="custom-input" id="bank-name" type="text" :placeholder="$t('bankType')"
                      v-model="newServiceBankType" />
                  </div>
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankAccountNumber") }}
                    </label>
                    <input class="custom-input" id="comp-name" type="text" :placeholder="$t('bankAccountNumber')"
                      v-model="newServiceBankAccountNumber" />
                  </div>


                  <p v-if="newServiceBankExist" class="text-red-500 my-3 my-3">Bank is already exist</p>
                  <p v-if="newServiceBankTypeIsRequired" class="text-red-500 my-3 text-xs">{{ errorMessage }}</p>
                  <p v-if="newServiceBankAccountNumberIsRequired" class="text-red-500 my-3 text-xs">{{ errorMessage }}
                  </p>


                  <button @click.prevent="pushNewServiceAccount(newServiceBankType, newServiceBankAccountNumber)"
                    class="custom-button bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2">
                    <i class="fa fa-plus"></i>
                    <span>{{ $t("add") }}</span>
                  </button>
                </form>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>


    <div v-if="showConfirmationBlockModal">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div class="bg-white rounded-lg p-6 border border-cyan-500 px-4">
            <div class="fixed inset-0 flex items-center justify-center z-50 ">
              <div class="bg-white rounded-lg shadow-lg p-8 ">
                <div class="flex items-center justify-center mb-10 w-64 lg:w-96">
                  <h2 class="text-md font-bold text-pink-800">
                    {{ $t("confirmDeleteBlockAccount") }}
                  </h2>
                </div>
                <button @click="deleteBlockAccount" class="bg-red-500 text-white px-4 py-2 rounded-md">
                  {{ $t("delete") }}
                </button>
                <button @click="cancelDeleteBlockAccount" class="bg-gray-400 text-white px-4 py-2 rounded-md ml-2">
                  {{ $t("cancel") }}
                </button>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showConfirmationServiceModal">
      <transition name="fade" mode="out-in">
        <div class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 w-64 lg:w-96">
                <div class="flex items-center justify-center mb-10">
                  <h2 class="text-md font-bold text-pink-800">
                    {{ $t("confirmDeleteServiceAccount") }}
                  </h2>
                </div>

                <button @click="deleteServiceAccount" class="bg-red-500 text-white px-4 py-2 rounded-md">
                  {{ $t("delete") }}
                </button>
                <button @click="cancelDeleteServiceAccount" class="bg-gray-400 text-white px-4 py-2 rounded-md ml-2">
                  {{ $t("cancel") }}
                </button>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Toast from '../../Common/Toast.vue'
import LoadingSpinner from '../../Common/LoadingSpinner.vue';
export default {
  components: {
    Toast,
    LoadingSpinner
  },
  name: "paymentsView",
  data() {
    return {
      //start status for block
      blockBankTypeIsRequired: false,
      blockBankAccountNumberIsRequired: false,
      newBlockBankTypeIsRequired: false,
      newBlockBankAccountNumberIsRequired: false,
      otherBlockSelected: false,
      blockBankExist: false,
      newBlockBankExist: false,
      showOtherForm: false,

      //end of status for block


      //start for service
      serviceBankTypeIsRequired: false,
      serviceBankAccountNumberIsRequired: false,
      newServiceBankTypeIsRequired: false,
      newServiceBankAccountNumberIsRequired: false,
      otherServiceSelected: false,
      serviceBankExist: false,
      newServiceBankExist: false,
      showOtherServiceForm: false,
      //end status for service


      blockBankType: "",
      blockBankAccountNumber: "",
      newBlockBankType: '',
      newBlockBankAccountNumber: "",

      serviceBankType: "",
      serviceBankAccountNumber: "",
      newServiceBankType: '',
      newServiceBankAccountNumber: "",
      availableBlockBanks: [
        'CBE', 'LIB', 'WEGAGEN', 'HBRET', 'OROMIA', 'DASHEN', 'SNKE', 'ENAT', 'AHADU', 'AWASH'
      ],
      availableServiceBanks: [
        'CBE', 'LIB', 'WEGAGEN', 'HBRET', 'OROMIA', 'DASHEN', 'SNKE', 'ENAT', 'AHADU', 'AWASH'
      ],

      successToastMessage: "",
      errorToastMessage: "",
      showErrorToast: false,
      showSuccessToast: false,
      newBlockBankType: "",
      newBlockBankAccountNumber: "",

      newServiceBankType: "",
      newServiceBankAccountNumber: "",

      otherBlockSelected: false,
      otherServiceSelected: false,

      showError: false,

      warningMessage: "",
      errorMessage: "",
      editSuccess: false,
      deleteSuccess: false,

      companyProfile: {
        companyName: "Bana MOLE",
        companyPhoneNumber: "0967740501",
        companyEmail: "bana@gmail.com",
        companyAddress: "Mekelle",
        companyPrefixCode: "BM",
        blockBankAccounts: [
          { bankAccountNumber: "CBE", bankType: "100050045673004" },
        ],
        serviceBankAccounts: [
          { bankAccountNumber: "CBE", bankType: "1000020046792400" },
        ],
      },
      showConfirmationBlockModal: false,
      showEditBlockModal: false,
      blockAccountToDelete: null,

      showConfirmationServiceModal: false,
      showEditServiceModal: false,

      addBlockAccount: false,
      addServiceAccount: false,

      companyProfileId: "",
      companyProfile: "",
      companyName: "",
      companyPhoneNumber: "",
      companyEmail: "",
      companyPrefixCode: "",

      blockBankAccounts: [

      ],
      addedBlockBankAccounts: [{ bankAccountNumber: "", bankType: "" }],

      serviceBankAccounts: [

      ],
      addedServiceBankAccounts: [{ bankAccountNumber: "", bankType: "" }],

      editedBlockAccount: {},
      editedServiceAccount: {},
    };
  },
  mounted() {
    this.$store.dispatch("commitActiveItem", { activeItem: 'companyProfile' });
    this.isLoading = true;
    this.$apiGet("/api/v1/organization")
      .then((response) => {
        console.log("get the org to be edited   ", response);
        if (response.organization.length != 0) {
          /// alert("hhh")


          this.isLoading = false;

          this.companyProfileId = response.organization._id;
          this.companyName = response.organization.companyName;
          this.companyPhoneNumber = response.organization.companyPhoneNumber;
          this.companyEmail = response.organization.companyEmail;
          this.companyAddress = response.organization.companyAddress;
          this.companyPrefixCode = response.organization.companyPrefixCode;
          this.blockBankAccounts = response.organization.blockBankAccounts;
          this.serviceBankAccounts =response.organization.serviceBankAccounts;


          console.log("company Name", response.organization.companyName);
          this.companyProfile = response;
          console.log("block accounts", this.blockBankAccounts);
          console.log("service accounts", this.serviceBankAccounts);
        } else {
          this.$router.push("/admindashboard/display-companey")
        }
      })
      .catch((error) => {
        console.log("Error fwtching", error);
      });
  },
  methods: {
    pushServiceAccount(serviceBankType, serviceBankAccountNumber) {
      this.serviceBankTypeIsRequired = false;
      this.serviceBankAccountNumberIsRequired = false;
      this.serviceBankExist = false;
      this.showError = false;
      this.errorMessage = "";


      if (!serviceBankType) {
        this.serviceBankTypeIsRequired = true;
        this.errorMessage = "Please Select a Service Bank Type"
        return;
      }


      if (!serviceBankAccountNumber) {
        this.serviceBankAccountNumberIsRequired = true;
        this.errorMessage = "Service Bank Account Number Is Required";
        return;
      }

      const isBankTypePresent = this.serviceBankAccounts.some(
        (account) => account.bankType === serviceBankType
      );

      if (isBankTypePresent) {
        // Set error message and flag if bank type exists
        this.serviceBankExist = true;
        this.errorMessage = "Bank is already added";
      } else {
        // Add new bank type and reset error state
        this.serviceBankAccounts.push({
          bankType: serviceBankType,
          bankAccountNumber: serviceBankAccountNumber,
        });
        this.showError = false;
        this.errorMessage = "";
       this.seeChange();
      }
    },

    pushNewServiceAccount(serviceBankType, serviceBankAccountNumber) {

      this.newServiceBankTypeIsRequired = false;
      this.newServiceBankAccountNumberIsRequired = false;
      this.newServiceBankExist = false;
      this.errorMessage = "";

      if (!serviceBankType) {
        this.newServiceBankTypeIsRequired = true;
        this.errorMessage = "New Service Bank Type Is Required"
        return;
      }

      if (!serviceBankAccountNumber) {
        this.newServiceBankAccountNumberIsRequired = true;
        this.errorMessage = "New Bank Account Number Is Required";
        return;
      }


      // Check if the bank type already exists
      const isBankTypePresent = this.serviceBankAccounts.some(
        (account) => account.bankType.toLowerCase() === serviceBankType.toLowerCase()
      );


      if (isBankTypePresent) {
        // Set error message and flag if bank type exists
        this.newServiceBankExist = true;
        this.errorMessage = "Bank is already Exist";
      } else {
        // Add new bank type and reset error state
        this.otherServiceSelected = false;
        this.serviceBankAccounts.push({
          bankType: serviceBankType,
          bankAccountNumber: serviceBankAccountNumber,
        });
        this.showError = false;
        this.errorMessage = "";
        this.seeChange();
      }
    },
    checkOtherService(bankType) {
      if (bankType == "other") {
        this.serviceBankType = '',
          this.serviceBankAccountNumber = '',
          this.serviceBankExist = false;
        this.otherServiceSelected = true;
      }
    },

    pushBlockAccount(blockBankType, blockBankAccountNumber) {

      this.blockBankTypeIsRequired = false;
      this.blockBankAccountNumberIsRequired = false;
      this.blockBankExist = false;
      this.showError = false;
      this.errorMessage = "";


      if (!blockBankType) {
        this.blockBankTypeIsRequired = true;
        this.errorMessage = "Please Select a Block Bank Type"
        return;
      }


      if (!blockBankAccountNumber) {
        this.blockBankAccountNumberIsRequired = true;
        this.errorMessage = "Block Bank Account Number Is Required";
        return;
      }




      const isBankTypePresent = this.blockBankAccounts.some(
        (account) => account.bankType === blockBankType
      );

      if (isBankTypePresent) {
        // Set error message and flag if bank type exists
        this.blockBankExist = true;
        this.errorMessage = "Bank is already added";
      } else {
        // Add new bank type and reset error state
        this.blockBankAccounts.push({
          bankType: blockBankType,
          bankAccountNumber: blockBankAccountNumber,
        });
        this.showError = false;
        this.errorMessage = "";
        this.seeChange();

      }
    },

    pushNewBlockAccount(blockBankType, blockBankAccountNumber) {

      this.newBlockBankTypeIsRequired = false;
      this.newBlockBankAccountNumberIsRequired = false;
      this.newBlockBankExist = false;
      this.errorMessage = "";


      if (!blockBankType) {
        this.newBlockBankTypeIsRequired = true;
        this.errorMessage = "New Block Bank Type Is Required"
        return;
      }

      if (!blockBankAccountNumber) {
        this.newBlockBankAccountNumberIsRequired = true;
        this.errorMessage = "New Bank Account Number Is Required";
        return;
      }


      // Check if the bank type already exists
      const isBankTypePresent = this.blockBankAccounts.some(
        (account) => account.bankType.toLowerCase() === blockBankType.toLowerCase()
      );


      if (isBankTypePresent) {
        // Set error message and flag if bank type exists
        this.newBlockBankExist = true;
        this.errorMessage = "Bank is already Exist";
      } else {
        // Add new bank type and reset error state
        this.otherBlockSelected = false;
        this.blockBankAccounts.push({
          bankType: blockBankType,
          bankAccountNumber: blockBankAccountNumber,
        });
        this.showError = false;
        this.errorMessage = "";
        this.seeChange();
      }
    },

    checkOtherService(bankType) {
      if (bankType == "other") {
        this.serviceBankType = '',
          this.serviceBankAccountNumber = '',
          this.serviceBankExist = false;
        this.otherServiceSelected = true;
      }
    },

    checkOther(bankType) {
      if (bankType == "other") {
        this.blockBankType = '',
          this.blockbBankAccountNumber = '',
          this.blockBankExist = false;
        this.otherBlockSelected = true;
      }
    },
   
    trackNewBlockBankType(account) {
      //console.log("addedblock",account);
      if (account == "other") {
        this.addedBlockBankAccounts.forEach((block) => {
          if ((block.bankType = "account")) {
            // alert("hi this is account");
            this.otherBlockSelected = true;
            block.bankType = "";
          }
        });
      } else {
        this.otherBlockSelected = false;
        this.account.bankType = account;
      }
    },
    trackNewServiceBankType(account) {
      console.log("account is", account);
      if (account == "other") {
        this.addedServiceBankAccounts.forEach((service) => {
          if ((service.bankType = "account")) {
            this.otherServiceSelected = true;
            service.bankType = "";
          }
        });
      } else {
        this.otherServiceSelected = false;
        this.account.bankType = account;
      }
    },


    async saveNewBlockBank() {
      this.otherBlockSelected = false;
      console.log(
        "newbanktype and accoutn ",
        this.newBankType,
        this.newBankAccountNumber
      );
      this.blockBankAccounts.push({
        bankAccountNumber: this.newBlockBankAccountNumber,
        bankType: this.newBlockBankType,
      });

      const companyEditedData = {
        companyName: this.companyName,
        companyPhoneNumber: this.companyPhoneNumber,
        companyEmail: this.companyEmail,
        companyAddress: this.companyAddress,
        companyPrefixCode: this.companyPrefixCode,
        blockBankAccounts: this.blockBankAccounts,
        serviceBankAccounts: this.serviceBankAccounts,
      };

      try {
        await this.$apiPatch(
          '/api/v1/organization/', this.companyProfileId,
          companyEditedData
        )
          .then((response) => {
            console.log("response", response);
            if (Number(response.status) === 1) {
              this.$refs.toast.showSuccessToastMessage(response.message);
              //this.$reloadPage();
          this.companyProfileId = response.organization._id;
          this.companyName = response.organization.companyName;
          this.companyPhoneNumber = response.organization.companyPhoneNumber;
          this.companyEmail = response.organization.companyEmail;
          this.companyAddress = response.organization.companyAddress;
          this.companyPrefixCode = response.organization.companyPrefixCode;
          this.blockBankAccounts = response.organization.blockBankAccounts;
          this.serviceBankAccounts =response.organization.serviceBankAccounts;


            }
          })
      } catch (error) {
        this.$refs.toast.showErrorToastMessage("Something went wrong");
        console.log("Error in the catch", error.status, error.message);
      } finally {
        console.log("Finished finally org fetch")
      };
    },
    async saveNewServiceBank() {
      this.otherServiceSelected = false;
      this.serviceBankAccounts.push({
        bankAccountNumber: this.newServiceBankAccountNumber,
        bankType: this.newServiceBankType,
      });

      const companyEditedData = {
        companyName: this.companyName,
        companyPhoneNumber: this.companyPhoneNumber,
        companyEmail: this.companyEmail,
        companyAddress: this.companyAddress,
        companyPrefixCode: this.companyPrefixCode,
        blockBankAccounts: this.blockBankAccounts,
        serviceBankAccounts: this.serviceBankAccounts,
      };
      console.log("service account: ", this.serviceBankAccounts);
      try {
        await this.$apiPatch(
          '/api/v1/organization', this.companyProfileId,
          companyEditedData
        )
          .then((response) => {
            console.log("response", response);
            if (Number(response.status) === 1) {
              this.$refs.toast.showSuccessToastMessage(response.message);
              this.$reloadPage();
            }
          })
      } catch (error) {
        this.$refs.toast.showErrorToastMessage("Something went wrong");
        console.log("Error in the catch", error.status, error.message);

      } finally {
        console.log("finally save new service account")
      }
    },

    addBlockBankAccount() {
      this.addBlockAccount = true;
      console.log("i am here");

      this.addedBlockBankAccounts.push({
        bankAccountNumber: "",
        bankType: "",
      });
      console.log("old", this.blockBankAccounts);
      console.log("added bank accounts", this.addedBlockBankAccounts);
    },
    editBlockAccountModal(account) {
      /// alert("called");
      // Open the modal and pass the account details
      this.editedBlockAccount = { ...account };
      // Create a copy to prevent direct mutation
      this.showEditBlockModal = true;
    },
    async saveEditedBlockAccount() {
      // Find the index of the edited account in the array
      const index = this.blockBankAccounts.findIndex(
        (account) => account._id === this.editedBlockAccount._id
      );
      if (index !== -1) {
        // Replace the old account with the edited account
        this.blockBankAccounts.splice(index, 1, this.editedBlockAccount);
        // Close the modal
        this.showEditBlockModal = false;
      }
      const companyEditedData = {
        companyName: this.companyName,
        companyPhoneNumber: this.companyPhoneNumber,
        companyEmail: this.companyEmail,
        companyAddress: this.companyAddress,
        companyPrefixCode: this.companyPrefixCode,
        blockBankAccounts: this.blockBankAccounts,
        serviceBankAccounts: this.serviceBankAccounts,
      };

      try {
        await this.$apiPatch(
          '/api/v1/organization', this.companyProfileId,
          companyEditedData
        )
          .then((response) => {
            console.log("response", response);
            if (Number(response.status) === 1) {
           //this.$reloadPage();


          this.companyProfileId = response.organization._id;
          this.companyName = response.organization.companyName;
          this.companyPhoneNumber = response.organization.companyPhoneNumber;
          this.companyEmail = response.organization.companyEmail;
          this.companyAddress = response.organization.companyAddress;
          this.companyPrefixCode = response.organization.companyPrefixCode;
          this.blockBankAccounts = response.organization.blockBankAccounts;
          this.serviceBankAccounts =response.organization.serviceBankAccounts;
          this.$refs.toast.showSuccessToastMessage(response.message);
            }
          })
      } catch (error) {
        this.$refs.toast.showErrorToastMessage("Something went wrong");
        console.log("Error in the catch", error.status, error.message);
      } finally {
        console.log("finally editing bank account block")
      }
    },
    confirmDeleteBlockAccount(account) {
      this.blockAccountToDelete = account;
      this.showConfirmationBlockModal = true;
    },
    async deleteBlockAccount() {

      //alert("Are you sure you want to delete")
      const index = this.blockBankAccounts.findIndex(
        (a) => a._id === this.blockAccountToDelete._id
      );
      if (index !== -1) {
        this.blockBankAccounts.splice(index, 1);
      }
      this.blockAccountToDelete = null;
      this.showConfirmationBlockModal = false;

      const companyEditedData = {
        companyName: this.companyName,
        companyPhoneNumber: this.companyPhoneNumber,
        companyEmail: this.companyEmail,
        companyAddress: this.companyAddress,
        companyPrefixCode: this.companyPrefixCode,
        blockBankAccounts: this.blockBankAccounts,
        serviceBankAccounts: this.serviceBankAccounts,
      };

      try {
        await this.$apiPatch(
          '/api/v1/organization', this.companyProfileId,
          companyEditedData
        )
          .then((response) => {
            console.log("response delete bank block account", response);
            if (Number(response.status) === 1) {
              // this.$refs.toast.showSuccessToastMessage(response.message);
              this.$refs.toast.showSuccessToastMessage("Account Deleted Successfully");
          this.companyProfileId = response.organization._id;
          this.companyName = response.organization.companyName;
          this.companyPhoneNumber = response.organization.companyPhoneNumber;
          this.companyEmail = response.organization.companyEmail;
          this.companyAddress = response.organization.companyAddress;
          this.companyPrefixCode = response.organization.companyPrefixCode;
          this.blockBankAccounts = response.organization.blockBankAccounts;
          this.serviceBankAccounts =
            response.organization.serviceBankAccounts;

          console.log("company Name", response.organization.companyName);
          this.companyProfile = response;
              //this.$reloadPage();
            }
          })
      }
      catch (error) {
        this.$refs.toast.showErrorToastMessage("Something went wrong");
        console.log("Error in the catch", error.status, error.message);
      } finally {
        console.log("Finally delete blck")
      };
    },
    cancelDeleteBlockAccount() {
      // alert("called");
      console.log("calsel delete called");
      this.blockAccountToDelete = null;
      this.showConfirmationBlockModal = false;
    },
    removeBlockBankAccount(index) {
      this.addedBlockBankAccounts.splice(index, 1);
    },
    addServiceBankAccount() {
      this.addServiceAccount = true;
      console.log("i am here");

      this.addedServiceBankAccounts.push({
        bankAccountNumber: "",
        bankType: "",
      });
      console.log("old", this.serviceBankAccounts);
      console.log("added bank accounts", this.addedServiceBankAccounts);
    },
    editServiceAccountModal(account) {

      this.editedServiceAccount = { ...account }; // Create a copy to prevent direct mutation
      this.showEditServiceModal = true;
    },
    async saveEditedServiceAccount() {
      // Find the index of the edited account in the array
      const index = this.serviceBankAccounts.findIndex(
        (account) => account._id === this.editedServiceAccount._id
      );
      if (index !== -1) {
        // Replace the old account with the edited account
        this.serviceBankAccounts.splice(index, 1, this.editedServiceAccount);
        // Close the modal
        this.showEditServiceModal = false;
      }

      const companyEditedData = {
        companyName: this.companyName,
        companyPhoneNumber: this.companyPhoneNumber,
        companyEmail: this.companyEmail,
        companyAddress: this.companyAddress,
        companyPrefixCode: this.companyPrefixCode,
        blockBankAccounts: this.blockBankAccounts,
        serviceBankAccounts: this.serviceBankAccounts,
      };

      try {
        await this.$apiPatch(
          '/api/v1/organization', this.companyProfileId,
          companyEditedData
        )
          .then((response) => {
            console.log("response", response);
            if (Number(response.status) === 1) {
              this.$refs.toast.showSuccessToastMessage(response.message);
              
          this.companyProfileId = response.organization._id;
          this.companyName = response.organization.companyName;
          this.companyPhoneNumber = response.organization.companyPhoneNumber;
          this.companyEmail = response.organization.companyEmail;
          this.companyAddress = response.organization.companyAddress;
          this.companyPrefixCode = response.organization.companyPrefixCode;
          this.blockBankAccounts = response.organization.blockBankAccounts;
          this.serviceBankAccounts =response.organization.serviceBankAccounts;

              //this.$reloadPage();
            }
          })
      } catch (error) {
        this.$refs.toast.showErrorToastMessage("Something went wrong");
        console.log("Error in the catch", error.status, error.message);
      } finally {
        console.log("finally save edited account ")
      };
    },
    confirmDeleteServiceAccount(account) {
      console.log("in the service confirm of the account");
      this.serviceAccountToDelete = account;
      this.showConfirmationServiceModal = true;
      console.log(
        "in the service confirm of the account",
        this.serviceAccountToDelete
      );
    },

    async deleteServiceAccount() {
      console.log("indeleteaccountlso", this.serviceAccountToDelete._id);
      console.log("service accounts", this.serviceBankAccounts);

      const index = this.serviceBankAccounts.findIndex(
        (a) => a._id === this.serviceAccountToDelete._id
      );

      if (index !== -1) {
        this.serviceBankAccounts.splice(index, 1);
      }
      this.serviceAccountToDelete = null;
      this.showConfirmationServiceModal = false;


      const companyEditedData = {
        companyName: this.companyName,
        companyPhoneNumber: this.companyPhoneNumber,
        companyEmail: this.companyEmail,
        companyAddress: this.companyAddress,
        companyPrefixCode: this.companyPrefixCode,
        blockBankAccounts: this.blockBankAccounts,
        serviceBankAccounts: this.serviceBankAccounts,
      };

      try {
        await this.$apiPatch(
          '/api/v1/organization', this.companyProfileId,
          companyEditedData
        )
          .then((response) => {
            console.log("response", response);
            if (Number(response.status) === 1) {
              this.$refs.toast.showSuccessToastMessage("Service Account deleted successfully");
             // this.$reloadPage();
             this.companyProfileId = response.organization._id;
          this.companyName = response.organization.companyName;
          this.companyPhoneNumber = response.organization.companyPhoneNumber;
          this.companyEmail = response.organization.companyEmail;
          this.companyAddress = response.organization.companyAddress;
          this.companyPrefixCode = response.organization.companyPrefixCode;
          this.blockBankAccounts = response.organization.blockBankAccounts;
          this.serviceBankAccounts =
            response.organization.serviceBankAccounts;

          console.log("company Name", response.organization.companyName);
          this.companyProfile = response;
            }
          })
      } catch (error) {
        this.$refs.toast.showErrorToastMessage("Something went wrong");
        console.log("Error in the catch", error.status, error.message);
      } finally {

      };
    },

    cancelDeleteServiceAccount() {
      this.serviceAccountToDelete = null;
      this.showConfirmationServiceModal = false;
    },
    removeServiceBankAccount(index) {
      this.addedServiceBankAccounts.splice(index, 1);
    },

    async seeChange() {
      //alert("See Change")
      this.addedBlockBankAccounts = this.addedBlockBankAccounts.filter(
        (account) => account.bankAccountNumber !== "" && account.bankType !== ""
      );
      this.addedBlockBankAccounts.forEach((account) => {
        this.blockBankAccounts.push(account);
      });
      this.addedBlockBankAccounts = [];

      console.log("concatnated account is ", this.blockBankAccounts);
      this.addedServiceBankAccounts = this.addedServiceBankAccounts.filter(
        (account) => account.bankAccountNumber !== "" && account.bankType !== ""
      );

      this.addedServiceBankAccounts.forEach((account) => {
        this.serviceBankAccounts.push(account); //final service
      });


      this.addedServiceBankAccounts = [];
      console.log("blocks", this.blockBankAccounts);
      console.log("services", this.serviceBankAccounts);

      const companyEditedData = {
        companyName: this.companyName,
        companyPhoneNumber: this.companyPhoneNumber,
        companyEmail: this.companyEmail,
        companyAddress: this.companyAddress,
        companyPrefixCode: this.companyPrefixCode,
        blockBankAccounts: this.blockBankAccounts,
        serviceBankAccounts: this.serviceBankAccounts,
      };

      console.log("companey Profile", companyEditedData);
      try {
        await this.$apiPatch(
          '/api/v1/organization', this.companyProfileId,
          companyEditedData
        )
          .then((response) => {
            if (Number(response.status) === 1) {

              console.log("response from see change",response)
          this.$refs.toast.showSuccessToastMessage(response.message);
          this.companyProfileId = response.organization._id;
          this.companyName = response.organization.companyName;
          this.companyPhoneNumber = response.organization.companyPhoneNumber;
          this.companyEmail = response.organization.companyEmail;
          this.companyAddress = response.organization.companyAddress;
          this.companyPrefixCode = response.organization.companyPrefixCode;
          this.blockBankAccounts = response.organization.blockBankAccounts;
          this.serviceBankAccounts =
            response.organization.serviceBankAccounts;

          console.log("company Name", response.organization.companyName);
          this.companyProfile = response;



             // this.$reloadPage();
            }
          })
      } catch (error) {
        this.showError = true;
        this.errorMessage = error.message;
        console.log("error during save org", error.status, error.message);
        this.$refs.toast.showErrorToastMessage("Something went wrong");
      } finally {

      };
    },
    //block bank account

    goBack() {
      this.$router.push("/admindashboard/display-companey");
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
