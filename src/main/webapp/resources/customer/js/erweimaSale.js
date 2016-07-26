var userId="";
var dictIdKind=null;
var dictStatus=null;
$(function() {
	// 表格初始化
	var code=getQueryString("code");
	var data={"integralCode":code};
	var url = $("#basePath").val()+"/account/erweiscore";
	doGetAjax(url,data,doSuccessData);
	 // 记录查询

});

function savePic() {
    var img = $("#qrcode").find('img')[0];
    var alink = document.createElement("a");
    alink.href = img.src;
    alink.download = "二维码注册.jpg";
    alink.click();
}

function doSuccessData(res){
	if (res.success) {
		var result = res.data;
		$("#userId").val($('#qianduanBaseUrl').val() + '/message/recharge_success.htm?i='+result.userId);
		
		
		var qrcode = new QRCode('qrcode');
			if ($('#userId').val()) {
				qrcode.makeCode($('#userId').val());
			} else {
				qrcode.clear();
				$('#qrcode').find('img').hide();
			}
			
		
		$('#downloadBtn').on('click', function() {
			savePic();
		});
	}else{
		alert(res.msg);
	}
}
