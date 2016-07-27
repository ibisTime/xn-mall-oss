var dictLevel=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	//表格初始化
	queryTableData();
	$('#isApprove').renderDropdown(Dict.getName("isApprove"));
	
	$('#firsterweiBtn').click(function() {
		window.location.href = $("#basePath").val()+"/customer/firsterwei.htm";
	});
	
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/account/inciseScore/page"});
	});
	
	//详情
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/firsterwei_detail.htm?code="+selRecords[0].code;
	});
	
	$('#erweiBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/erweimaSale.htm?code="+selRecords[0].code;
	});
	
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		
		if(!confirm("确认删除二维码?")){
//			["+selRecords[0].name+"]
    		return false;
    	}
    	var url = $("#basePath").val()+"/account/score/drop";
    	var data = {code:selRecords[0].code};
		doPostAjax(url, data, doSuccessDelBack);
	});
	
	//表格初始化
	function queryTableData(){
		var columns = [{
				field : '',
				title : '',
				align : 'left',
				valign : 'middle',
				checkbox : true
			},{
				field : 'quantity',
				title : '积分数量',
				align : 'left',
				valign : 'middle',
				formatter:moneyFormat,
				sortable : false
			},{
				field : 'price',
				title : '价格',
				align : 'left',
				valign : 'middle',
				formatter:moneyFormat,
				sortable : false
		    },{
				field : 'isApprove',
				title : '是否审批',
				align : 'left',
				valign : 'middle',
				formatter:Dict.getNameForList('isApprove'),
				sortable : false
		    },{
				field : 'updateDatetime',
				title : '更新时间',
				align : 'left',
				valign : 'middle',
				formatter:dateFormatter,
				sortable : false
			},{
				field : 'remark',
				title : '备注',
				align : 'left',
				valign : 'middle',
				sortable : false
		    }];
		
		$('#tableList').bootstrapTable({
			method : "get",
			url : $("#basePath").val()+"/account/inciseScore/page",
			striped : true,
			clickToSelect : true,
			singleSelect : true,
			queryParams : function(params) {
				return {
					isApprove : $("#isApprove").val(),
//					realName : $("#realName").val(),
					quantity : $("#quantity").val(),
					status : $("#status").val(),
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

//表格时间格式转化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("删除成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert("删除失败");
	}
}
