<template>
  <div id="app">
    <employee-manager></employee-manager>
  </div>
</template>

<script>
import EmployeeManager from './components/EmployeeManager.vue';

export default {
  name: 'App',
  components: {
    EmployeeManager
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
