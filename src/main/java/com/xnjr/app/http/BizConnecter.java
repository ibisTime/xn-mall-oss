/**
 * @Title BizConnecter.java 
 * @Package com.ibis.pz.http 
 * @Description 
 * @author miyb  
 * @date 2015-5-12 下午9:44:59 
 * @version V1.0   
 */
package com.xnjr.app.http;

import java.util.Properties;

import com.xnjr.app.exception.BizException;
import com.xnjr.app.util.PropertiesUtil;
import com.xnjr.app.util.RegexUtils;

/** 
 * @author: miyb 
 * @since: 2015-5-12 下午9:44:59 
 * @history:
 */
public class BizConnecter {
    public static final String YES = "0";

    public static final String SEC_URL = PropertiesUtil.getProperty("secUrl");

    public static final String BIZFRAME_URL = PropertiesUtil
        .getProperty("bizFrameUrl");

    public static final String MOOM_URL = PropertiesUtil.getProperty("moomUrl");

    public static final String SMS_URL = PropertiesUtil.getProperty("smsUrl");

    public static final String ACCOUNT_URL = PropertiesUtil
        .getProperty("accountUrl");

    public static <T> T getBizData(String code, String json, Class<T> clazz) {
        String data = getBizData(code, json);
        return JsonUtils.json2Bean(data, clazz);
    }

    public static String getBizData(String code, String json) {
        String data = null;
        String resJson = null;
        try {
            Properties formProperties = new Properties();
            formProperties.put("code", code);
            formProperties.put("json", json);
            resJson = PostSimulater.requestPostForm(getPostUrl(code),
                formProperties);
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 开始解析响应json
        String errorCode = RegexUtils.find(resJson, "errorCode\":\"(.+?)\"", 1);
        String errorInfo = RegexUtils.find(resJson, "errorInfo\":\"(.+?)\"", 1);
        System.out.println("request:" + code + " with parameters " + json
                + "\nresponse:" + errorCode + "<" + errorInfo + ">.");
        if (YES.equalsIgnoreCase(errorCode)) {
            data = RegexUtils.find(resJson, "data\":(.*)\\}", 1);
        } else {
            throw new BizException("Biz000", errorInfo);
        }
        return data;
    }

    public static String getPostUrl(String code) {
        String postUrl = null;
        if (code.startsWith("705")) {
            postUrl = SEC_URL;
        } else if (code.startsWith("707")) {
            postUrl = BIZFRAME_URL;
        } else if (code.startsWith("bk") || code.startsWith("pt")
                || code.startsWith("lh") || code.startsWith("gs")
                || code.startsWith("fd") || code.startsWith("yw")) {
            postUrl = MOOM_URL;
        } else if (code.startsWith("799")) {
            postUrl = SMS_URL;
        } else if (code.startsWith("801")) {
            postUrl = ACCOUNT_URL;
        } else if (code.startsWith("802")) {
            postUrl = ACCOUNT_URL;
        }
        return postUrl;
    }
}
