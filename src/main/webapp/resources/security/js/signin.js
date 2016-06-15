$(function(){
    // frameset框架嵌套，跳转到最外层
	if (top.location != self.location){
		top.location=self.location;
	}
	
    $('.login-box').css({'position':'absolute','left':($(window).width()-692)/2});
	$(window).resize(function(){
    	$('.login-box').css({'position':'absolute','left':($(window).width()-692)/2});
	});
	
	// 登录
	$('#loginBtn').click(function() {
		var data = {};
		var t = $('#loginForm').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		var url = $("#basePath").val()+"/user/login";
		doPostAjax(url, data, doSuccessLoginBack);
	});
	
	// swiper
	var mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 0,
        //effect : 'flip',
        observer: true,
        observeParents: true,
        threshold: 30,
        pagination: '.tabs',
        paginationClickable: true,
        bulletClass: 'tab',
        onlyExternal : true,
        bulletActiveClass: 'active',
//        //loop: true,
        paginationBulletRender: function (index, className) {
            var html = '';
            switch (index) {
                case 0:
                    html = '<a class="'+className+'" style="margin-right: 200px;">用户登录</a>';
                    break;
                case 1:
                    html = '<a class="'+className+'">忘记密码？</a>';
                    break;
                default:
                    html = '';
            }
            return html;
        }
    });
	
	function count(el, second) {
		el.prop('disabled', true);
		var timer = setInterval(function() {
			second--;
			el.val('重发('+second+')');
			if (second == 0) {
				el.val('获取验证码');
				el.prop('disabled', false);
				clearInterval(timer);
			}
		}, 1000);
	}
	
	$('#smsBtn').on('click', function() {
		if (!$('#mobile').val()) {
			alert('请输入手机号码');
		} else {
			$('#smsBtn').prop('disabled', true);
			doPostAjax($("#basePath").val()+"/gene/findloginpwd/send", {
				mobile: $('#mobile').val()
			}, function(res) {
				$('#smsBtn').prop('disabled', false);
				if (res.success) {
					count($('#smsBtn'), 60);
				}
			});
		}
	});
	
	$('#confirmBtn').on('click', function() {
		if (!$('#mobile').val()) {
			alert('请输入手机号码');
		} else if (!$('#smsCaptcha').val()) {
			alert('请输入短信验证码');
		} else if (!$('#newLoginPwd').val()) {
			alert('请输入新密码');
		} else {
			$('#confirmBtn').prop('disabled', true);
			doPostAjax($("#basePath").val()+"/user/pwd/reset", {
				mobile: $('#mobile').val(),
				smsCaptcha: $('#smsCaptcha').val(),
				newLoginPwd: $('#newLoginPwd').val()
			}, function(res) {
				$('#confirmBtn').prop('disabled', false);
				if (res.success) {
					alert('恭喜您重置密码成功！');
					mySwiper.slidePrev();
				} else {
					alert(res.msg);
				}
			});
		}
	});
	

});

function doSuccessLoginBack(res){
	if (res.success == true) {
		location.href = $("#basePath").val() + "/security/main.htm";
	}else{
		alert(res.msg);
	}
}