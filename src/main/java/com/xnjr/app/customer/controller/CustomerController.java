package com.xnjr.app.customer.controller;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.customer.ao.ICustomerAO;
import com.xnjr.app.enums.EUserKind;
import com.xnjr.app.security.ao.IUserAO;

@Controller
@RequestMapping(value = "/customer")
public class CustomerController extends BaseController {
    @Autowired
    ICustomerAO customerAO;

    @Autowired
    IUserAO userAO;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addUser(@RequestParam("loginName") String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "userReferee", required = false) String userReferee,
            @RequestParam(value = "remark", required = false) String remark,
            // @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "pdf", required = false) String pdf) {
        return userAO.addUser(loginName, mobile, idKind, idNo, realName,
            userReferee, this.getSessionUser().getUserName(), remark,
            EUserKind.F1.getCode(), pdf);
    }

    @RequestMapping(value = "/huoyuan/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addhuopin(@RequestParam("loginName") String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            // @RequestParam(value = "userReferee", required = false) String
            // userReferee,
            @RequestParam(value = "remark", required = false) String remark,
            // @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "pdf", required = false) String pdf) {
        return userAO.addUser(loginName, mobile, idKind, idNo, realName,
            this.getSessionUser().getUserId(),
            this.getSessionUser().getUserName(), remark,
            EUserKind.Goods.getCode(), pdf);
    }

    @RequestMapping(value = "/jifen/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addjifen(@RequestParam("loginName") String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            // @RequestParam(value = "userReferee", required = false) String
            // userReferee,
            @RequestParam(value = "remark", required = false) String remark,
            // @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "pdf", required = false) String pdf) {
        return userAO.addUser(loginName, mobile, idKind, idNo, realName,
            this.getSessionUser().getUserId(),
            this.getSessionUser().getUserName(), remark,
            EUserKind.Integral.getCode(), pdf);
    }

    @RequestMapping(value = "/zhongduan/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addzhongduan(@RequestParam("loginName") String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            // @RequestParam(value = "userReferee", required = false) String
            // userReferee,
            @RequestParam(value = "remark", required = false) String remark,
            // @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "pdf", required = false) String pdf) {
        return userAO.addUser(loginName, mobile, idKind, idNo, realName,
            this.getSessionUser().getUserId(),
            this.getSessionUser().getUserName(), remark, EUserKind.F1.getCode(),
            pdf);
    }

    @RequestMapping(value = "/queryPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryCustomerPage(
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "userReferee", required = false) String userReferee,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit) {
        return userAO.queryUserPage(loginName, EUserKind.F1.getCode(), level,
            userReferee, mobile, idKind, idNo, realName, null, status, null,
            start, limit);
    }

    @RequestMapping(value = "/queryxiajiaPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryxiajiaPage(
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            // @RequestParam(value = "userReferee", required = false) String
            // userReferee,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit) {
        return userAO.queryUserPage(loginName, EUserKind.Integral.getCode(),
            level, this.getSessionUser().getUserId(), mobile, idKind, idNo,
            realName, null, status, null, start, limit);
    }

    @RequestMapping(value = "/huoyuanPage", method = RequestMethod.GET)
    @ResponseBody
    public Object huoyuanPage(
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit) {
        return userAO.queryUserPage(loginName, EUserKind.Goods.getCode(), level,
            this.getSessionUser().getUserId(), mobile, idKind, idNo, realName,
            null, status, null, start, limit);
    }
    
    @RequestMapping(value = "/jiaMengPage", method = RequestMethod.GET)
    @ResponseBody
    public Object jiaMengPage(
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit) {
        return userAO.queryUserPage(loginName, EUserKind.CaiGo.getCode(), level,
            this.getSessionUser().getUserId(), mobile, idKind, idNo, realName,
            null, status, null, start, limit);
    }

    @RequestMapping(value = "/detailmoney", method = RequestMethod.GET)
    @ResponseBody
    public Object detailmoney(@RequestParam("userId") String userId) {
        return customerAO.detailmoney(userId);
    }

    @RequestMapping(value = "/jifenPage", method = RequestMethod.GET)
    @ResponseBody
    public Object jifenPage(
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            // @RequestParam(value = "userReferee", required = false) String
            // userReferee,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit) {
        return userAO.queryUserPage(loginName, EUserKind.Integral.getCode(),
            level, this.getSessionUser().getUserId(), mobile, idKind, idNo,
            realName, null, status, null, start, limit);
    }

    @RequestMapping(value = "/zhongduanPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryZhongduanPage(
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            // @RequestParam(value = "userReferee", required = false) String
            // userReferee,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit) {
        return userAO.queryUserPage(loginName, EUserKind.F1.getCode(), level,
            this.getSessionUser().getUserId(), mobile, idKind, idNo, realName,
            null, status, null, start, limit);
    }

    @RequestMapping(value = "/queryList", method = RequestMethod.GET)
    @ResponseBody
    public Object queryCustomerList(
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "userReferee", required = false) String userReferee,
            @RequestParam(value = "idKind", required = false) String idKind,
            @RequestParam(value = "idNo", required = false) String idNo,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "level", required = false) String level) {
        return userAO.queryUserList(loginName, EUserKind.F1.getCode(), level,
            userReferee, mobile, idKind, idNo, realName, null, status, null);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object customerDetail(@RequestParam("userId") String userId) {
        return userAO.getUser(userId);
    }

    // 渠道商新增
    @RequestMapping(value = "/channel/add", method = RequestMethod.POST)
    @ResponseBody
    public Object channeladd(@RequestParam(value = "mobile") String mobile,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "userReferee", required = false) String userReferee,
            @RequestParam(value = "remark", required = false) String remark,
            @RequestParam(value = "kind") String kind,
            @RequestParam(value = "province") String province,
            @RequestParam(value = "city") String city,
            @RequestParam(value = "district") String district,
            @RequestParam(value = "detailAddress") String detailAddress,
            @RequestParam(value = "isDefault", required = false) String isDefault) {
        return customerAO.channeladd(mobile, realName, userReferee,
            this.getSessionUser().getUserId(), remark, kind, province, city,
            district, detailAddress, isDefault);
    }

    // 渠道商修改名称
    @RequestMapping(value = "/channel/editname", method = RequestMethod.POST)
    @ResponseBody
    public Object channeleditame(@RequestParam(value = "userId") String userId,
            @RequestParam(value = "realName") String realName) {
        return customerAO.channeleditName(userId, realName);

    }

    // 渠道商修改名称
    @RequestMapping(value = "/own/account", method = RequestMethod.GET)
    @ResponseBody
    public Object owner(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "currency") String currency) {
    	if (StringUtils.isBlank(userId)) {
			userId = this.getSessionUser().getUserId();
		}
        return customerAO.detailaccount(userId, currency);

    }

}
