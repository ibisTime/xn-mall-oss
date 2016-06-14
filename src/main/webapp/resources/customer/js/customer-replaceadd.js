
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
		var url = $("#basePath").val()+"/customer/add";
		doPostAjax(url, data, doSaveSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/customer.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			mobile: {
				required: true,
				maxlength: 11
			},
			idKind: {
				required: true,
				maxlength: 2
			},
			idNo: {
				required: true,
				maxlength: 32
			},
			realName: {
				required: true,
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

function doSaveSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/customer/customer.htm";
	}else{
		alert(res.msg);
	}
}