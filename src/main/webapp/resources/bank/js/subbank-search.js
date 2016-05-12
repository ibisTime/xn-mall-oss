$(function() {
	//按钮权限判断
	showPermissionControl();
	
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/subbank/page"});
	});
	
	// 查看绑定事件
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/bank/subbank_detail.htm?code="+selRecords[0].code;
	});
	
	// 变更菜单绑定事件
	$('#changeBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}

		if(!confirm("确认变更["+selRecords[0].name+"]，变更后该银行变为待审核？")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/subbank/status/change";
    	var data = {code:selRecords[0].code};
		doPostAjax(url, data, doSuccessDelBack);
	});
	

	// 表格初始化
	queryTableData();
});

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/subbank/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				name : $("#nameSearch").val(),
				bankCode : $("#bankCode").val(),
				status : 1,
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
		pagination : true,//是否分页
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
		}, {
			field : 'code',
			title : '银行编号',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		}, {
			field : 'name',
			title : '支行名称',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'bankCode',
			title : '所属行别',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'bankName',
			title : '所属银行',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'region',
			title : '所在地区',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'cnapsCode',
			title : 'CNAPS CODE',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'khjlPerson',
			title : '客户经理',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'khjlContact',
			title : '联系方式',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'address',
			title : '支行地址',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			formatter: Dict.getNameForList("normal_status"),
			sortable : false,
		},{
			field : 'remark',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false
		}]
	});
}

function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("变更成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert("变更失败");
	}
}


// 删除事件回执方法
function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("变更成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert("变更失败");
	}
}