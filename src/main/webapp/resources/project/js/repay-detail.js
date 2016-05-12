$(function(){
	if(getQueryString("operate")=="look"){
		$(".approveDiv").hide();
		$(".detailDiv").show();
		
		$("#backBtn").removeClass('margin-left-20');
		$("#backBtn").addClass('margin-left-100');
	}else{
		$(".approveDiv").show();
		$(".detailDiv").hide();
	}
	//获取项目详情
	repayCode=getQueryString("repayCode");
	repayType=getQueryString("repayType");
	if(repayType == "1"){
		$("#passBtn").val("还款至账户");
	}else{
		$("#passBtn").val("直接还款");
	}
	var data = {"repayCode":repayCode};
	var url = $("#basePath").val()+"/project/repay/detail";
	doGetAjax(url, data, doGetDetailBack);
	//通过
	$('#passBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {"remark":$("#remark").val(),"tradePwd":$("#tradePwd").val(),"repayCode":repayCode};
		if(isBlank(repayType)){
			var url = $("#basePath").val()+"/project/repayed/jour";
		}else{
			var url = $("#basePath").val()+"/project/repaying/repay";
		}
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		if(getQueryString("op")=="search"){
			location.href = $("#basePath").val()+"/project/repay_search.htm";
		}else{
			location.href = $("#basePath").val()+"/project/repay.htm";
		}
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			remark: {
				required: true,
				maxlength: 64
			},
			tradePwd: {
				required: true,
				maxlength: 20
			}
		},
		messages: {
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			},
			tradePwd: {
				required: "请输入交易密码",
				maxlength: jQuery.format("交易密码不能大于{0}个字符")
			}
		}
	});
});
function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data != null){
		    result=res.data;
		    $("#code").html(result.code);
		    $("#towhoName").html(result.towhoName);
		    $("#status").html(Dict.getName('repay_status',result.status));
			$("#type").html(Dict.getName('repay_type',result.type));
		    $("#amount").html(moneyFormat(result.amount));
		    
		    $("#repayDatetime").html(dateTimeFormat(result.repayDatetime));
		    $("#realAmount").html(moneyFormat(result.realAmount));
		    $("#realRepayDatetime").html(dateTimeFormat(result.realRepayDatetime));
		    $("#businessCode").html(result.businessCode);
		    $("#businessProfit").html(moneyFormat(result.businessProfit));
		    
		    $("#subjectCode").html(result.subjectCode);
		    $("#repayRemark").html(result.remark);
		}else{
			alert("根据项目编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/project/repay.htm";
	}else{
		alert(res.msg);
	}
}