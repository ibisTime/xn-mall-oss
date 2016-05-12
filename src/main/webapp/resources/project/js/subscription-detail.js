var dictServe=null;
var dictQuote=null;
var dictLevel=null;
var dicttype=null;
var subjectCode=null;
$(function(){
	//获取认购详情
	investCode=getQueryString("investCode");
	var op =getQueryString("op");
	if(op == "invest2"){
		$(".real").hide();
	} else if (op == 'invest1' || op == 'search') {
		$(".will").hide();
	}
	
	doGetAjaxIsAsync($("#basePath").val()+"/company/list", {}, false, function(res) {
		fromCompany = res.data;
		
		renderFromcompany = function(value) {
			for (var i = 0, len = fromCompany.length; i < len; i++) {
				if (fromCompany[i].code == value) {
					return fromCompany[i].name;
				}
			}
		}
	});
	doGetAjaxIsAsync($("#basePath").val()+"/plat/account/detaillist", {isAccept: 1}, false, function(res) {
		toCompany = res.data;
		renderTocompany = function(value) {
			for (var i = 0, len = toCompany.length; i < len; i++) {
				if (toCompany[i].companyCode == value) {
					return toCompany[i].ywName;
				}
			}
		}
	});
	
	$('#tableList').bootstrapTable({
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		columns : [{
				field : 'code',
				title : '编号',
				align : 'left',
				valign : 'middle'
			},{
				field : 'fromCompany',
				title : '付款企业',
				align : 'left',
				valign : 'middle',
				sortable : false,
				formatter: renderFromcompany,
			},{
				field : 'toCompany',
				title : '收款企业',
				align : 'left',
				valign : 'middle',
				sortable : false,
				formatter: renderTocompany,
			},{
				field : 'amount',
				title : '金额',
				align : 'left',
				valign : 'middle',
				formatter: moneyFormat,
				sortable : false
			},{
				field : 'createDatetime',
				title : '创建时间',
				align : 'left',
				valign : 'middle',
				formatter: dateTimeFormat,
				sortable : false
			}]
	});
	
	var data = {"investCode":investCode};
	var url = $("#basePath").val()+"/project/subscription/"+((op == "invest2") ? "will/" : "") +"get";
	doGetAjax(url, data, doGetDetailBack);
	
	//返回
	$('#backBtn').click(function() {
		var op =getQueryString("op");
		if(op == "invest2"){
			location.href = $("#basePath").val()+"/project/subscription_will.htm";
		} else if (op == 'invest1') {
			location.href = $("#basePath").val()+"/project/subscription.htm";
		} else if (op == 'search') {
			location.href = $("#basePath").val()+"/project/subscription_search.htm";
		}
	});
});

function doGetDetailBack(res){
	if (res.success) {
		if(res.data != null){
			investRes=res.data.invest || res.data;
		    $("#code").html(investRes.code);
		    $("#realName").html(investRes.realName);
		    $("#type").html(Dict.getName('invest_type',investRes.type || ''));
		    $("#investAmount").html(moneyFormat(investRes.investAmount));
		    $("#nowNote").html(investRes.nowNote);
		    $("#nowAmount").html(moneyFormat(investRes.nowAmount));

		    $("#investDatetime").html(dateTimeFormat(investRes.investDatetime));
		    $("#status").html(Dict.getName('invest_status',investRes.status));
		    $("#remark").html(investRes.remark);
		    if (res.data.investTableList) {
		    	$("#tableList").bootstrapTable("load", res.data.investTableList);
		    }
		}else{
			alert("根据项目编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}