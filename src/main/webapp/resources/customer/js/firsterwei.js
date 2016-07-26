
$(function() {
	$('#isApprove').renderDropdown(Dict.getName("isApprove"));

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
		var url = $("#basePath").val()+"/account/incise/score";
		doPostAjax(url, data, doSaveSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/score_rlue.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			quantity: {
				required: true,
				number:true,
				maxlength: 11
			},
			price: {
				required: true,
				maxlength: 11
			},
			isApprove: {
				required: true,
				maxlength: 32
			},
			remark: {
				maxlength: 200
			}
		},
		messages: {
			quantity: {
				required: "请输入积分数量",
				maxlength: jQuery.format("积分数量不能大于{0}个字符")
			},
			price: {
				required: "请输入人民币值",
				maxlength: jQuery.format("人民币值不能大于{0}个字符")
			},
			isApprove: {
				required: "请选择是否审批",
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符"),
			}
		}
	});
});

function doSaveSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/customer/score_rlue.htm";
	}else{
		alert(res.msg);
	}
}