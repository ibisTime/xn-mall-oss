package com.xnjr.app.logistics.req;

public class XN602041Req {

    // 物流单号(选填)
    private String code;

    // 发货单编号(选填)
    private String invoiceCode;

    // 发货时间起(选填）
    private String deliveryDatetimeStart;

    // 发货时间止(选填）
    private String deliveryDatetimeEnd;

    // 发货人(选填）
    private String deliverer;

    // 下单用户(选填)
    private String userId;

    private String status;

    // 第几页(必填）
    private String start;

    // 页面个数(必填）
    private String limit;

    // 排序字段
    private String orderColumn;

    // 排序方向
    private String orderDir;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getInvoiceCode() {
        return invoiceCode;
    }

    public void setInvoiceCode(String invoiceCode) {
        this.invoiceCode = invoiceCode;
    }

    public String getDeliveryDatetimeStart() {
        return deliveryDatetimeStart;
    }

    public void setDeliveryDatetimeStart(String deliveryDatetimeStart) {
        this.deliveryDatetimeStart = deliveryDatetimeStart;
    }

    public String getDeliveryDatetimeEnd() {
        return deliveryDatetimeEnd;
    }

    public void setDeliveryDatetimeEnd(String deliveryDatetimeEnd) {
        this.deliveryDatetimeEnd = deliveryDatetimeEnd;
    }

    public String getDeliverer() {
        return deliverer;
    }

    public void setDeliverer(String deliverer) {
        this.deliverer = deliverer;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
