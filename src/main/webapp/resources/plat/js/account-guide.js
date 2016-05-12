var companyCode = null;
$(function() {
	//初始化数据字典
	initData();
	
	queryTableData();
});
function initData(){	
	var url = $("#basePath").val() + "/plat/company/list";
	doGetAjaxIsAsync(url, {
		orderColumn: 'zwName',
		orderDir: 'asc'
	}, false, doSuccessBackCompany);
	
	var url = $("#basePath").val() + "/subbank/list";
	doGetAjaxIsAsync(url, {
		orderColumn: 'name',
		orderDir: 'asc',
		status: '1'
	}, false, doSuccessBackBank);
}

function clearData(part) {
	if (part == 1) {
		$("#ywName").html('');
		$("#zcAddress").html('');
		$("#capital").html('');
		$("#jyAddress").html('');
		$("#frPerson").html('');
		$("#cwPerson").html('');
		$("#debdtxPerson").html('');
		$("#wyRecorder").html('');
		$("#wyChecker").html('');
		$("#telephone").html('');
		$("#remark").html('');
		$("#personsTableList").bootstrapTable("removeAll")
	} else if (part == 2) {
		$("#khjlPerson").html('');
		$("#khjlContact").html('');
		$("#address").html('');
		$("#remark2").html('');
		$("#bringSampleUrl").html('');
	}
}

function onChangeCompany(code){
	if (!code) {
		clearData(1);
		return;
	}
	var data = {"code":code};
	var url = $("#basePath").val()+"/plat/company/detail";
	doGetAjax(url, data, doGetDetailBack);
	//查询相关人员信息
	$('#personsTableList').bootstrapTable("removeAll");
	if(!isBlank(code)){
		$('#personsTableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/plat/companypersons/list?companyCode="+code});
	}
}

function doGetDetailBack(res){
	if (res.success) {
		
			$("#ywName").html(res.data.ywName);
			$("#zcAddress").html(res.data.zcAddress);
			$("#capital").html(res.data.capital + ' ' + Dict.getName("currency",res.data.currency));
			$("#jyAddress").html(res.data.jyAddress);
			$("#frPerson").html(res.data.frPerson);
			$("#cwPerson").html(res.data.cwPerson);
			
			$("#debdtxPerson").html(res.data.debdtxPerson);
			$("#wyRecorder").html(res.data.wyRecorder);
			$("#wyChecker").html(res.data.wyChecker);
			$("#telephone").html(res.data.telephone);
			$("#remark").html(res.data.remark);
		
	}else{
		alert(res.msg);
	}
}

function onChangeBank(code){
	if (!code){
		clearData(2);
		return;
	}
	var data = {"code":code};
	var url = $("#basePath").val()+"/subbank/detail";
	doGetAjax(url, data, doGetBankDetailBack);
}

function doGetBankDetailBack(res){
	if (res.success == true) {
		
			$("#khjlPerson").html(res.data.khjlPerson);
			$("#khjlContact").html(res.data.khjlContact);
			$("#address").html(res.data.address);
			$("#remark2").html(res.data.remark);
//			var swiftCode = res.data.swiftCode;
//		    if(!isBlank(swiftCode)){
//		    	$("#swiftCode").text(swiftCode.substring(swiftCode.lastIndexOf('/')+1));
//		    	$("#swiftCode").attr('href',swiftCode);
//		    }
		
	}else{
		alert(res.msg);
	}
}

function doSuccessBackCompany(res){
	dictCompany = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictCompany) != "undefined"){//判断undifined
		for(var i = 0;i < dictCompany.length;i++){
			html += "<option value='"+dictCompany[i].code+"'>"+dictCompany[i].zwName+"</option>";
		}
	}
	$("#companyCode").html(html);
}

//银行数据字典
function doSuccessBackBank(res){
	dictBank = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictBank) != "undefined"){//判断undifined
		for(var i = 0;i < dictBank.length;i++){
			html += "<option value='"+dictBank[i].code+"'>"+dictBank[i].bankName+" "+dictBank[i].name+"</option>";
		}
	}
	$("#subbranchCode").html(html);
}

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#personsTableList').bootstrapTable({
		columns : [
		 {
			field : 'code',
			title : '人员编号',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		}, {
			field : 'realName',
			title : '姓名',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'mobile',
			title : '手机号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'telephone',
			title : '座机',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'idKind',
			title : '证件类型',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('id_kind')
		}, {
			field : 'idNo',
			title : '证件号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'idYxq',
			title : '证件有效期',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'remark',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false
		}]
	});
}