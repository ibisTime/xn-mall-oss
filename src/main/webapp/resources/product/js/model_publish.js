//数据字典
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	$('#status').renderDropdown(Dict.getName('score_updown'));
	
	var code = getQueryString('code');
	doGetAjaxIsAsync($("#basePath").val()+"/product/list", {status: 1}, false, function(res) {
		var data = res.data || [], html = "<option value=''>请选择</option>";
		for (var i = 0, len = data.length; i < len; i++) {
			html += "<option value='"+data[i].name+"'>"+data[i].name+"</option>";
			$("#productName").html(html);
		}
	});
	
	//表格初始化
	queryTableData();

	//查询
	$('#searchBtn').click(function() {
	$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/model/price/page"});
	});
	

	//上架
	$('#updownBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		
		window.location.href = $("#basePath").val()+"/product/model_updown.htm?code="+selRecords[0].code;

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
		field : 'model',
		title : '货品名称',
		formatter: function(v) {
			return v.name;
		}
	}, {
		field : 'model',
		title : '货品类型',
		formatter: function(v) {
			return v.productName;
		}
	}, {
		field : 'name',
		title : '进货价（元）',
		formatter: moneyFormat
	}, {
		field : 'fromQuantity',
		title : '仓库数量'
	}, {
		field : 'status',
		title : '状态',
		formatter: Dict.getNameForList('score_updown')
	}, {
		field : 'discountPrice',
		title : '售价（积分）',
		formatter: moneyFormat
	}, {
		field : 'toSite',
		title : '位置',
		formatter: Dict.getNameForList('model_pos')
	}, {
		field : 'remark',
		title : '备注'
	}];
	
	
	
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/model/price/page",
		 
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				modelName : $("#modelName").val(),
				productName : $("#productName").val(),
				status : $("#status").val(),
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
