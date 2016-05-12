package com.xnjr.app.customer.req;

/**
 * 分页查询KYC申请书
 * @author: XIANDONG 
 * @since: 2016年4月23日 上午11:17:48 
 * @history:
 */
public class XNfd2062Req {

    // 名字（选填）
    private String realName;

    // 公司名字（选填）
    private String companyName;

    // 状态 （选填）
    private String status;

    // KYC审核人（选填）
    private String kycUser;

    // 第几页（必填）
    private String start;

    // 页面个数（必填）
    private String limit;

    // 排序字段（选填）
    private String orderColumn;

    // 排序方向（选填）
    private String orderDir;

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getKycUser() {
        return kycUser;
    }

    public void setKycUser(String kycUser) {
        this.kycUser = kycUser;
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
