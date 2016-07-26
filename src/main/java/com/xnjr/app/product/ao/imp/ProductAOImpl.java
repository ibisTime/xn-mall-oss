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
import com.xnjr.app.product.req.XN602120Req;
import com.xnjr.app.product.req.XN602121Req;
import com.xnjr.app.product.req.XN602122Req;
import com.xnjr.app.product.req.XN602123Req;
import com.xnjr.app.product.req.XN602124Req;
import com.xnjr.app.util.UploadUtil;

@Service
public class ProductAOImpl implements IProductAO {

    @Override
    public Object addProduct(String category, String type, String typePic, String name, 
    		String order, String status, String advTitle,
            String advPic, String majorPic, String majorText, String familyPic,
            String familyText, String highlightPic, String highlightText,
            String updater, String remark) {
        XN601000Req req = new XN601000Req();
        req.setCategory(category);
        req.setType(type);
        req.setTypePic(UploadUtil.uploadPicture(typePic));
        req.setName(name);
        req.setOrderNo(order);
        req.setStatus(status);
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
    public Object editProduct(String code, String category, String type, String typePic, String name, 
    		String order, String status, String advTitle,
            String advPic, String majorPic, String majorText, String familyPic,
            String familyText, String highlightPic, String highlightText,
            String updater, String remark) {
        XN601001Req req = new XN601001Req();
        req.setCode(code);
        req.setCategory(category);
        req.setType(type);
        req.setTypePic(UploadUtil.uploadPicture(typePic));
        req.setName(name);
        req.setOrderNo(order);
        req.setStatus(status);
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
    public Object queryProductList(String category, String type, String name, String updater,
            String status) {
        XN601005Req req = new XN601005Req();
        req.setCategory(category);
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

    @Override
    public Object tuihuoApply(String goodsCode, String price, String quantity,
            String applyUser, String applyNote) {
        XN602120Req req = new XN602120Req();
        req.setGoodsCode(goodsCode);
        req.setPrice(price);
        req.setQuantity(quantity);
        req.setApplyUser(applyUser);
        req.setApplyNote(applyNote);
        return BizConnecter.getBizData("602120", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object tuihuoCheck(String code, String approveUser,
            String approveResult, String approveNote) {
        XN602121Req req = new XN602121Req();
        req.setCode(code);
        req.setApproveUser(approveUser);
        req.setApproveResult(approveResult);
        req.setApproveNote(approveNote);
        return BizConnecter.getBizData("602121", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object goodsPage(String code, String goodsCode, String status,
            String applyUser, String start, String limit) {
        XN602122Req req = new XN602122Req();
        req.setCode(code);
        req.setGoodsCode(goodsCode);
        req.setStatus(status);
        req.setApplyUser(applyUser);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("602122", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object goodsList(String code, String goodsCode, String status,
            String applyUser) {
        XN602123Req req = new XN602123Req();
        req.setCode(code);
        req.setGoodsCode(goodsCode);
        req.setStatus(status);
        req.setApplyUser(applyUser);
        return BizConnecter.getBizData("602123", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object goodsDteail(String code) {
        XN602124Req req = new XN602124Req();
        req.setCode(code);
        return BizConnecter.getBizData("602124", JsonUtils.object2Json(req),
            Object.class);
    }
}
