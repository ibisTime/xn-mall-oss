var investCode = null;
var userId = null;
$(function(){
	investCode = getQueryString("investCode");
	userId = getQueryString("userId");
	initData();
	
	var investTableCode = getQueryString("investTableCode");
	if(isBlank(investTableCode)){
		$("#operate").val("add");
	}else{
		$("#operate").val("edit");
		$("#operContent").text("修改打款记录");
		var data = {"investTableCode":investTableCode};
		var url = $("#basePath").val()+"/project/investTable/get";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	//提交
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
		var data = {};
		data["investCode"] = investCode;
		data["investTableCode"] = investTableCode;
		data["amount"] = $('#amount').val();
		data["moneyDatetime"] = $('#moneyDatetime').val();
		data["fromCompany"] = fromRecord.companyCode || fromRecord.userId;
		data["toCompany"] = toRecord.companyCode;
		data["fromCompanyCard"] = fromRecord.id;
		data["toCompanyCard"] = toRecord.code;
		var url = $("#basePath").val()+"/project/investTable/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/project/subscription_confirm.htm?investCode="+getQueryString("investCode");
	});
	
	$('#fromUser').on('change', function() {
		var value = this.value;
		var record = Dict.findObj(fromBank, value, 'id');
		fromRecord = record;
		if (record) {
			$('#fromOwnerName').val(record.companyName || record.realName);
			$('#fromBankName').val(record.bankName);
			$('#fromSubbranch').val(record.subbranch);
			$('#fromBankcardNo').val(record.cardNo || record.bankcardNo);
		} else {
			$('#fromOwnerName').val('');
			$('#fromBankName').val('');
			$('#fromSubbranch').val('');
			$('#fromBankcardNo').val('');
		}
		
	});
	
	$('#toUser').on('change', function() {
		var value = this.value;
		var record = Dict.findObj(toBank, value, 'code');
		toRecord = record;
		if (record) {
			$('#toOwnerName').val(record.zwName);
			$('#toBankName').val(record.bankName);
			$('#toSubbranch').val(record.subbranchName);
			$('#toBankcardNo').val(record.cardNo);
			$('#currency').val(Dict.getName('currency', record.currency));
		} else {
			$('#toOwnerName').val('');
			$('#toBankName').val('');
			$('#toSubbranch').val('');
			$('#toBankcardNo').val('');
			$('#currency').val('');
		}
		
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			amount: {
				required: true,
				maxlength: 32,
				number : true
			},
			moneyDatetime: {
				required: true,
				maxlength: 32
			},
			fromUser: {
				required: true,
				maxlength: 32
			},
		
			toUser: {
				required: true,
				maxlength: 32
			}
			
		},
		messages: {
		    amount: {
				required: "请输入金额",
				maxlength: jQuery.format("金额不能大于{0}个字符"),
				number: "金额请输入数字"
			},
			
			moneyDatetime: {
				required: "请输入打款时间",
				maxlength: jQuery.format("打款时间不能大于{0}个字符")
			},
		   
		    fromUser: {
				required: "请选择打款方",
				maxlength: jQuery.format("打款方不能大于{0}个字符")
			},
		   
		    toUser: {
				required: "请选择收款方",
				maxlength: jQuery.format("收款方不能大于{0}个字符")
			}
		    
		}
	});
});

//数据字典
function initData(){
	
	var data= {"userId":userId};
	doGetAjaxIsAsync($("#basePath").val()+"/customer/card/all", data,false, doSucBackFromBankName);
	doGetAjaxIsAsync($("#basePath").val()+"/plat/account/detaillist", {isAccept: 1}, false, function(res) {
		toBank = res.data;
		var html = "<option value=''>请选择</option>";
		if(typeof(toBank) != "undefined"){//判断undifined
			for(var i = 0;i < toBank.length;i++){
				html += "<option value='"+toBank[i].code+"'>"+toBank[i].bankName+" "+toBank[i].cardNo+"</option>";
			}
		}
		$("#toUser").html(html);
	});
}

function doSucBackFromBankName(res){
	fromBank = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(fromBank) != "undefined"){//判断undifined
		for(var i = 0;i < fromBank.length;i++){
			html += "<option value='"+fromBank[i].id+"'>"+fromBank[i].bankName+" "+(fromBank[i].cardNo || fromBank[i].bankcardNo)+"</option>";
		}
	}
	$("#fromUser").html(html);
}

function doSucBackGetDetail(res){
	if (res.success == true) {
		if(res.data != 0){
			var data = res.data;
			$("#investTableCode").val(data.code);
            $("#amount").val(editMoneyFormat(data.amount));
			$("#moneyDatetime").val(dateFormatter(data.lxstartDatetime));
			$('#fromUser').val(data.fromCompanyCard);
			$('#toUser').val(data.toCompanyCard);
			$('#fromUser').change();
			$('#toUser').change();
//			$("#fromUser option").each(function (){
//				if($(this).text() == data.fromCompany+" "+data.fromCompanyCard){
//					$(this).attr('selected',true);
//				}
//			});
//			$("#toUser option").each(function (){
//				if($(this).text() == data.toCompany+" "+data.toCompanyCard){
//					$(this).attr('selected',true);
//				}
//			});
		}else{
			alert("根据编号获取详情失败");
		}
	}else{
		alert(res.msg);
	}
}


function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/project/subscription_confirm.htm?investCode="+getQueryString("investCode");
	}else{
		alert(res.msg);
	}
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}

//格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}