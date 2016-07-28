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
			loginName: {
				required: true,
				maxlength: 16
			},
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