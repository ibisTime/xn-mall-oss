// 页面初始化
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	//列表查询
	queryTableData();
	
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/general/system/log/page"});
	});
	
	var sysActData = Dict.getSysActName();
	$('#operateTypeSearch').renderDropdown(sysActData);
});
//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/general/system/log/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return $.extend($('#search-form').serializeObject(), {
				start : params.offset / params.limit + 1,
				limit : params.limit
			});
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
			field : 'toSystem',
			title : '针对系统'
		},{
			field : 'toTable',
			title : '针对表'
		},{
			field : 'toRow',
			title : '针对字段'
		},{
			field : 'toColumn',
			title : '针对列'
		},{
			field : 'operateType',
			title : '操作类型',
			formatter: Dict.getSysActName
		},{
			field : 'originalValue',
			title : '变更前'
		},{
			field : 'updatedValue',
			title : '变更后'
		},{
			field : 'operater',
			title : '操作人'
		},{
			field : 'operateDatetime',
			title : '操作时间',
			formatter: dateTimeFormat
		}]
	});
}
//参数名下拉列表
function doSuccessBackKeyList(res){
	var data = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(data) != "undefined"){//判断undifined
		for(var i = 0;i < data.length;i++){
			html += "<option value='"+data[i].key+"'>"+data[i].key+" "+data[i].remark+"</option>";
		}
	}
	$("#keySearch").html(html);
}
//删除事件回执方法
function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("删除成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert(res.msg);
	}
}


//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}