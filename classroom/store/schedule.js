export const state = () => {
  return {
    list: []
  };
};

export const mutations = {
  setList(state, data) {
    console.log("INI MUTATION");
    state.list = data;
  }
};

export const actions = {
  setList({ commit }, data) {
    console.log("INI ACTION");
    commit("setList", data);
  }
};
