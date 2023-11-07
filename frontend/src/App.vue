<template>
  <div id="app">
    <RealTimeClock />
    <router-view />
    <ChatInterface />
  </div>
</template>

<script>
import ChatInterface from './components/ChatInterface.vue';
import RealTimeClock from './components/RealTimeUserStatus.vue';
export default {
  name: 'App',
  components: {
    RealTimeClock,
    ChatInterface
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
