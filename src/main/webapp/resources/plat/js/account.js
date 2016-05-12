$(function() {
	//按钮权限判断
	showPermissionControl();
	
	initData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/plat/account/page"});
	});
	
	// 增加绑定事件
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/plat/account_apply.htm";
	});
	
	// 修改绑定事件
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/plat/account_apply.htm?code="+selRecords[0].code;
	});
	
	//复核绑定事件
	$('#approveBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != 0){
			alert("该记录已审核,无需再次复核");
			return;
		}
		window.location.href = $("#basePath").val()+"/plat/account_approve.htm?code="+selRecords[0].code;
	});
	
	// 表格初始化
	queryTableData();
});

function initData(){
	var url = $("#basePath").val() + "/subbank/list";
	doGetAjaxIsAsync(url, {
		orderColumn: 'name',
		orderDir: 'asc',
		status: 1
	}, false, doSuccessBackBank);
	
	var url = $("#basePath").val() + "/plat/company/list";
	doGetAjaxIsAsync(url, null, false, doSuccessBackCompany);
	
	$('#status').renderDropdown(Dict.getName('normal_status'));
}

function doSuccessBackCompany(res){
	dictCompany = res.data;
	var html = "<option value=''>请选择";
	if(typeof(dictCompany) != "undefined"){//判断undifined
		for(var i = 0;i < dictCompany.length;i++){
			html += "<option value='"+dictCompany[i].code+"'>"+dictCompany[i].zwName +"</option>";
		}
	}
	$("#companyCode").html(html);
}

function companyFormatter(value, row) {
	for(var i = 0;i < dictCompany.length;i++){
		if(dictCompany[i].code == value){
			return dictCompany[i].zwName;
		}
	}
}

//银行数据字典
function doSuccessBackBank(res){
	dictBank = res.data;
	var html = "<option value=''>请选择";
	if(typeof(dictBank) != "undefined"){//判断undifined
		for(var i = 0;i < dictBank.length;i++){
			var item = dictBank[i];
			html += "<option value='"+dictBank[i].code+"'>"+dictBank[i].bankName +" "+ dictBank[i].name+"</option>";
		}
	}
	$("#subbranchCode").html(html);
}

function bankFormatter(value, row) {
	for(var i = 0;i < dictBank.length;i++){
		if(dictBank[i].code == value){
			return dictBank[i].bankName +" "+ dictBank[i].name;
		}
	}
}

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/plat/account/page",
		height : $(window).height() - 150,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				companyCode: $("#companyCode").val(),
				subbranchCode: $("#subbranchCode").val(),
				khPerson: $("#khPerson").val(),
				status: $('#status').val() || 'new',
				khDatetimeStart: $("#khDatetimeStart").val(),
				khDatetimeEnd: $("#khDatetimeEnd").val(),
				//status: "new",
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
			field : 'companyCode',
			title : '开户公司',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : companyFormatter
		}, {
			field : 'subbranchCode',
			title : '开户支行',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : bankFormatter
		}, {
			field : 'kind',
			title : '账户性质',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('kind')
		}, {
			field : 'currency',
			title : '币种',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('currency')
		}, {
			field : 'cardNo',
			title : '账号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'khPerson',
			title : '开户人',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'khDatetime',
			title : '开户时间',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : dateTimeFormat
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('normal_status')
		},{
			field : 'remark',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false
		}]
	});
}