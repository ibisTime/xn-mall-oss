$(function() {
	//按钮权限判断
	showPermissionControl();
	
	// 表格初始化
	queryTableData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/plat/company/page"});
	});
	
	// 增加菜单绑定事件
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/plat/company_addedit.htm";
	});
	
	// 修改菜单绑定事件
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/plat/company_addedit.htm?code="+selRecords[0].code;
	});
	
	// 删除菜单绑定事件
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}

		if(!confirm("确认删除公司["+selRecords[0].zwName+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/plat/company/drop";
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
		window.location.href = $("#basePath").val()+"/plat/company_detail.htm?code="+selRecords[0].code;
	});
	
	// 公司人员绑定事件
	$('#companyPersonsBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/plat/company_persons.htm?companyCode="+selRecords[0].code;
	});
	
	
});

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/plat/company/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				zwName : $("#nameSearch").val(),
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
		}, {
			field : 'code',
			title : '公司编号',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		}, {
			field : 'zwName',
			title : '公司名称',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'frPerson',
			title : '法人',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'debdtxPerson',
			title : '大额变动提醒人',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'wyRecorder',
			title : '网银录入人',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'wyChecker',
			title : '网银复核人',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'zcAddress',
			title : '注册地址',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'jyAddress',
			title : '经营地址',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'telephone',
			title : '公司座机',
			align : 'left',
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

// 删除事件回执方法
function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("删除成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert("删除失败");
	}
}
