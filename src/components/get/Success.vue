<template>
    <div class="main get-tickets">
       <!-- 头部导航 -->
        <div class="buy-menu">
            <div>
                <em>1</em>
                <span>选择方式</span>
                <i></i>
            </div>
            <div>
                <em>2</em>
                <span>取票</span>
                <i></i>
            </div>
            <div class="cur">
                <em>3</em>
                <span>取票成功</span>
            </div>
        </div>

        <!-- success -->
        <div class="success">
              <div class="aboutus">
                  <img src="../../assets/aboutus.png">
                  <p>关注我们，<em>自助游玩</em>更舒心</p>
              </div>
              <h2>取票成功</h2>
              <h3>祝您游玩愉快！</h3>
              <span><em>{{ time }}</em>&nbsp;秒后自动回到首页</span>
        </div>

        <!-- 按钮世界 -->
        <div class="buy-btn">
            <router-link class="gotoget-btn" :to="{ name: 'getmenu'}"></router-link>
            <router-link class="backhome-2-btn" :to="{ name: 'home'}"></router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'success',
        data () {
            return {
                time: 20
            }
        },
        mounted () {

            let t = setInterval(() => {
                if(this.time === 0){
                    clearInterval(t);
                    this.$router.push({name:'home'}); // 去首页
                }else{
                    this.time = this.time - 1
                }
            },1000);

            return this.time
        }
    }
</script>
<style lang="less">
    //
</style>