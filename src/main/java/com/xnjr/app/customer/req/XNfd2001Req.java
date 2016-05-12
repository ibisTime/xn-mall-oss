package com.xnjr.app.customer.req;

import com.xnjr.app.req.APageReq;

/**
 * 分页查询个体户账户列表
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd2001Req extends APageReq {
    /** 
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
     */
    private static final long serialVersionUID = 1L;

    // 账户编号(选填)
    private String accountNumber;

    // 用户编号(选填)
    private String userId;

    // 名字(选填)
    private String realName;

    // 账户状态(选填)
    private String status;

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
