//账户状态
var orderStatus = null;
$(function() {
	//页面数据字典初始化
	initData();
	var code = getQueryString("code");
	var accountNumber = getQueryString("accountNumber");
	var data = {"code":code,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/account/withdrawOrderPage";
	doGetAjax(url, data, doGetDetailBack);
	
	//提交
	$('#payBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		doPay("1");
	});
	
	//提交
	$('#noPayBtn').click(function() {
		doPay("0");
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/account/withdraw.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			payNote:{
				required:true, 
				maxlength:30
			},
			refNo: {
				required: true,
				maxlength: 32
			}
		},
		messages: {
			payNote: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			},
			refNo:{
				required:"请输入支付单号",
				maxlength: jQuery.format("支付单号不能大于{0}个字符")
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data.list.length > 0){
			var result = res.data.list[0];
			$("#withdrawNo").html(result.code);
			$('#fromAccountNumber').html(result.fromAccountNumber);
			$("#status").html(Dict.getName('withdraw_status', result.status));
			$("#amount").html(moneyFormat(result.amount,2));
			$("#price").html(moneyFormat(result.price,2));
			$("#applyUser").html(result.applyUser);
			$("#createDatetime").html(dateFormat(result.createDatetime,'yyyy-MM-dd HH:mm:ss'));
			$("#approveUser").html(result.approveUser);
			$("#approveDatetime").html(dateFormat(result.approveDatetime,'yyyy-MM-dd HH:mm:ss'));
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

function doPay(payResult){
	var data = {"withdrawNo":$("#withdrawNo").html(),"payResult":payResult,"refNo":$("#refNo").val(),"payNote":$("#payNote").val()};
	var url = $("#basePath").val()+"/account/payWithdrawOrder";
	doPostAjax(url, data, doSuccessBack);
}
	
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/withdraw.htm";
	}else{
		alert(res.msg);
	}
}
//初始化数据字典
function initData(){
}