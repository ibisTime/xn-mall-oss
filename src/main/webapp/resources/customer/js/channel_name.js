$(function() {
	
	
	//获取菜单URL入参
	var userId = getQueryString("userId");
	
	if(isBlank(userId)){
		$("#operate").val("add");
	}else{
		$("#operate").val("edit");
		$("#operContent").text("修改用户");
		var data = {"userId":userId};
		var url = $("#basePath").val()+"/user/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
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
		data['userId'] = $("#userId").html();
		var url = $("#basePath").val()+"/customer/channel/editname";
		doPostAjax(url, data, doSaveSuccessBack);
	});
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/channel.htm";
	});
	
	$("#jsForm").validate({
		rules: {
			realName: {
				required: true,
				maxlength: 16
			}
		},
		messages: {
			realName: {
			required: "请输入新渠道商名称",
			maxlength: jQuery.format("新渠道商名称不能大于{0}个字符")
			}
		}
	});

	
	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#userId").html(res.data.userId)
			$("#oldrealName").html(res.data.realName);
		}else{
			alert(res.msg);
		}
	}
});

function doSaveSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/customer/channel.htm";
	}else{
		alert(res.msg);
	}
}

