package com.xnjr.app.account.req;

/**
 * 分页查询账户列表
 * @author: wu 
 * @since: 2016年5月27日 下午2:08:44 
 * @history:
 */
public class XN802010Req {

    // 账号(选填)
    private String accountNumber;

    // 状态(选填)
    private String status;

    // 用户(选填）
    private String userId;

    private String type;

    // 真实姓名(选填）
    private String realName;

    // 起始时间(选填）
    private String dateStart;

    // 终止时间(选填)
    private String dateEnd;

    // 第几页(必填）
    private String start;

    // 页面个数(必填）
    private String limit;

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public String getDateStart() {
        return dateStart;
    }

    public void setDateStart(String dateStart) {
        this.dateStart = dateStart;
    }

    public String getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(String dateEnd) {
        this.dateEnd = dateEnd;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getLimit() {
        return limit;
    }

    public void setLimit(String limit) {
        this.limit = limit;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
