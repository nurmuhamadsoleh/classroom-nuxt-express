<template>
  <div class="main-sidebar">
    <aside id="sidebar-wrapper">
      <div class="sidebar-brand" style="font-size:25px">
      Classroom
      </div>
      <div class="sidebar-brand sidebar-brand-sm" style="font-size:35px">
       <strong>S</strong>
      </div>
      <ul class="sidebar-menu">
        <li class="menu-header">Dashboard</li>
        <li :class="$route.path=='/'?'active':''">
          <nuxt-link class="nav-link" to="/">Home</nuxt-link>
        </li>
        <!-- <li :class="$route.path=='/profile'?'active':''">
          <nuxt-link class="nav-link" to="/profile">Profile</nuxt-link>
        </li> -->
        <li :class="$route.path=='/class'?'active':''">
          <nuxt-link class="nav-link" to="/class">My Class</nuxt-link>
        </li>
        <li :class="$route.path=='/manage'?'active':''">
          <nuxt-link class="nav-link" to="/manage">Manage Class</nuxt-link>
        </li>
        <!-- <li :class="$route.path=='/modeling'?'active':''">
          <nuxt-link class="nav-link" to="/modeling">Modeling</nuxt-link>
        </li>
        <li :class="$route.path=='/modelingKedua'?'active':''">
          <nuxt-link class="nav-link" to="/modelingKedua">Modeling Kedua</nuxt-link>
        </li> -->
      </ul>
    </aside>
  </div>
</template>
<script>
export default {
  asyncData() {},
  data() {
    return {
      nav: ["home", "profile", "login", "hehe", "hoho"],
    };
  },
};
</script>