$(function () {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
		field : 'loginName',
		title : '登录名',
		search: true
	}, {
		field : 'mobile',
		title : '手机号'
	}, {
		field : 'userReferee',
		title : '推荐人'
	}, {
		field : 'status',
		title : '状态',
        type: 'select',
		search: true,
        key: 'user_status',
        formatter: Dict.getNameForList('user_status',"807706"),
	}, {
        field: 'remark',
        title: '备注'
    },];

    buildList({
        columns: columns,
        pageCode: '805054',
		searchParams:{
			kind: '05'
		}
    });
    
    $('#detail2Btn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        window.location.href = "AllianceBusiness_detail2.html?userId=" + selRecords[0].userId+"&v=1";
    });
    
    
    $('#registerBtn').click(function() {

        window.location.href = "AllianceBusines_register.html";
    });
    
});