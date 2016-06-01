$(function() {

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
		data['kind'] = 'f2';
		var url = $("#basePath").val()+"/customer/channel/add";
		doPostAjax(url, data, doSaveSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/channel.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			mobile: {
				required: true,
				maxlength: 16
			},
			realName: {
				required: true,
				maxlength: 16
			},
			address: {
				required: true,
				maxlength: 32
			}
		},
		messages: {
			mobile: {
				required: "请输入手机号",
				maxlength: jQuery.format("手机号不能大于{0}个字符")
			},
			realName: {
				required: "请输入渠道商名称",
				maxlength: jQuery.format("渠道商名称不能大于{0}个字符")
			},
			address: {
				required: "请输入收货地址",
				maxlength: jQuery.format("收货地址不能大于{0}个字符")
			}
		}
	});
});

function doSaveSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/customer/channel.htm";
	}else{
		alert(res.msg);
	}
}