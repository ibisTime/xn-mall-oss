$(function() {
	//按钮权限判断
	showPermissionControl();
	
	initData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/bank/page"});
	});
	
	// 增加绑定事件
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/bank/bank_addedit.htm";
	});
	
	// 修改绑定事件
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/bank/bank_addedit.htm?code="+selRecords[0].code;
	});
	
	//删除
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(!confirm("确认删除银行["+selRecords[0].name+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/bank/drop";
    	var data = {code:selRecords[0].code};
		doPostAjax(url, data, doSuccessDelBack);
	});
	
	
	// 表格初始化
	queryTableData();
});

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/bank/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				name : $("#name").val(),
				type : $("#type").val(),
				code :  $("#code").val(),
				status :  $("#status").val(),
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
		pagination : true,//是否分页
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
			title : '银行代号',
			align : 'left',
			valign : 'middle',
			sortable : false,
		}, {
			field : 'name',
			title : '银行名称',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'type',
			title : '银行类别',
			align : 'left',
			valign : 'middle',
			formatter : Dict.getNameForList('bank_type'),
			sortable : false
		}, {
			field : 'status',
			title : '启用状态',
			align : 'left',
			valign : 'middle',
			formatter : Dict.getNameForList('bank_status'),
			sortable : false
		}, {
			field : 'remark',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false
		}]
	});
}

function initData(){
	$('#type').renderDropdown(Dict.getName('bank_type'));
	$('#status').renderDropdown(Dict.getName('bank_status'));
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