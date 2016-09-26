$(function() {
	var code;
	var userId = getUserId();
	ajaxGet($("#basePath").val()+"/vendor/list", {
		userId: userId
	}, false, true).then(function(res) {
		code = res.data[0].code;
	});
	function savePic() {
	    var img = $("#qrcode").find('img')[0];
	    var alink = document.createElement("a");
	    alink.href = img.src;
	    alink.download = "二维码.jpg";
	    alink.click();
	}
	$('#subBtn').on('click', function() {
		$('#subBtn').hide();
		$('.place').hide();
		window.print();
		$('#subBtn').show();
		$('.place').show();
	});
	$("#userId").val($('#qianduanBaseUrl').val() + '/m/consume/integral_consume.html?c='+code);
	var qrcode = new QRCode('qrcode');
	if ($('#userId').val()) {
		qrcode.makeCode($('#userId').val());
	} 

});




