<template>
  <div>
    <button type="button" class="btn btn-primary" @click="click">
      <i :class="icon"></i>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: "fas fa-plus",
    },
    click: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
<style scoped>
@import url("~/assets/css/custom.css");
button {
  position: fixed;
  bottom: 3em;
  right: 3em;
  padding: 1.5em;
  z-index: 99999;
}
i {
  font-size: 1.2em;
}
</style>