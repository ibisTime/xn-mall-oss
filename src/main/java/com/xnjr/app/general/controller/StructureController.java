package com.xnjr.app.general.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.general.ao.IStructureAO;

@Controller
@RequestMapping(value = "/general/structure")
public class StructureController extends BaseController {
    @Autowired
    protected IStructureAO structureAO;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addStructure(@RequestParam("name") String name,
            @RequestParam("status") String status,
            @RequestParam("summary") String summary,
            @RequestParam("description") String description,
            @RequestParam(value = "remark", required = false) String remark) {
        return structureAO.addStructure(name, status, summary, description,
            this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/drop", method = RequestMethod.POST)
    @ResponseBody
    public Object deleteStructure(@RequestParam("code") String code) {
        return structureAO.dropStructure(code);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editStructure(@RequestParam("code") String code,
            @RequestParam("name") String name,
            @RequestParam("status") String status,
            @RequestParam("summary") String summary,
            @RequestParam("description") String description,
            @RequestParam("remark") String remark) {
        return structureAO.editStructure(code, name, summary, description, this
            .getSessionUser().getUserId(), remark, status);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryStructureList(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status) {
        return structureAO.queryStructureList(name, status);
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryStructurePage(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return structureAO.queryStructurePage(name, status, start, limit,
            orderColumn, orderDir);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object queryStructurePage(@RequestParam("code") String code) {
        return structureAO.getStructure(code);
    }
}
