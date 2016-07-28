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
    public Object addproduct(
    		@RequestParam("category") String category,
    		@RequestParam("type") String type,
    		@RequestParam("typePic") String typePic,
            @RequestParam("name") String name,
            @RequestParam("orderNo") String order,
            @RequestParam("status") String status,
            @RequestParam("advTitle") String advTitle,
            @RequestParam("advPic") String advPic,
            @RequestParam(value = "majorPic", required = false) String majorPic,
            @RequestParam(value = "majorText", required = false) String majorText,
            @RequestParam(value = "familyPic", required = false) String familyPic,
            @RequestParam(value = "familyText", required = false) String familyText,
            @RequestParam(value = "highlightPic", required = false) String highlightPic,
            @RequestParam(value = "highlightText", required = false) String highlightText,
            @RequestParam(value = "remark", required = false) String remark) {
        return productAO.addProduct(category, type, typePic, name, order, status, advTitle, advPic, majorPic,
            majorText, familyPic, familyText, highlightPic, highlightText,
            this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editMenu(@RequestParam("code") String code,
    		@RequestParam("category") String category,
    		@RequestParam("type") String type,
    		@RequestParam("typePic") String typePic,
            @RequestParam("name") String name,
            @RequestParam("orderNo") String order,
            @RequestParam("status") String status,
            @RequestParam("advTitle") String advTitle,
            @RequestParam("advPic") String advPic,
            @RequestParam(value = "majorPic", required = false) String majorPic,
            @RequestParam(value = "majorText", required = false) String majorText,
            @RequestParam(value = "familyPic", required = false) String familyPic,
            @RequestParam(value = "familyText", required = false) String familyText,
            @RequestParam(value = "highlightPic", required = false) String highlightPic,
            @RequestParam(value = "highlightText", required = false) String highlightText,
            @RequestParam(value = "remark", required = false) String remark) {
        return productAO.editProduct(code, category, type, typePic, name, order, status, advTitle, advPic, majorPic,
                majorText, familyPic, familyText, highlightPic, highlightText,
                this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryProductPage(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "updater", required = false) String updater,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return productAO.queryProductPage(category, name, status, updater, start,
            limit, orderColumn, orderDir);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryProductList(
    		@RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "updater", required = false) String updater,
            @RequestParam(value = "status", required = false) String status) {
        return productAO.queryProductList(category, type, name, updater, status);
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

    @RequestMapping(value = "/goods/apply", method = RequestMethod.POST)
    @ResponseBody
    public Object tuihuoApply(
            @RequestParam(value = "goodsCode") String goodsCode,
            @RequestParam(value = "price") String price,
            @RequestParam(value = "quantity") String quantity,
            // @RequestParam(value = "applyUser") String applyUser,
            @RequestParam(value = "applyNote") String applyNote) {
        return productAO.tuihuoApply(goodsCode, price, quantity,
            this.getSessionUser().getUserName(), applyNote);
    }

    @RequestMapping(value = "/goods/check", method = RequestMethod.POST)
    @ResponseBody
    public Object tuihuoCheck(@RequestParam(value = "code") String code,
            @RequestParam(value = "approveResult") String approveResult,
            @RequestParam(value = "approveNote") String approveNote) {
        return productAO.tuihuoCheck(code, this.getSessionUser().getUserName(),
            approveResult, approveNote);
    }

    @RequestMapping(value = "/goods/page", method = RequestMethod.GET)
    @ResponseBody
    public Object goodsPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "goodsCode", required = false) String goodsCode,
            @RequestParam(value = "status", required = false) String status,
            // @RequestParam(value = "applyUser", required = false) String
            // applyUser,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return productAO.goodsPage(code, goodsCode, status,
            this.getSessionUser().getUserName(), start, limit);
    }

    @RequestMapping(value = "/goods/list", method = RequestMethod.GET)
    @ResponseBody
    public Object goodsList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "goodsCode", required = false) String goodsCode,
            @RequestParam(value = "status", required = false) String status) {
        return productAO.goodsList(code, goodsCode, status,
            this.getSessionUser().getUserName());
    }

    @RequestMapping(value = "/goods/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object goodsDteail(@RequestParam(value = "code") String code) {
        return productAO.goodsDteail(code);
    }
    
    // 货品商入驻
    @RequestMapping(value = "/producer/add", method = RequestMethod.POST)
    @ResponseBody
    public Object producerAdd(@RequestParam(value = "loginName") String loginName,
    		@RequestParam(value = "mobile", required = false) String mobile,
    		@RequestParam(value = "idKind", required = false) String idKind,
    		@RequestParam(value = "idNo", required = false) String idNo,
    		@RequestParam(value = "realName", required = false) String realName,
    		@RequestParam(value = "pdf", required = false) String pdf) {
        return productAO.producerAdd(loginName, mobile, idKind, idNo, realName, this.getSessionUser().getUserName(), pdf);
    }
}
