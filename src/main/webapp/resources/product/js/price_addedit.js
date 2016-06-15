$(function() {
	//获取菜单URL入参
	var modelCode = getQueryString("modelCode");
	initBusinessTable();
	//新增修改判断
	if(isBlank(modelCode)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		var data = {"code":modelCode};
		var url = $("#basePath").val()+"/model/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	//提交
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
	    	return;
	    }
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['modelCode'] = $("#modelCode").html();
		var operator = $("#operate").val() != "edit"?"add":"edit";
		var url = $("#basePath").val()+"/model/price/" + operator;
		doPostAjax(url, data, doSucBack);
	});
	
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			originalPrice: {
				required: true,
				maxlength: 32,
			}
		},
		messages: {
			originalPrice: {
				required: "请输入原价",
				maxlength: jQuery.format("原价不能大于{0}个字符")
			}
		}
	});
	
//	$("#originalPrice").on("keydown", function(e){
//		var code = e.charCode || e.keyCode;//110.  0 96-105  48-57    37   39   8back 46del
//		console.log(code);
//		if(!isSpecialCode(code)){
//			if(/^[\d]+\.[\d]{2})$/.test(this.value) || !isNumber(code)){
//				return false;
//			}
//		}
//		
//	});
//	function isNumber(code){
//		if(code >= 96 && code <= 105 || code >= 48 && code <= 57 || code == 110){
//			return true;
//		}
//		return false;
//	}
//	function isSpecialCode(code){
//		if(code == 37 || code == 39 || code == 8 || code == 46){
//			return true;
//		}
//		return false;
//	}
	
	function initBusinessTable(){
		//绑定列表
		$('#tableList').bootstrapTable({
			striped : true,
			singleSelect : true,
			clickToSelect : true,
			columns : [{
						field : 'dkey',
						title : '参数名',
						align : 'left',
						valign : 'middle',
						sortable : false,
					},{
						field : 'dvalue',
						title : '参数值',
						align : 'left',
						valign : 'middle',
						sortable : false,
					}]
		});
	}
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/model_price.htm";
	});


	function doSuccessBack(res) {
		if (res.success == true) {
			alert("操作成功");
			window.location.href = $("#basePath").val()+"/product/model_price.htm";
		}else{
			alert(res.msg);
		}
	}
	
	
	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#modelCode").html(res.data.code);
			$("#originalPrice").val(moneyFormatter(res.data.originalPrice));
			$("#code").html(res.data.code);
			$("#productCode").html(res.data.productName);
			$("#name").html(res.data.name);
			$("#majorText").html(res.data.advTitle);
			$("#img1").attr('src',res.data.pic1);
			$("#img2").attr('src',res.data.pic2);
			$("#img3").attr('src',res.data.pic3);
			$("#description").html(res.data.description);
			$("#checkNote").html(res.data.checkNote);
			$("#tableList").bootstrapTable("load", res.data.modelSpecsList);
		}else{
			alert(res.msg);
		}
	}
});

function checknum(obj)
{   if(/^\d+\.?\d{0,2}$/.test(obj.value)){
       obj.value = obj.value;
    }else{
   obj.value = obj.value.substring(0,obj.value.length-1);
}}


function doSucBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/product/model_price.htm";
	}else{
		alert(res.msg);
	}
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}

