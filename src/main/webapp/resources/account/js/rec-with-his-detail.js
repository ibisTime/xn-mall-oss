//订单状态
var orderStatus = null;
//方向
var pDirection = null;
//交易通道
var pChannel=null;
$(function() {
	//页面数据字典初始化
	initData();
	var cqNo = getQueryString("cqNo");
	var accountNumber = getQueryString("accountNumber");
	var data = {"cqNo":cqNo,"accountNumber":accountNumber,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/account/recWithHis/page";
	doGetAjax(url, data, doGetDetailBack);
	
	recWithStatus = getQueryString("recWithStatus");
	//返回
	$('#backBtn').click(function() {
		if(recWithStatus == "normal"){
			location.href = $("#basePath").val()+"/account/withdraw.htm";
		}else if(recWithStatus == "his"){
			location.href = $("#basePath").val()+"/account/rec_with_his.htm";
		}
	});
});

function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data.list != null){
			var result = res.data.list[0];
			$("#cqNo").html(result.cqNo);
			//$("#mobile").html(result.mobile);
			//$("#realName").html(result.realName);
			$("#accountNumber").html(result.accountNumber);
			$("#direction").html(directionFormatter(result.direction));
			
			$("#amount").html(moneyFormat(result.amount,2));
			$("#channel").html(channelFormatter(result.channel));
			$("#status").html(statusFormatter(result.status));
			
			$("#bankCode").html(result.bankCode);
			//$("#bankName").html(bankFormatter(result.bankCode));
			$("#subbranch").html(result.subbranch);
			$("#bankcardNo").html(result.bankcardNo);
			$("#createDatetime").html(dateFormat(result.createDatetime,'yyyy-MM-dd HH:mm:ss'));
			$("#approveUser").html(result.approveUser);
			$("#approveDatetime").html(dateFormat(result.approveDatetime,'yyyy-MM-dd HH:mm:ss'));
			
			$("#payUser").html(result.payUser);
			$("#payDatetime").html(dateFormat(result.payDatetime,'yyyy-MM-dd HH:mm:ss'));
			$("#payNo").html(result.payNo);
			$("#payFee").html(moneyFormatter(result.payFee));
			$("#remark").html(result.remark);
			
			$("#workDate").html(result.workDate);
			$("#checkUser").html(result.checkUser);
			$("#checkDatetime").html(dateFormat(result.checkDatetime,'yyyy-MM-dd HH:mm:ss'));
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}
//初始化数据字典
function initData(){
	//账户状态
	var data= {"key":"order_status"};
	doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackStatus);
	
	//方向
	var data= {"key":"account_direction"};
	doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackDirection);
	
	//支付通道
	var data= {"key":"channel"};
	doGetAjaxIsAsync($("#dictUrl").val(), null, false, doSucBackChannel);
	
	//初始化银行编号
	//var url =$("#basePath").val()+"/account/base/bank/list";
	//doGetAjaxIsAsync(url, null, false, doSucBackBank);
}
//数据字典（渠道）关联的回执方法
function doSucBackChannel(res){
	pChannel = res.data;
}
//数据字典（转入转出方向）关联的回执方法
function doSucBackDirection(res){
	pDirection = res.data;
}
//数据字典（方向）
function directionFormatter(value, row) {
	for(var i = 0;i < pDirection.length;i++){
		if(pDirection[i].value == value){
			return pDirection[i].remark;
		}
	}
}
//渠道转化
function channelFormatter(value, row) {
	for(var i = 0;i < pChannel.length;i++){
		if(pChannel[i].value == value){
			return pChannel[i].remark;
		}
	}
}
//数据字典（状态）关联的回执方法
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

//获取银行列表回执方法
function doSucBackBank(res) {
	dictBank = res.data;
}

//状态转化
function bankFormatter(value) {
	for(var i = 0;i < dictBank.length;i++){
		if(dictBank[i].bankNo == value){
			return dictBank[i].bankName;
		}
	}
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}