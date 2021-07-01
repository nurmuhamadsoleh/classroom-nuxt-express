<template>
  <div id="app">
    <section class="section">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
            <div class="login-brand">
              <img src="../assets/img/stisla-fill.svg" alt="logo" width="100" class="shadow-light rounded-circle">
            </div>

            <div class="card card-primary">
              <div class="card-header"><h4>Register</h4></div>

              <div class="card-body">
                <form @submit.prevent="userRegister" id="formSubmit">
                  <div class="row">  
                    <div class="form-group col-6">
                      <FormInput name="Name" type="text" :val="register.name" @value="(val)=>register.name=val" autofocus />
                    </div>
                    <div class="form-group col-6">
                      <FormInput name="Email" type="email" :val="register.email" @value="(val)=>register.email=val" />
                    </div>
                  </div>
                  <div class="row">  
                    <div class="form-group col-6">
                      <FormInput name="Place Birth" type="text" :val="register.placeBirth" @value="(val)=>register.placeBirth=val" />
                    </div>
                    <div class="form-group col-6">
                      <!-- <FormInput name="Birth Date" id="datepicker" type="text" /> -->
                      <label for="birthdate">Birth Date</label>
                      <input id="birthdate" type="text" class="form-control datepicker" name="birthdate" >
                      <div class="invalid-feedback">
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                      <label>Phone Number</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">
                            <i class="fas fa-phone"></i>
                          </div>
                        </div>
                        <input type="text" name="phone" id="phone" class="form-control phone-number" v-model="register.phone" >
                      </div>
                    </div>

                  <div class="row">
                    <div class="form-group col-6">
                      <!-- <FormInput name="Password" type="password" id="password" class="pwstrength" data-indicator="pwindicator" :val="register.password" @value="(val)=>register.password=val" /> -->
                      <label for="password" class="d-block">Password</label>
                      <input id="password" type="password" v-model="register.password" class="form-control pwstrength" data-indicator="pwindicator" name="password">
                      <div id="pwindicator" class="pwindicator">
                        <div class="bar"></div>
                        <div class="label"></div>
                      </div>
                    </div>
                    <div class="form-group col-6">
                      <label for="password2" class="d-block">Password Confirmation</label>
                      <input id="cfmPassword" type="password" class="form-control"  data-rule-equalTo="#password" name="cfmPassword">
                    </div>
                  </div>

                   <div class="row">  
                    <div class="form-group col-6">
                      <FormInput name="Last Study" type="text" :val="register.last_study" @value="(val)=>register.last_study=val" />
                    </div>
                    <div class="form-group col-6">
                      <FormInput name="Institution" type="text" :val="register.institution" @value="(val)=>register.institution=val" />
                    </div>
                  </div>

                   <div class="row">  
                    <div class="form-group col-6">
                      <FormInput name="Current Job" type="text" :val="register.current_job" @value="(val)=>register.current_job=val" />
                    </div>
                    <div class="form-group col-6">
                      <FormInput name="Sosmed" type="text" :val="register.sosmed" @value="(val)=>register.sosmed=val" />
                    </div>
                  </div>
                  <!-- <div class="form-divider">
                    Your Home
                  </div>
                  <div class="row">
                    <div class="form-group col-6">
                      <label>Country</label>
                      <select class="form-control selectric">
                        <option>Indonesia</option>
                        <option>Palestine</option>
                        <option>Syria</option>
                        <option>Malaysia</option>
                        <option>Thailand</option>
                      </select>
                    </div>
                    <div class="form-group col-6">
                      <label>Province</label>
                      <select class="form-control selectric">
                        <option>West Java</option>
                        <option>East Java</option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-6">
                      <label>City</label>
                      <input type="text" class="form-control">
                    </div>
                    <div class="form-group col-6">
                      <label>Postal Code</label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                    -->
                  <div class="form-group">
                    <label for="password2" class="d-block">Register As</label>
                    <div class="selectgroup w-100">
                        <label class="selectgroup-item">
                          <input type="radio" name="role" v-model="register.role"  value="student" class="selectgroup-input" checked="checked">
                          <span class="selectgroup-button">Student</span>
                        </label>
                        <label class="selectgroup-item">
                          <input type="radio" name="role" v-model="register.role" value="tutor" class="selectgroup-input">
                          <span class="selectgroup-button">Tutor</span>
                        </label>                    
                    </div>
                  </div> 

                  <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <!-- <div class="simple-footer">
              Copyright &copy; Stisla 2018
            </div> -->
            
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import request from "~/mixins/request";

export default {
  mixins: [request],
  layout: "clear",
  data() {
    return {
      register: {
        email: "",
        name: "",
        placeBirth:"",
       // birthdate:"",
        password:"",
        last_study: "",
        institution: "",
        current_job: "",
        sosmed: "",
        phone: "",
        role:""
      },
      loading: false,
    };
  },
  mounted(){
    
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
  
    if(jQuery().daterangepicker) {
    if($(".datepicker").length) {
      $('.datepicker').daterangepicker({
        locale: {format: 'YYYY-MM-DD'},
        singleDatePicker: true,
      });
    }
    if($(".datetimepicker").length) {
      $('.datetimepicker').daterangepicker({
        locale: {format: 'YYYY-MM-DD HH:mm'},
        singleDatePicker: true,
        timePicker: true,
        timePicker24Hour: true,
      });
    }
    if($(".daterange").length) {
      $('.daterange').daterangepicker({
        locale: {format: 'YYYY-MM-DD'},
        drops: 'down',
        opens: 'right'
      });
    }
  }
     $("#formSubmit").validate({
           rules: {
              password: { required: true, minlength: 8,}, 
              cfmPassword: {required: true, equalTo: "#password",minlength: 8,},
              phone : {required: true, number: true,minlength:10, maxlength:15},
              email : {required: true, matches:"/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/"}
           },
    
       });
  },
  methods: {
    async userRegister() {
    
    const { isConfirmed } = await this.konfirm("Mendaftar ke Sistem");
      if (isConfirmed) {
          const test = $('#birthdate').val();
          this.$nuxt.$loading.start();
          const req = await this.requestRegister({ 
            endpoint: "users" ,
            params : {
              name: this.register.name,
              password: this.register.password,
              email: this.register.email,
              place_birth: this.register.placeBirth,
              birthdate: test,
              last_study: this.register.last_study,
              institution: this.register.institution,
              password: this.register.password,
              current_job: this.register.current_job,
              sosmed: this.register.sosmed,
              phone: this.register.phone,
              role: this.register.role,
            },
            notif : true
          });
      // this.SET_CLASS(req.data);
      console.log(req.data);
      this.$store.dispatch("register/setRegister", req.data);
      // // this.SET_CLASS(req.data);
      //     this.$store.dispatch("register/registerUser", {
      //       name: this.register.name,
      //       password: this.register.password,
      //       email: this.register.email,
      //       place_birth: this.register.placeBirth,
      //       birthdate: test,
      //       last_study: this.register.last_study,
      //       institution: this.register.institution,
      //       password: this.register.password,
      //       current_job: this.register.current_job,
      //       sosmed: this.register.sosmed,
      //       phone: this.register.phone,
      //       role: this.register.role,
            
      //     }) 
      //     .then((r)=>{
      //         this.$nuxt.$loading.finish()
      //       console.log(r)
      //     })
      //     .catch(e => {this.$nuxt.$loading.finish(); console.log(e)})
      }

    },
    
  },
};

</script>