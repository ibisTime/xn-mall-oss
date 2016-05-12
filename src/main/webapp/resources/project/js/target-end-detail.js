var summary = UE.getEditor('summary');
var description = UE.getEditor('description');
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
	queryTableData();
	
	$('#passBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {"checkNote":$("#recheckNote").val(),"tradePwd":$("#tradePwd").val(),"projectCode":projectCode};
		var url = $("#basePath").val()+"/project/target/end";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/project/target_end.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			tradePwd: {
				required: true
			},
			recheckNote: {
				required: true,
				maxlength: 200
			}
		},
		messages: {
			tradePwd: {
				required: "请输入交易密码"
			},
			recheckNote: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/project/subscription/page",
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
				projectCode:projectCode,
				status : "1",
				start : params.offset / params.limit + 1,
				limit : params.limit
			};
		},
		queryParamsType : 'limit',
		responseHandler : function(res) {
			return {
				rows : res.data.list,
				total : res.data.totalCount
			};
		},
		pagination : true,
		sidePagination : 'server', // 服务端请求
		totalRows : 0,
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		columns : [{
				field : 'code',
				title : '订单号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'realName',
				title : '客户名称',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'investAmount',
				title : '认购金额',
				align : 'left',
				valign : 'middle',
				formatter:moneyFormatter,
				sortable : false
			},{
				field : 'investDatetime',
				title : '认购时间',
				align : 'left',
				valign : 'middle',
				formatter:dateFormatter,
				sortable : false
		}]
		
	});
}
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
		   $("#totalAmount").html(moneyFormat(result.totalAmount));
		   $("#period").html(result.period);
		   $("#type").html(Dict.getName('project_type', result.type));
		   $("#status").html(Dict.getName('project_status', result.status));
		   $("#amount").html(moneyFormat(result.amount));
		   $("#trader").html(traderFormatter(result.trader));
		   doGetAjaxIsAsync($("#basePath").val() + '/general/contractTemplate/list', {}, true, function(res) {
				var data = res.data || [];
				$('#contractTemplate').html(Dict.findName(data, result.contractTemplate, 'id', 'title'));
			});
		   $("#mjstartDatetime").html(dateFormat(result.mjstartDatetime,"yyyy-MM-dd HH:mm:ss"));
		   $("#mjendDatetime").html(dateFormatter(result.mjendDatetime,"yyyy-MM-dd HH:mm:ss"));
		   $("#minInvestAmount").html(moneyFormat(result.minInvestAmount));
		   $("#investAmountStep").html(moneyFormat(result.investAmountStep));
		   $("#maxInvestAmount").html(moneyFormat(result.maxInvestAmount));
		   $("#repayDatetime").html(dateFormatter(result.repayDatetime,"yyyy-MM-dd HH:mm:ss"));
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
function initData(){
	var data= {"key":"project_status"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackStatus);
    var data= {"key":"serve_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackServe);
    var data= {"key":"quote"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackQuote);
    var data= {"key":"customer_level"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackLevel);
    var data= {"key":"project_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBacktype);
	
	var url = $("#basePath").val()+"/general/operator/list";
	doGetAjaxIsAsync(url, data, false, doSucBackTrader);
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
function doSucBackServe(res){
	dictServe = res.data;
}
//转化
function serveFormatter(value, row) {
	for(var i = 0;i < dictServe.length;i++){
		if(dictServe[i].value == value){
			return dictServe[i].remark;
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
		window.location.href = $("#basePath").val()+"/project/target_end.htm";
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