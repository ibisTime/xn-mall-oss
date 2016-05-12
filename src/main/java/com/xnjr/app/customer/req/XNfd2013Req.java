package com.xnjr.app.customer.req;

/**
 * 分页查询银行卡信息
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd2013Req {

    // 用户编号(必填)
    private String userId;

    // 第几页(必填）
    private String start;

    // 页面个数(必填）
    private String limit;

    // 排序字段(选填）
    private String orderColumn;

    // 排序方向(选填)
    private String orderDir;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
