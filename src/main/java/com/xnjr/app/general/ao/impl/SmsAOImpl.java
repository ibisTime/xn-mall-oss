package com.xnjr.app.general.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.app.general.ao.ISmsAO;
import com.xnjr.app.http.BizConnecter;
import com.xnjr.app.http.JsonUtils;
import com.xnjr.app.req.XN799003Req;

/** 
 * @author: miyb 
 * @since: 2015-5-12 下午2:52:31 
 * @history:
 */
@Service
public class SmsAOImpl implements ISmsAO {

    /** 
     * @see com.ibis.pz.ao.ISmsAO#sendSmsCaptcha(java.lang.String, java.lang.String)
     */
    @Override
    public void sendSmsCaptcha(String mobile, String bizType) {
        XN799003Req req = new XN799003Req();
        req.setMobile(mobile);
        req.setBizType(bizType);
        BizConnecter.getBizData("799003", JsonUtils.object2Json(req),
            Object.class);
    }
}
