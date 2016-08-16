$(function() {
	// 表格初始化
	var code = getQueryString('code');
	var data={"code":code};
	var url = $("#basePath").val()+"/account/inciseScore/detail";
	doGetAjax(url,data,doSuccessData);
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/score_rlue.htm";
	});
});

function doSuccessData(res){
	if (res.success) {
		var result = res.data;
		$("#quantity").html(moneyFormat(result.quantity));
		if (result.isApprove == 0) {
			$('#priceCtn').hide();
		}
		$("#price").html(moneyFormat(result.price));
		$("#isApprove").html(Dict.getName('score_sell_way', result.isApprove));
		$("#remark").html(result.remark);
	}else{
		alert(res.msg);
	}
}
