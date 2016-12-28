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
            <img src="../../assets/identity.gif" width="100%" height="100%">
            <span>请将您的身份证平放在识别处{{ userInfo.idname }}{{ userInfo.idnum }}</span>
        </div>
        <!-- 按钮世界 -->
        <div class="buy-btn">
            <router-link class="backhome-btn" :to="{ name: 'home'}"></router-link>
            <router-link class="pre-btn" :to="{ name: 'getmenu'}"></router-link>
        </div>
    </div>    
</template>
<script>
    export default {
        name: 'idcard',
        data () {
            return {
                userInfo:{
                    idname: "",
                    idnum: "" 
                }
            }
        },
        mounted () {
            let ext = window.external
            if(ext && ext.isTicketSys == true){

                ext.prtSetStockNum(161); //当前票数
                ext.prtSetWarnNum(100); // 当前预警值
                ext.prtSetIsSendMsg(1); // 是否发短信
                ext.prtSetPhone("1234567"); // 手机号码
                
                ext.idStartRead(); // 开始读身份证

                let timer = setInterval(() => {
                    if(ext.idReadIsOK() == 1){
                        clearInterval(timer)
                        this.userInfo.idname = ext.idGetName()
                        this.userInfo.idnum = ext.idGetIDNum()
                        // ajax data
                        // this.$router.push({name:'getsuccess'})
                    }
                },1000); 
            }

            // 用户无操作，定时器开启，则返回首页
            var EXPIRE_IN_15MIN = 1000 * 60 * 1.5; // 1.5 min

            window.leaveTimer1 = setTimeout(() => {

                this.$router.push({name:'home'})

            }, EXPIRE_IN_15MIN);

            document.body.onclick = () => {
                clearTimeout(window.leaveTimer1);
                clearTimeout(window.leaveTimer2);
                window.leaveTimer2 = setTimeout(() => {

                    this.$router.push({name:'home'})

                }, EXPIRE_IN_15MIN);
            }
        },
        destroyed () {
            // 取消定时器
            clearTimeout(window.leaveTimer1);
            clearTimeout(window.leaveTimer2);
        }
    }
</script>
<style lang="less">
    .get-tickets{  
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