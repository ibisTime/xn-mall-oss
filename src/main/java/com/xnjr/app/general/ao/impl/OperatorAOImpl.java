package com.xnjr.app.general.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.app.general.ao.IOperatorAO;
import com.xnjr.app.general.req.XNgs0000Req;
import com.xnjr.app.general.req.XNgs0002Req;
import com.xnjr.app.general.req.XNgs0006Req;
import com.xnjr.app.general.req.XNgs0007Req;
import com.xnjr.app.general.req.XNgs0008Req;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.util.UploadUtil;

@Service
public class OperatorAOImpl implements IOperatorAO {

    @Override
    public Object addOperator(String userId, String mobile, String level,
            String photo, String introduction, String updater, String remark) {
        XNgs0000Req req = new XNgs0000Req();
        req.setUserId(userId);
        req.setMobile(mobile);
        req.setLevel(level);
        req.setPhoto(UploadUtil.uploadPicture(photo));
        req.setIntroduction(introduction);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("gs0000", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object editOperator(String userId, String mobile, String level,
            String photo, String introduction, String updater, String remark) {
        XNgs0002Req req = new XNgs0002Req();
        req.setUserId(userId);
        req.setMobile(mobile);
        req.setLevel(level);
        req.setPhoto(UploadUtil.editUploadPicture(photo));
        req.setIntroduction(introduction);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("gs0002", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryOperatorList(String mobile, String realName, String level) {
        XNgs0007Req req = new XNgs0007Req();
        req.setMobile(mobile);
        req.setRealName(realName);
        req.setLevel(level);
        return BizConnecter.getBizData("gs0007", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryOperatorPage(String mobile, String realName,
            String level, String start, String limit, String orderColumn,
            String orderDir) {
        XNgs0006Req req = new XNgs0006Req();
        req.setMobile(mobile);
        req.setRealName(realName);
        req.setLevel(level);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("gs0006", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object detailPage(String userId) {
        XNgs0008Req req = new XNgs0008Req();
        req.setUserId(userId);
        return BizConnecter.getBizData("gs0008", JsonUtils.object2Json(req),
            Object.class);
    }
}
