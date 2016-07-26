var userId="";
var dictIdKind=null;
var dictStatus=null;
$(function() {
	// 表格初始化
	
	var url = $("#basePath").val()+"/user";
	doGetAjax(url,null,doSuccessData);
	 // 记录查询

});

function savePic() {
    var img = $("#qrcode").find('img')[0];
    var alink = document.createElement("a");
    alink.href = img.src;
    alink.download = "首注册二维码.jpg";
    alink.click();
}

function doSuccessData(res){
	if (res.success) {
		var result = res.data;
		$("#userId").val($('#qianduanBaseUrl').val() + '/m/home/index.htm?u'+result.userId);
		
		
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
