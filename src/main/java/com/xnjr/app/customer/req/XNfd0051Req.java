package com.xnjr.app.customer.req;

/**
 * 分页查询取现订单列表
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd0051Req {

    // 充取订单号(选填)
    private String cqNo;

    // 状态(选填)
    private String status;

    // 支付人(选填）
    private String payUser;

    // 对账人(选填)
    private String checkUser;

    // 对账日期(选填)
    private String workDate;

    // 账号选填）
    private String accountNumber;

    // 起始时间(选填）
    private String dateStart;

    // 终止时间(选填)
    private String dateEnd;

    // 第几页(必填）
    private String start;

    // 页面个数(必填）
    private String limit;

    // 排序字段(选填)
    private String orderColumn;

    // 排序方向(选填)
    private String orderDir;

    public String getCqNo() {
        return cqNo;
    }

    public void setCqNo(String cqNo) {
        this.cqNo = cqNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPayUser() {
        return payUser;
    }

    public void setPayUser(String payUser) {
        this.payUser = payUser;
    }

    public String getCheckUser() {
        return checkUser;
    }

    public void setCheckUser(String checkUser) {
        this.checkUser = checkUser;
    }

    public String getWorkDate() {
        return workDate;
    }

    public void setWorkDate(String workDate) {
        this.workDate = workDate;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
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

    public String getOrderColumn() {
        return orderColumn;
    }

    public void setOrderColumn(String orderColumn) {
        this.orderColumn = orderColumn;
    }

    public String getOrderDir() {
        return orderDir;
    }

    public void setOrderDir(String orderDir) {
        this.orderDir = orderDir;
    }

}
