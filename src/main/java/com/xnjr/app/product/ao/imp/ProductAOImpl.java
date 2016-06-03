/**
 * @Title MenuAOImpl.java 
 * @Package com.ibis.pz.ao.impl 
 * @Description 
 * @author miyb  
 * @date 2015-5-14 上午10:22:25 
 * @version V1.0   
 */
package com.xnjr.app.product.ao.imp;

import org.springframework.stereotype.Service;

import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.product.ao.IProductAO;
import com.xnjr.app.product.req.XN601000Req;
import com.xnjr.app.product.req.XN601001Req;
import com.xnjr.app.product.req.XN601002Req;
import com.xnjr.app.product.req.XN601003Req;
import com.xnjr.app.product.req.XN601004Req;
import com.xnjr.app.product.req.XN601005Req;
import com.xnjr.app.product.req.XN601006Req;
import com.xnjr.app.util.UploadUtil;

@Service
public class ProductAOImpl implements IProductAO {

    @Override
    public Object addProduct(String type, String name, String advTitle,
            String advPic, String majorPic, String majorText, String familyPic,
            String familyText, String highlightPic, String highlightText,
            String updater, String remark) {
        XN601000Req req = new XN601000Req();
        req.setType(type);
        req.setName(name);
        req.setAdvTitle(advTitle);
        req.setAdvPic(UploadUtil.uploadPicture(advPic));
        req.setMajorPic(UploadUtil.uploadPicture(majorPic));
        req.setMajorText(majorText);
        req.setFamilyPic(UploadUtil.uploadPicture(familyPic));
        req.setFamilyText(familyText);
        req.setHighlightPic(UploadUtil.uploadPicture(highlightPic));
        req.setHighlightText(highlightText);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("601000", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object editProduct(String code, String type, String name,
            String advTitle, String advPic, String majorPic, String majorText,
            String familyPic, String familyText, String highlightPic,
            String highlightText, String updater, String remark) {
        XN601001Req req = new XN601001Req();
        req.setCode(code);
        req.setType(type);
        req.setName(name);
        req.setAdvTitle(advTitle);
        req.setAdvPic(UploadUtil.editUploadPicture(advPic));
        req.setMajorPic(UploadUtil.editUploadPicture(majorPic));
        req.setMajorText(majorText);
        req.setFamilyPic(UploadUtil.editUploadPicture(familyPic));
        req.setFamilyText(familyText);
        req.setHighlightPic(UploadUtil.editUploadPicture(highlightPic));
        req.setHighlightText(highlightText);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("601001", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryProductPage(String type, String name, String status,
            String updater, String start, String limit, String orderColumn,
            String orderDir) {
        XN601004Req req = new XN601004Req();
        req.setType(type);
        req.setName(name);
        req.setStatus(status);
        req.setUpdater(updater);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("601004", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryProductList(String type, String name, String updater,
            String status) {
        XN601005Req req = new XN601005Req();
        req.setType(type);
        req.setName(name);
        req.setStatus(status);
        req.setUpdater(updater);
        return BizConnecter.getBizData("601005", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object detailProduct(String code) {
        XN601006Req req = new XN601006Req();
        req.setCode(code);
        return BizConnecter.getBizData("601006", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object checkProduct(String code, String checkUser,
            String checkResult, String checkNote) {
        XN601002Req req = new XN601002Req();
        req.setCode(code);
        req.setCheckUser(checkUser);
        req.setCheckResult(checkResult);
        req.setCheckNote(checkNote);
        return BizConnecter.getBizData("601002", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object upProduct(String code, String checkUser, String checkResult,
            String checkNote) {
        XN601003Req req = new XN601003Req();
        req.setCode(code);
        req.setCheckUser(checkUser);
        req.setCheckResult(checkResult);
        req.setCheckNote(checkNote);
        return BizConnecter.getBizData("601003", JsonUtils.object2Json(req),
            Object.class);
    }
}
