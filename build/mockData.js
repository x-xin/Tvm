var express = require('express'),
    app     = express(),
    Mock    = require('mockjs');

// 跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/* 票务列表 */
app.post('/ticketlist', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            'data|7': [{
                'product_sn': '@id',
                'title': '@ctitle',
                'price': '@integer(0, 3)'
            }],
            'code': '@integer(0, 1)'
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 订单生成 */
app.post('/order', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            'code': 1,
            data:{
                "order_sn_map": [
                    "p20161220111442khmj",
                    "p20161220111442mkqp"
                ]
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 订单支付 */
app.post('/pay', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            'code': 1,
            'message':" 订单支付成功"
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 验证密码 */
app.post('/password', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            'code': '@integer(0, 1)',
            'password': "123456"
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 管理员手机验证码 */
app.post('/phone', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            'code': '@integer(0, 1)',
            'message': "设置成功"
        });

    res.send( JSON.stringify(data, null, 4) );
});


//  ////////

/* 我的信息 */
app.post('/soytime/account/myInfo', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result:{
                nickname: '@cname',
                head_img_url: Random.image('160x160'),
                sex: '@integer(0, 1)',
                sutdent_auth: '@integer(0, 3)',
                explain: 'xxxx',
                goodCount: '@integer(1, 1000)',
                cenCount: '@integer(1, 1000)',
                poolCount: '@integer(1, 1000)',
                collectCount: '@integer(1, 1000)'
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 我的余额 */
app.post('/soytime/account/balance', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result:{
                balance: '@cname'
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 交易记录 */
app.post('/soytime/account/tradeRecord', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            'result|10':[{
                type: '@integer(1, 7)',
                amount: '@integer(0, 1)',
                status: '@integer(1, 3)',
                create_time: '@time'
            }]
        });

    res.send( JSON.stringify(data, null, 4) );
});


/* 获取设置 */
app.post('/soytime/account/getSettingInfo', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result:{
                open: '@integer(0, 1)',
                timeConf: '12-13-21-52',
                nickname: '@cname',
                head_img_url: Random.image('160x160'),
                mobile:'@integer(13100000000, 13900000000)',
                sex: '@integer(0, 2)',
                height: '@integer(150, 200)',
                birthday:'1991-01-01',
                qq:'@integer(100000, 999999999)',
                email:'@email'
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 保存设置 */
app.post('/soytime/account/saveSetInfo', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: '@integer(60, 1000)'
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 获取验证码 */
app.post('/soytime/account/getMobileCode', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: '@integer(1000, 9999)'
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 个人服务信息 */
app.post('/soytime/server/myInfo', function name(req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result:{
                photo_url2: Random.image('160x160'),
                usernick: '@cname',
                sceneIds: '@cname',
                detail: '@cname',
                'skillImgs|2':[{
                    id: '@cname',
                    img_url: Random.image('160x160')
                }],
                longitude: '@cname',
                latitude: '@cname',
                workplace: '@cname',
                timeConf: '12-13-21-52'
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 发布个人服务信息 */
app.post('/soytime/server/saveInfo', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: '@integer(60, 1000)'
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 我的发单任务列表 */
app.post('/soytime/order/demandList', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            'result|10': [
                {
                    order_id: '@integer(60, 1000)',
                    scene_name: '@integer(60, 1000)',
                    create_time: '@integer(60, 1000)',
                    salary: '@integer(60, 1000)',
                    unit: '@integer(60, 1000)',
                    status: '@integer(0, 3)',
                    stu_name: '@integer(60, 1000)',
                    detail: '@integer(60, 1000)',
                    number: '@integer(60, 1000)',
                    workplace: '@integer(60, 1000)',
                    start_time: '@integer(60, 1000)',
                    end_time: '@integer(60, 1000)',
                    period_times: '@integer(60, 1000)',
                    'orderResponses|2': [
                        {
                            stu_id: '@integer(60, 1000)',
                            nickname: '@integer(60, 1000)',
                            is_checked: '@integer(60, 1000)',
                            mobile: '@integer(60, 1000)',
                            is_appraise: '@integer(60, 1000)'
                        }
                    ],
                    resultResponse:
                    {
                        responseCount:'@integer(60, 1000)',
                        selectedCount:'@integer(60, 1000)',
                        restCount :'@integer(60, 1000)'
                    },
                    orderRespon:
                    {
                        stu_id:'@integer(60, 1000)',
                        nickname:'@integer(60, 1000)',
                        is_checked:'@integer(60, 1000)',
                        mobile:'@integer(60, 1000)',
                        is_appraise:'@integer(60, 1000)'
                    }
                }
            ]
        });

    res.send( JSON.stringify(data, null, 4) );
});

app.post('/soytime/order/demandDetail', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: {
                order_id:'@integer(60, 1000)',
                scene_name:'@integer(60, 1000)',
                create_time:'@integer(60, 1000)',
                salary:'@integer(60, 1000)',
                unit:'@integer(60, 1000)',
                status:'@integer(60, 1000)',
                stu_name:'@integer(60, 1000)',
                detail:'@integer(60, 1000)',
                number:'@integer(60, 1000)',
                workplace:'@integer(60, 1000)',
                start_time:'@integer(60, 1000)',
                end_time:'@integer(60, 1000)',
                period_times:'@integer(60, 1000)',
                'orderResponses|10':[
                    {
                        stu_id:'@integer(60, 1000)',
                        nickname:'@integer(60, 1000)',
                        is_checked:'@integer(0, 1)',
                        status: '@integer(1, 1)',
                        mobile:'@integer(0, 1)',
                        skill_detail: '@cname',
                        is_appraise:'@integer(60, 1000)',
                        head_img_url: Random.image('160x160'),
                        usernick: '@cname',
                    }
                ]
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

app.post('/soytime/order/getStuMobile', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: {
                stu_id:'@integer(60, 1000)',
                mobile:'@integer(60, 1000)',
                remainCount:'@integer(60, 1000)'
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 我的接单任务列表 */
app.post('/soytime/order/receiveList', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            'result|10': [
                {
                    order_id:'@integer(60, 1000)',
                    scene_name:'@integer(60, 1000)',
                    create_time:'@date',
                    head_img_url: Random.image('160x160'),
                    detail:'@integer(60, 1000)',
                    salary:'@integer(60, 1000)',
                    unit:'@integer(60, 1000)',
                    workplace:'@integer(60, 1000)',
                    start_time:'@date',
                    end_time:'@date',
                    period_times:'@integer(60, 1000)',
                    is_checked:'@integer(60, 1000)',
                    is_appraise:'@integer(0, 1)',
                }
            ]
        });

    res.send( JSON.stringify(data, null, 4) );
});

app.post('/soytime/order/receiveDetail', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: {
                order_id:'@integer(60, 1000)',
                scene_name:'@integer(60, 1000)',
                create_time:'@date',
                head_img_url: Random.image('160x160'),
                detail: '@name',
                salary:'@integer(60, 1000)',
                unit:'@name',
                number:'@integer(1, 10)',
                comp_addr:'@name',
                comp_longitude:118.094427,
                comp_latitude:24.462352,
                workplace:'@name',
                work_longitude:118.16601,
                work_latitude:24.473601,
                start_time:'@date',
                end_time:'@date',
                period_times:'@date',
                clientAppraise: {
                    goodCount:'@integer(1, 10)',
                    cenCount:'@integer(1, 10)',
                    poolCount:'@integer(1, 10)',
                    mobile:'@integer(1, 10)',
                    creator_name:'@cname'
                },
                'response|10': [
                    {
                        head_img_url: Random.image('160x160'),
                    }
                ],
                is_response:'@name',
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 接单评价 */
app.post('/soytime/appraise/appraiseOrder', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: '@integer(60, 1000)'
        });

    res.send( JSON.stringify(data, null, 4) );
});

app.post('/soytime/appraise/staAppraise', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: '@integer(60, 1000)'
        });

    res.send( JSON.stringify(data, null, 4) );
});




/* 查看场景下的学生列表 */
app.post('/soytime/server/list', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            'result|10': [
                {
                    user_id: '@cname',
                    usernick: '@cname',
                    sex: '@integer(1, 2)',
                    school_name: '@cname',
                    head_img_url: Random.image('160x160'),
                    detail: '@cname',
                    'serverImgs|3':
                    [{
                        img_url:  Random.image('160x160')
                    }],
                    collectCount: '@integer(1, 200)',
                    appraiseCount: '@integer(1, 200)',
                    viewCount: '@integer(1, 200)'
                }
            ]
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 查看学生服务信息 */
app.post('/soytime/server/stuInfo', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: {
                photo_url: '',
                head_img_url: Random.image('160x160'),
                user_id: '@cname',
                usernick: '@cname',
                school_name: '@cname',
                sceneIds: '200001-200002-200003',
                detail: '@cname',
                'serverImgs|3':
                [{
                    img_url:  Random.image('160x160')
                }],
                longitude: '@integer(1, 200)',
                latitude: '@integer(1, 200)',
                workplace: '@integer(1, 200)',
                timeConf:'12-21-41-62',
                orderAppraise: {
                    content: '@cname',
                    from_name: '@cname',
                    create_time: '@cname',
                    appraise_count: '@cname',
                    head_img_url: Random.image('160x160')
                }
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 查看学生的评价记录 */
app.post('/soytime/appraise/list', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: {
                count:{
                    allCount: '@integer(1, 200)',
                    goodCount: '@integer(1, 200)',
                    cenCount: '@integer(1, 200)',
                    poolCount: '@integer(1, 200)',
                },
                'appraises|10': [{
                    content: '@cname',
                    from_name: '@cname',
                    type: '@integer(1, 3)',
                    head_img_url: Random.image('160x160'),
                    create_time: '@date'
                }]
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});


/* 预约 */
app.post('/soytime/order/inviteOrder', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: '@integer(60, 1000)'
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 一键预约 */
app.post('/soytime/order/oneKeyOrder', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: {
                order_id: '@integer(60, 1000)'
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 地址列表 */
app.post('/soytime/address/list', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            'result|10': [{
                id: '@integer(60, 1000)',
                address: '@integer(60, 1000)',
                longitude: '@integer(60, 1000)',
                latitude: '@integer(60, 1000)'
            }]
        });

    res.send( JSON.stringify(data, null, 4) );
});

app.post('/soytime/address/add', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: {
                id: '@integer(60, 1000)',
                address: '@integer(60, 1000)',
                longitude: '@integer(60, 1000)',
                latitude: '@integer(60, 1000)'
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

app.post('/soytime/address/del', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result:'@integer(60, 1000)'
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 邀请消息 */
app.post('/soytime/msg/orderInviteList', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            'result|10': [{
                order_id:'@integer(60, 1000)',
                scene_name:'@integer(60, 1000)',
                create_time:'@integer(60, 1000)',
                head_img_url:Random.image('160x160'),
                detail:'@integer(60, 1000)',
                salary:'@integer(60, 1000)',
                unit:'@integer(60, 1000)',
                workplace:'@integer(60, 1000)',
                start_time:'@integer(60, 1000)',
                end_time:'@integer(60, 1000)',
                period_times:'@integer(60, 1000)',
                status:'@integer(60, 1000)'
            }]
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 评论详情 */
app.post('/soytime/msg/appraiseDetail', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            result: {
                head_img_url:Random.image('160x160'),
                nick_name:'@cname',
                order_content:'@cname',
                create_time:'@data',
                content:'@cname',
                type:'@integer(1, 3)',
                is_my_appraise:'@integer(0, 1)'
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 个人消息 */
app.post('/soytime/msg/list', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            'result|10': [{
                id:'@integer(60, 1000)',
                type:'@integer(1, 3)',
                from_id:'@integer(60, 1000)',
                head_img_url:Random.image('160x160'),
                nick_name:'@integer(60, 1000)',
                content:'@integer(60, 1000)',
                create_time:'@date'
            }]
        });

    res.send( JSON.stringify(data, null, 4) );
});

app.post('/soytime/msg/msnList', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            'result|10': [{
                head_img_url:Random.image('160x160'),
                nick_name:'@integer(60, 1000)',
                content:'@integer(60, 1000)',
                create_time:'@integer(60, 1000)',
                isMe:'@integer(0, 1)'
            }]
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 评价消息 */
app.post('/soytime/msg/msgAppraise', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            'result|10': [{
                head_img_url:Random.image('160x160'),
                nick_name:'@integer(60, 1000)',
                order_content:'@integer(60, 1000)',
                create_time:'@integer(60, 1000)',
                appraise_content:'@integer(60, 1000)',
                type:'@integer(60, 1000)',
                is_my_appraise:'@integer(60, 1000)'
            }]
        });

    res.send( JSON.stringify(data, null, 4) );
});

/* 红包 */
app.post('/soytime/gift/orderGift', function (req, res) {
    var Random = Mock.Random,
        data   = Mock.mock({
            success: '1',
            'result': {
                price:'@integer(60, 1000)'
            }
        });

    res.send( JSON.stringify(data, null, 4) );
});




module.exports = app;
