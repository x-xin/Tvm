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

            if(ext && ext.isTicketSys == true && ext.prtGetStockNum()>2){

                ext.idStartRead(); // 开始读身份证
                
                clearInterval(readCardTimer);
                readCardTimer = setInterval(() => {
                    if(ext.idReadIsOK() == 1){
                        clearInterval(readCardTimer);

                        clearTimeout(leaveTimer); // 关闭定时器

                        this.userInfo.idname = ext.idGetName();
                        this.userInfo.idnum = ext.idGetIDNum();
                        this.valida();
                        this.$router.push({name:'ticketslists'});
                    }
                },1000); 

            }else{
                clearTimeout(leaveTimer);  // 关闭离开定时器
                swal({
                    title: "门票数量不够",
                    text: "请联系管理员哦",
                    type: "error",
                    confirmButtonText: "关闭"
                },(isConfirm) => {
                    if(isConfirm){
                        clearTimeout(leaveTimer);
                        leaveTimer = setTimeout(() => {
                            this.$router.push({name:'home'})
                        }, leaveTimerMin);
                    }
                });
            }
        },
        destroyed () {

            clearTimeout(leaveTimer);     // 取消离开定时器

            clearInterval(readCardTimer);  // 取消取卡信息定时器

            // var ext = window.external;
            if (ext && ext.isTicketSys == true) {
                ext.idCancelRead();
            }
        }   
    }
</script>
<style lang="less">
    
</style>