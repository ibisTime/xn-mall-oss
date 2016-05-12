var dictServe=null;
var dictQuote=null;
var dictLevel=null;
var dicttype=null;
var subjectCode=null;
var businessTableType=null;
var businessTableIncome=null;
var businessTableCost=null;
var businessTableProfit=null;
var businessTableProject=null;
$(function(){
    //页面数据字典初始化
	initData();
	//获取项目详情
	subjectCode=getQueryString("subjectCode");
	var data = {"subjectCode":subjectCode};
	var url = $("#basePath").val()+"/project/subject/detail";
	doGetAjax(url, data, doGetDetailProjectBack);
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			name: {
				required: true,
				maxlength: 64
			},
			principal: {
				required: true,
				number:true,
				maxlength: 32,
				min:0
			},
			profit: {
				required: true,
				number:true,
				maxlength: 32,
				min:0
			},
			startDatetime: {
				required: true
			},
			endDatetime: {
				required: true
			},
			businessRemark: {
				required: true,
				maxlength: 20
			}
		},
		messages: {
			name: {
				required: "请输入业务名称",
				maxlength: jQuery.format("业务名称不能大于{0}个字符")
			},
			principal: {
				required: "请输入业务本金",
				number:"业务本金请输入数字",
				maxlength: jQuery.format("业务本金不能大于{0}个字符"),
				min: jQuery.format("业务本金不能小于{0}")
			},
			profit: {
				required: "请输入业务收益",
				number:"业务收益请输入数字",
				maxlength: jQuery.format("业务收益不能大于{0}个字符"),
				min: jQuery.format("业务收益不能小于{0}")
			},
			startDatetime: {
				required: "请输入开始时间"
			},
			endDatetime: {
				required: "请输入结束时间"
			},
			businessRemark: {
				required: "请输入业务备注",
				maxlength: jQuery.format("业务备注不能大于{0}个字符")
			}
		}
	});
	
	//提交业务
	$('#subBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		
		//上传文件判断
		if(isBlank($("#hsbUrl").attr("href"))){
			alert("请上传核算表");
			return;
		}
		if(isBlank($("#hspzUrl").attr("href"))){
			alert("请上传核算凭证");
			return;
		}
		if(isBlank($("#fjUrl").attr("href"))){
			alert("请上传附件");
			return;
		}
		var tableLists = mytable.getData();
		var businessTableList = new Array();
		for(var i = 0;i < tableLists.length;i++){
			var businessTable =new Object();
			businessTable.type=tableLists[i][0];
			businessTable.key=tableLists[i][1];
			businessTable.value=tableLists[i][2];
			if(!isBlank(businessTable.value)){
				if(!checkNum(businessTable.value,"业务核算表金额")){
					return;
				}
			}
			businessTable.remark=tableLists[i][3];
		    businessTableList.push(businessTable);
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['subjectCode']=subjectCode;
		data['code']=businessCode;
		data['businessTableJson']=JSON.stringify(businessTableList);
		data['hsbUrl'] = $("#hsbUrl").attr("href");
		data['hspzUrl'] = $("#hspzUrl").attr("href");
		data['fjUrl'] = $("#fjUrl").attr("href");
		data['remark']=$("#businessRemark").val();
		var url = "";
		if(isBlank(businessCode)){
			url = $("#basePath").val()+"/project/business/sub";
		}else{
			data['code']=businessCode;
			url = $("#basePath").val()+"/project/business/reSub";
		}
		doPostAjax(url, data, doSuccessBack);
	});
	
	initBusinessTable();
	//初始化业务和核算表
	businessCode=getQueryString("businessCode");
	if(!isBlank(businessCode)){
		var data = {"businessCode":businessCode};
		var url = $("#basePath").val()+"/project/business/detail";
		doGetAjax(url, data, doGetDetailBusinessBack);	
	}
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/project/business_back.htm";
	});
	
	$("#hsbUpload").click(function () {
		var postUrl = $("#basePath").val()+"/project/upload/hsbFile";
        ajaxFileUpload(postUrl,"hsbFile","hsbUrl");
    })
    
    $("#hspzUpload").click(function () {
		var postUrl = $("#basePath").val()+"/project/upload/hspzFile";
        ajaxFileUpload(postUrl,"hspzFile","hspzUrl");
    })
    
    $("#fjUpload").click(function () {
		var postUrl = $("#basePath").val()+"/project/upload/fjFile";
        ajaxFileUpload(postUrl,"fjFile","fjUrl");
    })
});

function initBusinessTable(){
    mytable = $('#edittable').editTable({
	    field_templates: {
	    	'select_one' : {
	            html:"<select id=\"firstControl\" onchange=\"changeProject(this)\">"+businessTableType+"</select>",
	            getValue: function (input) {
	                return $(input).val();
	            },
	            setValue: function (input, value) {
	                var select = $(input);
	                select.find('option').filter(function() {
	                    return $(this).val() == value; 
	                }).attr('selected', true);
	                return select;
	            }
	        },
	        'select_two' : {
	            html:"<select id=\"secondControl\" onfocus=\"focusProjectTable(this)\">"+businessTableProject+"</select>",
	            getValue: function (input) {
	                return $(input).val();
	            },
	            setValue: function (input, value) {
	                var select = $(input);
	                select.find('option').filter(function() {
	                    return $(this).val() == value; 
	                }).attr('selected', true);
	                return select;
	            }
	        }
	    },
	    row_template: ['select_one', 'select_two', 'text', 'text'],
	    headerCols: ['类型','项目','金额','备注'],
	    first_row: false,
	    data: [
	        ["","","",""]
	    ]
	});
}

function doGetDetailProjectBack(res){
	if (res.success == true) {
		if(res.data != null){
		   result=res.data;
		   $("#name").html(result.name);
		   $("#serve").html(Dict.getName('serve_type', (result.serve)));
		   $("#quote").html(Dict.getName('quote', (result.quote)));
		   $("#type").html(typeFormatter(result.type));
		   $("#trader").html(traderFormatter(result.trader));
		   
		   $("#startDatetime").html(dateFormatter(result.startDatetime));
		   $("#totalPrincipal").html(moneyFormatter(result.totalPrincipal));
		   $("#totalAmount").html(moneyFormatter(result.totalAmount));
		   $("#totalProfit").html(moneyFormatter(result.totalProfit));
		   $("#remark").html(result.remark);
		}else{
			alert("根据项目编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

function doGetDetailBusinessBack(res){
	if (res.success == true) {
		if(res.data != null){
			result=res.data.business;
		    $("#businessCode").val(result.code);
		    $("#businessName").val(result.name);
		    $("#businessPrincipal").val(editMoneyFormat(result.principal));
		    $("#businessProfit").val(editMoneyFormat(result.profit));
		    $("#businessStartDatetime").val(dateFormatter(result.startDatetime));
		    $("#businessEndDatetime").val(dateFormatter(result.endDatetime));
		    $("#businessRemark").val(result.remark);
		    
		    //业务核算表
		    tableLists=res.data.businessTableList;
		    var businessTableList = new Array();
		    for(var i = 0;i < tableLists.length;i++){
		    	businessTableList[i]=[tableLists[i].type,tableLists[i].key,tableLists[i].value,tableLists[i].remark];
			}
		    mytable.loadData(businessTableList);
		
		    // url
		    var hsbUrl = result.hsbUrl;
		    if(!isBlank(hsbUrl)){
		    	$("#hsbUrl").text(hsbUrl.substring(hsbUrl.lastIndexOf('/')+1));
		    	$("#hsbUrl").attr('href',hsbUrl); 
		    }
		    
		    var hspzUrl = result.hspzUrl;
		    if(!isBlank(hspzUrl)){
		    	$("#hspzUrl").text(hspzUrl.substring(hspzUrl.lastIndexOf('/')+1));
		    	$("#hspzUrl").attr('href',hspzUrl); 
		    }
		    
		    var fjUrl = result.fjUrl;
		    if(!isBlank(fjUrl)){
		    	$("#fjUrl").text(fjUrl.substring(fjUrl.lastIndexOf('/')+1));
		    	$("#fjUrl").attr('href',fjUrl); 
		    }
		    
		    $("#tableList").bootstrapTable("load", res.data.businessTableList);
		}else{
			alert("根据编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

function ajaxFileUpload(postUrl,fileId,uploadControlId) {
    $.ajaxFileUpload
    (
        {
            url: postUrl, //用于文件上传的服务器端请求地址
            type: 'POST',
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: fileId, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status)  //服务器成功响应处理函数
            {
                if (typeof (data.status) != 'undefined') {
                    if (data.status == "1") {
                    	alert('上传成功');
                    	if(!isBlank(uploadControlId)){
                    		$("#"+uploadControlId).text(data.url.substring(data.url.lastIndexOf('/')+1));
            		    	$("#"+uploadControlId).attr('href',data.url); 
                    	}
                    } else {
                        alert(data.msg);
                    }
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
        }
    )
    return false;
}

function initData(){
    var data= {"parentKey":"customer_level"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackLevel);
    var data= {"parentKey":"project_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBacktype);
	
	var url = $("#basePath").val()+"/general/operator/list";
	doGetAjaxIsAsync(url, data, false, doSucBackTrader);
	
	var data= {"parentKey":"business_table_type"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackBusinessTableType);
	
	var data= {"parentKey":"business_table_income"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackBusinessTableIncome);
	var data= {"parentKey":"business_table_cost"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackBusinessTableCost);
	var data= {"parentKey":"business_table_profit"};
	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackBusinessTableProfit);
}

function changeProject(project){
	if($("#"+(project.id)).val() == "1"){
		$("#"+(project.id+1)).html(businessTableIncome);
	}else if($("#"+(project.id)).val() == "2"){
		$("#"+(project.id+1)).html(businessTableCost);
	}else if($("#"+(project.id)).val() == "3"){
		$("#"+(project.id+1)).html(businessTableProfit);
	}
}

function focusProjectTable(projectTable){
	//var tableValue = $("#"+(projectTable.id)).val();
	//console.log(projectTable);
}

function changeProjectTable(projectTable){
	if($("#"+(project.id)).val() == "1"){
		$("#"+(project.id+1)).html(businessTableIncome);
	}else if($("#"+(project.id)).val() == "2"){
		$("#"+(project.id+1)).html(businessTableCost);
	}else if($("#"+(project.id)).val() == "3"){
		$("#"+(project.id+1)).html(businessTableProfit);
	}
}

function doSucBackBusinessTableType(res){
	var data = res.data;
	for(var i = 0;i < data.length;i++){
		businessTableType+="<option value=\""+data[i].dkey+"\">"+data[i].dvalue+"</option>"
	}
}

function doSucBackBusinessTableIncome(res){
	var data = res.data;
	if(typeof(data) != "undefined"){//判断undifined
		for(var i = 0;i < data.length;i++){
			businessTableIncome+="<option value=\""+data[i].dkey+"\">"+data[i].dvalue+"</option>"
		}
	}
	businessTableProject = businessTableIncome;
}

function doSucBackBusinessTableCost(res){
	var data = res.data;
	if(typeof(data) != "undefined"){//判断undifined
		for(var i = 0;i < data.length;i++){
			businessTableCost+="<option value=\""+data[i].dkey+"\">"+data[i].dvalue+"</option>"
		}
	}
	businessTableProject += businessTableCost;
}

function doSucBackBusinessTableProfit(res){
	var data = res.data;
	if(typeof(data) != "undefined"){//判断undifined
		for(var i = 0;i < data.length;i++){
			businessTableProfit+="<option value=\""+data[i].dkey+"\">"+data[i].dvalue+"</option>"
		}
	}
	businessTableProject += businessTableProfit;
}
//数据字典（）关联的回执方法
function doSucBackLevel(res){
	dictLevel = res.data;
}
//转化
function levelFormatter(value, row) {
	for(var i = 0;i < dictLevel.length;i++){
		if(dictLevel[i].dkey == value){
			return dictLevel[i].dvalue;
		}
	}
}
//数据字典（）关联的回执方法
function doSucBacktype(res){
	dicttype = res.data;
}
//转化
function typeFormatter(value, row) {
	for(var i = 0;i < dicttype.length;i++){
		if(dicttype[i].dkey == value){
			return dicttype[i].dvalue;
		}
	}
}

function doSucBackTrader(res){
	dictTrader = res.data;
}

//转化  
function traderFormatter(value, row) {
	for(var i = 0;i < dictTrader.length;i++){
		if(dictTrader[i].userId == value){
			return dictTrader[i].realName;
		}
	}
}

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/project/project_business.htm";
	}else{
		alert(res.msg);
	}
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
//时间格式化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
