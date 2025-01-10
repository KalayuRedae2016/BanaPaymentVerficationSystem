import { createRouter, createWebHistory } from "vue-router";
// Import your components
import HomeView from "../views/HomeView.vue";
import reset from "../views/reset.vue";
import accessDenied from "../views/accessDenied.vue";
import portofilo from "../views/portofilo.vue";
import jTableCaller from '../components/Common/jatableCaller.vue';
import commonDashboard from "../components/Common/dashboards/commonDasboard.vue"
import resetTables from "../components/Common/resetTables.vue"
import userManual from "../components/Common/userManual.vue"
import changeCommonPassword from '../components/Common/Setting/changePassword.vue'
// Admin components
// import Admindashboard from "../components/adminaccessiblepages/dashboards/Admindashboard.vue";


import adminDashboard from "../components/adminaccessiblepages/dashboards/adminDashboard1.vue";


import newCompneySettings from "../components/adminaccessiblepages/companey/newCompaneySettings.vue";
import displayCompaney from "../components/adminaccessiblepages/companey/displayCompaney.vue";
import editCompaney from "../components/adminaccessiblepages/companey/editCompaney.vue";
//import companyChangePassword from "../components/adminaccessiblepages/companey/changePassword.vue";
import payment1 from "../components/adminaccessiblepages/payment/payments1.vue";
import regular from "../components/adminaccessiblepages/payment/paymentSetting/blockNewPayment.vue";
import clients from "../components/adminaccessiblepages/clients/clients.vue";
import deactivate from "../components/adminaccessiblepages/clients/deactivate.vue";
import createClient from "../components/adminaccessiblepages/clients/createClient.vue";
import editClient from "../components/adminaccessiblepages/clients/editClient.vue";

import emptyEditProfile from "../components/adminaccessiblepages/clients/emptyEditProfile.vue";


import overdue from "../components/adminaccessiblepages/payment/Reports//paymentStatus/overdue.vue";
import paidUnpaid from "../components/adminaccessiblepages/payment/Reports//paymentStatus/paidUnpaid.vue"
// import transferHistory from "../components/adminaccessiblepages/payment/Reports/transferHistory.vue"


import idCardAdmin from "../components/adminaccessiblepages/id/idCard.vue";
import sendEmail from "../components/adminaccessiblepages/messages/sendEmail.vue";
//import bankStatement from "../components/adminaccessiblepages/payment/newPayment/bankStatement.vue";
import paymentHistoryDetail from "../components/adminaccessiblepages/payment/newPayment/paymentHistoryDetail.vue";

import usersForBankStatement from "../components/adminaccessiblepages/payment/newPayment/usersCanPay.vue";

import commonModal from "../components/adminaccessiblepages/commonFiles/modal.vue";
import parentModal from "../components/adminaccessiblepages/commonFiles/parentModal.vue";
import empty from "../components/adminaccessiblepages/commonFiles/empty.vue";
import emptyCompaney from "../components/adminaccessiblepages/commonFiles/emptyCompany.vue";
import emptyClient from "../components/adminaccessiblepages/commonFiles/emptyClient.vue";

// User components
//import userdashboard from "../components/UserAccessiblepages/userdashboard/Userdashboard.vue";
import userdashboardFirst from "../components/UserAccessiblepages/userdashboard/Userdashboardfirst.vue";
import profile from "../components/UserAccessiblepages/profile/editProfile.vue";
import idCard from "../components/UserAccessiblepages/idCard/idCard.vue";
import infoPayment from "../components/UserAccessiblepages/information/info.vue";
import { faHeadphonesSimple } from "@fortawesome/free-solid-svg-icons";

const routes = [
  {
    path: "/",
    component: HomeView,
    meta: { requiresGuest: true },
  },
  
  {
    path: "/resetPassword/:token",
    component: reset,
    meta: { requiresGuest: true },
  },
  {
    path: "/portofilo",
    component: portofilo,
    meta: { requiresGuest: true },
  },

 

  {
    path: "/jtable",
    component:  jTableCaller,
    meta: { requiresGuest: true },
  },
  // {
  //   path: "/access-denied",
  //   component: accessDenied,
  //   meta: { requiresGuest: true },
  // },


  {
    path: "/:pathMatch(.*)*",
    component: accessDenied,
    meta: { requiresGuest: true },
  },
  {
    path: "/admindashboard",
    component: commonDashboard,
    // meta: { requiresAuth: true, role: ['Admin', 'SuperAdmin'] },
    meta: { requiresAuth: true},
    //meta: { requiresGuest: true },
    children: [
      // Admin routes
      { path: "payment-history-detail/:userCode", component:paymentHistoryDetail },
      { path: "", component: adminDashboard },
      { path: "res-dash", component: adminDashboard },
      { path: "new-companey-setting", name: "new-companey-setting", component: newCompneySettings },
      { path: "display-companey", name: "display-companey", component: displayCompaney },
      { path: "edit-companey", name: "edit-companey", component: editCompaney },
      { path: "change-password", name: "change-password", component: changeCommonPassword  },
      { path: "payments1", name: "payments1", component: payment1 },
      { path: "regular-new-setting", name: "regular-new-setting", component: regular }, 
      { path: "clients", component: clients },
      { path: "deactivate", component: deactivate },
      { path: "create-client", name: "create-client", component: createClient },
      { path: "edit-client/:clientId", name: "edit-client", component: editClient },
      { path: "empty-edit-profile/:clientId", name: "empty-edit-profile", component: emptyEditProfile },
     
      // { path: "bank-statement/:userCode", component: bankStatement },
      { path: "user-for-bank-statement", component:  usersForBankStatement  },
      
  
      { path: "overdue", name: "overdue", component: overdue, props: true },
      { path: "paid-unpaid", name: "paid-unpaid", component: paidUnpaid, props: true },
      // { path: "transfer-history", name: "transfer-history", component: transferHistory,props: true },
   
      
      { path: "empty/:clientId", component: empty },
      { path: "empty-companey", component: emptyCompaney },
      { path: "empty-client", component: emptyClient }, 
      { path: "modal", component: commonModal },
      { path: "parent-modal", component: parentModal },
      { path: "send-email", component: sendEmail },
      { path: "user-manual", component: userManual},
      { path: "id-card", name: "id-card", component: idCardAdmin },
      { path: "reset-table", name: "reset-table", component:  resetTables },
    ],
  },

  // {
  //   path: "/superadmindashboard",
  //   component: commonDashboard,
  //   meta: { requiresAuth: true, role: 'SuperAdmin' },
  //   children: [
  //     // Admin routes
  //     { path: "payment-history-detail/:userCode", component:paymentHistoryDetail },
  //     { path: "", component: adminDashboard },
  //     { path: "res-dash", component: adminDashboard },
  //     { path: "new-companey-setting", name: "new-companey-setting", component: newCompneySettings },
  //     { path: "display-companey", name: "display-companey", component: displayCompaney },
  //     { path: "edit-companey", name: "edit-companey", component: editCompaney },
  //     { path: "change-password", name: "change-password", component: changeCommonPassword  },
  //     { path: "payments1", name: "payments1", component: payment1 },
  //     { path: "regular-new-setting", name: "regular-new-setting", component: regular }, 
  //     { path: "clients", component: clients },
  //     { path: "deactivate", component: deactivate },
  //     { path: "create-client", name: "create-client", component: createClient },
  //     { path: "edit-client/:clientId", name: "edit-client", component: editClient },
  //     { path: "empty-edit-profile/:clientId", name: "empty-edit-profile", component: emptyEditProfile },
     
  //     // { path: "bank-statement/:userCode", component: bankStatement },
  //     { path: "user-for-bank-statement", component:  usersForBankStatement  },
      
  
  //     { path: "overdue", name: "overdue", component: overdue, props: true },
  //     { path: "paid-unpaid", name: "paid-unpaid", component: paidUnpaid, props: true },
  //     // { path: "transfer-history", name: "transfer-history", component: transferHistory,props: true },
   
      
  //     { path: "empty/:clientId", component: empty },
  //     { path: "empty-companey", component: emptyCompaney },
  //     { path: "empty-client", component: emptyClient }, 
  //     { path: "modal", component: commonModal },
  //     { path: "parent-modal", component: parentModal },
  //     { path: "send-email", component: sendEmail },
  //     { path: "user-manual", component: userManual},
  //     { path: "id-card", name: "id-card", component: idCardAdmin },
  //     { path: "reset-table", name: "reset-table", component:  resetTables },
  //   ],
  // },
  
  {
    path: "/userdashboard",
    component: commonDashboard,
    meta: { requiresAuth: true, role: 'User' },
    //meta: { requiresGuest: true },
    children: [
      { path: "", component: userdashboardFirst },  
      { path: "info", component: infoPayment },
      { path: "profile", component: profile },
      { path: "change-password", component:changeCommonPassword },
      { path: "id-card", component:idCard},
            // { path: "receipt", component: receiptPage },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // Token to check if authenticated
  const userRole = localStorage.getItem("role"); // Role to check if the user has the correct role

  console.log("ntokensuper", isAuthenticated);
  console.log("rolekk", userRole);

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth); // If the route requires auth
  console.log("requiresAuth", requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest); // If the route allows guests
  console.log("requiresGuest", requiresGuest);

  // Get the role required for the route
  const requiredRole = to.meta.role;
  console.log("requiredRole", requiredRole);

  // If the route requires authentication
  if (requiresAuth) {
    console.log("require auth detected");
    if (!isAuthenticated) {
      // User is not authenticated, redirect to login or home page
      next("/"); // Redirect to home or login page
    } else if (requiredRole && userRole !== requiredRole) {
      // User does not have the correct role, redirect to home page
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      next("/"); // Redirect to home or login page
    } else {
      // Authenticated and role matches, proceed to the route
      next();
    }
  } else if (requiresGuest) {
    console.log("require guest detected");
    if (isAuthenticated) {
      // If the route requires guest and user is authenticated, redirect to dashboard or home
      next("/admindashboard"); // Change to a route you want for authenticated users
    } else {
      next(); // Proceed to the guest route
    }
  } else {
    // If no specific auth or guest requirements, just proceed
    next();
  }
});


export default router;
