<template>
    <router-view></router-view>
</template>
<script>
    export default {
        name: 'buytickets',
        data () {
            return {
            }
        }
    }
</script>
<style lang="less">
    .buy-menu{
        width: 870px;
        height: 110px;
        margin: 0 auto;
        margin-top: 50px;
        clear: both;
        >div{
            float: left;
            width: 290px;
            height: 100px;
            color: #bbb;
            font-size: 36px;
            text-align: center;
            font-weight: bold;
            position: relative;
            &.cur{
                color: #109afa;
                em{
                    background-color: #109afa;
                }
            }

            em{
                position: absolute;
                top: 0;
                left: 50%;

                display: block;
                width: 44px;
                height: 44px;
                line-height: 44px;
                margin-left: -22px;

                border-radius: 50%;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;

                background-color: #bbb;
                color: #fff;
                font-weight: bold;
            }
            span{
                line-height: 140px;
            }
            i{
                position: absolute;
                top: 31px;
                right: -24px;
                width: 44px;
                height: 38px;
                background: url(../../assets/icon-arrow.png) no-repeat;
            }
        }
    }
    .buy-btn{
        height: 106px;
        line-height: 106px;
        text-align: right;
        a{
            display: inline-block;
            width: 226px;
            height: 106px;
            margin-right: 50px;
            line-height: 106px;
            text-align: center;
            cursor: pointer;
            &.cancel-btn{
                background: url(../../assets/cancel-btn.png) no-repeat;
            }
            &.backhome-btn{
                background: url(../../assets/backhome-1-btn.png) no-repeat;
            }
            &.backhome-2-btn{
                background: url(../../assets/backhome-2-btn.png) no-repeat;
            }
            &.confirm-1-btn{
                background: url(../../assets/confirm-1-btn.png) no-repeat;
            }
            &.confirm-2-btn{
                background: url(../../assets/confirm-2-btn.png) no-repeat;
            }
            &.pre-btn{
                background: url(../../assets/pre-btn.png) no-repeat;
            }
            &.gotobuy-btn{
                background: url(../../assets/gotobuy-btn.png) no-repeat;
            }
            &.gotoget-btn{
                background: url(../../assets/gotoget-btn.png) no-repeat;
            }
        }
    }
    .buy-tickets{  
        .validate{
            width: 700px;
            margin: 70px auto;

            img{
                display: block;
            }
            span{
                display: block;
                margin-top: 20px;
                text-align: center;
                height: 50px;
                line-height: 50px;
                color: #666;
                font-size: 26px;

            }
        }   
    }
</style>