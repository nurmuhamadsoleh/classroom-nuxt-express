<template>
  <div>
    <PartialsTitle title="SANDBOX" />
    <div class="row">
      <div class="col-md-4">
        <FormInput name="buku" :val="inputBook" @value="(val)=>inputBook=val">
          <button class="btn btn-outline-primary rounded-pill" @click="addBook">tambah</button>
        </FormInput>
        <br>
        <br>
        <AtomsCard>
          <template v-slot:right>
            <atoms-list :list="bookList" />
          </template>
        </AtomsCard>
      </div>
      <div class="col-md-4"></div>
      <div class="col-md-4"></div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputBook: "",
      bookList: ["habis gelap terang"],
      reader: [],
      reading: [],
    };
  },
  methods: {
    addBook() {
      this.bookList = [...this.bookList, this.inputBook];
    },
    delete(i) {},
  },
};
</script>