$(function() {
	// 父菜单下拉框初始化
	var url = $("#basePath").val() + "/menu/list";
	//同步调用
	doGetAjaxIsAsync(url, null,false, doSuccessPCodeBack);
	
	$('#kind').renderDropdown(Dict.getRoleKindName());
	
	var menuCode = getQueryString('code');
	//新增修改判断
	if(isBlank(menuCode)){
		$("#operate").val("add");
	}else{
		$("#operate").val("edit");
		$("#operContent").text("修改菜单");
		var data = {"code":menuCode};
		var url = $("#basePath").val()+"/menu/detail";
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
		data['kind'] = '1';
		var url = $("#basePath").val()+"/menu/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/security/menu.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			code: {
				required: true,
				number:true,
				maxlength: 32
			},
			parentCode: {
				required: true,
				maxlength: 32
			},
			name: {
				required: true,
				maxlength: 32
			},
			type: {
				required: true,
				maxlength: 4
			},
			url: {
				required: true,
				maxlength: 64
			},
			orderNo: {
				required: true,
				number:true,
				maxlength: 8
			},
			remark: {
				maxlength: 64
			}
		},
		messages: {
			code: {
				required: "请输入菜单编号",
				number: "菜单编号请输入数字",
				maxlength: jQuery.format("菜单编号不能大于{0}个字符")
			},
			parentCode: {
				required: "请输入父菜单编号",
				maxlength: jQuery.format("菜单编号不能大于{0}个字符")
			},
			name: {
				required: "请输入菜单名称",
				maxlength: jQuery.format("菜单名称不能大于{0}个字符")
			},
			type: {
				required: "请选择类型",
				maxlength: jQuery.format("菜单类型不能大于{0}个字符")
			},
			url: {
				required: "请输入菜单地址",
				maxlength: jQuery.format("菜单地址不能大于{0}个字符")
			},
			orderNo: {
				required: "请输入顺序号",
				number: jQuery.format("顺序号请输入数字"),
				maxlength: jQuery.format("顺序号不能大于{0}个字符")
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success) {
		$("#code").val(res.data.code);
		$("#name").val(res.data.name);
		$("#url").val(res.data.url);
		$("#parentCode").val(res.data.parentCode);
		$("#type").val(res.data.type);
		$("#orderNo").val(res.data.orderNo);
		$("#remark").val(res.data.remark);
	}else{
		alert(res.msg);
	}
}

//父菜单下拉框回置方法
function doSuccessPCodeBack(res){
	if (res.success == true) {
		var data = res.data;
		var html = "<option value=''>请选择</option>";
		if(typeof(data) != "undefined"){//判断undifined
			for(var i = 0;i < data.length;i++){
				if(data[i].code == $("#parentCode").val()){
					html += "<option selected='selected' value='"+data[i].code+"'>"+data[i].code + "   " + data[i].name+"</option>";
				}else{
					html += "<option value='"+data[i].code+"'>"+data[i].code + "   " + data[i].name+"</option>";
				}
			}
		}
		$("#parentCode").html(html);
	}else{
		alert(res.msg);
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/security/menu.htm";
	}else{
		alert(res.msg);
	}
}