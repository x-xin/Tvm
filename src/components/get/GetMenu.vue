<template>
    <div class="main get-tickets">
        <!-- 头部导航 -->
        <div class="buy-menu">
            <div class="cur">
                <em>1</em>
                <span>选择方式</span>
                <i></i>
            </div>
            <div>
                <em>2</em>
                <span>取票</span>
                <i></i>
            </div>
            <div>
                <em>3</em>
                <span>取票成功</span>
            </div>
        </div>
        <div class="style-choice">
            <router-link class="id-card-btn" :to="{ name: 'idcard'}"></router-link>
            <router-link class="two-code-btn" :to="{ name: 'twobarcode'}"></router-link>
            <router-link class="identifying-code-btn" :to="{ name: 'code'}"></router-link>          
        </div>
        <!-- 按钮世界 -->
        <div class="buy-btn">
            <router-link class="backhome-btn" :to="{ name: 'home'}"></router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'getmenu',
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

    .style-choice{
        a{
            display: block;
            width: 370px;
            height: 160px;
            line-height: 160px;

            margin: 0 auto;
            margin-top: 60px;
            text-align: center;
            text-indent: -999999999999px;

            cursor: pointer;

            
            &.id-card-btn{
                background: url(../../assets/id-card-btn.png) no-repeat;
            }
            &.two-code-btn{
                background: url(../../assets/two-code-btn.png) no-repeat;
            }
            &.identifying-code-btn{
                margin-bottom: 70px;
                background: url(../../assets/identifying-code-btn.png) no-repeat;
            }
            
        }
    }
    
</style>