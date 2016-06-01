package com.xnjr.app.product.req;

/**
 * @author: XIANDONG 
 * @since: 2016年6月1日 下午5:21:36 
 * @history:
 */
public class XN602029Req {

    private String userId;

    private String invoiceCode;

    private String updater;

    private String remark;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getInvoiceCode() {
        return invoiceCode;
    }

    public void setInvoiceCode(String invoiceCode) {
        this.invoiceCode = invoiceCode;
    }

    public String getUpdater() {
        return updater;
    }

    public void setUpdater(String updater) {
        this.updater = updater;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

}
