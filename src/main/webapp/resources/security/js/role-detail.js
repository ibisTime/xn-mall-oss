$(function() {
	$('#level').renderDropdown(Dict.getRoleLevelName());
	
	//获取菜单URL入参
	var code = getQueryString("code");
	//新增修改判断
	if(isBlank(code)){
		$("#operate").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		$("#operate").val("edit");
		$("#operContent").text("修改角色");
		var data = {"code":code};
		var url = $("#basePath").val()+"/role/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	//提交
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
	    	return;
	    }
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['kind'] = '1';
		var operator = $("#operate").val() != "edit"?"add":"edit";
		var url = $("#basePath").val()+"/role/" + operator;
		doPostAjax(url, data, doSucBackSave);
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			name: {
				required: true,
				maxlength: 32
			},
			level: "required",
			remark: {
				maxlength: 100
			}
		},
		messages: {
			name: {
				required: "请输入角色名称",
				maxlength: jQuery.format("角色名称不能大于{0}个字符")
			},
			level: "请选择角色等级",
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/security/role.htm";
	});
});


//获取详情回调方法
function doSucBackGetDetail(res){
	if (res.success) {
		$("#code").val(res.data.code);
		$("#name").val(res.data.name);
		$("#level").val(res.data.level);
		$("#remark").val(res.data.remark);
	}else{
		alert(res.msg);
	}
}

//保存回调方法
function doSucBackSave(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/security/role.htm";
	}else{
		alert(res.msg);
	}
}