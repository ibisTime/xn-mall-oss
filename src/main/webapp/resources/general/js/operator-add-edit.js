var introduction = UE.getEditor('introduction');
var image = '';
//页面初始化
var dictIdKind = null;
var dictLevel = null;
var dictStatus = null;
$(function(){
	//页面数据字典初始化
	$('#level').renderDropdown(Dict.getName('operator_level'));
	initData();
	var userId = getQueryString("userId");
	//新增修改判断
	if(isBlank(userId)){
		$(".editShow").hide();
		$("#operate").val("add");
		$("#img").hide();
		
	}else{
		$("#userId").attr("disabled", 'disabled');
		$("#editHide ").hide();
		$("#realName").attr("disabled","disabled");
		$("#operate").val("edit");
		$("#operContent").text("修改操盘手");
		var data = {"userId":userId};
		var url = $("#basePath").val()+"/general/operator/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	//提交
	$('#subBtn').click(function() {
		if(isBlank(image)){
			alert("请上传头像");
			return;
		}
	    if(!$("#jsForm").valid()){
			return false;
		}
	    $("#userId").removeAttr("disabled");
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data["photo"]=image;
		var url = $("#basePath").val()+"/general/operator/" + $("#operate").val();
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/general/operator.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			userId: {
				required: true,
				isZipCode:true,
				maxlength: 32
			},
			mobile: {
				required: true,
				mobile: true,
				maxlength: 16
			},
			realName: {
				required: true,
				maxlength: 16
			},level: {
				required: true,
				maxlength: 32
			},
			introduction: {
				required: true,
				maxlength: 255
			},
			remark: {
				required: false,
				maxlength: 255
			}
		},
		messages: {
			userId: {
				required: "请选择用户编号",
				maxlength: jQuery.format("用户编号不能大于{0}个字符")
			},
			mobile: {
				required: "请输入手机号",
				mobile: "手机号格式有误",
				maxlength: jQuery.format("手机号不能大于{0}个字符")
			},
			realName: {
				required: "请输入真实姓名",
				maxlength: jQuery.format("真实姓名不能大于{0}个字符")
			},
			level: {
				required: "请选择等级",
			},
			introduction: {
				required: "请输入简介",
				maxlength: jQuery.format("简介不能大于{0}个字符")
			},
			remark: {
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function initData(){
	doGetAjaxIsAsync($("#basePath").val()+"/user/list", {
		'kind': 3,
	}, false, doSucBackUser);
}

//数据字典（用户）关联的回执方法
function doSucBackUser(res){
	secUser = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(secUser) != "undefined"){//判断undifined
		for(var i = 0;i < secUser.length;i++){
			html += "<option value='"+secUser[i].userId+"'>"+secUser[i].userId+" "+secUser[i].realName+"</option>";
		}
	}
	$("#userId").html(html);
}


function doSucBackGetDetail(res){
	if (res.success) {
		$("#userId").val(res.data.userId);
		$("#mobile").val(res.data.mobile);
		$("#level").val(res.data.level);
		introduction.ready(function(){
		    //需要ready后执行，否则可能报错
			introduction.setContent(res.data.introduction);
		});
		image = res.data.photo;
		$("#remark").val(res.data.remark);
		$("#img").attr('src',res.data.photo);
	}else{
		alert(res.msg);
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/general/operator.htm";
	}else{
		alert(res.msg);
	}
}
//图片上传转化
function selectImage(file,name){
	if(!file.files || !file.files[0]){
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt){
		document.getElementById('photo').src = evt.target.result;
		image = evt.target.result;
		$("#img").show();
		$("#img").attr("src",image);
	}
	reader.readAsDataURL(file.files[0]);
}
