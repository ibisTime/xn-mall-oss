package com.xnjr.app.repair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.repair.ao.IRepairAO;

@Controller
@RequestMapping(value = "/repair")
public class RepairController extends BaseController {
    @Autowired
    IRepairAO repairAO;

    @RequestMapping(value = "/queryPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryRepairPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "goodsCode", required = false) String goodsCode,
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "applyUser", required = false) String applyUser,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "updater", required = false) String updater,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return repairAO.queryRepairPage(code, goodsCode, userId, applyUser,
            status, updater, start, limit, orderColumn, orderDir);
    }

    @RequestMapping(value = "/queryDetailPage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryRepairDetailPage(
            @RequestParam(value = "code", required = false) String code) {
        return repairAO.queryRepairDetailPage(code);
    }

    @RequestMapping(value = "/repairDeal", method = RequestMethod.POST)
    @ResponseBody
    public Object repairDeal(@RequestParam("code") String code,
            @RequestParam("checkResult") String checkResult,
            @RequestParam(value = "remark", required = false) String remark) {
        return repairAO.repairDeal(code, checkResult, this.getSessionUser()
            .getUserName(), remark);
    }

}
