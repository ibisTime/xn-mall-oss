$(function() {
	var code = getQueryString("code");
	var accountNumber = getQueryString("accountNumber");
	var data = {"code":code,"start":"1","limit":"10", "accountNumber": '',"currency": 'CNY'};
	var url = $("#basePath").val()+"/account/withdrawOrderPage";
	doGetAjax(url, data, doGetDetailBack);
});

function doGetDetailBack(res){
	if (res.success) {
		if(res.data.list.length > 0){
			var result = res.data.list[0];
			$("#code").html(result.code);
			$("#accountNumber").html(result.accountNumber);
			$("#status").html(Dict.getName('withdraw_status',result.status));
			$("#amount").html(moneyFormat(result.amount,2));
			$("#createDatetime").html(dateFormat(result.createDatetime,'yyyy-MM-dd HH:mm:ss'));
			$("#toType").html(Dict.getName('charge_type',result.toType));
			$("#toCode").html(result.toCode);
			$("#mobile").html(result.mobile);
			$("#approveUser").html(result.approveUser);
			$("#approveDatetime").html(dateFormat(result.approveDatetime,'yyyy-MM-dd HH:mm:ss'));
			$("#approveNote").html(result.approveNote);
			$("#payUser").html(result.payUser);
			$("#payDatetime").html(dateFormat(result.payDatetime,'yyyy-MM-dd HH:mm:ss'));
			$("#payNote").html(result.payNote);
		}
	}else{
		alert(res.msg);
	}
}