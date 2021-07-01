<template>
  <div>
    <PartialsTitle title="Class Management" />
    <div class="row">
      <div class="col-md-12">
       <div class="card">
                  <div class="card-header">
                    <h4>Add Data Class</h4>
                    <div class="floating-right">
                       <nuxt-link to="/manage" class="btn btn-icon btn-danger">List of Classes</nuxt-link>
                    </div>
                     
                  </div>

                <form @submit.prevent="store" >
                  <div class="card-body">
                    <div class="form-group">
                      <label>Class Code</label>
                      <input type="text" v-model="classes.code" class="form-control purchase-code" placeholder="Input Code">
                    </div>
                    <div class="form-group">
                      <label>Class Name</label>
                      <input type="text" v-model="classes.name" class="form-control" placeholder="Input Name">
                    </div>
                    <div class="form-group">
                      <label>Class Photo</label>
                      <input type="file" class="form-control" accept="image/*" @change="onFileChanged" >
                     
                    </div>
                   <div class="form-group ">
                      <label >Description</label>
                        <textarea class="summernote" id="description"></textarea>
                    </div>
                    <div class="form-group">
                      <label>Date Start</label>
                      <input type="text" id="date_start" v-model="classes.date_start" class="form-control datepicker" placeholder="Input Date Start" >
                    </div>
                      <div class="form-group">
                      <label>Date End</label>
                      <input type="text"  id="date_end" v-model="classes.date_end" class="form-control datepicker" placeholder="Input Date End">
                    </div>

                     <div class="form-group ">
                        <button type="submit" class="form-control col-md-2 btn btn-primary">Save</button>
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

export default {

 mounted(){
      
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 2000)
    })
  
  if(jQuery().summernote) {
    $(".summernote").summernote({
       dialogsInBody: true,
      minHeight: 250,
    });
    $(".summernote-simple").summernote({
       dialogsInBody: true,
      minHeight: 150,
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough']],
        ['para', ['paragraph']]
      ]
    });
  }

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
    }
  },
   data() {
    return {
      classes : {
        name : "",
        code : "",
        // date_start: "",
        // date_end: "",
        description : "",
        file : null
      }
    }
  },
  
  methods: {
    
     async store() {
      
        this.$nuxt.$loading.start()
        const  date_start = $('#date_start').val();
        const  date_end = $('#date_end').val();
        const  description = $($('#description').summernote("code")).text();
        const dataClass = new FormData
        dataClass.set('name', this.classes.name)
        dataClass.set('code', this.classes.code)
        dataClass.set('date_start', date_start)
        dataClass.set('date_end', date_end)
        dataClass.set('photo', this.classes.file)
        dataClass.set('description',description)  
  
         await this.$axios.post('/class',dataClass, { headers: headers })
          .then((response) => {
            this.$nuxt.$loading.finish()
           console.log(response);

                this.$swal(
                    "Data is saved.",
                    "success"
                );
                this.$router.push("/manage");
              
          })
          .catch(error => {
            this.$nuxt.$loading.finish()
           console.log(error.response);
                this.$swal(
                    "Save Gagal",
                    `${error.response.data.message}`,
                    "error"
                );
          })
      },

      onFileChanged(event){
      this.classes.file= event.target.files[0]
     
    },
  },
};
</script>