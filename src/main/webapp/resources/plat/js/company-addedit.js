$(function() {
	var code = getQueryString('code');
	//新增修改判断
	if(isBlank(code)){
		$("#operate").val("add");
	}else{
		$("#code").val(code);
		$("#operate").val("edit");
		$("#operContent").text("修改公司");
		var data = {"code":code};
		var url = $("#basePath").val()+"/plat/company/detail";
		doGetAjax(url, data, doGetDetailBack);
	}
	
	$('#currency').renderDropdown(Dict.getName('currency'));

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
		var url = $("#basePath").val()+"/plat/company/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/plat/company.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			name: {
				required: true,
				maxlength: 255
			},
			ywName: {
				required: true,
				maxlength: 255
			},
			zcAddress: {
				required: true,
				maxlength: 255
			},
			jyAddress: {
				required: true,
				maxlength: 255
			},
			currency: {
				required: true,
				maxlength: 2
			},
			capital: {
				required: true,
				number: true,
				maxlength: 13
			},
			frPerson: {
				required: true,
				maxlength: 64
			},
			gdPerson: {
				required: true,
				maxlength: 64
			},
			cwLeader: {
				required: true,
				maxlength: 64
			},
			debdtxPerson: {
				required: true,
				maxlength: 64
			},
			wyRecorder: {
				required: true,
				maxlength: 64
			},
			wyChecker: {
				required: true,
				maxlength: 64
			},
			telephone: {
				required: true,
				maxlength: 64
			},
			remark: {
				maxlength: 200
			}
		},
		messages: {
			name: {
				required: "请输入公司名称",
				maxlength: jQuery.format("公司名称不能大于{0}个字符")
			},
			ywName: {
				required: "请输入公司英文名",
				maxlength: jQuery.format("公司英文名不能大于{0}个字符")
			},
			zcAddress: {
				required: "请输入注册地址",
				maxlength: jQuery.format("注册地址不能大于{0}个字符")
			},
			jyAddress: {
				required: "请输入经营地址",
				maxlength: jQuery.format("经营地址不能大于{0}个字符")
			},
			currency: {
				required: "请选择币种",
				maxlength: jQuery.format("币种不能大于{0}个字符")
			},
			capital: {
				required: "请输入注册资金",
				number:"注册资金请输入数字",
				maxlength: jQuery.format("注册资金不能大于{0}个字符")
			},
			frPerson: {
				required: "请输入法人",
				maxlength: jQuery.format("法人不能大于{0}个字符")
			},
			gdPerson: {
				required: "请输入股东",
				maxlength: jQuery.format("股东不能大于{0}个字符")
			},
			cwLeader: {
				required: "请输入财务负责人",
				maxlength: jQuery.format("财务负责人不能大于{0}个字符")
			},
			debdtxPerson: {
				required: "请输入大额变动提醒人",
				maxlength: jQuery.format("大额变动提醒人不能大于{0}个字符")
			},
			wyRecorder: {
				required: "请输入网银录入人",
				maxlength: jQuery.format("网银录入人不能大于{0}个字符")
			},
			wyChecker: {
				required: "请输入网银复核人",
				maxlength: jQuery.format("网银复核人不能大于{0}个字符")
			},
			telephone: {
				required: "请输入公司座机",
				maxlength: jQuery.format("公司座机不能大于{0}个字符")
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success == true) {
		$("#code").val(res.data.code);
		$("#name").val(res.data.zwName);
		$("#ywName").val(res.data.ywName);
		$("#zcAddress").val(res.data.zcAddress);
		$("#jyAddress").val(res.data.jyAddress);
		$("#currency").val(res.data.currency);
		$("#capital").val(res.data.capital);
		$("#frPerson").val(res.data.frPerson);
		$("#gdPerson").val(res.data.gdPerson);
		$("#cwLeader").val(res.data.cwPerson);
		$("#debdtxPerson").val(res.data.debdtxPerson);
		
		$("#wyRecorder").val(res.data.wyRecorder);
		$("#wyChecker").val(res.data.wyChecker);
		$("#telephone").val(res.data.telephone);
		$("#remark").val(res.data.remark);
	}else{
		alert(res.msg);
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/plat/company.htm";
	}else{
		alert(res.msg);
	}
}