var summary = UE.getEditor('summary', {
	readonly: true
});
var description = UE.getEditor('description', {
	readonly: true
});
var dictServe=null;
var dictQuote=null;
var dictLevel=null;
var dicttype=null;
var projectCode=null;
$(function(){
    //页面数据字典初始化
	initData();
	//获取项目详情
	projectCode=getQueryString("projectCode");
	var data = {"projectCode":projectCode};
	var url = $("#basePath").val()+"/project/target/detail";
	doGetAjax(url, data, doGetDetailBack);
	
	//通过
	$('#passBtn').click(function() {
		$('#period').rules('add', {required: true, messages: { required: "请输入募集期限(单位小时)"}});
		$('#repayDatetime').rules('add', {required: true, messages: { required: "请输入预计还款时间"}});
		doApprove("1");
	});
	
	//不通过
	$('#noPassBtn').click(function() {
		$('#period').rules('remove')
		$('#repayDatetime').rules('remove')
		doApprove("0");
	});
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/project/target_approve.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			period: {
				required: false,
				maxlength: 11,
				min:0
			},
			repayDatetime: {
				required: false,
			},
			tradePwd: {
				required: true,
			},
			checkNote: {
				required: true,
				maxlength: 64
			}
		},
		messages: {
			period: {
				maxlength: jQuery.format("募集期限(小时)不能大于{0}个字符"),
				min: jQuery.format("募集期限(小时)不能小于{0}")
			},
			repayDatetime: {
				required: "请输入预计还款时间",
			},
			tradePwd: {
				required: "请输入交易密码",
			},
			checkNote: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});
function doGetDetailBack(res){
	if (res.success) {
		if(res.data != null){
		   result=res.data;
		   $("#name").html(result.name);
		   $("#serve").html(Dict.getName('serve_type', result.serve));
		   $("#quote").html(Dict.getName('quote', result.quote));
		   $("#quoteValue1").html(RateFormatByLargeHundred(result.quoteValue1));
		   if(result.quote == "D"){
				$("#fc").show();
				$("#quoteValue2").html(RateFormatByLargeHundred(result.quoteValue2));
		   }else{
				$("#fc").hide();
		   }
		   $("#level").html(Dict.getName('customer_level', result.level));
		   $("#totalAmount").html(moneyFormatter(result.totalAmount));
		   $("#type").html(Dict.getName('project_type', result.type));
		   $("#status").html(Dict.getName('project_status', result.status));
		   $("#amount").html(moneyFormatter(result.amount));
		   doGetAjaxIsAsync($("#basePath").val() + '/general/operator/list', {}, false, function(res) {
				var data = res.data || [];
				$('#trader').html(Dict.findName(data, result.trader, 'userId', 'realName'));
			});
		   doGetAjaxIsAsync($("#basePath").val() + '/general/contractTemplate/list', {}, true, function(res) {
				var data = res.data || [];
				$('#contractTemplate').html(Dict.findName(data, result.contractTemplate, 'id', 'title'));
			});
		   $("#minInvestAmount").html(moneyFormatter(result.minInvestAmount));
		   $("#investAmountStep").html(moneyFormatter(result.investAmountStep));
		   $("#maxInvestAmount").html(moneyFormatter(result.maxInvestAmount));
		   $("#applyUser").html(result.applyUser);
		   $("#remark").html(result.remark);
		   summary.ready(function(){
			    //需要ready后执行，否则可能报错
				summary.setContent(result.summary);
			});
			description.ready(function(){
			    //需要ready后执行，否则可能报错
				description.setContent(result.description);
			});
		}else{
			alert("根据项目编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

function doApprove(approveResult){
	if(!$("#jsForm").valid()){
		return false;
	}
	var data = {"projectCode":projectCode,"period":$("#period").val(),"repayDatetime":$("#repayDatetime").val(),"checkResult":approveResult,"checkNote":$("#checkNote").val(),"tradePwd":$("#tradePwd").val()};
	var url = $("#basePath").val()+"/project/target/approve";
	doPostAjax(url, data, doSuccessBack);
}
function initData(){
}
//数据字典（）关联的回执方法
function doSucBackStatus(res){
	dictStatus = res.data;
}
//转化
function statusFormatter(value, row) {
	for(var i = 0;i < dictStatus.length;i++){
		if(dictStatus[i].value == value){
			return dictStatus[i].remark;
		}
	}
}

//数据字典（）关联的回执方法
function doSucBackQuote(res){
	dictQuote = res.data;
}
//转化
function quoteFormatter(value, row) {
	for(var i = 0;i < dictQuote.length;i++){
		if(dictQuote[i].value == value){
			return dictQuote[i].remark;
		}
	}
}
//数据字典（）关联的回执方法
function doSucBackLevel(res){
	dictLevel = res.data;
}
//转化
function levelFormatter(value, row) {
	for(var i = 0;i < dictLevel.length;i++){
		if(dictLevel[i].value == value){
			return dictLevel[i].remark;
		}
	}
}
//数据字典（）关联的回执方法
function doSucBacktype(res){
	dicttype = res.data;
}
//转化
function typeFormatter(value, row) {
	for(var i = 0;i < dicttype.length;i++){
		if(dicttype[i].value == value){
			return dicttype[i].remark;
		}
	}
}

function doSucBackTrader(res){
	dictTrader = res.data;
}

//转化  
function traderFormatter(value, row) {
	for(var i = 0;i < dictTrader.length;i++){
		if(dictTrader[i].userId == value){
			return dictTrader[i].realName;
		}
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/project/target_approve.htm";
	}else{
		alert(res.msg);
	}
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}