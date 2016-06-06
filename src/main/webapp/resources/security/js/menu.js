$(function() {
	//按钮权限判断
	showPermissionControl();
	
	// 父菜单下拉框初始化
	var data = {"type":"1"};
	var url = $("#basePath").val() + "/menu/list";
	doGetAjax(url, data, doSuccessPCodeBack);
	
	// 表格初始化
	queryTableData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/menu/page"});
	});
	
	// 增加菜单绑定事件
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/security/menu_detail.htm";
	});
	
	// 修改菜单绑定事件
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/security/menu_detail.htm?code="+selRecords[0].code;
	});
	
	// 删除菜单绑定事件
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		
		if(!confirm("确认删除菜单["+selRecords[0].name+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/menu/drop";
    	var data = {code:selRecords[0].code};
		doPostAjax(url, data, doSuccessDelBack);
	});
});

//父菜单下拉框回置方法
function doSuccessPCodeBack(res){
	if (res.success == true) {
		var data = res.data;
		var html = "<option value=''>请选择</option>";
		if(typeof(data) != "undefined"){//判断undifined
			for(var i = 0;i < data.length;i++){
				html += "<option value='"+data[i].code+"'>"+data[i].code + "   " + data[i].name+"</option>";
			}
		}
		$("#parentCode").html(html);
	}else{
		alert(res.msg);
	}
}

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/menu/page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				name : $("#name").val(),
				parentCode : $("#parentCode").val(),
				type : $("#type").val(),
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
		}, {
			field : 'code',
			title : '菜单编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'name',
			title : '菜单名称',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'url',
			title : '菜单url',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'parentCode',
			title : '父菜单编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'type',
			title : '类型',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : typeFormatter
		}, {
			field : 'orderNo',
			title : '菜单顺序',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'updater',
			title : '更新者',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'updateDatetime',
			title : '更新时间',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter: dateTimeFormat
		}, {
			field : 'remark',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false
		}]
	});
}

//类型数据格式化
function typeFormatter(value, row) {
	var typeData =[{"key":"1","value":"菜单"},{"key":"2","value":"按钮"}];
	for(var i = 0;i < typeData.length;i++){
		if(typeData[i].key == value){
			return typeData[i].value;
		}
	}
}

// 删除事件回执方法
function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("删除成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert("删除失败");
	}
}