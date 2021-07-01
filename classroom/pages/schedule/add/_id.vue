<template>
  <div>
    <PartialsTitle title="Class Management" />
    <div class="row">
      <div class="col-md-12">
       <div class="card">
                  <div class="card-header">
                    <h4>Add Data Schedule</h4>
                    <div class="floating-right">
                       <nuxt-link to="/manage" class="btn btn-icon btn-danger">List of class</nuxt-link>
                      <nuxt-link :to="'/schedule/'+this.$route.params.id" class="btn btn-icon btn-info">List of Schedules</nuxt-link>
                    </div>
                  </div>
                  
                  <form @submit.prevent="store" >
                  <div class="card-body">
                    <div class="form-group">
                      <label>Code</label>
                      <input type="text" class="form-control purchase-code"  v-model="schedule.code" placeholder="Input Code">
                    </div>
                    <div class="form-group">
                      <label>Name</label>
                      <input type="text" class="form-control"  v-model="schedule.name" placeholder="Input Name">
                    </div>
                   
                    <div class="form-group">
                      <label>Date Start</label>
                      <input type="text"  id="date_start" v-model="schedule.date_start" class="form-control " >
                    </div>
                      <div class="form-group">
                      <label>Date End</label>
                      <input type="text"  id="date_end" v-model="schedule.date_end" class="form-control" >
                    </div>

                     <div class="form-group ">
                        <button class="form-control col-md-2 btn btn-primary">Save</button>
                    </div>
                  </div>
                  </form>
                </div>
      </div>
    </div>
  </div>
</template>
<script>

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}


import { mapMutations, mapActions } from "vuex";
import request from "~/mixins/request";
export default {
  mixins: [request],
 mounted(){
       
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
 
    
      $('#date_start').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        applyClass: 'bg-slate-600',
        cancelClass: 'btn-light',
        locale: {
            format: 'YYYY-MM-DD HH:mm:ss'
        }
      });

       $('#date_end').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        applyClass: 'bg-slate-600',
        cancelClass: 'btn-light',
        locale: {
            format: 'YYYY-MM-DD HH:mm:ss'
        }
      });
    
    
 },
  data() {
    return {
      schedule : {
        name : "",
        code : "",
        start : "",
        end : "",
        class_id : this.$route.params.id
      }
    }
  },
  computed: {

    
  },
  async fetch() {
   
  },
  methods: {
    
    async store() {
      
        this.$nuxt.$loading.start()
        const  date_start = $('#date_start').val();
        const  date_end = $('#date_end').val();
        this.schedule.start = date_start
        this.schedule.end = date_end
         await this.$axios.post('/schedules',this.schedule, { headers: headers })
          .then((response) => {
            this.$nuxt.$loading.finish()
           console.log(response);

                this.$swal(
                    `${response.data.message}`,
                    "success"
                );
                this.$router.push("/schedule/"+this.$route.params.id );
              
          })
          .catch(error => {
            this.$nuxt.$loading.finish()
           console.log(error);
                this.$swal(
                    "Penyimpanan Gagal",
                    `${error.response.data.message}`,
                    "error"
                );
          })
      },

  },
};
</script>