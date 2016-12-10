//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	var userId = getUserId();
	var merchantCode = getQueryString('code') || "";
	var merUserId = merchantCode?"":userId;
	//表格初始化
	queryTableData();
	
	$('.tools').remove();
	
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/vendor/record/page"});
	});
	
	//表格初始化
	function queryTableData(){
		var columns = [{
				field : '',
				title : '',
				checkbox : true
			},{
				field : 'loginName',
				title : '手机号'
			},{
				field : 'quantity',
				title : '消费积分',
				formatter: moneyFormat
		    },{
		    	field : 'shopDatetime',
				title : '消费时间',
				formatter: dateTimeFormat
		    }, {
				field : 'fxAmount',
				title : '返现金额（元）',
				formatter: moneyFormat
			}, {
				field : 'remark',
				title : '备注'
			}];
		
		$('#tableList').bootstrapTable({
			method : "get",
			url : $("#basePath").val()+"/vendor/record/page",
			striped : true,
			clickToSelect : true,
			singleSelect : true,
			queryParams : function(params) {
				return {
					merchantCode: merchantCode,
					loginName : $("#loginName").val(),
					merUserId: merUserId,
					dateStart : $("#dateStart").val(),
					dateEnd : $("#dateEnd").val(),
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

