package com.xnjr.app.product.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

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
import com.xnjr.app.res.XN602026Res;
import com.xnjr.app.util.ExcelUtil;

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
            @RequestParam(value = "specsTableJson", required = true) String specsTableJson) {
        Gson gson = new Gson();
        List<ModelSpecs> modelSpecsList = gson.fromJson(specsTableJson,
            new TypeToken<List<ModelSpecs>>() {
            }.getType());
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

    @RequestMapping(value = "/price/add", method = RequestMethod.POST)
    @ResponseBody
    public Object shopLeadadd(@RequestParam("modelCode") String modelCode,
            @RequestParam("originalPrice") String originalPrice,
            @RequestParam(value = "discountPrice", required = false) String discountPrice,
            @RequestParam(value = "toLevel", required = false) String toLevel,
            // @RequestParam("updater") String updater,
            @RequestParam(value = "remark", required = false) String remark) {

        return modelAO.shopLeadadd(modelCode, originalPrice, discountPrice,
            toLevel, this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/price/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object shopLeadedit(@RequestParam("code") String code,
            @RequestParam("modelCode") String modelCode,
            @RequestParam("originalPrice") String originalPrice,
            @RequestParam("discountPrice") String discountPrice,
            @RequestParam("toLevel") String toLevel,
            @RequestParam("updater") String updater,
            @RequestParam("remark") String remark) {

        return modelAO.shopLeadedit(code, modelCode, originalPrice,
            discountPrice, toLevel, this.getSessionUser().getUserName(),
            remark);
    }

    @RequestMapping(value = "/price/page", method = RequestMethod.GET)
    @ResponseBody
    public Object shopCarPage(@RequestParam("code") String code,
            @RequestParam("modelCode") String modelCode,
            @RequestParam("toLevel") String toLevel,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return modelAO.shopCarPage(code, modelCode, toLevel, start, limit,
            orderColumn, orderDir);
    }

    @RequestMapping(value = "/price/list", method = RequestMethod.GET)
    @ResponseBody
    public Object shopCarList(@RequestParam("code") String code,
            @RequestParam("modelCode") String modelCode,
            @RequestParam("toLevel") String toLevel) {
        return modelAO.shopCarList(code, modelCode, toLevel);
    }

    @RequestMapping(value = "/price/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object shopCarDetail(@RequestParam("code") String code) {
        return modelAO.shopCarDetail(code);
    }

    @RequestMapping(value = "/shipping", method = RequestMethod.GET)
    @ResponseBody
    public Object shipping(@RequestParam("code") String code,
            @RequestParam("approveUser") String approveUser,
            @RequestParam("approveNote") String approveNote) {
        return modelAO.shipping(code, approveUser, approveNote);
    }

    @RequestMapping(value = "/order/Page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryOrderPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "applyUser", required = false) String applyUser,
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "isSecondPay", required = false) String isSecondPay,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return modelAO.queryOrderPage(code, applyUser, loginName, status,
            isSecondPay, dateStart, dateEnd, start, limit, orderColumn,
            orderDir);
    }

    @RequestMapping(value = "/order/List", method = RequestMethod.GET)
    @ResponseBody
    public Object queryOrderList(
            @RequestParam(value = "applyUser") String applyUser,
            @RequestParam(value = "status", required = false) String status) {
        return modelAO.queryOrderList(applyUser, status);
    }

    @RequestMapping(value = "/order/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object detailOrder(@RequestParam("invoiceCode") String invoiceCode) {
        return modelAO.detailOrder(invoiceCode);
    }

    // 导出
    @RequestMapping(value = "/export", method = RequestMethod.GET)
    @ResponseBody
    public void exportRecWithList(
            @RequestParam(value = "loginName", required = false) String loginName,
            @RequestParam(value = "status", required = false) String status,
            HttpServletResponse response) throws IOException {
        // 表格命名
        String sheetName = "sheet1";
        // 列名
        String columnNames[] = { "订单编号", "下单用户", "总金额", "下单时间", "状态" };

        // 列表数据
        List<XN602026Res> list = modelAO.exportList(loginName, status);
        // 导出数据
        ExcelUtil<XN602026Res> excelUtil = new ExcelUtil<XN602026Res>();
        excelUtil.generateExcel("订单列表", sheetName, columnNames, list, response);
    }

    @RequestMapping(value = "/order/cancel", method = RequestMethod.POST)
    @ResponseBody
    public Object cancelOrder(@RequestParam("code") String code,
            // @RequestParam("approveUser") String approveUser,
            @RequestParam(value = "approveNote", required = false) String approveNote) {
        return modelAO.cancelOrder(code, this.getSessionUser().getUserName(),
            approveNote);
    }

    @RequestMapping(value = "/order/sure", method = RequestMethod.POST)
    @ResponseBody
    public Object surelOrder(@RequestParam("code") String code,
            @RequestParam("amount") String amount,
            @RequestParam("fromType") String fromType,
            @RequestParam("fromCode") String fromCode,
            @RequestParam("pdf") String pdf,
            @RequestParam("toCardNo") String toCardNo,
            // @RequestParam("approveUser") String approveUser,
            @RequestParam("approveNote") String approveNote) {
        return modelAO.sureOrder(code, amount, fromType, fromCode, pdf,
            toCardNo, this.getSessionUser().getUserName(), approveNote);
    }

}
