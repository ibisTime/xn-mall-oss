var dictLevel=null;
//页面初始化

$(function(){
	//按钮权限判断
	showPermissionControl();
	//表格初始化
	queryTableData();
	
	//详情绑定事件
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/customer_detail.htm?userId="+selRecords[0].userId;
	});
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/customer/queryPage"});
	});
	
	//修改
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/customer_edit.htm?code="+selRecords[0].code;
	});
	
	
	
	//表格初始化
	function queryTableData(){
		var columns = [{
			field : '',
			title : '',
			align : 'left',
			valign : 'middle',
			checkbox : true
			},{
			field : 'mobile',
			title : '手机号',
			align : 'left',
			valign : 'middle',
			sortable : false
			},{
			field : 'userKind',
			title : '用户类别',
			align : 'left',
			valign : 'middle',
			sortable : false
			},{
			field : 'userReferee',
			title : '推荐人',
			align : 'left',
			valign : 'middle',
			sortable : false
			},{
			field : 'idKind',
			title : '证件类型',
			formatter : Dict.getNameForList('id_kind')
			},{
			field : 'idNo',
			title : '证件号码',
			align : 'left',
			valign : 'middle',
			sortable : false
			},{
			field : 'realName',
			title : '真实姓名',
			align : 'left',
			valign : 'middle',
			formatter : Dict.getQuoteName,
			sortable : false
		    },{
			field : '状态',
			title : 'status',
			align : 'left',
			valign : 'middle',
			formatter : Dict.getQuoteName,
			sortable : false
		    },{
			field : 'level',
			title : '等级',
			align : 'left',
			valign : 'middle',
			sortable : false
		}];
		
		
		
		$('#tableList').bootstrapTable({
			method : "get",
			url : $("#basePath").val()+"/account/queryPage",
			height : $(window).height() - 180,
			striped : true,
			clickToSelect : true,
			singleSelect : true,
			queryParams : function(params) {
				return {
					loginName : $("#loginName").val(),
					mobile : $("#mobile").val(),
					userKind : $("#userKind").val(),
					userReferee : $("#userReferee").val(),
					idKind : $("#idKind").val(),
					idNo : $("#idNo").val(),
					realName : $("#realName").val(),
					status : $("#status").val(),
					level : $("#level").val(),
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
})
	//表格时间格式转化
	function dateFormatter(value, row){
		return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
	}

