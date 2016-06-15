$(function() {
	
	//获取菜单URL入参
	var invoiceCode = getQueryString("invoiceCode");
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
	
	
	$('#cancelBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
	    var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data["code"] = $("#code").html();
		var url = $("#basePath").val()+"/model/order/cancel";
		
		doPostAjax(url, data, doSucBackSave);
	});

	$("#jsForm").validate({
		rules: {
			approveNote: {
				required: true,
				maxlength: 32
			}
		},
		messages: {
			approveNote: {
				required: "请输入取消说明",
				maxlength: jQuery.format("取消说明不能大于{0}个字符")
			}
		}
	});
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/order/order_undo.htm";
	});

	function doSuccessBack(res) {
		if (res.success == true) {
			alert("操作成功");
			window.location.href = $("#basePath").val()+"/order/order_undo.htm";
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
			$("#loginName").html(res.data.loginName);
			$("#approveDatetime").html(res.data.approveDatetime);
			$("#approveUser").html(res.data.approveUser);
			$("#receiptTitle").html(res.data.receiptTitle|| '-');
			$("#receiptType").html(Dict.getName('receipt_type',res.data.receiptType||'无'));
			$("#status").html(Dict.getName('order_status',res.data.status));
			$("#totalAmount").html(moneyFormatter(res.data.totalAmount));
			$("#payAmount").html(moneyFormatter(res.data.payAmount));
			$("#mobile").html(res.data.address?res.data.address.mobile:'-');
			$("#name").html(res.data.address?res.data.address.addressee:'-');
			$("#address").html(res.data.address?res.data.address.province+res.data.address.city+res.data.address.district+res.data.address.detailAddress:'-');
			$("#tableList").bootstrapTable("load", res.data.invoiceModelList);
		}else{
			alert(res.msg);
		}
	}
});

function doSucBackSave(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/order/order_undo.htm";
	}else{
		alert(res.msg);
	}
}

function initBusinessTable(){
	//绑定列表
	$('#tableList').bootstrapTable({
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		columns : [{
					field : 'productName',
					title : '产品',
					align : 'left',
					valign : 'middle',
					sortable : false,
				},{
					field : 'modelName',
					title : '型号',
					align : 'left',
					valign : 'middle',
					sortable : false,
				},{
					field : 'quantity',
					title : '产品数量',
					align : 'left',
					valign : 'middle',
					sortable : false
				},{
					field : 'salePrice',
					title : '单价',
					align : 'left',
					valign : 'middle',
					formatter:moneyFormatter,
					sortable : false
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
