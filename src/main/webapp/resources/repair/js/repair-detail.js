$(function() {
	var code = getQueryString("code");
	var data = {"code":code,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/repair/queryPage";
	doGetAjax(url, data, doGetDetailBack);
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/repair/repair.htm";
	});
	
});
	
function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data.list.length > 0){
			var result = res.data.list[0];
			$("#repairCode").html(result.code);
			$("#productCode").html(result.goodsCode);
			$("#productName").html(result.productName);
			$("#repairUser").html(result.applyUser);

			$("#phone").html(result.contact);
			$("#description").html(result.applyReason);
			$("#repairStatus").html(Dict.getName("repair_status",result.status));
			$("#dealUser").html(result.updater);
			$("#dealTime").html(dateFormat(result.updateDatetime));
			$("#remark").html(result.remark);
			
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

