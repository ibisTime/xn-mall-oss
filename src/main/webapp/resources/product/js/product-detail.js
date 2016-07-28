$(function() {
	//获取菜单URL入参
	var code = getQueryString("code");
	//新增修改判断
	var data = {"code":code};
	var url = $("#basePath").val()+"/product/detail";
	doGetAjax(url, data, doSucBackGetDetail);

	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/product.htm";
	});
});


//获取详情回调方法
function doSucBackGetDetail(res){
	if (res.success) {
		$("#category").html(Dict.getName('pro_category', res.data.category));
		doGetAjaxIsAsync($("#dictUrl").val(), {
			parentKey: res.data.category
		}, false, function(res1) {
			var data = res1.data || [], value = '';
			for(var i = 0;i < data.length;i++){
				if (data[i].dkey == res.data.type) {
					value = data[i].dvalue;
					break;
				}
			}
			$("#type").html(value);
		});
		
		$("#name").html(res.data.name);
		$("#advTitle").html(res.data.advTitle);
		$("#remark").html(res.data.remark);
		$("#order").html(res.data.orderNo);
		$("#status").html(res.data.status == 1 ? '是' : '否');
		$("#updater").html(res.data.updater);
		$("#updateDatetime").html(dateFormat(res.data.updateDatetime));
		$("#img1").attr('src',res.data.advPic);
		$("#img2").attr('src',res.data.typePic);
	}else{
		alert(res.msg);
	}
}




