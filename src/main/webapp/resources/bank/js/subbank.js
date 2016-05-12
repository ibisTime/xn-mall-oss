$(function() {
	//按钮权限判断
	showPermissionControl();
	$("#statusSearch").renderDropdown(Dict.getName("normal_status"));
	initData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/subbank/page"});
	});
	
	// 增加绑定事件
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/bank/subbank_addedit.htm";
	});
	
	// 修改绑定事件
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/bank/subbank_addedit.htm?code="+selRecords[0].code;
	});
	
	//复核绑定事件
	$('#approveBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status == "1" || selRecords[0].status == "2"){
			alert("该记录已审核,无需再次复核");
			return;
		}
		window.location.href = $("#basePath").val()+"/bank/subbank_approve.htm?code="+selRecords[0].code;
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
				bankCode : $("#bankSearch").val(),
				status : $("#statusSearch").val() || 'new',
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

function initData(){
	//标准状态
//	var data= {"key":"normal_status"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackNormalStatus);
}

////数据字典（账户状态）关联的回执方法
//function doSucBackNormalStatus(res){
//	normalStatus = res.data;
//	var html = "<option value=''>请选择";
//	if(typeof(normalStatus) != "undefined"){//判断undifined
//		for(var i = 0;i < normalStatus.length;i++){
//			if (normalStatus[i].value == 1) {
//				continue;
//			}
//			html += "<option value='"+normalStatus[i].value+"'>"+normalStatus[i].remark+"</option>";
//		}
//	}
//	// 账户状态
//	$("#statusSearch").html(html);
//}

////状态转化
//function statusFormatter(value, row) {
//	for(var i = 0;i < normalStatus.length;i++){
//		if(normalStatus[i].value == value){
//			return normalStatus[i].remark;
//		}
//	}
//}

// 删除事件回执方法
function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("删除成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert("删除失败");
	}
}