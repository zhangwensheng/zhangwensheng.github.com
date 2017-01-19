var GD = {};
/**
* 获取微信配置信息
*/
GD.wx = function(){
    $.ajax({
        type: 'post',
        url: '/verify/wechat/jssdk/h5',
        data: JSON.stringify({
            url : encodeURIComponent(window.location.href.split('#')[0])
        }),
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () { },
        success: function (data) {
            if(data.code === 1){
                wx.config({
                    debug: false,
                    appId: data.data.appId, // 必填，公众号的唯一标识
                    timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                    signature: data.data.signature, // 必填，签名
                    jsApiList: [
                        'onMenuShareTimeline', //分享到朋友圈
                        'onMenuShareQQ', //分享到QQ
                        'onMenuShareWeibo', //分享到微博
                        'onMenuShareAppMessage' //发送给朋友
                    ]
                });
            }else{
                console.log('++++++++++++++++++++++++'+data.msg);
            }
        },
        error: function (error) {
            console.log("error");
        }
    });
}

/**
* 获取微信版本号
*/
GD.wx_ver = function(){
    var ua = navigator.userAgent;
    //获取微信版本号：例如5.2.1
    function get(){
     var reg = /MicroMessenger\/([\d\.]+)/i,
         ret = ua.match(reg);
    if (ret && ret[1]){
        return ret[1];
    }
     return false;
    }
    if (typeof WeixinJSBridge != "undefined") {
        if(get()<'6.0'){
            alert('您的微信版本过于陈旧,无法领取卡券,请更新您的微信版本！');
        }
    }
}

var TOOL;
(function(){
    var _this;
    var tool = function(){
        _this = this;
    };
    tool.prototype.init = function(){
        _this.stopScrolling();
    };
    tool.prototype.stopScrolling = function(e){
        document.addEventListener('touchmove', _this.preventDefault, false);
    };
    tool.prototype.preventDefault = function(e){
        e.preventDefault();
    };

    /**
    *执行微信分享
    *
    */
    tool.prototype.weixin = function(num){
        GD.wx();

        var _title = '',
            _desc = '';

        if(num == '' || num == 0 || num == undefined){
            _title = system.share_title;
            _desc = system.share_desc;
            num = 0;
        }else{
            title = system.share_title_end;
            _desc = system.share_desc_end;
        }
        
        var options = {
            imgUrl : system.share_icon,
            link : system.share_url,
            title : this.formatText(_title, num),
            desc : this.formatText(_desc, num),
            success : function(){
                
            }
        };
        wx.ready(function() {
            wx.onMenuShareTimeline(options);
            wx.onMenuShareAppMessage(options);
            wx.onMenuShareQQ(options);
            wx.onMenuShareWeibo(options);
        });
    }

    TOOL = new tool();
    TOOL.init();
})();