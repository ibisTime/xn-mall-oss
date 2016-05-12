package com.xnjr.app.customer.req;

import com.xnjr.app.req.APageReq;

public class XN801702Req extends APageReq {
    /** 
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
     */
    private static final long serialVersionUID = -2291755467599581106L;

    // userId
    private String userId;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

}
