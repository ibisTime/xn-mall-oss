package com.xnjr.app.general.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.general.ao.ISystemAO;

@Controller
@RequestMapping(value = "general/system")
public class SystemController extends BaseController {
    @Autowired
    ISystemAO systemAo;

    @RequestMapping(value = "/log/page", method = RequestMethod.GET)
    @ResponseBody
    public Object querySystemLog(
            @RequestParam(value = "table", required = false) String table,
            @RequestParam(value = "operateType", required = false) String operateType,
            @RequestParam(value = "operater", required = false) String operater,
            @RequestParam(value = "operateDatetimeStart", required = false) String operateDatetimeStart,
            @RequestParam(value = "operateDatetimeEnd", required = false) String operateDatetimeEnd,
            @RequestParam(value = "start", required = true) String start,
            @RequestParam(value = "limit", required = true) String limit,
            @RequestParam(value = "orderDir", required = false) String orderDir,
            @RequestParam(value = "orderColoum", required = false) String orderColoum) {
        return systemAo.querySystemLog(table, operateType, operater,
            operateDatetimeStart, operateDatetimeEnd, start, limit, orderDir,
            orderColoum);
    }

    @RequestMapping(value = "param/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addSystemParam(@RequestParam("key") String key,
            @RequestParam("value") String value,
            @RequestParam("note") String note,
            @RequestParam(value = "remark", required = false) String remark) {
        return systemAo.addSystemParam(key, value, note, this.getSessionUser()
            .getUserName(), remark);
    }

    @RequestMapping(value = "param/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editSystemParam(@RequestParam("id") String id,
            @RequestParam("value") String value,
            @RequestParam("note") String note,
            @RequestParam(value = "remark", required = false) String remark) {
        return systemAo.editSystemParam(id, value, note, this.getSessionUser()
            .getUserName(), remark);
    }

    @RequestMapping(value = "param/page", method = RequestMethod.GET)
    @ResponseBody
    public Object querySystemParamPage(
            @RequestParam("key") String key,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return systemAo.querySystemParamPage(key, start, limit, orderColumn,
            orderDir);
    }

    @RequestMapping(value = "param/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object querySystemParamDetail(@RequestParam("id") String id) {
        return systemAo.querySystemParamDetail(id);
    }
}
