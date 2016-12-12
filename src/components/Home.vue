<template>
    <div class="main home">
        <h2>欢迎光临</h2>
        <h1>山西博物馆</h1>
        <div class="menu">
            <router-link :to="{ name: 'buytickets'}"><img src="../assets/set-btn.png" width="100%" height="100%;"></router-link>
            <router-link :to="{ name: 'gettickets'}"><img src="../assets/get-btn.png" width="100%" height="100%;"></router-link>
        </div>
        <p>温馨提示：若您在自助购票/取票过程中遇到问题</p>
        <p>请拨打电话 0351-8789015</p>
    </div>
</template>
<script>
    export default {
        name: 'home',
        data () {
            return {

            }
        }
    }
</script>
<style lang="less">
    @import '../less/lib/base.less';
    .home{
        h1,h2{
            color: #fff;
            font-weight: bold;
            font-size: 66px;
            color: #666;
            text-align: center;
            line-height: 100px;
        }
        h2{
            margin-top: 25px;
            font-size: 36px;
            line-height: 60px;
        }
        .menu{
            width: 850px;
            height: 372px;
            margin: 170px auto;
            clear: both;
            a{
                float: left;
                display: block;
                width: 372px;
                height: 372px;
                &:last-child{
                    margin-left: 106px;
                }
            }
        }
        p{
            text-align: center;
            font-size: 26px;
            color: #666;
            line-height: 50px;
        }
    }
</style>