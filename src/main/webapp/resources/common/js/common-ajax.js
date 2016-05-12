/**
 * ajax 请求
 * @param url 请求地址
 * @param data 请求参数 {"date": new Date().getTime(),"state": 1}
 * @param successfn 成功回调函数
 */
function doPostAjax(url, data, successfn) {
	//请求前显示遮罩
	maskPop();
    $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: 'json',
        success: function (data) {
        	//请求成功之后隐藏遮罩
        	unMaskPop();
        	successfn(data);
        },
        error: function () {
            jQuery.fn.mBox({
                message: '系统异常,请联系管理员'
            });
        }
    });
};

/**
 * ajax 请求
 * @param url 请求地址
 * @param data 请求参数 {"date": new Date().getTime(),"state": 1}
 * @param successfn 成功回调函数
 */
function doGetAjax(url, data, successfn) {
    $.ajax({
        type: "get",
        url: url,
        data: data,
        dataType: 'json',
        success: successfn,
        error: function () {
            jQuery.fn.mBox({
                message: '系统异常,请联系管理员'
            });
        }
    });
};

/**
 * ajax 请求
 * @param url 请求地址
 * @param data 请求参数 {"date": new Date().getTime(),"state": 1}
 * @param async false 异步， true 同步
 * @param successfn 成功回调函数
 */
function doGetAjaxIsAsync(url, data, async, successfn,errorfn) {
    $.ajax({
        type: 'get',
        async: async,
        data: data,
        url: url,
        dataType: 'json',
        success: function (d) {
            successfn(d);
        },
        error: function (e) {
            errorfn(e);
        }
    });
};

/**
 * ajax 请求
 * @param url 请求地址
 * @param data 请求参数 {"date": new Date().getTime(),"state": 1}
 * @param type 发送类型(get/post/...)
 * @param successfn 成功回调函数
 */
function doAjax(url, data, type, successfn) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'json',
        success: successfn,
        error: function () {
            jQuery.fn.mBox({
                message: '系统异常,请联系管理员'
            });
        }
    });
};

/**
 * ajax 请求
 * @param url 请求地址
 * @param data 请求参数 {"date": new Date().getTime(),"state": 1}
 * @param type 请求方式("POST" 或 "GET")
 * @param successfn 成功回调函数
 * @param errorfn 错误回调函数
 */
function doAjax(url, data, type, successfn, errorfn) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'json',
        success: successfn,
        error: errorfn
    });
};



/**
 * ajax 请求
 * @param url 请求的地址
 * @param data 发送到服务器的数据,{"date": new Date().getTime(),"state": 1}
 * @param async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
 * @param type 请求方式("POST" 或 "GET")
 * @param dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * @param successfn 成功回调函数
 * @param errorfn 失败回调函数
 */
function doAjax(url, data, async, type, dataType, successfn, errorfn) {
    $.ajax({
        type: type,
        async: async,
        data: data,
        url: url,
        dataType: dataType,
        success: function (d) {
            successfn(d);
        },
        error: function (e) {
            errorfn(e);
        }
    });
};