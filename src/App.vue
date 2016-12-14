<template>
    <div id="app">
        <app-swipe></app-swipe>
        <!-- <transition name="fade"> -->
            <router-view></router-view>
        <!-- </transition> -->
        <app-footer></app-footer>
    </div>
</template>

<script>
import AppSwipe from './components/AppSwipe'
import AppFooter from './components/AppFooter'

export default {
  name: 'app',
  components: {
    AppSwipe,AppFooter
  }
}
</script>

<style lang="less">
    @import "./less/style.less";
    // common
    .main{
        width: 100%;
        height: 1000px;
        overflow:hidden;
    }

    /* fade */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }

</style>
