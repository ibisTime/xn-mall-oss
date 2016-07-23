$(function() {
	
	
	//获取菜单URL入参
	var code = getQueryString("code");
		var data = {"code":code};
		var url = $("#basePath").val()+"/product/goods/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/tui_product.htm";
	});
});


//获取详情回调方法
function doSucBackGetDetail(res){
	if (res.success) {
		$("#goodsCode").html(res.data.goodsCode);
		$("#price").html(res.data.price);
		$("#quantity").html(res.data.quantity);
		$("#applyNote").html(res.data.applyNote);
	}else{
		alert(res.msg);
	}
}



