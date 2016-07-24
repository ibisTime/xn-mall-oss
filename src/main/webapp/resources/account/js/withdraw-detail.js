//账户状态
var orderStatus = null;
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
			$("#status").html(Dict.getName('withdraw_status', result.status));
			$("#amount").html(moneyFormat(result.amount,2));
			$("#price").html(moneyFormat(result.price,2));
			$("#createDatetime").html(dateFormat(result.createDatetime,'yyyy-MM-dd HH:mm:ss'));
			$("#approveUser").html(result.approveUser);
			$("#approveDatetime").html(dateFormat(result.approveDatetime,'yyyy-MM-dd HH:mm:ss'));
			$("#refNo").html(result.refNo);
			$("#payNote").html(result.payNote);
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

