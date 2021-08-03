<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
  export default {
    data() {
        return {
        }
    },
    mounted() {
      window.addEventListener('unload', this.saveState)
    },
    methods: {
      saveState() {
        sessionStorage.setItem('state', JSON.stringify(this.$store.state))
      }
    }
  };
</script>
