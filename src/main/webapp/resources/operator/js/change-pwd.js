$(function(){
	//提交
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		var url = $("#basePath").val()+"/operator/operatorEdit/tradePwd";
		doPostAjax(url, data, doSuccessBack);
	});
	
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			oldTradePwd: {
				required: true,
				maxlength: 32
			},
			newTradePwd: {
				required: true,
				maxlength: 32
			},
		},
		messages: {
			oldTradePwd: {
				required: "请输入旧交易密码",
				maxlength: jQuery.format("新交易密码不能大于{0}个字符")
			},
			newTradePwd: {
				required: "请输入新交易密码",
				maxlength: jQuery.format("新交易密码不能大于{0}个字符")
			},
		}
	});
});

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/operator/change_pwd.htm";
	}else{
		alert(res.msg);
	}
}

