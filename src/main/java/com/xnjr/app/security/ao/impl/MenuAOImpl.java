/**
 * @Title MenuAOImpl.java 
 * @Package com.ibis.pz.ao.impl 
 * @Description 
 * @author miyb  
 * @date 2015-5-14 上午10:22:25 
 * @version V1.0   
 */
package com.xnjr.app.security.ao.impl;

import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.security.ao.IMenuAO;
import com.xnjr.app.security.req.XN805000Req;
import com.xnjr.app.security.req.XN805001Req;
import com.xnjr.app.security.req.XN805003Req;
import com.xnjr.app.security.req.XN805004Req;
import com.xnjr.app.security.req.XN805005Req;
import com.xnjr.app.security.res.XN805001Res;

@Service
public class MenuAOImpl implements IMenuAO {

    @Autowired
    ServletContext servletContext;

    @Override
    public Object addMenu(String kind, String name, String url,
            String parentCode, String type, String orderNo, String updater,
            String remark) {
        XN805003Req req = new XN805003Req();
        req.setKind(kind);
        req.setName(name);
        req.setUrl(url);
        req.setParentCode(parentCode);
        req.setType(type);
        req.setOrderNo(orderNo);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("805003", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object dropMenu(String code) {
        XN805004Req Req = new XN805004Req();
        Req.setCode(code);
        return BizConnecter.getBizData("805004", JsonUtils.object2Json(Req),
            Object.class);
    }

    @Override
    public Object editMenu(String code, String kind, String name, String url,
            String parentCode, String type, String orderNo, String updater,
            String remark) {
        XN805005Req req = new XN805005Req();
        req.setCode(code);
        req.setKind(kind);
        req.setName(name);
        req.setUrl(url);
        req.setParentCode(parentCode);
        req.setType(type);
        req.setOrderNo(orderNo);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("805005", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryMenuPage(String kind, String name, String parentCode,
            String type, String updater, String start, String limit) {
        XN805000Req req = new XN805000Req();
        req.setKind(kind);
        req.setName(name);
        req.setParentCode(parentCode);
        req.setType(type);
        req.setUpdater(updater);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("805000", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public List<XN805001Res> queryMenuList(String kind, String name,
            String url, String parentCode, String type, String updater) {
        XN805001Req req = new XN805001Req();
        req.setKind(kind);
        req.setName(name);
        req.setParentCode(parentCode);
        req.setType(type);
        String jsonStr = BizConnecter.getBizData("805001",
            JsonUtils.object2Json(req));
        Gson gson = new Gson();
        List<XN805001Res> list = gson.fromJson(jsonStr,
            new TypeToken<List<XN805001Res>>() {
            }.getType());
        return list;
    }

    @Override
    public Object getMenu(String code) {
        return BizConnecter.getBizData("805002",
            JsonUtils.string2Json("code", code), Object.class);
    }
}
