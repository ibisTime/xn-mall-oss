$(function() {
	// 表格初始化
	var code=getQueryString("code");
	
	if (!window.parent.frames[0]) {
		$('.btn-groups').hide();
	}
	
	var data={"code":code};
	var url = $("#basePath").val()+"/individual/detail";
	doGetAjax(url,data,function(res) {
		if (res.success) {
			var data = res.data;
			$('#name').html(data.name);
			var serveList = data.serveList.split('');
			while (serveList.length > 0) {
				var serve = serveList.pop();
				$('.serveCtn input[name='+serve+']').prop('checked', true);
			}
			var quoteList = data.quoteList.split('');
			while (quoteList.length > 0) {
				var quote = quoteList.pop();
				$('.quoteCtn input[name='+quote+']').prop('checked', true);
			}
			$('#level').html(data.level);
			$('#status').html(Dict.getName('ind_status', data.status));
		}
	});
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/individual.htm";
	});
	
	$('#activeBtn').click(function() {
		doGetAjax($("#basePath").val() + '/individual/active', {
			code: code,
			status: 1
		}, function(res) {
			if (res.success) {
				alert('启用成功');
				location.href = $("#basePath").val()+"/customer/individual.htm";
			} else {
				alert(res.msg);
			}
		});
	});
});