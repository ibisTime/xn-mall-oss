$(function(){
	showPermissionControl();
	
	$('#status').renderDropdown(Dict.getName('ind_status'));
	//分页查询
	queryTableData();

	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/individual_detail.htm?code="+selRecords[0].code;
	});
	
	$('#activeBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status == 1){
			alert("请记录已是启用状态");
			return;
		}
		doGetAjax($("#basePath").val() + '/individual/active', {
			code: selRecords[0].code,
			status: 1
		}, function(res) {
			if (res.success) {
				alert('启用成功');
				$('#tableList').bootstrapTable('refresh');
			} else {
				alert(res.msg);
			}
		});
	});

	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/individual/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/individual/page",
		
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
				name:$("#name").val(),
			    status: $("#status").val(),
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
				field : 'name',
				title : '个体户名称',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'status',
				title : '状态',
				align : 'left',
				valign : 'middle',
				sortable : false,
				formatter : Dict.getNameForList('ind_status')
			},{
				field : 'level',
				title : '等级',
				align : 'left',
				valign : 'middle',
				sortable : false
			}]
		
	});
}

//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
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