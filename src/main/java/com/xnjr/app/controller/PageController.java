package com.xnjr.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.xnjr.app.session.ISessionProvider;
import com.xnjr.app.session.SessionUser;

/**
 * 跳转页面Controller
 * 
 * @author zhanggl10620
 * 
 */
@Controller
public class PageController {

    private static final String SESSION_KEY_USER = "user";

    @Autowired
    protected ISessionProvider sessionProvider;

    @RequestMapping(value = "/security/{view}.htm", method = RequestMethod.GET)
    public String securityAction(@PathVariable("view") String view) {
        return "security/" + view;
    }

    @RequestMapping(value = "/general/{view}.htm", method = RequestMethod.GET)
    public String general(@PathVariable("view") String view) {
        return "general/" + view;
    }

    @RequestMapping(value = "/operator/{view}.htm", method = RequestMethod.GET)
    public String operator(@PathVariable("view") String view) {
        return "operator/" + view;
    }

    @RequestMapping(value = "/customer/{view}.htm", method = RequestMethod.GET)
    public String customer(@PathVariable("view") String view) {
        return "customer/" + view;
    }

    @RequestMapping(value = "/account/{view}.htm", method = RequestMethod.GET)
    public String account(@PathVariable("view") String view) {
        return "account/" + view;
    }

    @RequestMapping(value = "/core/{view}.htm", method = RequestMethod.GET)
    public String coreAction(@PathVariable("view") String view) {
        return "core/" + view;
    }

    @RequestMapping(value = "/project/{view}.htm", method = RequestMethod.GET)
    public String projectAction(@PathVariable("view") String view) {
        return "project/" + view;
    }

    @RequestMapping(value = "/plat/{view}.htm", method = RequestMethod.GET)
    public String platAction(@PathVariable("view") String view) {
        return "plat/" + view;
    }

    @RequestMapping(value = "/contract/{view}.htm", method = RequestMethod.GET)
    public String contractAction(@PathVariable("view") String view) {
        return "contract/" + view;
    }

    @RequestMapping(value = "/system/{view}.htm", method = RequestMethod.GET)
    public String systemAction(@PathVariable("view") String view) {
        return "system/" + view;
    }

    @RequestMapping(value = "/bank/{view}.htm", method = RequestMethod.GET)
    public String bankAction(@PathVariable("view") String view) {
        return "bank/" + view;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String page() {
        SessionUser user = (SessionUser) sessionProvider
            .getAttribute(SESSION_KEY_USER);
        if (null == user) {
            return "redirect:security/signin.htm";
        }
        return "redirect:security/main.htm";
    }
}
