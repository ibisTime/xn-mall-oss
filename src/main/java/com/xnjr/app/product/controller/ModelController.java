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
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("description") String description,
            @RequestParam(value = "remark", required = false) String remark,
            @RequestParam(value = "specsTableJson", required = true) String specsTableJson) {
        Gson gson = new Gson();
        List<ModelSpecs> modelSpecsList = gson.fromJson(specsTableJson,
            new TypeToken<List<ModelSpecs>>() {
            }.getType());
        return modelAO.addModel(productCode, name, pic1, pic2, pic3, status,
            description, modelSpecsList, this.getSessionUser().getUserName(), remark);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editModel(@RequestParam("code") String code,
            @RequestParam("productCode") String productCode,
            @RequestParam("name") String name,
            @RequestParam("pic1") String pic1,
            @RequestParam("pic2") String pic2,
            @RequestParam("pic3") String pic3,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam("description") String description,
            @RequestParam(value = "remark", required = false) String remark,
            @RequestParam(value = "specsTableJson", required = true) String specsTableJson) {
        Gson gson = new Gson();
        List<ModelSpecs> modelSpecsList = gson.fromJson(specsTableJson,
            new TypeToken<List<ModelSpecs>>() {
            }.getType());
        return modelAO.editModel(code, productCode, name, pic1, pic2, pic3, status,
            description, modelSpecsList, this.getSessionUser().getUserName(), remark);
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
    		@RequestParam("modelCode") String modelCode,
            @RequestParam(value = "originalPrice", required = false) String originalPrice,
            @RequestParam(value = "discountPrice", required = false) String discountPrice,
            @RequestParam(value = "cnyPrice", required = false) String cnyPrice,
            @RequestParam(value = "toLevel", required = false) String toLevel,
            @RequestParam(value = "toSite", required = false) String toSite,
            @RequestParam("isUp") String isUp,
            @RequestParam(value = "remark", required = false) String remark) {
        return modelAO.updownModel(code, modelCode, originalPrice, discountPrice, cnyPrice, toLevel, toSite, 
        		this.getSessionUser().getUserName(), isUp, remark);
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryModelPage(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "productName", required = false) String productName,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return modelAO.queryModelPage(code, name, status, productName, start,
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
    public Object shopCarPage(
    		@RequestParam(value = "productCode", required = false) String productCode,
    		@RequestParam(value = "modelName", required = false) String modelName,
    		@RequestParam(value = "type", required = false) String type,
    		@RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "modelCode", required = false) String modelCode,
            @RequestParam(value = "fromUser", required = false) String fromUser,
            @RequestParam(value = "toLevel", required = false) String toLevel,
            @RequestParam(value = "toSite", required = false) String toSite,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return modelAO.shopCarPage(productCode, modelName, type, status, modelCode, fromUser, toLevel, toSite, start, limit,
            orderColumn, orderDir);
    }

    @RequestMapping(value = "/price/list", method = RequestMethod.GET)
    @ResponseBody
    public Object shopCarList(@RequestParam("toSite") String toSite,
            @RequestParam("modelCode") String modelCode,
            @RequestParam("toLevel") String toLevel) {
        return modelAO.shopCarList(modelCode, toLevel, toSite);
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
    		@RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "applyUser", required = false) String applyUser,
            @RequestParam(value = "toUser", required = false) String toUser,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return modelAO.queryOrderPage(mobile, applyUser, this.getSessionUser().getUserId(), status,
            start, limit, orderColumn, orderDir, dateStart, dateEnd);
    }
    
    @RequestMapping(value = "/allorder/Page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryAllOrderPage(
    		@RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "applyUser", required = false) String applyUser,
            @RequestParam(value = "toUser", required = false) String toUser,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return modelAO.queryOrderPage(mobile, applyUser, toUser, status,
            start, limit, orderColumn, orderDir, dateStart, dateEnd);
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
    
    // 分销商价格管理分页查询
    @RequestMapping(value = "/price/sure/page", method = RequestMethod.GET)
    @ResponseBody
    public Object priceSurePage(@RequestParam(value = "modelName", required = false) String modelCode,
            @RequestParam(value = "toLevel", required = false) String toLevel,
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return modelAO.priceSurePage(modelCode, toLevel, start, limit, orderColumn,
        		orderDir, this.getSessionUser().getUserName());
    }
    
    // 分销商价格管理列表查询
    @RequestMapping(value = "/price/sure/list", method = RequestMethod.GET)
    @ResponseBody
    public Object priceSureList(@RequestParam(value = "modelCode", required = false) String modelCode,
            @RequestParam(value = "toLevel", required = false) String toLevel) {
        return modelAO.priceSureList(modelCode, toLevel, this.getSessionUser().getUserName());
    }
    
    // 分销商价格管理详情查询
    @RequestMapping(value = "/price/sure/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object priceSureDetail(@RequestParam(value = "code") String code) {
        return modelAO.priceSureDetail(code);
    }
    
    // 分销商价格管理修改
    @RequestMapping(value = "/price/sure/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object priceSureEdit(@RequestParam(value = "code") String code,
    		@RequestParam(value = "quantity") String quantity,
    		@RequestParam(value = "price") String price,
    		@RequestParam(value = "remark") String remark) {
        return modelAO.priceSureEdit(code, quantity, price, this.getSessionUser().getUserName(), remark);
    }

}
