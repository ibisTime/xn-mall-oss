$(function() {
	var code = getQueryString('code');
	
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
		$("#operContent").text("修改账户");
		var data = {"code":code};
		var url = $("#basePath").val()+"/plat/account/detail";
		doGetAjax(url, data, doGetDetailBack);
	}
	
	//提交(保存)
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
	    //上传文件判断
		if(isBlank($("#pdfUrl").attr("href"))){
			alert("请上传开户回执单");
			return;
		}
		if(checkWay() != true){
			return;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['pdf'] = $("#pdfUrl").attr("href");
		var url = $("#basePath").val()+"/plat/account/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/plat/account.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			companyCode: {
				required: true,
				maxlength: 32
			},
			subbranchCode: {
				required: true,
				maxlength: 128
			},
			kind: {
				required: true,
				maxlength: 2
			},
			currency: {
				required: true,
				maxlength: 2
			},
			cardNo: {
				required: true,
				maxlength: 64
			},
			limitDescription: {
				required: true,
				maxlength: 255
			},
			hdWay: {
				required: true,
				maxlength: 2
			},
			hdAddress: {
				maxlength: 255
			},
			hdCardPwd: {
				maxlength: 32
			},
			hdAccountPwd: {
				maxlength: 32
			},
			yedzdWay: {
				required: true,
				maxlength: 2
			},
			yedzdAddress: {
				maxlength: 255
			},
			yedzdAccountPwd: {
				maxlength: 32
			},
			lsdzdWay: {
				required: true,
				maxlength: 2
			},
			lsdzdAddress: {
				maxlength: 255
			},
			lsdzdAccountPwd: {
				maxlength: 32
			},
			gtPerson: {
				required: true,
				maxlength:64
			},
			gtContact: {
				required: true,
				maxlength: 128
			},
			khPerson: {
				required: true,
				maxlength: 64
			},
			khDatetime: {
				required: true
			},
			remark: {
				required: false,
				maxlength:255
			}
		},
		messages: {
			companyCode: {
				required: "请选择开户公司",
				maxlength: jQuery.format("开户公司不能大于{0}个字符")
			},
			subbranchCode: {
				required: "请选择开户支行",
				maxlength: jQuery.format("开户支行不能大于{0}个字符")
			},
			kind: {
				required: "请选择账户性质",
				maxlength: jQuery.format("账户性质不能大于{0}个字符")
			},
			currency: {
				required: "请选择币种",
				maxlength: jQuery.format("币种不能大于{0}个字符")
			},
			cardNo: {
				required: "请输入账号",
				maxlength: jQuery.format("账号不能大于{0}个字符")
			},
			limitDescription: {
				required: "请输入额度描述",
				maxlength: jQuery.format("额度描述不能大于{0}个字符")
			},
			hdWay: {
				required: "请选择回单方式",
				maxlength: jQuery.format("回单方式不能大于{0}个字符")
			},
			hdAddress: {
				maxlength: jQuery.format("回单邮寄地址不能大于{0}个字符")
			},
			hdCardPwd: {
				maxlength: jQuery.format("回单卡密码不能大于{0}个字符")
			},
			hdAccountPwd: {
				maxlength: jQuery.format("回单账号密码不能大于{0}个字符")
			},
			yedzdWay: {
				required: "请输选择余额对账单方式",
				maxlength: jQuery.format("余额对账单方式不能大于{0}个字符")
			},
			yedzdAddress: {
				maxlength: jQuery.format("余额对账单邮寄地址不能大于{0}个字符")
			},
			yedzdAccountPwd: {
				maxlength: jQuery.format("余额对账单账号密码不能大于{0}个字符")
			},
			lsdzdWay: {
				required: "请输选择流水对账单方式",
				maxlength: jQuery.format("流水对账单方式不能大于{0}个字符")
			},
			lsdzdAddress: {
				maxlength: jQuery.format("流水对账单邮寄地址不能大于{0}个字符")
			},
			lsdzdAccountPwd: {
				maxlength: jQuery.format("流水对账单账号密码不能大于{0}个字符")
			},
			gtPerson: {
				required: "请输入柜台联系人",
				maxlength: jQuery.format("柜台联系人不能大于{0}个字符")
			},
			gtContact: {
				required: "请输入柜台联系方式",
				maxlength: jQuery.format("柜台联系方式不能大于{0}个字符")
			},
			khPerson: {
				required: "请输入开户人",
				maxlength: jQuery.format("开户人不能大于{0}个字符")
			},
			khDatetime: {
				required: "请输入开户时间",
				maxlength: jQuery.format("开户时间不能大于{0}个字符")
			},
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
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
	}else if(yedzdWay == "3"){
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
	var url = $("#basePath").val() + "/plat/company/list";
	doGetAjaxIsAsync(url, null, false, doSuccessBackCompany);
	
	var url = $("#basePath").val() + "/subbank/list";
	var data = {"status":"1"}
	doGetAjaxIsAsync(url, data, false, doSuccessBackBank);
	
	$('#kind').renderDropdown(Dict.getName('kind'));
	$('#currency').renderDropdown(Dict.getName('currency'));
	$('#hdWay').renderDropdown(Dict.getName('hd_way'));
	$('#yedzdWay').renderDropdown(Dict.getName('yedzd_way'));
	$('#lsdzdWay').renderDropdown(Dict.getName('lsdzd_way'));
}

function doSuccessBackCompany(res){
	dictCompany = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictCompany) != "undefined"){//判断undifined
		for(var i = 0;i < dictCompany.length;i++){
			html += "<option value='"+dictCompany[i].code+"'>"+dictCompany[i].zwName+"</option>";
		}
	}
	$("#companyCode").html(html);
}

function companyFormatter(value) {
	for(var i = 0;i < dictCompany.length;i++){
		if(dictCompany[i].code == value){
			return dictCompany[i].name;
		}
	}
}

//银行数据字典
function doSuccessBackBank(res){
	dictBank = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictBank) != "undefined"){//判断undifined
		for(var i = 0;i < dictBank.length;i++){
			html += "<option value='"+dictBank[i].code+"'>"+dictBank[i].bankName+" "+dictBank[i].name+"</option>";
		}
	}
	$("#subbranchCode").html(html);
}

function bankFormatter(value) {
	for(var i = 0;i < dictBank.length;i++){
		if(dictBank[i].code == value){
			return dictBank[i].subbranch;
		}
	}
}

function doGetDetailBack(res){
	if (res.success) {
		$("#code").val(res.data.code);
		$("#companyCode").val(res.data.companyCode);
		$("#subbranchCode").val(res.data.subbranchCode);
		$("#kind").val(res.data.kind);
		$("#cardNo").val(res.data.cardNo);
		
		$("#currency").val(res.data.currency);
		$("#limitDescription").val(res.data.limitDescription);
		$("input[name='isEbank'][value="+res.data.isEbank+"]").attr("checked",true); 
		$("input[name='isEticket'][value="+res.data.isEticket+"]").attr("checked",true); 
		$("#hdWay").val(res.data.hdWay);
		
		$("#hdAddress").val(res.data.hdAddress);
		$("#hdCardPwd").val(res.data.hdCardPwd);
		$("#hdAccountPwd").val(res.data.hdAccountPwd);
		$("#yedzdWay").val(res.data.yedzdWay);
		$("#yedzdAddress").val(res.data.yedzdAddress);
		
		$("#yedzdAccountPwd").val(res.data.yedzdAccountPwd);
		$("#lsdzdWay").val(res.data.lsdzdWay);
		$("#lsdzdAddress").val(res.data.lsdzdAddress);
		$("#lsdzdAccountPwd").val(res.data.lsdzdAccountPwd);
		$("#gtPerson").val(res.data.gtPerson);
		
		$("#gtContact").val(res.data.gtContact);
		$("#khPerson").val(res.data.khPerson);
		$("#khDatetime").val(dateFormatter(res.data.khDatetime));
		$("#remark").val(res.data.remark);
		var pdfUrl = res.data.pdf;
	    if(!isBlank(pdfUrl)){
	    	$("#pdfUrl").text(pdfUrl.substring(pdfUrl.lastIndexOf('/')+1));
	    	$("#pdfUrl").attr('href',pdfUrl);
	    }
	    
	    if(!isBlank(res.data.approveNote)){
			$("#noteLi").show();
			$("#approveNote").html(res.data.approveNote);
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

//格式化时间
function dateFormatter(value){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}