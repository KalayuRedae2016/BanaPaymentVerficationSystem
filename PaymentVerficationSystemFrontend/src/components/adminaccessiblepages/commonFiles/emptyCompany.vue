<template>
    <div>It is updating</div>
</template>
<script>
export default {
  name: "emptyView",
  data() {
    return {
    
    };
  },
  created(){
    this.$router.push({
  path: "/admindashboard/display-companey",
  query: { fromEmpty: true },
});

  },
  methods: {
  
  },
};
</script>