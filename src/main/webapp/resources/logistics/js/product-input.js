$(function() {
	
//	var code = getQueryString('code');
//	doGetAjaxIsAsync($("#basePath").val()+"/product/list", {}, false, function(res) {
//		var data = res.data || [], html = "<option value=''>请选择</option>";
//		for (var i = 0, len = data.length; i < len; i++) {
//			html += "<option value='"+data[i].code+"'>"+data[i].name+"</option>";
//			$("#productCode").html(html);
//		}
//	});

	
	// qrcode
	
	function savePic() {
	    var img = $("#qrcode").find('img')[0];
	    var alink = document.createElement("a");
	    alink.href = img.src;
	    alink.download = "物流单专属二维码.jpg";
	    alink.click();
	}
	
	var qrcode = new QRCode('qrcode');
	$('#code').on('blur', function() {
		if (this.value) {
			qrcode.makeCode(this.value);
			$('#downloadBtn').show();
		} else {
			qrcode.clear();
			$('#qrcode').find('img').hide();
			$('#downloadBtn').hide();
		}
	});
	
	$('#downloadBtn').on('click', function() {
		savePic();
	});
	
	var modelData;
	
	$("#company").renderDropdown(Dict.getName('kd_company'));
	
	//获取菜单URL入参
	var invoiceCode = getQueryString("invoiceCode");
	//新增修改判断
	if(isBlank(invoiceCode)){
		$("#product").val("add");
	}else{
		$("#invoiceCode").attr("readonly","readonly");
		var data = {"invoiceCode":invoiceCode};
		var url = $("#basePath").val()+"/model/order/detail";
		doGetAjax(url, data, function(res) {
			if (res.success) {
				$("#invoiceCode").html(res.data.code);
			}else{
				alert(res.msg);
			}
		});
	}
	
	//提交
	$('#subBtn').click(function() {
		
	    if(!$("#jsForm").valid()){
			return false;
		}
	   
	    var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['invoiceCode'] = $("#invoiceCode").html();
		data['deliveryDatetime'] = $("#deliveryDatetime").val();
		var operator = $("#operate").val() != "edit"?"add":"edit";
		
		
		var url = $("#basePath").val()+"/logistics/" + operator;
		
		doPostAjax(url, data, doSucBackSave);
	});
	
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			code: {
				required: true,
				maxlength: 32,
			},
			deliverer: {
				required: true,
				maxlength: 32
			},
			company: "required",
			deliveryDatetime: {
				required: true,
				maxlength: 255
			},
		},
		messages: {
			code: {
				required: "请输入物流单号",
				maxlength: jQuery.format("物流单号不能大于{0}个字符")
			},
			deliverer: {
				required: "请输入发货人",
				maxlength: jQuery.format("发货人不能大于{0}个字符")
			},
			company: "请选择产品",
			deliveryDatetime: {
				required: "请输入发货时间",
				maxlength: jQuery.format("发货时间不能大于{0}个字符")
			},
		}
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/order/order_query.htm";
	});
});


//保存回调方法
function doSucBackSave(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/order/order_query.htm";
	}else{
		alert(res.msg);
	}
}



