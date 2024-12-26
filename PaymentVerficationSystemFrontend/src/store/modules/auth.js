const state = {
  userId: localStorage.getItem('userId') || null,
  token: localStorage.getItem('token') || null,
  locale: localStorage.getItem('locale') || 'en', 
  name: localStorage.getItem('name') || null,
  role: localStorage.getItem('role') || null,
  userCode: localStorage.getItem('userCode') || null,
  email: localStorage.getItem('email') || null,
  reloading: localStorage.getItem('reloading') ||null,
  activeItem: localStorage.getItem('activeItem') || 'dashboard', // Default to 'dashboard'
  serviceBanks: localStorage.getItem('serviceBanks') || [],
  blockBanks:localStorage.getItem('blockBanks') || [],

};

const mutations = {

  setServiceBanks(state, banks) {
    state.serviceBanks = banks;
    localStorage.setItem('serviceBanks', banks);
  },
  setBlockBanks(state, banks) {
    localStorage.setItem('blockBanks', banks);
    state.blockBanks = banks;
  },
  setUserCode(state, userCode) {
    state.userCode = userCode;
    localStorage.setItem('userCode', userCode);
    console.log("userCode in mutation", userCode);
  },
  setUserId(state, userId) {
    state.userId = userId;
    localStorage.setItem('userId', userId);
    console.log("userId in mutation", userId);
  },
  setToken(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
  },
  setName(state, name) {
    console.log("name in mutation", name);
    localStorage.setItem('name', name);
    state.name = name;
  },
  setLocale(state, locale) {
    state.locale = locale;
    localStorage.setItem('locale', locale);
  },
  setRole(state, role) {
    console.log("role in mutation", role);
    state.role = role;
    localStorage.setItem('role', role);
  },
  setRole(state, email) {
    console.log("role in mutation", email);
    state.email = email;
    localStorage.setItem('email', email);
  },
  setActiveItem(state, activeItem) { // Mutation to set activeItem
    state.activeItem = activeItem;
    localStorage.setItem('activeItem', activeItem); // Save activeItem in localStorage
  },

  setReloading(state, reloading) {
    state.reloading = reloading;
    localStorage.setItem('reloading', reloading);
  },


  logout(state) {
    state.userCode = null;
    state.name = null;
    state.userId = null;
    state.token = null;
    state.role = null;
    state.email=null;
    state.reloading = null;
    state.activeItem = 'dashboard'; // Reset to default when logging out
    localStorage.removeItem('activeItem'); // Clear from localStorage
  },
};

const actions = {

  async fetchBanks({ commit }) {
    try {

      this.$apiClient
      .get("/api/v1/organization")
      .then((response) => {
          console.log("response from the store", response);
          const serviceBanks =response.data.organization.serviceBankAccounts;
          const blockBanks =response.data.organization.blockBankAccounts;
          commit('setServiceBanks',serviceBanks,);
          commit('setBlockBanks',blockBanks);
       })
      .catch((error) => {
       console.log(error);
      });

    
    } catch (error) {
      console.error('Error fetching banks:', error);
    }
  },
  login({ commit }, { token }) {
    console.log("token in commit ",token);
    commit('setToken', token);
    localStorage.setItem('token', token);
  },
  commitId({ commit }, { userId }) {
    console.log('user in commit action', userId);
    commit('setUserId', userId);
    localStorage.setItem('userId', userId);
  },
  commitUserCode({ commit }, { userCode }) {
    console.log('userCode in commit action', userCode);
    commit('setUserCode', userCode);
    localStorage.setItem('userCode', userCode);
  },
  commitName({ commit }, { name }) {
    console.log("commit name is called", name);
    commit('setName', name);
    localStorage.setItem('name', name);
  },

  setLocale({ commit }, { locale }) {
    commit('setLocale', locale);
  },
  commitRole({ commit }, { role }) {
    console.log("commit role is called", role);
    commit('setRole', role);
    localStorage.setItem('role', role);
  },
  commitEmail({ commit }, { email}) {
    console.log("commit role is called", email);
    commit('setEmail', email);
    localStorage.setItem('email', email);
  },
  commitActiveItem({ commit }, { activeItem }) { // Action to commit activeItem
    console.log("commit activeItem is called", activeItem);
    commit('setActiveItem', activeItem);
  },

  commitReloading({ commit }, { reloading }) { // Action to commit activeItem
    console.log("commit reloading is called", reloading);
    commit('setReloading', reloading);
  },

  logout({ commit }) {
    commit('logout');
    localStorage.removeItem('userId');
    localStorage.removeItem('userCode');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('locale');
    localStorage.removeItem('token');
    localStorage.removeItem('serviceBanks'),
    localStorage.removeItem('blockBanks'),
    localStorage.removeItem('reloading');
  },
};

const getters = {

  serviceBanks: (state) => state.serviceBanks,
  blockBanks: (state) => state.blockBanks,

  isAuthenticated(state) {
    return !!state.token;
  },
  getToken(state) {
    return state.token;
  },
  getName(state) {
    console.log("get name", state.name);
    return state.name;
  },
  getUserId(state) {
    return state.userId;
  },
  getUserCode(state) {
    console.log("usercode in usercode get",state.userCode);
    return state.userCode;
  },
  getRole(state) {
    return state.role;
  },

  getEmail(state) {
    return state.email;
  },
  
  getLocale(state) {
    return state.locale;
  },
  getActiveItem(state) { // Getter to retrieve activeItem
    return state.activeItem;
  },
  getReloading(state) {
    return state.reloading;
  },
 // getters, // If you have other getters in your module, include them here
};

export default {
  state,
  mutations,
  actions,
  getters,
};
