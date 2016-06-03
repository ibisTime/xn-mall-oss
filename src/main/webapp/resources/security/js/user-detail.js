$(function() {
	var userId = getQueryString("userId");
	$('#idKind').renderDropdown(Dict.getIDKindName());
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
		data['kind'] = '01';
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
			mobile: {
				required: true,
				maxlength: 16
			},
			idKind: {
				required: true,
				maxlength: 2
			},
			idNo: {
				required: true,
				maxlength: 32
			},
			realName: {
				required: true,
				maxlength: 16,
				chinese:true
			},
			userReferee: {
				required: false,
				maxlength: 32
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
			idKind: {
				required: "请输入证件类型",
				maxlength: jQuery.format("证件类型不能大于{0}个字符")
			},
			idNo: {
				required: "请输入证件号",
				maxlength: jQuery.format("证件号不能大于{0}个字符")
			},
			realName: {
				required: "请输入真实姓名",
				maxlength: jQuery.format("真实姓名不能大于{0}个字符")
			},
			userRefence: {
				maxlength: jQuery.format("推荐人不能大于{0}个字符")
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
		$('#mobile').replaceWith($('<span>'+res.data.mobile+'</span>'));
		$('#idKind').replaceWith($('<span>'+(res.data.idKind ? Dict.getIDKindName(res.data.idKind) : '-')+'</span>'));
		$('#idNo').replaceWith($('<span>'+res.data.idNo+'</span>'));
		$('#realName').replaceWith($('<span>'+res.data.realName+'</span>'));
		$('#userReferee').replaceWith($('<span>'+res.data.userReferee+'</span>'));
		$("#remark").val(res.data.remark);
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