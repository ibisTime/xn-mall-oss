$(function() {
	var ajNo = getQueryString("ajNo");
	var data = {"ajNo":ajNo,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/account/queryAJourPage";
	doGetAjax(url, data, doGetDetailBack);
	
	//提交
	$('#passBtn').click(function() {
		doApprove("1");
	});
	
	//提交
	$('#noPassBtn').click(function() {
		doApprove("0");
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/account/check.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			remark: {
				required: true,
				maxlength: 64
			}
		},
		messages: {
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data.list.length > 0){
			var result = res.data.list[0];
			
			$("#ajNo").html(result.ajNo);
			$("#accountNumber").html(result.accountNumber);
			$("#status").html(Dict.getName('order_status',result.status));
			$("#bizType").html(Dict.getName('biz_type',result.direction));
			$("#refNo").html(result.refNo);
			$("#transAmount").html(moneyFormat(result.transAmount,2));
			
			$("#preAmount").html(moneyFormat(result.preAmount,2));
			$("#postAmount").html(moneyFormat(result.postAmount,2));
			$("#createDatetime").html(dateFormat(result.createDatetime));
			$("#workDate").html(result.workDate);
			$("#remark").val(result.remark);
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

//审批
function doApprove(approveResult){
	if(!$("#jsForm").valid()){
		return false;
	}
	var data = {"ajNo":$("#ajNo").html(),"amount":amount,"remark":$("#remark").val()};
	var url = $("#basePath").val()+"/account/checkApprove";
	doPostAjax(url, data, doSuccessBack);
}
	
//回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/tiao_zhang.htm";
	}else{
		alert(res.msg);
	}
}

