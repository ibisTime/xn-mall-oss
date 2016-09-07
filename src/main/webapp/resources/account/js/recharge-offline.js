$(function() {
	//按钮权限判断
	showPermissionControl();
	
	$('#status').renderDropdown(Dict.getName('recharge_status'));
	
	// 表格初始化
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/account/recharge/rmb/list",
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				mobile: $('#mobile').val(),
				status: $('#status').val(),
				dateStart: $('#startDate').val(),
				dateEnd: $('#endDate').val(),
				currency: 'CNY',
				start : params.offset / params.limit + 1,
				limit : params.limit,
				orderColumn : this.sortName,
				orderDir : this.sortOrder
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
			field : 'code',
			title : '订单编号'
		},{
			field : 'mobile',
			title : '手机号'
		},{
			field : 'amount',
			title : '充值金额',
			formatter : moneyFormatter
		},{
			field : 'status',
			title : '状态',
			formatter : Dict.getNameForList('recharge_status')
		},{
			field : 'createDatetime',
			title : '申请时间',
			formatter : dateFormatter
		}]
	});
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/account/recharge/rmb/list"});
	});
	
	//申请事件绑定
	$('#applyBtn').click(function(){
		location.href = $("#basePath").val()+"/account/recharge_offline_apply.htm";
	});
	
	// 审核事件绑定
	$('#checkBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != "1"){
			alert("该订单状态不是待审批状态");
			return;
		}
		location.href = $("#basePath").val()+"/account/recharge_offline_approve.htm?code="+selRecords[0].code+"&accountNumber="+selRecords[0].accountNumber+"&rechargeType=03";
	});
});

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
//格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
