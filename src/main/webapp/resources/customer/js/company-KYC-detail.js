//账户状态
var dictCustomerLevel = null;
//渠道
var channel = null;
var idStr = "";
var idStr2 = "";
$(function() {
	//页面数据字典初始化
	$('#level').renderDropdown(Dict.getName('customer_level'));
	initData();
	tree();
	var companyId = getQueryString("companyId");
	var data = {"code":companyId};
	var url = $("#basePath").val()+"/company/detail";
	doGetAjax(url, data, doGetDetailBack);
	
	//提交
	$('#passBtn').click(function() {
		modifyPermissions();
		if(!checkData()){
			return;
		}
		doApprove("1");
	});
	
	//提交
	$('#noPassBtn').click(function() {
		modifyPermissions();
		if(!$('#kycNote').val()){
			alert("请输入理由说明");
			return false;
		}
		doApprove("0");
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/company_KYC.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			kycNote: {
				required: true,
				maxlength: 64
			}
		},
		messages: {
			kycNote: {
				required: "请输入理由说明",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function checkData(){
	if(isBlank(idStr)){
		alert("请选择服务");
		return false;
	}
	if(isBlank(idStr2)){
		alert("请选择报价模式");
		return false;
	}
	if (!$('#level').val()) {
		alert("请选择用户等级");
		return false;
	}
	return true;
}

function onChangeBank(id){
	
	$('#bankCardList').bootstrapTable("removeAll");
	if(!isBlank(id)){
		$('#bankCardList').bootstrapTable('refresh',{url: $("#basePath").val()+"company/list?companyId="+id});
	}
}

function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data != null){
			var result = res.data;
			$("#companyId").html(result.code);
			$("#companyName").html(result.name);
			$("#licenceNo").html(result.gsyyzzNo);
			$("#realName").html(result.realName);
			$("#idNo").html(Dict.getName('id_kind', result.idKind) + ' ' + result.idNo);
			$("#capital").html(moneyFormatter(result.capital)+' '+Dict.getName('currency',result.currency));
			$("#province").html(result.province+" "+result.city);
			$("#gsyyzzPicture").attr({"src":result.gsyyzzPicture});
			$("#zzjgdmzPicture").attr({"src":result.zzjgdmzPicture});
			$("#swdjzPicture").attr({"src":result.swdjzPicture});
			$("#frPicture").attr({"src":result.frPicture});
			$("#dzzPicture").attr({"src":result.dzzPicture});
			$("#otherPicture").attr({"src":result.otherPicture});
			
			// 加载银行账户数据
			$('#bankCardList').bootstrapTable({
				striped : true,		
				data: result.fdCompanyCardList,
				columns : [{
		  			field : 'companyName',
		  			title : '公司名称',
		  			align : 'center',
		  			valign : 'middle',
		  			sortable : false
		  		}, {
		  			field : 'bankName',
		  			title : '银行名称',
		  			align : 'center',
		  			valign : 'middle',
		  			sortable : false,
		  		},{
		  			field : 'subbranch',
		  			title : '开户支行',
		  			align : 'center',
		  			valign : 'middle',
		  			sortable : false
		  		},{
		  			field : 'cardNo',
		  			title : '银行账号',
		  			align : 'center',
		  			valign : 'middle',
		  			sortable : false
		  		}]
			});
			
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}
 


function doApprove(kycResult){
	if(!$("#jsForm").valid()){
		return false;
	}
	var data = {"code":$("#companyId").html(),"kycResult":kycResult,"kycNote":$("#kycNote").val(),"serveList":idStr,"quoteList":idStr2,"level":$("#level").val()};
	var url = $("#basePath").val()+"/company/kyc";
	doPostAjax(url, data, doSuccessBack);
}
	
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/customer/company_KYC.htm";
	}else{
		alert(res.msg);
	}
}
//初始化数据字典
function initData(){
}




function createNode(){
	  var root = {
	    "id" : "0",
	    "text" : "root",
	    "value" : "",
	    "showcheck" : true,
	    "complete" : true,
	    "isexpand" : true,
	    "checkstate" : 0,
	    "hasChildren" : true
	  };
	  var arr = [];
	  var subarr = [];
	      subarr.push( {
	         "id" : "10",
	         "text" : "现金管理",
	         "value" :"A",
	         "showcheck" : true,
	         "complete" : true,
	         "isexpand" : false,
	         "checkstate" : 0,
	         "hasChildren" : false
	      });
	     subarr.push( {
	         "id" : "11",
	         "text" : "贸易重构",
	         "value" :"B",
	         "showcheck" : true,
	         "complete" : true,
	         "isexpand" : false,
	         "checkstate" : 0,
	         "hasChildren" : false
	      });
	     subarr.push( {
	         "id" : "12",
	         "text" : "财报优化",
	         "value" :"C",
	         "showcheck" : true,
	         "complete" : true,
	         "isexpand" : false,
	         "checkstate" : 0,
	         "hasChildren" : false
	      });
	     subarr.push( {
	         "id" : "13",
	         "text" : "市值管理",
	         "value" :"D",
	         "showcheck" : true,
	         "complete" : true,
	         "isexpand" : false,
	         "checkstate" : 0,
	         "hasChildren" : false
	      });
	     subarr.push( {
	         "id" : "14",
	         "text" : "等分模式",
	         "value" :"1",
	         "showcheck" : true,
	         "complete" : true,
	         "isexpand" : false,
	         "checkstate" : 0,
	         "hasChildren" : false
	      });
	     subarr.push( {
	         "id" : "15",
	         "text" : "优先劣后模式",
	         "value" :"2",
	         "showcheck" : true,
	         "complete" : true,
	         "isexpand" : false,
	         "checkstate" : 0,
	         "hasChildren" : false
	      });
	     subarr.push( {
	         "id" : "16",
	         "text" : "企业降本",
	         "value" :"E",
	         "showcheck" : true,
	         "complete" : true,
	         "isexpand" : false,
	         "checkstate" : 0,
	         "hasChildren" : false
	      });
	    arr.push( {
	      "id" : "1",
	      "text" : "服务类型",
	      "value" : "",
	      "showcheck" : true,
	      "complete" : true,
	      "isexpand" : true,
	      "checkstate" : 0,
	      "hasChildren" : true,
	      "ChildNodes" : subarr
	    });
	  root["ChildNodes"] = arr;
	  return root; 
	}
function createNode2(){
	  var root = {
	    "id" : "0",
	    "text" : "root",
	    "value" : "",
	    "showcheck" : true,
	    "complete" : true,
	    "isexpand" : true,
	    "checkstate" : 0,
	    "hasChildren" : true
	  };
	  var arr = [];
	  var subarr = [];
	      subarr.push( {
	         "id" : "10",
	         "text" : "年化自然日",
	         "value" :"A",
	         "showcheck" : true,
	         "complete" : true,
	         "isexpand" : false,
	         "checkstate" : 0,
	         "hasChildren" : false
	      });
	     subarr.push( {
	         "id" : "11",
	         "text" : "年化工作日",
	         "value" :"B",
	         "showcheck" : true,
	         "complete" : true,
	         "isexpand" : false,
	         "checkstate" : 0,
	         "hasChildren" : false
	      });
	     subarr.push( {
	         "id" : "12",
	         "text" : "分成",
	         "value" :"C",
	         "showcheck" : true,
	         "complete" : true,
	         "isexpand" : false,
	         "checkstate" : 0,
	         "hasChildren" : false
	      });
	     subarr.push( {
	         "id" : "13",
	         "text" : "保底加分成",
	         "value" :"D",
	         "showcheck" : true,
	         "complete" : true,
	         "isexpand" : false,
	         "checkstate" : 0,
	         "hasChildren" : false
	      });
	    arr.push( {
	      "id" : "1",
	      "text" : "报价模式",
	      "value" : "",
	      "showcheck" : true,
	      "complete" : true,
	      "isexpand" : true,
	      "checkstate" : 0,
	      "hasChildren" : true,
	      "ChildNodes" : subarr
	    });
	 
	  root["ChildNodes"] = arr;
	  return root; 
	}
function tree(){
	treedata = [createNode()];
	treedata2 = [createNode2()];
	          function load() {         
	            
	              var o = { showcheck: true
	              //onnodeclick:function(item){alert(item.text);},        
	              };
	              var o2 = { showcheck: true
	    	              //onnodeclick:function(item){alert(item.text);},        
	    	              };
	              o.data = treedata; 
	              o2.data = treedata2; 
	              $("#tree").treeview(o);
	              $("#tree2").treeview(o2);
	          }
	          if( 'undefined' == typeof(document.body.style.maxHeight)){  
	           					   load();
	         					 }
	          else{  
	              $(document).ready(load);
	          }
}
function modifyPermissions(){
	idStr = "";
    var nodes =  $("#tree").getTSNs(true);//获取所有的勾选节点，包括半勾选
    $.each(nodes, function(i,value){      
        var code = value.value;
        if(code!='###'){
            idStr += i ==1 ? code : "" + code;
        }
    });
    var nodes =  $("#tree2").getTSNs(true);//获取所有的勾选节点，包括半勾选
    
    idStr2 = "";
    $.each(nodes, function(i,value){      
        var code = value.value;
        if(code!='###'){
            idStr2 += i ==1 ? code : "" + code;
        }
    });
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#bankCardList').bootstrapTable({
		columns : [
		 {
			field : 'ownerId',
			title : '姓名',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'ownerName',
			title : '手机号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'type',
			title : '类型',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'bankName',
			title : '银行名称',
			align : 'left',
			valign : 'middle',
			sortable : false,
		},{
			field : 'subbranch',
			title : '开户支行',
			align : 'left',
			valign : 'middle',
			sortable : false
		}]
	});
}