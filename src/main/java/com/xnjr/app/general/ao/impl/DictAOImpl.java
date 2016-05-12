package com.xnjr.app.general.ao.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.xnjr.app.general.ao.IDictAO;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.req.XNlh5010Req;
import com.xnjr.app.req.XNlh5012Req;
import com.xnjr.app.req.XNlh5013Req;
import com.xnjr.app.req.XNlh5014Req;
import com.xnjr.app.res.XNlh5014Res;

@Service
public class DictAOImpl implements IDictAO {

    @Override
    public Object addDict(String type, String parentKey, String dkey,
            String dvalue, String updater, String remark) {
        XNlh5010Req req = new XNlh5010Req();
        req.setType(type);
        req.setParentKey(parentKey);
        req.setDkey(dkey);
        req.setDvalue(dvalue);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh5010", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object dropDict(String id) {
        return BizConnecter.getBizData("lh5011",
            JsonUtils.string2Json("id", id), Object.class);
    }

    @Override
    public Object editDict(String id, String dvalue, String updater,
            String remark) {
        XNlh5012Req req = new XNlh5012Req();
        req.setId(id);
        req.setDvalue(dvalue);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh5012", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public List<XNlh5014Res> queryDictList(String type, String parentKey,
            String dkey) {
        XNlh5014Req req = new XNlh5014Req();
        req.setType(type);
        req.setParentKey(parentKey);
        req.setDkey(dkey);
        String jsonStr = BizConnecter.getBizData("lh5014",
            JsonUtils.object2Json(req));
        Gson gson = new Gson();
        List<XNlh5014Res> list = gson.fromJson(jsonStr,
            new TypeToken<List<XNlh5014Res>>() {
            }.getType());
        return list;
    }

    @Override
    public List<XNlh5014Res> queryDictList(String type, String parentKey,
            String dkey, String orderColumn, String orderDir) {
        XNlh5014Req req = new XNlh5014Req();
        req.setType(type);
        req.setParentKey(parentKey);
        req.setDkey(dkey);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("lh5014", JsonUtils.object2Json(req),
            List.class);
    }

    @Override
    public Object queryDictPage(String type, String parentKey, String dkey,
            String start, String limit, String orderColumn, String orderDir) {
        XNlh5013Req req = new XNlh5013Req();
        req.setType(type);
        req.setParentKey(parentKey);
        req.setDkey(dkey);
        req.setLimit(limit);
        req.setStart(start);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("lh5013", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryDictDetail(String id) {
        return BizConnecter.getBizData("lh5015",
            JsonUtils.string2Json("id", id), Object.class);
    }

}
