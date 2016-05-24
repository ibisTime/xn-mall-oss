package com.xnjr.app.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.xnjr.app.controller.BaseController;
import com.xnjr.app.product.ao.IModelAO;
import com.xnjr.app.product.req.ModelSpecs;

/**
 * 产品
 * @author: XIANDONG 
 * @since: 2016年5月17日 下午12:01:40 
 * @history:
 */
@Controller
@RequestMapping(value = "/model")
public class ModelController extends BaseController {

    @Autowired
    protected IModelAO modelAO;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addModel(@RequestParam("productCode") String productCode,
            @RequestParam("name") String name,
            @RequestParam("pic1") String pic1,
            @RequestParam("pic2") String pic2,
            @RequestParam("pic3") String pic3,
            @RequestParam("description") String description,
            @RequestParam(value = "specsTableJson", required = true) String specsTableJson) {
        Gson gson = new Gson();
        List<ModelSpecs> modelSpecsList = gson.fromJson(specsTableJson,
            new TypeToken<List<ModelSpecs>>() {
            }.getType());
        return modelAO.addModel(productCode, name, pic1, pic2, pic3,
            description, modelSpecsList, this.getSessionUser().getUserName());
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editModel(@RequestParam("code") String code,
            @RequestParam("productCode") String productCode,
            @RequestParam("name") String name,
            @RequestParam("pic1") String pic1,
            @RequestParam("pic2") String pic2,
            @RequestParam("pic3") String pic3,
            @RequestParam("description") String description,
            @RequestParam("modelSpecsList") List<ModelSpecs> modelSpecsList
    // @RequestParam("updater") String updater
    ) {
        return modelAO.editModel(code, productCode, name, pic1, pic2, pic3,
            description, modelSpecsList, this.getSessionUser().getUserName());
    }

    @RequestMapping(value = "/check", method = RequestMethod.POST)
    @ResponseBody
    public Object checkModel(@RequestParam("code") String code,
            // @RequestParam("checkUser") String checkUser,
            @RequestParam("checkResult") String checkResult,
            @RequestParam("checkNote") String checkNote) {
        return modelAO.checkModel(code, this.getSessionUser().getUserName(),
            checkResult, checkNote);
    }

    @RequestMapping(value = "/updown", method = RequestMethod.POST)
    @ResponseBody
    public Object updownModel(@RequestParam("code") String code,
            // @RequestParam("checkUser") String checkUser,
            @RequestParam("checkResult") String checkResult,
            @RequestParam("checkNote") String checkNote) {
        return modelAO.updownModel(code, this.getSessionUser().getUserName(),
            checkResult, checkNote);
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryModelPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "productCode", required = false) String productCode,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return modelAO.queryModelPage(code, name, status, productCode, start,
            limit, orderColumn, orderDir);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryMOdelList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "productCode", required = false) String productCode) {
        return modelAO.queryMOdelList(code, name, status, productCode);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object detailModel(@RequestParam(value = "code") String code) {
        return modelAO.detailModel(code);
    }

}
