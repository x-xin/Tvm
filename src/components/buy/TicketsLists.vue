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
                <label v-for="item in ticketslists" @click="choice(item)">
                    <i class="icon-unchoice" v-bind:class="{'icon-choice': item.ischoice}"></i><span>{{item.name}}</span><em><i>￥</i>{{item.price}}</em>
                </label>
            </div>           
        </div>

        <!-- 按钮世界 -->
        <div class="buy-btn money">
            <router-link class="cancel-btn" :to="{ name: 'home'}"></router-link>
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
                ticketslists:[
                    {
                        id:"11222",
                        name:"山西博物馆珍藏票",
                        price:99
                    },
                    {
                        id:"11223",
                        name:"山西博物馆纪念票",
                        price:50
                    },
                    {
                        id:"11224",
                        name:"山西博物馆妇女票",
                        price:50
                    },
                    {
                        id:"11225",
                        name:"山西博物馆青年票",
                        price:0
                    },
                    {
                        id:"11226",
                        name:"山西博物馆儿童票",
                        price:10
                    }
                ],
                showbtn: false,
                total: 0,
                ticketsid: [] //  传递数据给后端
            }
        },
        methods: {
            choice (item) { 

                // 选择当前列表
                item.ischoice = !item.ischoice

                // 支付金额
                if(item.ischoice){
                    this.total = this.total + item.price
                    this.ticketsid.push(item.id);
                }else{
                    this.total = this.total - item.price
                    this.ticketsid.pop();
                }

                // 按钮激活

                if(this.ticketsid.length === 0){
                    this.showbtn = false
                }else{
                    this.showbtn = true
                }

                console.log(this.ticketsid);


                console.log(item)
                console.log(item.price)
                console.log(item.id)
            },
            confirmTickets () {
                if(this.showbtn){
                    // 提交数据给后端
                    alert("亲爱的,我正在提交数据哦");
                }
            }
        },
        computed: {
            // freePrice () {
            //     for (let i = 0; i < this.ticketslists.length; i++) {
            //         if(this.ticketslists[i].price === 0){
            //             this.ticketslists[i].free = "免费"
            //         }
            //     }
            //     return{
            //         this.ticketslists
            //     }
            // }
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