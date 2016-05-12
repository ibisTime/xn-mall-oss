$(function() {
	var code = getQueryString("code");
	var data = {"code":code};
	var url = $("#basePath").val()+"/plat/company/detail";
	doGetAjax(url, data, doGetDetailBack);
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/plat/company.htm";
	});
});

function doGetDetailBack(res){
	if (res.success) {
		$("#code").html(res.data.code);
		$("#name").html(res.data.zwName);
		$("#ywName").html(res.data.ywName);
		$("#zcAddress").html(res.data.zcAddress);
		$("#jyAddress").html(res.data.jyAddress);
		$("#capital").html(res.data.capital + ' ' + Dict.getCurrencyName(res.data.currency));
		$("#frPerson").html(res.data.frPerson);
		$("#gdPerson").html(res.data.gdPerson);
		$("#cwLeader").html(res.data.cwPerson);
		$("#debdtxPerson").html(res.data.debdtxPerson);
		
		$("#wyRecorder").html(res.data.wyRecorder);
		$("#wyChecker").html(res.data.wyChecker);
		$("#telephone").html(res.data.telephone);
		$("#remark").html(res.data.remark);
	}else{
		alert(res.msg);
	}
}