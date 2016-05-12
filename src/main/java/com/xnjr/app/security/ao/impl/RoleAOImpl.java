/**
 * @Title RoleAOImpl.java 
 * @Package com.ibis.pz.ao.impl 
 * @Description 
 * @author miyb  
 * @date 2015-5-14 上午10:27:29 
 * @version V1.0   
 */
package com.xnjr.app.security.ao.impl;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.security.ao.IRoleAO;
import com.xnjr.app.security.req.XNlh4010Req;
import com.xnjr.app.security.req.XNlh4011Req;
import com.xnjr.app.security.req.XNlh4012Req;
import com.xnjr.app.security.req.XNlh4013Req;
import com.xnjr.app.security.req.XNlh4014Req;

/**
 * @author: XIANDONG 
 * @since: 2016年4月17日 下午6:21:29 
 * @history:
 */
@Service
public class RoleAOImpl implements IRoleAO {

    @Autowired
    ServletContext servletContext;

    @Override
    public Object addRole(String kind, String name, String level,
            String updater, String remark) {
        XNlh4012Req req = new XNlh4012Req();
        req.setKind(kind);
        req.setName(name);
        req.setLevel(level);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh4012", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object dropRole(String code) {
        XNlh4013Req req = new XNlh4013Req();
        req.setCode(code);
        return BizConnecter.getBizData("lh4013", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object editRole(String code, String kind, String name, String level,
            String updater, String remark) {
        XNlh4014Req req = new XNlh4014Req();
        req.setCode(code);
        req.setKind(kind);
        req.setName(name);
        req.setLevel(level);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("lh4014", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryRolePage(String kind, String name, String level,
            String updater, String start, String limit) {
        XNlh4010Req req = new XNlh4010Req();
        req.setKind(kind);
        req.setName(name);
        req.setLevel(level);
        req.setUpdater(updater);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("lh4010", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryRoleList(String kind, String name, String level,
            String updater) {
        XNlh4011Req req = new XNlh4011Req();
        req.setKind(kind);
        req.setName(name);
        req.setLevel(level);
        req.setUpdater(updater);
        return BizConnecter.getBizData("lh4011", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryRole(String code) {
        return BizConnecter.getBizData("lh4015",
            JsonUtils.string2Json("code", code), Object.class);
    }
}
