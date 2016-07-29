//账户状态
var orderStatus = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	//页面数据字典初始化
	$("#status").renderDropdown(Dict.getName('withdraw_status'));
	
	// 表格初始化
	queryTableData();
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/account/withdrawOrderPage"});
	});
	
	$('#applyBtn').click(function() {
		window.location.href = $("#basePath").val()+"/account/withdrawl_apply.htm";
	});
	
	$('#approveBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != "1"){
			alert("该订单状态不是待审批状态");
			return;
		}
		location.href = $("#basePath").val()+"/account/withdraw_approve.htm?code="+selRecords[0].code+"&accountNumber="+selRecords[0].accountNumber;
	});
	
	// 支付事件绑定
	$('#paymentBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != "3"){
			alert("该订单状态不是审批通过-待支付状态");
			return;
		}
		location.href = $("#basePath").val()+"/account/withdraw_pay.htm?code="+selRecords[0].code+"&accountNumber="+selRecords[0].accountNumber;
	});
	
	// 详情
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		location.href = $("#basePath").val()+"/account/withdraw_detail.htm?code="+selRecords[0].code;
	});
});

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/account/withdrawOrderPage",
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				status : $("#status").val(),
				dateStart : $("#dateStart").val(),
				dateEnd : $("#dateEnd").val(),
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
		pagination : true,
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
		},{
			field : 'code',
			title : '订单编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'type',
			title : '订单类型',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter: Dict.getNameForList('qx_type')
		},{
			field : 'amount',
			title : '积分',
			align : 'left',
			valign : 'middle',
			sortable : true,
			formatter : moneyFormatter
		},{
			field : 'price',
			title : '价格',
			align : 'left',
			valign : 'middle',
			sortable : true,
			formatter : moneyFormatter
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('withdraw_status')
		},{
			field : 'createDatetime',
			title : '申请时间',
			align : 'left',
			valign : 'middle',
			sortable : true,
			formatter : dateFormatter
		}]
	});
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
//格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}