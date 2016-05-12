var dictStatus=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
    //页面数据字典初始化
	initData();
	//分页查询
	queryTableData();
	
	$('#status').renderDropdown(Dict.getName('invest_status'));
	
	$('#confirmBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != 0){
			alert("该记录认购状态不在申请中");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/subscription_confirm.htm?investCode="+selRecords[0].code+"&op=confirm";
	});
	
	$('#cancelBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != 0){
			alert("该记录认购状态不在申请中");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/subscription_confirm.htm?investCode="+selRecords[0].code+"&op=cancel";
	});
	
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/subscription_detail.htm?investCode="+selRecords[0].code+"&op=invest1";
	});
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/project/subscription/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/project/subscription/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    code:$("#code").val(),
			    status: "0",
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
				field : 'investAmount',
				title : '认购金额',
				align : 'left',
				valign : 'middle',
				formatter:moneyFormatter,
				sortable : false
			},{
				field : 'investDatetime',
				title : '认购时间',
				align : 'left',
				valign : 'middle',
				formatter:dateFormatter,
				sortable : false
			},{
				field : 'status',
				title : '状态',
				align : 'left',
				valign : 'middle',
				formatter: Dict.getNameForList('invest_status'),
				sortable : false
		}]
		
	});
}
function initData(){
	
}

//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}

