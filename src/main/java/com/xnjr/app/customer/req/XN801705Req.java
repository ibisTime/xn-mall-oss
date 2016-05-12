package com.xnjr.app.customer.req;

import com.xnjr.app.req.APageReq;

public class XN801705Req extends APageReq {
    /** 
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
     */
    private static final long serialVersionUID = -4610947217715265506L;

    // userId
    private String userId;

    // 用锁方向：1用锁/0解锁
    private String lockDirection;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getLockDirection() {
        return lockDirection;
    }

    public void setLockDirection(String lockDirection) {
        this.lockDirection = lockDirection;
    }

}
