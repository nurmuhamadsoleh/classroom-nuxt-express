<template>
  <div>
    <PartialsTitle title="Class Management" />
    <div class="row">
      <div class="col-md-12">
       <div class="card">
                  <div class="card-header">
                    <h4>View Data Class</h4>
                    <div class="floating-right">
                       <nuxt-link to="/manage" class="btn btn-icon btn-danger">List of Classes</nuxt-link>
                    </div>
                     
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                      <label>Class Code</label>
                      <p>{{ classes.code }}</p>
                    </div>
                    <div class="form-group">
                      <label>Class Name</label>
                      <p>{{ classes.name }}</p>
                    </div>
                    <div class="form-group ">
                      <label>Class Photo</label>
                      <div class="col-md-4"> 
                     <img :src="`${$axios.defaults.baseURL}/foto/`+classes.photo" class="card-img-top w-5 h-5"  alt="...">
                      </div>
                    </div>
                   <div class="form-group ">
                      <label >Description</label>
                        <p>{{ classes.description }}</p>
                    </div>
                    <div class="form-group">
                      <label>Date Start</label>
                      <p>{{ classes.date_start }}</p>
                    </div>
                      <div class="form-group">
                      <label>Date End</label>
                       <p>{{ classes.date_end }}</p>
                    </div>

                  </div>
                </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
 
 mounted(){
   
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
  
    //get data post by ID
    this.$axios.get(`/class/${this.$route.params.id}`)
        .then(response => {
          console.log(response.data.data[0].name);
          this.classes.name  = response.data.data[0].name,
          this.classes.code  = response.data.data[0].code,
          this.classes.date_start  = response.data.data[0].date_start,
          this.classes.date_end  = response.data.data[0].date_end,
          this.classes.description  = response.data.data[0].description,
          this.classes.photo  = response.data.data[0].photo
    })

  },
  computed: {

    
  },
  data() {
    return {
      classes : {
        name : "",
        code : "",
        date_start: "",
        date_end: "",
        description : "",
        photo : ""
      }
    }
  },
  methods: {
      
  },
};
</script>