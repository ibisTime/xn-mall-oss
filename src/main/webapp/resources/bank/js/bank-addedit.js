$(function() {
	initData();
	
	var code = getQueryString('code');
	//新增修改判断
	if(isBlank(code)){
		$("#operate").val("add");
		$("#code_add_ctn").show();
	}else{
		$("#code_edit_ctn").show();
		$("#code").val(code);
		$("#operate").val("edit");
		$("#operContent").text("修改银行");
		var data = {"code":code};
		var url = $("#basePath").val()+"/bank/detail";
		doGetAjax(url, data, doGetDetailBack);
	}
	
	//提交(保存)
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
	    //上传文件判断
		if(isBlank($("#url1").attr("href"))){
			alert("请上传大图标");
			return;
		}
		if(isBlank($("#url2").attr("href"))){
			alert("请上传小图标");
			return;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['url1'] = $("#url1").attr("href");
		data['url2'] = $("#url2").attr("href");
		if ($("#operate").val() == 'add') {
			data['code'] = $('#code_add').val();
		}
		var url = $("#basePath").val()+"/bank/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	$("#uploadBtn1").click(function () {
		var postUrl = $("#basePath").val()+"/upload/file";
        ajaxFileUpload(postUrl,"file1","url1");
    });
	
	$("#uploadBtn2").click(function () {
		var postUrl = $("#basePath").val()+"/upload/file";
        ajaxFileUpload(postUrl,"file2","url2");
    });
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/bank/bank.htm?status=0";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			code_add: {
				required: true,
				maxlength: 32
			},
			name: {
				required: true,
				maxlength: 64
			},
			type: {
				required: true,
				maxlength: 2
			},
			status: {
				required: true,
				maxlength: 2
			},
			remark: {
				required: false,
				maxlength: 128
			}
		},
		messages: {
			code_add: {
				required: "请输入银行代号",
				maxlength: jQuery.format("银行代号不能大于{0}个字符")
			},
			name: {
				required: "请输入银行名称",
				maxlength: jQuery.format("银行名称不能大于{0}个字符")
			},
			type: {
				required: "请选择类型",
				maxlength: jQuery.format("银行类型不能为空")
			},
			status: {
				required: "请选择银行状态",
				maxlength: jQuery.format("银行状态不能为空")
			},
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});


function initData(){
	$('#type').renderDropdown(Dict.getName('bank_type'));
	$('#status').renderDropdown(Dict.getName('bank_status'));	
}

//数据字典（对方系统）关联的回执方法
function doSucBackType(res){
	dictType = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictType) != "undefined"){//判断undifined
		for(var i = 0;i < dictType.length;i++){
			html += "<option value='"+dictType[i].value+"'>"+dictType[i].remark+"</option>";
		}
	}
	$("#type").html(html);
}

function doGetDetailBack(res){
	if (res.success) {
		{
			$("#code").val(res.data.code);
			$("#code_add").val(res.data.code);
			$("#code_edit").html(res.data.code);
			$("#name").val(res.data.name);
			$("#type").val(res.data.type);
			var url1 = res.data.url1;
		    if(!isBlank(url1)){
		    	$("#url1").text(url1.substring(url1.lastIndexOf('/')+1));
		    	$("#url1").attr('href',url1);
		    }
		    var url2 = res.data.url2;
		    if(!isBlank(url2)){
		    	$("#url2").text(url2.substring(url2.lastIndexOf('/')+1));
		    	$("#url2").attr('href',url2);
		    }
			
			$("#status").val(res.data.status);
			$("#remark").val(res.data.remark);
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
		window.location.href = $("#basePath").val()+"/bank/bank.htm?status=0";
	}else{
		alert('银行代号已经存在！');
	}
}