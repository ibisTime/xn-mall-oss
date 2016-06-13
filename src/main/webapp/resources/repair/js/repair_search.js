//数据字典
var dictLevel = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
		
	//表格初始化
	queryTableData();

	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/logistics/goods/page"});
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
		field : 'code',
		title : '货品编号',
		align : 'left',
		valign : 'middle',
		sortable : false,
	},{
		field : 'productName',
		title : '所属型号',
		align : 'left',
		valign : 'middle',
		sortable : false
	} ,{
		field : 'logisticsCode',
		title : '所属物流单',
		align : 'left',
		valign : 'middle',
		sortable : false
	}, {
		field : 'costPrice',
		title : '成本价',
		align : 'left',
		valign : 'middle',
		formatter:moneyFormatter,
		sortable : false
	},{
		field : 'salePrice',
		title : '零售价',
		align : 'left',
		valign : 'middle',
		formatter:moneyFormatter,
		sortable : false
	},{
		field : 'status',
		title : '状态',
		align : 'left',
		valign : 'middle',
		formatter:Dict.getNameForList('logistic_status'),
		sortable : false
	}];
	
	
	
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/logistics/goods/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				code : $("#code").val(),
				status : 1,
				logisticsCode : $("#logisticsCode").val(),
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