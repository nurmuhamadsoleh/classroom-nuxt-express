<template>
  <div>
    <PartialsTitle title="Class" />
    <div class="row">
    <div class="col-md-4" v-for="(item,i) in listClass" :key="i">
        <class-item-2 :title="item.name" :id="item.id" :description="item.description" :img="item.photo">
          <template v-slot:footer>
            <p ><b>Diikuti sebanyak : {{item.join_classes? item.join_classes.reduce((sum , a) => sum + a.jumlah_join , 0): 0}} Orang</b></p>
            <p><b>Pemateri : {{item.join_classes ? item.join_classes.map( (a,i) => { if (a.user.role === "tutor"){return a.user.name} } ).join() : 'Belum ada pengajar' }}</b></p>
           
          </template>
        </class-item-2>
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

    console.log(this.$store.state.class.listClass);
  },
  computed: {
    listClass() {
      return this.$store.state.class.listClass;
    },
  },
  async fetch() {
    //if (!this.listClass.length) {
      const req = await this.requestGet({ endpoint: `class/join/users/${this.$auth.user.id}` });
      this.$store.dispatch("class/setClass", req.data)
    location.reload()
      
      // this.SET_CLASS(req.data);
    // ;
      // this.SET_CLASS(req.data);
    //}
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
  },
};
</script>