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
						field : 'modelName',
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
						formatter:moneyFormatter,
						sortable : false,
					},{
						field : 'salePrice',
						title : '零售价',
						align : 'left',
						valign : 'middle',
						formatter:moneyFormatter,
						sortable : false,
					}]
		});
	}
	
	
	$('#subBtn').click(function() {
		
	    if(!$("#jsForm").valid()){
			return false;
		}
	    var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['code'] = $("#code").html();
		data['remark'] = $("#remark").val();
		var operator = $("#operate").val() != "edit"?"add":"edit";
		var url = $("#basePath").val()+"/logistics/goods/sure";
		
		doPostAjax(url, data, doSuccessBack);
	});
	$("#jsForm").validate({
		rules: {
			remark: {
				required: true,
				maxlength: 32
			}
		},
		messages: {
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/logistics/goods-sure.htm";
	});


	function doSuccessBack(res) {
		if (res.success == true) {
			alert("操作成功");
			window.location.href = $("#basePath").val()+"/logistics/goods-sure.htm";
		}else{
			alert(res.msg);
		}
	}
	
	
	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#invoiceCode").html(res.data.invoiceCode);
			$("#company").html(Dict.getName('kd_company',res.data.company));
			$("#deliveryDatetime").html(dateFormat(res.data.deliveryDatetime));
			$("#deliverer").html(res.data.deliverer);
			$("#code").html(res.data.code);
			$("#tableList").bootstrapTable("load", res.data.goodsList);
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
