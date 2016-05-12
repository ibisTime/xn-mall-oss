var dictIdKind=null;
var dictStatus=null;
var dictLevel=null;
$(function() {
	//页面数据字典初始化
	initData();
	//$('#loginStatusSearch').renderDropdown(Dict.getName('login_status'));
	// 表格初始化
	companyId=getQueryString("companyId");
	var data={"code":companyId};
	var url = $("#basePath").val()+"/company/detail";
	doGetAjax(url,data,function(res) {
		$('#companyCode').val(res.data.code);
		$('#companyName').val(res.data.name);
	});
	
	doGetAjax( $("#basePath").val() + '/customer/list', {
	}, function(res) {
		var data = res.data || [], newdata = [];
		for(var i=0;i<data.length;i++){
			if(data[i].realName){
				newdata.push(data[i]);
			}
		}
		$('#userId').renderDropdown(newdata, 'userId', 'realName');
	});
    
	$("#uploadBtn1").click(function () {
		var postUrl = $("#basePath").val()+"/upload/file";
        ajaxFileUpload(postUrl,"file1","url1");
    });
	
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
	    //上传文件判断
		if(isBlank($("#url1").attr("href"))){
			alert("请上传申请公函");
			return;
		}
		var data = $('form').serializeObject();
		data['sqghPicture'] = $("#url1").attr("href");
		doPostAjax($("#basePath").val() + '/customer/apply', data, function(res) {
			if (res.success) {
				alert("操作成功");
				window.location.href = $("#basePath").val()+"/customer/company_detail.htm?companyId=" + companyId + "&tab=3";
			}else{
				alert(res.msg);
			}
		});
	});
	
	//返回
	$('#backBtn').click(function() {
		window.location.href = $("#basePath").val()+"/customer/company_detail.htm?companyId=" + companyId + "&tab=3";
	});
	
	$("#jsForm").validate({
		rules: {
			userId: {
				required: true,
				maxlength: 64
			},
			remark: {
				maxlength: 200
			}
		},
		messages: {
			userId: {
				required: "请选择申请客户",
				maxlength: jQuery.format("申请客户不能大于{0}个字符")
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符")
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
	
}

