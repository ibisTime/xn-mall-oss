/**
 * @Title MenuAOImpl.java 
 * @Package com.ibis.pz.ao.impl 
 * @Description 
 * @author miyb  
 * @date 2015-5-14 上午10:22:25 
 * @version V1.0   
 */
package com.xnjr.app.product.ao.imp;

import java.util.List;

import org.springframework.stereotype.Service;

import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.product.ao.IModelAO;
import com.xnjr.app.product.req.ModelSpecs;
import com.xnjr.app.product.req.XN601020Req;
import com.xnjr.app.product.req.XN601021Req;
import com.xnjr.app.product.req.XN601022Req;
import com.xnjr.app.product.req.XN601023Req;
import com.xnjr.app.product.req.XN601024Req;
import com.xnjr.app.product.req.XN601025Req;
import com.xnjr.app.product.req.XN601026Req;

@Service
public class ModelAOImpl implements IModelAO {

    @Override
    public Object addModel(String productCode, String name, String pic1,
            String pic2, String pic3, String description,
            List<ModelSpecs> modelSpecsList, String updater) {
        XN601020Req req = new XN601020Req();
        req.setProductCode(productCode);
        req.setName(name);
        req.setPic1(pic1);
        req.setPic2(pic2);
        req.setPic3(pic3);
        req.setDescription(description);
        req.setModelSpecsList(modelSpecsList);
        req.setUpdater(updater);
        return BizConnecter.getBizData("601020", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object editModel(String code, String productCode, String name,
            String pic1, String pic2, String pic3, String description,
            List<ModelSpecs> modelSpecsList, String updater) {
        XN601021Req req = new XN601021Req();
        req.setCode(productCode);
        req.setProductCode(productCode);
        req.setName(name);
        req.setPic1(pic1);
        req.setPic1(pic2);
        req.setPic3(pic3);
        req.setDescription(description);
        req.setModelSpecsList(modelSpecsList);
        req.setUpdater(updater);
        return BizConnecter.getBizData("601021", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object checkModel(String code, String checkUser, String checkResult,
            String checkNote) {
        XN601022Req req = new XN601022Req();
        req.setCode(code);
        req.setCheckUser(checkUser);
        req.setCheckResult(checkResult);
        req.setCheckNote(checkNote);
        return BizConnecter.getBizData("601022", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object updownModel(String code, String checkUser,
            String checkResult, String checkNote) {
        XN601023Req req = new XN601023Req();
        req.setCode(code);
        req.setCheckUser(checkUser);
        req.setCheckResult(checkResult);
        req.setCheckNote(checkNote);
        return BizConnecter.getBizData("601023", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryModelPage(String code, String name, String status,
            String productCode, String start, String limit, String orderColumn,
            String orderDir) {
        XN601024Req req = new XN601024Req();
        req.setCode(productCode);
        req.setName(name);
        req.setStatus(status);
        req.setProductCode(productCode);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("601024", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryMOdelList(String code, String name, String status,
            String productCode) {
        XN601025Req req = new XN601025Req();
        req.setCode(code);
        req.setName(name);
        req.setStatus(status);
        req.setProductCode(productCode);
        return BizConnecter.getBizData("601025", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object detailModel(String code) {
        XN601026Req req = new XN601026Req();
        req.setCode(code);
        return BizConnecter.getBizData("601026", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object shopLeadadd(String modelCode, String originalPrice,
            String discountPrice, String toLevel, String updater, String remark) {
        // XN601040Req req = new XN601040Req();
        // req.setModelCode(modelCode);
        // req.setOriginalPrice(originalPrice);
        // req.setDiscountPrice(discountPrice);
        // req.setToLevel(toLevel);
        // req.setUpdater(updater);
        // req.setRemark(remark);
        return null;
    }

    @Override
    public Object shopLeadedit(String code, String modelCode,
            String originalPrice, String discountPrice, String toLevel,
            String updater, String remark) {
        // XN601041Req req = new XN601041Req();
        // req.setCode(code);
        // req.setOriginalPrice(originalPrice);
        // req.setDiscountPrice(discountPrice);
        // req.setToLevel(toLevel);
        // req.setUpdater(updater);
        // req.setRemark(remark);
        return null;
    }

    @Override
    public Object shopCarPage(String userId, String start, String limit,
            String orderColumn, String orderDir) {
        // XN601042Req req = new XN601042Req();
        // req.setUserId(userId);
        // req.setStart(start);
        // req.setLimit(limit);
        // req.setOrderColumn(orderColumn);
        // req.setOrderDir(orderDir);
        return null;
    }

    @Override
    public Object queryOrderPage(String applyUser, String status, String start,
            String limit, String orderColumn, String orderDir) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object queryOrderList(String applyUser, String status) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object detailOrder(String invoiceCode) {
        // TODO Auto-generated method stub
        return null;
    }

}
