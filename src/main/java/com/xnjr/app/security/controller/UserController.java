package com.xnjr.app.security.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.exception.BizException;
import com.xnjr.app.security.ao.IMenuRoleAO;
import com.xnjr.app.security.ao.IRoleAO;
import com.xnjr.app.security.ao.IUserAO;
import com.xnjr.app.security.res.XNlh0011Res;
import com.xnjr.app.security.res.XNlh0012Res;
import com.xnjr.app.session.ISessionProvider;
import com.xnjr.app.session.SessionUser;

/**
 * @author: XIANDONG 
 * @since: 2016年4月17日 下午6:46:27 
 * @history:
 */
@Controller
@RequestMapping(value = "/user")
public class UserController extends BaseController {
    @Autowired
    protected IRoleAO roleAO;

    @Autowired
    protected IUserAO userAO;

    @Autowired
    protected IMenuRoleAO roleMenuAO;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Object doLogin(@RequestParam("loginName") String loginName,
            @RequestParam("loginPwd") String loginPwd) {
        // 校验用户名密码
        XNlh0011Res res = userAO.login(loginName, loginPwd, getRemoteHost());
        // 创建session
        sessionProvider.setUserDetail(new SessionUser(res.getUserId(),
            loginName));
        return true;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    @ResponseBody
    public boolean logout() {
        sessionProvider.removeAttribute(ISessionProvider.SESSION_KEY_USER);
        return true;
    }

    @RequestMapping(value = "/pwd/change", method = RequestMethod.POST)
    @ResponseBody
    public Object changePsd(@RequestParam("oldLoginPwd") String oldLoginPwd,
            @RequestParam("newLoginPwd") String newLoginPwd,
            @RequestParam("remark") String remark) {
        return userAO.changePsd(this.getSessionUser().getUserCode(),
            oldLoginPwd, newLoginPwd, this.getSessionUser().getUserName(),
            remark);
    }

    @RequestMapping(value = "/pwd/reset", method = RequestMethod.POST)
    @ResponseBody
    public Object changePsdByAdmin(@RequestParam("adminPwd") String adminPwd,
            @RequestParam("userId") String userId) {
        return userAO.changePsdByAdmin(this.getSessionUser().getUserCode(),
            adminPwd, userId);
    }

    @RequestMapping(value = "/pwd/real", method = RequestMethod.POST)
    @ResponseBody
    public Object realUser(@RequestParam("idKind") String idKind,
            @RequestParam("idNo") String idNo,
            @RequestParam("realName") String realName,
            @RequestParam("userId") String userId,
            @RequestParam("remark") String remark) {
        return userAO.realUser(userId, idKind, idNo, realName, this
            .getSessionUser().getUserCode(), remark);
    }

    @RequestMapping(value = "/pwd/resetpsd", method = RequestMethod.POST)
    @ResponseBody
    public Object exchangePsdByAdmin(
            @RequestParam("adminTradePwd") String adminTradePwd,
            @RequestParam("userId") String userId) {
        return userAO.exchangePsdByAdmin(this.getSessionUser().getUserCode(),
            adminTradePwd, userId);
    }

    @RequestMapping(value = "/role/change", method = RequestMethod.POST)
    @ResponseBody
    public Object changeUserRole(@RequestParam("userId") String userId,
            @RequestParam("roleCode") String roleCode,
            @RequestParam(value = "remark", required = false) String remark) {
        return userAO.allotRole(userId, roleCode, this.getSessionUser()
            .getUserName(), remark);
    }

    // 权限--UI显示
    @RequestMapping(value = "/roleMenu/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryRoleMenu(
            @RequestParam(value = "parentCode", required = true) String parentCode,
            @RequestParam(value = "type", required = true) String type,
            @RequestParam(value = "isGetChild", required = true) boolean isGetChild) {
        XNlh0012Res user = userAO.getUser(this.getSessionUser().getUserCode());
        String roleCode = user.getRoleCode();
        if (StringUtils.isBlank(roleCode)) {
            throw new BizException("XN700001", "该用户角色为空");
        }
        return roleMenuAO.queryMenuList(roleCode, parentCode, type, isGetChild);
    }

    // 用户本身增删改查
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addUser(
            @RequestParam("loginName") String loginName,
            @RequestParam(value = "userReferee", required = false) String userRefence,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam("realName") String realName,
            @RequestParam(value = "contact", required = false) String contact,
            @RequestParam(value = "remark", required = false) String remark) {
        XNlh0012Res user = userAO.getUser(this.getSessionUser().getUserCode());
        return userAO.addUser(loginName, userRefence, idKind, idNo, realName,
            contact, this.getSessionUser().getUserName(), user.getKind(),
            remark);
    }

    // 用户本身增删改查
    @RequestMapping(value = "/replace/add", method = RequestMethod.POST)
    @ResponseBody
    public Object replaceUser(
            @RequestParam("loginName") String loginName,
            @RequestParam(value = "userReferee", required = false) String userRefence,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam("realName") String realName,
            @RequestParam(value = "contact", required = false) String contact,
            @RequestParam(value = "remark", required = false) String remark,
            @RequestParam("kind") String kind) {
        return userAO.addUser(loginName, userRefence, idKind, idNo, realName,
            contact, this.getSessionUser().getUserName(), kind, remark);
    }

    @RequestMapping(value = "/drop", method = RequestMethod.POST)
    @ResponseBody
    public Object dropUser(@RequestParam("userId") String userId,
            @RequestParam(value = "remark", required = false) String remark) {
        return userAO.cancelUser(userId, this.getSessionUser().getUserName(),
            remark);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryUserList(
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "roleCode", required = false) String roleCode,
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "userReferee", required = false) String userReferee,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "contact", required = false) String contact,
            @RequestParam(value = "updater", required = false) String updater) {
        XNlh0012Res user = userAO.getUser(this.getSessionUser().getUserCode());
        kind = getKind(user, kind);
        return userAO.queryUserList(null, kind, roleCode, loginName,
            userReferee, status, contact, updater);
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryUserPage(
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "roleCode", required = false) String roleCode,
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "userReferee", required = false) String userReferee,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "contact", required = false) String contact,
            @RequestParam(value = "updater", required = false) String updater,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        XNlh0012Res user = userAO.getUser(this.getSessionUser().getUserCode());
        kind = getKind(user, kind);
        return userAO.queryUserPage(kind, roleCode, loginName, userReferee,
            status, contact, updater, start, limit);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object getDetailUser(@RequestParam("userId") String userId) {
        return userAO.getUser(userId);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseBody
    public Object getUser() {
        return userAO.getUser(this.getSessionUser().getUserCode());
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editUser(@RequestParam(value = "userId") String userId,
            @RequestParam(value = "contact") String contact,
            @RequestParam(value = "remark") String remark) {
        return userAO.editUser(userId, contact, this.getSessionUser()
            .getUserName(), remark);
    }
}
