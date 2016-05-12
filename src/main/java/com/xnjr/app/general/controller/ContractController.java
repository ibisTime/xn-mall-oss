package com.xnjr.app.general.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.general.ao.IContractAO;
import com.xnjr.app.res.Page;

@Controller
@RequestMapping(value = "general/contractTemplate")
public class ContractController extends BaseController {
    @Autowired
    IContractAO contractTemplateAO;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addContractTemplate(@RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("type") String type,
            @RequestParam("status") String status,
            @RequestParam(value = "remark", required = false) String remark) {
        return contractTemplateAO.addContractTemplate(title, content, type,
            status, this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/drop", method = RequestMethod.POST)
    @ResponseBody
    public boolean deleteContractTemplate(@RequestParam("id") String id) {
        return contractTemplateAO.deleteContractTemplate(id);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public boolean editContractTemplate(@RequestParam("id") String id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("type") String type,
            @RequestParam("status") String status,
            @RequestParam(value = "remark", required = false) String remark) {
        return contractTemplateAO.editContractTemplate(id, title, content,
            type, status, this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryContractTemplateList(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return contractTemplateAO.queryContractTemplateList(title, type,
            status, orderColumn, orderDir);
    }

    @SuppressWarnings("rawtypes")
    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Page queryContractTemplatePage(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return contractTemplateAO.queryContractTemplatePage(title, type,
            status, start, limit, orderColumn, orderDir);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object getContractTemplate(
            @RequestParam(value = "id", required = true) String id) {
        return contractTemplateAO.getContractTemplate(id);
    }
}
