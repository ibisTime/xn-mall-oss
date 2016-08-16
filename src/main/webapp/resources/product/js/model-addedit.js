$(function() {
	var description = UE.getEditor('description');
	var code = getQueryString('code');
	doGetAjaxIsAsync($("#basePath").val()+"/product/list", {status: 1}, false, function(res) {
		var data = res.data || [], html = "<option value=''>请选择</option>";
		for (var i = 0, len = data.length; i < len; i++) {
			html += "<option value='"+data[i].code+"'>"+data[i].name+"</option>";
			$("#productCode").html(html);
		}
	});
	$('#status').renderDropdown(Dict.getName('product_status'));
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
		doGetAjax(url, data, function(res) {
			if (res.success) {
				$("#code").html(res.data.code);
				$("#productCode").val(res.data.productCode);
				$("#name").val(res.data.name);
				$("#img1").attr('src',res.data.pic1);
				$("#img2").attr('src',res.data.pic2);
				$("#img3").attr('src',res.data.pic3);
				$("#remark").val(res.data.remark);
				description.ready(function() {
					description.setContent(res.data.description);
				});
				var specsTable=res.data.modelSpecsList;
			    var specsTableList = new Array();
			    for(var i = 0;i < specsTable.length;i++){
			    	specsTableList[i]=[specsTable[i].dkey,specsTable[i].dvalue];
				}
			    if (specsTable.length == 0) {
			    	
			    	specsTableList.push(['', '']);
			    }
			    mytable.loadData(specsTableList);
			}else{
				alert(res.msg);
			}
		});
	}
	
	//提交
	$('#subBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
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
	    
	    tableLists = mytable.getData();
		var specsTableList = new Array();
		for(var i = 0;i < tableLists.length;i++){
			if (tableLists[i][0]) {
				var specsTable =new Object();
				specsTable.dkey=tableLists[i][0];
				specsTable.dvalue=tableLists[i][1];
			    specsTableList.push(specsTable);
			}
		}
	    var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		var operator = $("#operate").val() != "edit"?"add":"edit";
		
		data['specsTableJson']=JSON.stringify(specsTableList);
		data["pic1"]=$('#pic1').next().attr("src");
		data["pic2"]=$('#pic2').next().attr("src");
		data["pic3"]=$('#pic3').next().attr("src");
		data['code']= $('#code').html();
		var url = $("#basePath").val()+"/model/" + operator;
		
		doPostAjax(url, data, doSucBackSave);
	});
	initSpecsTable();
	var code = getQueryString("code");
	if(!isBlank(code)){
		var data = {"code":code};
		var url = $("#basePath").val()+"/model/detail";
		doGetAjax(url, data, doGetDetailSpecsBack);	
	}
	
	function doGetDetailSpecsBack(res){
		if (res.success == true) {
			if(res.data != null){
				result=res.data.business;
			    
				$("#tableList").bootstrapTable("load", res.data.specsTableList);
			}else{
				alert("根据编号获取详情为空");
			}
		}else{
			alert(res.msg);
		}
	}
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			name: {
				required: true,
				maxlength: 30
			},
			productCode: "required",
			description: {
				required: true
			},
			remark: {
				maxlength: 255
			}
		}
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/model.htm";
	});
});



function initSpecsTable(){
    mytable = $('#edittable').editTable({
    	field_templates: {
    		'canshuzhi' : {
 	            html: '<input type="text" maxlength="32"/>',
 	            getValue: function (input) {
 	                return $(input).val();
 	            },
 	            setValue: function (input, value) {
 	                return $(input).attr('value', value);
 	            }
 	        },
 	       'canshuming' : {
	            html: '<input type="text" maxlength="64"/>',
	            getValue: function (input) {
	                return $(input).val();
	            },
	            setValue: function (input, value) {
	            	return $(input).attr('value', value);
	            }
	        },
    	},
	    row_template: ['canshuzhi', 'canshuming'],
	    headerCols: ['参数名','参数值'],
	    first_row: false,
	    data: [
	        ["",""]
	    ]
	});
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
	
	zipImg(file.files[0], $(document.getElementById(name)).next()[0]);
	
//	var reader = new FileReader();
//	reader.onload = function(evt){
//		document.getElementById(name).src = evt.target.result;
//		var image = evt.target.result;
//		$(document.getElementById(name)).next().attr("src",image);
//	}
//	reader.readAsDataURL(file.files[0]);
	
//	var mpImg = new MegaPixImage(file.files[0]);
//	mpImg.render($(document.getElementById(name)).next()[0], {quality: 0.5});
}



