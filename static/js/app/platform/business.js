$(function () {
    
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
		field : 'loginName',
		title : '商家名称',
	}, {
		field : 'mobile',
		title : '分类'
	}, {
		field : 'mobile',
		title : '联系方式',
		search: true
	}, {
		field : 'mobile',
		title : '加盟商'
	}, {
		field : 'status',
		title : '状态',
        key: 'user_status',
        formatter: Dict.getNameForList('user_status',"807706"),
	}, {
		field : 'updateDatetime',
		title : '入驻时间',
        formatter: dateTimeFormat
	}, {
        field: 'remark',
        title: '备注'
    }];

    buildList({
        columns: columns,
        pageCode: '805054',
		searchParams:{
			kind: 'f2'
		}
    });
    
    
    
});