$(function(){
	//证件类型
	$('#idKind').renderDropdown(Dict.getName('id_kind'));

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
		var url = $("#basePath").val()+"/operator/operatorEdit/back";
		doPostAjax(url, data, doSuccessBack);
	});
	
	$("#smsBtn").click(function() {
		var url = $("#basePath").val()+"/general/operator/detail";
    	var data = {"userId":$("#userId").val()};
		doGetAjax(url, data, doSuccessOpBack);
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			tradePwd: {
				required: true,
				maxlength: 16
			},
			smsCaptcha: {
				required: true,
				maxlength: 8
			},
			idKind: {
				required: true,
			},
			idNo: {
				required: true,
				maxlength: 32
			},
		},
		messages: {
			tradePwd: {
				required: "请输入新的交易密码",
				maxlength: jQuery.format("交易密码不能大于{0}个字符")
			},
			smsCaptcha: {
				required: "请输入短信验证码",
				maxlength: jQuery.format("短信验证码不能大于{0}个字符")
			},
			idKind: {
				required: "请选择证件类型",
			},
			idNo: {
				required: "请输入证件号",
				maxlength: jQuery.format("证件号不能大于{0}个字符")
			},
		}
	});
});

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/operator/back_pwd.htm";
	}else{
		alert(res.msg);
	}
}
function doSuccessBack2(res) {
	if (res.success == true) {
		alert("短信发送成功");
	}else{
		alert(res.msg);
	}
}
function doSuccessOpBack(res){
	if (res.success == true) {
	var url = $("#basePath").val()+"/operator/operatorEdit/sms";
	var data = {"mobile":res.data.mobile,"bizType":"M12"};
	doPostAjax(url, data, doSuccessBack2);}
	else{
		alert(res.msg);
	}
}
