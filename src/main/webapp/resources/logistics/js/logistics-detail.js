$(function() {
	
	//获取菜单URL入参
	var code = getQueryString("code");
	initBusinessTable();
	//新增修改判断
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		var data = {"code":code};
		var url = $("#basePath").val()+"/logistics/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	function initBusinessTable(){
		//绑定列表
		$('#tableList').bootstrapTable({
			striped : true,
			singleSelect : true,
			clickToSelect : true,
			columns : [{
						field : 'modelCode',
						title : '所属型号',
						align : 'left',
						valign : 'middle',
						sortable : false,
					},{
						field : 'codeStart',
						title : '起始编号',
						align : 'left',
						valign : 'middle',
						sortable : false,
					},{
						field : 'codeEnd',
						title : '终止编号',
						align : 'left',
						valign : 'middle',
						sortable : false,
					},{
						field : 'quantity',
						title : '数量',
						align : 'left',
						valign : 'middle',
						sortable : false,
					},{
						field : 'costPrice',
						title : '成本价',
						align : 'left',
						valign : 'middle',
						sortable : false,
					},{
						field : 'salePrice',
						title : '零售价',
						align : 'left',
						valign : 'middle',
						sortable : false,
					}]
		});
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
	
	
	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#invoiceCode").html(res.data.invoiceCode);
			$("#company").html(res.data.company);
			$("#deliveryDatetime").html(res.data.deliveryDatetime);
			$("#deliverer").html(res.data.deliverer);
			$("#code").html(res.data.code);
			$("#tableList").bootstrapTable("load", res.data.goodsList);
		}else{
			alert(res.msg);
		}
	}
});



