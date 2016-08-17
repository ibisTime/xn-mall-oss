var dhhlValue = null;
$(function (){
	$('#fromType').renderDropdown(Dict.getName('charge_type'));
	doGetAjaxIsAsync($("#basePath").val()+"/user/under/list", {}, false, function(res) {
		var data = res.data || [], html = "<option value=''>请选择</option>";
		for (var i = 0, len = data.length; i < len; i++) {
			html += "<option value='"+data[i].userId+"|"+data[i].level+"'>"+data[i].loginName+"</option>";
			$("#toUserId").html(html);
		}
	});
	var data = {"dhhlFlag":"in","start":"0","limit":"10"};
	
	var url = $("#basePath").val() + "/general/system/param/page";
	doGetAjaxIsAsync(url, data, false, doSuccessDhhlBack);
	
	$("#amount").on('input',function(e){
		var priceVal = this.value * dhhlValue;
		$("#price").html(priceVal);
	});
	
	//提交
	$("#subBtn").click(function(){
		if(!$("#jsForm").valid()){
			return false;
		}
		if(isBlank($("#url1").attr("href"))){
			alert("请上传付款凭证");
			return;
		}
		var data = {"amount":moneyParse($("#amount").val())};
		data['pdf'] = $("#url1").attr("href");
		data['toUserId'] =$("#toUserId").val().split("|")[0];
		data['price'] =moneyParse($("#price").html());
		data['type'] ='1';
		data['applyNote'] = $('#applyNote').val();
		var url = $("#basePath").val()+"/account/toRecharge";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$("#backBtn").click(function(){
		location.href = $("#basePath").val()+"/account/recharge.htm"
	});
	
	$("#uploadBtn1").click(function () {
		var postUrl = $("#basePath").val()+"/upload/file";
        ajaxFileUpload(postUrl,"pdf","url1");
    });
	$("#toUserId").on('change',function(e){
		var toUserIdSelectVal = $("#toUserId").val();
		console.log(toUserIdSelectVal);
		var level = toUserIdSelectVal.split("|")[1];
		for(var i = 0;i < dhhl.length; i++) {
			if(dhhl[i].ckey == 'TOP_TWO_DHHL' && level == '2'){
				dhhlValue = dhhl[i].cvalue;
			}else if(dhhl[i].ckey == 'TWO_THREE_DHHL' && level == '3'){
				dhhlValue = dhhl[i].cvalue;
			}
		}
	});
	
	//入参合法校验
	$("#jsForm").validate({
		rules:{
			accountNumber:{
				required: true,
				maxlength: 32
			},
			toUserId:{
				required: true,
			},
			fromType:{
				required: true,
				maxlength: 32
			},
			fromCode:{
				required: true,
				maxlength: 32
			},
			amount:{
				required: true,
				amount:true,
				isPositive: true
			},
			applyNote: {
				required: true,
				maxlength: 250
			}
		}
	})
});

//线下充值申请成功的回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/recharge.htm";
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
function doSuccessDhhlBack(res){
	if (res.success) {
		if(res.data != null){
			 dhhl = res.data.list;
		}
	}else{
		alert(res.msg);
	}
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
