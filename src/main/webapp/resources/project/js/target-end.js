var dictStatus=null;
var dicttype=null;
var dictLevel=null;
var dictServe=null;
var dictQuote=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
    //页面数据字典初始化
//	initData();
	$('#serve').renderDropdown(Dict.getName('serve_type'));
	$('#quote').renderDropdown(Dict.getName('quote'));
	$('#level').renderDropdown(Dict.getName('customer_level'));
	$('#type').renderDropdown(Dict.getName('project_type'));
	doGetAjaxIsAsync($("#basePath").val() + '/general/operator/list', {}, false, function(res) {
		var data = res.data || [];
		$('#trader').renderDropdown(data, 'userId', 'realName');
	});
	//分页查询
	queryTableData();

	//编辑菜单绑定事件
	$('#endBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != 2){
			alert("该标的状态不是初审通过，进入可募集状态");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/target_end_detail.htm?projectCode="+selRecords[0].code;
	});
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/project/target/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/project/target/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    code:$("#code").val(),
			    status:"2",
			    serve:$("#serve").val(),
			    quote:$("#quote").val(),
			    level:$("#level").val(),
			    type:$("#type").val(),
			    trader:$("#trader").val(),
			    applyUser:$("#applyUser").val(),
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
			title : '标的编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'name',
			title : '标的名称',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'traderName',
			title : '操盘手',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'type',
			title : '类型',
			align : 'left',
			valign : 'middle',
			formatter:Dict.getNameForList('project_type'),
			sortable : false
		},{
			field : 'serve',
			title : '服务类型',
			align : 'left',
			valign : 'middle',
			formatter:Dict.getNameForList('serve_type'),
			sortable : false
		},{
			field : 'totalAmount',
			title : '总金额',
			align : 'left',
			valign : 'middle',
			formatter:moneyFormatter,
			sortable : false
		},{
			field : 'quote',
			title : '报价模式',
			align : 'left',
			valign : 'middle',
			formatter:Dict.getNameForList('quote'),
			sortable : false
		},{
			field : 'level',
			title : '受众等级',
			align : 'left',
			valign : 'middle',
			formatter:Dict.getNameForList('customer_level'),
			sortable : false
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			formatter:Dict.getNameForList('project_status'),
			sortable : false
		},{
			field : 'applyUser',
			title : '申请人',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'applyDatetime',
			title : '申请时间',
			align : 'left',
			valign : 'middle',
			formatter:dateFormatter,
			sortable : false
		},{
			field : 'checkUser',
			title : '审核人',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		},{
			field : 'checkDatetime',
			title : '审核时间',
			align : 'left',
			valign : 'middle',
			formatter:dateFormatter,
			sortable : false,
			visible : false
		}]
	});
}
//function initData(){
//    var data= {"key":"project_status"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackStatus);
//    var data= {"key":"project_type"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBacktype);
//    var data= {"key":"customer_level"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackLevel);
//	var data= {"key":"serve_type"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackServe);
//	var data= {"key":"quote"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackQuote);
//	
//	var url = $("#basePath").val()+"/general/operator/list";
//	doGetAjaxIsAsync(url, data, false, doSucBackTrader);
//}
////数据字典（）关联的回执方法
//function doSucBackStatus(res){
//	dictStatus = res.data;
//}
////转化
//function statusFormatter(value, row) {
//	for(var i = 0;i < dictStatus.length;i++){
//		if(dictStatus[i].value == value){
//			return dictStatus[i].remark;
//		}
//	}
//}
////数据字典（）关联的回执方法
//function doSucBacktype(res){
//	dicttype = res.data;
//	var html = "<option value=''>请选择</option>";
//	if(typeof(dicttype) != "undefined"){//判断undifined
//		for(var i = 0;i < dicttype.length;i++){
//			html += "<option value='"+dicttype[i].value+"'>"+dicttype[i].remark+"</option>";
//		}
//	}
//	$("#type").html(html);
//}
////转化
//function typeFormatter(value, row) {
//	for(var i = 0;i < dicttype.length;i++){
//		if(dicttype[i].value == value){
//			return dicttype[i].remark;
//		}
//	}
//}
////数据字典（）关联的回执方法
//function doSucBackLevel(res){
//	dictLevel = res.data;
//	var html = "<option value=''>请选择</option>";
//	if(typeof(dictLevel) != "undefined"){//判断undifined
//		for(var i = 0;i < dictLevel.length;i++){
//			html += "<option value='"+dictLevel[i].value+"'>"+dictLevel[i].remark+"</option>";
//		}
//	}
//	$("#level").html(html);
//}
////转化
//function levelFormatter(value, row) {
//	for(var i = 0;i < dictLevel.length;i++){
//		if(dictLevel[i].value == value){
//			return dictLevel[i].remark;
//		}
//	}
//}
////数据字典（）关联的回执方法
//function doSucBackServe(res){
//	dictServe = res.data;
//	var html = "<option value=''>请选择</option>";
//	if(typeof(dictServe) != "undefined"){//判断undifined
//		for(var i = 0;i < dictServe.length;i++){
//			html += "<option value='"+dictServe[i].value+"'>"+dictServe[i].remark+"</option>";
//		}
//	}
//	$("#serve").html(html);
//}
////转化
//function serveFormatter(value, row) {
//	for(var i = 0;i < dictServe.length;i++){
//		if(dictServe[i].value == value){
//			return dictServe[i].remark;
//		}
//	}
//}
////数据字典（）关联的回执方法
//function doSucBackQuote(res){
//	dictQuote = res.data;
//	var html = "<option value=''>请选择</option>";
//	if(typeof(dictQuote) != "undefined"){//判断undifined
//		for(var i = 0;i < dictQuote.length;i++){
//			html += "<option value='"+dictQuote[i].value+"'>"+dictQuote[i].remark+"</option>";
//		}
//	}
//	$("#quote").html(html);
//}
////转化
//function quoteFormatter(value, row) {
//	for(var i = 0;i < dictQuote.length;i++){
//		if(dictQuote[i].value == value){
//			return dictQuote[i].remark;
//		}
//	}
//}
//
//function doSucBackTrader(res){
//	dictTrader = res.data;
//	var html = "<option value=''>请选择</option>";
//	if(typeof(dictTrader) != "undefined"){//判断undifined
//		for(var i = 0;i < dictTrader.length;i++){
//			html += "<option value='"+dictTrader[i].userId+"'>"+dictTrader[i].realName+"</option>";
//		}
//	}
//	$("#trader").html(html);
//}
//
////转化  
//function traderFormatter(value, row) {
//	for(var i = 0;i < dictTrader.length;i++){
//		if(dictTrader[i].userId == value){
//			return dictTrader[i].realName;
//		}
//	}
//}

//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
