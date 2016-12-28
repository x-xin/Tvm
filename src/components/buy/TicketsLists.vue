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
                ticketslists:[],
                showbtn: false,
                total: 0,
                redata: [],
                isLoading: false,
                loadingNotice: ""
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
                        // http://172.16.0.237:8080/service/gh_b1bc335cbc86/ticket
                        url: "http://172.16.0.208/order",
                        type: "POST",
                        data: {
                            "op"          :  "MACHINE_ORDER_CREATE",
                            "id_card"     :  "130633199104116551", 
                            "product_car" :  dataobj,
                            "paid"        :  this.redata[1], 
                        },
                        dataType: "json",
                        // dataType: "jsonp",
                        // jsonp:"callback",
                        // jsonpCallback: "handle",
                        beforeSend: (() => {
                            this.isLoading = true
                            this.loadingNotice = "正在处理订单"
                        }),
                        success: ((data) => {
                            console.log(data)
                            if(data.code === 1){
                                // 支付接口
                                $.ajax({
                                    // http://172.16.0.237:8080/service/gh_b1bc335cbc86/ticket
                                    url: "http://172.16.0.208/pay",
                                    type: "POST",
                                    data: {
                                        "op": "MACHINE_PAY_AFTER",
                                        "order_sn_map": {"0":data.data.order_sn_map[0],"1":data.data.order_sn_map[1]}
                                    },
                                    dataType: "json",
                                    // dataType: "jsonp",
                                    // jsonp:"callback",
                                    // jsonpCallback: "handle",
                                    success: ((data) => {
                                        console.log(data)
                                        if(data.code === 1){

                                            //开启打印接口，再跳转成功页面

                                            this.$router.push({name:'buysuccess'}); // 
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
                            }else{
                                console.log(data.message)
                            }
                        }),
                        error: ((xhr) => {
                            alert(xhr.status)
                        })
                    })

                }else{
                    console.log("请选择票类");
                }
            },
            // 取消购票
            cancel () {

                swal({   
                    title: "取消本次购票",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    cancelButtonText: "返回"
                    // closeOnConfirm: false, 
                    // closeOnCancel: false 
                }, (isConfirm) => {
                    if (isConfirm) {     
                       this.$router.push({ name: 'home'}); 
                       // console.log(isConfirm);
                    } 
                })

                // swal({
                //     title: "该身份证已购过门票",
                //     text: "每张身份证仅限购买一张门票",
                //     type: "error",
                //     confirmButtonText: "关闭"
                // });
            }
        },
        computed: {  
            // 计算￥0 显示免费
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
            $.ajax({
                // http://172.16.0.237:8080/service/gh_b1bc335cbc86/ticket
                url: "http://172.16.0.208/ticketlist",
                type: "POST",
                data: {
                    "op": "MACHINE_TICKET_LIST"
                },
                dataType: "json",
                // dataType: "jsonp",
                // jsonp:"callback",
                // jsonpCallback: "handle",
                beforeSend: (() => {
                    console.log("beforeSend");
                    this.isLoading = true
                    this.loadingNotice = "正在加载数据..."
                }),
                success: ((data) => {
                    this.ticketslists = data.data
                    // console.log(data)
                }),
                complete: (() => {
                    console.log("complete");
                    this.isLoading = false
                }),
                error: ((xhr) => {
                    alert(xhr.status)
                })
            })
            console.log(this.user.idname+" "+this.user.idnum);

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