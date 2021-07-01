<script>
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
export default {
  methods: {
    konfirm(message = "") {
      return this.$swal({
        title: "Apakah kamu yakin ?",
        text: message,
        icon: "question",
        showCancelButton: true,
      });
    },
    async requestGet({ endpoint, params, notif }) {
      try {
        const req = await this.$axios.$get(endpoint, { params });
        if (req.success) {
          if (notif) this.$swal("Berhasil !", req.message, "success");
          return req;
        } else {
          this.$swal("Gagal !", req.message, "error");
          return req;
        }
      } catch (error) {
        this.$swal("ERROR !", error.toString(), "error");
      }
    },

    async requestPathGet({ endpoint, params, notif }) {
     
      try {
        const req = await this.$axios.$get(endpoint+"/"+params);
       
        if (req.success) {
          if (notif) this.$swal("Berhasil !", req.message, "success");
          return req;
        } else {
          this.$swal("Gagal !", req.message, "error");
          return req;
        }
      } catch (error) {
        this.$swal("ERROR !", error.toString(), "error");
      }
    },

    async requestRegister({ endpoint, params, notif }) {
     
      try {
        const req = await this.$axios.$post(`${this.$axios.defaults.baseURL}/${endpoint}`,params, { headers: headers });
       
        if (req.success) {
          this.$nuxt.$loading.finish()
          if (notif) this.$swal(
                    "Pendaftaran Berhasil",
                    "Silahkan login di sistem kami.",
                    "success"
                );  this.$router.push("/login");
          return req;
           
        } else {
          this.$nuxt.$loading.finish()
         this.$swal(
                    "Pendaftaran Gagal",
                    `Ulangi Pendaftaran`,
                    "error"
                );
          return req;
        }
      } catch (error) {
        this.$swal("ERROR !", error.toString(), "error");
      }
    },
  },
  
};
</script>