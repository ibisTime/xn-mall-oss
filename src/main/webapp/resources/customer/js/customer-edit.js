
$(function() {
	var userId = getQueryString('userId');
	doGetAjax($("#basePath").val()+"/customer/detail", {
		userId: userId
	}, function(res) {
		$("#mobile").html(res.data.mobile);
		$("#remark").val(res.data.remark);
		renderA($('#url1'), res.data.pdf);
	});
	//提交
	$('#subBtn').click(function() {
		if ($('#jsForm').valid()) {
			var data = {};
			data['pdf'] = $("#url1").attr("href");
			data['userId']= userId;
			data['remark'] = $('#remark').val();
			var url = $("#basePath").val()+"/customer/edit";
			ajaxPost(url, data).then(function(res) {
				if (res.success) {
					alert("操作成功");
					goBack();
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
			remark: {
				maxlength: 200
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
