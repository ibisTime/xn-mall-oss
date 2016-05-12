var companyCode = null;
$(function() {
//	initData();
	$("#idKind").renderDropdown(Dict.getName("id_kind"));
	var code = getQueryString('code');
    companyCode = getQueryString('companyCode');
	$("#companyCode").val(companyCode);
	//新增修改判断
	if(isBlank(code)){
		$("#operate").val("add");
	}else{
		$("#code").val(code);
		$("#operate").val("edit");
		$("#operContent").text("修改人员信息");
		var data = {"code":code};
		var url = $("#basePath").val()+"/plat/companypersons/detail";
		doGetAjax(url, data, doGetDetailBack);
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
		var url = $("#basePath").val()+"/plat/companypersons/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/plat/company_persons.htm?companyCode="+companyCode;
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			name: {
				required: true,
				maxlength: 32
			},
			mobile: {
				required: true,
				mobile: true,
				maxlength: 32
			},
			telephone: {
				required: true,
				maxlength: 32
			},
			idKind: {
				required: true,
				maxlength: 2
			},
			idNo: {
				required: true,
				//idCard: true,
				maxlength: 32
			},
			idExpirationDate: {
				required: true,
				maxlength: 64
			},
			remark: {
				maxlength: 255
			}
		},
		messages: {
			name: {
				required: "请输入姓名",
				maxlength: jQuery.format("姓名不能大于{0}个字符")
			},
			mobile: {
				required: "请输入手机号",
				maxlength: jQuery.format("手机号不能大于{0}个字符")
			},
			telephone: {
				required: "请输入座机",
				maxlength: jQuery.format("座机不能大于{0}个字符")
			},
			idKind: {
				required: "请选择证件类型",
				maxlength: jQuery.format("证件类型不能大于{0}个字符")
			},
			idNo: {
				required: "请输入证件号",
				maxlength: jQuery.format("证件号不能大于{0}个字符")
			},
			idExpirationDate: {
				required: "请输入证件有效期",
				maxlength: jQuery.format("证件有效期不能大于{0}个字符")
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

//function initData(){
//	//证件类型
//	var data= {"parentKey":"id_kind"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackIdKind);
//}

//数据字典（证件类型）关联的回执方法
//function doSucBackIdKind(res){
//	dictIdKind = res.data;
//	var html = "<option value=''>请选择";
//	if(typeof(dictIdKind) != "undefined"){//判断undifined
//		for(var i = 0;i < dictIdKind.length;i++){
//			html += "<option value='"+dictIdKind[i].value+"'>"+dictIdKind[i].remark+"</option>";
//		}
//	}
//	//用户类型
//	$("#idKind").html(html);
//}

function doGetDetailBack(res){
	if (res.success) {
		$("#code").val(res.data.userId);
		$("#name").val(res.data.realName);
		$("#mobile").val(res.data.mobile);
		$("#telephone").val(res.data.telephone);
		$("#idKind").val(res.data.idKind);
		
		$("#idNo").val(res.data.idNo);
		$("#idExpirationDate").val(res.data.idYxq);
		$("#remark").val(res.data.remark);
	}else{
		alert(res.msg);
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/plat/company_persons.htm?companyCode="+companyCode;
	}else{
		alert(res.msg);
	}
}