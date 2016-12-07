//数据字典
var dictLevel = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	var joinUsers = [{
		userId: 'U201600000000000001',
		loginName: '菜狗平台'
	}];
	var joinUsersDict = {};
	
	$('#status').renderDropdown(Dict.getName('order_status'));
	
	ajaxGet($('#basePath').val() + '/user/join/list', {}, false, true).then(function(res) {
		if (res.success) {
			joinUsers = joinUsers.concat(res.data);
			$('#toUser').renderDropdown(joinUsers, 'userId', 'loginName');
			joinUsers.forEach(function(i) {
				joinUsersDict[i.userId] = i.loginName;
			});
		}
	});
		
	//表格初始化
	function queryTableData(){
		var columns = [{
			field : '',
			title : '',
			align : 'left',
			valign : 'middle',
			checkbox : true
		}, {
			field : 'code',
			title : '订单编号',
			align : 'left',
			valign : 'middle',
			sortable : false,
		}, {
			field : 'type',
			title : '订单类型',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter: Dict.getNameForList('invoice_type')
		}, {
			field : 'mobile',
			title : '手机号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field: 'toUser',
			title: '下单门店',
			align : 'left',
			valign : 'middle',
			formatter: function(v) {
				return joinUsersDict[v];
			}
		}, {
			field : 'totalAmount',
			title : '总售价（积分+人民币）',
			align : 'left',
			valign : 'middle',
			formatter: function(v, r) {
				if (r.totalCnyAmount) {
					return moneyFormat(v) + ' + ' + moneyFormat(r.totalCnyAmount);
				} else {
					return moneyFormat(v);
				}
			},
			sortable : false
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			formatter:Dict.getNameForList('order_status'),
			sortable : false
		},{
			field : 'applyDatetime',
			title : '下单时间',
			align : 'left',
			valign : 'middle',
			formatter:dateFormatter,
			sortable : false
		}];
		
		$('#tableList').bootstrapTable({
			method : "get",
			url : $("#basePath").val()+"/model/allorder/Page",
			 
			striped : true,
			clickToSelect : true,
			singleSelect : true,
			queryParams : function(params) {
				return {
					mobile: $('#mobile').val(),
					applyUser : $("#applyUser").val(),
					status : $("#status").val(),
					toUser: $('#toUser').val(),
					dateStart: $('#dateStartSearch').val(),
					dateEnd: $('#dateEndSearch').val(),
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
	queryTableData();
	

	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/model/allorder/Page"});
	});
	
	//详情
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/order/order_detail.htm?invoiceCode="+selRecords[0].code;
	});
	
});
//表格时间格式转化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}