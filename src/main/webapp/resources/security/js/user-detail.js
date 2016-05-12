$(function() {
	var userId = getQueryString("userId");
	$('#idKind').renderDropdown(Dict.getIDKindName());
	$('#kind').renderDropdown(Dict.getRoleKindName());
	//新增修改判断
	if(isBlank(userId)){
		$("#operate").val("add");
	}else{
		$("#operate").val("edit");
		$("#operContent").text("修改用户");
		var data = {"userId":userId};
		var url = $("#basePath").val()+"/user/detail";
		doGetAjax(url, data, doGetDetailBack);
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
		var url = $("#basePath").val()+"/user/"+$("#operate").val();
		doPostAjax(url, data, doSaveSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/security/user.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			loginName: {
				required: true,
				maxlength: 16
			},
			userRefence: {
				required: false,
				maxlength: 32
			},
			idKind: {
				required: false,
				maxlength: 2
			},
			idNo: {
				required: false,
				maxlength: 32
			},
			realName: {
				required: true,
				maxlength: 16
			},
			contact: {
				required: true,
				maxlength: 32
			},
			kind: {
				required: true,
				maxlength: 32
			},
			remark: {
				maxlength: 200
			}
		},
		messages: {
			loginName: {
				required: "请输入登录名",
				maxlength: jQuery.format("登录名不能大于{0}个字符")
			},
			userRefence: {
				maxlength: jQuery.format("推荐人不能大于{0}个字符")
			},
			idKind: {
				maxlength: jQuery.format("证件类型不能大于{0}个字符")
			},
			idNo: {
				maxlength: jQuery.format("证件号不能大于{0}个字符")
			},
			realName: {
				required: "请输入真实姓名",
				maxlength: jQuery.format("真实姓名不能大于{0}个字符")
			},
			contact: {
				required: "请输入联系方式",
				maxlength: jQuery.format("联系方式不能大于{0}个字符")
			},
			kind: {
				required: "请输入哪一方",
				maxlength: jQuery.format("哪一方不能大于{0}个字符"),
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符"),
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success) {
			$("#userId").val(res.data.userId);	
			$('#loginName').replaceWith($('<span>'+res.data.loginName+'</span>'));
			$('#userReferee').replaceWith($('<span>'+res.data.userReferee+'</span>'));
			$('#idKind').replaceWith($('<span>'+(res.data.idKind ? Dict.getIDKindName(res.data.idKind) : '-')+'</span>'));
			$('#idNo').replaceWith($('<span>'+res.data.idNo+'</span>'));
			$('#realName').replaceWith($('<span>'+res.data.realName+'</span>'));
			$("#contact").val(res.data.contact);
			$("#remark").val(res.data.remark);
			$('#kind').replaceWith($('<span>'+Dict.getRoleKindName(res.data.kind)+'</span>'));
	}else{
		alert(res.msg);
	}
}

function doSaveSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/security/user.htm";
	}else{
		alert(res.msg);
	}
}