package com.xnjr.app.customer.req;

/**
 * 修改公司账号
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd2052Req {

    // id(必填)
    private String id;

    // 公司编号(必填)
    private String companyCode;

    // 银行代码(必填)
    private String bankCode;

    // 支行(必填)
    private String subbranch;

    // 账号(必填)
    private String cardNo;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getBankCode() {
        return bankCode;
    }

    public void setBankCode(String bankCode) {
        this.bankCode = bankCode;
    }

    public String getSubbranch() {
        return subbranch;
    }

    public void setSubbranch(String subbranch) {
        this.subbranch = subbranch;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

}
