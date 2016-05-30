package com.xnjr.app.account.req;


/**
 * 人工干预账户申请
 * @author: wu 
 * @since: 2016年5月27日 下午1:57:02 
 * @history:
 */
public class XN802710Req {

    // 账号
    private String accountNumber;

    // 方向
    private String direction;

    // 金额
    private String amount;

    // 申请人
    private String applyUser;

    // 申请说明
    private String applyNote;

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getApplyUser() {
        return applyUser;
    }

    public void setApplyUser(String applyUser) {
        this.applyUser = applyUser;
    }

    public String getApplyNote() {
        return applyNote;
    }

    public void setApplyNote(String applyNote) {
        this.applyNote = applyNote;
    }

}
