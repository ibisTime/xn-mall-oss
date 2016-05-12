var dictStatus=null;
var dicttype=null;
var dictserve=null;
var dictQuote=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	$("#serve").renderDropdown(Dict.getName("serve_type"));
	$("#quote").renderDropdown(Dict.getName("quote"));
    //页面数据字典初始化
//	initData();
	//分页查询
	queryTableData();

	// 编辑菜单绑定事件
	$('#flowBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/flow_project_detail.htm?subjectCode="+selRecords[0].code+"&projectCode="+selRecords[0].projectCode;
	});
	// 编辑菜单绑定事件
	$('#startBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/start_project_detail.htm?subjectCode="+selRecords[0].code+"&projectCode="+selRecords[0].projectCode;
	});
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/project/subject/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/project/subject/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    code:$("#code").val(),
			    status:"1",
			    name:$("#name").val(),
			    serve:$("#serve").val(),
			    quote:$("#quote").val(),
			    projectCode:$("#projectCode").val(),
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
				title : '项目编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'name',
				title : '项目名称',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'totalAmount',
				title : '总金额',
				align : 'left',
				valign : 'middle',
				formatter: moneyFormatter,
				sortable : false
			},{
				field : 'traderName',
				title : '操盘手',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'serve',
				title : '服务类型',
				align : 'left',
				valign : 'middle',
				formatter:Dict.getNameForList('serve_type'),
				sortable : false
			},{
				field : 'quote',
				title : '报价模式',
				align : 'left',
				valign : 'middle',
				formatter:Dict.getNameForList('quote'),
				sortable : false
			},{
				field : 'status',
				title : '状态',
				align : 'left',
				valign : 'middle',
				formatter : Dict.getNameForList('subject_status'),
				sortable : false
			},{
				field : 'projectCode',
				title : '标的编号',
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

//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

