$(function() {
	
//	var code = getQueryString('code');
//	doGetAjaxIsAsync($("#basePath").val()+"/product/list", {}, false, function(res) {
//		var data = res.data || [], html = "<option value=''>请选择</option>";
//		for (var i = 0, len = data.length; i < len; i++) {
//			html += "<option value='"+data[i].code+"'>"+data[i].name+"</option>";
//			$("#productCode").html(html);
//		}
//	});

	
	// qrcode
	
	function savePic() {
	    var img = $("#qrcode").find('img')[0];
	    var alink = document.createElement("a");
	    alink.href = img.src;
	    alink.download = "物流单专属二维码.jpg";
	    alink.click();
	}
	
	var qrcode = new QRCode('qrcode');
	$('#code').on('blur', function() {
		if (this.value) {
			qrcode.makeCode(this.value);
			$('#downloadBtn').show();
		} else {
			qrcode.clear();
			$('#qrcode').find('img').hide();
			$('#downloadBtn').hide();
		}
	});
	
	$('#downloadBtn').on('click', function() {
		savePic();
	});
	
	var modelData;
	
	$("#company").renderDropdown(Dict.getName('kd_company'));
	
	//获取菜单URL入参
	var invoiceCode = getQueryString("invoiceCode");
	//新增修改判断
	if(isBlank(invoiceCode)){
		$("#product").val("add");
	}else{
		$("#invoiceCode").attr("readonly","readonly");
		var data = {"invoiceCode":invoiceCode};
		var url = $("#basePath").val()+"/model/order/detail";
		doGetAjax(url, data, function(res) {
			if (res.success) {
				$("#invoiceCode").html(res.data.code);
			}else{
				alert(res.msg);
			}
		});
	}
	
	//提交
	$('#subBtn').click(function() {
		
	    if(!$("#jsForm").valid()){
			return false;
		}
	   
	    var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['invoiceCode'] = $("#invoiceCode").html();
		data['deliveryDatetime'] = $("#deliveryDatetime").val();
		data['pdf'] = $('#url1').attr('href');
		var operator = $("#operate").val() != "edit"?"add":"edit";
		
		
		var url = $("#basePath").val()+"/logistics/" + operator;
		
		doPostAjax(url, data, doSucBackSave);
	});
	
	$("#uploadBtn1").click(function () {
		var postUrl = $("#basePath").val()+"/upload/file";
        ajaxFileUpload(postUrl,"pdf","url1");
    });
	
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			code: {
				required: true,
				maxlength: 32,
			},
			deliverer: {
				required: true,
				maxlength: 32
			},
			company: "required",
			deliveryDatetime: {
				required: true,
				maxlength: 255
			},
		}
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/order/order_query.htm";
	});
});


//保存回调方法
function doSucBackSave(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/order/order_query.htm";
	}else{
		alert(res.msg);
	}
}

function ajaxFileUpload(postUrl,fileId,uploadControlId) {
    $.ajaxFileUpload
    (
        {
            url: postUrl, //用于文件上传的服务器端请求地址
            type: 'POST',
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: fileId, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status)  //服务器成功响应处理函数
            {
                if (typeof (data.status) != 'undefined') {
                    if (data.status == "1") {
                    	alert('上传成功');
                    	if(!isBlank(uploadControlId)){
                    		$("#"+uploadControlId).text(data.url.substring(data.url.lastIndexOf('/')+1));
            		    	$("#"+uploadControlId).attr('href',data.url); 
                    	}
                    } else {
                        alert(data.msg);
                    }
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
        }
    )
    return false;
}



