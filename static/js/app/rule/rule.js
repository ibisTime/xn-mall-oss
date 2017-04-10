$(function() {

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            title: '名称',
            field: 'type',
            type: 'select',
            formatter: Dict.getNameForList('rule_type'),
            key: 'rule_type',
            search: true
        }, {
            field: 'value',
            title: '积分',
            formatter: moneyFormat
        },

        {
            field: 'updater',
            title: '最近修改人'
        }, {
            field: 'updateDatetime',
            title: '最近修改时间',
            formatter: dateTimeFormat
        }, {
            field: 'remark',
            title: '备注'
        }
    ];
    buildList({
        router: "rule",
        columns: columns,
        pageCode: "807725",
        searchParams: {
            kind: "1"
        }
    });
});