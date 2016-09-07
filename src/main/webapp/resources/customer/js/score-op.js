
$(function() {
	var userId = getQueryString('userId');
	$('#type').renderDropdown({
		data: Dict.getName('score_direction'),
		value: 1
	});
	doGetAjax($("#basePath").val()+"/customer/detail", {
		userId: userId
	}, function(res) {
		$("#mobile").html(res.data.mobile);
	});
	//提交
	$('#subBtn').click(function() {
		if ($("#jsForm").valid()) {
			var data = {};
			data.direction = 0;
			data.amount = moneyParse($('#amount').val());
			data.remark = $('#remark').val();
			if ($('#type').val() == 2) {
				data.fromAccountNumber = getAccountId(getUserId(), 'XNB');
				data.accountNumber = getAccountId(userId, 'XNB');
			} else {
				data.accountNumber = getAccountId(getUserId(), 'XNB');
				data.fromAccountNumber = getAccountId(userId, 'XNB');
			}
			var url = $("#basePath").val()+"/account/exchange";
			doPostAjax(url, data, doSuccessBack);
		}
		
	});
	
	//返回
	$('#backBtn').click(function() {
		goBack();
	});
	
	$("#jsForm").validate({
		rules: {
			type: {
				required: true
			},
			amount: {
				required: true,
				'Z+': true,
				maxlength: 10
			},
			remark: {
				required: true,
				maxlength: 30
			}
		}
	});
	
});



function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		goBack();
	}else{
		alert(res.msg);
	}
}
