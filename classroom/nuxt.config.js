export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'classroom',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            },
            {
                rel: "stylesheet",
                href: "https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            },
            {
                rel: "stylesheet",
                href: "/js/spinkit.css"
            },
            {
                rel: "stylesheet",
                href: "/js/dataTables.bootstrap4.css"
            },

            {
                rel: "stylesheet",
                href: "/js/daterangepicker.css"
            },
            {
                rel: "stylesheet",
                href: "/js/summernote-bs4.css"
            },
            {
                rel: "stylesheet",
                href: "/js/prism.css"
            },
        ],
        script: [
            { src: "https://code.jquery.com/jquery-3.3.1.min.js" },
            { src: "/js/jquery.validate.js" },
            // src: "http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js" },
            {
                src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            },
            {
                src: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            },
            {
                src: "https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js"
            },
            {
                src: "/js/stisla.js"
            },
            {
                src: "/js/scripts.js"
            },
            { src: "/js/custom.js" },
            { src: "/js/moment.min.js" },
            { src: "/js/daterangepicker.js" },
            { src: "/js/datatables.net/js/jquery.dataTables.js" },
            { src: "/js/dataTables.bootstrap4.js" },
            { src: "/js/summernote-bs4.js" },
            { src: "/js/prism.js" },

        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["@/assets/css/style.css", "@/assets/css/components.css"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ["~/plugins/mixins"],


    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        // '@nuxtjs/eslint-module'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/auth-next',
        'vue-sweetalert2/nuxt'
    ],
    loading: '@/components/LoadingBar.vue',
    auth: {
        strategies: {
            local: {
                token: {
                    property: "data.token",
                    type: "",
                    name: "x-auth-token"
                },
                user: {
                    property: "data"
                },
                endpoints: {
                    login: {
                        url: "http://localhost:5000/auth/login",
                        method: "POST",
                        propertyName: "data.token"
                    },
                    user: {
                        url: "/auth/profile",
                        method: "GET",
                        //propertyName: false
                    },
                    logout: false
                }
            }
        }
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // baseURL: "https://fullstack-classroom.herokuapp.com"
        baseURL: "http://localhost:5000"
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: "en"
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
}