var summary = UE.getEditor('summary');
var description = UE.getEditor('description');
var dictServe=null;
var dictQuote=null;
var dictLevel=null;
var dictType=null;
var dictOperator=null;
$(function(){
	var projectCode = getQueryString("projectCode"), structData = [];
	$('#serve').renderDropdown(Dict.getName('serve_type'));
	doGetAjaxIsAsync($("#basePath").val() + '/general/operator/list', {}, false, function(res) {
		var data = res.data || [];
		$('#trader').renderDropdown(data, 'userId', 'realName');
	});
	doGetAjaxIsAsync($("#basePath").val() + '/general/contractTemplate/list', {status: 1}, false, function(res) {
		var data = res.data || [];
		$('#contractTemplate').renderDropdown(data, 'id', 'title');
	});
	doGetAjaxIsAsync($("#basePath").val() + '/general/structure/list', {
		status: 1
	}, false, function(res) {
		structData = res.data || [];
		$('#struct').renderDropdown(structData, 'code', 'name');
	});
	
	$('#struct').on('change', function() {
		var value = this.value, descriptionContent = '', summaryContent = '';
		for (var i = 0, len = structData.length; i < len; i++) {
			if (value == structData[i].code) {
				descriptionContent = structData[i].description;
				summaryContent = structData[i].summary;
			}
		}
		description.setContent(descriptionContent);
		summary.setContent(summaryContent);
	});
	
	$('#type').on('change', function() {
		if (this.value == 2) {
			$('#towhoCtn').show();
		} else {
			$('#towhoCtn').hide();
		}
	});
	
	$('#type').renderDropdown(Dict.getName('project_type'));
	$('#quote').renderDropdown(Dict.getName('quote'));
	$('#level').renderDropdown(Dict.getName('customer_level'));
	doGetAjaxIsAsync($("#basePath").val() + '/company/list', {
	}, false, function(res) {
		var data = res.data || [];
		$('#towho').renderDropdown(data, 'code', 'name');
	});
	//新增修改判断
	if(isBlank(projectCode)){
		$("#operate").val("add");
		$("#fc").hide();
	}else{
		$("#operate").val("readd");
		$("#operContent").text("重发标的");
		$("#fc").show();
	}
   
	//重发初始化
	if(!isBlank(projectCode)){
		var data = {"projectCode":projectCode};
		var url = $("#basePath").val()+"/project/target/detail";
		doGetAjax(url, data, doGetDetailBack);
	}
	
	//提交
	$('#subBtn').click(function() {
		if(!checkForm()){
			return;
		}
	    if(!$("#jsForm").valid()){
			return false;
		}
	    if (!summary.hasContents()) {
	    	alert('概述不能为空');
	    	return;
	    }
	    if (!description.hasContents()) {
	    	alert('描述不能为空');
	    	return;
	    }
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		
		var url = $("#basePath").val()+"/project/target/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		redirectUrl();
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			name: {
				required: true,
				maxlength: 64
			},
			serve: {
				required: true,
				maxlength: 2
			},
			quote: {
				required: true,
				maxlength: 2
			},
			quoteValue1: {
				required: true,
				maxlength: 100,
				max:100,
				min:0
			},
			quoteValue2: {
				maxlength: 100,
				max:100,
				min:0
			},
			level: {
				required: true,
				maxlength: 4
			},
			totalAmount: {
				required: true,
				maxlength: 20,
				min:0
			},
			type: {
				required: true,
				maxlength: 2
			},
			amount: {
				required: true,
				maxlength: 20,
				min:0
			},
			trader: {
				required: true,
				maxlength: 32
			},
			summary: {
				required: true,
			},
			description: {
				required: true,
			},
			minInvestAmount: {
				required: true,
				maxlength: 20,
				min:0
			},
			investAmountStep: {
				required: true,
				maxlength: 20,
				min:1
			},
			maxInvestAmount: {
				required: true,
				maxlength: 20,
				min:0
			},
			remark: {
				required: true,
				maxlength: 32
			},
			contractTemplate: {
				required: true,
				maxlength: 32
			}
		},
		messages: {
		    name: {
				required: "请输入名称",
				maxlength: jQuery.format("名称不能大于{0}个字符")
			},
		    serve: {
				required: "请输入服务类型",
				maxlength: jQuery.format("服务类型不能大于{0}个字符")
			},
		    quote: {
				required: "请输入报价模式",
				maxlength: jQuery.format("报价模式不能大于{0}个字符")
			},
		    quoteValue1: {
				required: "请输入年化值/保底值/分成值",
				maxlength: jQuery.format("年化值/保底值/分成值不能大于{0}个字符"),
				max:jQuery.format("年化值/保底值/分成值不能大于{0}"),
				min:jQuery.format("年化值/保底值/分成值不能小于{0}")
			},
			quoteValue2: {
				maxlength: jQuery.format("分成值不能大于{0}个字符"),
				max:jQuery.format("分成值不能大于{0}"),
				min:jQuery.format("分成值不能小于{0}")
			},
		    level: {
				required: "请输入受众等级",
				maxlength: jQuery.format("受众等级不能大于{0}个字符")
			},
		    totalAmount: {
				required: "请输入总金额",
				maxlength: jQuery.format("总金额不能大于{0}个字符"),
				min:jQuery.format("总金额不能小于{0}")
			},
		    type: {
				required: "请输入类型",
				maxlength: jQuery.format("类型不能大于{0}个字符")
			},
		    amount: {
				required: "请输入募集金额",
				maxlength: jQuery.format("募集金额不能大于{0}个字符"),
				min:jQuery.format("募集金额不能小于{0}")
			},
		    trader: {
				required: "请输入操盘手",
				maxlength: jQuery.format("操盘手不能大于{0}个字符")
			},
		    summary: {
				required: "请输入概述",
				maxlength: jQuery.format("概述不能大于{0}个字符")
			},
		    description: {
				required: "请输入描述",
			},
		    minInvestAmount: {
				required: "请输入最小投资金额",
				maxlength: jQuery.format("最小投资金额不能大于{0}个字符"),
				min:jQuery.format("最小投资金额不能小于{0}")
			},
		    investAmountStep: {
				required: "请输入递增投资金额",
				maxlength: jQuery.format(""),
				min:jQuery.format("")
			},
		    maxInvestAmount: {
				required: "请输入单笔最大投资金额",
				maxlength: jQuery.format("单笔最大投资金额不能大于{0}个字符"),
				min:jQuery.format("单笔最大投资金额不能小于{0}")
			},
		    remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			},
			contractTemplate: {
				required: "请选择合同模板",
				maxlength: jQuery.format("合同模板不能大于{0}个字符")
			}
		}
	});
});

//跳转Url
function redirectUrl(){
	if(isBlank(getQueryString("op"))){
		location.href = $("#basePath").val()+"/project/target_add_edit.htm";
	}else{
		location.href = $("#basePath").val()+"/project/back_target.htm";
	}
}

function checkForm(){
	if($("#quote").val() == "D"){
		if(isBlank($("#quoteValue2").val())){
			alert("分成值不能为空");
			return false;
		}
	}
	return true;
}

function onChangeQuote(quote){
	if(quote == "D"){
		$("#fc").show();
	}else{
		$("#fc").hide();
	}
}

function doGetDetailBack(res){
	if (res.success == true) {
		result=res.data;
		$("#projectCode").val(result.code);
		$("#name").val(result.name);
		$("#serve").val(result.serve);
		$("#quote").val(result.quote);
		$("#quoteValue1").val(RateFormatByLargeHundred(result.quoteValue1));
		if(result.quote == "D"){
			$("#fc").show();
			$("#quoteValue2").val(RateFormatByLargeHundred(result.quoteValue2));
	    }else{
			$("#fc").hide();
	    }
		$("#level").val(result.level);
		$("#contractTemplate").val(result.contractTemplate);
		$("#totalAmount").val(editMoneyFormat(result.totalAmount));
		$("#type").val(result.type);
		if (result.type == 2) {
			$("#towhoCtn").show();
			$('#towho').val(result.towho);
		} else {
			$("#towhoCtn").hide();
		}
		$("#amount").val(editMoneyFormat(result.amount));
		$("#trader").val(result.trader);
		summary.ready(function(){
		    //需要ready后执行，否则可能报错
			summary.setContent(result.summary);
		});
		description.ready(function(){
		    //需要ready后执行，否则可能报错
			description.setContent(result.description);
		});
		$("#minInvestAmount").val(editMoneyFormat(result.minInvestAmount));
		$("#investAmountStep").val(editMoneyFormat(result.investAmountStep));
		$("#maxInvestAmount").val(editMoneyFormat(result.maxInvestAmount));
		$("#applyUser").val(result.applyUser);
		$("#remark").val(result.remark);
		
		$(".preNote").show();
		$("#preCheckNote").html(result.checkNote);
	}else{
		alert(res.msg);
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		redirectUrl();
	}else{
		alert(res.msg);
	}
}