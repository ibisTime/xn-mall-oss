$(function() {
	//按钮权限判断
	showPermissionControl();
	
	$('#status').renderDropdown(Dict.getUserStatusName());
	
	doGetAjax($("#basePath").val()+"/role/list", {}, function(res) {
		$('#roleCode').renderDropdown(res.data, 'code', 'name');
	});
	// 表格初始化
	queryTableData();
	
	// 查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/user/page"});
	});
	
	//添加用户
	$('#addBtn').click(function() {
		location.href = $("#basePath").val()+"/security/user_detail.htm";
	});
	
	//代注册
	$('#replaceAddBtn').click(function() {
		location.href = $("#basePath").val()+"/security/user_replaceadd.htm";
	});
	
	//编辑用户
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/security/change_mobile.htm?userId="+selRecords[0].userId;
	});
	
	//重置密码
	$('#rePwdBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/security/user_pwd_reset.htm?userId="+selRecords[0].userId+"&loginName="+encodeURI(encodeURI(selRecords[0].loginName));
	});
	
	//重置管理员交易密码
	$('#reTradePwdBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/security/user_resetpsd.htm?userId="+selRecords[0].userId+"&loginName="+encodeURI(encodeURI(selRecords[0].loginName));
	});
	
	//锁定
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != 0){
			alert("请选择正常记录");
			return;
		}
		if(!confirm("确认锁定用户["+selRecords[0].loginName+"]?")){
    		return false;
    	}
		var data = {"userId":selRecords[0].userId};
		var url = $("#basePath").val()+"/user/drop";
		doPostAjax(url, data, doSuccessDelBack);
	});
	
	//解锁
	$('#activeBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != 1 && selRecords[0].status != 2){
			alert("请选择锁定记录");
			return;
		}
		if(!confirm("确认解锁用户["+selRecords[0].loginName+"]?")){
    		return false;
    	}
		var data = {"userId":selRecords[0].userId};
		var url = $("#basePath").val()+"/user/active";
		doPostAjax(url, data, doSuccessDelBack);
	});
	
	//更改角色
	$('#changeRoleBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/security/user_role.htm?userId="+selRecords[0].userId+"&loginName="+encodeURI(encodeURI(selRecords[0].loginName))+"&kind="+selRecords[0].kind;
	});
});

// 列表查询
function queryTableData(){
	var columns = [{
		field : '',
		title : '',
		align : 'left',
		valign : 'middle',
		checkbox : true
	}, {
		field : 'loginName',
		title : '用户名',
		align : 'left',
		valign : 'middle',
		sortable : false
	}, {
		field : 'roleCode',
		title : '角色编号',
		align : 'left',
		valign : 'middle',
		sortable : false
	}, {
		field : 'status',
		title : '状态',
		align : 'left',
		valign : 'middle',
		sortable : false,
		formatter : Dict.getUserStatusName
	}, {
		field : 'userReferee',
		title : '推荐人',
		align : 'left',
		valign : 'middle',
		sortable : false
	}, {
		field : 'idKind',
		title : '证件类型',
		align : 'left',
		valign : 'middle',
		sortable : false,
		formatter : Dict.getIDKindName
	}, {
		field : 'idNo',
		title : '证件号',
		align : 'left',
		valign : 'middle',
		sortable : false
	},{
		field : 'realName',
		title : '真实姓名',
		align : 'left',
		valign : 'middle',
		sortable : false,
	},{
		field : 'mobile',
		title : '手机号',
		align : 'left',
		valign : 'middle',
		sortable : false,
	},{
		field : 'updater',
		title : '更新人',
		align : 'left',
		valign : 'middle',
		sortable : false
	}, {
		field : 'updateDatetime',
		title : '更新时间',
		align : 'left',
		valign : 'middle',
		sortable : false,
		formatter : dateTimeFormat
	}, {
		field : 'remark',
		title : '备注',
		align : 'left',
		valign : 'middle',
		sortable : false
	}];
	
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/user/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				roleCode : $("#roleCode").val(),
				loginName : $("#loginName").val(),
				userReferee : $("#userReferee").val(),
				status : $("#status").val(),
				updater : $("#updater").val(),
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

function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("操作成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert(res.msg);
	}
}
