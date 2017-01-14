<template>
    <div class="main get-tickets">
        <!-- 头部导航 -->
        <div class="buy-menu">
            <div>
                <em>1</em>
                <span>选择方式</span>
                <i></i>
            </div>
            <div class="cur">
                <em>2</em>
                <span>取票</span>
                <i></i>
            </div>
            <div>
                <em>3</em>
                <span>取票成功</span>
            </div>
        </div>
        <div class="validate">
            <img src="../../assets/twoBarCode.gif" width="100%" height="100%">
            <span>请将门票二维码对准二维码扫描口</span>
        </div>
        <!-- 按钮世界 -->
        <div class="buy-btn">
            <router-link class="backhome-btn" :to="{ name: 'home'}"></router-link>
            <router-link class="pre-btn" :to="{ name: 'getmenu'}"></router-link>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'twobarcode',
        data () {
            return {

            }
        },
        mounted () {
            // 用户无操作，定时器开启，则返回首页

            clearTimeout(leaveTimer);

            leaveTimer = setTimeout(() => {

                this.$router.push({name:'home'})

            }, leaveTimerMin);

            document.body.onclick = () => {
                clearTimeout(leaveTimer);
                leaveTimer = setTimeout(() => {

                    this.$router.push({name:'home'})

                }, leaveTimerMin);
            }
        },
        destroyed () {
            // 取消定时器
            clearTimeout(leaveTimer);
        }
    }
</script>
<style lang="less">
    
</style>