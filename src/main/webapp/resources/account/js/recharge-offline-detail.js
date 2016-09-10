$(function() {
	var code = getQueryString("code");
	var accountNumber = getQueryString("accountNumber");
	var data = {"code":code,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/account/recharge/rmb/list";
	doGetAjax(url, data, doGetDetailBack);
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
			$("#fromType").html(Dict.getName('charge_type',result.fromType));
			$("#fromCode").html(result.fromCode);
			$("#mobile").html(result.mobile);
			$("#approveNote").html(result.approveNote);
		}
	}else{
		alert(res.msg);
	}
}