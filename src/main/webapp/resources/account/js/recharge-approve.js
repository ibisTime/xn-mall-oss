//订单状态
var orderStatus = null;
//渠道
var channel = null;
$(function() {
	//页面数据字典初始化
	initData();
	
	var cqNo = getQueryString("cqNo");
	var accountNumber = getQueryString("accountNumber");
	var data = {"cqNo":cqNo,"accountNumber":accountNumber,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/account/recWithHis/page";
	doGetAjax(url, data, doGetDetailBack);
	
	//区分线上线下
	rechargeType = getQueryString("rechargeType");
	
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
		redirectUrl();
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
			$("#cqNo").html(result.cqNo);
			//$("#mobile").html(result.mobile);
			//$("#realName").html(result.realName);
			$("#accountNumber").html(result.accountNumber);
			$("#status").html(statusFormatter(result.status));
			$("#channel").html(channelFormatter(result.channel));
			$("#amount").html(moneyFormat(result.amount,2));
			$("#bankCode").html(result.bankCode);
			$("#bankcardNo").html(result.bankcardNo);
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
	var data = {"chargeNo":$("#cqNo").html(),"approveResult":approveResult,"approveNote":$("#remark").val()};
	var url = $("#basePath").val()+"/account/recharge/approve";
	doPostAjax(url, data, doSuccessBack);
}
	
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		redirectUrl();
	}else{
		alert(res.msg);
	}
}
//初始化数据字典
function initData(){
	//启用状态
	var data= {"key":"order_status"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackStatus);
	//渠道
	var data= {"key":"channel"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackChannel);
}
//数据字典（对方系统）关联的回执方法
function doSucBackStatus(res){
	orderStatus = res.data;
}
//状态转化
function statusFormatter(value, row) {
	for(var i = 0;i < orderStatus.length;i++){
		if(orderStatus[i].value == value){
			return orderStatus[i].remark;
		}
	}
}
//数据字典（渠道）关联的回执方法
function doSucBackChannel(res){
	channel = res.data;
}
//渠道转化
function channelFormatter(value, row) {
	for(var i = 0;i < channel.length;i++){
		if(channel[i].value == value){
			return channel[i].remark;
		}
	}
}

//跳转链接
function redirectUrl(){
	if(rechargeType == "01"){
		location.href = $("#basePath").val()+"/account/recharge.htm";
	}else if(rechargeType == "13"){
		location.href = $("#basePath").val()+"/account/recharge_epay.htm"; 
	}
}