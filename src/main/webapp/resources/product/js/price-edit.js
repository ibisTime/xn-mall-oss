$(function() {
	var code = getQueryString('code');
	var data = {"code":code};
	var url = $("#basePath").val()+"/model/price/sure/detail";
	doGetAjax(url, data, function(res) {
		if (res.success) {
			$("#code").html(res.data.code);
			$("#modelName").html(res.data.modelName);
			$("#toLevel").html((res.data.toLevel + 1) + '级分销商');
			$("#price").val(moneyFormat(res.data.price));
			$("#quantity").val(res.data.quantity || '0');
			$("#remark").val(res.data.remark);
		}else{
			alert(res.msg);
		}
	});
	
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
		data['code'] = code;
		data['price'] = moneyParse(data['price']);
		var url = $("#basePath").val()+"/model/price/sure/edit";
		
		doPostAjax(url, data, doSucBackSave);
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			price: {
				required: true,
				number: true,
				maxlength: 13
			},
			quantity: {
				required: true,
				number: true,
				maxlength: 13
			},
			remark: {
				maxlength: 255
			}
		}
	});
	
	//返回
	$('#backBtn').click(function() {
		window.history.back();
	});
});

//保存回调方法
function doSucBackSave(res) {
	if (res.success == true) {
		alert("操作成功");
		window.history.back();
	}else{
		alert(res.msg);
	}
}