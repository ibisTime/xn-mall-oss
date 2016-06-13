package com.xnjr.app.logistics.ao.imp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xnjr.app.general.ao.IDictAO;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.logistics.ao.ILogisticsAO;
import com.xnjr.app.logistics.req.GoodsReq;
import com.xnjr.app.logistics.req.XN602040Req;
import com.xnjr.app.logistics.req.XN602041Req;
import com.xnjr.app.logistics.req.XN602043Req;
import com.xnjr.app.logistics.req.XN602061Req;

@Service
public class LogisticsAOImpl implements ILogisticsAO {

    @Autowired
    protected IDictAO dataDicAO;

    @Override
    public Object addLogistics(String code, String invoiceCode, String company,
            String deliveryDatetime, String deliverer, String updater,
            List<GoodsReq> goodsList) {
        XN602040Req req = new XN602040Req();
        req.setCode(code);
        req.setInvoiceCode(invoiceCode);
        req.setCompany(company);
        req.setDeliveryDatetime(deliveryDatetime);
        req.setDeliverer(deliverer);
        req.setUpdater(updater);
        req.setRemark("发货录入");
        req.setGoodsList(goodsList);
        return BizConnecter.getBizData("602040", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryLogisticsPage(String code, String invoiceCode,
            String deliveryDatetimeStart, String deliveryDatetimeEnd,
            String deliverer, String userId, String status, String start,
            String limit, String orderColumn, String orderDir) {
        XN602041Req req = new XN602041Req();
        req.setCode(code);
        req.setInvoiceCode(invoiceCode);
        req.setDeliveryDatetimeStart(deliveryDatetimeStart);
        req.setDeliveryDatetimeEnd(deliveryDatetimeEnd);
        req.setDeliverer(deliverer);
        req.setUserId(userId);
        req.setStatus(status);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("602041", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryLogisticsDetail(String code) {
        return BizConnecter.getBizData("602042",
            JsonUtils.string2Json("code", code), Object.class);
    }

    @Override
    public Object queryStartCodeByModelCode(String modelCode) {
        return BizConnecter.getBizData("602060",
            JsonUtils.string2Json("modelCode", modelCode), Object.class);
    }

    @Override
    public Object queryGoodsPage(String code, String modelCode,
            String logisticsCode, String userId, String status, String start,
            String limit, String orderColumn, String orderDir) {
        XN602061Req req = new XN602061Req();
        req.setCode(code);
        req.setModelCode(modelCode);
        req.setLogisticsCode(logisticsCode);
        req.setUserId(userId);
        req.setStatus(status);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("602061", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object suregoods(String code, String updater, String remark) {
        XN602043Req req = new XN602043Req();
        req.setCode(code);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("602043", JsonUtils.object2Json(req),
            Object.class);
    }

}
