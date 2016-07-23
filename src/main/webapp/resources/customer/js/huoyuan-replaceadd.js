
$(function() {
	$('#idKind').renderDropdown(Dict.getIDKindName());

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
		data["pdf"]=pdfImg;
		var url = $("#basePath").val()+"/customer/huoyuan/add";
		doPostAjax(url, data, doSaveSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/score2.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			loginName: {
				required: true,
				maxlength: 11
			},
			mobile: {
				required: false,
				maxlength: 11
			},
			idKind: {
				required: false,
				maxlength: 2
			},
			idNo: {
				required: false,
				maxlength: 32
			},
			realName: {
				required: false,
				maxlength: 16
			},
			userReferee: {
				required: false,
				maxlength: 32
			},
			remark: {
				maxlength: 200
			}
		},
		messages: {
			loginName: {
				required: "请输入登录名",
				maxlength: jQuery.format("登录名不能大于{0}个字符")
			},
			mobile: {
				required: "请输入手机号",
				maxlength: jQuery.format("手机号不能大于{0}个字符")
			},
			idKind: {
				required: "请输入证件类型",
				maxlength: jQuery.format("证件类型不能大于{0}个字符")
			},
			idNo: {
				required: "请输入证件号",
				maxlength: jQuery.format("证件号不能大于{0}个字符")
			},
			realName: {
				required: "请输入真实姓名",
				maxlength: jQuery.format("真实姓名不能大于{0}个字符")
			},
			userReferee: {
				maxlength: jQuery.format("推荐人不能大于{0}个字符")
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符"),
			}
		}
	});
});

function selectImagepdf(file){
	if(!file.files || !file.files[0]){
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt){
		document.getElementById('pdf').src = evt.target.result;
		pdfImg = evt.target.result;
		$("#pdfImg").show();
		$("#pdfImg").attr("src",pdfImg);
	}
	reader.readAsDataURL(file.files[0]);
}


function doSaveSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/customer/score2.htm";
	}else{
		alert(res.msg);
	}
}