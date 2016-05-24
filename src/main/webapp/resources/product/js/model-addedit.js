$(function() {
	
	$('#productCode').renderDropdown(Dict.getName('product_type'));
	
	initBusinessTable();
	//获取菜单URL入参
	var code = getQueryString("code");
	//新增修改判断
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		$("#operate").val("edit");
		$("#operContent").text("修改型号");
		var data = {"code":code};
		var url = $("#basePath").val()+"/model/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	//提交
	$('#subBtn').click(function() {
		if(isBlank($('#pic1').next().attr("src"))){
			alert("请上传图片1");
			return;
		}
		if(isBlank($('#pic2').next().attr("src"))){
			alert("请上传图片2");
			return;
		}
		if(isBlank($('#pic3').next().attr("src"))){
			alert("请上传图片3");
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
		
		data["pic1"]=$('#pic1').next().attr("src");
		data["pic2"]=$('#pic2').next().attr("src");
		data["pic3"]=$('#pic3').next().attr("src");
		var url = $("#basePath").val()+"/model/" + operator;
		
		doPostAjax(url, data, doSucBackSave);
	});
	
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			name: {
				required: true,
				maxlength: 32
			},
			productCode: "required",
			description: {
				required: true,
				maxlength: 255
			},
		},
		messages: {
			name: {
				required: "请输入型号名称",
				maxlength: jQuery.format("型号名称不能大于{0}个字符")
			},
			productCode: "请选择产品",
			description: {
				required: "请输入描述",
				maxlength: jQuery.format("描述不能大于{0}个字符")
			},
		}
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/model.htm";
	});
});



function initBusinessTable(){
    mytable = $('#edittable').editTable({
	    field_templates: {
	    	'select_one' : {
	            html:"参数名",
	            getValue: function (input) {
	                return $(input).val();
	            },
	            setValue: function (input, value) {
	                var select = $(input);
	                select.find('option').filter(function() {
	                    return $(this).val() == value; 
	                }).attr('selected', true);
	                return select;
	            }
	        },
	        'select_two' : {
	            html:"参数值",
	            getValue: function (input) {
	                return $(input).val();
	            },
	            setValue: function (input, value) {
	                var select = $(input);
	                select.find('option').filter(function() {
	                    return $(this).val() == value; 
	                }).attr('selected', true);
	                return select;
	            }
	        }
	    },
	    row_template: ['select_one', 'select_two', 'text', 'text'],
	    headerCols: ['类型','项目'],
	    first_row: false,
	    data: [
	        ["",""]
	    ]
	});
}

//获取详情回调方法
function doSucBackGetDetail(res){
	if (res.success) {
		$("#productCode").val(res.data.productCode);
		$("#name").val(res.data.name);
		$("#majorText").val(res.data.advTitle);
		$("#img1").attr('src',res.data.pic1);
		$("#img2").attr('src',res.data.pic2);
		$("#img3").attr('src',res.data.pic3);
	}else{
		alert(res.msg);
	}
}

//保存回调方法
function doSucBackSave(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/product/model.htm";
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



