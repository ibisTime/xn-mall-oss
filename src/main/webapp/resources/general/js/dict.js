// 页面初始化
var rem=[];
$(function() {
	//按钮权限判断
	showPermissionControl();
	var url =$("#basePath").val()+"/general/dict/list";
	doGetAjaxIsAsync(url, {"type":"0"} ,false, function(res) {
		$('#keySearch').renderDropdown(res.data, 'dkey', 'dkey');
	});
	
	//列表查询
	queryTableData();
	 $('#tableList').bootstrapTable('refresh');
	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/general/dict/page"});
	});
	
	//新增
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/general/dict_detail.htm";
	});
	
	//编辑
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		location.href = $("#basePath").val()+"/general/dict_detail.htm?id="+selRecords[0].id;
	});
	
	//删除
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(!confirm("确认删除字典键["+selRecords[0].dkey+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/general/dict/drop";
    	var data = {id:selRecords[0].id};
		doPostAjax(url, data, doSuccessDelBack);
    
    });
	
	$()
});
//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/general/dict/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
				parentKey : $("#keySearch").val(),
				//type:1,
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
			checkbox : true
		}, {
			field : 'parentKey',
			title : '种类',
			sortable : false
		}, {
			field : 'dkey',
			title : '字典键 ',
			sortable : false
		}, {
			field : 'dvalue',
			title : '字典值 ',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'updater',
			title : '更新者',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'updateDatetime',
			title : '更新时间',
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