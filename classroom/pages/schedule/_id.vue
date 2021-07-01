<template>
  <div>
    <PartialsTitle title="Class Management" />
    <div class="row">
      <div class="col-md-12" >
       <div class="card">
                  <div class="card-header">
                    <h4>Data Schedule Kelas {{namakelas}}</h4>
                    
                      <div v-if="$auth.user.role == 'spv'"> 
                       <nuxt-link :to="'/schedule/add/' + this.$route.params.id" class="btn btn-icon btn-danger">ADD DATA</nuxt-link>
                      </div>
                      <div class="float-right">
                          <nuxt-link to="/manage" class="btn btn-icon btn-danger">List of Classes</nuxt-link>
                      </div>
                     
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="table-1">
                        <thead>
                          <tr>
                            <th class="text-center">
                              #
                            </th>      
                            <th>Code</th>
                            <th>Name</th>
                            <th>Date Start</th>
                            <th>Date End</th>         
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,i) in list" :key="i">
                           <td>{{ i+1}}</td>
                           <td>{{ item.code}}</td>
                           <td>{{ item.name}}</td>
                           <td>{{ formatDate(item.start)}}</td>
                           <td>{{ formatDate(item.end) }}</td>
                           <td>
                             <div v-if="$auth.user.role == 'spv'"> 
                                <nuxt-link :to="'/schedule/edit/'+ item.id" class="btn btn-icon btn-primary"><i class="far fa-edit"></i></nuxt-link>
                                <button @click="deleteData(item.id)" class="btn btn-icon btn-danger"><i class="far fa-trash-alt"></i></button>
                             </div>
                             <nuxt-link :to="'/material/'+ item.id" class="btn btn-icon btn-success">Materials</nuxt-link>
                           </td>
                          </tr>
                         
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
      </div>
    </div>
  </div>
</template>
<script>
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

          $("#table-1").dataTable({
            "columnDefs": [
              { "sortable": false, "targets": [2,3] }
            ]
          });

          this.getSchedule();
    },
  computed: {
    
  },
  data() {
    return {
      list : [{}],
      namakelas : ""
    }
  },
  methods: {
    
    
    async deleteData(id){
      console.log(id);
          const { isConfirmed } = await this.konfirm("Apakah Yakin Menghapus Data Ini ??");
                if (isConfirmed) {
                  await this.$axios.delete(`/schedules/${id}`)
                      .then((response) => {
                        console.log(response);
                            this.$swal({
                                  title: 'Success!',
                                  text: `${response.data.message}`,
                                  icon: 'success',
                                  timer: 5000,
                                  showConfirmButton: false,
                                  showCancelButton: false,
                                  buttons: false,
                                  }).then(function() {
                                        location.reload();
                                  });

                              }).catch(error => {
                                  this.$nuxt.$loading.finish()
                                      console.log(error);
                                      this.$swal(
                                          `${error.response.data.message}`,
                                          "error"
                                    );
                                })
                     } 
            },

            async getSchedule() {
              const req = await this.$axios.$get(`/schedules/class/${this.$route.params.id}`);
               console.log(req.data[0].class);
             this.namakelas = req.data[0].class.name;
             this.list = req.data
              if (req.success) {
                this.$store.dispatch("schedule/setList", req.data);
            }
             
          },

          formatDate(dateString) {
            const date = dayjs(dateString);
                // Then specify how you want your dates to be formatted
            return date.format('LLLL', "Asia/Jakarta");
        }

  },
};
</script>