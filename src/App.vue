<template>
  <div class="app">
    <header1></header1>
    <router-view></router-view>
    <footer1 v-if="$route.meta.show"></footer1>
  </div>
</template>

<script>
import Header1 from "./components/Header/index.vue";
import Footer1 from "./components/Footer/index.vue";

export default {
  components: {
    Header1,
    Footer1,
  },
  mounted() {
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
@import url("../public/reset.css");
</style>
