package com.xnjr.app.customer.req;

/**
 * 根据绑定人UserId获取企业列表
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd2038Req {

    // 用户编号(必填)
    private String userId;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

}
