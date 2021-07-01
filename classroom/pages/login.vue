<template>
  <div id="app">
    <section class="section">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <div class="login-brand">
              <img src="../assets/img/stisla-fill.svg" alt="logo" width="100" class="shadow-light rounded-circle">
            </div>

              <div class="card card-primary">
                <div class="card-body text-center pb-5">
                 <div class="card-header"><h4>Login</h4></div>
                    <div class="card-body">
                      <form @submit.prevent="userLogin" class="needs-validation" novalidate="" id="formSubmit">
                        <FormInput name="Email" type="email" :val="login.email" @value="(val)=>login.email=val" class="text-left" autofocus/>
                        <FormInput name="Password" type="password" :val="login.password" @value="(val)=>login.password=val" class="text-left"/>
                        <button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                      </form>
                    </div>
                   <div class="mt-5 text-muted text-center">
                    Don't have an account? <nuxt-link to="/register">Create One</nuxt-link>
                  </div>
                </div>
              </div>

          </div>
      </div>
    </div>
    </section>
  </div>
</template>
<script>
import request from "~/mixins/request";
export default {
   mixins: [request],
  layout: "clear",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {
  this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
  })

  $("#formSubmit").validate({
      rules: {
        password: { required: true, minlength: 8,}, 
        email : {required: true, matches:"/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/"}
      }, 
  });
},
  methods: {
     
    async userLogin() {

      const { isConfirmed } = await this.konfirm("Untuk Login Sistem");
      if (isConfirmed) {
          this.$nuxt.$loading.start()
          try {
            let { data } = await this.$auth.loginWith("local", {
              data: this.login,
            });
          this.$nuxt.$loading.finish()
            if (data.success) {
              
              this.$swal(
                "Login Berhasil",
                "Selamat datang di sistem kami.",
                "success"
              );
              this.$router.push("/");
            } else {
              this.$swal(
              "Login Gagal",
                `${data.message}`,
                "error"
            );
            }
          } catch (err) {
            this.$nuxt.$loading.finish()
            console.log(err);
            this.$swal(
              "Login Gagal",
                `${err.response.data.message}`,
                "error"
            );
          }
        }
      },
  },
};
</script>