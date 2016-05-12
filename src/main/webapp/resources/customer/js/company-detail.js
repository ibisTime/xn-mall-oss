var userId="";
$(function() {
	//页面数据字典初始化
	showPermissionControl();
	initData();

	
	// 表格初始化
	companyId=getQueryString("companyId");
	
	var data={"code":companyId};
	var url = $("#basePath").val()+"/company/detail";
	doGetAjax(url,data,doSucBackGetDetail);
	
	// 企业账户查询
	queryBankData();
	
    //切换事件
	$(".itab li").click(function(){
    	$(".itab li").find('a').removeClass('selected');
     	$(".itab li").eq($(this).index()).find('a').addClass("selected");
		$(".tabson").hide().eq($(this).index()).show();
     });
	var tab = getQueryString("tab") || '';
	if (tab) {
		$('.itab li').eq(tab).click();
	}
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/company.htm";
	});
	
	// 新增
	$('#addApplyerBtn').click(function() {
		window.location.href = $("#basePath").val()+"/customer/customer_addapply.htm?companyId=" + companyId;
	});
	
	//解除
	$('#removeStuffBtn').click(function() {
		var selRecords = $('#stuffTableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(!confirm("确认 解除["+selRecords[0].realName+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/customer/remove";
    	var data = {userId:selRecords[0].userId, companyCode:companyId};
    	doPostAjax(url, data, function(res) {
    		if (res.success) {
    			alert("解除成功");
    			$('#stuffTableList').bootstrapTable('refresh');
    		}
    	});
	});

});

function doSucBackUser(res){
	if (res.success) {
		var result = res.data;
		$("#userId").html(result.userId);
		$("#mobile").html(result.mobile);
		$("#userRealName").html(result.realName);
		$("#idKind").html(idKindFormatter(result.idKind));
		$("#userIdNo").html(result.idNo);
		$("#level").html(levelFormatter(result.level));
		$("#serve").html(serveFormatter(result.serveList));
		$("#quote").html(quoteFormatter(result.quoteList));
		$("#createDatetime").html(dateFormatter(result.createDatetime));
	}else{
		alert(res.msg);
	}
}

//初始化数据字典
function initData(){
	var data= {"key":"currency"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackcurrency);
	
	var data= {"key":"company_kyc_status"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackCompanyKYC);
	
	var data= {"key":"bankcard_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackType);

    var data= {"key":"id_kind"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackIdKind);
	
    var data= {"key":"customer_level"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackLevel);
	
	var data= {"key":"serve_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackServe);
	
    var data= {"key":"quote"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackQuote);
}

//数据字典（）关联的回执方法
function doSucBackIdKind(res){
	dictIdKind = res.data;
}
//转化
function idKindFormatter(value, row) {
	for(var i = 0;i < dictIdKind.length;i++){
		if(dictIdKind[i].value == value){
			return dictIdKind[i].remark;
		}
	}
}

//数据字典（）关联的回执方法
function doSucBackLevel(res){
	dictLevel = res.data;
}
//转化
function levelFormatter(value, row) {
	for(var i = 0;i < dictLevel.length;i++){
		if(dictLevel[i].value == value){
			return dictLevel[i].remark;
		}
	}
}

//数据字典（）关联的回执方法
function doSucBackServe(res){
	dictServe = res.data;
}
//转化
function serveFormatter(value) {
	value = value || [];
	var serveList = "";
	for(var i = 0;i < value.length;i++){
		for(var j = 0;j < dictServe.length;j++){
			if(dictServe[j].value == value[i]){
				serveList +=dictServe[j].remark+"</br>";
				break;
			}
		}
	}
	if(!isBlank(serveList)){
		serveList = serveList.substring(0,serveList.length-5);
	}
	return serveList;
}
//数据字典（）关联的回执方法
function doSucBackQuote(res){
	dictQuote = res.data;
}
//转化
function quoteFormatter(value) {
	value = value || [];
	var quoteList = "";
	for(var i = 0;i < value.length;i++){
		for(var j = 0;j < dictQuote.length;j++){
			if(dictQuote[j].value == value[i]){
				quoteList +=dictQuote[j].remark+"</br>";
				break;
			}
		}
	}
	if(!isBlank(quoteList)){
		quoteList = quoteList.substring(0,quoteList.length-5);
	}
	return quoteList;
}

//数据字典（对方系统）关联的回执方法
function doSucBackCompanyKYC(res){
	dictCompanyKYC = res.data;
}

//状态转化
function companyKYCFormatter(value, row) {
	for(var i = 0;i < dictCompanyKYC.length;i++){
		if(dictCompanyKYC[i].value == value){
			return dictCompanyKYC[i].remark;
		}
	}
}

function doSucBackType(res){
	dictBankType = res.data;
}
//转化
function bankTypeFormatter(value, row) {
	for(var i = 0;i < dictBankType.length;i++){
		if(dictBankType[i].value == value){
			return dictBankType[i].remark;
		}
	}
}

function doSucBackGetDetail(res){
	var result = res.data;
	$("#companyId").html(result.code);
	$("#companyName").html(result.name);
	$("#licenceNo").html(result.gsyyzzNo);
	$("#realName").html(result.realName);
	$("#idNo").html(Dict.getName('id_kind', result.idKind) + ' ' + result.idNo);
	$("#capital").html(moneyFormatter(result.capital)+' '+Dict.getName('currency', result.currency));
	$("#province").html(result.province+" "+result.city);
	$("#kycUser").html(result.kycUser);
	$("#kycDatetime").html(dateFormatter(result.kycDatetime));
	$("#gsyyzzPicture").attr({"src":result.gsyyzzPicture});
	$("#zzjgdmzPicture").attr({"src":result.zzjgdmzPicture});
	$("#swdjzPicture").attr({"src":result.swdjzPicture});
	$("#frPicture").attr({"src":result.frPicture});
	$("#dzzPicture").attr({"src":result.dzzPicture});
	//$("#sqghPicture").attr({"src":result.sqghPicture});
	$("#otherPicture").attr({"src":result.otherPicture});
//	$("#applyDatetime").html(dateFormatter(result.applyDatetime));
	$("#status").html(Dict.getName('company_kyc_status', result.status));
	$("#remark").html(result.kycNote);
	if (result.status == 2) {
		$('#addApplyerBtn').show();
		$('#removeStuffBtn').show();
		$('.levelCtn').show();
		$('#level').html(result.level);
		$('.serveCtn').show();
		$('.quoteCtn').show();
		var serveList = result.serveList.split('');
		while (serveList.length > 0) {
			var serve = serveList.pop();
			$('.serveCtn input[name='+serve+']').prop('checked', true);
		}
		var quoteList = result.quoteList.split('');
		while (quoteList.length > 0) {
			var quote = quoteList.pop();
			$('.quoteCtn input[name='+quote+']').prop('checked', true);
		}
	} else {
		$('#addApplyerBtn').hide();
		$('#removeStuffBtn').hide();
	}
}


function doSucBackcurrency(res){
	var data = res.data;
	currencyFormatter = function(value, row) {
		if (!value) {
			return '';
		}
		for(var i = 0;i < data.length;i++){
			if(data[i].value == value){
				return data[i].remark;
			}
		}
	}
}

//表格初始化
function queryBankData(){
	// 绑定列表
	$('#bankTableList').bootstrapTable({  
		method : "get",
		url : $("#basePath").val()+"/company/account/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				companyCode : companyId,
				start : params.offset / params.limit + 1,
				limit : params.limit,
			};
		},
		queryParamsType : 'limit',
		responseHandler : function(res) {
			return {
				rows : res.data.list,
				total : res.data.totalCount
			};
		},
		pagination : true,
		sidePagination : 'server', // 服务端请求
		totalRows : 0,
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		columns : [{
			field : 'companyName',
			title : '企业名称',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'bankName',
			title : '银行名称',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'subbranch',
			title : '开户支行',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'cardNo',
			title : '银行账号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'createDatetime',
			title : '绑定时间',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : dateFormatter
		}]
	});
	
	$('#stuffTableList').bootstrapTable({  
		method : "get",
		url : $("#basePath").val()+"/company/stuff/list",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				companyCode : companyId
				//start : params.offset / params.limit + 1,
				//limit : params.limit,
			};
		},
//		queryParamsType : 'limit',
//		responseHandler : function(res) {
//			return {
//				rows : res.data.list,
//				total : res.data.totalCount
//			};
//		},
//		pagination : true,
//		sidePagination : 'server', // 服务端请求
//		totalRows : 0,
//		pageNumber : 1,
//		pageSize : 10,
//		pageList : [ 10, 20, 30, 40, 50 ],
		columns : [{
			field : '',
			title : '',
			align : 'left',
			valign : 'middle',
			checkbox : true
		}, {
			field : 'mobile',
			title : '手机号码',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'realName',
			title : '真实姓名',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'idKind',
			title : '证件类型',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter: Dict.getNameForList('id_kind')
		}, {
			field : 'idNo',
			title : '证件号码',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'createDatetime',
			title : '隶属人审核通过时间',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : dateFormatter
		}]
	});
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}

// 格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

function statusFormatter(value, row){
	if (row.type == '1') {
		return '-';
	} else if (row.type == '2') {
		if (row.status == '0') {
			return '待确认';
		} else if (row.status == '1') {
			return '验证通过';
		} else if (row.status == '2') {
			return '验证不通过';
		}
	}
}
