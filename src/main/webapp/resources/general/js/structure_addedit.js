var summary = UE.getEditor('summary');
	var description = UE.getEditor('description');
$(function() {
	$('#status').renderDropdown(Dict.getName('stru_status'));
	var code = getQueryString('code');
	//新增修改判断
	if(isBlank(code)){
		$("#operate").val("add");
	}else{
		$("#code").val(code);
		$("#operate").val("edit");
		$("#operContent").text("修改结构管理");
		var data = {"code":code};
		var url = $("#basePath").val()+"/general/structure/detail";
//		var url = $("#basePath").val()+"/json/data/1.json";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	//提交
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
	    if (!summary.hasContents()) {
	    	alert('概述不能为空');
	    	return;
	    }
	    if (!description.hasContents()) {
	    	alert('描述不能为空');
	    	return;
	    }
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		var url = $("#basePath").val()+"/general/structure/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/general/structure.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			name: {
				required: true,
				maxlength: 64
			},
			summary: {
				required: true,
			},
			description: {
				required: true,
			},
			status: {
				required: true,
			},
			remark: {
				required: true,
				maxlength: 64
			}
		},
		messages: {
			name: {
				required: "请输入名称",
				maxlength: jQuery.format("名称不能大于{0}个字符")
			},
			summary: {
				required: "请输入概述",
				maxlength: jQuery.format("概述不能大于{0}个字符")
			},
			description: {
				required: "请输入描述",
				maxlength: jQuery.format("描述不能大于{0}个字符")
			},
			status: {
				required: "请选择状态",
			},
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/general/structure.htm";
	}else{
		alert(res.msg);
	}
}

function doSucBackGetDetail(res){
	if (res.success) {
		$('#name').val(res.data.name);
		summary.ready(function(){
		    //需要ready后执行，否则可能报错
			summary.setContent(res.data.summary);
		});
		description.ready(function(){
		    //需要ready后执行，否则可能报错
			description.setContent(res.data.description);
		});
		$('#remark').val(res.data.remark);
		$('#status').val(res.data.status);
	}else{
		alert(res.msg);
	}
}
