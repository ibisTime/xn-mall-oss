$(function() {
	initData();
	
	var code = getQueryString("code");
	var data = {"code":code};
	var url = $("#basePath").val()+"/subbank/detail";
	doGetAjax(url, data, doGetDetailBack);
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/bank/subbank_search.htm";
	});
});

function initData(){
	//标准状态
	var data= {"key":"normal_status"};
	doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackNormalStatus);
}

//数据字典（标准状态）关联的回执方法
function doSucBackNormalStatus(res){
	normalStatus = res.data;
}

//状态转化
function statusFormatter(value, row) {
	for(var i = 0;i < normalStatus.length;i++){
		if(normalStatus[i].value == value){
			return normalStatus[i].remark;
		}
	}
}

function doGetDetailBack(res){
	if (res.success == true) {
		{
			$("#bankCode").html(res.data.bankCode);
			$("#name").html(res.data.name);
			$("#region").html(res.data.region);
			$("#address").html(res.data.address);
			$("#cnapsCode").html(res.data.cnapsCode);
			
			$("#swiftCode").html(res.data.swiftCode);
			$("#khjlPerson").html(res.data.khjlPerson);
			$("#khjlContact").html(res.data.khjlContact);
			$("#address").html(res.data.address);
			
			$("#remark").html(res.data.remark);
			var swiftCode = res.data.swiftCode;
		    if(!isBlank(swiftCode)){
		    	$("#swiftCodeFile").text(swiftCode.substring(swiftCode.lastIndexOf('/')+1));
		    	$("#swiftCodeFile").attr('href',swiftCode);
		    }
			$("#remark").html(res.data.remark);
		}
	}else{
		alert(res.msg);
	}
}

//格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}