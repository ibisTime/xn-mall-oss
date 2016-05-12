package com.xnjr.app.customer.req;

import com.xnjr.app.req.APageReq;

public class XN801704Req extends APageReq {
    /** 
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
     */
    private static final long serialVersionUID = -4757659712049092900L;

    // user_id(必填)
    private String userId;

    // 登录IP地址
    private String loginIp;

    // 是否登录成功
    private String isSuccess;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getLoginIp() {
        return loginIp;
    }

    public void setLoginIp(String loginIp) {
        this.loginIp = loginIp;
    }

    public String getIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(String isSuccess) {
        this.isSuccess = isSuccess;
    }

}
