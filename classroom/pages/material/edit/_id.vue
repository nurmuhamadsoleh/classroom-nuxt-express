<template>
  <div>
    <PartialsTitle title="Class Management" />
    <div class="row">
      <div class="col-md-12">
       <div class="card">
                  <div class="card-header">
                    <h4>Update Material</h4>
                    <div class="floating-right">
                       <nuxt-link to="/manage" class="btn btn-icon btn-danger">List of Classes</nuxt-link>
                      <nuxt-link :to="'/schedule/'+class_id" class="btn btn-icon btn-info">List of Schedules</nuxt-link>                   
                       <nuxt-link :to="'/material/' + this.materials.schedule_id" class="btn btn-icon btn-warning">List of Materials</nuxt-link>
                    </div>
                     
                  </div>
                  <div class="card-body">
                   <form @submit.prevent="update">
                    <div class="form-group">
                      <label>Name</label>
                      <input type="text" class="form-control" placeholder="Input Name" v-model="materials.name">
                    </div>
                   
                     <div class="form-group">
                      <label>File</label>
                      <input type="file" class="form-control" accept=".pdf,.doc,.ppt" @change="onFileChanged">
                      <div v-if="materials.file !== '' ">
                          <a :href="`${$axios.defaults.baseURL}/file/`+materials.file" class="btn btn-md btn-danger" target="_blank">View</a>
                      </div>
                    </div>

                     <div class="form-group ">
                        <button type="submit" class="form-control col-md-2 btn btn-primary">Update</button>
                    </div>
                   </form>
                  </div>
                </div>
      </div>
    </div>
  </div>
</template>
<script>

import request from "~/mixins/request";


const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export default {
  mixins: [request],
 mounted(){
     
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
    
      this.$axios.get(`/materials/${this.$route.params.id}`)
        .then(response => {
          console.log(response.data.data[0]);
          this.materials.name  = response.data.data[0].name,
          this.materials.file  = response.data.data[0].file,
          this.materials.schedule_id  = response.data.data[0].schedule_id
    })

    this.getSchedule();
  
  },
  data(){
   return {
      materials : {
        name : "",
        file : "",
        id: this.$route.params.id,
        schedule_id: ""
      },
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

        async update() {
      
        this.$nuxt.$loading.start()
       
        const dataClass = new FormData
        dataClass.set('id', this.materials.id)
        dataClass.set('name', this.materials.name)
        dataClass.set('file', this.materials.file)
        dataClass.set('schedule_id', this.materials.schedule_id)
         await this.$axios.put('/materials',dataClass, { headers: headers })
          .then((response) => {
            this.$nuxt.$loading.finish()
           console.log(response);

                this.$swal(
                    "Data is saved.",
                    "success"
                );
                this.$router.push("/material/"+this.materials.schedule_id);
              
          })
          .catch(error => {
            this.$nuxt.$loading.finish()
           console.log(error.response);
                this.$swal(
                    "Update Gagal",
                    `${error.response.data.message}`,
                    "error"
                );
          })
         },

          async getSchedule() {
             const req = await this.$axios.$get(`/schedules/${this.materials.schedule_id}`);
             this.namaschedule = req.data[0].name;
             this.namakelas = req.data[0].class.name;
             this.class_id = req.data[0].class_id;    
          },

           onFileChanged(event){
              this.materials.file= event.target.files[0]    
          },
  },
};
</script>