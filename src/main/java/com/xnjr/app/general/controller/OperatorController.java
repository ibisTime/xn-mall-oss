package com.xnjr.app.general.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.general.ao.IOperatorAO;

@Controller
@RequestMapping(value = "/general/operator")
public class OperatorController extends BaseController {
    @Autowired
    protected IOperatorAO operatoAO;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addOperator(@RequestParam("userId") String userId,
            @RequestParam("mobile") String mobile,
            @RequestParam("level") String level,
            @RequestParam("photo") String photo,
            @RequestParam("introduction") String introduction,
            @RequestParam(value = "remark", required = false) String remark) {
        return operatoAO.addOperator(userId, mobile, level, photo,
            introduction, this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editOperator(@RequestParam("userId") String userId,
            @RequestParam("mobile") String mobile,
            @RequestParam("level") String level,
            @RequestParam("photo") String photo,
            @RequestParam("introduction") String introduction,
            @RequestParam(value = "remark", required = false) String remark) {
        return operatoAO.editOperator(userId, mobile, level, photo,
            introduction, this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryOperatorList(
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "level", required = false) String level) {
        return operatoAO.queryOperatorList(mobile, realName, level);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object detailPage(@RequestParam("userId") String userId) {
        return operatoAO.detailPage(userId);
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryOperatorPage(
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "realName", required = false) String realName,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return operatoAO.queryOperatorPage(mobile, realName, level, start,
            limit, orderColumn, orderDir);
    }
}
