<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-1 text-center">
          <div class="badge badge-warning text-center rounded-circle mt-3">
            <img :src="`${$axios.defaults.baseURL}/foto/`+img" class="card-img-top w-50" alt="Foto Class">
          </div>
        </div>
        <div class="col-10">
          <h5>{{title}}</h5>
          <p>{{data.start}} - {{data.end}}</p>
        </div>
        <div class="col-1 text-center">
          <i class="fas fa-ellipsis-v mt-3"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        id: "",
        name: "",
        code: "",
        start: "",
        end: "",
        ClassId: "",
        Materials: [],
      }),
    },
  },
};
</script>