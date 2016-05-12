var dictStatus=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	
	//分页查询
	queryTableData();
	
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/subscription_detail.htm?investCode="+selRecords[0].code+"&op=invest2";
	});
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/project/subscription/will/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/project/subscription/will/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    code:$("#code").val(),
			    status:"0",
			    projectCode:$("#projectCode").val(),
			    realName:$("#realName").val(),
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
				title : '认购编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'projectCode',
				title : '标的编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'realName',
				title : '客户姓名',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'nowNote',
				title : '负债率(%)/股票代码',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'nowAmount',
				title : '销售收入',
				align : 'left',
				valign : 'middle',
				formatter : moneyFormat,
				sortable : false
			},{
				field : 'investDatetime',
				title : '认购时间',
				align : 'left',
				valign : 'middle',
				formatter:dateTimeFormat,
				sortable : false
			},{
				field : 'status',
				title : '状态',
				align : 'left',
				valign : 'middle',
				formatter:Dict.getNameForList('invest_status'),
				sortable : false
		}]
		
	});
}
