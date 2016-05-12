//账户状态
var orderStatus = null;
//渠道
var channel = null;
$(function() {
	//页面数据字典初始化
	initData();
	var qxNo = getQueryString("qxNo");
	var accountNumber = getQueryString("accountNumber");
	var data = {"qxNo":qxNo,"accountNumber":accountNumber,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/withdraw/page";
	doGetAjax(url, data, doGetDetailBack);
	
	//提交
	$('#passBtn').click(function() {
		doApprove("1");
	});
	
	//提交
	$('#noPassBtn').click(function() {
		doApprove("0");
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/account/withdraw.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			remark: {
				required: true,
				maxlength: 64
			}
		},
		messages: {
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data.list.length > 0){
			var result = res.data.list[0];
			$("#qxNo").html(result.qxNo);
			$("#mobile").html(result.mobile);
			$("#realName").html(result.realName);
			$("#accountNumber").html(result.accountNumber);
			$("#status").html(Dict.getName('order_status', result.status));
			$("#amount").html(moneyFormat(result.amount,2));
			$("#createDatetime").html(dateFormat(result.createDatetime,'yyyy-MM-dd HH:mm:ss'));
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

function doApprove(approveResult){
	if(!$("#jsForm").valid()){
		return false;
	}
	var data = {"qxNo":$("#qxNo").html(),"approveResult":approveResult,"approveNote":$("#remark").val()};
	var url = $("#basePath").val()+"/withdraw/approve";
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
