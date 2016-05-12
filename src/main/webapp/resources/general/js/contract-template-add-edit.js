//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
var ue = UE.getEditor('content');
//页面初始化
var dictContractStatus = null;
var dictContractType = null;
$(function(){
	//页面数据字典初始化
	initData();
	$('#type').renderDropdown(Dict.getName('contract_template_type'));
	$('#status').renderDropdown(Dict.getName('contract_template_status'));
	var id = getQueryString("id");
	//新增修改判断
	if(isBlank(id)){
		$("#operate").val("add");
	}else{
		$("#operate").val("edit");
		$("#operContent").text("修改合同模板");
		var data = {"id":id};
		var url = $("#basePath").val()+"/general/contractTemplate/detail";
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
		var url = $("#basePath").val()+"/general/contractTemplate/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/general/contract_template.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			title: {
				required: true,
				maxlength: 255
			},
			content: {
				required: true,
			},
			type: {
				required: true,
			},
			status: {
				required: true,
			},
			remark: {
				required: false,
				maxlength: 255
			}
		},
		messages: {
			title: {
				required: "请输入标题",
				maxlength: jQuery.format("标题不能大于{0}个字符")
			},
			content: {
				required: "请输入内容",
			},
			type: {
				required: "请选择类型",
			},
			status: {
				required: "请选择状态",
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});
function initData(){
}

function doGetDetailBack(res){
	if (res.success) {
		var result = res.data;
		$("#id").val(result.id);
		$("#title").val(result.title);
		ue.ready(function(){
			ue.setContent(result.content);
		});
		$("#type").val(result.type);
		$("#status").val(result.status);
		$("#remark").val(result.remark);
	}else{
		alert(res.msg);
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/general/contract_template.htm";
	}else{
		alert(res.msg);
	}
}