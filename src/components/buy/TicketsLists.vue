<template>
    <div class="main buy-tickets">
       <!-- 头部导航 -->
        <div class="buy-menu">
            <div>
                <em>1</em>
                <span>验证身份</span>
                <i></i>
            </div>
            <div class="cur">
                <em>2</em>
                <span>选择门票</span>
                <i></i>
            </div>
            <div>
                <em>3</em>
                <span>购票成功</span>
            </div>
        </div>

        <!-- 票务列表 -->
        <div class="ticketswrap">
            <div class="ticketslists">
                <label 
                    v-for="(item,index) in freePrice" 
                    @click="choice(item,index)" 
                    :ischoice="item.ischoice"
                >
                    <i class="icon-unchoice" 
                        :class="{'icon-choice': item.ischoice}">    
                    </i>
                    <span>{{item.title}}</span>
                    <em v-if="item.free">
                        {{ item.free }}
                    </em>
                    <em v-else><i>￥</i>{{item.price}}</em>
                    
                </label>
            </div>           
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
        <div class="buy-btn money">
            <!-- <router-link class="cancel-btn" :to="{ name: 'home'}"></router-link> -->
            <a @click="cancel" class="cancel-btn"></a>
            <a class="confirm-1-btn" v-bind:class="{'confirm-2-btn': showbtn}" @click="confirmTickets()"></a> <!-- confirm-2-btn -->
            <div class="pay">
                <span>共需支付：</span>
                <em><i>￥</i>{{total}}</em>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'ticketslists',
        data () {
            return {
                ticketslists    :    [],
                showbtn         :    false,
                total           :    0,
                redata          :    [],
                isLoading       :    false,
                loadingNotice   :    ""
            }
        },
        props: ['user'],
        methods: {
            choice (item,index) { 

                this.total = 0
                this.showbtn = false
                this.redata = []

                if(!item.ischoice){
                    this.total += item.price
                    this.showbtn = true
                    this.redata.push(item.product_sn,this.total);
                }

                item.ischoice = !item.ischoice
            
                for (let i = 0; i < this.freePrice.length; i++) {
                    if(i === index){
                        continue
                    }
                    this.freePrice[i].ischoice = false
                }

            },
            confirmTickets () {
                // 数据提交
                if(this.showbtn){
                    console.log(this.redata)
                    let product_id = this.redata[0].toString(),
                        dataobj  = {}
                        dataobj[product_id] = "1";
                        console.log(dataobj)
                    $.ajax({
                        url: AJAX_URL,  // 处理订单
                        type: "POST",
                        data: {
                            "op"          :  "MACHINE_ORDER_CREATE",
                            "id_card"     :  {"sn":this.user.idnum,"name":this.user.idname},
                            "product_car" :  dataobj,
                            "paid"        :  this.redata[1]
                        },
                        dataType: "jsonp",
                        jsonp:"callback",
                        jsonpCallback: "handle",
                        beforeSend: (() => {
                            this.isLoading = true
                            this.loadingNotice = "正在处理订单"
                            clearTimeout(LEAVE_TIMER);     // 关闭定时器
                        }),
                        success: ((data) => {
                            console.log(data);
                            this.isLoading = false;
                            this.loadingNotice = "";

                            if(data.code === 1){
                                // 支付接口
                                $.ajax({
                                    url: AJAX_URL,  // 支付订单
                                    type: "POST",
                                    data: {
                                        "op": "MACHINE_PAY_AFTER",
                                        "order_sn_map": {"0":data.data.order_sn_map[0],"1":data.data.order_sn_map[1]}
                                    },
                                    dataType: "jsonp",
                                    jsonp:"callback",
                                    jsonpCallback: "handle",
                                    success: ((data) => {
                                        console.log(data.data)
                                        // alert(data);
                                        let oneTickets = data.data[0];
                            
                                        if(data.code === 1){

                                            // loading 开启

                                            this.isLoading = true;
                                            this.loadingNotice = "正在处理打印";

                                            //开启打印接口，再跳转成功页面
                                            let _this = this;
                                            function printTicket(){
                                                if (EXT && EXT.isTicketSys == true) {
                                                    // 票数减1
                                                    EXT.prtSetStockNum(EXT.prtGetStockNum()-1);
                                                    EXT.prtPageSetDirection(1);
                                                    EXT.prtPageSetShowInfo(1);
                                                    EXT.prtPageSetWidth(800);
                                                    EXT.prtPageSetHeight(1750);
                                                    EXT.prtPageSetPaddingLeft(1150);
                                                    EXT.prtPagePrintTicket(oneTickets.cmp, oneTickets.cat, oneTickets.date, oneTickets.num, oneTickets.sn);
                                                    // 发送短信提醒
                                                    let prtGetIsSendMsg =  EXT.prtGetIsSendMsg(),
                                                        prtGetStockNum  =  EXT.prtGetStockNum(),
                                                        prtGetWarnNum   =  EXT.prtGetWarnNum();

                                                    if(prtGetIsSendMsg && prtGetStockNum === prtGetWarnNum ){
                                                        $.ajax({
                                                            url: AJAX_URL,
                                                            type: "POST",
                                                            data: {
                                                                "op": "MACHINE_SEND_WARN_SMS",
                                                                "mobile": EXT.prtGetPhone(), 
                                                                "message": "纸质票少于" + EXT.prtGetWarnNum() + "张！！！"
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
                                                    // 回到成功页面
                                                    clearTimeout(GO_SUCCESS_TIMER);  // 取消跳转页面定时器
                                                    GO_SUCCESS_TIMER = setTimeout(()=>{
                                                        _this.isLoading = false;
                                                        _this.loadingNotice = "";
                                                        _this.$router.push({name:'buysuccess'}); //
                                                    },GO_SUCCESS_TIMER_MIN);
                                                     
                                                }
                                            }

                                            printTicket();

                                        }else{
                                            console.log(data.message);
                                        }


                                    }),
                                    error: ((xhr) => {
                                        alert(xhr.status)
                                    })
                                })

                            }else{
                                // alert(data.message);
                                clearTimeout(LEAVE_TIMER); // 数据处理开始关闭返回定时器
                                swal({
                                    title: "该身份证已购过门票",
                                    text: data.message,
                                    type: "error",
                                    confirmButtonText: "关闭"
                                },(isConfirm) => {
                                    if(isConfirm){
                                        LEAVE_TIMER = setTimeout(() => {
                                            this.$router.push({name:'home'})
                                        }, LEAVE_TIMER_MIN);
                                    }
                                });
                            }
                        }),
                        error: ((xhr) => {
                            alert(xhr.status);
                            // 定时器开启
                            LEAVE_TIMER = setTimeout(() => {
                                this.$router.push({name:'home'})
                            }, LEAVE_TIMER_MIN);
                        })
                    })

                }else{
                    console.log("请选择票类");
                }
            },
            // 取消购票
            cancel () {
                // 弹窗提示
                swal({   
                    title: "取消本次购票",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    cancelButtonText: "返回"
                }, (isConfirm) => {
                    if (isConfirm) {     
                       this.$router.push({ name: 'home'}); 
                       clearTimeout(LEAVE_TIMER);
                    }else{
                        // 开启定时器
                        clearTimeout(LEAVE_TIMER);
                        LEAVE_TIMER = setTimeout(() => {
                            this.$router.push({name:'home'})
                        }, LEAVE_TIMER_MIN);
                    }
                })
            }
        },
        computed: {  
            // 计算￥0 显示【免费】
            freePrice () {
                for (let i = 0; i < this.ticketslists.length; i++) {
                    if(this.ticketslists[i].price === 0){
                        this.ticketslists[i].free = "免费"
                    }
                }
                return this.ticketslists
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

            $.ajax({
                url: AJAX_URL,  // 加载门票列表
                type: "POST",
                data: {
                    "op": "MACHINE_TICKET_LIST"
                },
                dataType: "jsonp",
                jsonp:"callback",
                jsonpCallback: "handle",
                beforeSend: (() => {
                    this.isLoading = true
                    this.loadingNotice = "正在加载数据..."
                }),
                success: ((data) => {
                    this.ticketslists = data.data.data
                }),
                complete: (() => {
                    this.isLoading = false
                }),
                error: ((xhr) => {
                    alert(xhr.status)
                })
            })
        },
        destroyed () {
            clearTimeout(LEAVE_TIMER);      // 取消定时器
            clearTimeout(GO_SUCCESS_TIMER);  // 取消跳转页面定时器
        }
    }
</script>
<style lang="less">
    .ticketswrap{
        height: 700px;
        width: 100%;
        margin-top: 40px;
        overflow-x: hidden;
    }
    .ticketslists{
        width: 100%;
        label{
            display: block;
            width: 100%;
            height: 99px;
            line-height: 99px;
            border-bottom: 1px solid #cdcdcd;
            font-size: 32px;
            color: #666;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            em{
                display: block;
                position: absolute;
                height: 99px;
                top: 0;
                right: 0;
                margin-right: 30px;
                color: #ff9400;
                i{
                    font-size: 22px;
                }
            }
            i{
                &.icon-unchoice{
                    display: inline-block;
                    vertical-align: middle;
                    width: 50px;
                    height: 50px;
                    margin: 0 20px 0 50px;
                    background: url(../../assets/unchoice.png) no-repeat;
                }
                &.icon-choice{
                    background: url(../../assets/choice.png) no-repeat;
                }
            }
            span{
                display: inline-block;
            }
        }
    }
    .buy-tickets{
        .money{
            background-color: #feebca;
            position: relative;

            .pay{
                height: 106px;
                font-size: 26px;
                color: #666;
                position: absolute;
                top: 0;
                left: 50px;
                em{
                    color: #ff9400;
                    font-size: 46px;
                    i{
                        font-size: 26px;
                    }
                }
            }
        }
    }
</style>