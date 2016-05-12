//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	$('#status').renderDropdown(Dict.getName('repay_status'));
	$("#status").val("1");
	
	//分页查询
	queryTableData();
	
	// 线下还款绑定事件
	$('#repayedBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != 1){
			alert("还款状态不是待还款");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/repay_detail.htm?repayCode="+selRecords[0].code;
	});
	// 线上还款绑定事件
	$('#repayingBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != 1){
			alert("还款状态不是待还款");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/repay_detail.htm?repayCode="+selRecords[0].code+"&repayType=1";
	});
	
	// 详情绑定事件
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/repay_detail.htm?repayCode="+selRecords[0].code+"&operate=look";
	});
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/project/repay/page"});
	});
})

//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/project/repay/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    code:$("#code").val(),
			    towhoName:$("#towhoName").val(),
			    status:$("#status").val(),
			    businessCode:$("#businessCode").val(),
			    subjectCode:$("#subjectCode").val(),
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
				title : '编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'towhoName',
				title : '客户名称',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'type',
				title : '类型',
				align : 'left',
				valign : 'middle',
				formatter: Dict.getNameForList('repay_type'),
				sortable : false
			},{
				field : 'status',
				title : '状态',
				align : 'left',
				valign : 'middle',
				formatter: Dict.getNameForList('repay_status'),
				sortable : false
			},{
				field : 'amount',
				title : '还款本金',
				align : 'left',
				valign : 'middle',
				formatter:moneyFormatter,
				sortable : false
			},{
				field : 'repayDatetime',
				title : '还款时间',
				align : 'left',
				valign : 'middle',
				formatter : dateTimeFormat,
				sortable : false
			},{
				field : 'businessCode',
				title : '业务编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'businessProfit',
				title : '业务收益',
				align : 'left',
				valign : 'middle',
				formatter: moneyFormatter,
				sortable : false
			},{
				field : 'subjectCode',
				title : '项目编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			}]
	});
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}