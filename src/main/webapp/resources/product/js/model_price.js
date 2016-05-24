//数据字典
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	var code = getQueryString('code');
	doGetAjaxIsAsync($("#basePath").val()+"/product/list", {}, false, function(res) {
		var data = res.data || [], html = "<option value=''>请选择</option>";
		for (var i = 0, len = data.length; i < len; i++) {
			html += "<option value='"+data[i].code+"'>"+data[i].name+"</option>";
			$("#productCode").html(html);
		}
	});
	
	$('#status').renderDropdown(Dict.getName('product_status'));

	//表格初始化
	queryTableData();

	//查询
	$('#searchBtn').click(function() {
	$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/product/page"});
	});
	

	//标价
	$('#priceBtn').click(function() {
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
		url : $("#basePath").val()+"/product/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				type : $("#type").val(),
				name : $("#name").val(),
				updater : $("#updater").val(),
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

////操作回调方法
//function doSucBackPublish(res) {
//	if (res.success == true) {
//		alert("删除成功");
//		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/product/page"});
//	}
//}
