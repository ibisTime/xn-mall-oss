$(function() {
	var code = getQueryString("code");
	$("#code").val(code);
	var data = {"code":code};
	var url = $("#basePath").val()+"/plat/account/detail";
	doGetAjax(url, data, doGetDetailBack);
	
	//提交(保存)
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['code'] = $("#code").val();
		var url = $("#basePath").val()+"/plat/account/editjourdate";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/plat/account_search.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			jourDatetime: {
				required: true
			},
			remark: {
				required: true,
				maxlength:254
			}
		},
		messages: {
			jourDatetime: {
				required: "请选择最后一次流水时间",
				maxlength: jQuery.format("开户公司不能大于{0}个字符")
			},
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success == true) {
		doGetAjax($("#basePath").val()+"/plat/company/detail", {
			code: res.data.companyCode
		}, function(res) {
			$("#companyName").html(res.data.zwName);
		});
		doGetAjax($("#basePath").val()+"/subbank/detail", {
			code: res.data.subbranchCode
		}, function(res) {
			$("#subbranch").html(res.data.bankName + ' ' + res.data.name);
		});
		
		$("#kind").html(Dict.getName('kind',res.data.kind));
		$("#currency").html(Dict.getName('currency',res.data.currency));
		$("#cardNo").html(res.data.cardNo);
	}else{
		alert(res.msg);
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/plat/account_search.htm";
	}else{
		alert(res.msg);
	}
}