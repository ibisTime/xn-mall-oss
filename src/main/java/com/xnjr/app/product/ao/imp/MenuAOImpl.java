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

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.security.ao.IMenuAO;
import com.xnjr.app.security.req.XNlh4000Req;
import com.xnjr.app.security.req.XNlh4001Req;
import com.xnjr.app.security.req.XNlh4002Req;
import com.xnjr.app.security.req.XNlh4003Req;
import com.xnjr.app.security.req.XNlh4004Req;
import com.xnjr.app.security.res.XNlh4001Res;

@Service
public class MenuAOImpl implements IMenuAO {

    @Autowired
    ServletContext servletContext;

    @Override
    public Object addMenu(String kind, String name, String url,
            String parentCode, String type, String orderNo, String updater,
            String remark) {
        XNlh4002Req req = new XNlh4002Req();
        req.setKind(kind);
        req.setName(name);
        req.setUrl(url);
        req.setParentCode(parentCode);
        req.setType(type);
        req.setOrderNo(orderNo);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh4002", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object dropMenu(String code) {
        XNlh4003Req Req = new XNlh4003Req();
        Req.setCode(code);
        return BizConnecter.getBizData("lh4003", JsonUtils.object2Json(Req),
            Object.class);
    }

    @Override
    public Object editMenu(String code, String kind, String name, String url,
            String parentCode, String type, String orderNo, String updater,
            String remark) {
        XNlh4004Req req = new XNlh4004Req();
        req.setCode(code);
        req.setKind(kind);
        req.setName(name);
        req.setUrl(url);
        req.setParentCode(parentCode);
        req.setType(type);
        req.setOrderNo(orderNo);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh4004", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryMenuPage(String kind, String name, String parentCode,
            String type, String updater, String start, String limit) {
        XNlh4000Req req = new XNlh4000Req();
        req.setKind(kind);
        req.setName(name);
        req.setParentCode(parentCode);
        req.setType(type);
        req.setUpdater(updater);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("lh4000", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public List<XNlh4001Res> queryMenuList(String kind, String name,
            String url, String parentCode, String type, String updater) {
        XNlh4001Req req = new XNlh4001Req();
        req.setKind(kind);
        req.setName(name);
        req.setUrl(url);
        req.setParentCode(parentCode);
        req.setType(type);
        String jsonStr = BizConnecter.getBizData("lh4001",
            JsonUtils.object2Json(req));
        Gson gson = new Gson();
        List<XNlh4001Res> list = gson.fromJson(jsonStr,
            new TypeToken<List<XNlh4001Res>>() {
            }.getType());
        return list;
    }

    @Override
    public Object queryMenu(String code) {
        return BizConnecter.getBizData("lh4005",
            JsonUtils.string2Json("code", code), Object.class);
    }
}
