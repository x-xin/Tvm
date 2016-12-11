<template>
  <div id="app">
    <app-swipe></app-swipe>
    <app-main></app-main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppSwipe from './components/AppSwipe'
import AppMain from './components/AppMain'
import AppFooter from './components/AppFooter'

export default {
  name: 'app',
  components: {
    AppSwipe,AppMain,AppFooter
  }
}
</script>

<style lang="less">
@import "./less/style.less";
#app {

}
</style>
