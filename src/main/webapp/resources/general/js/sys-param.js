// 页面初始化
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	var data = {"pId":"-1","type":"2"};
	var url =$("#basePath").val()+"/general/dict/list";
	doGetAjaxIsAsync(url, data,false, doSuccessBackKeyList);
	
	//列表查询
	queryTableData();
	
	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/general/system/param/page"});
	});
	
	//新增
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/general/sys_param_add_edit.htm";
	});
	
	//编辑
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		location.href = $("#basePath").val()+"/general/sys_param_add_edit.htm?id="+selRecords[0].id;
	});
	
	//删除
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(!confirm("确认删除系统参数建["+selRecords[0].ckey+"]?")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/general/dict/drop";
    	var data = {id:selRecords[0].id};
		doPostAjax(url, data, doSuccessDelBack);
    
    });
});
//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/general/system/param/page",
		height : $(window).height() - 180,
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
				key : $("#keySearch").val(),
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
			checkbox : true
		},{
			field : 'ckey',
			title : '参数键',
			sortable : false
		},{
			field : 'cvalue',
			title : '参数值',
			sortable : false
		},{
			field : 'note',
			title : '参数说明',
			sortable : false
		},{
			field : 'remark',
			title : '备注',
			sortable : false
		}]
	});
}
//参数名下拉列表
function doSuccessBackKeyList(res){
	var data = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(data) != "undefined"){//判断undifined
		for(var i = 0;i < data.length;i++){
			html += "<option value='"+data[i].key+"'>"+data[i].key+" "+data[i].remark+"</option>";
		}
	}
	$("#keySearch").html(html);
}
//删除事件回执方法
function doSuccessDelBack(res) {
	if (res.success == true) {
		alert("删除成功");
		$('#tableList').bootstrapTable('refresh');
	}else{
		alert(res.msg);
	}
}


//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}