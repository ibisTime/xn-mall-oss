$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'activityCode',
        title: '活动',
        type: "select",
        listCode: "801052",
        params: {
            type: "6"
        },
        keyName: "code",
        valueName: "title",
        searchName: "title",
        search: true
    }, {
        field: 'amount',
        title: '活动资金',
        formatter: moneyFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '801135',
        searchParams: {
            companyCode: OSS.company
        },
        beforeDetail: function(data) {
            window.location.href = "./activeFinance_detail.html?v=1&code=" + data.code;
        }
    });
});