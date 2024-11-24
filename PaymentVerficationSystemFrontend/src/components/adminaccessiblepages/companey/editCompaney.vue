<template>
  <div>
    <div class="container flex-col bg-white">
      <div class="flex flex-row">
        <h2 class="text-md font-bold text-primary mt-3 ml-4">
          {{ $t("editCompanyProfile") }}
        </h2>
      </div>

      <div class="flex flex-wrap mx-auto py-8 border-t border-indigo-800 mt-4">
        <div v-if="!closepaymentCreated" class="w-full">
          <div class="m-4">
            <form class="mt-8 mr-5">
              <div class="flex flex-col md:flex-row md:space-x-12">
                <div class="flex flex-col md:w-1/2">
                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("compName") }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      class="custom-input"
                      v-model="companyName"
                      placeholder="Name"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("compEmail") }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyEmail"
                      class="custom-input"
                      v-model="companyEmail"
                      placeholder="Email"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("companyPhoneNumber") }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyPhoneNumber"
                      class="custom-input"
                      v-model="companyPhoneNumber"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div class="flex flex-col md:w-1/2">
                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("compPrefixCode") }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyPrefixCode"
                      class="custom-input"
                      v-model="companyPrefixCode"
                      placeholder="Prefix Code"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="custom-label">
                      {{ $t("compAddress") }}
                      <span class="custom-star ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyAddress"
                      class="custom-input"
                      v-model="companyAddress"
                      placeholder="Address"
                    />
                  </div>
                </div>
              </div>

              <div class="rounded-lg px-3 py-3 mt-5">
                <label class="custom-label"> {{ $t("blockAccounts") }} </label>
                <div class="border border-gray-300">
                  <table class="w-full border-b border-gray-300">
                    <thead>
                      <tr class="bg-gray-200">
                        <th
                          class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                        >
                          {{ $t("bankType") }}
                        </th>
                        <th
                          class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                        >
                          {{ $t("bankAccount") }}
                        </th>
                        <th
                          class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                        >
                          {{ $t("detail") }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="account in blockBankAccounts"
                        :key="account._id"
                      >
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <span
                            class="p-1.5 text-sm font-medium tracking-wider text-gray-800 rounded-lg bg-gray-200"
                            >{{ account.bankType }}</span
                          >
                        </td>
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {{ account.bankAccountNumber }}
                        </td>
                        <td class="p-3 text-sm whitespace-nowrap">
                          <i
                            @click="editBlockAccountModal(account)"
                            class="fas fa-edit mr-2 text-blue-700"
                          ></i>
                          <i
                            @click="confirmDeleteBlockAccount(account)"
                            class="fas fa-trash-alt custom-star"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    v-for="(account, index) in addedBlockBankAccounts"
                    :key="index"
                    class="flex flex-col items-center space-y-3 m-5 md:flex-row md:space-x-5 md:space-y-0"
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
                      <option value="Wegagen">{{ $t("Wegagen") }}</option>
                      <option value="Enat">{{ $t("Enat") }}</option>
                      <option value="Dashen">{{ $t("Dashen") }}</option>
                      <option value="Lion">{{ $t("Lion") }}</option>
                      <option value="Oromia">{{ $t("Oromia") }}</option>
                      <option value="Absinia">{{ $t("Absinia") }}</option>
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
                  </div>

                  <button
                    @click.prevent="addBlockBankAccount()"
                    class="ml-10 mt-3 mb-5 flex items-center justify-center bg-pink-500 text-white rounded-full w-6 h-6"
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
                </div>
              </div>

              <div class="rounded-lg px-3 py-3 mt-5">
                <label class="custom-label">
                  {{ $t("serviceAccounts") }}
                </label>

                <div class="border border-gray-300">
                  <table class="w-full border-b border-gray-300">
                    <thead>
                      <tr class="bg-gray-200">
                        <th
                          class="w-24 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                        >
                          {{ $t("bankType") }}
                        </th>
                        <th
                          class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                        >
                          {{ $t("bankAccountNumber") }}
                        </th>
                        <th
                          class="w-32 p-3 text-sm font-extrabold tracking-wide text-left text-indigo-800"
                        >
                          {{ $t("detail") }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="account in serviceBankAccounts"
                        :key="account._id"
                      >
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <span
                            class="p-1.5 text-sm font-medium tracking-wider text-gray-800 rounded-lg bg-gray-200"
                            >{{ account.bankType }}</span
                          >
                        </td>
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {{ account.bankAccountNumber }}
                        </td>
                        <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <i
                            @click="editServiceAccountModal(account)"
                            class="fas fa-edit mr-2 text-blue-500"
                          ></i>
                          <i
                            @click="confirmDeleteServiceAccount(account)"
                            class="fas fa-trash-alt custom-star"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    v-for="(account, index) in addedServiceBankAccounts"
                    :key="index"
                    class="flex flex-col items-center space-y-5 m-5 md:flex-row md:space-y-0"
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
                      <option value="Wegagen">{{ $t("Wegagen") }}</option>
                      <option value="Enat">{{ $t("Enat") }}</option>
                      <option value="Dashen">{{ $t("Dashen") }}</option>
                      <option value="Lion">{{ $t("Lion") }}</option>
                      <option value="Oromia">{{ $t("Oromia") }}</option>
                      <option value="Absinia">{{ $t("Absinia") }}</option>
                      <option value="other" class="text-indigo-800 font-bold">
                        {{ $t("other") }}
                      </option>
                    </select>

                    <input
                      type="text"
                      v-model="account.bankAccountNumber"
                      :placeholder="$t('bankAccountNumber')"
                      class="custom-input ml-5"
                    />

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
                  </div>

                  <button
                    @click.prevent="addServiceBankAccount()"
                    class="ml-10 mt-3 mb-5 flex items-center justify-center bg-pink-500 text-white rounded-full w-6 h-6"
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
                </div>
              </div>

              <button @click.prevent="seeChange()" class="custom-button ml-3">
                <i class="fas fa-save text-pink-500 mr-2"></i>{{ $t("save") }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showEditBlockModal">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="flex flex-row">
              <div>{{ $t("editBlockAccount") }}
              </div>
              <div class="ml-64">
                <svg
                  @click="showEditBlockModal = !showEditBlockModal"
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

            <div class="">
              <form class="px-5 py-5">
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium text-gray-700 sm:text-base md:text-sm"
                  >
                   {{ $t("bankType") }}

                    <span class="custom-star ml-1">*</span>
                  </label>

                  <select
                    class="border border-gray-400 w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base h-10"
                    required
                    style="padding-left: 16px"
                    v-model="editedBlockAccount.bankType"
                  >
                    <option :value="editedBlockAccount.bankType">
                      {{ editedBlockAccount.bankType }}
                    </option>
                     <option value="" disabled>
                        {{ $t("selectBankType") }}
                      </option>
                    <option value="CBE">{{ $t("CBE") }}</option>
                      <option value="Wegagen">{{ $t("Wegagen") }}</option>
                      <option value="Enat">{{ $t("Enat") }}</option>
                      <option value="Dashen">{{ $t("Dashen") }}</option>
                      <option value="Lion">{{ $t("Lion") }}</option>
                      <option value="Oromia">{{ $t("Oromia") }}</option>
                      <option value="Absinia">{{ $t("Absinia") }}</option>
            
                  </select>
                </div>

                <div class="mb-4">
                  <label
                    class="block text-sm font-medium text-gray-700 sm:text-base md:text-sm"
                  >
                   {{ $t("bankAccount") }}
                    <span class="custom-star ml-1">*</span>
                  </label>

                  <input
                    type="text"
                    class="w-full px-4 py-2 border border-gray-400 rounded"
                    v-model="editedBlockAccount.bankAccountNumber"
                    placeholder="Bank Account"
                  />
                </div>
                <button
                  @click="saveEditedBlockAccount"
                  type="submit"
                  class="bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  <i class="fas fa-save"
                    ><span class="text-md ml-3">{{ $t("saveChanges") }}</span></i
                  >
                </button>
              </form>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>

      <div v-if="deleteSuccess">
        <transition name="fade" mode="out-in">
          <div
            class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
          >
            <!-- Modal Content -->
            <div class="bg-white rounded-lg p-6 border border-cyan-500">
              <div class="fixed inset-0 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                  <div class="flex items-center justify-center mb-4">
                    <svg
                      class="w-8 h-10 text-green-500 mr-2"
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
                    <h2 class="text-md font-bold text-gray-800">{{ $t("success") }}</h2>
                  </div>
                  <p class="text-gray-600 text-md">
                    Company Profile Edited successfully
                  </p>
                  <button
                    @click="deleteSuccess = !deleteSuccess"
                    class="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
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


    </div>
    <div v-if="otherBlockSelected">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                <div class="flex flex-row space-x-32">
                  <h1 class="mb-5 text-indigo-800 text-md font-bold">
                      {{ $t('addBlockAccount') }}
                  </h1>
                  <svg
                    @click="otherBlockSelected = !otherBlockSelected"
                    class="w-8 h-10 text-red-500 mr-2"
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

                <form action="" class="">
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankName") }}
                    </label>
                    <input
                      class="custom-input"
                      id="bank-name"
                      type="text"
                      :placeholder="$t('bankType')"
                      v-model="newBlockBankType"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankAccountNumber") }}
                    </label>
                    <input
                      class="custom-input"
                      id="comp-name"
                      type="text"
                      :placeholder="$t('bankAccountNumber')"
                      v-model="newBlockBankAccountNumber"
                    />
                  </div>
                  <button
                    @click.prevent="saveNewBlockBank"
                    class="custom-button bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                  >
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
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                <div class="flex flex-row space-x-32">
                  <h1 class="mb-5 text-indigo-800 text-md font-bold">
                    {{ $t("addServiceAccount") }}
                  </h1>
                  <svg
                    @click="otherServiceSelected = !otherServiceSelected"
                    class="w-8 h-10 text-red-500 mr-2"
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

                <form action="" class="">
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankName") }}
                    </label>
                    <input
                      class="custom-input"
                      id="bank-name"
                      type="text"
                      placeholder="Bank Name"
                      v-model="newServiceBankType"
                    />
                  </div>
                  <div class="mb-4">
                    <label class="custom-label" for="username">
                      {{ $t("bankAccountNumber") }}
                    </label>
                    <input
                      class="custom-input"
                      id="comp-name"
                      type="text"
                      :placeholder="$t('bankAccountNumber')"
                      v-model="newServiceBankAccountNumber"
                    />
                  </div>
                  <button
                    @click.prevent="saveNewServiceBank"
                    class="custom-button bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
                  >
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
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                <div class="flex items-center justify-center mb-10">
                  <h2 class="text-md font-bold text-pink-800">
                    {{ $t('confirmDeleteBlockAccount') }}
                  </h2>
                </div>
                <button
                  @click="deleteBlockAccount"
                  class="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                {{ $t("delete") }}

                </button>
                <button
                  @click="cancelDeleteBlockAccount"
                  class="bg-gray-400 text-white px-4 py-2 rounded-md ml-2"
                >
                {{ $t("cancel") }}
                </button>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showEditServiceModal">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="flex flex-row">
              <div>{{ $t("editBlockAccount") }}</div>
              <div class="ml-64">
                <svg
                  @click="showEditServiceModal = !showEditServiceModal"
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

            <div class="">
              <form class="px-5 py-5">
                <div class="mb-4">
                  <label
                    class="block text-sm font-medium text-gray-700 sm:text-base md:text-sm"
                  >
                      {{ $t("bankType") }}
                    <span class="custom-star ml-1">*</span>
                  </label>

                  <select
                    class="border border-gray-400 w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base h-10"
                    required
                    style="padding-left: 16px"
                    v-model="editedServiceAccount.bankType"
                  >
                    <option :value="editedServiceAccount.bankType">
                      {{ editedServiceAccount.bankType }}
                    </option>
                    <option value="" disabled>
                        {{ $t("selectBankType") }}
                      </option>
                      <option value="CBE">{{ $t("CBE") }}</option>
                      <option value="Wegagen">{{ $t("Wegagen") }}</option>
                      <option value="Enat">{{ $t("Enat") }}</option>
                      <option value="Dashen">{{ $t("Dashen") }}</option>
                      <option value="Lion">{{ $t("Lion") }}</option>
                      <option value="Oromia">{{ $t("Oromia") }}</option>
                      <option value="Absinia">{{ $t("Absinia") }}</option>
                      <option value="other" class="text-indigo-800 font-bold">
                        {{ $t("other") }}
                      </option>
                  </select>
                </div>

                <div class="mb-4">
                  <label
                    class="block text-sm font-medium text-gray-700 sm:text-base md:text-sm"
                  >
                        {{ $t("bankAccountNumber") }}
                    <span class="custom-star ml-1">*</span>
                  </label>

                  <input
                    type="text"
                    class="w-full px-4 py-2 border border-gray-400 rounded"
                    v-model="editedServiceAccount.bankAccountNumber"
                    placeholder="Bank Account"
                  />
                </div>
                <button
                  @click="saveEditedServiceAccount"
                  type="submit"
                  class="bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  <i class="fas fa-save"
                    ><span class="text-md ml-3">{{ $t("saveChanges") }}</span></i
                  >
                </button>
              </form>
            </div>

            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>

    <div v-if="showConfirmationServiceModal">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                <div class="flex items-center justify-center mb-10">
                  <h2 class="text-md font-bold text-pink-800">
                    
                    {{ $t('confirmDeleteServiceAccount') }}
                  </h2>
                </div>

                <button
                  @click="deleteServiceAccount"
                  class="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  {{ $t("delete") }}
                </button>
                <button
                  @click="cancelDeleteServiceAccount"
                  class="bg-gray-400 text-white px-4 py-2 rounded-md ml-2"
                >
                  {{ $t("cancel") }}
                </button>
              </div>
            </div>
            <hr class="my-4 md:min-w-full bg-red-500" />
          </div>
        </div>
      </transition>
    </div>

    <div v-if="editSuccess">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500">
            <div class="fixed inset-0 flex items-center justify-center z-50">
              <div class="bg-white rounded-lg shadow-lg p-8 w-96">
                <div class="flex items-center justify-center mb-4">
                  <svg
                    class="w-8 h-10 text-green-500 mr-2"
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
                  <h2 class="text-md font-bold text-gray-800">
                    {{ $t("success") }}
                  </h2>
                </div>
                <p class="text-gray-600 text-md">
                  {{ successMessage }}
                </p>
                <button
                  @click="editSuccess = !editSuccess"
                  class="custom-button"
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
export default {
  name: "paymentsView",
  data() {
    return {
      newBlockBankType: "",
      newBlockBankAccountNumber: "",

      newServiceBankType: "",
      newServiceBankAccountNumber: "",

      otherBlockSelected: false,
      otherServiceSelected: false,

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
        {
          bankAccountNumber: "",
          bankType: "",
        },
      ],
      addedBlockBankAccounts: [{ bankAccountNumber: "", bankType: "" }],

      serviceBankAccounts: [
        {
          bankAccountNumber: "",
          bankType: "",
        },
      ],
      addedServiceBankAccounts: [{ bankAccountNumber: "", bankType: "" }],

      editedBlockAccount: {},
      editedServiceAccount: {},
    };
  },

  mounted() {
    this.$apiClient
      .get("/api/v1/organization")
      .then((response) => {
        console.log("Update response", response);

        this.companyProfileId = response.data.organization._id;
        this.companyName = response.data.organization.companyName;
        this.companyPhoneNumber = response.data.organization.companyPhoneNumber;
        this.companyEmail = response.data.organization.companyEmail;
        this.companyAddress = response.data.organization.companyAddress;
        this.companyPrefixCode = response.data.organization.companyPrefixCode;
        this.blockBankAccounts = response.data.organization.blockBankAccounts;
        this.serviceBankAccounts =
          response.data.organization.serviceBankAccounts;

        console.log("company Name", response.data.organization.companyName);
        this.companyProfile = response.data;
        console.log("block accounts", this.blockBankAccounts);
        console.log("service accounts", this.serviceBankAccounts);
      })
      .catch((error) => {
        console.log("Error fwtching", error);
      });
  },
  methods: {
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

    saveNewBlockBank() {
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

      this.$apiClient
        .patch(
          `/api/v1/organization/${this.companyProfileId}`,
          companyEditedData
        )
        .then((response) => {
          console.log("response", response);
          if (Number(response.data.status) === 1) {
            this.editSuccess = true;
            this.successMessage = response.data.message;
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.showError = true;
          console.log("Error in the catch", error.response.data.message);
        });
    },

    saveNewServiceBank() {
      // alert("hi")
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
      this.$apiClient
        .patch(
          `/api/v1/organization/${this.companyProfileId}`,
          companyEditedData
        )
        .then((response) => {
          console.log("response", response);
          if (Number(response.data.status) === 1) {
            this.editSuccess = true;
            this.successMessage = response.data.message;
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.showError = true;
          console.log("Error in the catch", error.response.data.message);
        });
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
    saveEditedBlockAccount() {
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

      this.$apiClient
        .patch(
          `/api/v1/organization/${this.companyProfileId}`,
          companyEditedData
        )
        .then((response) => {
          console.log("response", response);
          if (Number(response.data.status) === 1) {
            this.editSuccess = true;
            this.successMessage = response.data.message;
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.showError = true;
          console.log("Error in the catch", error.response.data.message);
        });

      //
    },

    confirmDeleteBlockAccount(account) {
      this.blockAccountToDelete = account;
      this.showConfirmationBlockModal = true;
    },

    deleteBlockAccount() {
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

      this.$apiClient
        .patch(
          `/api/v1/organization/${this.companyProfileId}`,
          companyEditedData
        )
        .then((response) => {
          console.log("response", response);
          if (Number(response.data.status) === 1) {
            this.editSuccess = true;
            this.successMessage = "Bank Deleted Successfully";

            //alert(this.successMessage);
          }
        })
        .catch((error) => {
          this.errorMessage = "Error Delating Bank";
          this.showError = true;
          console.log("Error in the catch", error.response.data.message);
        });
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
      /// alert("called");
      // Open the modal and pass the account details
      this.editedServiceAccount = { ...account }; // Create a copy to prevent direct mutation
      this.showEditServiceModal = true;
    },
    saveEditedServiceAccount() {
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

      this.$apiClient
        .patch(
          `/api/v1/organization/${this.companyProfileId}`,
          companyEditedData
        )
        .then((response) => {
          console.log("response", response);
          if (Number(response.data.status) === 1) {
            this.editSuccess = true;
            this.successMessage = response.data.message;
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.error.message;
          this.showError = true;
          console.log("Error in the catch", error.response.data.message);
        });
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

    deleteServiceAccount() {
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

      this.$apiClient
        .patch(
          `/api/v1/organization/${this.companyProfileId}`,
          companyEditedData
        )
        .then((response) => {
          console.log("response", response);
          if (Number(response.data.status) === 1) {
            this.editSuccess = true;
            this.successMessage = "Bank Delated Successfully";
          }
        })
        .catch((error) => {
          this.errorMessage = "Error Delating Bank";
          this.showError = true;
          console.log("Error in the catch", error.response.error.message);
        });
    },

    cancelDeleteServiceAccount() {
      this.serviceAccountToDelete = null;
      this.showConfirmationServiceModal = false;
    },
    removeServiceBankAccount(index) {
      this.addedServiceBankAccounts.splice(index, 1);
    },

    seeChange() {
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
      this.$apiClient
        .patch(
          `/api/v1/organization/${this.companyProfileId}`,
          companyEditedData
        )
        .then((response) => {
          if (Number(response.data.status) === 1) {
            console.log("Update response", response.data);
            this.successMessage = response.data.message;
            this.editSuccess = true;
          }
        })
        .catch((error) => {
          console.log("Error updating close", error);
          this.errorMessage = error.response.data.message;
          this.showError = true;
        });
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
