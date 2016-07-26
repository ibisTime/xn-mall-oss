$(function (){
	doGetAjaxIsAsync($("#basePath").val()+"/user/under/list", {}, false, function(res) {
		var data = res.data || [], html = "<option value=''>请选择</option>";
		for (var i = 0, len = data.length; i < len; i++) {
			html += "<option value='"+data[i].userId+"|"+data[i].level+"'>"+data[i].loginName+"</option>";
			$("#fromUserId").html(html);
		}
	});
	
	//提交
	$("#subBtn").click(function(){
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {"fromUserId":$("#fromUserId").val().split("|")[0],"price":$("#price").val(),"price":$("#price").val(),"amount":moneyParse($("#amount").val()),"type":"1"};
		var url = $("#basePath").val()+"/account/duixian";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$("#backBtn").click(function(){
		location.href = $("#basePath").val()+"/account/withdraw.htm"
	});
	
	
	//入参合法校验
	$("#jsForm").validate({
		rules:{
			accountNumber:{
				required: true,
				maxlength: 32
			},
			toType:{
				required: true,
				maxlength: 32
			},
			fromUserId:{
				required: true,
				maxlength: 32
			},
			toCode:{
				required: true,
				maxlength: 32
			},	
			price:{
				required: true,
				number:true,
				maxlength: 11
			},
			amount:{
				required: true,
				number:true,
				isPositive: true,
				maxlength: 11
			}
		},
		messages:{
			accountNumber:{
				required: "请输入账号",
				maxlength: jQuery.format("账号不能大于{0}个字符")
			},
			toType:{
				required: "请选择取现账户类型",
			},
			fromUserId:{
				required: "请选择来方用户",
			},
			toCode:{
				required: "请输入取现账户",
				maxlength: jQuery.format("取现账号不能大于{0}个字符")
			},
			price:{
				required: "请输入价格",
				maxlength: jQuery.format("价格不能大于{0}个字符")
			},
			amount:{
				required: "请输入取现积分",
				number:"取现积分请输入数字",
				maxlength: jQuery.format("取现积分不能大于{0}个字符")
			}
		}
	})
});

//线下充值申请成功的回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/withdraw.htm";
	}else{
		alert(res.msg);
	}
}




//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
