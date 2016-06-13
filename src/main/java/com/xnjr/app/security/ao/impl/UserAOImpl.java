package com.xnjr.app.security.ao.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.xnjr.app.enums.EUserKind;
import com.xnjr.app.enums.EUserStatus;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.security.ao.IUserAO;
import com.xnjr.app.security.req.XN805042Req;
import com.xnjr.app.security.req.XN805043Req;
import com.xnjr.app.security.req.XN805047Req;
import com.xnjr.app.security.req.XN805048Req;
import com.xnjr.app.security.req.XN805049Req;
import com.xnjr.app.security.req.XN805050Req;
import com.xnjr.app.security.req.XN805051Req;
import com.xnjr.app.security.req.XN805052Req;
import com.xnjr.app.security.req.XN805053Req;
import com.xnjr.app.security.req.XN805054Req;
import com.xnjr.app.security.req.XN805055Req;
import com.xnjr.app.security.res.XN805043Res;
import com.xnjr.app.security.res.XN805055Res;
import com.xnjr.app.security.res.XN805056Res;
import com.xnjr.app.util.PwdUtil;

/**
 * 系统用户模块
 * @author: XIANDONG 
 * @since: 2016年4月17日 下午6:15:47 
 * @history:
 */
@Service
public class UserAOImpl implements IUserAO {

    @Override
    public Object queryUserPage(String loginName, String kind, String level,
            String userReferee, String mobile, String idKind, String idNo,
            String realName, String roleCode, String status, String updater,
            String start, String limit) {
        XN805054Req req = new XN805054Req();
        req.setLoginName(loginName);
        req.setKind(kind);
        req.setLevel(level);
        req.setUserReferee(userReferee);
        req.setMobile(mobile);
        req.setIdKind(idKind);
        req.setIdNo(idNo);
        req.setRealName(realName);
        req.setRoleCode(roleCode);
        req.setStatus(status);
        req.setUpdater(updater);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("805054", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public List<XN805055Res> queryUserList(String loginName, String kind,
            String level, String userReferee, String mobile, String idKind,
            String idNo, String realName, String roleCode, String status,
            String updater) {
        XN805055Req req = new XN805055Req();
        req.setLoginName(loginName);
        req.setKind(kind);
        req.setLevel(level);
        req.setUserReferee(userReferee);
        req.setMobile(mobile);
        req.setIdKind(idKind);
        req.setIdNo(idNo);
        req.setRealName(realName);
        req.setRoleCode(roleCode);
        req.setStatus(status);
        req.setUpdater(updater);
        String jsonStr = BizConnecter.getBizData("805055",
            JsonUtils.object2Json(req));
        Gson gson = new Gson();
        List<XN805055Res> list = gson.fromJson(jsonStr,
            new TypeToken<List<XN805055Res>>() {
            }.getType());
        return list;
    }

    @Override
    public XN805056Res getUser(String userId) {
        return BizConnecter.getBizData("805056",
            JsonUtils.string2Json("userId", userId), XN805056Res.class);
    }

    @Override
    public Object addUser(String mobile, String idKind, String idNo,
            String realName, String userReferee, String updater, String remark,
            String kind) {
        XN805042Req req = new XN805042Req();
        req.setMobile(mobile);
        req.setIdKind(idKind);
        req.setIdNo(idNo);
        req.setRealName(realName);
        req.setUserReferee(userReferee);
        req.setUpdater(updater);
        req.setRemark(remark);
        req.setKind(kind);
        return BizConnecter.getBizData("805042", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object cancelUser(String userId, String updater, String remark) {
        XN805052Req req = new XN805052Req();
        req.setUserId(userId);
        req.setToStatus(EUserStatus.Ren_Locked.getCode());
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("805052", JsonUtils.object2Json(req),
            Object.class);
    }

    /** 
     * @see com.xnjr.app.security.ao.IUserAO#activeUser(java.lang.String, java.lang.String, java.lang.String)
     */
    @Override
    public Object activeUser(String userId, String updater, String remark) {
        XN805052Req req = new XN805052Req();
        req.setUserId(userId);
        req.setToStatus(EUserStatus.NORMAL.getCode());
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("805052", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object changeLoginPwd(String userId, String oldLoginPwd,
            String newLoginPwd) {
        XN805049Req req = new XN805049Req();
        req.setUserId(userId);
        req.setOldLoginPwd(oldLoginPwd);
        req.setNewLoginPwd(newLoginPwd);
        req.setLoginPwdStrength(PwdUtil.calculateSecurityLevel(newLoginPwd));
        return BizConnecter.getBizData("805049", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object resetLoginPwd(String mobile, String smsCaptcha,
            String newLoginPwd) {
        XN805048Req req = new XN805048Req();
        req.setMobile(mobile);
        req.setSmsCaptcha(smsCaptcha);
        req.setNewLoginPwd(newLoginPwd);
        req.setLoginPwdStrength(PwdUtil.calculateSecurityLevel(newLoginPwd));
        return BizConnecter.getBizData("805048", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object changeTradePwd(String userId, String oldTradePwd,
            String newTradePwd) {
        XN805051Req req = new XN805051Req();
        req.setUserId(userId);
        req.setOldTradePwd(oldTradePwd);
        req.setNewTradePwd(newTradePwd);
        req.setTradePwdStrength(PwdUtil.calculateSecurityLevel(newTradePwd));
        return BizConnecter.getBizData("805051", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object resetTradePwd(String userId, String newTradePwd,
            String smsCaptcha, String idKind, String idNo) {
        XN805050Req req = new XN805050Req();
        req.setUserId(userId);
        req.setNewTradePwd(newTradePwd);
        req.setTradePwdStrength(PwdUtil.calculateSecurityLevel(newTradePwd));
        req.setSmsCaptcha(smsCaptcha);
        req.setIdKind(idKind);
        req.setIdNo(idNo);
        return BizConnecter.getBizData("805050", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object allotRole(String userId, String roleCode, String updater,
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
    public XN805043Res login(String loginName, String loginPwd) {
        XN805043Req req = new XN805043Req();
        req.setLoginName(loginName);
        req.setLoginPwd(loginPwd);
        req.setKind(EUserKind.Operator.getCode());
        return BizConnecter.getBizData("805043", JsonUtils.object2Json(req),
            XN805043Res.class);
    }

    /**
     * @see com.xnjr.app.security.ao.IUserAO#editMobile(java.lang.String, java.lang.String, java.lang.String, java.lang.String)
     */
    @Override
    public Object editMobile(String userId, String newMobile,
            String smsCaptcha, String tradePwd) {
        XN805047Req req = new XN805047Req();
        req.setUserId(userId);
        req.setNewMobile(newMobile);
        req.setSmsCaptcha(smsCaptcha);
        req.setTradePwd(tradePwd);
        return BizConnecter.getBizData("805047", JsonUtils.object2Json(req),
            Object.class);
    }
}
