//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	//表格初始化
	queryTableData();
	
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/vendor/kind_addedit.htm";
	});
	
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/vendor/kind_addedit.htm?code="+selRecords[0].code;
	});
	
	$('#deleteBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		
    	var url = $("#basePath").val()+"/vendor/kind/delete";
    	var data = {code:selRecords[0].code};
		ajaxPost(url, data).then(function(res) {
			if (res.success) {
				alert('操作成功！');
				$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/vendor/kind/page"});
			}
		});
	});
	
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/vendor/kind/page"});
	});
	
	//表格初始化
	function queryTableData(){
		var columns = [{
				field : '',
				title : '',
				checkbox : true
			},{
				field : 'pic',
				title : '图片',
				formatter: function(v) {
					return v ? '<img src="'+v+'" style="width: 60px;"/>' : '-';
				}
			},{
				field : 'name',
				title : '分类名称'
		    },{
		    	field: 'orderNo',
		    	title: '界面顺序'
		    }];
		
		$('#tableList').bootstrapTable({
			method : "get",
			url : $("#basePath").val()+"/vendor/kind/page",
			striped : true,
			clickToSelect : true,
			singleSelect : true,
			queryParams : function(params) {
				return {
					companyCode: '0',
					loginName : $("#loginName").val(),
					name : $("#name").val(),
					type: $("#type").val(),
					status : $("#status").val(),
					start : params.offset / params.limit + 1,
					limit : params.limit,
					orderColumn: 'order_no',
					orderDir: 'desc'
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

