//数据字典
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	$('#type').renderDropdown(Dict.getName('product_type'));
	$('#status').renderDropdown(Dict.getName('product_status'));
	
	//表格初始化
	queryTableData();

	//查询
	$('#searchBtn').click(function() {
	$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/model/page"});
	});
	

	//上架
	$('#upBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		
		window.location.href = $("#basePath").val()+"/product/product_updown.htm?code="+selRecords[0].code;

	});
	
	//下架
	$('#downBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		
		window.location.href = $("#basePath").val()+"/product/product_updown.htm?code="+selRecords[0].code;

	});
	
	$('#upBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(!confirm("确认上架产品["+selRecords[0].name+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/model/up";
    	var data = {code:selRecords[0].code};
    	doPostAjax(url, data, doSucBackPublish);
	});
	
	$('#changeBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
      	window.location.href = $("#basePath").val()+"/security/role_menu.htm?code="+selRecords[0].code+"&name="+encodeURI(encodeURI(selRecords[0].name))+"&kind="+selRecords[0].kind;
	});
});



//表格初始化
function queryTableData(){
	var columns = [{
		field : '',
		title : '',
		align : 'left',
		valign : 'middle',
		checkbox : true
	}, {
		field : 'type',
		title : '产品类型',
		formatter:Dict.getNameForList('product_type'),
		align : 'left',
		valign : 'middle',
		sortable : false
	}, {
		field : 'name',
		title : '产品名称',
		align : 'left',
		valign : 'middle',
		sortable : false,
	}, {
		field : 'status',
		title : '状态',
		align : 'left',
		valign : 'middle',
		formatter:Dict.getNameForList('product_status'),
		sortable : false
	}, {
		field : 'updater',
		title : '更新人',
		align : 'left',
		valign : 'middle',
		sortable : false
		}];
	
	
	
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/model/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				type : $("#type").val(),
				name : $("#name").val(),
				level : $("#status").val(),
				updater : $("#updater").val(),
				status:12,
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
		columns : columns
	});
}



//表格时间格式转化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

//操作回调方法
function doSucBackPublish(res) {
	if (res.success == true) {
		alert("删除成功");
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/model/page"});
	}
}
