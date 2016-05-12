var pStatus = null;
var pDirection = null;
var pChannel=null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	//页面数据字典初始化
	initData();
	// 表格初始化
	queryTableData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/account/recWithHis/page"});
	});
	
	// 查看详情事件绑定
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		location.href = $("#basePath").val()+"/account/rec_with_his_detail.htm?cqNo="+selRecords[0].cqNo+"&accountNumber="+selRecords[0].accountNumber+"&recWithStatus=his";
	});
	//导出
	$('#exportBtn').click(function() {
		var url=$("#basePath").val()+"/account/recWith/list/export?cqNo="+$("#cqNoSearch").val()+"&mobile="+$("#mobileSearch").val()+"&realName="+$("#realNameSearch").val()+"&direction="+$("#directionSearch").val()+"&status="+$("#statusSearch").val()+"&channel="+$("#channelSearch").val()+"&dateStart="+$("#dateStartSearch").val()+"&dateEnd="+$("#dateEndSearch").val()+"&fileName=充值取现列表";
		window.open(url);
	});
});

//初始化数据字典
function initData(){
	//订单状态
	var data= {"key":"order_status"};
	doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackStatus);
	//方向
	var data= {"key":"account_direction"};
	doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackDirection);
	//支付通道
	var data= {"key":"channel"};
	doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackChannel);
}

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/account/recWithHis/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		sortName : 'createDatetime',
		sortOrder : 'desc',
		queryParams : function(params) {
			return {
				cqNo : $("#cqNoSearch").val(),
				//mobile : $("#mobileSearch").val(),
				//realName : $("#realNameSearch").val(),
				accountNumber : $("#accountNumberSearch").val(),
				direction : $("#directionSearch").val(),
				status : $("#statusSearch").val(),
				channel : $("#channelSearch").val(),
				dateStart : $("#dateStartSearch").val(),
				dateEnd : $("#dateEndSearch").val(),
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
			field : 'cqNo',
			title : '订单编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'mobile',
			title : '手机号',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		},{
			field : 'realName',
			title : '真实姓名',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		},{
			field : 'direction',
			title : '方向',
			align : 'left',
			valign : 'middle',
			formatter : directionFormatter,
			sortable : false
		},{
			field : 'channel',
			title : '渠道',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : channelFormatter
		},{
			field : 'amount',
			title : '金额',
			align : 'left',
			valign : 'middle',
			sortable : true,
			formatter : moneyFormatter
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : statusFormatter
		},{
			field : 'createDatetime',
			title : '申请时间',
			align : 'left',
			valign : 'middle',
			sortable : true,
			formatter : dateFormatter
		},{
			field : 'approveUser',
			title : '审批人',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		},{
			field : 'approveDatetime',
			title : '审批时间',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false,
			formatter : dateFormatter,
			visible : false
		},{
			field : 'payUser',
			title : '支付人',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		}, {
			field : 'payDatetime',
			title : '支付时间',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false,
			formatter : dateFormatter
		},{
			field : 'payNo',
			title : '支付编号',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		},{
			field : 'payFee',
			title : '支付手续费',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false,
			formatter : moneyFormatter
		},{
			field : 'workDate',
			title : '对账日期',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		},{
			field : 'accountNumber',
			title : '账户编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'remark',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		}]
	});
}


// 格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
//数据字典（渠道）关联的回执方法
function doSucBackChannel(res){
	pChannel = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(pChannel) != "undefined"){//判断undifined
		for(var i = 0;i < pChannel.length;i++){
			html += "<option value='"+pChannel[i].value+"'>"+pChannel[i].remark+"</option>";
		}
	}
	$("#channelSearch").html(html);
}
//渠道转化
function channelFormatter(value, row) {
	for(var i = 0;i < pChannel.length;i++){
		if(pChannel[i].value == value){
			return pChannel[i].remark;
		}
	}
}
//数据字典（转入转出状态）关联的回执方法
function doSucBackStatus(res){
	pStatus = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(pStatus) != "undefined"){//判断undifined
		for(var i = 0;i < pStatus.length;i++){
			html += "<option value='"+pStatus[i].value+"'>"+pStatus[i].remark+"</option>";
		}
	}
	$("#statusSearch").html(html);
}

//数据字典（转入转出方向）关联的回执方法
function doSucBackDirection(res){
	pDirection = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(pDirection) != "undefined"){//判断undifined
		for(var i = 0;i < pDirection.length;i++){
			html += "<option value='"+pDirection[i].value+"'>"+pDirection[i].remark+"</option>";
		}
	}
	$("#directionSearch").html(html);
}

//数据字典（状态）
function statusFormatter(value, row) {
	for(var i = 0;i < pStatus.length;i++){
		if(pStatus[i].value == value){
			return pStatus[i].remark;
		}
	}
}

//数据字典（方向）
function directionFormatter(value, row) {
	for(var i = 0;i < pDirection.length;i++){
		if(pDirection[i].value == value){
			return pDirection[i].remark;
		}
	}
}

// 格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}