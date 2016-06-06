$(function() {
	
	//获取菜单URL入参
	var code = getQueryString("code");
	initBusinessTable();
	//新增修改判断
	if(isBlank(code)){
		$("#product").val("add");
	}else{
		$("#code").attr("readonly","readonly");
		var data = {"code":code};
		var url = $("#basePath").val()+"/model/detail";
		doGetAjax(url, data, doSucBackGetDetail);
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
			$("#checkNote").html(res.data.remark);
			$("#tableList").bootstrapTable("load", res.data.modelSpecsList);
		}else{
			alert(res.msg);
		}
	}
});



