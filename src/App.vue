<template>
  <div id="app">
    <app-header></app-header>
    <app-main></app-main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppMain from './components/AppMain'
import AppFooter from './components/AppFooter'

export default {
  name: 'app',
  components: {
    AppHeader,AppMain,AppFooter
  }
}
</script>

<style>
#app {
  
}
</style>
