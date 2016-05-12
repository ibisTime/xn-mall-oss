var dictServe=null;
var dictQuote=null;
var dictLevel=null;
var dicttype=null;
var subjectCode=null;
var businessCode=null;
var businessTableIncome=null;
var businessTableCost=null;
var businessTableProfit=null;
$(function(){
    //页面数据字典初始化
	initData();
	initBusinessTable();
	//获取项目详情
	subjectCode=getQueryString("subjectCode");
	businessCode=getQueryString("businessCode");
	var data = {"subjectCode":subjectCode};
	var url = $("#basePath").val()+"/project/subject/detail";
	doGetAjax(url, data, doGetDetailBack);
	
	var data = {"businessCode":businessCode};
	var url = $("#basePath").val()+"/project/business/detail";
	doGetAjax(url, data, doGetDetail2Back);
	
	//流标
	$('#passBtn').click(function() {
		var data = {"checkNote":$("#checkNote").html(),"checkResult":1,"tradePwd":$("#tradePwd").val(),"projectCode":projectCode};
		var url = $("#basePath").val()+"/project/subject/end";
		doPostAjax(url, data, doSuccessBack);
	});
	//返回
	$('#backBtn').click(function() {
		var op =getQueryString("op");
		if(op == "detail"){
			location.href = $("#basePath").val()+"/project/business.htm";
		}else{
			location.href = $("#basePath").val()+"/project/business_search.htm";
		}
	});
});

function initBusinessTable(){
	//绑定列表
	$('#tableList').bootstrapTable({
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		columns : [{
					field : 'type',
					title : '类型',
					align : 'left',
					valign : 'middle',
					sortable : false,
					formatter : tableTypeFormatter
				},{
					field : 'key',
					title : '项目',
					align : 'left',
					valign : 'middle',
					sortable : false,
					formatter : tableProjectFormatter
				},{
					field : 'value',
					title : '金额',
					align : 'left',
					valign : 'middle',
					sortable : false
				},{
					field : 'remark',
					title : '备注',
					align : 'left',
					valign : 'middle',
					sortable : false
				}]
	});
}

function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data != null){
		   result=res.data;
		   $("#name").html(result.name);
		   $("#serve").html(Dict.getName('serve_type', (result.serve)));
		   $("#quote").html(Dict.getName('quote', (result.quote)));
		   $("#totalAmount").html(moneyFormatter(result.totalAmount));
		   $("#totalProfit").html(moneyFormatter(result.totalProfit));
		   $("#trader").html(traderFormatter(result.trader));
		   $("#startDatetime").html(dateFormatter(result.startDatetime));
		   $("#remark").html(result.remark);
		}else{
			alert("根据项目编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}
function doGetDetail2Back(res){
	if (res.success == true) {
		if(res.data != null){
			result=res.data.business;
		    $("#code").html(result.code);
		    $("#businessName").html(result.name);
		    $("#principal").html(moneyFormatter(result.principal));
		    $("#profit").html(moneyFormatter(result.profit));
		    $("#businessStartDatetime").html(dateFormatter(result.startDatetime));
		    $("#businessEndDatetime").html(dateFormatter(result.endDatetime));
		    $("#businessRemark").html(result.remark);
		    
		    var hsbUrl = result.hsbUrl;
		    if(!isBlank(hsbUrl)){
		    	$("#hsbUrl").text(hsbUrl.substring(hsbUrl.lastIndexOf('/')+1));
		    	$("#hsbUrl").attr('href',hsbUrl); 
		    }
		    
		    var hspzUrl = result.hspzUrl;
		    if(!isBlank(hspzUrl)){
		    	$("#hspzUrl").text(hspzUrl.substring(hspzUrl.lastIndexOf('/')+1));
		    	$("#hspzUrl").attr('href',hspzUrl); 
		    }
		    
		    var fjUrl = result.fjUrl;
		    if(!isBlank(fjUrl)){
		    	$("#fjUrl").text(fjUrl.substring(fjUrl.lastIndexOf('/')+1));
		    	$("#fjUrl").attr('href',fjUrl); 
		    }
		    
		    $("#tableList").bootstrapTable("load", res.data.businessTableList);
		}else{
			alert("根据编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}
function initData(){
    var data= {"parentKey":"serve_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackServe);
    var data= {"parentKey":"quote"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackQuote);
    var data= {"parentKey":"customer_level"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackLevel);
    var data= {"parentKey":"project_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBacktype);
	
	var url = $("#basePath").val()+"/general/operator/list";
	doGetAjaxIsAsync(url, data, false, doSucBackTrader);
	
	var data= {"parentKey":"business_table_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackBusinessTableType);
	
	var data= {"parentKey":"business_table_income"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackBusinessTableIncome);
	var data= {"parentKey":"business_table_cost"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackBusinessTableCost);
	var data= {"parentKey":"business_table_profit"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackBusinessTableProfit);
}

function doSucBackBusinessTableType(res){
	dictTableType = res.data;
}

//转化  
function tableTypeFormatter(value, row) {
	for(var i = 0;i < dictTableType.length;i++){
		if(dictTableType[i].dkey == value){
			return dictTableType[i].dvalue;
		}
	}
}

function doSucBackBusinessTableIncome(res){
	businessTableIncome = res.data;
}
function doSucBackBusinessTableCost(res){
	businessTableCost = res.data;
}
function doSucBackBusinessTableProfit(res){
	businessTableProfit = res.data;
}

//转化  
function tableProjectFormatter(value, row) {
	for(var i = 0;i < businessTableIncome.length;i++){
		if(businessTableIncome[i].dkey == value){
			return businessTableIncome[i].dvalue;
		}
	}
	for(var i = 0;i < businessTableCost.length;i++){
		if(businessTableCost[i].dkey == value){
			return businessTableCost[i].dvalue;
		}
	}
	for(var i = 0;i < businessTableProfit.length;i++){
		if(businessTableProfit[i].dkey == value){
			return businessTableProfit[i].dvalue;
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
//数据字典（）关联的回执方法
function doSucBackServe(res){
	dictServe = res.data;
}
//转化
function serveFormatter(value, row) {
	for(var i = 0;i < dictServe.length;i++){
		if(dictServe[i].dkey == value){
			return dictServe[i].dvalue;
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
		if(dictQuote[i].dkey == value){
			return dictQuote[i].dvalue;
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
		if(dictLevel[i].dkey == value){
			return dictLevel[i].dvalue;
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
		if(dicttype[i].dkey == value){
			return dicttype[i].dvalue;
		}
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/project/business.htm";
	}else{
		alert(res.msg);
	}
}
//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
