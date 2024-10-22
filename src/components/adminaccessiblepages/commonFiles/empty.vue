<template>
    <div>It is updating</div>
</template>
<script>
export default {
  name: "emptyView",
  data() {
    return {
     id:"663f0e60664ec7097cda8383",
    };
  },
  created(){
     this.$router.push(`/admindashboard/edit-client/${this.$route.params.clientId}`);
  },
  methods: {
  
  },
};
</script>