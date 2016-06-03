$(function() {
	var code = getQueryString("code");
	var data = {"code":code,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/repair/queryPage";
	doGetAjax(url, data, doGetDetailBack);
	
	//无需受理
	$('#noDealBtn').click(function() {
		 if(!$("#jsForm").valid()){
				return false;
			}
		doDeal("0");
	});
	
	//受理
	$('#dealBtn').click(function() {
		 if(!$("#jsForm").valid()){
				return false;
			}
		doDeal("1");
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/repair/repair_deal.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			remark: {
				required: true,
				maxlength: 225
			}
		},
		messages: {
			remark: {
				required: "请输入备注信息",
				maxlength: jQuery.format("备注信息不能大于{0}个字符")
			}
		}
	});
});
	
function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data.list.length > 0){
			var result = res.data.list[0];
			$("#repairCode").html(result.code);
			$("#productCode").html(result.goodsCode);
			$("#repairUser").html(result.applyUser);
			$("#phone").html(result.contact);
			$("#description").html(result.applyReason);
			
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

//审批
function doDeal(dealResult){
	if(!$("#jsForm").valid()){
		return false;
	}
	var data = {"checkResult":dealResult,"remark":$("#remark").val()};
	data['code']=$("#repairCode").html();
	var url = $("#basePath").val()+"/repair/repairDeal";
	doPostAjax(url, data, doSuccessBack);
}
	
//回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/repair/repair_deal.htm";
	}else{
		alert(res.msg);
	}
}