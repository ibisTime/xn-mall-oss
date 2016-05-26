package com.xnjr.app.account.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.app.account.ao.IAccountAO;
import com.xnjr.app.account.req.XN805053Req;
import com.xnjr.app.account.req.XN805054Req;
import com.xnjr.app.account.req.XN805055Req;
import com.xnjr.app.account.req.XN805056Req;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;

@Service
public class AccountAOImpl implements IAccountAO {

    @Override
    public Object editAccount(String userId, String roleCode, String updater,
            String remark) {
        XN805053Req req = new XN805053Req();
        req.setUserId(userId);
        req.setRoleCode(roleCode);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("805053", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryAccountPage(String loginName, String mobile,
            String userKind, String userReferee, String idKind, String idNo,
            String realName, String status, String level, String start,
            String limit) {
        XN805054Req req = new XN805054Req();
        req.setLoginName(loginName);
        req.setMobile(mobile);
        req.setUserKind(userKind);
        req.setUserReferee(userReferee);
        req.setIdKind(idKind);
        req.setIdNo(idNo);
        req.setRealName(realName);
        req.setStatus(status);
        req.setLevel(level);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("805054", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object queryAccountList(String loginName, String mobile,
            String userKind, String userReferee, String idKind, String idNo,
            String realName, String status, String level) {
        XN805055Req req = new XN805055Req();
        req.setLoginName(loginName);
        req.setMobile(mobile);
        req.setUserKind(userKind);
        req.setUserReferee(userReferee);
        req.setIdKind(idKind);
        req.setIdNo(idNo);
        req.setRealName(realName);
        req.setStatus(status);
        req.setLevel(level);
        return BizConnecter.getBizData("805055", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object accountDetail(String userId) {
        XN805056Req req = new XN805056Req();
        req.setUserId(userId);
        return BizConnecter.getBizData("805056", JsonUtils.object2Json(req),
            Object.class);
    }

}
