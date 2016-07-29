$(function() {
	
	//获取菜单URL入参
	var code = getQueryString("code");
	//新增修改判断
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		var data = {"code":code};
		var url = $("#basePath").val()+"/logistics/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/logistics/logistics-search.htm";
	});


	function doSuccessBack(res) {
		if (res.success == true) {
			alert("操作成功");
			window.location.href = $("#basePath").val()+"/logistics/logistics_search.htm";
		}else{
			alert(res.msg);
		}
	}
	
	$('#tableList').bootstrapTable({
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		columns : [{
			field : 'modelName',
			title : '货品名称'
		},
		{
			field : 'productName',
			title : '品类'
		}, {
			field: 'quantity',
			title: '数量'
		}, {
			field: 'salePrice',
			title: '零售价',
			formatter: moneyFormatter
		}]
	});
	
	
	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#invoiceCode").html(res.data.invoiceCode);
			$("#company").html(Dict.getName('kd_company',res.data.company));
			$("#deliveryDatetime").html(dateFormat(res.data.deliveryDatetime));
			$("#deliverer").html(res.data.deliverer);
			$("#code").html(res.data.code);
			$('#pdf').html(linkSrc(res.data.pdf));
			$("#tableList").bootstrapTable("load", res.data.invoice.invoiceModelList);
		}else{
			alert(res.msg);
		}
	}
});

//表格时间格式转化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
