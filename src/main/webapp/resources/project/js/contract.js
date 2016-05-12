var dictType=null;
var dictStatus=null;
//页面初始化
$(function(){
    //页面数据字典初始化
	initData();
	//分页查询
	queryTableData();

	// 增加菜单绑定事件
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/.htm";
	});
	// 编辑菜单绑定事件
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/.htm?code="+selRecords[0].code;
	});
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"project/contract/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"project/contract/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    code:$("#code").val(),
			    userId:$("#userId").val(),
			    projectCode:$("#projectCode").val(),
			    type:$("#type").val(),
			    status:$("#status").val(),
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
				field : '111',
				title : 'xxx',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : '222',
				title : 'ccc',
				align : 'left',
				valign : 'middle',
				sortable : false
		}]
		
	});
}
function initData(){
    var data= {"key":"contract_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackType);
    var data= {"key":"contract_status"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackStatus);
}
//数据字典（）关联的回执方法
function doSucBackType(res){
	dictType = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictType) != "undefined"){//判断undifined
		for(var i = 0;i < dictType.length;i++){
			html += "<option value='"+dictType[i].value+"'>"+dictType[i].remark+"</option>";
		}
	}
	$("#type").html(html);
}
//转化
function typeFormatter(value, row) {
	for(var i = 0;i < dictType.length;i++){
		if(dictType[i].value == value){
			return dictType[i].remark;
		}
	}
}
//数据字典（）关联的回执方法
function doSucBackStatus(res){
	dictStatus = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictStatus) != "undefined"){//判断undifined
		for(var i = 0;i < dictStatus.length;i++){
			html += "<option value='"+dictStatus[i].value+"'>"+dictStatus[i].remark+"</option>";
		}
	}
	$("#status").html(html);
}
//转化
function statusFormatter(value, row) {
	for(var i = 0;i < dictStatus.length;i++){
		if(dictStatus[i].value == value){
			return dictStatus[i].remark;
		}
	}
}
//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

