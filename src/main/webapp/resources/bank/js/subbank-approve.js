var code = "";
$(function() {
	initData();
	doGetAjaxIsAsync($("#basePath").val()+"/bank/list", {}, false, function(res) {
		var data = res.data || [], html = "<option value=''>请选择</option>";
		for (var i = 0, len = data.length; i < len; i++) {
			html += "<option value='"+data[i].code+"'>"+data[i].code+"</option>";
			$("#bankCode").html(html);
		}
	});
	
	code = getQueryString("code");
	var data = {"code":code};
	var url = $("#basePath").val()+"/subbank/detail";
	doGetAjax(url, data, doGetDetailBack);
	
	//审核通过
	$('#passBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['code'] = code;
		var url = $("#basePath").val()+"/subbank/approve";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//审核不通过
	$('#unPassBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['code'] = code;
		var url = $("#basePath").val()+"/subbank/unapprove";
		doPostAjax(url, data, doSuccessBack);
	});
	
	$("#updateBtn").click(function () {
		var postUrl = $("#basePath").val()+"/upload/file";
        ajaxFileUpload(postUrl,"file1","swiftCode");
    });
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/bank/subbank.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			remark:{
				required: true,
				maxlength:200
			}
		},
		messages: {
			remark: {
				required:"请输入备注",
				maxlength:jQuery.format("备注不能大于{0}个字符")
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

function initData(){
	//标准状态
	var data= {"key":"normal_status"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackNormalStatus);
}

//数据字典（标准状态）关联的回执方法
function doSucBackNormalStatus(res){
	normalStatus = res.data;
}

//状态转化
function statusFormatter(value, row) {
	for(var i = 0;i < normalStatus.length;i++){
		if(normalStatus[i].value == value){
			return normalStatus[i].remark;
		}
	}
}

function doGetDetailBack(res){
	if (res.success == true) {
	    $("#bankCode").html(res.data.bankCode);
		$("#name").html(res.data.name);
		$("#region").html(res.data.region);
		$("#address").html(res.data.address);
		$("#cnapsCode").html(res.data.cnapsCode);
		
		$("#swiftCode").html(res.data.swiftCode);
		$("#khjlPerson").html(res.data.khjlPerson);
		$("#khjlContact").html(res.data.khjlContact);
		$("#address").html(res.data.address);
		
		$("#remark").html(res.data.remark);
		var swiftCode = res.data.swiftCode;
	    if(!isBlank(swiftCode)){
	    	$("#swiftCodeFile").text(swiftCode.substring(swiftCode.lastIndexOf('/')+1));
	    	$("#swiftCodeFile").attr('href',swiftCode);
	    }
		$("#remark").val(res.data.remark);
	}else{
		alert(res.msg);
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/bank/subbank.htm";
	}else{
		alert(res.msg);
	}
}

//格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}