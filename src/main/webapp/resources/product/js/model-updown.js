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
		location.href = $("#basePath").val()+"/product/model_publish.htm";
	});
	function doAprove(checkResult){
		var data = {"checkNote":$("#checkNote").val(),"checkResult":checkResult,"code":code};
		var url = $("#basePath").val()+"/model/updown";
		doPostAjax(url, data, doSuccessBack);
	}

	function doSuccessBack(res) {
		if (res.success == true) {
			alert("操作成功");
			window.location.href = $("#basePath").val()+"/product/model_publish.htm";
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
			$("#checkNote").html(res.data.checkNote);
			$("#tableList").bootstrapTable("load", res.data.modelSpecsList);
		}else{
			alert(res.msg);
		}
	}
});



