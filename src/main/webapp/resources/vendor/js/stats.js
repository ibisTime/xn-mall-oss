//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	
	$("#city-group").citySelect({
		required:false
	}); 
	//表格初始化
	queryTableData();
	
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/vendor/statistics"});
	});
	
	//表格初始化
	function queryTableData(){
		var columns = [{
				field : 'merchantQuantity',
				title : '商家总数'
			}, {
				field : 'jfQuantity',
				title : '消费总积分',
				formatter: moneyFormat
			}];
		
		$('#tableList').bootstrapTable({
			method : "get",
			url : $("#basePath").val()+"/vendor/statistics",
			striped : true,
			clickToSelect : true,
			singleSelect : true,
			queryParams : function(params) {
				return {
					province : $("#province").val(),
					city : $("#city").val(),
					area: $("#area").val(),
					dateStart : $("#dateStart").val(),
					dateEnd : $("#dateEnd").val()
				};
			},
			queryParamsType : 'limit',
			responseHandler : function(res) {
				return {
					rows : res.data,
					total : 1
				};
			},
			pagination : false,
			sidePagination : 'server', // 服务端请求
			totalRows : 0,
			pageNumber : 1,
			pageSize : 10,
			pageList : [ 10, 20, 30, 40, 50 ],
			columns : columns
		});
	}
})

