$(function () {
	var view = 1;
    
    reqApi({
		code: '802503',
		json: {
			userId: getUserId()
		}
	}).done(function(data) {
		$("#amount-CNY").text("￥"+data[0].amount/1000)
		$("#amount-CGB").text(data[2].amount/1000+"菜狗币")
		$("#amount-JF").text(data[1].amount/1000+"积分")
	});
    
    $('#saleBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		var dw = dialog({
			content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			'<ul class="form-info" id="formContainer"></ul>'+
			'</form>'
		});
		
		dw.showModal();
		buildDetail({
			fields: [{
				field: 'toUserId',
				title: '售卖用户',
				required: true,
				type: 'select',
				pageCode: 805054,
				upd: false,
				params: {
					userReferee: getUserId(),
					updater:''
				},
				keyName: 'userId',
				valueName: '{{realName.DATA}} - {{mobile.DATA}}',
				searchName: 'mobile',
				
			},{
				title: '数量',
				field: 'amount',
				formatter:moneyFormat,
				required: true
			}],
			container: $('#formContainer'),
			buttons: [{
				title: '售卖',
				handler: function() {
					
					if($('#toUserId').val()==""){
						toastr.error("售卖用户不能为空");
					}else if($('#amount').val()==""){
						toastr.error("数量不能为空");
					}else if ($('#popForm').valid()) {
						
						var data = $('#popForm').serializeObject();
						data.storeOwner = getUserId();
						data.mobile = $("#toUserId").val();
						data.currency = "CGB";
						reqApi({
							code: '808800',
							json: data
						}).done(function(data) {
							sucList();
							dw.close().remove();
						});
					}
				}
			}, {
				title: '取消',
				handler: function() {
					dw.close().remove();
				}
			}]
		});
		dw.__center();
	});
	
	$('#grantBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		var dw = dialog({
			content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			'<ul class="form-info" id="formContainer"></ul>'+
			'</form>'
		});
		
		dw.showModal();
		buildDetail({
			fields: [{
				title: '发放用户',
				field: 'toUserId',
				type:'select',
				listCode:"805055",
				params:{
					userReferee: getUserId(),
					kind:"f1"
				},
				keyName: 'userId',
				valueName: 'nickname',
				required: true
			},{
				title: '数量',
				field: 'amount',
				formatter:moneyFormat,
				required: true
			}],
			container: $('#formContainer'),
			buttons: [{
				title: '发放',
				handler: function() {
					if ($('#popForm').valid()) {
						
						var data = $('#popForm').serializeObject();
						data.fromUserId = getUserId();
						data.currency = "JF";
						reqApi({
							code: '808801',
							json: data
						}).done(function(data) {
							sucList();
							dw.close().remove();
						});
					}
				}
			}, {
				title: '取消',
				handler: function() {
					dw.close().remove();
				}
			}]
		});
		dw.__center();
	});

	
	$('#purchaseBtn-CGB').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		var dw = dialog({
			content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			'<ul class="form-info" id="formContainer"></ul>'+
			'</form>'
		});
		
		dw.showModal();
		buildDetail({
			fields: [{
				title: '购买数量',
				field: 'amount',
				formatter:moneyFormat,
				required: true,
				onKeyup: function(v){
					$("#price").html(v*1);
				}
			},{
				title: '金额',
				field: 'price',
				formatter:moneyFormat,
        		readonly: view
			}],
			container: $('#formContainer'),
			buttons: [{
				title: '购买',
				handler: function() {
					if ($('#popForm').valid()) {
						
						var data = $('#popForm').serializeObject();
						
						if (data.length <= 0) {
				            toastr.info("请选择记录");
				            return;
				        }
						
						data.fromUserId = getUserId();
						data.toUserId = OSS.SYS_USER;
						data.currency = "CGB";
						reqApi({
							code: '802530',
							json: data
						}).done(function(data) {
							sucList();
							
							dw.close().remove();
							var dw1 = dialog({
								title:'扫描微信二维码付款',
								content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
								'<div id="qrcode"></div></form>',
								quickClose: true,
							});
							
							dw1.showModal();
							
							var qrcode = new QRCode('qrcode',data);
						 	qrcode.makeCode(data);
						
					});
					
//						var data = $('#popForm').serializeObject();
//						data.fromUserId = getUserId();
//						data.currency = "JF";
//						reqApi({
//							code: '808801',
//							json: data
//						}).done(function(data) {
//							sucList();
//							dw.close().remove();
//						});
					}
				}
			}, {
				title: '取消',
				handler: function() {
					dw.close().remove();
				}
			}]
		});
		dw.__center();
		h ="<br/><p class='huilv'>当前汇率1</p>";
					$(h).insertAfter("#amount");
	});
	
	
    
});