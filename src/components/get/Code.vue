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
        <div class="keyboard">
            <P>请输入8位门票验证码</P>
            <div class="shownum">
                <span v-for="item in shownumData">{{item}}</span>
            </div>
            <div class="keynum">
                <img @click="returnNum('1')" src="../../assets/kb_1.png">
                <img @click="returnNum('2')" src="../../assets/kb_2.png">
                <img @click="returnNum('3')" src="../../assets/kb_3.png">
                <img @click="returnNum('4')" src="../../assets/kb_4.png">
                <img @click="returnNum('5')" src="../../assets/kb_5.png">
                <img @click="returnNum('6')" src="../../assets/kb_6.png">
                <img @click="returnNum('7')" src="../../assets/kb_7.png">
                <img @click="returnNum('8')" src="../../assets/kb_8.png">
                <img @click="returnNum('9')" src="../../assets/kb_9.png">
                <img @click="setNull()" src="../../assets/kb_null.png">
                <img @click="returnNum('0')" src="../../assets/kb_0.png">
                <img @click="delNum()" src="../../assets/kb_close.png">
            </div>
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
                shownumData: [" "," "," "," "," "," "," "," ",]
            }
        },
        methods: {
            returnNum (index) {
                for (let i = 0; i < this.shownumData.length; i++) {
                    if(this.shownumData[i] === " "){
                        this.shownumData.splice(i,1,index)
                        break
                    }
                }

                if(this.shownumData[7] !==" "){
                    console.log("验证码："+this.shownumData.join(' '));
                }
            },
            delNum () {
                for (let i = 0; i < this.shownumData.length; i++) {
                    if(this.shownumData[i] === " " || this.shownumData[7] !==" "){
                        this.shownumData.splice(i-1,1," ")
                        break
                    }
                }
            },
            setNull () {
                this.shownumData = [" "," "," "," "," "," "," "," ",]
            }
        },
        mounted () {
            // 用户无操作，定时器开启，则返回首页

            clearTimeout(LEAVE_TIMER);

            LEAVE_TIMER = setTimeout(() => {

                this.$router.push({name:'home'})

            }, LEAVE_TIMER_MIN);

            document.body.onclick = () => {
                clearTimeout(LEAVE_TIMER);
                LEAVE_TIMER = setTimeout(() => {

                    this.$router.push({name:'home'})

                }, LEAVE_TIMER_MIN);
            }
        },
        destroyed () {
            // 取消定时器
            clearTimeout(LEAVE_TIMER);
        }
    }
</script>
<style lang="less">
    @import '../../less/lib/mixins.less';
    .keyboard{
        width: 100%;
        height: 710px;
        p{
            width: 100%;
            text-align: center;
            font-size: 32px;
            color: #666666;
            line-height: 100px;
        }
        .shownum{
            text-align: center;
            span{
                display: inline-block;
                width: 100px;
                height: 100px;
                line-height: 100px;
                margin: 0 11px;
                text-align: center;
                border:1px solid #bbbbbb;
                .border-radius(5px);
                font-size: 66px;
                color: #ff9400;
                font-weight: bold;
                overflow: hidden;
            }
        }
        .keynum{
            clear: both;
            width: 590px;
            margin: 0 auto;
            margin-top: 20px;
            height: 448px;
            img{
                display: block;
                margin: 16px 16px 0 0;
                width: 186px;
                height: 96px;
                float: left;
                &:nth-child(3n){
                    margin-right: 0px;
                }
            }
        }
    }
</style>