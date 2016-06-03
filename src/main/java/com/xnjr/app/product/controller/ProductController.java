package com.xnjr.app.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.product.ao.IProductAO;

/**
 * 产品
 * @author: XIANDONG 
 * @since: 2016年5月17日 下午12:01:40 
 * @history:
 */
@Controller
@RequestMapping(value = "/product")
public class ProductController extends BaseController {

    @Autowired
    protected IProductAO productAO;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Object addproduct(@RequestParam("type") String type,
            @RequestParam("name") String name,
            @RequestParam("advTitle") String advTitle,
            @RequestParam("advPic") String advPic,
            @RequestParam("majorPic") String majorPic,
            @RequestParam("majorText") String majorText,
            @RequestParam("familyPic") String familyPic,
            @RequestParam("familyText") String familyText,
            @RequestParam("highlightPic") String highlightPic,
            @RequestParam("highlightText") String highlightText,
            @RequestParam(value = "remark", required = false) String remark) {
        return productAO.addProduct(type, name, advTitle, advPic, majorPic,
            majorText, familyPic, familyText, highlightPic, highlightText,
            this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editMenu(@RequestParam("code") String code,
            @RequestParam("type") String type,
            @RequestParam("name") String name,
            @RequestParam("advTitle") String advTitle,
            @RequestParam("advPic") String advPic,
            @RequestParam("majorPic") String majorPic,
            @RequestParam("majorText") String majorText,
            @RequestParam("familyPic") String familyPic,
            @RequestParam("highlightPic") String highlightPic,
            @RequestParam("highlightText") String highlightText,
            @RequestParam("familyText") String familyText,
            @RequestParam(value = "remark", required = false) String remark) {
        return productAO.editProduct(code, type, name, advTitle, advPic,
            majorPic, majorText, familyPic, familyText, highlightPic,
            highlightText, this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryProductPage(
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "updater", required = false) String updater,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return productAO.queryProductPage(type, name, status, updater, start,
            limit, orderColumn, orderDir);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryProductList(
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "updater", required = false) String updater,
            @RequestParam(value = "status", required = false) String status) {
        return productAO.queryProductList(type, name, updater, status);
    }

    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object detailProduct(@RequestParam(value = "code") String code) {
        return productAO.detailProduct(code);
    }

    @RequestMapping(value = "/check", method = RequestMethod.POST)
    @ResponseBody
    public Object checkProduct(@RequestParam(value = "code") String code,
            // @RequestParam(value = "checkUser") String checkUser,
            @RequestParam(value = "checkResult") String checkResult,
            @RequestParam(value = "checkNote") String checkNote) {
        return productAO.checkProduct(code, this.getSessionUser().getUserName(),
            checkResult, checkNote);
    }

    @RequestMapping(value = "/up", method = RequestMethod.POST)
    @ResponseBody
    public Object upProduct(@RequestParam(value = "code") String code,
            @RequestParam(value = "checkResult") String checkResult,
            @RequestParam(value = "checkNote") String checkNote) {
        return productAO.upProduct(code, this.getSessionUser().getUserName(),
            checkResult, checkNote);
    }

}
