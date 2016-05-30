package com.xnjr.app.account.req;

/**
 * 审批充值订单
 * @author: wu 
 * @since: 2016年5月27日 下午1:57:02 
 * @history:
 */
public class XN802111Req {

    // 订单编号
    private String chargeNo;

    // 审批人
    private String approveUser;

    // 审批意见
    private String approveResult;

    // 审批意见说明
    private String approveNote;

    public String getChargeNo() {
        return chargeNo;
    }

    public void setChargeNo(String chargeNo) {
        this.chargeNo = chargeNo;
    }

    public String getApproveUser() {
        return approveUser;
    }

    public void setApproveUser(String approveUser) {
        this.approveUser = approveUser;
    }

    public String getApproveResult() {
        return approveResult;
    }

    public void setApproveResult(String approveResult) {
        this.approveResult = approveResult;
    }

    public String getApproveNote() {
        return approveNote;
    }

    public void setApproveNote(String approveNote) {
        this.approveNote = approveNote;
    }

}
