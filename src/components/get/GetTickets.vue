<template>
    <div class="main gettickets">
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
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'gettickets',
        data () {
            return {

            }
        }
    }
</script>
<style lang="less">

    .style-choice{
        div{
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