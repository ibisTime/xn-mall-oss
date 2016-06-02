$(function (){
	//页面数据字典初始化
	//initData();
	
	$('#fromType').renderDropdown(Dict.getName('charge_type'));
	//提交
	$("#subBtn").click(function(){
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {"accountNumber":$("#accountNumber").val(),"fromType":$("#fromType").val(),"fromCode":$("#fromCode").val(),"amount":moneyParse($("#amount").val())};
		var url = $("#basePath").val()+"/account/recharge";
		doPostAjax(url, data, doSuccessBack);
	});
	//返回
	$("#backBtn").click(function(){
		location.href = $("#basePath").val()+"/account/recharge.htm"
	});
	
	//入参合法校验
	$("#jsForm").validate({
		rules:{
			accountNumber:{
				required: true,
				maxlength: 32
			},
//			fromType:{
//				required: true,
//				maxlength: 20
//			},
			fromCode:{
				required: true,
				maxlength: 255
			},
			amount:{
				required: true,
				number:true,
				maxlength: 20
			}
		},
		messages:{
			accountNumber:{
				required: "请输入账户编号",
				maxlength: jQuery.format("账户编号不能大于{0}个字符")
			},
//			fromType:{
//				required: "请输入充值账号类型",
//				maxlength: jQuery.format("支付类型不能大于{0}个字符")
//			},
			fromCode:{
				required: "请输入充值账号",
				maxlength: jQuery.format("支付账号不能大于{0}个字符")
			},
			amount:{
				required: "请输入充值金额",
				number:"充值金额请输入数字",
				maxlength: jQuery.format("充值金额不能大于{0}个字符")
			}
		}
	})
});

//线下充值申请成功的回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/recharge.htm";
	}else{
		alert(res.msg);
	}
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}