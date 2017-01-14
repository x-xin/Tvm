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
        <!-- loading -->
        <div class="loading" v-if="isLoading">
            <div class="loading-con">
                <div class="sk-circle">
                    <div class="sk-circle1 sk-child"></div>
                    <div class="sk-circle2 sk-child"></div>
                    <div class="sk-circle3 sk-child"></div>
                    <div class="sk-circle4 sk-child"></div>
                    <div class="sk-circle5 sk-child"></div>
                    <div class="sk-circle6 sk-child"></div>
                    <div class="sk-circle7 sk-child"></div>
                    <div class="sk-circle8 sk-child"></div>
                    <div class="sk-circle9 sk-child"></div>
                    <div class="sk-circle10 sk-child"></div>
                    <div class="sk-circle11 sk-child"></div>
                    <div class="sk-circle12 sk-child"></div>
                  </div>
                <span>{{ loadingNotice }}</span>
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
    export default {
        name: 'idcard',
        data () {
            return {
                userInfo:{
                    idname     :  "",
                    idnum      :  "" 
                },
                isLoading      :  false,
                loadingNotice  :  ""
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

            // let ext = window.external;
            if(ext && ext.isTicketSys == true){

                if(ext && ext.isTicketSys == true && ext.prtGetStockNum()>2){

                    ext.idStartRead(); // 开始读身份证

                    clearInterval(readCardTimer);
                    readCardTimer = setInterval(() => {
                        if(ext.idReadIsOK() == 1){
                            
                            clearTimeout(leaveTimer);
                            clearInterval(readCardTimer);

                            this.userInfo.idname = ext.idGetName()
                            this.userInfo.idnum = ext.idGetIDNum()
                            // ajax data
                            // this.$router.push({name:'getsuccess'})
                            let _this = this;
                            $.ajax({
                                url: "http://192.168.9.150:1955/service/gh_b1bc335cbc86/ticket",  // 服务端获取数据是否可以打印
                                type: "POST",
                                data: {
                                    "op": "MACHINE_FETCH_VOUCHER",
                                    "id_card":{"sn":_this.userInfo.idnum,"name":_this.userInfo.idname}
                                },
                                dataType: "jsonp",
                                jsonp:"callback",
                                jsonpCallback: "handle",
                                success: ((data) => {
                                    console.log(data)
                                    let oneTickets = data.data[0];
                                    if(data.code === 1){
                                        setTimeout(() => {
                                            _this.isLoading = true;
                                            _this.loadingNotice = "正在处理打印";
                                        },1000);

                                        // 票数减1
                                        ext.prtSetStockNum(ext.prtGetStockNum()-1);

                                        //开启打印接口，再跳转成功页面
                                        function printTicket(){
                                            if (ext && ext.isTicketSys == true) {
                                                ext.prtPageSetDirection(1);
                                                ext.prtPageSetShowInfo(1);
                                                ext.prtPageSetWidth(800);
                                                ext.prtPageSetHeight(1750);
                                                ext.prtPageSetPaddingLeft(1150);
                                                ext.prtPagePrintTicket(oneTickets.cmp, oneTickets.cat, oneTickets.date, oneTickets.num, oneTickets.sn);

                                                // 发送短信提醒
                                                let prtGetIsSendMsg =  ext.prtGetIsSendMsg(),
                                                    prtGetStockNum  =  ext.prtGetStockNum(),
                                                    prtGetWarnNum   =  ext.prtGetWarnNum();
                                                    
                                                if(prtGetIsSendMsg && prtGetStockNum === prtGetWarnNum ){
                                                    $.ajax({
                                                        url: "http://192.168.9.150:1955/service/gh_b1bc335cbc86/ticket",  // 短信接口
                                                        type: "POST",
                                                        data: {
                                                            "op": "MACHINE_SEND_WARN_SMS",
                                                            "mobile": ext.prtGetPhone(), 
                                                            "message": "纸质票少于" + ext.prtGetWarnNum() + "张！！！"
                                                        },
                                                        dataType: "jsonp",
                                                        jsonp:"callback",
                                                        jsonpCallback: "handle",
                                                        success: ((data) => {
                                                            //
                                                            if(data.code === 1){
                                                                alert(data.message);
                                                            }else{
                                                                alert(data.message+"error");
                                                            }
                                                        }),
                                                        error: ((xhr) => {
                                                            alert(xhr.status)
                                                        })
                                                    })
                                                }
                                                // 成功后 3S 去跳转到成功页面
                                                clearTimeout(goSuccessTimer);  // 取消跳转页面定时器
                                                goSuccessTimer = setTimeout(()=>{
                                                    _this.isLoading = false;
                                                    _this.loadingNotice = "";
                                                    _this.$router.push({name:'getsuccess'}); //
                                                },3000);
                                                 
                                            }
                                        }

                                        printTicket();

                                    }else{
                                        console.log(data.message);
                                    }

                                }),
                                complete: (() => {
                                    this.isLoading = false
                                }),
                                error: ((xhr) => {
                                    alert(xhr.status)
                                })
                            })

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

            }
        },
        destroyed () {
            
            clearTimeout(leaveTimer);      // 取消定时器
            clearInterval(readCardTimer);  // 取消取卡信息定时器
            clearTimeout(goSuccessTimer);  // 取消跳转页面定时器
            
            if (ext && ext.isTicketSys == true) {
                ext.idCancelRead();
            }
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