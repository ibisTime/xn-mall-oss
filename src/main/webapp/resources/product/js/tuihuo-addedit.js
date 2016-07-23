$(function() {
	
	$('#type').renderDropdown(Dict.getName('product_type'));
	
	//获取菜单URL入参
	
	var code = getQueryString('code');
	doGetAjaxIsAsync($("#basePath").val()+"/model/list", {}, false, function(res) {
		var data = res.data || [], html = "<option value=''>请选择</option>";
		for (var i = 0, len = data.length; i < len; i++) {
			html += "<option value='"+data[i].code+"'>"+data[i].name+"</option>";
			$("#goodsCode").html(html);
		}
	});
	//新增修改判断
	var code = getQueryString("code");
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		$("#operate").val("edit");
		$("#operContent").text("修改产品");
		var data = {"code":code};
		var url = $("#basePath").val()+"/product/goods/detail";
		doGetAjax(url, data, doSucBackGetDetail);
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
		var operator = $("#operate").val() != "edit"?"add":"edit";
//		data["advPic"]=$('#advPic').next().attr("src");
//		data["majorPic"]=$('#majorPic').next().attr("src");
//		data["familyPic"]=$('#familyPic').next().attr("src");
//		data["highlightPic"]=$('#highlightPic').next().attr("src");
		var url = $("#basePath").val()+"/product/goods/apply";
		
		doPostAjax(url, data, doSucBackSave);
	});
	
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			goodsCode: {
				required: true,
				maxlength: 64
			},
			price: {
				required: true,
				maxlength: 11
			},
			quantity: {
				required: true,
				maxlength: 11
			},
			applyNote: {
				required: false,
				maxlength: 255
			}
		},
		messages: {
			goodsCode: {
				required: "请输入货品编号",
				maxlength: jQuery.format("货品编号不能大于{0}个字符")
			},
			price: {
				required: "请输入单价",
				maxlength: jQuery.format("单价不能大于{0}个字符")
			},
			quantity: {
				required: "请输入数量",
				maxlength: jQuery.format("数量不能大于{0}个字符")
			},
			applyNote: {
				maxlength: jQuery.format("申请备注不能大于{0}个字符")
			}
		}
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/tui_product.htm";
	});
});


//获取详情回调方法
function doSucBackGetDetail(res){
	if (res.success) {
		$("#goodsCode").val(res.data.goodsCode);
		$("#price").val(res.data.price);
		$("#quantity").val(res.data.quantity);
		$("#applyNote").val(res.data.applyNote);
	}else{
		alert(res.msg);
	}
}

//保存回调方法
function doSucBackSave(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/product/product.htm";
	}else{
		alert(res.msg);
	}
}

