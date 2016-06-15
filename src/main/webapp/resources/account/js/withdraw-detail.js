//账户状态
var orderStatus = null;
//渠道
var channel = null;
$(function() {

	var code = getQueryString("code");
	var data = {"code":code,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/account/withdrawOrderPage";
	
	// 表格初始化
	doGetAjax(url, data, doGetDetailBack);
	
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/account/withdraw.htm";
	});
	
});

function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data.list.length > 0){
			var result = res.data.list[0];
			$("#withdrawNo").html(result.code);
			$("#mobile").html(result.mobile);
			$("#realName").html(result.realName);
			$("#toBelong").html(result.toBelong);
			$("#bankcardNo").html(result.toCode);
			$("#accountNumber").html(result.accountNumber);
			$("#status").html(Dict.getName('withdraw_status', result.status));
			$("#amount").html(moneyFormat(result.amount,2));
			$("#createDatetime").html(dateFormat(result.createDatetime,'yyyy-MM-dd HH:mm:ss'));
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

