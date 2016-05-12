package com.xnjr.app.customer.req;

/**
 * 分页查询个体户账户列表
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd2002Req {

    // 名字(必填)
    private String realName;

    // 第几页(必填）
    private String start;

    // 页面个数(必填）
    private String limit;

    // 排序字段(选填）
    private String orderColumn;

    // 排序方向(选填)
    private String orderDir;

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
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
