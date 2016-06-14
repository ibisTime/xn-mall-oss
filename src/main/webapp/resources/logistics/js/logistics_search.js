//数据字典
var dictLevel = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	$('#status').renderDropdown(Dict.getName('logistic_status'));		
	//表格初始化
	queryTableData();

	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/logistics/page"});
	});
	
	//详情
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/logistics/logistics_detail.htm?code="+selRecords[0].code;
	});
	
});

//数据字典初始化
//表格初始化
function queryTableData(){
	var columns = [{
		field : '',
		title : '',
		align : 'left',
		valign : 'middle',
		checkbox : true
	}, {
		field : 'invoiceCode',
		title : '发货单编号',
		align : 'left',
		valign : 'middle',
		sortable : false,
	}, {
		field : 'company',
		title : '物流公司',
		align : 'left',
		valign : 'middle',
		formatter:Dict.getNameForList('kd_company'),
		sortable : false
	}, {
		field : 'code',
		title : '物流单编号',
		align : 'left',
		valign : 'middle',
		sortable : false,
	},{
		field : 'deliveryDatetime',
		title : '发货时间',
		align : 'left',
		valign : 'middle',
		formatter:dateFormatter,
		sortable : false
	},{
		field : 'deliverer',
		title : '发货人',
		align : 'left',
		valign : 'middle',
		sortable : false
	},{
		field : 'status',
		title : '状态',
		align : 'left',
		formatter:Dict.getNameForList('logistic_status'),
		valign : 'middle',
		sortable : false
	} ];
	
	
	
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/logistics/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				code : $("#code").val(),
				invoiceCode : $("#invoiceCode").val(),
				userId : $("#userId").val(),
				status : $("#status").val(),
				deliveryDatetimeStart : $("#deliveryDatetimeStart").val(),
				deliveryDatetimeEnd : $("#deliveryDatetimeEnd").val(),
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
		columns : columns
	});
}



//表格时间格式转化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}