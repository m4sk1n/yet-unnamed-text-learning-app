import localForage from 'localforage';

const state = {
  settings: {},
};

const getters = {
  all: (state) => {
    return state.settings;
  },
};

const mutations = {
  setSettings(state, settings) {
    state.settings = settings;
  },

  setSetting(state, { key, value }) {
    state.settings[key] = value;
  },
};

const actions = {
  loadSettings({ commit }) {
    return localForage.getItem('settings').then(settings => {
      commit('setSettings', settings);
    });
  },

  changeSetting({ commit }, { key, value }) {
    commit('setSetting', { key, value });
    localForage.setItem(`settings`, state.settings);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}