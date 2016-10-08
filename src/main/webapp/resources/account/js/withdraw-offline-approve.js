$(function() {
	var code = getQueryString("code");
	var accountNumber = getQueryString("accountNumber");
	var data = {"code":code,"start":"1","limit":"10", "accountNumber": '',"currency": 'CNY'};
	var url = $("#basePath").val()+"/account/withdrawOrderPage";
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
		goBack();
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			approveNote: {
				required: true,
				maxlength: 30
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success) {
		if(res.data.list.length > 0){
			var result = res.data.list[0];
			$("#code").html(result.code);
			$("#accountNumber").html(result.accountNumber);
			$("#status").html(Dict.getName('recharge_status',result.status));
			$("#amount").html(moneyFormat(result.amount,2));
			$("#createDatetime").html(dateFormat(result.createDatetime,'yyyy-MM-dd HH:mm:ss'));
			$("#toType").html(Dict.getName('charge_type',result.toType));
			$("#toCode").html(result.toCode);
			$("#fromCode").html(result.toBelong);
			$("#mobile").html(result.mobile);
		}
	}else{
		alert(res.msg);
	}
}

function doApprove(approveResult){
	if(!$("#jsForm").valid()){
		return false;
	}
	var data = {"approveResult":approveResult,"approveNote":$("#approveNote").val()};
	data['withdrawNo']=$("#code").html();
	var url = $("#basePath").val()+"/account/approveWithdrawOrder";
	doPostAjax(url, data, doSuccessBack);
}
	
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		goBack();
	}else{
		alert(res.msg);
	}
}