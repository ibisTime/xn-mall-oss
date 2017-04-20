$(function () {
    
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'poolName',
        title: '池名称',
        search: true
    }, {
        field: 'fromUser',
        title: '兑换用户',
        search: true
    }, {
        field: 'fromAmount',
        title: '兑换嗨币',
        formatter: moneyFormat
    }, {
        field: 'toAmount',
        title: '获得菜狗币',
        formatter: moneyFormat
    }, {
        field: 'createDatetime',
        title: '兑换时间',
        formatter: dateTimeFormat
	},];

    buildList({
        columns: columns,
        pageCode: '808525',
		searchParams:{
			companyCode: OSS.company
		}
    });
    
    
    
});