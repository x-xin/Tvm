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
            <span>请将您的身份证平放在识别处{{ idname }} {{ idnum }}</span>
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
                idname: "",
                idnum: "" 
            }
        },
        mounted () {

            // setTimeout(() => {

            //     let TicketPIDRd = new ActiveXObject("CncnTicket.PIDRd");

            //     if(TicketPIDRd){
            //         // 连接身份证读卡机具
            //         TicketPIDRd.connect();
            //     }
            //     if(TicketPIDRd && TicketPIDRd.read() == 1 && TicketPIDRd.isReadOK() == 1){


            //         // 获取姓名和身份证号
            //         this.idname = TicketPIDRd.pname
            //         this.idnum = TicketPIDRd.pidnum

            //     }
            // },3000)
        }        
    }
</script>
<style lang="less">
    
</style>