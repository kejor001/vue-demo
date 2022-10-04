<template>
  <div>
    <type-nav></type-nav>
    <list-container></list-container>
    <recommend></recommend>
    <rank></rank>
    <like></like>
    <floor></floor>
    <brand></brand>
  </div>
</template>

<script>
import ListContainer from "@/views/Home/ListContainer/index.vue";
import Recommend from "@/views/Home/Recommend/index.vue";
import Rank from "@/views/Home/Rank/index.vue";
import Like from "@/views/Home/Like/index.vue";
import Floor from "@/views/Home/Floor/index.vue";
import Brand from "@/views/Home/Brand/index.vue";

export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
};
</script>

<style>
</style>