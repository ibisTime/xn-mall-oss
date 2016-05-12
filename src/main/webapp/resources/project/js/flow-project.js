var dictStatus=null;
var dicttype=null;
var dictserve=null;
var dictQuote=null;
//页面初始化
$(function(){
	
    //页面数据字典初始化
	initData();
	$("#status").val(3);
	//分页查询
	queryTableData();

	// 编辑菜单绑定事件
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/project_detail2.htm?subjectCode="+selRecords[0].code+"&projectCode="+selRecords[0].projectCode;
	});
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/project/subject/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/project/subject/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    code:$("#code").val(),
			    type:$("#type").val(),
			    status:"3",
			    name:$("#name").val(),
			    serve:$("#serve").val(),
			    quote:$("#quote").val(),
			    projectCode:$("#projectCode").val(),
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
			field : 'code',
			title : '项目编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'name',
			title : '项目名称',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'type',
			title : '项目类型',
			align : 'left',
			valign : 'middle',
			formatter: typeFormatter,
			sortable : false
		},{
			field : 'totalAmount',
			title : '总金额',
			align : 'left',
			valign : 'middle',
			formatter: moneyFormatter,
			sortable : false
		},{
			field : 'traderName',
			title : '操盘手',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'serve',
			title : '服务类型',
			align : 'left',
			valign : 'middle',
			formatter:serveFormatter,
			sortable : false
		},{
			field : 'quote',
			title : '报价模式',
			align : 'left',
			valign : 'middle',
			formatter:quoteFormatter,
			sortable : false
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			formatter : statusFormatter,
			sortable : false
		},{
			field : 'projectCode',
			title : '标的编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}]
		
	});
}
function initData(){
    var data= {"key":"subject_status"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackStatus);
    var data= {"key":"project_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBacktype);
    var data= {"key":"serve_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackserve);
    var data= {"key":"quote"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackQuote);
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
//数据字典（）关联的回执方法
function doSucBacktype(res){
	dicttype = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dicttype) != "undefined"){//判断undifined
		for(var i = 0;i < dicttype.length;i++){
			html += "<option value='"+dicttype[i].value+"'>"+dicttype[i].remark+"</option>";
		}
	}
	$("#type").html(html);
}
//转化
function typeFormatter(value, row) {
	for(var i = 0;i < dicttype.length;i++){
		if(dicttype[i].value == value){
			return dicttype[i].remark;
		}
	}
}
//数据字典（）关联的回执方法
function doSucBackserve(res){
	dictserve = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictserve) != "undefined"){//判断undifined
		for(var i = 0;i < dictserve.length;i++){
			html += "<option value='"+dictserve[i].value+"'>"+dictserve[i].remark+"</option>";
		}
	}
	$("#serve").html(html);
}
//转化
function serveFormatter(value, row) {
	for(var i = 0;i < dictserve.length;i++){
		if(dictserve[i].value == value){
			return dictserve[i].remark;
		}
	}
}
//数据字典（）关联的回执方法
function doSucBackQuote(res){
	dictQuote = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictQuote) != "undefined"){//判断undifined
		for(var i = 0;i < dictQuote.length;i++){
			html += "<option value='"+dictQuote[i].value+"'>"+dictQuote[i].remark+"</option>";
		}
	}
	$("#quote").html(html);
}
//转化
function quoteFormatter(value, row) {
	for(var i = 0;i < dictQuote.length;i++){
		if(dictQuote[i].value == value){
			return dictQuote[i].remark;
		}
	}
}
//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
