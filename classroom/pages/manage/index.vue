<template>
  <div>
    <PartialsTitle title="Class Management" />
    <div class="row">
      <div class="col-md-12" >
       <div class="card">
                  <div class="card-header">
                    <h4>Data Class</h4>
                    <div class="float-right">
                      <div v-if="$auth.user.role == 'spv'"> 
                         <nuxt-link to="manage/add" class="btn btn-icon btn-danger">ADD DATA</nuxt-link>
                      </div>
                      
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
                             <th>Image</th>
                            <th>Code</th>
                            <th>Class Name</th>
                            <th>Date Start</th>
                            <th>Date End</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                          <tr v-for="(item,i) in listClass" :key="i">
                            
                           <td>{{ i+1}}</td>
                           <td><img :src="`${$axios.defaults.baseURL}/foto/`+item.photo" class="card-img-top w-5 h-5"  alt="..."></td>
                           <td>{{ item.code}}</td>
                           <td>{{ item.name}}</td>
                           <td>{{ item.date_start}}</td>
                           <td>{{ item.date_end}}</td>
                           <td>{{item.description.substring(0,130)+" ..."}}</td>
                           <td>
                            <nuxt-link :to="'manage/show/'+ item.id" class="btn btn-icon btn-warning"><i class="far fa-eye"></i></nuxt-link>
                                  <div v-if="$auth.user.role == 'spv'"> 
                                    <nuxt-link :to="'manage/edit/'+ item.id" class="btn btn-icon btn-primary"><i class="far fa-edit"></i></nuxt-link>
                                    <br>
                                    <button @click="deleteData(item.id)" class="btn btn-icon btn-danger"><i class="far fa-trash-alt"></i></button>
                                  </div>
                             <nuxt-link :to="'schedule/'+ item.id" class="btn btn-icon btn-success">Schedule</nuxt-link>
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
  },
  computed: {
    listClass() {
      return this.$store.state.class.listClass;
    },
  },
  async fetch() {
    if (!this.listClass.length) {
      const req = await this.requestGet({ endpoint: "class" });
      // this.SET_CLASS(req.data);
      this.$store.dispatch("class/setClass", req.data);
      // this.SET_CLASS(req.data);
    }
  location.reload();
  },
  methods: {
    ...mapMutations({
      SET_CLASS: "class/setClass",
    }),
    ...mapActions({
      SET_CLASS: "class/SET_CLASS",
    }),
  
    async deleteData(id){
      console.log(id);
          const { isConfirmed } = await this.konfirm("Apakah Yakin Menghapus Data Ini ??");
                if (isConfirmed) {
                  await this.$axios.delete(`/class/${id}`)
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
}, 

}
</script>