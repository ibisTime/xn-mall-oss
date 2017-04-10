$(function () {
	var code = getQueryString('code');
	var hzbCode = getQueryString('hzbCode');
	
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'hzbCode',
        title: '编号',
    }, {
        field: 'owner',
        title: '树主人',
        formatter: function(v, data){
        	return data.ownerUser.mobile;
        }
    }, {
        field: 'ownerAmount',
        title: '树主人领取金额',
        formatter:moneyFormat
    }, {
        field: 'ownerCurrency',
        title: '树主人领取币种',
        key: 'currency',
        formatter: Dict.getNameForList("currency","802006"),
    },{
        field: 'receiver',
        title: '领取人',
    },  {
        field: 'receiveAmount',
        title: '红包领取金额',
        formatter:moneyFormat
    }, {
        field: 'receiveCurrency',
        title: '领取人领取币种',
        key: 'currency',
        formatter: Dict.getNameForList("currency","802006"),
    }, {
    	field: 'receiveDatetime',
        title: '领取时间',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: "hzb_mgift_status",
        formatter: Dict.getNameForList("hzb_mgift_status"),
        search: true
    }];

    buildList({
        columns: columns,
        pageCode: '615135',
		searchParams:{
			hzbCode: hzbCode,
			companyCode: OSS.company
		}
    });
    
    $('#luckMomListBtn').remove();
    $('#shakeRecordBtn').remove();
    $('#upDownBtn').remove();
    
});