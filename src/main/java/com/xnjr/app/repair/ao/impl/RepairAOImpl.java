package com.xnjr.app.repair.ao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xnjr.app.general.ao.IDictAO;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.repair.ao.IRepairAO;
import com.xnjr.app.repair.req.XN602081Req;
import com.xnjr.app.repair.req.XN602082Req;
import com.xnjr.app.repair.req.XN602083Req;

@Service
public class RepairAOImpl implements IRepairAO {
    @Autowired
    protected IDictAO dataDicAO;

    @Override
    public Object queryRepairPage(String code, String goodsCode, String userId,
            String applyUser, String status, String updater, String start,
            String limit, String orderColumn, String orderDir) {
        XN602081Req req = new XN602081Req();
        req.setCode(code);
        req.setGoodsCode(goodsCode);
        req.setUserId(userId);
        req.setApplyUser(applyUser);
        req.setStatus(status);
        req.setUpdater(updater);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("602081", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryRepairDetailPage(String code) {
        XN602082Req req = new XN602082Req();
        req.setCode(code);
        return BizConnecter.getBizData("602082", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object repairDeal(String code, String checkResult, String checkUser,
            String remark) {
        XN602083Req req = new XN602083Req();
        req.setCode(code);
        req.setCheckResult(checkResult);
        req.setCheckUser(checkUser);
        req.setRemark(remark);
        return BizConnecter.getBizData("602083", JsonUtils.object2Json(req),
            Object.class);
    }

}
