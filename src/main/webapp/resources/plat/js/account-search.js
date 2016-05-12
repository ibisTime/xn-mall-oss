$(function() {
	//按钮权限判断
	showPermissionControl();
	
	//数据初始化
	initData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/plat/account/detailpage"});
	});
	
	// 查看绑定事件
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/plat/account_detail.htm?code="+selRecords[0].code;
	});
	
	// 全查看绑定事件
	$('#detailALLBtn').click(function() {
		//window.location.href = $("#basePath").val()+"/plat/account_detail.htm?code="+selRecords[0].code;
		openWindow("account_skim.htm?companyCode="+$("#companyCode").val() +"&subbranchCode="+$("#subbranchCode").val()+"&kind="+$("#kind").val()+"&currency="+$("#currency").val()+"&cardNo="+$("#cardNo").val()+"&isAccept="+$("#isAccept").val(), "账户列表" , "width=1024,height=768") ;
	});
	
	// 受款设置绑定事件
	$('#recipientBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		
		if (selRecords[0].isAccept == 0) {
			if(!confirm("确认指定当前账号为受款账号["+selRecords[0].cardNo+"]？")){
	    		return false;
	    	}
			doPostAjax($("#basePath").val() + '/plat/account/isaccept', {
				code: selRecords[0].code,
				isAccept: 1
			}, doSuccessDelBack);
		} else {
			if(!confirm("确认指定当前受款账号为非受款账号["+selRecords[0].cardNo+"]？")){
	    		return false;
	    	}
			doPostAjax($("#basePath").val() + '/plat/account/isaccept', {
				code: selRecords[0].code,
				isAccept: 0
			}, doSuccessDelBack);
		}
	});
	
	
	// 久悬更新事件
	$('#longUpdateBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/plat/account_long_edit.htm?code="+selRecords[0].code;
	});
	
	//导出
	$('#exportBtn').click(function() {
		var url=$("#basePath").val()+"/plat/account/export?companyCode="+$("#companyCode").val() +"&subbranchCode="+$("#subbranchCode").val()+"&kind="+$("#kind").val()+"&currency="+$("#currency").val()+"&cardNo="+$("#cardNo").val()+"&isAccept="+$("#isAccept").val();
		window.open(url);
	});

	// 表格初始化
	queryTableData();
});

function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("设置成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert("设置失败");
	}
}

function initData(){
	var url = $("#basePath").val() + "/plat/company/list";
	doGetAjaxIsAsync(url, null, false, doSuccessBackCompany);
	
	var url = $("#basePath").val() + "/subbank/list";
	doGetAjaxIsAsync(url, {
		status: 1
	}, false, doSuccessBackBank);
	
	$('#kind').renderDropdown(Dict.getName('kind'));
	$('#currency').renderDropdown(Dict.getName('currency'));
	$('#isAccept').renderDropdown(Dict.getName('true_false'));
	$('#status').renderDropdown(Dict.getName('normal_status'));

}

function doSuccessBackCompany(res){
	dictCompany = res.data;
	var html = "<option value=''>请选择";
	if(typeof(dictCompany) != "undefined"){//判断undifined
		for(var i = 0;i < dictCompany.length;i++){
			html += "<option value='"+dictCompany[i].code+"'>"+dictCompany[i].zwName +"</option>";
		}
	}
	$("#companyCode").html(html);
}

function companyFormatter(value, row) {
	for(var i = 0;i < dictCompany.length;i++){
		if(dictCompany[i].code == value){
			return dictCompany[i].zwName;
		}
	}
}

//银行数据字典
function doSuccessBackBank(res){
	dictBank = res.data;
	var html = "<option value=''>请选择";
	if(typeof(dictBank) != "undefined"){//判断undifined
		for(var i = 0;i < dictBank.length;i++){
			html += "<option value='"+dictBank[i].code+"'>"+dictBank[i].bankName +" "+ dictBank[i].name+"</option>";
		}
	}
	$("#subbranchCode").html(html);
}

function bankFormatter(value, row) {
	for(var i = 0;i < dictBank.length;i++){
		if(dictBank[i].code == value){
			return dictBank[i].bankName +" "+ dictBank[i].name;
		}
	}
}

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/plat/account/detailpage",
		height : $(window).height() - 150,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				companyCode: $("#companyCode").val(),
				subbranchCode: $("#subbranchCode").val(),
				kind: $("#kind").val(),
				currency: $("#currency").val(),
				cardNo: $("#cardNo").val(),
				isAccept: $("#isAccept").val(),
				start : params.offset / params.limit + 1,
				limit : params.limit
			};
		},
		queryParamsType : 'limit',
		responseHandler : function(res) {
			return {
				rows : res.data.list,
				total : res.data.totalCount
			};
		},
		pagination : true,//是否分页
		sidePagination : 'server', // 服务端请求
		totalRows : 0,
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		columns : [{
			field : '',
			title : '',
			align : 'left',
			valign : 'middle',
			checkbox : true
		}, {
			field : 'companyCode',
			title : '公司',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : companyFormatter
		}, {
			field : 'subbranchCode',
			title : '支行',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : bankFormatter
		}, {
			field : 'kind',
			title : '账户性质',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('kind')
		}, {
			field : 'currency',
			title : '币种',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('currency')
		}, {
			field : 'cardNo',
			title : '账号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'isAccept',
			title : '受款',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter: Dict.getNameForList('true_false')
		}]
	});
}