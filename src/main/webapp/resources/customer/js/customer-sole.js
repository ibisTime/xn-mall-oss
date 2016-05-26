var userId="";
var dictIdKind=null;
var dictStatus=null;
var dictLevel=null;
$(function() {
	//页面数据字典初始化
	initData();
	//$('#loginStatusSearch').renderDropdown(Dict.getName('login_status'));
	// 表格初始化
	userId=getQueryString("userId");
	var data={"userId":userId};
	var url = $("#basePath").val()+"/customer/detail";
	doGetAjax(url,data,function(res) {
		$('#userId').val(res.data.userId);
		$('#userName').val(res.data.realName);
	});
	var soleData = [];
	doGetAjax( $("#basePath").val() + '/individual/list', {"status": 1}, function(res) {
		soleData = res.data || [];
		$('#individualCode').renderDropdown(soleData, 'code', 'name');
		if (soleData.length > 0) {
			$('#individualCode').val(soleData[0].code);
			$('#individualCode').prop('disabled', true);
			showSole(soleData[0]);
		}
		
	});
	
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
		var data = $('form').serializeObject();
		doPostAjax($("#basePath").val() + '/customer/sole/apply', data, function(res) {
			if (res.success) {
				alert("操作成功");
				window.location.href = $("#basePath").val()+"/customer/customer.htm";
			}else{
				alert(res.msg);
			}
		});
	});
	
	function showSole(record) {
		$('.serveCtn input[type=checkbox]').prop('checked', false);
		$('.quoteCtn input[type=checkbox]').prop('checked', false);
		$('#degree').val('');
		if (record) {
			var serveList = record.serveList.split('');
			while (serveList.length > 0) {
				var serve = serveList.pop();
				$('.serveCtn input[name='+serve+']').prop('checked', true);
			}
			var quoteList = record.quoteList.split('');
			while (quoteList.length > 0) {
				var quote = quoteList.pop();
				$('.quoteCtn input[name='+quote+']').prop('checked', true);
			}
			$('#degree').val(record.level);
		}
		
	}
	
	$('#individualCode').on('change', function() {
		var record;
		for (var i = 0, len = soleData.length; i < len; i++) {
			if (soleData[i].code == this.value) {
				record = soleData[i];
				break;
			}
		}
		showSole(record);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/customer.htm";
	});
	
	$("#jsForm").validate({
		rules: {
			individualCode: {
				required: true,
				maxlength: 64
			}
		},
		messages: {
			individualCode: {
				required: "请选择个体户",
				maxlength: jQuery.format("个体户不能大于{0}个字符")
			}
		}
	});
});


function initData(){
	
}

