<template>
  <button type="button" :class="'btn btn-'+addClass">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    addClass: {
      type: String,
      default: "primary",
    },
  },
};
</script>