SYJDictCache = {};
Dict = {};
Dict.findName = function(data, key, k, v) {
	k = k || 'dkey';
	v = v || 'dvalue';
	data = data || [];
	var i = 0, len = data.length, res;
	for (; i < len; i++) {
		var item = data[i];
		if (item[k] == key) {
			res = item[v];
			break;
		}
	}
	return res;
};
Dict.findObj = function(data, key, k) {
	k = k || 'dkey';
	data = data || [];
	var i = 0, len = data.length, res;
	for (; i < len; i++) {
		var item = data[i];
		if (item[k] == key) {
			res = item;
			break;
		}
	}
	return res;
};
Dict.getCurrencyName = function(key) {
	if (!key && arguments.length > 1) {
		return '-';
	}
	if (!SYJDictCache.currency) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey":"currency"}, false, function(res) {
			SYJDictCache.currency = res.data;
		});
	}
	return key ? Dict.findName(SYJDictCache.currency, key) : SYJDictCache.currency;
}

Dict.getIDKindName = function(key) {
	if (!key && arguments.length > 1) {
		return '-';
	}
	if (!SYJDictCache.IDKind) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey":"id_kind"}, false, function(res) {
			SYJDictCache.IDKind = res.data;
		});
	}
	return key ? Dict.findName(SYJDictCache.IDKind, key) : SYJDictCache.IDKind;
}

Dict.getSysActName = function(key) {
	if (!key && arguments.length > 1) {
		return '-';
	}
	if (!SYJDictCache.SysAct) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey":"sys_act"}, false, function(res) {
			SYJDictCache.SysAct = res.data;
		});
	}
	return key ? Dict.findName(SYJDictCache.SysAct, key) : SYJDictCache.SysAct;
}

Dict.getRoleLevelName = function(key) {
	if (!key && arguments.length > 1) {
		return '-';
	}
	var type = 'role_level';
	if (!SYJDictCache[type]) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": type}, false, function(res) {
			SYJDictCache[type] = res.data;
		});
	}
	return key ? Dict.findName(SYJDictCache[type], key) : SYJDictCache[type];
}

Dict.getRoleKindName = function(key) {
	if (!key && arguments.length > 1) {
		return '-';
	}
	var type = 'role_kind';
	if (!SYJDictCache[type]) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": type}, false, function(res) {
			SYJDictCache[type] = res.data;
		});
	}
	return key ? Dict.findName(SYJDictCache[type], key) : SYJDictCache[type];
}

Dict.getUserStatusName = function(key) {
	if (!key && arguments.length > 1) {
		return '-';
	}
	var type = 'user_status';
	if (!SYJDictCache[type]) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": type}, false, function(res) {
			SYJDictCache[type] = res.data;
		});
	}
	return key ? Dict.findName(SYJDictCache[type], key) : SYJDictCache[type];
}

Dict.getoperatorLevelName = function(key) {
	if (!key && arguments.length > 1) {
		return '-';
	}
	var type = 'operator_level';
	if (!SYJDictCache[type]) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": type}, false, function(res) {
			SYJDictCache[type] = res.data;
		});
	}
	return key ? Dict.findName(SYJDictCache[type], key) : SYJDictCache[type];
}

Dict.getRoleLevelName = function(key) {
	if (!key && arguments.length > 1) {
		return '-';
	}
	var type = 'role_level';
	if (!SYJDictCache[type]) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": type}, false, function(res) {
			SYJDictCache[type] = res.data;
		});
	}
	return key ? Dict.findName(SYJDictCache[type], key) : SYJDictCache[type];
}

Dict.getoperatorStatusName = function(key) {
	if (!key && arguments.length > 1) {
		return '-';
	}
	var type = 'operator_status';
	if (!SYJDictCache[type]) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": type}, false, function(res) {
			SYJDictCache[type] = res.data;
		});
	}
	return key ? Dict.findName(SYJDictCache[type], key) : SYJDictCache[type];
}

Dict.getKindName = function(key) {
	if (!key && arguments.length > 1) {
		return '-';
	}
	var type = 'kind';
	if (!SYJDictCache[type]) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": type}, false, function(res) {
			SYJDictCache[type] = res.data;
		});
	}
	return key ? Dict.findName(SYJDictCache[type], key) : SYJDictCache[type];
}

Dict.getName = function(type, key) {
	if (!SYJDictCache[type]) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": type}, false, function(res) {
			SYJDictCache[type] = res.data;
		});
	}
	return key ? (Dict.findName(SYJDictCache[type], key) || '-') : SYJDictCache[type];
}

Dict.getNameForList = function(type) {
	if (!SYJDictCache[type]) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": type}, false, function(res) {
			SYJDictCache[type] = res.data;
		});
	}
	return function(key) {
		return key ? Dict.findName(SYJDictCache[type], key) : '-';
	}
}

Dict.getServeName = function(key) {
	if (!key) {
		return '-';
	}
	var type = 'serve_type';
	if (!SYJDictCache[type]) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": type}, false, function(res) {
			var data = res.data || [], obj = {};
			for (var i = 0, len = data.length; i < len; i++) {
				obj[data[i].dkey] = data[i].dvalue;
			}
			SYJDictCache[type] = obj;
		});
	}
	var name = '';
	for (var i = 0, len = key.length; i < len; i ++) {
		name += SYJDictCache[type][key[i]] + ' | ';
	}
	return name.slice(0, name.length - 3);
}

Dict.getQuoteName = function(key) {
	if (!key) {
		return '-';
	}
	var type = 'quote';
	if (!SYJDictCache[type]) {
		doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": type}, false, function(res) {
			var data = res.data || [], obj = {};
			for (var i = 0, len = data.length; i < len; i++) {
				obj[data[i].dkey] = data[i].dvalue;
			}
			SYJDictCache[type] = obj;
		});
	}
	var name = '';
	for (var i = 0, len = key.length; i < len; i ++) {
		name += SYJDictCache[type][key[i]] + ' | ';
	}
	return name.slice(0, name.length - 3);
}