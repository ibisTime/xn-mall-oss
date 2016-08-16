
$(function() {
	$('#isApprove').renderDropdown(Dict.getName("score_sell_way"));
	var url = $("#basePath").val()+"/customer/own/account";
	doGetAjax(url, {
		currency: 'XNB'
	}, doGetDetailBack);
	
	$('#isApprove').on('change', function() {
		var value = $(this).val();
		if (value == 0) {
			$('#price').val('0');
			$('#priceCtn').hide();
		} else if (value == 1) {
			$('#price').val('');
			$('#priceCtn').show();
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
		data['price'] = moneyParse($("#price").val());
		data['quantity'] = moneyParse($("#quantity").val());
		var url = $("#basePath").val()+"/account/incise/score";
		doPostAjax(url, data, doSaveSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/score_rlue.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			quantity: {
				required: true,
				number:true,
				maxlength: 11
			},
			price: {
				required: true,
				number:true,
				maxlength: 11
			},
			isApprove: {
				required: true,
				maxlength: 32
			},
			remark: {
				maxlength: 200
			}
		},
		messages: {
			quantity: {
				required: "请输入积分数量",
				maxlength: jQuery.format("积分数量不能大于{0}个字符")
			},
			price: {
				required: "请输入人民币值",
				maxlength: jQuery.format("人民币值不能大于{0}个字符")
			},
			isApprove: {
				required: "请选择销售方式",
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符"),
			}
		}
	});
});

function doSaveSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/customer/score_rlue.htm";
	}else{
		alert(res.msg);
	}
}

function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data != null){
			var result = res.data;
			$("#amount").html(moneyFormat(result.amount,2));
		}else{
			alert(res.msg);
		}
	}
}