$(function() {
	
	//获取菜单URL入参
	var code = getQueryString("modelCode");
	//新增修改判断
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		var data = {"code":code};
		var url = $("#basePath").val()+"/model/price/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	
	//提交
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
	    	return;
	    }
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['modelCode'] = $("#modelCode").html();
		var operator = $("#operate").val() != "edit"?"add":"edit";
		var url = $("#basePath").val()+"/model/price/" + operator;
		doPostAjax(url, data, doSucBack);
	});
	
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			originalPrice: {
				required: true,
				maxlength: 32,
				number:true
			},
			discountPrice: {
				required: true,
				maxlength: 32,
				number:true
			},
			toLevel: {
				required: true,
				maxlength: 32,
				number:true
			},
			remark: {
				required: true,
				maxlength: 100
			}
		},
		messages: {
			originalPrice: {
				required: "请输入原价",
				maxlength: jQuery.format("原价不能大于{0}个字符")
			},
			discountPrice: {
				required: "请输入折扣价",
				maxlength: jQuery.format("折扣价不能大于{0}个字符")
			},
			toLevel: {
				required: "请输入等级",
				maxlength: jQuery.format("等级不能大于{0}个字符")
			},
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
	
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/model_price.htm";
	});


	function doSuccessBack(res) {
		if (res.success == true) {
			alert("操作成功");
			window.location.href = $("#basePath").val()+"/product/model_price.htm";
		}else{
			alert(res.msg);
		}
	}
	
	
	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#modelCode").html(res.data.code);
//			$("#originalPrice").val(res.data.originalPrice);
//			$("#discountPrice").val(res.data.discountPrice);
//			$("#toLevel").val(res.data.toLevel);
//			$("#remark").val(res.data.remark);
		}else{
			alert(res.msg);
		}
	}
});
function doSucBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/product/model_price.htm";
	}else{
		alert(res.msg);
	}
}


