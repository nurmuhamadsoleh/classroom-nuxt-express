<template>
  <div>
    <PartialsTitle title="Class Management" />
    <div class="row">
      <div class="col-md-12">
       <div class="card">
                  <div class="card-header">
                    <h4>Update Data Class</h4>
                    <div class="floating-right">
                       <nuxt-link to="/manage" class="btn btn-icon btn-danger">List of Classes</nuxt-link>
                    </div>
                     
                  </div>
                  <div class="card-body">
                    <form @submit="update">
                    <div class="form-group">
                      <label>Class Code</label>
                      <input type="text" class="form-control purchase-code" placeholder="Input Code" v-model="classes.code">
                    </div>
                    <div class="form-group">
                      <label>Class Name</label>
                      <input type="text" class="form-control" placeholder="Input Name" v-model="classes.name">
                    </div>
                    <div class="form-group">
                      <label>Class Photo</label>
                      <input type="file" class="form-control" accept="image/*" @change="onFileChanged">
                      <div class="col-md-4"> 
                     <img :src="`${$axios.defaults.baseURL}/foto/`+classes.photo" class="card-img-top w-5 h-5"  alt="...">
                      </div>
                    </div>
                     
                   <div class="form-group ">
                      <label >Description</label>
                        <textarea class="summernote" id="description" >
                         
                        </textarea>
                    </div>
                    <div class="form-group">
                      <label>Date Start</label>
                      <input type="text" class="form-control datepicker" id="date_start" v-model="classes.date_start">
                    </div>
                      <div class="form-group">
                      <label>Date End</label>
                      <input type="text" class="form-control datepicker"  id="date_end" v-model="classes.date_end" >
                    </div>

                     <div class="form-group ">
                        <button class="form-control col-md-2 btn btn-primary">Update</button>
                    </div>

                  </form>
                             
                  </div>
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
    if($(".daterange").length) {
      $('.daterange').daterangepicker({
        locale: {format: 'YYYY-MM-DD'},
        drops: 'down',
        opens: 'right'
      });
    }
  }

    this.$axios.get(`/class/${this.$route.params.id}`)
        .then(response => {
         // console.log(response.data.data[0]);
          this.coba = response.data.data[0]
          this.classes.name  = response.data.data[0].name,
          this.classes.code  = response.data.data[0].code,
          this.classes.date_start  = response.data.data[0].date_start,
          this.classes.date_end  = response.data.data[0].date_end,
          this.classes.description  = response.data.data[0].description,
          this.classes.photo  = response.data.data[0].photo
         $(".summernote").summernote("code",response.data.data[0].description)
    })

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
      },

      coba : {},
    }
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

    

  },
  methods: {
    ...mapMutations({
      SET_CLASS: "class/setClass",
    }),
    ...mapActions({
      SET_CLASS: "class/SET_CLASS",
    }),
    async entryClass({ name, id }) {
      const { isConfirmed } = await this.konfirm("masuk ke kelas " + name);
      if (isConfirmed) {
        this.$router.push("class/" + id);
      }
    },

    async update(e) {
        e.preventDefault()
        console.log($('#description').val());
        console.log($($('.summernote').summernote("code")).text());
        this.$nuxt.$loading.start()
        const  date_start = $('#date_start').val();
        const  date_end = $('#date_end').val();
        const  description = $('#description').val();
        const dataClass = new FormData
        dataClass.set('id', this.$route.params.id)
        dataClass.set('name', this.classes.name)
        dataClass.set('code', this.classes.code)
        dataClass.set('date_start', date_start)
        dataClass.set('date_end', date_end)
        dataClass.set('photo', this.classes.file)
        dataClass.set('description',description)  
   
         await this.$axios.put('/class',dataClass, { headers: headers })
          .then((response) => {
            this.$nuxt.$loading.finish()
           console.log(response);

                this.$swal(
                    "Data is updated.",
                    "success"
                );
               this.$router.push("/manage");
              
          })
          .catch(error => {
            this.$nuxt.$loading.finish()
           console.log(error);
                this.$swal(
                    "Update is failed",
                    `${error.data.message}`,
                    "error"
                );
          })
        
      },
      test(){
         this.classes.description= $($('.summernote').summernote("code")).text()
         console.log(this.classes.description);
      },
      onFileChanged(event){
      this.classes.file= event.target.files[0]
     
    },

  },
};
</script>