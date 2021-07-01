<template>
  <div class="container text-center">
    <div v-if="error.statusCode === 404">
      <img class="w-100" src="https://www.kindpng.com/picc/m/255-2550433_404-error-png-transparent-png.png" alt="" srcset="">
    </div>
    <h1 v-else>An error occurred</h1>
    <NuxtLink  to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "clear", // you can set a custom layout for the error page
};
</script>