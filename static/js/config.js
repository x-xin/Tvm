// 全局变量定义入口
var EXT                      =  window.external,                                              // 取卡器设备
    LEAVE_TIMER              =  null,                                                         // 无操作定时器
    LEAVE_TIMER_MIN          =  1000 * 60 * 1.5,                                              // 无操作时间1.5min
    READ_CARD_TIMER          =  null,                                                         // 获取Card信息
    GO_SUCCESS_TIMER         =  null,                                                         // 打印成功后跳转到成功页面时间
    GO_SUCCESS_TIMER_MIN     =  1000 * 3,                                                     // 打印成功后3S跳转
    AJAX_URL                 =  "http://114.55.252.98:18083/service/ticket",   // 服务器请求路径

// 禁止选择文本
    omitformtags = ["input", "textarea", "select"]; 
omitformtags = omitformtags.join("|");

if (typeof document.onselectstart!="undefined"){
    document.onselectstart = new Function ("return false");
}else{
    document.onmousedown = function(e){
        if (omitformtags.indexOf(e.target.tagName.toLowerCase())==-1){
            return false
        }
    }
    document.onmouseup = function(){
        return true;
    }
}

// 禁止拖动
document.onmousemove = function(e){
    return false;
}
