<template>
  <div>
    <PartialsTitle title="Class Management" />
    <div class="row">
      <div class="col-md-12">
       <div class="card">
                  <div class="card-header">
                    <h4>Data Materi Kelas {{namakelas}} pada  {{ namaschedule }} </h4>                 
                      <div v-if="$auth.user.role == 'spv'"> 
                       <nuxt-link  :to="'/material/add/' + this.$route.params.id" class="btn btn-icon btn-danger">ADD DATA</nuxt-link>
                      </div>
                      <nuxt-link to="/manage" class="btn btn-icon btn-info">List of Classes</nuxt-link>
                      <nuxt-link :to="'/schedule/'+class_id" class="btn btn-icon btn-warning">List of Schedules</nuxt-link>                   
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped" id="table-1">
                        <thead>
                          <tr>
                            <th class="text-center">
                              #
                            </th>      
                            <th>Name</th>
                            <th>Download File</th> 
                            <th>Action</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,i) in list" :key="i">
                           <td>{{ i+1}}</td>
                           <td>{{ item.name}}</td>
                           <td>
                              <div v-if="item.file">
                                <a :href="`${$axios.defaults.baseURL}/file/`+item.file" class="btn btn-md btn-danger" target="_blank">View</a>
                              </div>
                            </td>
                          
                           <td>
                              <div v-if="$auth.user.role == 'spv'"> 
                              <nuxt-link :to="'/material/edit/'+ item.id" class="btn btn-icon btn-primary"><i class="far fa-edit"></i></nuxt-link>
                              <button @click="deleteData(item.id)" class="btn btn-icon btn-danger"><i class="far fa-trash-alt"></i></button>
                           </div>
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
import { mapMutations, mapActions } from "vuex";
import request from "~/mixins/request";
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

      this.getMaterials();
      this.getSchedule();

  },

  data(){
   return {
      list : [{}],
      namakelas : "",
      class_id: "",
      namaschedule : ""
    }
  },

  computed: {
 
  },
  async fetch() {
    
  },
  methods: {
    
    async deleteData(id){
      // console.log(id);
          const { isConfirmed } = await this.konfirm("Apakah Yakin Menghapus Data Ini ??");
                if (isConfirmed) {
                  await this.$axios.delete(`/materials/${id}`)
                      .then((response) => {
                        // console.log(response);
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
                                     // console.log(error);
                                      this.$swal(
                                          `${error.response.data.message}`,
                                          "error"
                                    );
                                })
                     } 
            },

          async getMaterials() {
              const req = await this.$axios.$get(`/materials/schedule/${this.$route.params.id}`);
              console.log(req.data);
              this.list = req.data
          },

           async getSchedule() {
             const req = await this.$axios.$get(`/schedules/${this.$route.params.id}`);
             this.namaschedule = req.data[0].name;
             this.namakelas = req.data[0].class.name;
             this.class_id = req.data[0].class_id;    
          },
  },
};
</script>