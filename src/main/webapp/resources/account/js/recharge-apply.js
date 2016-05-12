$(function (){
	//页面数据字典初始化
	//initData();
	//提交
	$("#subBtn").click(function(){
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {};
		var t = $("form").serializeArray();
		$.each(t,function(){
			data[this.name] = this.value;
		});
		var url = $("#basePath").val()+"/account/recharge/apply";	
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
			bankCode:{
				required: true,
				maxlength: 32
			},
			bankcardNo:{
				required: true,
				maxlength: 64
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
			bankCode:{
				required: "请输入银行行别",
				maxlength: jQuery.format("银行行别不能大于{0}个字符")
			},
			bankcardNo:{
				required: "请输入银行卡号",
				maxlength: jQuery.format("银行卡号不能大于{0}个字符")
			},
			amount:{
				required: "请输入充值金额",
				number:"充值金额请输入数字",
				maxlength: jQuery.format("充值金额不能大于{0}个字符")
			}
		}
	})
});

function initData(){
	//初始化银行编号
	var url =$("#basePath").val()+"/account/base/bank/list";
	doGetAjaxIsAsync(url, null, false, doSucBackBank);
}

//获取银行列表回执方法
function doSucBackBank(res) {
	var data = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(data) != "undefined"){//判断undifined
		for(var i = 0;i < data.length;i++){
			if(data[i].isEnable == "1"){
			html += "<option value='"+data[i].bankNo+"'>"+data[i].bankName+"</option>";
			}
		}
	}
	//银行列表
	$("#bankCode").html(html);
}

//线下充值申请成功的回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/recharge.htm";
	}else{
		alert(res.msg);
	}
}