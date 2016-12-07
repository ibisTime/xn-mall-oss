var dictLevel=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	//表格初始化
	queryTableData();
	
	//详情绑定事件
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/customer_detail.htm?userId="+selRecords[0].userId;
	});
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/customer/zhongduanPage"});
	});
	
	$('#replaceAddBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/account/jifendetail_account.htm?userId="+selRecords[0].userId;
	});
	
	$('#realAccountBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/account/rmbdetail_account.htm?userId="+selRecords[0].userId;
	});
	
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/customer_edit.htm?userId="+selRecords[0].userId;
	});
	
	$('#scoreBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/score_op.htm?userId="+selRecords[0].userId;
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
				field : 'mobile',
				title : '手机号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'status',
				title : '状态',
				align : 'left',
				valign : 'middle',
				formatter: Dict.getUserStatusName,
				sortable : false
		    },{
				field : 'userReferee',
				title : '所属积分商',
				align : 'left',
				valign : 'middle',
				sortable : false
		    },{
				field : 'updateDatetime',
				title : '更新时间',
				align : 'left',
				valign : 'middle',
				formatter:dateFormatter,
				sortable : false
			}, {
				field: 'remark',
				title: '备注'
			}];
		
		$('#tableList').bootstrapTable({
			method : "get",
			url : $("#basePath").val()+"/customer/zhongduanPage",
			striped : true,
			clickToSelect : true,
			singleSelect : true,
			queryParams : function(params) {
				return {
					mobile : $("#mobile").val(),
//					realName : $("#realName").val(),
					userReferee : $("#userReferee").val(),
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

