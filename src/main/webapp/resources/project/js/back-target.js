var dictStatus=null;
var dicttype=null;
var dictLevel=null;
var dictServe=null;
var dictQuote=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	$('#serve').renderDropdown(Dict.getName('serve_type'));
	$('#quote').renderDropdown(Dict.getName('quote'));
	$('#level').renderDropdown(Dict.getName('customer_level'));
	$('#type').renderDropdown(Dict.getName('project_type'));
	
	doGetAjaxIsAsync($("#basePath").val() + '/general/operator/list', {}, false, function(res) {
		var data = res.data || [];
		$('#trader').renderDropdown(data, 'userId', 'realName');
	});
	
	//分页查询
	queryTableData();
	// 重新发起菜单绑定事件
	$('#relaunchBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status == "3"){
			window.location.href = $("#basePath").val()+"/project/target_add_edit.htm?projectCode="+selRecords[0].code+"&op=reset";
		}else{
			alert("该记录状态不是初审不通过状态");
			return;
		}
	});
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/project/target/page"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/project/target/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    code:$("#code").val(),
			    status:"3",
			    serve:$("#serve").val(),
			    quote:$("#quote").val(),
			    level:$("#level").val(),
			    type:$("#type").val(),
			    trader:$("#trader").val(),
			    applyUser:$("#applyUser").val(),
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
				field : 'code',
				title : '标的编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'name',
				title : '标的名称',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'traderName',
				title : '操盘手',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'type',
				title : '类型',
				align : 'left',
				valign : 'middle',
				formatter:Dict.getNameForList('project_type'),
				sortable : false
			},{
				field : 'status',
				title : '状态',
				align : 'left',
				valign : 'middle',
				formatter:Dict.getNameForList('project_status'),
				sortable : false
			},{
				field : 'serve',
				title : '服务类型',
				align : 'left',
				valign : 'middle',
				formatter:Dict.getNameForList('serve_type'),
				sortable : false
			},{
				field : 'totalAmount',
				title : '募集金额',
				align : 'left',
				valign : 'middle',
				formatter:moneyFormatter,
				sortable : false
			},{
				field : 'quote',
				title : '报价模式',
				align : 'left',
				valign : 'middle',
				formatter:Dict.getNameForList('quote'),
				sortable : false
			},{
				field : 'level',
				title : '受众等级',
				align : 'left',
				valign : 'middle',
				formatter:Dict.getNameForList('customer_level'),
				sortable : false
			},{
				field : 'applyUser',
				title : '发起人',
				align : 'left',
				valign : 'middle',
				sortable : false
		}]
		
	});
}


function initData(){
	doGetAjaxIsAsync($("#basePath").val()+"/user/list", {
		'kind': 3,
	}, false, doSucBackUser);
}

//数据字典（用户）关联的回执方法
function doSucBackUser(res){
	secUser = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(secUser) != "undefined"){//判断undifined
		for(var i = 0;i < secUser.length;i++){
			html += "<option value='"+secUser[i].userId+"'>"+secUser[i].userId+" "+secUser[i].realName+"</option>";
		}
	}
	$("#trader").html(html);
}
//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
