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
                <label v-for="(item,index) in freePrice" @click="choice(item,index)" :ischoice="item.ischoice">
                    <i class="icon-unchoice" :class="{'icon-choice': item.ischoice}"></i>
                    <span>{{item.name}}</span>
                    <em v-if="item.free">
                        {{ item.free }}
                    </em>
                    <em v-else><i>￥</i>{{item.price}}</em>
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
                        id: "a1",
                        name: "山西博物馆珍藏票",
                        price: 10,
                        ischoice:false
                    },
                    {
                        id: "a2",
                        name: "山西博物馆纪念票",
                        price: 0,
                        ischoice:false
                    },
                    {
                        id: "a3",
                        name: "山西博物馆妇女票",
                        price: 50,
                        ischoice:false
                    },
                    {
                        id: "a4",
                        name: "山西博物馆青年票",
                        price: 0,
                        ischoice:false
                    },
                    {
                        id: "a5",
                        name: "山西博物馆儿童票",
                        price: 10,
                        ischoice:false
                    }
                ],
                showbtn: false,
                total: 0,
                redata: []
            }
        },
        methods: {
            choice (item,index) { 

                this.total = 0
                this.showbtn = false
                this.redata = []

                if(!item.ischoice){
                    this.total += item.price
                    this.showbtn = true
                    this.redata.push(item.id,this.total);
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
                if(this.showbtn){
                    console.log(this.redata);
                }
            }
        },
        computed: {  //
            freePrice () {
                for (let i = 0; i < this.ticketslists.length; i++) {

                    if(this.ticketslists[i].price === 0){
                        this.ticketslists[i].free = "免费"
                    }
                }
                return this.ticketslists
            }
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