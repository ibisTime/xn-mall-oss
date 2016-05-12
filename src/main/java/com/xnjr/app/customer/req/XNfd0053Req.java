package com.xnjr.app.customer.req;

/**
 * 支付取现订单
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd0053Req {

    // 订单编号(必填)
    private String withdrawNo;

    // 支付人(必填)
    private String payUser;

    // 支付意见(必填)
    private String payResult;

    // 支付意见说明(必填)
    private String payNote;

    // 支付订单(选填)
    private String payNo;

    // 支付手续费(选填)
    private String payFee;

    // 对账时间(必填)
    private String workDate;

    public String getWithdrawNo() {
        return withdrawNo;
    }

    public void setWithdrawNo(String withdrawNo) {
        this.withdrawNo = withdrawNo;
    }

    public String getPayUser() {
        return payUser;
    }

    public void setPayUser(String payUser) {
        this.payUser = payUser;
    }

    public String getPayResult() {
        return payResult;
    }

    public void setPayResult(String payResult) {
        this.payResult = payResult;
    }

    public String getPayNote() {
        return payNote;
    }

    public void setPayNote(String payNote) {
        this.payNote = payNote;
    }

    public String getPayNo() {
        return payNo;
    }

    public void setPayNo(String payNo) {
        this.payNo = payNo;
    }

    public String getPayFee() {
        return payFee;
    }

    public void setPayFee(String payFee) {
        this.payFee = payFee;
    }

    public String getWorkDate() {
        return workDate;
    }

    public void setWorkDate(String workDate) {
        this.workDate = workDate;
    }

}
