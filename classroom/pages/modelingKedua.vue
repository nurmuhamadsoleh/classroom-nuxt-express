<template>
  <div>
    <PartialsTitle />
    <input type="text" placeholder="Nama Lengkap" v-model="name">
    <p>{{name}}</p>
    <section>
      <input type="checkbox" v-model="isCheck" id="persetujuan">
      <label for="persetujuan"> Dengan ini saya <span v-show="!isCheck">Belum</span> setuju dengan apa yang saya isikan</label>
      <br>
      <label for="persetujuan"> Dengan ini saya {{isCheck?'':'Belum'}} setuju dengan apa yang saya isikan</label>
    </section>
    <p>{{isCheck}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      isCheck: true,
    };
  },
};
</script>