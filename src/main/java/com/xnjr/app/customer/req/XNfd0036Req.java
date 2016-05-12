package com.xnjr.app.customer.req;

/**
 * 查询冻结明细
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd0036Req {

    // 账号(选填)
    private String accountNumber;

    // 明细编号(选填)
    private String afjNo;

    // 业务类型(选填）
    private String bizType;

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

    public String getAfjNo() {
        return afjNo;
    }

    public void setAfjNo(String afjNo) {
        this.afjNo = afjNo;
    }

    public String getBizType() {
        return bizType;
    }

    public void setBizType(String bizType) {
        this.bizType = bizType;
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

}
