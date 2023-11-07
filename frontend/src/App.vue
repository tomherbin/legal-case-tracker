<template>
  <div id="app">
    <RealTimeClock />
    <router-view />
  </div>
</template>

<script>
import RealTimeClock from './components/RealTimeUserStatus.vue';
export default {
  name: 'App',
  components: {
    RealTimeClock
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
