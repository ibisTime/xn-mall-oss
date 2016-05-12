var content = UE.getEditor('content');
$(function() {
	var contractCode = getQueryString("contractCode");
	var data = {"contractCode":contractCode};
	var url = $("#basePath").val()+"/project/contract/detail";
	doGetAjax(url, data, doGetDetailBack);
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/contract/contract.htm";
	});
});

function doGetDetailBack(res){
	if (res.success == true) {
		result=res.data;
	    $("#code").html(result.code);
	    $("#companyCode").html(result.companyCode);
	    $("#subjectCode").html(result.subjectCode);
	    content.ready(function(){
		    //需要ready后执行，否则可能报错
	    	content.setContent(result.content);
		});
	    
		$("#type").html(Dict.getName('contract_type',result.type));
	    $("#createDatetime").html(dateTimeFormat(result.createDatetime));
		$("#status").html(Dict.getName('contract_status',result.status));
	    $("#remark").html(result.remark);
	    $("#endDatetime").html(dateTimeFormat(result.endDatetime));
	}else{
		alert(res.msg);
	}
}