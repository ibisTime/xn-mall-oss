//页面初始化
$(function(){
	var id = getQueryString('id');
	//新增修改判断
	if(isBlank(id)){
		$("#operate").val("add");
	}else{
		$("#operate").val("edit");
		$("#operContent").text("修改系统参数");
		var data = {"id":id};
		var url = $("#basePath").val()+"/general/system/param/detail";
		doGetAjax(url, data, doGetDetailBack);
	}
	
	//提交
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
		var data = $('#jsForm').serializeObject();
		var url = $("#basePath").val()+"/general/system/param/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/general/sys_param.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			key: {
				required: true,
				maxlength: 20
			},
			value: {
				required: true,
				maxlength: 255
			},
			note: {
				required: true,
				maxlength: 30
			},
			remark: {
				required: false,
				maxlength: 200
			}
		},
		messages: {
			key: {
				required: "请输入参数键",
				maxlength: jQuery.format("参数键不能大于{0}个字符")
			},
			value: {
				required: "请输入参数值",
				maxlength:jQuery.format("参数值不能大于{0}个字符")
			},
			note: {
				required: "请输入参数说明",
				maxlength:jQuery.format("参数说明不能大于{0}个字符")
			},
			remark: {
				required: "请输入备注",
				maxlength:jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success) {
		result = res.data;
		$("#id").val(result.id);
		$('#key').replaceWith($('<span>'+result.ckey+'</span>'));
		$("#value").val(result.cvalue);
		$("#note").val(result.note);
	}else{
		alert(res.msg);
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/general/sys_param.htm";
	}else{
		alert(res.msg);
	}
}