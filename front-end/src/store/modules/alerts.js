import generateUUID from '@/utils/generateUUID';

const state = {
  alerts: [],
};

const getters = {
  all: (state) => {
    return state.alerts;
  },
};

const mutations = {
  add(state, alert) {
    state.alerts.push(alert);
  },

  delete(state, uuid) {
    state.alerts = state.alerts.filter(alert => alert.uuid !== uuid);
  },
};

const actions = {
  add({ commit }, { text, type, timeout }) {
    const uuid = generateUUID();
    const alert = {
      text,
      type,
      uuid,
    }
    commit('add', alert);
    setTimeout(commit.bind(this, 'delete', uuid), timeout);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}