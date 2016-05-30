$(function() {
	var hlNo = getQueryString("hlNo");
	var data = {"hlNo":hlNo,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/account/artificialApproveCheck";
	doGetAjax(url, data, doGetDetailBack);
	
	//提交
	$('#passBtn').click(function() {
		doApprove("1");
	});
	
	//提交
	$('#noPassBtn').click(function() {
		doApprove("0");
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/account/red_blue.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			remark: {
				required: true,
				maxlength: 64
			}
		},
		messages: {
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data.list.length > 0){
			var result = res.data.list[0];
			$("#hlNo").html(result.hlNo);
			$("#accountNumber").html(result.accountNumber);
			$("#type").html(Dict.getName('biz_type',result.type));
			$("#status").html(Dict.getName('order_status',result.status));
			$("#direction").html(Dict.getName('account_direction',result.direction));
			$("#amount").html(moneyFormat(result.amount,2));
			$("#applyUser").html(result.applyUser);
			$("#applyNote").html(result.applyNote);
			$("#createDatetime").html(dateFormat(result.updateDatetime));
			$("#remark").val(result.remark);
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

//审批
function doApprove(approveResult){
	if(!$("#jsForm").valid()){
		return false;
	}
	var data = {"hlNo":$("#chargeNo").html(),"approveResult":approveResult,"approveNote":$("#approveNote").val()};
	var url = $("#basePath").val()+"/account/artificialApproveCheck";
	doPostAjax(url, data, doSuccessBack);
}
	
//回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/red_blue.htm";
	}else{
		alert(res.msg);
	}
}

