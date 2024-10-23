<template>
    <div class="container mx-auto flex flex-col">
      <p class="text-md mx-5 mb-5 mt-4 text-indigo-800 font-bold">
        See Payment Detail
      </p>
      <div
        class="border-t border-blue-500 px-5 pb-5 flex flex-col bg-white -mt-2"
      >
        <div class="p-4 mt-8 border border-gray-300">
          <div class="flex items-center justify-between mb-4">
            <div class="flex-1 mr-4">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by Name,Email,Userame"
                class="w-full px-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select class="border border-blue-500 rounded h-10" v-model="paymentStatus" @change="changeSearched(paymentStatus)">
             <option value="" selected disabled>Select Status</option>
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full border-b border-indigo-500">
              <thead>
                <tr class="bg-gray-200">
                  <th
                    class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    UserCode
                  </th>
                  <th
                    class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    Full Name
                  </th>
                  <th
                    class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800"
                  >
                    Paid/Unpaid
                  </th>
                  <th  class="w-24 p-3 text-md font-extrabold tracking-wide text-left text-indigo-800">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="searchPayment in searchedpayments"
                  :key="searchPayment._id"
                >
                  <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                    {{ searchPayment.userCode }}
                  </td>
  
                  <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                    {{ searchPayment.fullName }}
                  </td>
                  <td class="p-3 text-md text-gray-700 whitespace-nowrap">
                    {{ searchPayment.isPaid }}
                  </td>
                  <button class="custom-button m-4" @click="paymentHistory(searchPayment.userCode,searchPayment.activeYear,searchPayment.activeMonth)">Detail</button>
                </tr>
              </tbody>
            </table>
  
            <div class="flex flex-row mt-4">
              <div class="pagination flex items-center justify-center mt-4">
                <h1 class="mr-2">Show More</h1>
                <select
                  v-model="paymentsPerpage"
                  @change="changePerPageNumber()"
                  class="h-7 border border-gray-500 mr-3 rounded-md"
                >
                  <option value="" disabled>Show More</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <button
                  @click="previosPage"
                  class="px-2 py-1 rounded border border-gray-500 text-pink-500 hover:bg-gray-200 mr-2"
                >
                  <i class="fas fa-chevron-left"></i>
                </button>
                <span
                  class="px-2 py-1 rounded border border-gray-500 bg-pink-500 text-white"
                  >{{ currentPage }}</span
                >
                <button
                  @click="nextPage"
                  class="px-2 py-1 rounded border border-gray-500 text-pink-500 hover:bg-gray-200 ml-2"
                >
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
    <script>
  //import paymentsForm from "./paymentsForm/paymentForm.vue";
  import axios from "axios";
  export default {
    name: "paymentsView",
    components: {
      //paymentsForm,
    },
    data() {
      return {
        paymentStatus:"all",
        activeYear:(new Date()).getFullYear(),
        activeMonth:(new Date()).getMonth()+1,
        monthlReport:[],
        count: 1,
        confirmedpayments: [],
        paymentsPerpage: "",
        
        paymentType: "",
        timeRange: "",
        year: "",
        semiYear: "",
        month: "",
        day: "",
        payments: [],
        screenSize: "",
        detailModal: false,
        searchedpayments: [],
  
        filteredCleints: [],
        displayedpayments: [],
        currentPage: 1,
        searchQuery: "",
        perPage: 2,
        paymentName: "",
      };
    },
  
    watch: {
      searchQuery: {
        handler: "filteredpaymentsInSearch",
        immediate: true,
      },
    },
  
    computed: {
      totalPages() {
        return Math.ceil(this.payments.length / this.perPage);
      },
    },
    created() {
      this.paymentType = this.$route.query.paymentType;
      this.year = this.$route.query.year;
      this.reportType = this.$route.query.reportType;
      this.timeRange = this.$route.query.timeRange;
      this.semiYear = this.$route.query.semiYear;
      this.month = this.$route.query.month;
      this.day = this.$route.query.day;
    },
    mounted() {
      this.displayedItems();//for the table
      this.$apiClient
        .get("/api/v1/paymentSetting/latest")
        .then((response) => {
          if (response.data.status === 1) {
             this.activeMonth = response.data.paymentSetting.activeMonth;
             this.activeYear  = response.data.paymentSetting.activeYear;
             console.log("activeMonth", this.activeMonth,this.activeYear);    
  
           }
        })
        .catch((error) => {
          console.error(
            "An error occurred while fetching payment sfettings:",
            error
          );  
        });
        const mountedOrNot=1;
      this.fetchPayments(mountedOrNot);
    
    },
  
    methods: {
      paymentHistory(userCode,activeYear,activeMonth){
             this.$router.push({
                path: `/admindashboard/payment-history-detail/${userCode}`,
                query: {
                  year: activeYear,
                  month: this.activeMonth,
                },
              });
           
      },
      changeSearched(paymentStatus){
        
        if(paymentStatus=="all"){
          this.searchedpayments=this.payments.filter(payment => payment.isPaid==true || payment.isPaid==false);
        }
        if(paymentStatus=="paid"){
          this.searchedpayments=this.payments.filter(payment => payment.isPaid==true );
       
        }
        if(paymentStatus=="unpaid"){
          this.searchedpayments=this.payments.filter(payment => payment.isPaid==false);
       
        }
   
      },
      fetchPayments(mountedOrNot){
         const keyword="allPayments";
        this.$apiClient.get(
            '/api/v1/payments/getAllPayments',{
              params:{
               keyword:keyword,
              }
            }
          )
          .then((response) => {
            console.log("response in theall payment " ,response);
            if(mountedOrNot==1){
            this.payments=response.data.payments;
            this.searchedpayments=this.payments;
            }else{
              this.payments=response.data.payments;
            }
          })
          .catch((error) => {
            console.error("Error fetching payment data:", error);
      });
  },
  
      navigateProfile(paymentId) {
        console.log("paymentid", paymentId);
        this.$router.push(`/admindashboard/data-table/${paymentId}`);
      },
      verify(paymentId) {
        this.$router.push(`/admindashboard/verify/${paymentId}`);
      },
  
  
    
      filteredpaymentsInSearch() {
        if(this.paymentStatus=="all"){
       // this.payments="";
       this.searchedpayments=this.payments.filter(payment => payment.isPaid==true || payment.isPaid==false);
      }
      if(this.paymentStatus=="paid"){
        // this.payments="";
        this.searchedpayments=this.payments.filter(payment => payment.isPaid==true);
      }
      if(this.paymentStatus=="unpaid"){
        console.log("unpaid");
        this.searchedpayments=this.payments.filter(payment => payment.isPaid==false);
        // this.payments="";
      }
    console.log("payments herd are",this.payments);
        if (this.searchQuery) {
          console.log("searched query is",this.searchQuery);
        console.log("the payments are in the search qeury",this.payments);
          const query = this.searchQuery.toLowerCase();
  
         this.searchedpayments = this.searchedpayments.filter(
            (payment) =>
              payment.userCode.toLowerCase().includes(query) ||
              payment.fullName.toLowerCase().includes(query)
            // Add more conditions for other table headers
          )
          console.log("this searched ain the searche are ",this.searchedpayments);
          const mountedOrNot=0;
          this.fetchPayments(mountedOrNot);
          return this.searchedpayments;
        } 
        //return this.payments;
      },
      changePerPageNumber() {
        this.perPage = this.paymentsPerpage;
        this.displayedItems();
      },
  
      previosPage() {
        if (this.currentPage > 1 && this.currentPage <= this.totalPages) {
          this.currentPage--;
          // console.log(this.currentPage);
          this.displayedItems();
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.displayedItems();
        }
      },
      displayedItems() {
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = startIndex + this.perPage;
        this.searchedpayments = this.payments.slice(startIndex, endIndex);
      },
  
      goBack() {
        this.$router.push("/admindashboard/payment-report"); // Navigates back to the previous page
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
    