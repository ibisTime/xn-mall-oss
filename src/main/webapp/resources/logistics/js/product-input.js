$(function() {
	
//	var code = getQueryString('code');
//	doGetAjaxIsAsync($("#basePath").val()+"/product/list", {}, false, function(res) {
//		var data = res.data || [], html = "<option value=''>请选择</option>";
//		for (var i = 0, len = data.length; i < len; i++) {
//			html += "<option value='"+data[i].code+"'>"+data[i].name+"</option>";
//			$("#productCode").html(html);
//		}
//	});
	
	function setStartCode(el) {
		doGetAjaxIsAsync($("#basePath").val()+"/logistics/startcode", {
			modelCode: el.val()
		}, false, function(res) {
			el.parent().next().html(res.data.code);
		});
	}
	
	function setEndCode(startCode, number, rowEl) {
		if (startCode && number) {
			var parts = startCode.split('-');
			var endCode = parts[0] + '-' + (+parts[1] + (+number - 1));
		} else {
			rowEl.find('td').eq(2).html('');
		}
		rowEl.find('td').eq(2).html(endCode);
	}
	
	$('#edittable').on('change', '.select1', function() {
		setStartCode($(this));
		setEndCode($(this).parent().next().html(), $(this).parent().next().next().next().find('input').val(), $(this).parent().parent());
	});
	
	$('#edittable').on('keyup', '.number1', function() {
		setEndCode($(this).parent().prev().prev().html(), $(this).val(), $(this).parent().parent());
	});
	
	// qrcode
	
	function savePic() {
	    var img = $("#qrcode").find('img')[0];
	    var alink = document.createElement("a");
	    alink.href = img.src;
	    alink.download = "物流单专属二维码.jpg";
	    alink.click();
	}
	
	var qrcode = new QRCode('qrcode');
	$('#code').on('blur', function() {
		if (this.value) {
			qrcode.makeCode(this.value);
			$('#downloadBtn').show();
		} else {
			qrcode.clear();
			$('#qrcode').find('img').hide();
			$('#downloadBtn').hide();
		}
	});
	
	$('#downloadBtn').on('click', function() {
		savePic();
	});
	
	var modelData;
	function initSpecsTable(modelData){
		var html = '<select class="select1">';
		modelData.forEach(function(item) {
			html += '<option value="'+item.code+'">'+item.name+'</option>';
		});
		html += '</select>';
	    mytable = $('#edittable').editTable({
	    	 field_templates: {
	 	    	'displaybox': {
	 	    		html: '<span></span>',
	 	    		getValue: function (input) {
	 	                return $(input).html();
	 	            },
	 	            setValue: function (input, value) {
	 	                return $(input).html(value);
	 	            }
	 	    	},
	 	    	'number' : {
	 	            html: '<input type="text" name="number" required maxlength="11" class="number1"/>',
	 	            getValue: function (input) {
	 	                return $(input).val();
	 	            },
	 	            setValue: function (input, value) {
	 	            	return $(input).attr('value', value);
	 	            }
	 	        },
	 	       'costpricebox' : {
	 	            html: '<input type="text" name="costpricebox" required maxlength="13"/>',
	 	            getValue: function (input) {
	 	                return $(input).val();
	 	            },
	 	            setValue: function (input, value) {
	 	            	return $(input).attr('value', value);
	 	            }
	 	        },
	 	       'linshou' : {
	 	            html: '<input type="text" name="linshou" required maxlength="13"/>',
	 	            getValue: function (input) {
	 	                return $(input).val();
	 	            },
	 	            setValue: function (input, value) {
	 	            	return $(input).attr('value', value);
	 	            }
	 	        },
	 	       'textair' : {
	 	            html: '<input type="text" name="textair" required maxlength="5"/>',
	 	            getValue: function (input) {
	 	                return $(input).val();
	 	            },
	 	            setValue: function (input, value) {
	 	            	return $(input).attr('value', value);
	 	            }
	 	        },
	 	        'checkbox' : {
	 	            html: '<input type="checkbox"/>',
	 	            getValue: function (input) {
	 	                return $(input).is(':checked');
	 	            },
	 	            setValue: function (input, value) {
	 	                if ( value ){
	 	                    return $(input).attr('checked', true);
	 	                }
	 	                return $(input).removeAttr('checked');
	 	            }
	 	        },
	 	        'textarea' : {
	 	            html: '<textarea/>',
	 	            getValue: function (input) {
	 	                return $(input).val();
	 	            },
	 	            setValue: function (input, value) {
	 	                return $(input).text(value);
	 	            }
	 	        },
	 	        'select' : {
	 	            html: html,
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
	 	    maxRows: modelData.length,
	 	    afterAdd: function(row) {
	 	    	var select = row.find('.select1');
	 	    	rerenderList(select);
	 	    	select.val(select.find('option').val());
	 	    	setStartCode(select);
	 	    },
		    row_template: ['select', 'displaybox','displaybox', 'number','costpricebox', 'linshou'],
		    headerCols: ['所属型号','起始编号','终止编号','数量','成本价','零售价'],
		    first_row: false,
		    data: [
		        ["","","","","",""]
		    ]
		});
	    
	    $('#edittable').on('mousedown', '.select1', function() {
			rerenderList($(this));
		});
	    
	    setStartCode($('.select1'));
		
		function rerenderList(el) {
			var $el = el;
			var allData = modelData;
			var allDataKey = allData.map(function(item, index) {
				return '' + item.code;
			});
			var fiterValue = $('.select1').not($el).map(function() {
				return $(this).val();
			}).get();
			var showValue = Array.minus(allDataKey, fiterValue);
			var selectValue = $el.val();
			var optionTpl = '';
			showValue.each(function(item) {
				optionTpl += '<option value="'+item+'">'+Dict.findName(allData, item, 'code', 'name')+'</option>';
			});
			$el.empty().html(optionTpl);
			$el.val(selectValue);
			
		}
	}
	$("#company").renderDropdown(Dict.getName('kd_company'));
	
	//获取菜单URL入参
	var invoiceCode = getQueryString("invoiceCode");
	//新增修改判断
	if(isBlank(invoiceCode)){
		$("#product").val("add");
	}else{
		$("#invoiceCode").attr("readonly","readonly");
		var data = {"invoiceCode":invoiceCode};
		var url = $("#basePath").val()+"/model/order/detail";
		doGetAjax(url, data, function(res) {
			if (res.success) {
				$("#invoiceCode").html(res.data.code);
				var modelList = res.data.invoiceModelList || [], res = [];
				modelList.forEach(function(item) {
					var list = [item.modelCode, '', '', item.quantity, '', moneyFormat(item.salePrice)];
					res.push(list);
				});
				mytable.loadData(res);
				setStartCode($('.select1'));
				$('.select1').each(function(index, el) {
					setEndCode($(el).parent().next().html(), $(el).parent().next().next().next().find('input').val(), $(el).parent().parent());
				});
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
	    tableLists = mytable.getData();
		var specsTableList = new Array();
		for(var i = 0;i < tableLists.length;i++){
			var specsTable =new Object();
			specsTable.modelCode=tableLists[i][0];
			specsTable.codeStart=tableLists[i][1];
			specsTable.codeEnd=tableLists[i][2];
			specsTable.quantity=tableLists[i][3];
			specsTable.costPrice=moneyParse(tableLists[i][4]);
			specsTable.salePrice=moneyParse(tableLists[i][5]);
		    specsTableList.push(specsTable);
		}
	    var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['invoiceCode'] = $("#invoiceCode").html();
		data['goodsList']=JSON.stringify(specsTableList);
		data['deliveryDatetime'] = $("#deliveryDatetime").val();
		var operator = $("#operate").val() != "edit"?"add":"edit";
		
		
		var url = $("#basePath").val()+"/logistics/" + operator;
		
		doPostAjax(url, data, doSucBackSave);
	});
	
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			code: {
				required: true,
				maxlength: 32,
			},
			deliverer: {
				required: true,
				maxlength: 32
			},
			company: "required",
			deliveryDatetime: {
				required: true,
				maxlength: 255
			},
		},
		messages: {
			code: {
				required: "请输入物流单号",
				maxlength: jQuery.format("物流单号不能大于{0}个字符")
			},
			deliverer: {
				required: "请输入发货人",
				maxlength: jQuery.format("发货人不能大于{0}个字符")
			},
			company: "请选择产品",
			deliveryDatetime: {
				required: "请输入发货时间",
				maxlength: jQuery.format("发货时间不能大于{0}个字符")
			},
		}
	});
	doGetAjaxIsAsync($("#basePath").val()+"/model/list", {}, false, function(res){
		modelData = res.data || [];
		initSpecsTable(modelData);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/logistics/logistics.htm";
	});
});


//保存回调方法
function doSucBackSave(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/logistics/logistics.htm";
	}else{
		alert(res.msg);
	}
}



