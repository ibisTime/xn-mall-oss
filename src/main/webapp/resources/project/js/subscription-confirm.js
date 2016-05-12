var summary = UE.getEditor('summary');
var description = UE.getEditor('description');
var dictServe=null;
var dictQuote=null;
var dictLevel=null;
var dicttype=null;
var userId=null;
var totalAmount=null;
$(function(){
	//页面数据字典初始化
	initData();
	//获取项目详情
	investCode=getQueryString("investCode");
	var op = getQueryString("op");
	if(op == "cancel"){
		$(".op").hide();
		$("#passBtn").hide();
		$("#noPassBtn").removeClass('margin-left-20');
		$("#noPassBtn").addClass('margin-left-100');
	}else{
		$("#noPassBtn").hide();
	}
	
	initTable();
	var data = {"investCode":investCode};
	var url = $("#basePath").val()+"/project/subscription/get";
	doGetAjax(url, data, doGetDetailBack);
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/project/subscription.htm";
	});
	
	$("#addBtn").click(function(){
		location.href = $("#basePath").val()+"/project/subscription_add.htm?investCode="+investCode+"&userId="+userId;
	});
	
	$("#editBtn").click(function(){
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		location.href = $("#basePath").val()+"/project/subscription_add.htm?investTableCode="+selRecords[0].code + "&investCode="+investCode+"&userId="+userId;
	});
	
	//删除
	$('#dropBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(!confirm("确认删除打款记录")){
    		return false;
    	}
    	var url = $("#basePath").val()+"/project/investTable/drop";
    	var data = {investTableCode:selRecords[0].code};
    	doPostAjax(url, data, doSucBackDrop);
	});
	
	//通过
	$('#passBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {"remark":$("#remark").val(),"tradePwd":$("#tradePwd").val(),"investCode":investCode,investAmount:(totalAmount / 1000).toFixed(0),"moneyDatetime":$("#moneyDatetime").val()};
		var url = $("#basePath").val()+"/project/subscription/confirm";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//取消认购
	$('#noPassBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {"investCode":investCode,"remark":$("#remark").val(),"tradePwd":$("#tradePwd").val()};
		var url = $("#basePath").val()+"/project/subscription/cancel";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			moneyDatetime: {
				required: true
			},
			tradePwd: {
				required: true
			},
			remark: {
				required: true,
				maxlength: 64
			}
		},
		messages: {
			moneyDatetime: {
				required: "请输入到款时间",
				maxlength: jQuery.format("到款时间不能大于{0}个字符")
			},
			tradePwd: {
				required: "请输入交易密码"
			},
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});
//表格初始化
function initTable(){
	//绑定列表
	$('#tableList').bootstrapTable({
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		columns : [{
				field : '',
				title : '',
				align : 'left',
				valign : 'middle',
				checkbox : true
			},{
				field : 'code',
				title : '编号',
				align : 'left',
				valign : 'middle',
				visible : false
			},{
				field : 'fromCompany',
				title : '付款企业',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'toCompany',
				title : '收款企业',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'amount',
				title : '金额',
				align : 'left',
				valign : 'middle',
				formatter: moneyFormatter,
				sortable : false
			},{
				field : 'lxstartDatetime',
				title : '到款时间',
				align : 'left',
				valign : 'middle',
				formatter: dateFormatter,
				sortable : false
			}]
	});
}
function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data != null){
			investRes=res.data.invest;
			$("#code").html(investRes.code);
			userId = investRes.userId;
		    $("#realName").html(investRes.realName);
		    $("#investAmount").html(moneyFormatter(investRes.investAmount));
		    $("#totalAmount").html(moneyFormatter(investRes.totalAmount));
		    $('#investDatetime').html(dateFormatter(investRes.investDatetime));
		    $("#tableList").bootstrapTable("load", res.data.investTableList);
		    var investTableList = res.data.investTableList;
		    for (var i = 0, len = investTableList.length; i < len; i++) {
		    	var item = investTableList[i];
		    	totalAmount += item.amount;
		    }
		    $('#investAmount2').html(moneyFormatter(totalAmount));
		}else{
			alert("根据项目编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}
function initData(){
}
//操作回调方法
function doSucBackDrop(res) {
	if (res.success == true) {
		alert("删除成功");
		location.reload();
	}else{
		alert(res.msg);
	}
}


function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/project/subscription.htm";
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