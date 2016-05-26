var userId="";
$(function() {
	var fromUsers = [];
	var toUsers = [];
	
	// 表格初始化
	companyId=getQueryString("companyId");
	
	var data={"code":companyId};
	var url = $("#basePath").val()+"/company/detail";
	doGetAjax(url,data,doSucBackGetDetail);
	
	doGetAjax($('#basePath').val() + '/company/stuff/list', {
		companyCode: companyId
	}, function(res) {
		fromUsers = res.data || [];
		$('#fromUserId').renderDropdown(fromUsers, 'userId', 'realName');
	});
	
	$('#fromUserId').on('change', function() {
		var value = this.value;
		var record = Dict.findObj(fromUsers, value, 'userId');
		if (record) {
			$('#fromUserMobile').val(record.mobile);
			$('#fromUserIDNo').val(Dict.getName('id_kind', record.idKind) + ' ' + record.idNo);
		} else {
			$('#fromUserMobile').val('');
			$('#fromUserIDNo').val('');
		}
	});
	
	doGetAjax($('#basePath').val() + '/customer/list', {
	}, function(res) {
		toUsers = res.data || [];
		var resData = [];
		for (var i = 0, len = toUsers.length; i < len; i++) {
			var item = toUsers[i];
			if (item.realName) {
				resData.push(item);
			}
		}
		$('#toUserId').renderDropdown(resData, 'userId', 'realName');
	});
	
	$('#toUserId').on('change', function() {
		var value = this.value;
		var record = Dict.findObj(toUsers, value, 'userId');
		if (record) {
			$('#toUserMobile').val(record.mobile);
			$('#toUserIDNo').val(Dict.getName('id_kind', record.idKind) + ' ' + record.idNo);
		} else {
			$('#toUserMobile').val('');
			$('#toUserIDNo').val('');
		}
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/company.htm";
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
		doPostAjax($("#basePath").val() + '/customer/changeUserCompany', data, function(res) {
			if (res.success) {
				alert("操作成功");
				$('.left-menu li', window.parent.frames[1].document).each(function(index, el) {
					var url = $(el).find('a').attr('href');
					if(/customer_applyer.htm/.test(url)) {
						$(el).click();
					}
				});
				
				location.href = $("#basePath").val()+"/customer/customer_applyer.htm";
			}else{
				alert(res.msg);
			}
		});
	});
	
	$("#jsForm").validate({
		rules: {
			remark: {
				required: true,
				maxlength: 64
			},
			fromUserId: {
				required: true
			},
			toUserId: {
				required: true
			}
		},
		messages: {
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			},
			fromUserId: {
				required: '请选择申请客户'
			},
			toUserId: {
				required: '请选择被替换客户'
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

function doSucBackGetDetail(res){
	var result = res.data;
	$("#companyCode").val(result.code);
	$("#companyName").val(result.name);
}
