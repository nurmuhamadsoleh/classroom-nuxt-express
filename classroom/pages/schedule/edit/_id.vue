<template>
  <div>
    <PartialsTitle title="Class Management" />
    <div class="row">
      <div class="col-md-12">
       <div class="card">
                  <div class="card-header">
                    <h4>Update Schedule</h4>
                    <div class="floating-right">
                       <nuxt-link to="/manage" class="btn btn-icon btn-danger">List of Classes</nuxt-link>
                        <nuxt-link :to="'/schedule/'+schedule.class_id" class="btn btn-icon btn-info">List of Schedules</nuxt-link>
                    </div>          
                  </div>
                  <form @submit.prevent="update" >
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
                      <input type="text"  id="date_start" v-model="schedule.start" class="form-control " >
                    </div>
                      <div class="form-group">
                      <label>Date End</label>
                      <input type="text"  id="date_end" v-model="schedule.end" class="form-control" >
                    </div>
                    <input type="hidden"  v-model="schedule.class_id" class="form-control" >
                     <div class="form-group ">
                        <button type="submit" class="form-control col-md-2 btn btn-primary">Update</button>
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
import dayjs from 'dayjs';
var localizedFormat = require('dayjs/plugin/localizedFormat')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)

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

      this.$axios.get(`/schedules/${this.$route.params.id}`)
        .then(response => {
          console.log(response.data.data[0]);
          this.schedule.name  = response.data.data[0].name,
          this.schedule.code  = response.data.data[0].code,
          this.schedule.class_id  = response.data.data[0].class_id,
          this.schedule.start  = this.formatDate(response.data.data[0].start),
          this.schedule.end  = this.formatDate(response.data.data[0].end)
  })
 },
  data() {
    return {
      schedule : {
        name : "",
        code : "",
        start : "",
        end : "",
        class_id : "",
        id : this.$route.params.id
      }
    }
  },
  
  methods: {
    async update() {
      
        this.$nuxt.$loading.start()
        const  date_start = $('#date_start').val();
        const  date_end = $('#date_end').val();
        this.schedule.start = date_start
        this.schedule.end = date_end
         await this.$axios.put('/schedules',this.schedule, { headers: headers })
          .then((response) => {
            this.$nuxt.$loading.finish()
           console.log(response);

                this.$swal(
                    `${response.data.message}`,
                    "success"
                );
                this.$router.push("/schedule/"+this.schedule.class_id );
              
          })
          .catch(error => {
            this.$nuxt.$loading.finish()
           console.log(error);
                this.$swal(
                    "Pendaftaran Gagal",
                    `${error.response.data.message}`,
                    "error"
                );
          })
      },

      formatDate(dateString) {
            const date = dayjs(dateString);
                // Then specify how you want your dates to be formatted
            return date.format('YYYY-MM-DD HH:mm:ss', "Asia/Jakarta");
        }

  },
};
</script>