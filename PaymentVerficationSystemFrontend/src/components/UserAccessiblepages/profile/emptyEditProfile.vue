<template>
    <div class="mb-96">It is updating</div>
</template>
<script>
export default {
  name: "emptyView",
  data() {
    return {
     //id:"663f0e60664ec7097cda8383",
    };
  },
  mounted(){
    console.log("empty called")
    this.$router.push({
  path: `/userdashboard/profile`,
  query: { formEmptyEditProfile: true },
});
  },
  methods: {
  
  },
};
</script>