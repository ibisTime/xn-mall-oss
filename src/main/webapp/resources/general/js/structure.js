$(function(){
	//按钮权限判断
	showPermissionControl();
    //页面数据字典初始化
//	initData();
	$('#status').renderDropdown(Dict.getName('stru_status'));
	//分页查询
	queryTableData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/general/structure/page"});
	});
	
	// 增加菜单绑定事件
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/general/structure_addedit.htm";
	});
	
	// 修改菜单绑定事件
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/general/structure_addedit.htm?code="+selRecords[0].code;
	});
	
	// 删除菜单绑定事件
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}

		if(!confirm("确认删除结构["+selRecords[0].name+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/general/structure/drop";
    	var data = {code:selRecords[0].code};
		doPostAjax(url, data, doSuccessDelBack);
	});
	
	// 详情菜单绑定事件
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/general/structure_detail.htm?code="+selRecords[0].code;
	});
	


	
//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
//		url : $("#basePath").val()+"/json/data.json",
		url : $("#basePath").val()+"/general/structure/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
				name : $("#name").val(),
				status : $("#status").val(),
				start : params.offset / params.limit + 1,
				limit : params.limit
			};
		},
		queryParamsType : 'limit',
		responseHandler : function(res) {
			return {
				rows : res.data? res.data.list:0,
				total : res.data? res.data.totalCount:0
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
		}, {
			field : 'name',
			title : '名称',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			formatter:Dict.getNameForList('stru_status'),
			sortable : false
		},{
			field : 'updater',
			title : '贡献人',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'updateDatetime',
			title : '贡献时间',
			align : 'left',
			formatter : dateFormatter,
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
})



//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}


//删除事件回执方法
function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("删除成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert("删除失败");
	}
}