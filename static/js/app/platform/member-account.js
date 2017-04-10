$(function() {
	var userId = getQueryString('userId');
	var view = 1;
	
	var columns = [{
		field : 'accountNumber',
		title : '账户编号',
	}, {
		field : 'currency',
		title : '账户币种',
        key: 'currency',
        formatter: Dict.getNameForList("currency","802006"),
	}, {
		field : 'amount',
		title : '账户余额',
        formatter:moneyFormat
	},{ 
		field: 'remark',
        title: '备注'
    }];

    buildList({
        columns: columns,
        pageCode: '802503',
		searchParams:{
			userId:userId
		}
    });
    
    $('#goBackBtn').click(function() {
        goBack();
    });
    
	$('#accountQueryBtn').hide();
	$('#detail2Btn').hide();
});