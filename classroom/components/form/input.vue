<template>
  <div class="form-group">
    <label>{{name}}</label>
    <div class="row">
      <div class="col-md-12">
        <input :type="type" class="form-control" v-model="value" :required="!noRequired">
        <div class="invalid-feedback">
          Please fill in your {{name}} correctly !
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: { type: String, default: "Default Input Text" },
    val: { type: String, default: "" },
    type: { type: String, default: "text" },
    noRequired: { type: Boolean, default: false },
  },
  computed: {
    value: {
      get() {
        return this.val;
      },
      set(value) {
        this.$emit("value", value);
      },
    },
  },
};
</script>