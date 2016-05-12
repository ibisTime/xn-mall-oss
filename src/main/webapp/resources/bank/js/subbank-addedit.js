$(function() {
	var code = getQueryString('code');
	doGetAjaxIsAsync($("#basePath").val()+"/bank/list", {}, false, function(res) {
		var data = res.data || [], html = "<option value=''>请选择</option>";
		for (var i = 0, len = data.length; i < len; i++) {
			html += "<option value='"+data[i].code+"'>"+data[i].code+""+data[i].name+"</option>";
			$("#bankCode").html(html);
		}
	});
	//新增修改判断
	if(isBlank(code)){
		$("#operate").val("add");
	}else{
		$("#code").val(code);
		$("#operate").val("edit");
		$("#operContent").text("修改银行");
		var data = {"code":code};
		var url = $("#basePath").val()+"/subbank/detail";
		doGetAjax(url, data, doGetDetailBack);
	}
	
	//提交(保存)
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
	    //上传文件判断
		if(isBlank($("#swiftCode").attr("href"))){
			alert("请上传SWIFT CODE");
			return;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['swiftCode'] = $("#swiftCode").attr("href");
		var url = $("#basePath").val()+"/subbank/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	$("#swiftCodeBtn").click(function () {
		var postUrl = $("#basePath").val()+"/upload/file";
        ajaxFileUpload(postUrl,"swiftCodeFile","swiftCode");
    });
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/bank/subbank.htm?status=0";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			bankCode: {
				required: true,
				maxlength: 10
			},
			name: {
				required: true,
				maxlength: 64
			},
			subbranch: {
				required: true,
				maxlength: 128
			},
			region: {
				required: true,
				maxlength: 64
			},
			address: {
				required: true,
				maxlength: 255
			},
			cnapsCode: {
				required: true,
				maxlength: 64
			},
			khjlPerson: {
				required: true,
				maxlength: 64
			},
			khjlContact: {
				required: true,
				maxlength: 128
			},
			bankRemark:{
				required: false,
				maxlength:200
			}
		},
		messages: {
			bankCode: {
				required: "请选择所属行别",
				maxlength: jQuery.format("所属行别不能大于{0}个字符")
			},
			name: {
				required: "请输入银行名称",
				maxlength: jQuery.format("银行名称不能大于{0}个字符")
			},
			subbranch: {
				required: "请输入支行名称",
				maxlength: jQuery.format("支行名称不能大于{0}个字符")
			},
			region: {
				required: "请输入所在地区",
				maxlength: jQuery.format("所在地区不能大于{0}个字符")
			},
			address: {
				required: "请输入银行地址",
				maxlength: jQuery.format("银行地址不能大于{0}个字符")
			},
			cnapsCode: {
				required: "请输入中国现代化支付系统（CNAPS）",
				maxlength: jQuery.format("中国现代化支付系统（CNAPS）号不能大于{0}个字符")
			},
			khjlPerson: {
				required: "请输入客户经理名称",
				maxlength: jQuery.format("客户经理不能大于{0}个字符")
			},
			khjlContact: {
				required: "请输入联系方式",
				maxlength: jQuery.format("联系方式不能大于{0}个字符")
			},
			bankRemark: {
				required:"请输入备注",
				maxlength:jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success == true) {
		$("#code").val(res.data.code);
		$("#name").val(res.data.name);
		$("#region").val(res.data.region);
		$("#address").val(res.data.address);
		
		$("#cnapsCode").val(res.data.cnapsCode);
		$("#khjlPerson").val(res.data.khjlPerson);
		$("#khjlContact").val(res.data.khjlContact);
		
		$("#remark").val(res.data.remark);
		var swiftCode = res.data.swiftCode;
	    if(!isBlank(swiftCode)){
	    	$("#swiftCode").text(swiftCode.substring(swiftCode.lastIndexOf('/')+1));
	    	$("#swiftCode").attr('href',swiftCode);
	    }
	    if ($("#operate").val() == 'edit') {
			$("#bankCode").val(res.data.bankCode);
		}
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

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/bank/subbank.htm?status=0";
	}else{
		alert(res.msg);
	}
}