<template>
  <div>
    <partials-title />
    <h1>Profile</h1>
  </div>
</template>
<script>
export default {
  created() {
    console.log(this.$route);
  },
};
</script>
