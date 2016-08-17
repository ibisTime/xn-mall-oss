$(function() {
	
	var code = getQueryString("code");
	var modelCode;
	$('#toSite').renderDropdown(Dict.getName('model_pos'));
	doGetAjax($("#basePath").val()+"/model/price/detail", {
		code: code
	}, doSucBackGetDetail);
	var isUp = false;
	$('#tableList').bootstrapTable({
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		columns : [{
					field : 'dkey',
					title : '参数名',
					align : 'center'
				},{
					field : 'dvalue',
					title : '参数值',
					align : 'center'
				}]
	});
	$("#jsForm").validate({
		rules: {
			originalPrice:  {
				amount: true
			},
			discountPrice:  {
				amount: true
			},
			toSite: {
			},
			remark: {
				maxlength: 250
			}
		}
	});
	$('#upDownBtn').click(function() {
		if (!isUp) {
			$('#originalPrice').rules('add', {required: true});
			$('#discountPrice').rules('add', {required: true});
			$('#toSite').rules('add', {required: true});
		} else {
			$('#remark').rules('add', {required: true});
		}
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['originalPrice']= moneyParse(data['originalPrice']);
		data['discountPrice']= moneyParse(data['discountPrice']);
		data['isUp'] = isUp;
		data['modelCode'] = modelCode;
		var url = $("#basePath").val()+"/model/updown";
		doPostAjax(url, data, function(res) {
			if (res.success) {
				alert('操作成功');
				location.href = $("#basePath").val()+"/product/model_publish.htm";
			}
		});
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/product/model_publish.htm";
	});

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
			var data = res.data;
			$("#code").val(data.code);
			$("#modelName").html(data.model.name);
			$("#productCode").html(data.model.productName);
			$("#costPrice").html(moneyFormat(data.costPrice));
			$("#fromQuantity").html(data.fromQuantity);
			$("#tableList").bootstrapTable("load", res.data.modelSpecsList);
			$('#originalPrice').val(moneyFormat(res.data.originalPrice));
			$('#discountPrice').val(moneyFormat(res.data.discountPrice));
			$('#toSite').val(res.data.toSite || '');
			$('#remark').val(res.data.remark || '');
			modelCode = data.model.code;
			isUp = !!(data.status == 1);
			isUp && $('#upDownBtn').val('下架');
		}else{
			alert(res.msg);
		}
	}
});



