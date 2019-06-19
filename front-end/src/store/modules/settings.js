import localForage from 'localforage';

const state = {
  settings: {
    darkMode: false,
    exercisesAmount: 15,
    language: 'en',
  },
};

const mutations = {
  setSettings(state, settings) {
    state.settings = {...state.settings, ...settings};
  },

  setSetting(state, { key, value }) {
    state.settings[key] = value;
  },
};

const actions = {
  loadSettings({ commit }) {
    return localForage.getItem('settings').then(settings => {
      if (settings) {
        commit('setSettings', settings);
      }
    });
  },

  changeSetting({ commit }, { key, value }) {
    commit('setSetting', { key, value });
    return localForage.setItem(`settings`, state.settings);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}