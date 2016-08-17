$(function() {
	
	$('#status').renderDropdown(Dict.getName('product_status'));
	
	doGetAjaxIsAsync($("#dictUrl").val(), {
		parentKey: 'pro_category'
	}, false, function(res) {
		var data =res.data || [];
		var html = "<option value=''>请选择</option>";
		for(var i = 0;i < data.length;i++){
			html += "<option value='"+data[i]['dkey']+"'>"+data[i]['dvalue']+"</option>";
		}
		$('#category').html(html);
	});
	
	$('#category').on('change', function() {
		var value = $(this).val();
		doGetAjax($("#dictUrl").val(), {
			parentKey: value
		}, function(res) {
			var data = res.data || [];
			var html = "<option value=''>请选择</option>";
			for(var i = 0;i < data.length;i++){
				html += "<option value='"+data[i]['dkey']+"'>"+data[i]['dvalue']+"</option>";
			}
			$('#type').html(html);
		});
	});
	
	//获取菜单URL入参
	var code = getQueryString("code");
	//新增修改判断
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		$("#operate").val("edit");
		var data = {"code":code};
		var url = $("#basePath").val()+"/product/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	//提交
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
	    if(isBlank($('#img1').attr("src"))){
			alert("请上传广告图");
			return;
		}
	    if(isBlank($('#img2').attr("src"))){
			alert("请上传小类图");
			return;
		}
		
	    var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		var operator = $("#operate").val() != "edit"?"add":"edit";
		
		data["advPic"]=$('#img1').attr("src");
		data["typePic"]=$('#img2').attr("src");
		var url = $("#basePath").val()+"/product/" + operator;
		
		doPostAjax(url, data, doSucBackSave);
	});
	
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			name: {
				required: true,
				maxlength: 30
			},
			advTitle: {
				required: true,
				maxlength: 60
			},
			category: {
				required: true
			},
			type: {
				required: true
			},
			orderNo: {
				required: true,
				number: true,
				maxlength: 4
			},
			status: {
				required: true
			},
			remark: {
				required: false,
				maxlength: 250
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
		doGetAjaxIsAsync($("#dictUrl").val(), {
			parentKey: res.data.category
		}, false, function(res) {
			var data = res.data || [];
			var html = "<option value=''>请选择</option>";
			for(var i = 0;i < data.length;i++){
				html += "<option value='"+data[i]['dkey']+"'>"+data[i]['dvalue']+"</option>";
			}
			$('#type').html(html);
		});
		$("#code").val(res.data.code);
		$("#category").val(res.data.category);
		$("#type").val(res.data.type);
		$("#name").val(res.data.name);
		$("#orderNo").val(res.data.orderNo);
		$("[name=status][value='"+res.data.status+"']")[0].checked = true;
		$("#advTitle").val(res.data.advTitle);
		$("#remark").val(res.data.remark);
		$("#img1").attr('src',res.data.advPic);
		$("#img2").attr('src',res.data.typePic);
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
	zipImg(file.files[0], document.getElementById(name));
}



