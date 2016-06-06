$(function() {
	//获取菜单URL入参
	var code = getQueryString("code");
	//新增修改判断
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		var data = {"code":code};
		var url = $("#basePath").val()+"/product/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}

	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/product.htm";
	});
});


//获取详情回调方法
function doSucBackGetDetail(res){
	if (res.success) {
		$("#type").html(Dict.getName('product_type', res.data.type));
		$("#name").html(res.data.name);
		$("#advTitle").html(res.data.advTitle);
		$("#majorText").html(res.data.majorText);
		$("#familyText").html(res.data.familyText);
		$("#highlightText").html(res.data.highlightText);
		$("#remark").html(res.data.remark);
		$("#updater").html(res.data.updater);
		$("#img1").attr('src',res.data.advPic);
		$("#img2").attr('src',res.data.majorPic);
		$("#img3").attr('src',res.data.familyPic);
		$("#img4").attr('src',res.data.highlightPic);
	}else{
		alert(res.msg);
	}
}




