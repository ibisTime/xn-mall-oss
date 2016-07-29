var userId="";
var dictIdKind=null;
var dictStatus=null;
$(function() {
	// 表格初始化
	userId=getQueryString("userId");
	var data={"userId":userId};
	var url = $("#basePath").val()+"/customer/detail";
	doGetAjax(url,data,doSuccessData);
	 // 记录查询
	$(".tabson").hide();
	$("#customer").show()
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/customer.htm";
	});
});

function doSuccessData(res){
	if (res.success) {
		var result = res.data;
		$("#userId").html(result.userId);
		$("#mobile").html(result.mobile);
		$("#userReferee").html(result.userReferee);
		$("#remark").html(result.remark);
		$("#status").html(Dict.getUserStatusName(result.status));
		$("#updateDatetime").html(dateTimeFormat(result.updateDatetime));
	}else{
		alert(res.msg);
	}
}