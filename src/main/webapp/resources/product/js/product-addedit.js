$(function() {
	$('#kind').renderDropdown(Dict.getRoleKindName());
	$('#level').renderDropdown(Dict.getRoleLevelName());
	
//	//系统方则显示哪一方查询条件
//	if(getCurrentKind() != "1"){
//		$("#liKind").hide();
//	}
	
	//获取菜单URL入参
	var code = getQueryString("code");
	//新增修改判断
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		$("#operate").val("edit");
		$("#operContent").text("修改角色");
		var data = {"code":code};
		var url = $("#basePath").val()+"/product/detail";
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
		
		data["advPic"]=$('#advPic').next().attr("src");
		data["majorPic"]=$('#majorPic').next().attr("src");
		data["familyPic"]=$('#familyPic').next().attr("src");
		data["highlightPic"]=$('#highlightPic').next().attr("src");
		var url = $("#basePath").val()+"/product/" + operator;
		
		doPostAjax(url, data, doSucBackSave);
	});
	
	
	//入参合法性校验
	$("#jsForm").validate({
//		rules: {
//			kind: {
//				required: true,
//				maxlength: 32
//			},
//			name: {
//				required: true,
//				maxlength: 32
//			},
//			level: "required",
//			remark: {
//				maxlength: 100
//			}
//		},
//		messages: {
//			kind: {
//				required: "请输入哪一方",
//				maxlength: jQuery.format("哪一方不能大于{0}个字符")
//			},
//			name: {
//				required: "请输入角色名称",
//				maxlength: jQuery.format("角色名称不能大于{0}个字符")
//			},
//			level: "请选择角色等级",
//			remark: {
//				maxlength: jQuery.format("备注不能大于{0}个字符")
//			}
//		}
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/product.htm";
	});
});


//获取详情回调方法
function doSucBackGetDetail(res){
	if (res.success) {
		$("#type").val(res.data.type);
		$("#name").val(res.data.name);
		$("#advTitle").val(res.data.advTitle);
		$("#majorText").val(res.data.majorText);
		$("#familyText").val(res.data.familyText);
		$("#highlightText").val(res.data.highlightText);
		$("#updater").val(res.data.updater);
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



