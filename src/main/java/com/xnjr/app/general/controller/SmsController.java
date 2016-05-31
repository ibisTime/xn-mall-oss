package com.xnjr.app.general.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.app.controller.BaseController;
import com.xnjr.app.enums.ESmsBizType;
import com.xnjr.app.general.ao.IDictAO;
import com.xnjr.app.general.ao.ISmsAO;
import com.xnjr.app.security.ao.IUserAO;
import com.xnjr.app.security.res.XN805056Res;

/** 
 * @author: miyb 
 * @since: 2015-3-22 下午8:23:09 
 * @history:
 */
@Controller
@RequestMapping(value = "/gene")
public class SmsController extends BaseController {
    @Autowired
    ISmsAO smsAO;

    @Autowired
    IUserAO userAO;

    @Autowired
    IDictAO dictAO;

    // ****发送短信验证码start*******

    @RequestMapping(value = "/smscaptcha/send", method = RequestMethod.POST)
    @ResponseBody
    public boolean sendSmsCaptcha(@RequestParam("bizType") String bizType) {
        XN805056Res user = userAO.getUser(this.getSessionUser().getUserId());
        sendPhoneCode(bizType, user.getMobile());
        return true;
    }

    @RequestMapping(value = "/findloginpwd/send", method = RequestMethod.POST)
    @ResponseBody
    public boolean sendLoginpwdCode(@RequestParam("mobile") String mobile) {
        sendPhoneCode(ESmsBizType.FINDLOGINPWD.getCode(), mobile);
        return true;
    }

    @RequestMapping(value = "/changemobile/send", method = RequestMethod.POST)
    @ResponseBody
    public boolean sendChangeMobileCode(@RequestParam("mobile") String mobile) {
        sendPhoneCode(ESmsBizType.CHANGEMOBILE.getCode(), mobile);
        return true;
    }

    @RequestMapping(value = "/settradepwd/send", method = RequestMethod.POST)
    @ResponseBody
    public boolean sendSetTradePwdCode(@RequestParam("mobile") String mobile) {
        sendPhoneCode(ESmsBizType.SETTRADEPWD.getCode(), mobile);
        return true;
    }

    @RequestMapping(value = "/findtradepwd/send", method = RequestMethod.POST)
    @ResponseBody
    public boolean sendFindTradePwdCode(@RequestParam("mobile") String mobile) {
        sendPhoneCode(ESmsBizType.FINDTRADEPWD.getCode(), mobile);
        return true;
    }

    private void sendPhoneCode(String bizType, String mobile) {
        smsAO.sendSmsCaptcha(mobile, bizType);
    }
}
