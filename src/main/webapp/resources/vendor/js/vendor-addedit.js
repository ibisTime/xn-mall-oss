
$(function() {
	$("#city-group").citySelect({
		required:false
	}); 
	$('#type').renderDropdown(Dict.getName('vendor_type'));
	var description = UE.getEditor('description');
	var edit = getQueryString('edit');
	var code = getQueryString('code');
	if (edit && !code) {
		$('#backBtn').hide();
		var userId = getUserId();
		ajaxGet($("#basePath").val()+"/vendor/list", {
			userId: userId
		}, false, true).then(function(res) {
			code = res.data[0].code;
		});
	}
	if (code) {
		doGetAjax($("#basePath").val()+"/vendor/detail", {
			code: code
		}, function(res) {
			if (res.success) {
				var data = res.data;
				$('#loginName').html(data.loginName);
				$('#login-name-ctn').show();
				$('#code').val(data.code);
				$('#type').val(data.type);
				$('#name').val(data.name);
				$('#advert').val(data.advert);
				$('#img1').attr('src', data.pic1);
				$('#province').val(data.province);
				$('#province').trigger('change');
				$('#city').val(data.city);
				$('#city').trigger('change');
				$('#area').val(data.area);
				$('#address').val(data.address);
				$('#bookMobile').val(data.bookMobile);
				$('#smsMobile').val(data.smsMobile);
				$('#remark').val(data.remark);
				renderA($('#url1'), data.pdf);
				description.ready(function() {
					description.setContent(data.description);
				});
			}
		});
	}
	
	//提交
	$('#subBtn').click(function() {
		if ($('#jsForm').valid()) {
			if (!$('#img1').attr('src')) {
				alert('请上传图片！');
				return;
			}
			var data = {};
			var t = $('#jsForm').serializeArray();
			$.each(t, function() {
				data[this.name] = this.value;
			});
			data['pdf'] = $("#url1").attr("href");
			data['pic1'] = $('#img1').attr('src');
			data['city'] = data['city'] || '0';
			data['area'] = data['area'] || '0';
			var url = $("#basePath").val()+"/vendor/" + (code ? 'edit' : 'add');
			ajaxPost(url, data).then(function(res) {
				if (res.success) {
					alert("操作成功");
					if (!edit) {
						goBack();
					}
				}
			});
		}
		
	});
	
	//返回
	$('#backBtn').click(function() {
		goBack();
	});
	
	$("#uploadBtn1").click(function () {
		var postUrl = $("#basePath").val()+"/upload/file";
        ajaxFileUpload(postUrl,"pdf","url1");
    });
	
	
	$("#jsForm").validate({
		rules: {
			type: {
				required: true
			},
			name: {
				required: true,
				maxlength: 64
			},
			advert: {
				required: true,
				maxlength: 64
			},
			province: {
				required: true
			},
			city: {
				required: true
			},
			area: {
				required: true
			},
			address: {
				required: true
			},
			bookMobile: {
				required: true,
				maxlength: 30
			},
			smsMobile: {
				required: true,
				maxlength: 30
			},
			description: {
				required: true
			}
		}
	});
	
});

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

function selectImage(file,name){
	if(!file.files || !file.files[0]){
		return;
	}
	zipImg(file.files[0], document.getElementById(name));
}