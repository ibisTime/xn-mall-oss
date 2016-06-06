$(function() {
	
	
	//获取菜单URL入参
	var code = getQueryString("code");
	//新增修改判断
	initBusinessTable();
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		var data = {"code":code};
		var url = $("#basePath").val()+"/model/detail";
		doGetAjax(url, data, doSucBackGetDetail);
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
	$('#passBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		doAprove(1);
	});
	$('#noPassBtn').click(function() {
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
		location.href = $("#basePath").val()+"/product/model.htm";
	});
	function doAprove(checkResult){
		var data = {"checkNote":$("#checkNote").val(),"checkResult":checkResult,"code":code};
		var url = $("#basePath").val()+"/model/check";
		doPostAjax(url, data, doSuccessBack);
	}
	
	function doSuccessBack(res) {
		if (res.success == true) {
			alert("操作成功");
			window.location.href = $("#basePath").val()+"/product/model.htm";
		}else{
			alert(res.msg);
		}
	}
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

	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#code").html(res.data.code);
			$("#productCode").html(res.data.productName);
			$("#name").html(res.data.name);
			$("#majorText").html(res.data.advTitle);
			$("#img1").attr('src',res.data.pic1);
			$("#img2").attr('src',res.data.pic2);
			$("#img3").attr('src',res.data.pic3);
			$("#description").html(res.data.description);
			$("#tableList").bootstrapTable("load", res.data.modelSpecsList);
		}else{
			alert(res.msg);
		}
	}
});








