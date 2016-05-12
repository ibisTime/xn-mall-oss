package com.xnjr.app.customer.req;

/**
 * 分页查询公司账号
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd2053Req {

    // 公司编号(必填)
    private String companyCode;

    // 开始页数(必填）
    private String start;

    // 每页限制条数(必填）
    private String limit;

    // 排序字段(选填)
    private String orderColumn;

    // 排序方向(选填)
    private String orderDir;

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
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
