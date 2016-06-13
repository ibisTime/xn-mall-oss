// 页面初始化
var rem=[];
$(function() {
	//按钮权限判断
	showPermissionControl();
	$('#status').renderDropdown(Dict.getName('account-status'));
	var url =$("#basePath").val()+"/account/accountlist";
//	doGetAjaxIsAsync(url, {"type":"0"} ,false, function(res) {
//		$('#keySearch').renderDropdown(res.data, 'dkey', 'dkey');
//	});
	
	//列表查询
	queryTableData();
	 $('#tableList').bootstrapTable('refresh');
	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/account/accountpage"});
	});
	
	//新增
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/general/account-addedit.htm";
	});
	
	//修改
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		location.href = $("#basePath").val()+"/general/account-addedit.htm?code="+selRecords[0].code;
	});
	
	//删除
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(!confirm("确认删除受款账号["+selRecords[0].companyCode+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/account/dropaccount";
    	var data = {code:selRecords[0].code};
		doPostAjax(url, data, doSuccessDelBack);
    
    });
	
	$()
});
//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/account/accountpage",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
				companyCode : $("#companyCode").val(),
				subbranch : $("#subbranch").val(),
				cardNo : $("#cardNo").val(),
				status : $("#status").val(),
				//type:1,
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
			checkbox : true
		}, {
			field : 'companyCode',
			title : '开户公司 ',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'subbranch',
			title : '开户银行',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'cardNo',
			title : '账号',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			formatter:Dict.getNameForList('account-status'),
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