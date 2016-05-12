package com.xnjr.app.security.ao.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.security.ao.IUserAO;
import com.xnjr.app.security.req.XNlh0000Req;
import com.xnjr.app.security.req.XNlh0001Req;
import com.xnjr.app.security.req.XNlh0002Req;
import com.xnjr.app.security.req.XNlh0003Req;
import com.xnjr.app.security.req.XNlh0004Req;
import com.xnjr.app.security.req.XNlh0005Req;
import com.xnjr.app.security.req.XNlh0006Req;
import com.xnjr.app.security.req.XNlh0007Req;
import com.xnjr.app.security.req.XNlh0008Req;
import com.xnjr.app.security.req.XNlh0009Req;
import com.xnjr.app.security.req.XNlh0010Req;
import com.xnjr.app.security.req.XNlh0011Req;
import com.xnjr.app.security.res.XNlh0001Res;
import com.xnjr.app.security.res.XNlh0005Res;
import com.xnjr.app.security.res.XNlh0011Res;
import com.xnjr.app.security.res.XNlh0012Res;
import com.xnjr.app.util.MD5Util;
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
    public Object queryUserPage(String kind, String roleCode, String loginName,
            String userReferee, String status, String contact, String updater,
            String start, String limit) {
        XNlh0000Req req = new XNlh0000Req();
        req.setKind(kind);
        req.setRoleCode(roleCode);
        req.setLoginName(loginName);
        req.setUserReferee(userReferee);
        req.setStatus(status);
        req.setContact(contact);
        req.setUpdater(updater);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("lh0000", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public List<XNlh0001Res> queryUserList(String userId, String kind,
            String roleCode, String loginName, String userReferee,
            String status, String contact, String updater) {
        XNlh0001Req req = new XNlh0001Req();
        req.setUserId(userId);
        req.setKind(kind);
        req.setRoleCode(roleCode);
        req.setLoginName(loginName);
        req.setUserReferee(userReferee);
        req.setStatus(status);
        req.setContact(contact);
        req.setUpdater(updater);
        String jsonStr = BizConnecter.getBizData("lh0001",
            JsonUtils.object2Json(req));
        Gson gson = new Gson();
        List<XNlh0001Res> list = gson.fromJson(jsonStr,
            new TypeToken<List<XNlh0001Res>>() {
            }.getType());
        return list;
    }

    @Override
    public Object addUser(String loginName, String userRefence, String idKind,
            String idNo, String realName, String contact, String updater,
            String kind, String remark) {
        XNlh0002Req req = new XNlh0002Req();
        req.setLoginName(loginName);
        req.setUserReferee(userRefence);
        req.setIdKind(idKind);
        req.setIdNo(idNo);
        req.setRealName(realName);
        req.setContact(contact);
        req.setUpdater(updater);
        req.setKind(kind);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh0002", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object cancelUser(String userId, String updater, String remark) {
        XNlh0003Req req = new XNlh0003Req();
        req.setUserId(userId);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh0003", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object realUser(String userId, String idKind, String idNo,
            String realName, String updater, String remark) {
        XNlh0004Req req = new XNlh0004Req();
        req.setUserId(userId);
        req.setIdKind(idKind);
        req.setIdNo(idNo);
        req.setRealName(realName);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh0004", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public XNlh0005Res changePsd(String userId, String oldLoginPwd,
            String newLoginPwd, String updater, String remark) {
        XNlh0005Req req = new XNlh0005Req();
        req.setUserId(userId);
        req.setOldLoginPwd(MD5Util.md5(oldLoginPwd));
        req.setNewLoginPwd(MD5Util.md5(newLoginPwd));
        req.setNewLoginPwdStrength(PwdUtil.calculateSecurityLevel(newLoginPwd));
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh0005", JsonUtils.object2Json(req),
            XNlh0005Res.class);
    }

    @Override
    public Object changePsdByAdmin(String adminId, String adminTradePwd,
            String userId) {
        XNlh0006Req req = new XNlh0006Req();
        req.setAdminId(adminId);
        req.setAdminTradePwd(MD5Util.md5(adminTradePwd));
        req.setUserId(userId);
        return BizConnecter.getBizData("lh0006", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object exchangePsd(String userId, String oldTradePwd,
            String newTradePwd, String newTradePwdStrength, String updater,
            String remark) {
        XNlh0007Req req = new XNlh0007Req();
        req.setUserId(userId);
        req.setOldTradePwd(MD5Util.md5(oldTradePwd));
        req.setNewTradePwd(MD5Util.md5(newTradePwd));
        req.setNewTradePwdStrength(PwdUtil.calculateSecurityLevel(newTradePwd));
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh0007", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object exchangePsdByAdmin(String adminId, String adminTradePwd,
            String userId) {
        XNlh0008Req req = new XNlh0008Req();
        req.setAdminId(adminId);
        req.setAdminTradePwd(MD5Util.md5(adminTradePwd));
        req.setUserId(userId);
        return BizConnecter.getBizData("lh0008", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object editUserlink(String userId, String updater, String remark) {
        XNlh0009Req req = new XNlh0009Req();
        req.setUserId(userId);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh0009", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object allotRole(String userId, String roleCode, String updater,
            String remark) {
        XNlh0010Req req = new XNlh0010Req();
        req.setUserId(userId);
        req.setRoleCode(roleCode);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh0010", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public XNlh0011Res login(String loginName, String loginPwd, String loginIp) {
        XNlh0011Req req = new XNlh0011Req();
        req.setLoginName(loginName);
        req.setLoginPwd(MD5Util.md5(loginPwd));
        req.setLoginIp(loginIp);
        return BizConnecter.getBizData("lh0011", JsonUtils.object2Json(req),
            XNlh0011Res.class);
    }

    @Override
    public XNlh0012Res getUser(String userId) {
        return BizConnecter.getBizData("lh0012",
            JsonUtils.string2Json("userId", userId), XNlh0012Res.class);
    }

    @Override
    public Object editUser(String userId, String contact, String updater,
            String remark) {
        XNlh0009Req req = new XNlh0009Req();
        req.setUserId(userId);
        req.setContact(contact);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh0009", JsonUtils.object2Json(req),
            Object.class);
    }

}
