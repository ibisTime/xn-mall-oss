//页面初始化
// 数据字典
var dictContractStatus = null;
var dictContractType = null;
$(function(){
	//按钮权限判断
	showPermissionControl();
	$("#typeSearch").renderDropdown(Dict.getName("contract_template_type"));
	$("#statusSearch").renderDropdown(Dict.getName("contract_template_status"));
	//页面数据字典初始化
	initData();
	
	//分页查询
	queryTableData();
	
	//查询
	$('#searchBtn').click(function() {
		//判空和判非数字
		if(isBlank($("#idSearch").val()) || checkNum($("#idSearch").val(),"模板编号")){
			$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/general/contractTemplate/page"});
		}
	});

	//新增
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/general/contract_template_add_edit.htm";
	});
	
	//编辑
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		location.href = $("#basePath").val()+"/general/contract_template_add_edit.htm?id="+selRecords[0].id;
	});
	
	//删除
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(!confirm("确认删除模版编号["+selRecords[0].id+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/general/contractTemplate/drop";
    	var data = {id:selRecords[0].id};
		doPostAjax(url, data, doSuccessDelBack);
    });
})
function initData(){
	//状态
//	var data= {"key":"contract_template_status"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackStatus);
	//类型
//	var data= {"key":"contract_template_type"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackType);
}
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/general/contractTemplate/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
//				id : $("#idSearch").val(),
				title : $("#titleSearch").val(),
				type : $("#typeSearch").val(),
				status : $("#statusSearch").val(),
				//dateStart : $("#dateStartSearch").val(),
				//dateEnd : $("#dateEndSearch").val(),
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
			field : 'id',
			title : '模板编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'title',
			title : '标题',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'type',
			title : '类型',
			align : 'left',
			valign : 'middle',
			formatter: Dict.getNameForList("contract_template_type"),
			sortable : false
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			formatter: Dict.getNameForList("contract_template_status"),
			sortable : false
		}, {
			field : 'updater',
			title : '创建者',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'updateDatetime',
			title : '创建时间',
			align : 'left',
			valign : 'middle',
			formatter : dateFormatter,
			sortable : false
		}, {
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