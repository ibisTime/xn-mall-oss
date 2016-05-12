var code = "";
$(function() {
	code = getQueryString('code');
	
	//初始化数据字典
	initData();
	
	//新增修改判断
	if(isBlank(code)){
		$("#operate").val("add");
		//回单方式
		$(".hdfs1,.hdfs2,.hdfs3").hide();
		//余额对账单方式
		$(".yedzdfs1,.yedzdfs2").hide();
		//流水对账单方式
		$(".lsdzdfs1,.lsdzdfs2").hide();
	}else{
		$("#code").val(code);
		$("#operate").val("edit");
		$("#operContent").text("复核账户");
		var data = {"code":code};
		var url = $("#basePath").val()+"/plat/account/detail";
		doGetAjax(url, data, doGetDetailBack);
	}
	
	$('#passBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['code'] = code;
		var url = $("#basePath").val()+"/plat/account/pass";
		doPostAjax(url, data, doSuccessBack);
	});
	
	$('#unPassBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['code'] = code;
		var url = $("#basePath").val()+"/plat/account/unpass";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/plat/account.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			remark:{
				required: true,
				maxlength:200
			}
		},
		messages: {
			remark: {
				required:"请输入备注",
				maxlength:jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
	
	$("#pdfUpload").click(function () {
		var postUrl = $("#basePath").val()+"/plat/account/upload/pdf";
        ajaxFileUpload(postUrl,"pdfFile","pdfUrl");
    });
});

function checkWay(){
	var result = true;
	var hdfs = $("#hdWay").val();
    if(hdfs == "1"){
    	if(isBlank($("#hdAddress").val())){
    		alert("请输入回单邮寄地址");
    		return;
    	}
    }
    if(hdfs == "2"){
    	if(isBlank($("#hdCardPwd").val())){
    		alert("请输入回单卡密码");
    		return;
    	}
    }
    if(hdfs == "3"){
    	if(isBlank($("#hdAccountPwd").val())){
    		alert("请输入回单账号密码");
    		return;
    	}
    }
    if(hdfs == "4"){
    	if(isBlank($("#hdAddress").val())){
    		alert("请输入回单邮寄地址");
    		return;
    	}
    	if(isBlank($("#hdCardPwd").val())){
    		alert("请输入回单卡密码");
    		return;
    	}
    }
    if(hdfs == "5"){
    	if(isBlank($("#hdAddress").val())){
    		alert("请输入回单邮寄地址");
    		return;
    	}
    	if(isBlank($("#hdAccountPwd").val())){
    		alert("请输入回单账号密码");
    		return;
    	}
    }
    var yedzdfs = $("#yedzdWay").val();
    if(yedzdfs == "1"){
    	if(isBlank($("#yedzdAddress").val())){
    		alert("请输入余额对账单邮寄地址");
    		return;
    	}
    }
    if(yedzdfs == "2"){
    	if(isBlank($("#yedzdAccountPwd").val())){
    		alert("请输入余额对账单账号密码");
    		return;
    	}
    }
    
    if(yedzdfs == "3"){
    	if(isBlank($("#yedzdAddress").val())){
    		alert("请输入余额对账单邮寄地址");
    		return;
    	}
    	if(isBlank($("#yedzdAccountPwd").val())){
    		alert("请输入余额对账单账号密码");
    		return;
    	}
    }
    
	var lsdzdfs = $("#lsdzdWay").val();
	if(lsdzdfs == "1"){
    	if(isBlank($("#lsdzdAddress").val())){
    		alert("请输入流水对账单邮寄地址");
    		return;
    	}
    }
    if(lsdzdfs == "2"){
    	if(isBlank($("#lsdzdAccountPwd").val())){
    		alert("请输入流水对账单账号密码");
    		return;
    	}
    }
    
    if(lsdzdfs == "3"){
    	if(isBlank($("#lsdzdAddress").val())){
    		alert("请输入流水对账单邮寄地址");
    		return;
    	}
    	if(isBlank($("#lsdzdAccountPwd").val())){
    		alert("请输入流水对账单账号密码");
    		return;
    	}
    }
    return result;
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

function ajaxFileUpload(postUrl,fileId,uploadControlId) {
    $.ajaxFileUpload
    (
        {
            url: postUrl, //用于文件上传的服务器端请求地址
            type: 'POST',
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: fileId, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status)  //服务器成功响应处理函数
            {
                if (typeof (data.status) != 'undefined') {
                    if (data.status == "1") {
                    	alert('上传成功');
                    	if(!isBlank(uploadControlId)){
                    		$("#"+uploadControlId).text(data.url.substring(data.url.lastIndexOf('/')+1));
            		    	$("#"+uploadControlId).attr('href',data.url); 
                    	}
                    } else {
                        alert(data.msg);
                    }
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
        }
    )
    return false;
}

function initData(){	
	var url = $("#basePath").val() + "/subbank/list";
	var data = {"status":"1"}
	doGetAjaxIsAsync(url, data, false, doSuccessBackBank);
	var url = $("#basePath").val() + "/plat/company/list";
	doGetAjaxIsAsync(url, null, false, doSuccessBackCompany);
	
	$('#kind').renderDropdown(Dict.getName('kind'));
	$('#currency').renderDropdown(Dict.getName('currency'));
	$('#hdWay').renderDropdown(Dict.getName('hd_way'));
	$('#yedzdWay').renderDropdown(Dict.getName('yedzd_way'));
	$('#lsdzdWay').renderDropdown(Dict.getName('lsdzd_way'));
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
		$("#remark").val(res.data.remark);
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

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/plat/account.htm";
	}else{
		alert(res.msg);
	}
}