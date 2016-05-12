var dictIdKind=null;
var dictStatus=null;
var dictLevel=null;
//页面初始化

$(function(){
	//按钮权限判断
	showPermissionControl();
    //页面数据字典初始化
	initData();
	var soleData = [];
	doGetAjaxIsAsync($("#basePath").val() + '/customer/sole/list', {}, false, function(res) {
		soleData = res.data;
	});

	var formatSole = function(value) {
		for (var i = 0, len = soleData.length; i < len; i++) {
			if (soleData[i].code == value) {
				return soleData[i].name;
			}
		}
		return '-';
	} 
	
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/customer/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    mobile:$("#mobile").val(),
			    realName:$("#realName").val(),
			    idNo:$("#idNo").val(),
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
			field : 'realName',
			title : '真实姓名',
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
			field : 'individualCode',
			title : '个体户',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter: formatSole
			},{
			field : 'serveList',
			title : '服务',
			align : 'left',
			valign : 'middle',
			formatter : Dict.getServeName
			},{
			field : 'quoteList',
			title : '报价',
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
		}]
		
	});

	// 增加菜单绑定事件
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/customer_detail.htm?userId="+selRecords[0].userId;
	});
	
	$('#applyBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/customer_apply.htm?userId="+selRecords[0].userId;
	});
	
	$('#soleBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if (selRecords[0].individualCode) {
			alert("该客户已是个体户，无需再分配");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/customer_sole.htm?userId="+selRecords[0].userId;
	});

	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/customer/page"});
	});
})

function initData(){
}

//删除事件回执方法
function doSuccessDelBack(res) {
	if (res.isSuccess == true) {
		alert("删除成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert("删除失败");
	}
}