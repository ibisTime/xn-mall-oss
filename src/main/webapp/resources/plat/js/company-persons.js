var companyCode = null;
$(function() {
	//按钮权限判断
	//showPermissionControl();
	$("#addBtn,#editBtn,#dropBtn,#backBtn").show();
	companyCode = getQueryString('companyCode');
	
	// 表格初始化
	queryTableData();
	
	//初始化数据
	initData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/plat/companypersons/page"});
	});
	
	// 增加绑定事件
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/plat/company_persons_addedit.htm?companyCode="+companyCode;
	});
	
	// 修改绑定事件
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/plat/company_persons_addedit.htm?code="+selRecords[0].userId+"&companyCode="+companyCode;
	});
	
	// 删除绑定事件
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		
		if(!confirm("确认删除公司人员["+selRecords[0].realName+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/plat/companypersons/drop";
    	var data = {userId:selRecords[0].userId};
		doPostAjax(url, data, doSuccessDelBack);
	});
	
	// 返回绑定事件
	$('#backBtn').click(function() {
		window.location.href = $("#basePath").val()+"/plat/company.htm";
	});
});

function initData(){
}

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/plat/companypersons/page",
		height : $(window).height() - 120,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				companyCode:companyCode,
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
		pagination : true, // 不分页
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
		}, {
			field : 'code',
			title : '人员编号',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		}, {
			field : 'realName',
			title : '姓名',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'mobile',
			title : '手机号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'telephone',
			title : '座机',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'idKind',
			title : '证件类型',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('id_kind'),
		}, {
			field : 'idNo',
			title : '证件号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'idYxq',
			title : '证件有效期',
			align : 'left',
			valign : 'middle',
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


// 删除事件回执方法
function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("删除成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert("删除失败");
	}
}