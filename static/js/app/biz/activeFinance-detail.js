$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: '活动',
        field: 'activityCode',
        required: true,
        type: "select",
        pageCode: "801052",
        params: {
            type: "6",
            status: "0"
        },
        keyName: "code",
        valueName: "title",
        searchName: "title",
        readonly: view,
    }, {
        title: '活动资金',
        field: 'amount',
        amount: true,
        required: true,
        readonly: view
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250,
        readonly: view
    }, {
        field: "addUser",
        value: getUserId(),
        type: "hidden",
        required: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '801136',
        addCode: "801130",
        editCode: '801131'
    });
});