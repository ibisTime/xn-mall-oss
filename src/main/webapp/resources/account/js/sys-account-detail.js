//业务类型
var bizType =null;
//账户状态
var orderStatus=null;

$(function() {
	//页面数据字典初始化
//	initData();
	var requestUrl = getQueryString("type") ? ($("#basePath").val()+"/account/frozenAccountPag") : ($("#basePath").val()+"/account/jourPage");
	$("#accountNumberSearch").val(getQueryString("accountNumber"));
	$('#bizTypeSearch').renderDropdown(Dict.getName('biz_type'));
	// 资金明细查询
	$('#jourTableList').bootstrapTable({
		method : "get",
		url : requestUrl,
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				refNo : $("#refNoSearch").val(),
				bizType : $("#bizTypeSearch").val(),
				dateStart : $("#dateStartSearch").val(),
				dateEnd : $("#dateEndSearch").val(),
				accountNumber: $("#accountNumberSearch").val(),
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
		columns : [{
			field : 'ajNo',
			title : '明细编号',
			align : 'middle',
			valign : 'middle',
			sortable : false,
			formatter: function(v, r) {
				return v ? v : r.afjNo;
			}
		},{
			field : 'bizType',
			title : '业务类型',
			align : 'middle',
			valign : 'middle',
			sortable : false,
			formatter:Dict.getNameForList('biz_type'),
		},{
			field : 'refNo',
			title : '相关单号',
			align : 'middle',
			valign : 'middle',
			sortable : false
		},{
			field : 'transAmount',
			title : '变动数值',
			align : 'middle',
			valign : 'middle',
			sortable : false,
			formatter : moneyFormatter
		}, {
			field : 'preAmount',
			title : '变动前数值',
			align : 'middle',
			valign : 'middle',
			sortable : false,
			formatter : moneyFormatter
		}, {
			field : 'postAmount',
			title : '变动后数值',
			align : 'middle',
			valign : 'middle',
			sortable : false,
			formatter : moneyFormatter
		}, {
			field : 'createDatetime',
			title : '产生时间',
			align : 'middle',
			valign : 'middle',
			sortable : false,
			formatter : dateFormatter
		}, {
			field : 'workDate',
			title : '对账日期',
			align : 'middle',
			valign : 'middle',
			sortable : false
		}, {
			field : 'remark',
			title : '备注',
			align : 'middle',
			valign : 'middle',
			sortable : false
		}]
	});
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		if(!isBlank($("#ajNoSearch").val())){
			if(!checkNum($("#ajNoSearch").val(),"资金流水编号")){
				return;
			}
		}
		$('#jourTableList').bootstrapTable('refresh',{url: requestUrl});
	});
	
	//状态转化
	function statusFormatter(value, row) {
		for(var i = 0;i < orderStatus.length;i++){
			if(orderStatus[i].value == value){
				return orderStatus[i].remark;
			}
		}
	}

	//业务类型转化
	function bizTypeFormatter(value, row) {
		for(var i = 0;i < bizType.length;i++){
			if(bizType[i].value == value){
				return bizType[i].remark;
			}
		}
	}

	//格式化金额
	function moneyFormatter(value, row){
		return moneyFormat(value, 2);
	}

	// 格式化时间
	function dateFormatter(value, row){
		return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
	}
});