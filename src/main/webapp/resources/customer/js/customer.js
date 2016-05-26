var dictIdKind=null;
var dictStatus=null;
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
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/customer/queryPage"});
	});
	
	//修改
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/customer_edit.htm?code="+selRecords[0].code;
	});
	
	var code = getQueryString('code');
	doGetAjaxIsAsync($("#basePath").val()+"/account/querylist", {}, false, function(res) {
		var data = res.data || [], html = "<option value=''>请选择</option>";
		for (var i = 0, len = data.length; i < len; i++) {
			html += "<option value='"+data[i].code+"'>"+data[i].name+"</option>";
			$("#productCode").html(html);
		}
	});
	
//	doGetAjaxIsAsync($("#basePath").val() + '/customer/sole/list', {}, false, function(res) {
//		soleData = res.data;
//	});
//
//	var formatSole = function(value) {
//		for (var i = 0, len = soleData.length; i < len; i++) {
//			if (soleData[i].code == value) {
//				return soleData[i].name;
//			}
//		}
//		return '-';
//	} 
	
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/account/queryPage",
		
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
			field : 'userKind',
			title : '用户类别',
			align : 'left',
			valign : 'middle',
			sortable : false
			},{
			field : 'userReferee',
			title : '推荐人',
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
			field : 'realName',
			title : '真实姓名',
			align : 'left',
			valign : 'middle',
			formatter : Dict.getQuoteName,
			sortable : false
		    },{
			field : '状态',
			title : 'status',
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