<template>
  <nuxt-link class="card w-100" :to="'/class/'+id">
    <img src="https://yt3.ggpht.com/ytc/AAUvwngrTf_qFckFdeunyxbVBvrfaNZDua_fN78eqeDY=s900-c-k-c0x00ffffff-no-rj" class="card-img-top w-100" alt="...">
    <div class="card-body">
      <p class="card-text">
        {{desc}}
      </p>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    desc: {
      type: String,
      default: "Kelas Fullstack",
    },
    id: {
      type: Number,
      default: 1,
    },
  },
};
</script>