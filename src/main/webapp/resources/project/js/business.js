var dictStatus=null;
var dictVisual=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	$("#visual").renderDropdown(Dict.getName('business_visual'));
    //页面数据字典初始化
//	initData();
	
	//分页查询
	queryTableData();

	// 编辑菜单绑定事件
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/business_detail.htm?businessCode="+selRecords[0].code+"&subjectCode="+selRecords[0].subjectCode+"&op=detail";
	});
	// 编辑菜单绑定事件
	$('#approveBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != '1'){
			alert("该业务状态不是待审核");
			return;
		}
		window.location.href = $("#basePath").val()+"/project/business_approve.htm?businessCode="+selRecords[0].code+"&subjectCode="+selRecords[0].subjectCode;
	});
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/project/business/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/project/business/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    code:$("#code").val(),
			    name:$("#name").val(),
			    status:"1",
			    isVisual:$("#visual").val(),
			    applyUser:$("#applyUser").val(),
			    checkUser:$("#checkUser").val(),
			    subjectCode:$("#subjectCode").val(),
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
			title : '业务编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'name',
			title : '业务名称',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'principal',
			title : '业务本金',
			align : 'left',
			valign : 'middle',
			formatter:moneyFormatter,
			sortable : false
		},{
			field : 'profit',
			title : '收益',
			align : 'left',
			valign : 'middle',
			formatter:moneyFormatter,
			sortable : false
		},{
			field : 'isVisual',
			title : '是否可见',
			align : 'left',
			valign : 'middle',
			formatter:Dict.getNameForList("business_visual"),
			sortable : false
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			formatter:Dict.getNameForList('business_status'),
			sortable : false
		},{
			field : 'subjectCode',
			title : '项目编号',
			align : 'left',
			valign : 'middle',
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
			formatter : dateFormatter,
			sortable : false
		},{
			field : 'checkDatetime',
			title : '审核时间',
			align : 'left',
			valign : 'middle',
			formatter : dateFormatter,
			sortable : false
		}]
	});
}
//function initData(){
//    var data= {"key":"business_visual"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackVisual);
//	var data= {"key":"business_status"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackStatus);
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
//function doSucBackVisual(res){
//	dictVisual = res.data;
//	var html = "<option value=''>请选择</option>";
//	if(typeof(dictVisual) != "undefined"){//判断undifined
//		for(var i = 0;i < dictVisual.length;i++){
//			html += "<option value='"+dictVisual[i].value+"'>"+dictVisual[i].remark+"</option>";
//		}
//	}
//	$("#visual").html(html);
//}
//转化
//function visualFormatter(value, row) {
//	for(var i = 0;i < dictVisual.length;i++){
//		if(dictVisual[i].value == value){
//			return dictVisual[i].remark;
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

