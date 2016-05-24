$(function() {
	//获取菜单URL入参
	var code = getQueryString("code");
	//新增修改判断
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		var data = {"code":code};
		var url = $("#basePath").val()+"/model/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}

	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/model.htm";
	});
});


//获取详情回调方法
function doSucBackGetDetail(res){
	if (res.success) {
		$("#code").val(res.data.code);
		$("#productCode").val(res.data.productCode);
		$("#name").val(res.data.name);
		$("#majorText").val(res.data.advTitle);
		$("#img1").attr('src',res.data.pic1);
		$("#img2").attr('src',res.data.pic2);
		$("#img3").attr('src',res.data.pic3);
		$("#description").val(res.data.description);
	}else{
		alert(res.msg);
	}
}




