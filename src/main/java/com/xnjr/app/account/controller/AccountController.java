package com.xnjr.app.account.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.account.ao.IAccountAO;
import com.xnjr.app.controller.BaseController;

@Controller
@RequestMapping(value = "/account")
public class AccountController extends BaseController {
    @Autowired
    IAccountAO accountAO;

    @RequestMapping(value = "/edit", method = RequestMethod.GET)
    @ResponseBody
    public Object editAccount(@RequestParam("userId") String userId,
            @RequestParam("roleCode") String roleCode,
            // @RequestParam("updater") String updater,
            @RequestParam(value = "remark", required = false) String remark) {
        return accountAO.editAccount(userId, roleCode, this.getSessionUser()
            .getUserName(), remark);
    }

    @RequestMapping(value = "/queryPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryAccountPage(
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "userKind", required = false) String userKind,
            @RequestParam(value = "userReferee", required = false) String userReferee,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit) {
        return accountAO.queryAccountPage(loginName, mobile, userKind,
            userReferee, idKind, idNo, realName, status, level, start, limit);
    }

    @RequestMapping(value = "/queryList", method = RequestMethod.GET)
    @ResponseBody
    public Object queryAccountList(
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "userKind", required = false) String userKind,
            @RequestParam(value = "userReferee", required = false) String userReferee,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "level", required = false) String level) {
        return accountAO.queryAccountList(loginName, mobile, userKind,
            userReferee, idKind, idNo, realName, status, level);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object accountDetail(@RequestParam("userId") String userId) {
        return accountAO.accountDetail(userId);
    }

}
