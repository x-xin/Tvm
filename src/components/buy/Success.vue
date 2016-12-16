<template>
    <div class="main buy-tickets">
       <!-- 头部导航 -->
        <div class="buy-menu">
            <div>
                <em>1</em>
                <span>验证身份</span>
                <i></i>
            </div>
            <div>
                <em>2</em>
                <span>选择门票</span>
                <i></i>
            </div>
            <div class="cur">
                <em>3</em>
                <span>购票成功</span>
            </div>
        </div>

        <!-- success -->
        <div class="success">
              <div class="aboutus">
                  <img src="../../assets/aboutus.png">
                  <p>关注我们，<em>自助游玩</em>更舒心</p>
              </div>
              <h2>购票成功</h2>
              <h3>祝您游玩愉快！</h3>
              <span><em>{{ time }}</em>&nbsp;秒后自动回到首页</span>
        </div>

        <!-- 按钮世界 -->
        <div class="buy-btn">
            <router-link class="gotobuy-btn" :to="{ name: 'validate'}"></router-link>
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
            let _this = this
            let control = function(){
                if(_this.time === 0){
                    clearInterval(t);
                    _this.$router.push({name:'home'}); // 去首页
                }else{
                    _this.time = _this.time - 1
                }
            }

            let t = setInterval(control,1000);

            return this.time
        }
    }
</script>
<style lang="less">
    @import '../../less/lib/mixins.less';
    .success{
        height: 510px;
        width: 800px;
        margin: 0 auto;
        position: relative;
        padding-top: 200px;
        .aboutus{
            position: absolute;
            top: 200px;
            left: 50px;
            img{
                display: block;
                border:1px solid #d5d5d5;
                margin-left: 30px;
                .border-radius(5px);
            }
            p{
                font-size: 20px;
                text-align: center;
                color: #666;
                line-height: 60px;
                em{
                    color: #ff9400;
                }
            }
        }
        h2{
            margin-left: 300px;
            text-align: center;
            color: #ff9400;
            font-size: 56px;
            font-weight: bold;
        }
        h3{
            margin-left: 300px;
            text-align: center;
            color: #666666;
            font-size: 56px;
            font-weight: normal;
        }
        span{
            display: block;
            margin-left: 300px;
            margin-top: 26px;
            color: #999;
            font-size: 20px;
            text-align: center;
            em{
                font-weight: bold;
                color: #ff9400;
            }
        }
    }
</style>