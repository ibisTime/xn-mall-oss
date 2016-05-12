$(function() {
	//数据初始化
	initData();
	
	var code = getQueryString("code");
	var data = {"code":code};
	var url = $("#basePath").val()+"/plat/account/detail";
	doGetAjax(url, data, doGetDetailBack);
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/plat/account_search.htm";
	});
});

function initData(){
	var url = $("#basePath").val() + "/subbank/list";
	doGetAjaxIsAsync(url, null, false, doSuccessBackBank);
	
	var url = $("#basePath").val() + "/plat/company/list";
	doGetAjaxIsAsync(url, null, false, doSuccessBackCompany);
}

function doSuccessBackCompany(res){
	dictCompany = res.data;
}

function companyFormatter(value) {
	for(var i = 0;i < dictCompany.length;i++){
		if(dictCompany[i].code == value){
			return dictCompany[i].zwName;
		}
	}
}

//银行数据字典
function doSuccessBackBank(res){
	dictBank = res.data;
}

function bankFormatter(value) {
	for(var i = 0;i < dictBank.length;i++){
		if(dictBank[i].code == value){
			return dictBank[i].name;
		}
	}
}

function doGetDetailBack(res){
	if (res.success) {
		$("#code").html(res.data.code);
		$("#companyCode").html(companyFormatter(res.data.companyCode));
		$("#subbranchCode").html(bankFormatter(res.data.subbranchCode));
		$("#kind").html(Dict.getName('kind',res.data.kind));
		$("#cardNo").html(res.data.cardNo);
		
		$("#currency").html(Dict.getName('currency',res.data.currency));
		$("#limitDescription").html(res.data.limitDescription);
		$("#isEbank").html(res.data.isEbank == 0 ? '无' : '有');
		$("#isEticket").html(res.data.isEticket == 0 ? '无' : '有');
		$("#hdWay").html(Dict.getName('hd_way',res.data.hdWay));
		$("#hdAddress").html(res.data.hdAddress);
		$("#hdCardPwd").html(res.data.hdCardPwd);
		
		$("#hdAccountPwd").html(res.data.hdAccountPwd);
		$("#yedzdWay").html(Dict.getName('yedzd_way',res.data.yedzdWay));
		$("#yedzdAddress").html(res.data.yedzdAddress);
		$("#yedzdAccountPwd").html(res.data.yedzdAccountPwd);
		$("#lsdzdWay").html(Dict.getName('lsdzd_way',res.data.lsdzdWay));
		
		$("#lsdzdAddress").html(res.data.lsdzdAddress);
		$("#lsdzdAccountPwd").html(res.data.lsdzdAccountPwd);
		$("#gtPerson").html(res.data.gtPerson);
		$("#gtContact").html(res.data.gtContact);
		$("#khPerson").html(res.data.khPerson);
		
		$("#khDatetime").html(dateTimeFormat(res.data.khDatetime));
		$("#jourDatetime").html(dateTimeFormat(res.data.jourDatetime));
		$("#remark").html(res.data.remark);
		var pdfUrl = res.data.pdf;
	    if(!isBlank(pdfUrl)){
	    	$("#pdfUrl").text(pdfUrl.substring(pdfUrl.lastIndexOf('/')+1));
	    	$("#pdfUrl").attr('href',pdfUrl);
	    }
	    
	    //控件显示隐藏
	    onChangeHdWay(res.data.hdWay);
	    onChangeYedzdWay(res.data.yedzdWay);
	    onChangeLsdzdWay(res.data.lsdzdWay);
	}else{
		alert(res.msg);
	}
}

function onChangeHdWay(hdWay){
	if(hdWay == "1"){
		$(".hdfs1").show();
		$(".hdfs2,.hdfs3").hide();
	}else if(hdWay == "2"){
		$(".hdfs2").show();
		$(".hdfs1,.hdfs3").hide();
	}else if(hdWay == "3"){
		$(".hdfs3").show();
		$(".hdfs1,.hdfs2").hide();
	}else if(hdWay == "4"){
		$(".hdfs1,.hdfs2").show();
		$(".hdfs3").hide();
	}else if(hdWay == "5"){
		$(".hdfs1,.hdfs3").show();
		$(".hdfs2").hide();
	}else{
		$(".hdfs1,.hdfs2,.hdfs3").hide();
	}
}

function onChangeYedzdWay(yedzdWay){
	if(yedzdWay == "1"){
		$(".yedzdfs1").show();
		$(".yedzdfs2").hide();
	}else if(yedzdWay == "2"){
		$(".yedzdfs2").show();
		$(".yedzdfs1").hide();
	}else if(hdWay == "3"){
		$(".yedzdfs1,.yedzdfs2").show();
	}
}

function onChangeLsdzdWay(lsdzdWay){
	if(lsdzdWay == "1"){
		$(".lsdzdfs1").show();
		$(".lsdzdfs2").hide();
	}else if(lsdzdWay == "2"){
		$(".lsdzdfs2").show();
		$(".lsdzdfs1").hide();
	}else if(lsdzdWay == "3"){
		$(".lsdzdfs1,.lsdzdfs2").show();
	}
}