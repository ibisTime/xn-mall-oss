$(function() {
    var fields = [{
        field: 'note',
        type: 'hidden',
        value: '广告人数倍数'
    },{
        field: 'id',
        type: 'hidden'
    },{
        title: '广告人数倍数',
        field: 'cvalue',
        required: true
    }];

    var options = {
        fields: fields,
        code: {
            ckey: 'BS'
        },
        editCode: '801911',
        detailCode: '801917',
        buttons: [{
            title: '保存',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    // data['id'] = data['code'];
                    reqApi({
                        code: '801911',
                        json: data
                    }).done(function(data) {
                        toastr.success('操作成功');
                    });
                }
            }
        }]
    };

    buildDetail(options);
});