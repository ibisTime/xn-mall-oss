//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	//表格初始化
	queryTableData();
	
	$('#type').renderDropdown(Dict.getName('vendor_type'));
	$('#status').renderDropdown(Dict.getName('vendor_updown'));
	
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/vendor/vendor_addedit.htm";
	});
	
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/vendor/vendor_addedit.htm?code="+selRecords[0].code;
	});
	
	$('#updownBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/vendor/vendor_detail.htm?type=1&code="+selRecords[0].code;
	});
	
	//详情绑定事件
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/vendor/vendor_detail.htm?code="+selRecords[0].code;
	});
	
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/vendor/page"});
	});
	
	//表格初始化
	function queryTableData(){
		var columns = [{
				field : '',
				title : '',
				checkbox : true
			},{
				field : 'loginName',
				title : '登录名'
			},{
				field : 'type',
				title : '分类',
				formatter: Dict.getNameForList('vendor_type')
		    },{
		    	field : 'name',
				title : '商家名称'
		    },{
		    	field : 'totalDzNum',
				title : '累计点赞数量'
			}, {
				field : 'totalJfNum',
				title : '累计消费积分'
			}, {
				field : 'status',
				title : '状态',
				formatter: Dict.getNameForList('vendor_updown')
			}, {
				field : 'updateDatetime',
				title : '更新时间',
				formatter: dateTimeFormat
			}, {
				field : 'remark',
				title : '备注'
			}];
		
		$('#tableList').bootstrapTable({
			method : "get",
			url : $("#basePath").val()+"/vendor/page",
			striped : true,
			clickToSelect : true,
			singleSelect : true,
			queryParams : function(params) {
				return {
					loginName : $("#loginName").val(),
					name : $("#name").val(),
					type: $("#type").val(),
					status : $("#status").val(),
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

