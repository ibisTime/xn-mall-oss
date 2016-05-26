var userId="";
var dictIdKind=null;
var dictStatus=null;
var dictLevel=null;
$(function() {
	//页面数据字典初始化
	initData();
	//$('#loginStatusSearch').renderDropdown(Dict.getName('login_status'));
	// 表格初始化
	var code = getQueryString("code");
	var companyCode = getQueryString("companyCode");
	var realName = getQueryString("realName");
	var sqghPicture = getQueryString("sqghPicture");
	var type = getQueryString("type");
	
	$('#userName').html(realName);
	
	if (type == 2) {
		$('#sqghPicture').parent().hide();
		doGetAjax($("#basePath").val() + '/individual/detail', {
			code: companyCode
		}, function(res) {
			$('#companyName').html(renderLink($('#basePath').val() + '/customer/individual_detail.htm?code=' + res.data.code, res.data.name));
		});
	} else {
		doGetAjax($("#basePath").val() + '/company/detail', {
			code: companyCode
		}, function(res) {
			$('#companyName').html(renderLink($('#basePath').val() + '/customer/company_detail.htm?companyId=' + res.data.code, res.data.name));
		});
		
		$('#sqghPicture').html(renderLink(sqghPicture, sqghPicture.split('/')[sqghPicture.split('/').length - 1]));
	}
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/customer_applyer.htm";
	});
	
	$('#passBtn').click(function() {
		if ($("#jsForm").valid()) {
			doGetAjax($("#basePath").val() + '/company/apply/check', {
				id: code,
				kycResult: 1,
				kycNote: $('#kycNote').val()
			}, function(res) {
				doSuccessBack(res);
			});
		}
	});
	
	$('#noPassBtn').click(function() {
		if ($("#jsForm").valid()) {
			doGetAjax($("#basePath").val() + '/company/apply/check', {
				id: code,
				kycResult: 0,
				kycNote: $('#kycNote').val()
			}, function(res) {
				doSuccessBack(res);
			});
		}
	});
	
	$("#jsForm").validate({
		rules: {
			kycNote: {
				required: true,
				maxlength: 64
			}
		},
		messages: {
			kycNote: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function initData(){
	
}


function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/customer/customer_applyer.htm";
	}else{
		alert(res.msg);
	}
}