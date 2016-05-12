package com.xnjr.app.general.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.app.general.ao.ISystemAO;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.req.XNlh5000Req;
import com.xnjr.app.req.XNlh5030Req;
import com.xnjr.app.req.XNlh5031Req;
import com.xnjr.app.req.XNlh5032Req;

@Service
public class SystemAOImpl implements ISystemAO {

	@Override
	public Object querySystemLog(String table, String operateType,
			String operater, String operateDatetimeStart,
			String operateDatetimeEnd, String start, String limit,
			String orderDir, String orderColoum) {
		XNlh5000Req req = new XNlh5000Req();
		req.setToTable(table);
		req.setOperateType(operateType);
		req.setOperater(operater);
		req.setOperateDatetimeStart(operateDatetimeStart);
		req.setOperateDatetimeEnd(operateDatetimeEnd);
		req.setStart(start);
		req.setLimit(limit);
		req.setOrderDir(orderDir);
		req.setOrderColumn(orderColoum);
		return BizConnecter.getBizData("lh5000",
	            JsonUtils.object2Json(req), Object.class);
	}

	@Override
	public Object addSystemParam(String key, String value, String note,
			String updater, String remark) {
		XNlh5030Req req = new XNlh5030Req();
		req.setCkey(key);
		req.setCvalue(value);
		req.setNote(note);
		req.setRemark(remark);
		req.setUpdater(updater);
		return BizConnecter.getBizData("lh5030",
	            JsonUtils.object2Json(req), Object.class);
	}

	@Override
	public Object editSystemParam(String id, String value, String note,
			String updater, String remark) {
		XNlh5031Req req = new XNlh5031Req();
		req.setId(id);
		req.setCvalue(value);
		req.setNote(note);
		req.setUpdater(updater);
		req.setRemark(remark);
		return BizConnecter.getBizData("lh5031",
	            JsonUtils.object2Json(req), Object.class);
	}

	@Override
	public Object querySystemParamPage(String key, String start, String limit,
			String orderColumn, String orderDir) {
		XNlh5032Req req = new XNlh5032Req();
		req.setCkey(key);
		req.setStart(start);
		req.setLimit(limit);
		req.setOrderColumn(orderColumn);
		req.setOrderDir(orderDir);
		return BizConnecter.getBizData("lh5032",
	            JsonUtils.object2Json(req), Object.class);
	}

	@Override
	public Object querySystemParamDetail(String id) {
		return BizConnecter.getBizData("lh5033",
	            JsonUtils.string2Json("id", id), Object.class);
	}
    
}
