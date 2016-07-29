
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
		data['loginName']= $('#mobile').val();
		var url = $("#basePath").val()+"/customer/zhongduan/add";
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
				maxlength: 11
			},
			remark: {
				maxlength: 200
			}
		},
		messages: {
			
			mobile: {
				required: "请输入手机号",
				maxlength: jQuery.format("手机号不能大于{0}个字符")
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符"),
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