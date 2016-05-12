//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	$('#level').renderDropdown(Dict.getName('operator_level'));
	
	//数据字典初始化
	initData();
	
	//分页查询
	queryTableData();

	// 增加菜单绑定事件
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/general/operator_add_edit.htm";
	});
	// 编辑菜单绑定事件
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/general/operator_add_edit.htm?userId="+selRecords[0].userId;
	});
//	// 删除菜单绑定事件
//	$('#dropBtn').click(function() {
//		var selRecords = $('#tableList').bootstrapTable('getSelections');
//		if(selRecords.length <= 0){
//			alert("请选择记录");
//			return;
//		}
//		if(!confirm("确认删除操盘手["+selRecords[0].realName+"]?")){
//    		return false;
//    	}
//    	var url = $("#basePath").val()+"/general/operator/drop";
//    	var data = {userId:selRecords[0].userId};
//		doPostAjax(url, data, doSuccessDelBack);
//	});

	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/general/operator/page"});
	});
})
//初始化参数
function initData(){
	//公司
	//var data= {"key":"operator_company"};
	//doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackCompany);
	
	//状态
	
}

function doSucBackCompany(res){
	dictCompany = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictCompany) != "undefined"){//判断undifined
		for(var i = 0;i < dictCompany.length;i++){
			html += "<option value='"+dictCompany[i].value+"'>"+dictCompany[i].remark+"</option>";
		}
	}
	$("#companyId").html(html);
}




////删除事件回执方法
//function doSuccessDelBack(res) {
//	if (res.data == true) {
//		alert("删除成功");
//		$('#tableList').bootstrapTable('refresh');
//	}else{
//		alert(res.msg);
//	}
//}

//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/general/operator/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    mobile:$("#mobile").val(),
			    realName:$("#realName").val(),
			    level:$("#level").val(),
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
				field :  'userId',
				title : '用户编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field :  'mobile',
				title : '手机号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field :  'realName',
				title : '真实姓名',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field :  'level',
				title : '操盘手等级',
				align : 'left',
				valign : 'middle',
				formatter:Dict.getNameForList('operator_level'),
				sortable : false
			},{
				field :  'updater',
				title : '更新人',
				align : 'left',
				valign : 'middle',
				sortable : false,
			},{
				field :  'updateDatetime',
				title : '更新时间',
				align : 'left',
				valign : 'middle',
				formatter : dateTimeFormat,
				sortable : false,
			},{
				field :  'remark',
				title : '备注',
				align : 'left',
				valign : 'middle',
				sortable : false
			}]
	});
}

//表格数据字典转化
function companyFormatter(value, row) {
	for(var i = 0;i < dictCompany.length;i++){
		if(dictCompany[i].value == value){
			return dictCompany[i].remark;
		}
	}
}

////表格数据字典转化
//function levelFormatter(value, row) {
//	for(var i = 0;i < dictLevel.length;i++){
//		if(dictLevel[i].value == value){
//			return dictLevel[i].remark;
//		}
//	}
//}

////表格数据字典转化
//function statusFormatter(value, row) {
//	for(var i = 0;i < dictStatus.length;i++){
//		if(dictStatus[i].value == value){
//			return dictStatus[i].remark;
//		}
//	}
//}

//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}