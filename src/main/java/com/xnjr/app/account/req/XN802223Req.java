package com.xnjr.app.account.req;

public class XN802223Req {

    // 取现订单编号
    private String withdrawNo;

    // 支付人（li为程序）
    private String payUser;

    // 支付结果
    private String payResult;

    // 支付说明
    private String payNote;

    // 支付单号(支付成功时才有)
    private String refNo;

    // 手续费（精确到厘）
    private String fee;

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

    public String getRefNo() {
        return refNo;
    }

    public void setRefNo(String refNo) {
        this.refNo = refNo;
    }

    public String getFee() {
        return fee;
    }

    public void setFee(String fee) {
        this.fee = fee;
    }

}
