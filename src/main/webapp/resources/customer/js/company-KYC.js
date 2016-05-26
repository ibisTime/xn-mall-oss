var dictIdKind=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
    //页面数据字典初始化
	initData();
	//分页查询
	queryTableData();

	$('#KYCBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/company_KYC_detail.htm?companyId="+selRecords[0].code;
	});

	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/company/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/company/page",
		
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    name:$("#companyName").val(),
			    gsyyzzNo:$("#licenceNo").val(),
			    status:1,
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
			field : 'name',
			title : '公司名字',
			align : 'left',
			valign : 'middle',
			sortable : false
			},{
			field : 'gsyyzzNo',
			title : '营业执照号',
			align : 'left',
			valign : 'middle',
			sortable : false
			},{
				field : 'realName',
				title : '法人真实姓名',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
			field : 'idKind',
			title : '法人证件类型',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('id_kind')
			},{
			field : 'idNo',
			title : '法人证件号码',
			align : 'left',
			valign : 'middle',
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
