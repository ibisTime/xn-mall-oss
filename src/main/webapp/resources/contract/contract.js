//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	
	$('#status').renderDropdown(Dict.getName('contract_status'));
	$('#type').renderDropdown(Dict.getName('contract_type'));
	
	//分页查询
	queryTableData();

	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/contract/contract_detail.htm?contractCode="+selRecords[0].code;
	});

	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/project/contract/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/project/contract/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
				code:$("#code").val(),
			    companyCode:$("#companyCode").val(),
			    subjectCode:$("#subjectCode").val(),
			    type: $("#type").val(),
			    status: $("#status").val(),
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
				field : 'companyCode',
				title : '客户编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'subjectCode',
				title : '项目编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'type',
				title : '类型',
				align : 'left',
				valign : 'middle',
				sortable : false,
				formatter : Dict.getNameForList('contract_type')
			},{
				field : 'status',
				title : '状态',
				align : 'left',
				valign : 'middle',
				sortable : false,
				formatter : Dict.getNameForList('contract_status')
			},{
				field : 'createDatetime',
				title : '创建时间',
				align : 'left',
				valign : 'middle',
				sortable : false,
				formatter : dateTimeFormat
			}]
		
	});
}