$(function() {
	var code = getQueryString('code');
	if (code) {
		doGetAjax($("#basePath").val()+"/vendor/kind/detail", {
			code: code
		}, function(res) {
			if (res.success) {
				var data = res.data;
				$('#code').val(code);
				$('#name').val(data.name);
				$('#orderNo').val(data.orderNo);
				$('#img1').attr('src', data.pic);
			}
		});
	}
	
	//提交
	$('#subBtn').click(function() {
		if ($('#jsForm').valid()) {
			if (!$('#img1').attr('src')) {
				alert('请上传图片！');
				return;
			}
			var data = {};
			var t = $('#jsForm').serializeArray();
			$.each(t, function() {
				data[this.name] = this.value;
			});
			data['pic'] = $('#img1').attr('src');
			var url = $("#basePath").val()+"/vendor/kind/" + (code ? 'edit' : 'add');
			ajaxPost(url, data).then(function(res) {
				if (res.success) {
					alert("操作成功");
					goBack();
				}
			});
		}
		
	});
	
	//返回
	$('#backBtn').click(function() {
		goBack();
	});
	
	
	$("#jsForm").validate({
		rules: {
			name: {
				required: true,
				maxlength: 64
			},
			orderNo: {
				required: true,
				maxlength: 10,
				digits: true
			}
		}
	});
	
});

function selectImage(file,name){
	if(!file.files || !file.files[0]){
		return;
	}
	zipImg(file.files[0], document.getElementById(name));
}