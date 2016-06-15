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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.xnjr.app.general.ao.IDictAO;
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
import com.xnjr.app.product.req.XN601040Req;
import com.xnjr.app.product.req.XN601041Req;
import com.xnjr.app.product.req.XN601042Req;
import com.xnjr.app.product.req.XN601043Req;
import com.xnjr.app.product.req.XN601044Req;
import com.xnjr.app.product.req.XN602024Req;
import com.xnjr.app.product.req.XN602025Req;
import com.xnjr.app.product.req.XN602026Req;
import com.xnjr.app.product.req.XN602027Req;
import com.xnjr.app.product.req.XN602028Req;
import com.xnjr.app.product.req.XN602029Req;
import com.xnjr.app.res.XN602026Res;
import com.xnjr.app.res.XNlh5014Res;
import com.xnjr.app.util.CalculationUtil;
import com.xnjr.app.util.UploadUtil;

@Service
public class ModelAOImpl implements IModelAO {

    @Autowired
    protected IDictAO dataDicAO;

    @Override
    public Object addModel(String productCode, String name, String pic1,
            String pic2, String pic3, String description,
            List<ModelSpecs> modelSpecsList, String updater) {
        XN601020Req req = new XN601020Req();
        req.setProductCode(productCode);
        req.setName(name);
        req.setPic1(UploadUtil.uploadPicture(pic1));
        req.setPic2(UploadUtil.uploadPicture(pic2));
        req.setPic3(UploadUtil.uploadPicture(pic3));
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
        req.setCode(code);
        req.setProductCode(productCode);
        req.setName(name);
        req.setPic1(UploadUtil.editUploadPicture(pic1));
        req.setPic2(UploadUtil.editUploadPicture(pic2));
        req.setPic3(UploadUtil.editUploadPicture(pic3));
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
    public Object updownModel(String code, String checkUser, String checkResult,
            String checkNote) {
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
        req.setCode(code);
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
            String discountPrice, String toLevel, String updater,
            String remark) {
        XN601040Req req = new XN601040Req();
        req.setModelCode(modelCode);
        req.setOriginalPrice(CalculationUtil.mult(originalPrice));
        req.setDiscountPrice(discountPrice);
        req.setToLevel(toLevel);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("601040", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object shopLeadedit(String code, String modelCode,
            String originalPrice, String discountPrice, String toLevel,
            String updater, String remark) {
        XN601041Req req = new XN601041Req();
        req.setCode(code);
        req.setOriginalPrice(CalculationUtil.mult(originalPrice));
        req.setDiscountPrice(discountPrice);
        req.setToLevel(toLevel);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("601041", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object shopCarPage(String code, String modelCode, String toLevel,
            String start, String limit, String orderColumn, String orderDir) {
        XN601042Req req = new XN601042Req();
        req.setCode(code);
        req.setCode(modelCode);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("601042", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object shopCarList(String code, String modelCode, String toLevel) {
        XN601043Req req = new XN601043Req();
        req.setCode(code);
        req.setCode(modelCode);
        req.setToLevel(toLevel);
        return BizConnecter.getBizData("601043", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object shopCarDetail(String code) {
        XN601044Req req = new XN601044Req();
        req.setCode(code);
        return BizConnecter.getBizData("601044", JsonUtils.object2Json(req),
            Object.class);
    }

    // @Override
    // public Object shopModelPage(String userId, String start, String limit,
    // String orderColumn, String orderDir) {
    // XN602003Req req = new XN602003Req();
    // req.setUserId(userId);
    // req.setStart(start);
    // req.setLimit(limit);
    // req.setOrderColumn(orderColumn);
    // req.setOrderDir(orderDir);
    // return BizConnecter.getBizData("602003", JsonUtils.object2Json(req),
    // Object.class);
    // }

    @Override
    public Object shipping(String code, String approveUser,
            String approveNote) {
        XN602024Req req = new XN602024Req();
        req.setCode(code);
        req.setApproveUser(approveUser);
        req.setApproveNote(approveNote);
        return BizConnecter.getBizData("602024", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryOrderPage(String code, String applyUser,
            String loginName, String status, String isSecondPay,
            String dateStart, String dateEnd, String start, String limit,
            String orderColumn, String orderDir) {
        XN602025Req req = new XN602025Req();
        req.setCode(code);
        req.setApplyUser(applyUser);
        req.setLoginName(loginName);
        req.setStatus(status);
        req.setIsSecondPay(isSecondPay);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("602025", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryOrderList(String applyUser, String status) {
        XN602026Req req = new XN602026Req();
        req.setApplyUser(applyUser);
        req.setStatus(status);
        return BizConnecter.getBizData("602026", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object detailOrder(String invoiceCode) {
        XN602027Req req = new XN602027Req();
        req.setInvoiceCode(invoiceCode);
        return BizConnecter.getBizData("602027", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public List<XN602026Res> exportList(String loginName, String status) {
        XN602026Req req = new XN602026Req();
        req.setLoginName(loginName);
        req.setStatus(status);
        String jsonStr = BizConnecter.getBizData("602026",
            JsonUtils.object2Json(req));

        Gson gson = new Gson();
        List<XN602026Res> list = gson.fromJson(jsonStr,
            new TypeToken<List<XN602026Res>>() {
            }.getType());
        // 获取数据字典
        List<XNlh5014Res> orderStatusList = dataDicAO.queryDictList(null,
            "order_status", null);

        for (int i = 0; i < list.size(); i++) {
            XN602026Res xn602026Res = list.get(i);
            for (XNlh5014Res orderStatusDic : orderStatusList) {
                if (orderStatusDic.getDkey().equals(xn602026Res.getStatus())) {
                    xn602026Res.setStatus(orderStatusDic.getDvalue());
                    break;
                }
            }
        }
        return list;
    }

    @Override
    public Object cancelOrder(String code, String approveUser,
            String approveNote) {
        XN602028Req req = new XN602028Req();
        req.setCode(code);
        req.setApproveUser(approveUser);
        req.setApproveNote(approveNote);
        return BizConnecter.getBizData("602028", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object sureOrder(String code, String amount, String fromType,
            String fromCode, String pdf, String toCardNo, String approveUser,
            String approveNote) {
        XN602029Req req = new XN602029Req();
        req.setCode(code);
        req.setAmount(CalculationUtil.mult(amount));
        req.setFromType(fromType);
        req.setFromCode(fromCode);
        req.setPdf(pdf);
        req.setToCardNo(toCardNo);
        req.setApproveUser(approveUser);
        req.setApproveNote(approveNote);
        return BizConnecter.getBizData("602029", JsonUtils.object2Json(req),
            Object.class);
    }

}
