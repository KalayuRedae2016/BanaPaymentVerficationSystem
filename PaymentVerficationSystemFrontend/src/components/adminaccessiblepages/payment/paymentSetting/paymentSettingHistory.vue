<template>
 
  <div class=" rounded-lg py-2 ">
    <Toast ref="toast" />
    <div class="flex flex-col mx-auto  ">
      <div class="flex flex-row  w-full lg:w-1/2  mt-5 px-4">
        <label for="month" class="custom-label mt-5 w-1/4"
          >{{ $t('year') }}</label
        >
        <select
          @change="fetchPaymentSetting()"
          v-model="year"
          id="month"
          class="custom-select"
        >
          <option value="" disabled>Select Year</option>
          <option v-for="year in $years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <div class="flex flex-row w-full lg:w-1/2   px-4">
        <label for="month" class="custom-label mt-5 w-1/4"
          >  {{ $t('month') }}</label
        >
        <select
          @change="fetchPaymentSetting()"
          id="month"
          class="custom-select "
          v-model="month"
        >
          <option value="" disabled>Select Month</option>
          <option v-for="month in $months" :key="month" :value="month.value">
            {{ month.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="py-2 ">
      <p v-if="selectYear" class="text-red-500">{{ $t('pleaseSelectYear') }}</p>
      <p v-if="selectMonth" class="text-blue-500">{{ $t('pleaseSelectMonth') }}</p>
    </div>

    <div v-if="!noSettingOpened" class="mt-1 mx-4 px-3 grid grid-cols-1 gapy-2  border-t  border-gray-300 -mt-5 rounded-lg " >
   
      <div  class="w-full ">


  <div  >
    <div class="grid grid-cols-1 md:grid-cols-2  ">
      <!-- Left Column (First 6 Items) -->
      <div class="mt-3">
        <div class="bg-white border-b border-dotted  rounded-md border-b border-gray-500 ">
          <div class="flex items-center space-x-3">
            <i class="fas fa-money-bill-alt text-green-500"></i>
            <span class="font-semibold text-sm">{{ $t('regularAmount') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.regularAmount }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
          <div class="flex items-center space-x-3">
            <i class="fas fa-hand-holding-usd text-yellow-500"></i>
            <span class="font-semibold text-sm">{{ $t('subsidyAmount') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.subsidyAmount > 0 ? paymentSetting.subsidyAmount : '0' }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
          <div class="flex items-center space-x-3">
            <i class="fas fa-exclamation-circle text-red-500"></i>
            <span class="font-semibold text-sm">{{ $t('urgentAmount') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.urgentAmount > 0 ? paymentSetting.urgentAmount : '0' }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
          <div class="flex items-center space-x-3">
            <i class="fas fa-cogs text-indigo-500"></i>
            <span class="font-semibold text-sm">{{ $t('serviceAmount') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.serviceAmount }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
          <div class="flex items-center space-x-3">
            <i class="fas fa-percent text-blue-500"></i>
            <span class="font-semibold text-sm">{{ $t('registrationFee') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.regFeeRate }} %</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
          <div class="flex items-center space-x-3">
            <i class="fas fa-calendar-check text-teal-500"></i>
            <span class="font-semibold text-sm">{{ $t('activeYear') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.activeYear }}</span>
          </div>
        </div>
      </div>

      <!-- Right Column (Remaining Items) -->
      <div class="">
        <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
          <div class="flex items-center space-x-3">
            <i class="fas fa-calendar-day text-purple-500"></i>
            <span class="font-semibold text-sm">{{ $t('activeMonth') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.activeMonth }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
          <div class="flex items-center space-x-3">
            <i class="fas fa-calendar-alt text-orange-500"></i>
            <span class="font-semibold text-sm">{{ $t('startingDay') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.formattedStartDate }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
          <div class="flex items-center space-x-3">
            <i class="fas fa-calendar-times text-red-500"></i>
            <span class="font-semibold text-sm">{{ $t('endingDay') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.formattedEndDate }}</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
          <div class="flex items-center space-x-3">
            <i class="fas fa-clock text-yellow-500"></i>
            <span class="font-semibold text-sm">{{ $t('penaltyPerFiveDaysPercentage') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.penalityLate5Days }}%</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
          <div class="flex items-center space-x-3">
            <i class="fas fa-clock text-yellow-500"></i>
            <span class="font-semibold text-sm">{{ $t('penaltyPerTenDaysPercentage') }}:</span>
            <span class="text-lg text-gray-800"><span>{{ paymentSetting.penalityLate10Days.toFixed(0) }}</span>
            %</span>
          </div>
        </div>

        <div class="bg-white border-b border-dotted py-2  rounded-md shadow-sm border-b border-gray-500">
          <div class="flex items-center space-x-3">
            <i class="fas fa-clock text-red-500"></i>
            <span class="font-semibold text-sm">{{ $t('penaltyPerAboveTenDaysPercentage') }}:</span>
            <span class="text-lg text-gray-800">{{ paymentSetting.penalityLateAbove10Days }}%</span>
          </div>
        </div>
      </div>
    </div>

   
  </div>
</div>
    </div>

    <div class=""><button @click="deleteAllPaymentSettingsModal=true" class="custom-button m-3"><i class="fas fa-trash-alt text-red-500 mr-2"></i>Delete All Payments Setting</button></div>
    <div v-if="noSettingOpened" class="m-5">
      <p class="text-blue-500">
        {{ $t('noOpenedPaymentSetting') }}
      </p>
      <p class="text-pink-400"> {{ $t('selectedTime') }} {{ year }} -{{ month }}</p>
    </div>

    <div v-if="deleteAllPaymentSettingsModal">
      <transition name="fade" mode="out-in">
        <div
          class="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
        >
          <!-- Modal Content -->
          <div class="bg-white rounded-lg p-6 border border-cyan-500 w-96">
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
                  d="M12 9v6m0 0v-6m0 6h6m-6 0H6"
                ></path>
              </svg>
              <h2 class="text-2xl font-bold text-gray-800">
                {{ $t("warning") }}
              </h2>
            </div>


            <p class="text-gray-600 text-lg">
              {{ $t("Do you want to delete All users") }}
            </p>

            <div class="mt-6 flex space-x-5">
              <button
                @click="deleteAllPaymentSettings();deleteAllPaymentSettingsModal=false"
                class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {{ $t("yes") }}
              </button>
              <button
                @click="deleteAllPaymentSettingsModal = false"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {{ $t("Cancel") }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Toast from '../../../Common/Toast.vue'
export default {
  components:{
 Toast,
  },
  data() {
    return {
      deleteAllPaymentSettingsModal:false,
      noSettingOpened: true,
      selectYear: false,
      selectMonth: false,

      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      

      paymentSetting: {
        regularAmount: "",
        subsidyAmount: "",
        urgentAmount: "",
        serviceAmount: "",
        startingDate: "",
        endingDate: "",
        regFeeRate: "",
        penalityLate5Days: "",
        penalityLate7Days: "",
        penalityLateAbove10Days: "",
      },
    };
  },

  async mounted() {
    console.log("defualt year andmonth are ",this.year,this.month);
      try { await this.$apiGet("/api/v1/paymentSetting/latest")
        .then((response) => {
          console.log("latest month response:", response);

          if (response.status === 1) {
            this.month = response.paymentSetting.activeMonth;
            this.year = response.paymentSetting.activeYear;
            this.monthlyPayment();
          }
        })}catch(error){
     
          console.error(
            "An error occurred while fetching Payment settings:",
            error.status,error.message
          );
        }finally{

        };
    
    this.fetchPaymentSetting();

  },
  methods: {
    deleteAllPaymentSettings(){
    try{
      this.$apiDelete('api/v1/paymentSetting','','').then((response)=>{
      console.log("response",response);
      this.$refs.toast.showSuccessToastMessage("All Payments Settings Delated Successfully");
      });
    }catch(error){
      this.$refs.toast.showErrorToastMessage(error.message);
      console.log("error status,error message",error.status,error.message)
    }finally{

    }
  },
    async fetchPaymentSetting() {
 this.noSettingOpened=true;
      if (this.year == "") {
        this.selectYear = true;
        return;
      } else if (this.month == "") {
        this.selectMonth = true;
        return;
      }


      const params={
        activeYear:this.year,
        activeMonth:this.month,

      }
    try {  
      await  this.$apiGet(
          'api/v1/paymentSetting/',params
        )
        .then((response) => {
          if (response.status === 1) {
            console.log("response from history ", response);
            this.paymentSetting = response.paymentSetting;
            if (response.paymentSetting) {
              this.noSettingOpened = false;
            } else {
              this.noSettingOpened = true;
            }
          } else {
            console.log("payment setting  not found");
          }
        })}
        catch(error) {
          console.log("error: ", error.status,error.message);
        }finally{

        };
    },
  },
};
</script>
