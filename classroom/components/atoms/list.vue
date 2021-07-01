<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in list" :key="item">{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    list: { type: Array, default: () => [] },
  },
};
</script>