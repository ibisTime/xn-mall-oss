$(function() {
	$("#code").val(getQueryString("code"));
	$("#name").val(decodeURI(getQueryString("name")));
	
	//下拉菜单
	var data = {roleCode:$("#code").val(),kind:"1"};
	doGetAjaxIsAsync($("#basePath").val()+"/role/checkedList", data, false, doMenuNode);
	
	$("#subBtn").click(function() {
		var menuList = new Array();
	    var menuData = $("#treeMenu").ligerGetTreeManager().getChecked();
		for (var i = 0; i < menuData.length; i++){
			menuList[i] = menuData[i]['data']['id'];
		}
		var url = $("#basePath").val()+"/role/menuRole/change";
    	var data = {roleCode:$("#code").val(),menuList:menuList};
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/security/role.htm";
	});
});

function doMenuNode(nodes){
	$("#treeMenu").ligerTree({
		nodeWidth:300,
		data:nodes.data,
		checkbox: true,
		isExpand: true,
		idFieldName: 'id',
        parentIDFieldName: 'pid'
	});
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/security/role.htm";
	}else{
		alert(res.msg);
	}
}
