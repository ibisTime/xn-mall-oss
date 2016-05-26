var userId="";
var dictIdKind=null;
var dictStatus=null;
var dictLevel=null;
$(function() {
	//页面数据字典初始化
	initData();
	//$('#loginStatusSearch').renderDropdown(Dict.getName('login_status'));
	// 表格初始化
	userId=getQueryString("userId");
	var data={"userId":userId};
	var url = $("#basePath").val()+"/customer/detail";
	doGetAjax(url,data,doSuccessData);
	 // 记录查询
	queryBankData();
	queryLogData();
	//queryLockData();
	queryRealData();
	queryCompanyData();
	$(".tabson").hide();
	$("#customer").show();
	
    //切换事件
	$(".itab li").click(function(){
    	$(".itab li").find('a').removeClass('selected');
     	$(".itab li").eq($(this).index()).find('a').addClass("selected");
		$(".tabson").hide().eq($(this).index()).show();
     });
	
	// 查询银行卡
	$('#bankCardSearchBtn').click(function() {
		$('#bankTableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/customer/bank/page"});
	});
	
	//详情
//	$('#detailBtn').click(function() {
//		var selRecords = $('#companyTableList').bootstrapTable('getSelections')
//		if(selRecords.length <= 0){
//			alert("请选择记录");
//			return;
//		}
//		window.location.href = $("#basePath").val()+"/customer/company_detail.htm?companyId="+selRecords[0].code+"&userId="+selRecords[0].applyUser;
//	});
//	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/customer.htm";
	});

	// 查询登录日志
	$('#loginLogSearchBtn').click(function() {
		$('#logTableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/customer/log/page"});
	});
	
	// 查询锁定日志
	$('#LockSearchBtn').click(function() {
		$('#lockTableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/customer/lock/page"});
	});
	
	// 查询实名认证
	$('#realSearchBtn').click(function() {
		$('#realTableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/customer/real/page"});
	});
});


function doSuccessData(res){
	if (res.success) {
		var result = res.data;
		$("#userId").html(result.userId);
		$("#mobile").html(result.mobile);
		$("#realName").html(result.realName);
		$("#idKind").html(Dict.getName('id_kind', result.idKind));
		$("#idNo").html(result.idNo);
		$("#serve").html(Dict.getServeName(result.serveList));
		$("#quote").html(Dict.getQuoteName(result.quoteList));
		$("#level").html(result.level);
		$("#createDatetime").html(dateFormatter(result.createDatetime));
	}else{
		alert(res.msg);
	}
}
//表格初始化
function queryBankData(){
	// 绑定列表
	$('#bankTableList').bootstrapTable({  
		method : "get",
		url : $("#basePath").val()+"/customer/bankcard/page",
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				userId : userId,
				start : params.offset / params.limit + 1,
				limit : params.limit
			};
		},
		queryParamsType : 'limit',
		responseHandler : function(res) {
			return {
				rows : res.data.list,
				total : res.data.totalCount || res.data.length
			};
		},
		pagination : true,
		sidePagination : 'server', // 服务端请求
		totalRows : 0,
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		columns : [{
			field : 'realName',
			title : '姓名'
		},{
			field : 'bankName',
			title : '银行名称'
		}, {
			field : 'subbranch',
			title : '支行名称'
		}, {
			field : 'bankcardNo',
			title : '银行卡号'
		}, {
			field : 'createDatetime',
			title : '绑定时间',
			formatter: dateTimeFormat
		}]
	});
}
//表格初始化
function queryCompanyData(){
	// 绑定列表
	$('#companyTableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/company/list/user",
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				userId : userId
			};
		},
		queryParamsType : 'limit',
		responseHandler : function(res) {
			return {
				rows : res.data,
				total : res.data.totalCount
			};
		},
		pagination : false,
		sidePagination : 'server', // 服务端请求
		totalRows : 0,
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		columns : [{
			field : 'name',
			title : '企业名称',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'gsyyzzNo',
			title : '营业执照号',
			align : 'left',
			valign : 'middle',
			sortable : false,
		}, {
			field : 'realName',
			title : '法人',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'idKind',
			title : '证件类型',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('id_kind')
		},{
			field : 'idNo',
			title : '证件号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'province',
			title : '省份',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'city',
			title : '城市',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'currency',
			title : '币种',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('currency')
		}, {
			field : 'capital',
			title : '注册资金',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : moneyFormatter
		}, {
			field : 'status',
			title : 'KYC状态',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('company_kyc_status')
		}]
	});
}
//表格初始化
function queryLogData(){
	// 绑定列表
	$('#logTableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/customer/log/page",
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				userId : userId,
				loginIp : $('#loginIpSearch').val(),
				//isSuccess : $("#loginStatusSearch").val(),
				dateStart: $('#dateStartSearch').val(),
				dateEnd: $('#dateEndSearch').val(),
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
			field : 'loginDatetime',
			title : '登录时间',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : dateFormatter
		},{
			field : 'loginIp',
			title : '登录IP地址',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'isSuccess',
			title : '登录状态',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('login_status')
		}]
	});
}
//表格初始化
function queryLockData(){
	// 绑定列表
	$('#lockTableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/customer/lock/page",
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				userId : userId,
				lockDirection : $("#lockDirectionSearch").val(),
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
			field : 'lockDirection',
			title : '锁定方向',
			align : 'left',
			valign : 'middle',
			sortable : false
			
		},{
			field : 'remark',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false
		}]
	});
}

//表格初始化
function queryRealData(){
	// 绑定列表
	$('#realTableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/customer/real/page",
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				userId : userId,
				realName : $("#realNameSearch").val(),
				idKind : $("#idKindSearch").val(),
				idNo : $("#idNoSearch").val(),
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
			formatter : Dict.getNameForList('id_kind')
		}, {
			field : 'idNo',
			title : '证件号码',
			align : 'left',
			valign : 'middle',
			sortable : false
		}]
	});
}

function initData(){
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
