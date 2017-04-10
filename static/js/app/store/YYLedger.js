$(function () {
	var code = getQueryString('code');
	
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'price',
        title: '消费金额',
		formatter: moneyFormat
    }, {
        field: 'backAmount',
        title: '返现金额',
		formatter: moneyFormat
    }, {
        field: 'backCurrency',
        title: '返现币种',
		key: 'currency',
		keyCode: "802006",
        formatter: Dict.getNameForList("currency",'802006'),
    }, {
        field: 'payType',
        title: '买单方式',
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: "store_purchase_status",
        keyCode:'808907',
        formatter: Dict.getNameForList("store_purchase_status","808907"),
        search: true,
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat,
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildList({
        columns: columns,
        pageCode: '808245',
        searchParams:{
        	storeCode: code,
        	status: '1',
			companyCode: OSS.company
		}
    });
    
	$('.tools .toolbar').empty();
	
	$('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
	$('#backBtn').on('click', function() {
		goBack();
	});  
    
    
});