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
            <span>请将您的身份证平放在识别处</span>
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
                isLoading      :  false,
                loadingNotice  :  ""
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

            if(EXT && EXT.isTicketSys == true){

                if(EXT && EXT.isTicketSys == true && EXT.prtGetStockNum()>2){

                    EXT.idStartRead(); // 开始读身份证

                    clearInterval(READ_CARD_TIMER);
                    READ_CARD_TIMER = setInterval(() => {
                        if(EXT.idReadIsOK() == 1){
                            
                            clearTimeout(LEAVE_TIMER);
                            clearInterval(READ_CARD_TIMER);

                            this.$store.commit("identityCard",{
                                idName : EXT.idGetName(),
                                idNum : EXT.idGetIDNum(),
                            });
                            // ajax data
                            // this.$router.push({name:'getsuccess'})
                            let _this = this;
                            $.ajax({
                                url: AJAX_URL,  // 服务端获取数据是否可以打印
                                type: "POST",
                                data: {
                                    "orgcode"   :  "143232453",
                                    "op"        :  "MACHINE_FETCH_VOUCHER",
                                    "certi_sn"  :  _this.$store.state.idNum
                                    // "id_card":{"sn":_this.userInfo.idnum,"name":_this.userInfo.idname}
                                },
                                dataType: "jsonp",
                                jsonp:"callback",
                                jsonpCallback: "handle",
                                success: ((data) => {
                                    let oneTickets = data.data[0];
                                    if(data.code === 1){
                                        setTimeout(() => {
                                            _this.isLoading = true;
                                            _this.loadingNotice = "正在处理打印";
                                        },1000);

                                        // 票数减1
                                        EXT.prtSetStockNum(EXT.prtGetStockNum()-1);
                                        // store data
                                        let _this = this,
                                            totalTickets = this.$store.state.totalTickets,
                                            warnTickets = this.$store.state.warnTickets,
                                            messPhone = this.$store.state.messPhone,
                                            isMessNotice = this.$store.state.isMessNotice;

                                        this.$store.commit("decrement");

                                        //开启打印接口，再跳转成功页面
                                        if (EXT && EXT.isTicketSys == true) {
                                            EXT.prtPageSetDirection(1);
                                            EXT.prtPageSetShowInfo(1);
                                            EXT.prtPageSetWidth(800);
                                            EXT.prtPageSetHeight(1750);
                                            EXT.prtPageSetPaddingLeft(1150);
                                            EXT.prtPagePrintTicket(oneTickets.cmp, oneTickets.cat, oneTickets.date, oneTickets.num, oneTickets.sn);

                                            // 发送短信提醒                                                  
                                            if(isMessNotice && totalTickets === warnTickets ){
                                                $.ajax({
                                                    url: AJAX_URL,  // 短信接口
                                                    type: "POST",
                                                    data: {
                                                        "orgcode"  :  "143232453",
                                                        "op"       :   "MACHINE_SEND_WARN_SMS",
                                                        "mobile"   :   messPhone, 
                                                        "message"  :   "缺纸预警：售票机编号01纸质门票已少于" + warnTickets + "张，请及时补足门票库存，谢谢！"
                                                    },
                                                    dataType: "jsonp",
                                                    jsonp:"callback",
                                                    jsonpCallback: "handle",
                                                    success: ((data) => {
                                                        //
                                                        if(data.code === 1){
                                                            console.log(data.message);
                                                        }else{
                                                            console.log(data.message+"error");
                                                        }
                                                    }),
                                                    error: ((xhr) => {
                                                        console.log(xhr.status)
                                                    })
                                                })
                                            }
                                            // 打印回调
                                            $.ajax({
                                                url: AJAX_URL,  
                                                type: "POST",
                                                data: {
                                                    "orgcode"       :   "143232453",
                                                    "op"            :   "MACHINE_PRINT_CALL_BACK",
                                                    "ticket_sn_map" :   {"0" : oneTickets.sn}
                                                },
                                                dataType: "jsonp",
                                                jsonp:"callback",
                                                jsonpCallback: "handle",
                                                success: ((data) => {

                                                    // 成功后 3S 去跳转到成功页面
                                                    clearTimeout(GO_SUCCESS_TIMER);  // 取消跳转页面定时器
                                                    GO_SUCCESS_TIMER = setTimeout(()=>{
                                                        _this.isLoading = false;
                                                        _this.loadingNotice = "";
                                                        _this.$router.push({name:'getsuccess'}); //
                                                    },GO_SUCCESS_TIMER_MIN);

                                                    //
                                                    if(data.code === 1){
                                                        console.log(data.message);
                                                    }else{
                                                        console.log(data.message+"error");
                                                    }
                                                }),
                                                error: ((xhr) => {
                                                    console.log(xhr.status)
                                                })
                                            }) 
                                        }

                                    }else{
                                        // console.log(data.message);
                                        clearTimeout(LEAVE_TIMER);  // 关闭离开定时器 
                                        const msg = data.message.split("-")[1];
                                        swal({
                                            title: "取票失败",
                                            text: msg,
                                            type: "error",
                                            confirmButtonText: "关闭"
                                        },(isConfirm) => {
                                            if(isConfirm){
                                                // clearTimeout(LEAVE_TIMER);
                                                // LEAVE_TIMER = setTimeout(() => {
                                                    this.$router.push({name:'getmenu'})
                                                // }, LEAVE_TIMER_MIN);
                                            }
                                        });
                                    }

                                }),
                                complete: (() => {
                                    this.isLoading = false
                                }),
                                error: ((xhr) => {
                                    console.log(xhr.status)
                                })
                            })

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
                            // clearTimeout(LEAVE_TIMER);
                            // LEAVE_TIMER = setTimeout(() => {
                                this.$router.push({name:'getmenu'})
                            // }, LEAVE_TIMER_MIN);
                        }
                    });
                }

            }
        },
        destroyed () {
            
            clearTimeout(LEAVE_TIMER);      // 取消定时器
            clearInterval(READ_CARD_TIMER);  // 取消取卡信息定时器
            clearTimeout(GO_SUCCESS_TIMER);  // 取消跳转页面定时器
            
            if (EXT && EXT.isTicketSys == true) {
                EXT.idCancelRead();
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