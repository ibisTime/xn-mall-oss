$(function() {
	
	
	//获取菜单URL入参
	var code = getQueryString("code");
	//新增修改判断
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		var data = {"code":code};
		var url = $("#basePath").val()+"/product/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	$('#upBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		doAprove(1);
	});
	$('#downBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		doAprove(0);
	});
	$("#jsForm").validate({
		rules: {
			checkNote:  {
				required: true,
				maxlength: 32
			}
		},
		messages: {
			checkNote:  {
				required: "请输入审核说明",
				maxlength: jQuery.format("审核说明不能大于{0}个字符")
			}
		}
	});
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/publish.htm";
	});
	function doAprove(checkResult){
		var data = {"checkNote":$("#checkNote").val(),"checkResult":checkResult,"code":code};
		var url = $("#basePath").val()+"/product/up";
		doPostAjax(url, data, doSuccessBack);
	}


	function doSuccessBack(res) {
		if (res.success == true) {
			alert("操作成功");
			window.location.href = $("#basePath").val()+"/product/publish.htm";
		}else{
			alert(res.msg);
		}
	}
	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#type").html(Dict.getName('product_type', res.data.type));
			$("#name").html(res.data.name);
			$("#advTitle").html(res.data.advTitle);
			$("#majorText").html(res.data.majorText);
			$("#familyText").html(res.data.familyText);
			$("#highlightText").html(res.data.highlightText);
			$("#updater").html(res.data.updater);
			$("#img1").attr('src',res.data.advPic);
			$("#img2").attr('src',res.data.majorPic);
			$("#img3").attr('src',res.data.familyPic);
			$("#img4").attr('src',res.data.highlightPic);
		}else{
			alert(res.msg);
		}
	}
});



