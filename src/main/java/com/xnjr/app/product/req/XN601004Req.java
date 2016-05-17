package com.xnjr.app.product.req;

/**
 * 分页查询产品
 * @author: wu 
 * @since: 2016年5月17日 下午12:01:16 
 * @history:
 */
public class XN601004Req {

    // 用户编号（必填）
    private String type;

    // 证件类型（必填）
    private String name;

    // 证件号码（必填）
    private String status;

    // 真实姓名（必填）
    private String updater;

    // 更新人（必填）
    private String start;

    // 备注（选填）
    private String limit;

    // 更新人（必填）
    private String orderColumn;

    // 备注（选填）
    private String orderDir;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUpdater() {
        return updater;
    }

    public void setUpdater(String updater) {
        this.updater = updater;
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
