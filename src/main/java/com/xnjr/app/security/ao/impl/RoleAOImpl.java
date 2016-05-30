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
import com.xnjr.app.security.req.XN805020Req;
import com.xnjr.app.security.req.XN805021Req;
import com.xnjr.app.security.req.XN805023Req;
import com.xnjr.app.security.req.XN805024Req;
import com.xnjr.app.security.req.XN805025Req;

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
        XN805023Req req = new XN805023Req();
        req.setKind(kind);
        req.setName(name);
        req.setLevel(level);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("805023", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object dropRole(String code) {
        XN805024Req req = new XN805024Req();
        req.setCode(code);
        return BizConnecter.getBizData("805024", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object editRole(String code, String kind, String name, String level,
            String updater, String remark) {
        XN805025Req req = new XN805025Req();
        req.setCode(code);
        req.setKind(kind);
        req.setName(name);
        req.setLevel(level);
        req.setUpdater(updater);
        req.setRemark(remark);
        return BizConnecter.getBizData("805025", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryRolePage(String kind, String name, String level,
            String updater, String start, String limit) {
        XN805020Req req = new XN805020Req();
        req.setKind(kind);
        req.setName(name);
        req.setLevel(level);
        req.setUpdater(updater);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("805020", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryRoleList(String kind, String name, String level,
            String updater) {
        XN805021Req req = new XN805021Req();
        req.setKind(kind);
        req.setName(name);
        req.setLevel(level);
        req.setUpdater(updater);
        return BizConnecter.getBizData("805021", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object getRole(String code) {
        return BizConnecter.getBizData("805022",
            JsonUtils.string2Json("code", code), Object.class);
    }
}
