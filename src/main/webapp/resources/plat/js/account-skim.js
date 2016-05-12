$(function() {
	//数据初始化
	initData();
	
	// 表格初始化
	queryTableData();
});

function initData(){
	var url = $("#basePath").val() + "/plat/company/list";
	doGetAjaxIsAsync(url, null, false, doSuccessBackCompany);
	
	var url = $("#basePath").val() + "/subbank/list";
	doGetAjaxIsAsync(url, null, false, doSuccessBackBank);
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

function doSuccessBackBank(res){
	dictBank = res.data;
	var html = "<option value=''>请选择";
	if(typeof(dictBank) != "undefined"){//判断undifined
		for(var i = 0;i < dictBank.length;i++){
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

function companyFormatter(value, row) {
	for(var i = 0;i < dictCompany.length;i++){
		if(dictCompany[i].code == value){
			return dictCompany[i].zwName;
		}
	}
}

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/plat/account/detailpage",
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				companyCode: getQueryString('companyCode'),
				subbranchCode: getQueryString('subbranchCode'),
				kind: getQueryString('kind'),
				currency: getQueryString('currency'),
				cardNo: getQueryString('cardNo'),
				isAccept: getQueryString('isAccept'),
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
			title : '公司',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : companyFormatter
		}, {
			field : 'subbranchCode',
			title : '支行',
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
			field : 'isAccept',
			title : '受款',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter: Dict.getNameForList('true_false')
		}, {
			field : 'remark',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false
		}]
	});
}