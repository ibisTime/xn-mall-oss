define([
    'app/controller/base',
    'app/util/ajax',
    'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
], function(base, Ajax, wx) {

    init();
    
    function init() {
        getInitWXSDKConfig();
        addListener();
    }
    
    function addListener() {
    }
    
    // 获取微信初始化的参数
    function getInitWXSDKConfig() {
        Ajax.get("807910", {
            companyCode: SYSTEM_CODE,
            url: location.href.split("#")[0]
        }).then(function(res) {
            initWXSDK(res.data);
        }, function() {
            // alert("catch");
        });
    }
    // 初始化微信参数
    function initWXSDK(data) {
        wx.config({
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ["onMenuShareQQ", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQZone"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function() {
            // 分享给朋友
            setTimeout(function(){
            	wx.onMenuShareAppMessage({
	                title: "菜狗商城,摇一摇领奖", // 分享标题
	                desc: "菜狗商城,摇一摇领奖", // 分享描述
	                link: SHAKEURL+"/shake/index.html", // 分享链接
	                imgUrl: "http://"+SHAKEURL+"/static/images/logo2.png", // 分享图标
	                success: function() {
	                    // 用户确认分享后执行的回调函数
	                    shakeWin();
	                },
	                fail: function(msg) {
	                    alert(JSON.stringify(msg));
	                }
	            });
	            // 分享到朋友圈
	            wx.onMenuShareTimeline({
	                title: "菜狗商城,摇一摇领奖", // 分享标题
	                link: SHAKEURL+"/shake/index.html", // 分享链接
	                imgUrl: "http://"+SHAKEURL+"/static/images/logo2.png", // 分享图标
	                success: function() {
	                    // 用户确认分享后执行的回调函数
	                    shakeWin();
	                },
	                fail: function(msg) {
	                    alert(JSON.stringify(msg));
	                }
	            });
	            // 分享到QQ
	            wx.onMenuShareQQ({
	                title: "菜狗商城,摇一摇领奖", // 分享标题
	                desc: "菜狗商城,摇一摇领奖", // 分享描述
	                link: SHAKEURL+"/shake/index.html", // 分享链接
	                imgUrl: "http://"+SHAKEURL+"/static/images/logo2.png", // 分享图标
	                success: function () {
	                   shakeWin();
	                },
	                fail: function(msg) {
	                    alert(JSON.stringify(msg));
	                }
	            });
	            // 分享到QQ空间
	            wx.onMenuShareQZone({
	                title: "菜狗商城,摇一摇领奖", // 分享标题
	                desc: "菜狗商城,摇一摇领奖", // 分享描述
	                link: SHAKEURL+"/shake/index.html", // 分享链接
	                imgUrl: "http://"+SHAKEURL+"/static/images/logo2.png", // 分享图标
	                success: function () {
	                   shakeWin();
	                },
	                fail: function(msg) {
	                    alert(JSON.stringify(msg));
	                }
	            });
            },1000)
        });
        wx.error(function(error) {
            alert("微信分享sdk初始化失败" + JSON.stringify(error));
        })
    }
    
    function shakeWin() {
    	base.showMsg("分享成功回调")
    }
});
