<template>
  <div>
    <PartialsTitle title="Selamat Datang di Aplikasi Classroom , Silahkan pilih kelas yang diminati !" />
    <div class="row">
      <div class="col-md-4" v-for="(item,i) in listClass" :key="i">
        <class-item-2 :title="item.name" :id="item.id" :description="item.description" :img="item.photo">
          <template v-slot:footer>
            <p ><b>Diikuti sebanyak : {{item.join_classes? item.join_classes.reduce((sum , a) => sum + a.jumlah_join , 0): 0}} Orang</b></p>
            <p><b>Pemateri : {{item.join_classes ? item.join_classes.map( (a,i) => { if (a.user.role === "tutor"){return a.user.name} } ).join() : 'Belum ada pengajar' }}</b></p>
                  <div v-if="item.join_classes.length > 0">
                          <div v-if="item.join_classes.filter( vendor => vendor.user.name === $auth.user.name ).length === 0">
                            <center><button @click="entryClass(item)" class="btn btn-lg btn-danger" type="button">Join Kelas</button></center>
                          </div>
                  </div> 
                  <div v-else-if="item.join_classes.length === 0">
                      <center><button @click="entryClass(item)" class="btn btn-lg btn-danger" type="button">Join Kelas</button></center> 
                  </div>
                
            
          </template>
        </class-item-2>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
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
 

  },
   data() {
    return {
      join : {
          users_id: "",
          class_id: "",
          role: "",
      },
      username : {},
      listdata : []
    }
  },
  computed: {
    listClass() {
      return this.$store.state.class.listClass;
    },
  },
  async fetch() {
    const req = await this.requestGet({ endpoint: "class/join/classes" });
    this.$store.dispatch("class/setClass", req.data);
    location.reload()
  },
  
  methods: {
    ...mapMutations({
      SET_CLASS: "class/setClass",
    }),
    ...mapActions({
      SET_CLASS: "class/SET_CLASS",
    }),
    async entryClass({ name, id }) {
      console.log(this.$auth.strategy.token.get());
      console.log(id);
      const { isConfirmed } = await this.konfirm("masuk ke kelas " + name);
      if (isConfirmed) {
         this.$nuxt.$loading.start()
        
        this.join.class_id = id;
        this.join.users_id = this.$auth.user.id;
        this.join.role = this.$auth.user.role;
         await this.$axios.post('/class/join',this.join, { headers: headers })
         
          .then((response) => {
            this.$nuxt.$loading.finish()
            console.log(response);
                if (response.data.success) {
                  this.$swal(
                    `${response.data.message}`,
                    "success"
                );
               this.$router.push("class/" + id);
                } else {
                   this.$swal(
                    `${response.data.message}`,
                    "error"
                );
                }
                
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
        
      }
    },

   
  },
};
</script>