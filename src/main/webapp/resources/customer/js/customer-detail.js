var userId="";
var dictIdKind=null;
var dictStatus=null;
$(function() {
	// 表格初始化
	userId=getQueryString("userId");
	var data={"userId":userId};
	var url = $("#basePath").val()+"/customer/detail";
	doGetAjax(url,data,doSuccessData);
	 // 记录查询
	$(".tabson").hide();
	$("#customer").show()
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/customer.htm";
	});
});

function doSuccessData(res){
	if (res.success) {
		var result = res.data;
		$("#userId").html(result.userId);
		$('#pdf').html(linkSrc(result.pdf));
		$("#mobile").html(result.mobile);
		var scoreList = [{
			userId: 'U201600000000000001',
			loginName: '菜狗平台'
		}];
		var scoreDict = {};
		
		ajaxGet($('#basePath').val() + '/user/score/list', {}, false, true).then(function(res) {
			if (res.success) {
				scoreList = scoreList.concat(res.data);
				scoreList.forEach(function(i) {
					scoreDict[i.userId] = i.loginName;
				});
			}
		});
		$("#userReferee").html(scoreDict[result.userReferee]);
		$("#remark").html(result.remark);
		$("#status").html(Dict.getUserStatusName(result.status));
		$("#updateDatetime").html(dateTimeFormat(result.updateDatetime));
	}else{
		alert(res.msg);
	}
}