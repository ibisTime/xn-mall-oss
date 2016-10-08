$(function() {
	// 表格初始化
	var code=getQueryString("code");
	var type=getQueryString("type");
	if (!code) {
		var userId = getUserId();
		ajaxGet($("#basePath").val()+"/vendor/list", {
			userId: userId
		}, false, true).then(function(res) {
			code = res.data[0].code;
		});
	}
	var data={"code":code};
	var url = $("#basePath").val()+"/vendor/detail";
	doGetAjax(url,data,doSuccessData);
	
	//返回
	$('#backBtn').click(function() {
		goBack();
	});
	
	$('#updownBtn').click(function() {
		ajaxPost($("#basePath").val()+"/vendor/updown", {
			code: code
		}).then(function(res) {
			if (res.success) {
				alert('操作成功！');
				goBack();
			}
		});
	});
	
	if (type == 1) {
		$('#updownBtn').show();
	}
});

function doSuccessData(res){
	if (res.success) {
		var result = res.data;
		$("#code").html(result.code);
		$("#loginName").html(result.loginName);
		$('#pdf').html(linkSrc(result.pdf));
		$("#type").html(Dict.getName('vendor_type', result.type));
		$("#status").html(Dict.getName('vendor_updown', result.status));
		$('#updownBtn').val(result.status == 1 ? '下线' : '上线');
		$("#name").html(result.name);
		$('#advert').html(result.advert);
		$('#pic1').attr('src', result.pic1);
		$('#address').html(result.province + ' ' + (result.city == 0 ? '' : result.city) + ' ' + (result.area == 0 ? '' : result.area) + ' ' + result.address);
		$('#bookMobile').html(result.bookMobile);
		$('#smsMobile').html(result.smsMobile);
		$('#description').html(result.description);
		$("#remark").html(result.remark);
		$("#updateDatetime").html(dateTimeFormat(result.updateDatetime));
	}else{
		alert(res.msg);
	}
}