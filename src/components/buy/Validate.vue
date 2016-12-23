<template>
   <div class="main buy-tickets">
        <!-- 头部导航 -->
        <div class="buy-menu">
            <div class="cur">
                <em>1</em>
                <span>验证身份</span>
                <i></i>
            </div>
            <div>
                <em>2</em>
                <span>选择门票</span>
                <i></i>
            </div>
            <div>
                <em>3</em>
                <span>购票成功</span>
            </div>
        </div>

        <!-- 验证身份 -->
        <div class="validate">
            <img src="../../assets/identity.gif" width="100%" height="100%">
            <span>请将您的身份证平放在识别处</span>
        </div>

        <!-- 按钮世界 -->
        <div class="buy-btn">
            <router-link class="cancel-btn" :to="{ name: 'home'}"></router-link>
        </div>
        
    </div>
</template>
<script>
    export default {
        name: 'validate',
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
                        this.$router.push({name:'ticketslists'})
                    }
                },1000); 
            }
        }        
    }
</script>
<style lang="less">
    
</style>