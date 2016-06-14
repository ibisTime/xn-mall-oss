$(function() {
	
	$('#type').renderDropdown(Dict.getName('product_type'));
	
	//获取菜单URL入参
	var code = getQueryString("code");
	//新增修改判断
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		$("#operate").val("edit");
		$("#operContent").text("修改产品");
		var data = {"code":code};
		var url = $("#basePath").val()+"/product/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	//提交
	$('#subBtn').click(function() {
		if(isBlank($('#majorPic').next().attr("src"))){
			alert("请上传主推图");
			return;
		}
		if(isBlank($('#advPic').next().attr("src"))){
			alert("请上传广告图");
			return;
		}
		if(isBlank($('#familyPic').next().attr("src"))){
			alert("请上传全家福图");
			return;
		}
		if(isBlank($('#highlightPic').next().attr("src"))){
			alert("请上传亮点图");
			return;
		}
	    if(!$("#jsForm").valid()){
			return false;
		}
	    var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		var operator = $("#operate").val() != "edit"?"add":"edit";
		
		data["advPic"]=$('#advPic').next().attr("src");
		data["majorPic"]=$('#majorPic').next().attr("src");
		data["familyPic"]=$('#familyPic').next().attr("src");
		data["highlightPic"]=$('#highlightPic').next().attr("src");
		var url = $("#basePath").val()+"/product/" + operator;
		
		doPostAjax(url, data, doSucBackSave);
	});
	
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			name: {
				required: true,
				maxlength: 64
			},
			familyText: {
				required: true,
				maxlength: 1024
			},
			type: "required",
			advTitle: {
				required: true,
				maxlength: 64
			},
			majorText: {
				required: true,
				maxlength: 1024
			},
			highlightText: {
				required: true,
				maxlength: 1024
			},
			remark: {
				required: false,
				maxlength: 255
			}
		},
		messages: {
			name: {
				required: "请输入产品名称",
				maxlength: jQuery.format("产品名称不能大于{0}个字符")
			},
			familyText: {
				required: "请输入全家福文本",
				maxlength: jQuery.format("全家福文本不能大于{0}个字符")
			},
			type: "请选择类型",
			advTitle: {
				required: "请输入广告语",
				maxlength: jQuery.format("广告语不能大于{0}个字符")
			},
			majorText: {
				required: "请输入主推文本",
				maxlength: jQuery.format("主推文本不能大于{0}个字符")
			},
			highlightText: {
				required: "请输入亮点文本",
				maxlength: jQuery.format("亮点文本不能大于{0}个字符")
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/product.htm";
	});
});


//获取详情回调方法
function doSucBackGetDetail(res){
	if (res.success) {
		$("#code").val(res.data.code);
		$("#type").val(res.data.type);
		$("#name").val(res.data.name);
		$("#advTitle").val(res.data.advTitle);
		$("#majorText").val(res.data.majorText);
		$("#familyText").val(res.data.familyText);
		$("#highlightText").val(res.data.highlightText);
		$("#remark").val(res.data.remark);
		$("#img1").attr('src',res.data.advPic);
		$("#img2").attr('src',res.data.majorPic);
		$("#img3").attr('src',res.data.familyPic);
		$("#img4").attr('src',res.data.highlightPic);
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
//图片上传转化
function selectImage(file,name){
	if(!file.files || !file.files[0]){
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt){
		document.getElementById(name).src = evt.target.result;
		var image = evt.target.result;
		$(document.getElementById(name)).next().attr("src",image);
	}
	reader.readAsDataURL(file.files[0]);
}



