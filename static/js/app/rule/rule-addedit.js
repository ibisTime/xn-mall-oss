$(function() {

    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
            field: "kind",
            value: "1",
            type: "hidden",
            required: true
        }, {
            title: '名称',
            field: 'type',
            required: true,
            type: 'select',
            key: 'rule_type',
            readonly: view,
        }, {
            title: '积分',
            field: 'value',
            required: true,
            maxlength: 30,
            amount: true,
            readonly: view,
        },
        {
            field: 'level',
            title: '作用等级',
            type: 'hidden',
            value: "0",
            required: true
        },
        {
            title: '备注',
            field: 'remark',
            maxlength: 250,
            readonly: view,
        }
    ];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '807727',
        editCode: '807720'
    });
});