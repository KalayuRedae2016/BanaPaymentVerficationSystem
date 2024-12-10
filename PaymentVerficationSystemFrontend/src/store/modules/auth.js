const state = {
  userId: localStorage.getItem('userId') || null,
  token: localStorage.getItem('token') || null,
  locale: localStorage.getItem('locale') || 'en', 
  name: localStorage.getItem('name') || null,
  role: localStorage.getItem('role') || null,
  userCode: localStorage.getItem('userCode') || null,
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
  setActiveItem(state, activeItem) { // Mutation to set activeItem
    state.activeItem = activeItem;
    localStorage.setItem('activeItem', activeItem); // Save activeItem in localStorage
  },
  logout(state) {
    state.userCode = null;
    state.name = null;
    state.userId = null;
    state.token = null;
    state.role = null;
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
  commitActiveItem({ commit }, { activeItem }) { // Action to commit activeItem
    console.log("commit activeItem is called", activeItem);
    commit('setActiveItem', activeItem);
  },
  logout({ commit }) {
    commit('logout');
    localStorage.removeItem('token');
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
  getLocale(state) {
    return state.locale;
  },
  getActiveItem(state) { // Getter to retrieve activeItem
    return state.activeItem;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
