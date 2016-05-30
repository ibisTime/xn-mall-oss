/**
 * @Title BaseController.java 
 * @Package com.hsnet.pz.controller 
 * @Description 
 * @author miyb  
 * @date 2014-8-19 上午10:54:17 
 * @version V1.0   
 */
package com.xnjr.app.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.xnjr.app.base.ControllerContext;
import com.xnjr.app.security.res.XNlh0012Res;
import com.xnjr.app.session.ISessionProvider;
import com.xnjr.app.session.SessionUser;
import com.xnjr.app.session.UserDetailHolder;

@Controller
public class BaseController {

    @Autowired
    protected ISessionProvider sessionProvider;

    /**
     * 获取session user
     * 
     * @return
     */
    protected SessionUser getSessionUser() {
        SessionUser user = (SessionUser) UserDetailHolder.getUserDetail();
        return user;
    }

    /**
     * 获取IP地址
     * 
     * @return
     */
    protected String getRemoteHost() {
        String ip = ControllerContext.getRequest().getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = ControllerContext.getRequest().getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = ControllerContext.getRequest().getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = ControllerContext.getRequest().getRemoteAddr();
        }
        return ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
    }

    /**
     * 对系统方进行特殊处理，获取全部
     * @param user
     * @param kind
     * @return 
     * @create: 2016年4月22日 上午11:41:38 xieyj
     * @history:
     */
    public String getKind(XNlh0012Res user, String kind) {
        if (StringUtils.isBlank(kind)) {
            kind = user.getKind();
        }
        return kind;
    }

}
