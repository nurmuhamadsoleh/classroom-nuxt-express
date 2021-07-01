export const state = () => {
    return {
        listClass: [],
        current: {
            id: "",
            code: "",
            name: "",
            dateStart: "",
            dateEnd: "",
            description: "",
            photo: "",
            createdAt: "",
            updatedAt: "",
            join_classes: [],
            students: [],
            spv: [],
            tutors: []
        }
    };
};

export const mutations = {
    setClass(state, listClass) {
        state.listClass = listClass;
    },
    setCurrent(state, currentClass) {
        state.current = currentClass;
    }
};

export const actions = {
    setClass({ commit }, data) {
        commit("setClass", data.reverse());
    }
};