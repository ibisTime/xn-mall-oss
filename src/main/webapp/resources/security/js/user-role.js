$(function() {
	// 角色下拉框初始化,同步调用
	doGetAjaxIsAsync($("#basePath").val() + "/role/list", null, false, doSuccessRoleBack);
	
	$("#userId").html(getQueryString("userId"));
	$("#loginName").html(decodeURI(getQueryString("loginName")));
	
	//查询当前用户的角色
	var data = {"userId":$("#userId").html()};
	doGetAjax($("#basePath").val()+"/user/detail", data, doGetDetailBack);
	
	//提交
	$('#subBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		var url = $("#basePath").val()+"/user/role/change";
		var data = {"userId":$("#userId").html(),"roleCode":$("#roleCode").val(), 'remark': $('#remark').val()};
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/security/user.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			roleCode: {
				required: true,
				maxlength: 32
			},
			remark: {
				maxlength: 200
			}
		},
		messages: {
			roleCode: {
				required: "请选择角色",
				maxlength: jQuery.format("角色不能大于{0}个字符")
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function doSuccessRoleBack(res){
	var data = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(data) != "undefined"){
		for(var i = 0;i < data.length;i++){
			html += "<option value='"+data[i].code+"'>" + data[i].name + "</option>";
		}
	}
	$("#roleCode").html(html);
}

function doGetDetailBack(res){
	if (res.success) {
		$("#roleCode").val(res.data.roleCode);
	}else{
		alert(res.msg);
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/security/user.htm";
	}else{
		alert(res.msg);
	}
}