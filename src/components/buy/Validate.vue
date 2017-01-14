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
                    idname   : "",
                    idnum    : "" 
                }
            }
        },
        methods: {
            valida () {
                this.$emit("valida",{idname:this.userInfo.idname,idnum:this.userInfo.idnum})
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

            if(EXT && EXT.isTicketSys == true && EXT.prtGetStockNum()>2){

                EXT.idStartRead(); // 开始读身份证
                
                clearInterval(READ_CARD_TIMER);
                READ_CARD_TIMER = setInterval(() => {
                    if(EXT.idReadIsOK() == 1){
                        clearInterval(READ_CARD_TIMER);

                        clearTimeout(LEAVE_TIMER); // 关闭定时器

                        this.userInfo.idname = EXT.idGetName();
                        this.userInfo.idnum = EXT.idGetIDNum();
                        this.valida();
                        this.$router.push({name:'ticketslists'});
                    }
                },1000); 

            }else{
                clearTimeout(LEAVE_TIMER);  // 关闭离开定时器
                swal({
                    title: "门票数量不够",
                    text: "请联系管理员哦",
                    type: "error",
                    confirmButtonText: "关闭"
                },(isConfirm) => {
                    if(isConfirm){
                        clearTimeout(LEAVE_TIMER);
                        LEAVE_TIMER = setTimeout(() => {
                            this.$router.push({name:'home'})
                        }, LEAVE_TIMER_MIN);
                    }
                });
            }
        },
        destroyed () {

            clearTimeout(LEAVE_TIMER);     // 取消离开定时器

            clearInterval(READ_CARD_TIMER);  // 取消取卡信息定时器

            if (EXT && EXT.isTicketSys == true) {
                EXT.idCancelRead();
            }
        }   
    }
</script>
<style lang="less">
    
</style>