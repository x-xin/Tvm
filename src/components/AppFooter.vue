<template>
    <div class="footer">
        <p>技术支持：厦门欣欣信息有限公司&福建智慧旅游有限公司&nbsp;&nbsp;<a @click="set()">设置</a></p>
        <div class="modal" v-if="showlogin">
            <div class="login">
                <h2>请输入管理员密码</h2>
                <input type="password" v-model="password" autofocus="true" maxlength="6" minlength="1">
                <i class="error_msg" v-if="showErrorMsg">{{ errorMess }}</i>
                <div class="home-set-btn">
                    <a class="set_cancel" @click="cancelLogin()"></a><!-- 
                     --><a class="set_confirm" @click="confirmLogin()"></a>                    
                </div>
            </div>
        </div>
        <div class="modal" v-if="showset">
            <div class="set">
                <h2>系统设置</h2>
                <em class="close" @click="closeApp()">关闭软件</em>
                <label class="remain">
                    <span>剩余纸质票数量</span>
                    <input type="text" v-model="remain" maxlength="3" minlength="1">
                    <span>张</span>
                </label>
                <label class="max">
                    <span>数量预警值&emsp;&emsp;</span>
                    <input type="text" v-model="max" maxlength="3" minlength="1">
                    <span>张</span>
                </label>
                <p>当门票数量低于预警值时，可向管理员发送短信提醒。</p>
                <label class="message">
                    <span>短信提醒</span>
                    <template v-if="messnotice">
                        <span class="choice" @click="controlMessNotice()">开启</span><!-- 
                     --><span class="choice unchoice" @click="controlMessNotice()">关闭</span>
                    </template>
                    <template v-else>
                        <span class="choice unchoice" @click="controlMessNotice()">开启</span><!-- 
                     --><span class="choice" @click="controlMessNotice()">关闭</span>
                    </template>
                </label>
                <label class="phone">
                    <span>短信发送号码</span>
                    <input type="text" v-model="phone" maxlength="11" minlength="11">
                </label>
                <div class="home-set-btn">
                    <a class="set_cancel" @click="cancelSet()"></a><!-- 
                     --><a class="set_confirm" @click="confirmSet()"></a>                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'footer',
    data () {
        return {
            showlogin       :   false,
            showset         :   false,
            messnotice      :   true,
            max             :   126,   // 预警
            remain          :   999,// 剩余
            phone           :   "15880910182",
            password        :   "",
            errorMess       :   "",
            showErrorMsg    :   false
        }
    },
    methods: {
        closeApp () {
            if(EXT && EXT.isTicketSys == true){
                EXT.sysShutdown();
            }
        },
        getAppData () {
            if(EXT && EXT.isTicketSys == true){
                this.remain = EXT.prtGetStockNum();
                this.max = EXT.prtGetWarnNum();
                this.phone = EXT.prtGetPhone();
                this.messnotice = EXT.prtGetIsSendMsg();
            }
            if(EXT.isTicketSys == false){
                console("is false");
            }
        },
        set () {
            this.showlogin = true;
            this.getAppData();
        },
        cancelLogin () {
            this.showlogin = false;
            this.showErrorMsg = false;
            this.password = "";
        },
        confirmLogin () {
            // 请求密码验证
            $.ajax({
                url: AJAX_URL,
                type: "POST",
                data: {
                    "op"          :  "MACHINE_VERIFY_PWD",
                    "password"    :  this.password
                },
                dataType: "jsonp",
                jsonp:"callback",
                jsonpCallback: "handle",

                success: ((data) => {
                    if(data.code === 1){
                        this.showErrorMsg = false
                        this.showset = true
                        this.showlogin = false
                    }else{
                        this.errorMess = data.message;
                        this.showErrorMsg = true
                    }
                    this.password = "";
                }),
                error: ((xhr) => {
                    alert(xhr.status)
                })
            }) 
        },

        cancelSet () {
            this.showset = false
            this.getAppData();
        },
        confirmSet () {
            //客户端交互数据
            let _this = this;
            if(EXT && EXT.isTicketSys == true){
                EXT.prtSetStockNum(_this.remain);
                EXT.prtSetWarnNum(_this.max);
                EXT.prtSetPhone(_this.phone);
                EXT.prtSetIsSendMsg(_this.messnotice);
            }
            
            // 关掉弹窗
            this.showset = false;

        },
        controlMessNotice () {
            this.messnotice = !this.messnotice
        }
    },
    mounted () {
        this.getAppData();
    }
}
</script>
<style lang="less">
    @import '../less/lib/mixins.less';
    .footer{
        width: 100%;
        height: 70px;

        position: fixed;
        bottom: 0;
        left:0 ;
        z-index: 3;

        p{
            line-height: 70px;
            tEXT-align: center;
            color: #999999;
            font-size: 20px;
        }

        a{
            color: #109afa;
        }
    }
    .set{
        width: 600px;
        height: 800px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -300px;
        margin-top: -400px;
        background-color: #fff;
        border:5px solid rgba(0, 0, 0, 0.2);
        .border-radius(5px);
        cursor: pointer;

        h2{
            margin-bottom: 40px;
            font-weight: bold;
            line-height: 123px;
            height: 123px;
            border-bottom:1px solid #ccc;
            color: #666;
            font-size: 46px;
            padding-left: 40px;
        }
        >em{
            position: absolute;
            top: 40px;
            right: 40px;
            color: #109afa;
            font-size: 26px;
            background: url(../assets/close.png) center left no-repeat;
            padding-left: 30px;
        }
        label{
            display: block;
            margin: 0px 40px 20px;
            line-height: 60px;
            height: 60px;
            span{
                font-size: 26px;
                color: #666;
            }
            input{
                display: inline-block;
                width: 160px;
                line-height: 54px;
                height: 54px;
                padding: 5px 20px;
                margin: 0 20px;
                color: #ff9400;
                font-size: 36px;
                font-weight: bold;
                border:1px solid #ccc;
                .border-radius(5px);
                outline: none;
                tEXT-align: right;
                overflow: hidden;
                &::-ms-clear { display: none; }
                &::-ms-reveal { display: none; }
            }
            &.message{
                cursor: pointer;
                span{
                    &:first-child{
                        margin-right: 100px;
                    }
                }
                .choice{
                    display: inline-block;
                    width: 80px;
                    height: 50px;
                    background: url(../assets/choice.png) center left no-repeat;
                    padding-left: 60px;
                    &.unchoice{
                        background: url(../assets/unchoice.png) center left no-repeat;
                    }
                }
            }
            &.phone{
                input{
                    width: 266px;
                    margin-left: 40px;
                    padding-right: 10px;
                    color: #666;
                    font-size: 36px;
                    tEXT-align: left;
                    font-weight: normal;
                }
            }
        }
        >P{
            font-size: 26px;
            color: #666;
            tEXT-align: left;
            margin:40px;
            line-height: 40px;
        }

    }
    .modal{
        background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;

        .login{
            width: 600px;
            height: 400px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -300px;
            margin-top: -200px;
            background-color: #fff;
            border:5px solid rgba(0, 0, 0, 0.2);
            .border-radius(5px);
            h2{
                tEXT-align: center;
                font-size: 26px;
                color: #333;
                line-height: 120px;
            }
            input{
                display: block;
                padding: 10px;
                width: 420px;
                height: 40px;
                line-height: 40px;
                margin: 0 auto;
                outline: none;
                .border-radius(5px);
                color: #333333;
                border:1px solid #ccc;
                &:focus{
                    .box-shadow(0,0,10px,#a3d1ff);
                }
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
                }
            }
            >i{
                display: block;
                tEXT-align: center;
                color: red;
                line-height: 50px;
            }
        }
        .home-set-btn{
            position: absolute;
            bottom: 50px;
            left: 0;
            width: 100%;
            height: 70px;
            tEXT-align: center;
            a{
                display: inline-block;
                width: 178px;
                height: 70px;
                margin: 0 20px;
                &.set_cancel{
                    background: url(../assets/set_cancel.png) no-repeat;
                }
                &.set_confirm{
                    background: url(../assets/set_confirm.png) no-repeat;
                }
            }
        }
    }
</style>