const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export const state = () => {
    return {
        listUsers: [],
        current: {
            id: "",
            name: "",
            password: "",
            email: "",
            place_birth: "",
            birthdate: "",
            last_study: "",
            institution: "",
            password: "",
            current_job: "",
            sosmed: "",
            phone: "",
            role: "",
        }
    };
};

export const mutations = {
    setClass(state, listClass) {
        state.listClass = listClass;
    },
    setCurrent(state, currentUser) {
        state.current = currentUser;
    }
};

export const actions = {
    setRegister({ commit }, data) {
        commit("setRegister", data.reverse());
    },

    async registerUser(vuexContext, user) {
        await this.$axios.$post(`${this.$axios.defaults.baseURL}/users`, user, { headers: headers })
            .then((response) => {
                console.log(response);

                this.$swal(
                    "Pendaftaran Berhasil",
                    "Silahkan login di sistem kami.",
                    "success"
                );
                this.$router.push("/login");

            })
            .catch(e => {
                console.log(e.response);
                this.$swal(
                    "Pendaftaran Gagal",
                    `${e.response.data.message}`,
                    "error"
                );

            })

    },
}