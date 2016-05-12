var dictIdKind=null;
var dictStatus=null;
var dictLevel=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
    //页面数据字典初始化
	initData();
	
	$('#status').renderDropdown(Dict.getName('company_kyc_status'));
	$('#status').val('1');
	
	//分页查询
	queryTableData();

	// 增加菜单绑定事件
	$('#yesBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		doGetAjax($("#basePath").val() + '/company/apply/check', {
			id: selRecords[0].id,
			kycResult: 1,
			kycNote: '通过'
		}, function() {
			$('#tableList').bootstrapTable('refresh');
		});
	});
	
	$('#noBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		doGetAjax($("#basePath").val() + '/company/apply/check', {
			id: selRecords[0].id,
			kycResult: 0,
			kycNote: '不通过'
		}, function() {
			$('#tableList').bootstrapTable('refresh');
		});
	});
	
	$('#checkBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != '1'){
			alert("该记录不需要审核");
			return;
		}
		location.href = $("#basePath").val()+'/customer/customer_applyer_check.htm?code=' + 
		selRecords[0].id+'&realName=' + encodeURIComponent(selRecords[0].realName) + '&companyCode=' + selRecords[0].companyCode + '&sqghPicture=' + selRecords[0].sqghPicture;
	});

	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/company/apply/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/company/apply/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
				realName:$("#realName").val(),
				companyName:$("#companyName").val(),
				status:$("#status").val(),
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
			field : 'realName',
			title : '真实姓名',
			align : 'left',
			valign : 'middle',
			sortable : false
			},{
			field : 'companyName',
			title : '企业名称'
			},{
			field : 'sqghPicture',
			title : '申请公函',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter: fileFormat
			},{
				field : 'status',
				title : '状态',
				align : 'left',
				valign : 'middle',
				sortable : false,
				formatter: Dict.getNameForList('company_kyc_status')
				}]
		
	});
}

function fileFormat(value) {
	if (!value) {
		return '-';
	}
	var fileName = value.split('/').pop();
	return '<a target="_blank" href="'+value+'">'+fileName+'</a>';
}



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