<template>
    <div>It is updating</div>
</template>
<script>
export default {
  name: "emptyView",
  data() {
    return {
     //id:"663f0e60664ec7097cda8383",
    };
  },
  created(){
    console.log("empty called")
    this.$router.push({
  path: `/userdashboard/edit-client/${this.$route.params.clientId}`,
  query: { formEmptyEditProfile: true },
});
  },
  methods: {
  
  },
};
</script>