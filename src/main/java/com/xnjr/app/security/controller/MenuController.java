package com.xnjr.app.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.security.ao.IMenuAO;

/**
 * 菜单管理
 * @author: XIANDONG 
 * @since: 2016年4月17日 下午4:46:21 
 * @history:
 */
@Controller
@RequestMapping(value = "/menu")
public class MenuController extends BaseController {

    @Autowired
    protected IMenuAO menuAO;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addmenu(
            @RequestParam("kind") String kind,
            @RequestParam("name") String name,
            @RequestParam("url") String url,
            @RequestParam(value = "parentCode", required = false) String parentCode,
            @RequestParam("type") String type,
            @RequestParam("orderNo") String orderNo,
            @RequestParam(value = "remark", required = false) String remark) {
        return menuAO.addMenu(kind, name, url, parentCode, type, orderNo, this
            .getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/drop", method = RequestMethod.POST)
    @ResponseBody
    public Object dropMenu(@RequestParam("code") String code) {
        return menuAO.dropMenu(code);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editMenu(
            @RequestParam("code") String code,
            @RequestParam("kind") String kind,
            @RequestParam("name") String name,
            @RequestParam("url") String url,
            @RequestParam(value = "parentCode", required = false) String parentCode,
            @RequestParam("type") String type,
            @RequestParam("orderNo") String orderNo,
            @RequestParam(value = "remark", required = false) String remark) {
        return menuAO.editMenu(code, kind, name, url, parentCode, type,
            orderNo, this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryMenuPage(
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "parentCode", required = false) String parentCode,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "updater", required = false) String updater,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return menuAO.queryMenuPage(kind, name, parentCode, type, updater,
            start, limit);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryMenuList(
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "url", required = false) String url,
            @RequestParam(value = "parentCode", required = false) String parentCode,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "updater", required = false) String updater) {
        return menuAO.queryMenuList(kind, name, url, parentCode, type, updater);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object getMenu(@RequestParam(value = "code") String code) {
        return menuAO.getMenu(code);
    }

}
