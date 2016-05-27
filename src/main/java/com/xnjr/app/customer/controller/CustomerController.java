package com.xnjr.app.customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.customer.ao.ICustomerAO;

@Controller
@RequestMapping(value = "/customer")
public class CustomerController extends BaseController {
    @Autowired
    ICustomerAO customerAO;

    @RequestMapping(value = "/edit", method = RequestMethod.GET)
    @ResponseBody
    public Object editAccount(@RequestParam("userId") String userId,
            @RequestParam("roleCode") String roleCode,
            // @RequestParam("updater") String updater,
            @RequestParam(value = "remark", required = false) String remark) {
        return customerAO.editCustomer(userId, roleCode, this.getSessionUser()
            .getUserName(), remark);
    }

    @RequestMapping(value = "/queryPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryCustomerPage(
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
        return customerAO.queryCustomerPage(loginName, mobile, userKind,
            userReferee, idKind, idNo, realName, status, level, start, limit);
    }

    @RequestMapping(value = "/queryList", method = RequestMethod.GET)
    @ResponseBody
    public Object queryCustomerList(
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "userKind", required = false) String userKind,
            @RequestParam(value = "userReferee", required = false) String userReferee,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "level", required = false) String level) {
        return customerAO.queryCustomerList(loginName, mobile, userKind,
            userReferee, idKind, idNo, realName, status, level);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object customerDetail(@RequestParam("userId") String userId) {
        return customerAO.customerDetail(userId);
    }

}
