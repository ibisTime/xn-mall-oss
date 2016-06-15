$(function() {
	//按钮权限判断
	showPermissionControl();
	
	var roleList = [];
	
	$('#status').renderDropdown(Dict.getUserStatusName());
	
	doGetAjaxIsAsync($("#basePath").val()+"/role/list", {}, false, function(res) {
		roleList = res.data;
		$('#roleCode').renderDropdown(res.data, 'code', 'name');
	});
	
	function renderRole(value) {
		var renderName = '-';
		roleList.forEach(function(role) {
			if (role.code == value) {
				renderName = role.name;
			}
		});
		return renderName;
	}
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
			title : '角色',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter: renderRole
		},{
			field : 'realName',
			title : '真实姓名',
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
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getUserStatusName
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
	
	//编辑用户手机
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/security/change_mobile.htm?userId="+selRecords[0].userId;
	});
	
	//锁定
	$('#lockBtn').click(function() {
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
	$('#unlockBtn').click(function() {
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

