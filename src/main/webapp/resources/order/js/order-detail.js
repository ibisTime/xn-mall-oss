$(function() {
	
	//获取菜单URL入参
	invoiceCode = getQueryString("invoiceCode");
	//新增修改判断
	initBusinessTable();
	if(isBlank(invoiceCode)){
		$("#product").val("add");
	}else{
		$("#invoiceCode").attr("readonly","readonly");
		var data = {"invoiceCode":invoiceCode};
		var url = $("#basePath").val()+"/model/order/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	$('#printBtn').click(function() {
		$('.place').hide();
		$('#printBtn').hide();
		$('#backBtn').hide();
		print();
		$('.place').show();
		$('#printBtn').show();
		$('#backBtn').show();
	});
	
	//返回
	$('#backBtn').click(function() {
		goBack();
	});

	function doSuccessBack(res) {
		if (res.success == true) {
			alert("操作成功");
			window.location.href = $("#basePath").val()+"/order/order_query.htm";
		}else{
			alert(res.msg);
		}
	}
	
	function doSucBackGetJour(res){
		if (res.success) {
			//...
			
		}else{
			alert(res.msg);
		}
	}

	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#code").html(res.data.code);
			$("#applyDatetime").html(dateFormatter(res.data.applyDatetime));
			$("#applyNote").html(res.data.applyNote || '无');
			$("#loginName").html(res.data.applyUser);
			$('#type').html(Dict.getName('invoice_type', res.data.type));
			$("#approveDatetime").html(res.data.approveDatetime);
			$("#receiptTitle").html(res.data.receiptTitle|| '-');
			$("#receiptType").html(Dict.getName('receipt_type',res.data.receiptType||'无'));
			$("#status").html(Dict.getName('order_status',res.data.status));
			$("#totalAmount").html(moneyFormatter(res.data.totalAmount));
			$("#payCnyAmount").html(moneyFormatter(res.data.payCnyAmount));
			$("#totalCnyAmount").html(moneyFormatter(res.data.totalCnyAmount));
			$("#payAmount").html(moneyFormatter(res.data.payAmount));
			$("#mobile").html(res.data.mobile?res.data.mobile:"-");
			$("#mobile1").html(res.data.address?res.data.address.mobile:'-');
			$("#name").html(res.data.address?res.data.address.addressee:'-');
			$("#address").html(res.data.address?res.data.address.province+res.data.address.city+res.data.address.district+res.data.address.detailAddress:'-');
			$("#tableList").bootstrapTable("load", res.data.invoiceModelList);
		}else{
			alert(res.msg);
		}
	}
});



function initBusinessTable(){
	//绑定列表
	$('#tableList').bootstrapTable({
		striped : true,
		singleSelect : true,
		clickToSelect : true,
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
			field: 'costPrice',
			title: '成本价（积分）',
			formatter: moneyFormatter
		}, {
			field: 'salePrice',
			title: '零售价（积分+人民币）',
			formatter: function(v, r) {
				if (r.saleCnyPrice) {
					return moneyFormat(r.salePrice) + ' + ' + moneyFormat(r.saleCnyPrice);
				} else {
					return moneyFormat(r.salePrice);
				}
			}
		}, {
			field: '',
			title: '利润（积分+人民币）',
			formatter: function(v, r) {
				if (r.saleCnyPrice) {
					return moneyFormat(r.salePrice - (r.costPrice || 0)) + ' + ' + moneyFormat(r.saleCnyPrice);
				} else {
					return moneyFormat(r.salePrice - (r.costPrice  || 0));
				}
			}
		}]
	});
}
//格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
