$(function() {
	
	var code = getQueryString("code");
	var isUp = false;
	isUp && $('#upDownBtn').val('下架');
	$('#upDownBtn').click(function() {
		if (!isUp) {
			$("#jsForm").validate({
				rules: {
					originalPrice:  {
						required: true,
						maxlength: 13
					},
					discountPrice:  {
						required: true,
						maxlength: 13
					},
					toSite: {
						required: true
					},
					remark: {
						required: true,
						maxlength: 250
					}
				}
			});
		}
		if(!$("#jsForm").valid()){
			return false;
		}
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/model_publish.htm";
	});

	function doSuccessBack(res) {
		if (res.success == true) {
			alert("操作成功");
			window.location.href = $("#basePath").val()+"/product/model_publish.htm";
		}else{
			alert(res.msg);
		}
	}
	
	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#code").html(res.data.code);
			$("#productName").html(res.data.productName);
			$("#costPrice").html(moneyFormat(res.data.costPrice));
			$("#fromQuantity").html(res.data.fromQuantity);
		}else{
			alert(res.msg);
		}
	}
});



