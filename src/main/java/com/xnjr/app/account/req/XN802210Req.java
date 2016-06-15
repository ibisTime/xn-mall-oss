package com.xnjr.app.account.req;

/**
 * 代线下取现
 * @author: wu 
 * @since: 2016年5月27日 下午1:57:02 
 * @history:
 */
public class XN802210Req {

    // 账号
    private String accountNumber;

    // 取现金额
    private String amount;

    // 去方类型
    private String toType;

    // 归属
    private String toBelong;

    // 去方编号
    private String toCode;

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getToType() {
        return toType;
    }

    public void setToType(String toType) {
        this.toType = toType;
    }

    public String getToCode() {
        return toCode;
    }

    public void setToCode(String toCode) {
        this.toCode = toCode;
    }

    public String getToBelong() {
        return toBelong;
    }

    public void setToBelong(String toBelong) {
        this.toBelong = toBelong;
    }

}
