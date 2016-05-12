package com.xnjr.app.general.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.general.ao.IDictAO;

@Controller
@RequestMapping(value = "/general/dict")
public class DictController extends BaseController {
    @Autowired
    protected IDictAO dictAO;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addDict(@RequestParam("type") String type,
            @RequestParam("parentKey") String parentKey,
            @RequestParam("dkey") String dkey,
            @RequestParam("dvalue") String dvalue,
            @RequestParam(value = "remark", required = false) String remark) {
        return dictAO.addDict(type, parentKey, dkey, dvalue, this
            .getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/drop", method = RequestMethod.POST)
    @ResponseBody
    public Object dropDict(@RequestParam("id") String id) {
        return dictAO.dropDict(id);

    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editDict(@RequestParam("id") String id,
            @RequestParam("dvalue") String dvalue,
            @RequestParam(value = "remark", required = false) String remark) {
        return dictAO.editDict(id, dvalue, this.getSessionUser().getUserName(),
            remark);
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryDictPage(
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "parentKey", required = false) String parentKey,
            @RequestParam(value = "dkey", required = false) String dkey,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return dictAO.queryDictPage(type, parentKey, dkey, start, limit,
            orderColumn, orderDir);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryDictList(
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "parentKey", required = false) String parentKey,
            @RequestParam(value = "dkey", required = false) String dkey,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return dictAO.queryDictList(type, parentKey, dkey, orderColumn,
            orderDir);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object queryDictDetail(@RequestParam(value = "id") String id) {
        return dictAO.queryDictDetail(id);
    }
}
