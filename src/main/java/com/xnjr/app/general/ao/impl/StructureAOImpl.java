package com.xnjr.app.general.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.app.general.ao.IStructureAO;
import com.xnjr.app.general.req.XNgs4000Req;
import com.xnjr.app.general.req.XNgs4001Req;
import com.xnjr.app.general.req.XNgs4002Req;
import com.xnjr.app.general.req.XNgs4003Req;
import com.xnjr.app.general.req.XNgs4004Req;
import com.xnjr.app.general.req.XNgs4005Req;
import com.xnjr.app.general.res.BooleanRes;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;

@Service
public class StructureAOImpl implements IStructureAO {

    @Override
    public Object addStructure(String name, String status, String summary,
            String description, String updater, String remark) {
        XNgs4000Req req = new XNgs4000Req();
        req.setName(name);
        req.setStatus(status);
        req.setSummary(summary);
        req.setDescription(description);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("gs4000", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object dropStructure(String code) {
        XNgs4001Req req = new XNgs4001Req();
        req.setCode(code);
        return BizConnecter.getBizData("gs4001", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object editStructure(String code, String name, String summary,
            String description, String updater, String remark, String status) {
        XNgs4002Req req = new XNgs4002Req();
        req.setCode(code);
        req.setName(name);
        req.setStatus(status);
        req.setSummary(summary);
        req.setDescription(description);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("gs4002", JsonUtils.object2Json(req),
            BooleanRes.class);
    }

    @Override
    public Object queryStructurePage(String name, String status, String start,
            String limit, String orderColumn, String orderDir) {
        XNgs4003Req req = new XNgs4003Req();
        req.setName(name);
        req.setStatus(status);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("gs4003", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryStructureList(String name, String status) {
        XNgs4004Req req = new XNgs4004Req();
        req.setName(name);
        req.setStatus(status);
        return BizConnecter.getBizData("gs4004", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object getStructure(String code) {
        XNgs4005Req req = new XNgs4005Req();
        req.setCode(code);
        return BizConnecter.getBizData("gs4005", JsonUtils.object2Json(req),
            Object.class);
    }

}
