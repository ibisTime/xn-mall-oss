$(function() {
	$('#type').renderDropdown({
		data: Dict.getName('score_direction'),
		value: 1
	});
	$("#mobile").renderDropdown({
		url: $("#basePath").val()+"/customer/queryPage?start=1&limit=1000000",
		keyName: 'userId',
		valueName: 'mobile'
	});
	//提交
	$('#subBtn').click(function() {
		if ($("#jsForm").valid()) {
			var r=confirm("确定执行该操作吗？");
			if (r) {
				var data = {};
				
				data.amount = moneyParse($('#amount').val());
				data.remark = '积分送给' + $("#mobile").find("option:selected").text();
				data.fromAccountNumber = getAccountId(getUserId(), 'XNB');
				data.accountNumber = getAccountId($("#mobile").val(), 'XNB');
				if ($('#type').val() == 2) {
					data.direction = 0;
				} else {
					data.direction = 1;
				}
				var url = $("#basePath").val()+"/account/exchange";
				doPostAjax(url, data, doSuccessBack);
			}
			
		}
		
	});
	
	$("#jsForm").validate({
		rules: {
			type: {
				required: true
			}, 
			mobile: {
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
	if (res.success) {
		alert("操作成功");
		$("#mobile").val('');
		$("#amount").val('');
	}else{
		alert(res.msg);
	}
}
