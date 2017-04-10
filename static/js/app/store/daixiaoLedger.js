$(function () {
	var code = getQueryString('code');
	var c = getQueryString('c');
	var owner = getQueryString('owner');
	
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
		field : 'realName',
		title : '户名',
		search: true
	},{
		field: 'accountNumber',
		title: '账号'
	},{
		field: 'currency',
		title: '币种',
		type: 'select',
		key: 'currency',
		keyCode: "802006",
        formatter: Dict.getNameForList("currency",'802006'),
		search: true
	},{
		field: 'channelType',
		title: '渠道',
		type: 'select',
		key: 'channel_type',
		keyCode:'802006',
		formatter: Dict.getNameForList('channel_type','802006'),
		search: true
	},{
		field : 'bizType',
		title : '业务类型',
		type: 'select',
		key: 'biz_type',
		keyCode:'802006',
		formatter: Dict.getNameForList('biz_type','802006'),
		search: true
	},{
    	field : 'transAmount',
		title : '变动金额',
		formatter: moneyFormat
    },{
    	field: 'preAmount',
    	title: '变动前金额',
    	formatter: moneyFormat
    },{
    	field: 'postAmount',
    	title: '变动后金额',
    	formatter: moneyFormat
    },{
		field : 'status',
		title : '状态',
		type: 'select',
		key: 'jour_status',
		keyCode:'802006',
		formatter: Dict.getNameForList('jour_status','802006'),
		search: true
	},];

    buildList({
        columns: columns,
        pageCode: '802520',
        searchParams:{
        	userId: owner,
        	currency: c,
			companyCode: OSS.company
		}
    });
    
	$('.tools .toolbar').empty();
	
	$('.tools .toolbar').html('<li style="display:block;" id="backBtn"><span><img src="/static/images/t01.png"></span>返回</li>');
	$('#backBtn').on('click', function() {
		goBack();
	});  
    
    
});