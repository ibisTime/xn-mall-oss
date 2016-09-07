$(function() {
	// 表格初始化
	var userId=getQueryString("userId");
	var data={"userId":userId};
	var url = $("#basePath").val()+"/customer/detail";
	doGetAjax(url,data,doSuccessData);
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/channel.htm";
	});
});

function doSuccessData(res){
	if (res.success) {
		var result = res.data;
		$("#mobile").html(result.mobile||'-');
		$("#idNo").html(result.idNo||'-');
		$("#remark").html(result.remark||'-');
		$("#realName").html(result.realName||'-');
		$("#pdf").html(linkSrc(result.pdf));
		$("#idKind").html(Dict.getName('id_kind', result.idKind||'-'));
	}else{
		alert(res.msg);
	}
}
