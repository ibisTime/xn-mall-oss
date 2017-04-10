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
    
    $('#accoutSaleBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		var dw = dialog({
			content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			'<ul class="form-info" id="formContainer"></ul>'+
			'</form>'
		});
		
		dw.showModal();
		buildDetail({
			fields: [{
				title: '菜狗币',
				field: 'rollbackNote',
				readonly: view
			},{
				title: '商家',
				field: 'mobile',
				required: true
			},{
				title: '额度',
				field: 'amount',
				required: true
			}],
			container: $('#formContainer'),
			buttons: [{
				title: '通过',
				handler: function() {
					if ($('#popForm').valid()) {
						var selRecords = $('#tableList').bootstrapTable('getSelections');
						var code = [];
						selRecords.forEach(function(i) {
							code.push(i.code);
						});
						var data = $('#popForm').serializeObject();
						data.codeList = code;
						data.rollbackResult = '1';
						data.rollbackUser = getUserName();
						data.order = data.code;
						reqApi({
							code: '802511',
							json: data
						}).done(function(data) {
							sucList();
							dw.close().remove();
						});
					}
				}
			}, {
				title: '不通过',
				handler: function() {
					if ($('#popForm').valid()) {
						var selRecords = $('#tableList').bootstrapTable('getSelections');
						var code = [];
						selRecords.forEach(function(i) {
							code.push(i.code);
						});
						var data = $('#popForm').serializeObject();
						data.codeList = code;
						data.rollbackResult = '0';
						data.rollbackUser = getUserName();
						data.order = data.code;
						reqApi({
							code: '802511',
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
	
	$('#accoutGrantBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		var dw = dialog({
			content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			'<ul class="form-info" id="formContainer"></ul>'+
			'</form>'
		});
		
		dw.showModal();
		buildDetail({
			fields: [{
				title: '积分',
				field: 'rollbackNote',
				readonly: view
			},{
				title: '商家',
				field: 'mobile',
				required: true
			},{
				title: '额度',
				field: 'amount',
				required: true
			}],
			container: $('#formContainer'),
			buttons: [{
				title: '通过',
				handler: function() {
					if ($('#popForm').valid()) {
						var selRecords = $('#tableList').bootstrapTable('getSelections');
						var code = [];
						selRecords.forEach(function(i) {
							code.push(i.code);
						});
						var data = $('#popForm').serializeObject();
						data.codeList = code;
						data.rollbackResult = '1';
						data.rollbackUser = getUserName();
						data.order = data.code;
						reqApi({
							code: '802511',
							json: data
						}).done(function(data) {
							sucList();
							dw.close().remove();
						});
					}
				}
			}, {
				title: '不通过',
				handler: function() {
					if ($('#popForm').valid()) {
						var selRecords = $('#tableList').bootstrapTable('getSelections');
						var code = [];
						selRecords.forEach(function(i) {
							code.push(i.code);
						});
						var data = $('#popForm').serializeObject();
						data.codeList = code;
						data.rollbackResult = '0';
						data.rollbackUser = getUserName();
						data.order = data.code;
						reqApi({
							code: '802511',
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
    
    
});