<template>
  <div class="card">
    <div class="card-header">
      <nuxt-link :to="'/class/'+id">
        <img :src="`${$axios.defaults.baseURL}/foto/`+img" class="card-img-top" width="200" height="300" alt="...">
      </nuxt-link>
    </div>
    <div class="card-body">
      <nuxt-link :to="'/class/'+id">
        <h5 class="card-title">{{title}}</h5>
      </nuxt-link>
      <p class="text-justify">{{description.substring(0,50)+" ..."}}</p>
      <section v-if="homeworks.length">
        <h5>homework</h5>
        <ul>
          <li v-for="(homework,i) in homeworks" :key="i"> {{homework.title}}</li>
        </ul>
      </section>
    </div>
    <div class="card-footer text-muted">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    img: {
      type: String,
      default:
        "https://yt3.ggpht.com/ytc/AAUvwngrTf_qFckFdeunyxbVBvrfaNZDua_fN78eqeDY=s900-c-k-c0x00ffffff-no-rj",
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "0",
    },
    homeworks: {
      type: Array,
      default: () => [],
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>