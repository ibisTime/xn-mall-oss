var dhhlValue = null;
$(function (){
	$('#fromType').renderDropdown({
		data: Dict.getName('charge_type'),
		value: 'alipay'
	});
	
	$('#accountNumber').renderDropdown({
		url: $("#basePath").val() + '/customer/rel/list',
		keyName: 'userId',
		valueName: 'mobile'
	});
	
	//提交
	$("#subBtn").click(function(){
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {
				amount: moneyParse($('#amount').val()),
				fromType: $('#fromType').val(),
				fromCode: $('#fromCode').val()
			};
		ajaxGet($("#basePath").val() + '/account/id', {
			userId: $('#accountNumber').val(),
			currency: 'CNY'
		}, false, true).then(function(res) {
			data.accountNumber = res.data.accountNumber;
		});
		
		var url = $("#basePath").val()+"/account/recharge/rmb";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$("#backBtn").click(function(){
		goBack();
	});
	
	//入参合法校验
	$("#jsForm").validate({
		rules:{
			accountNumber:{
				required: true,
				maxlength: 32
			},
			fromType:{
				required: true,
				maxlength: 32
			},
			fromCode:{
				required: true,
				maxlength: 32
			},
			amount:{
				required: true,
				amount:true,
				isPositive: true
			}
		}
	})
});

//线下充值申请成功的回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		goBack();
	}else{
		alert(res.msg);
	}
}
