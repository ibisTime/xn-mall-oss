package com.xnjr.app.customer.req;

/**
 * 审批线下取现订单
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd0052Req {

    // 订单编号(必填)
    private String qxNo;

    // 审批人(必填)
    private String approveUser;

    // 审批意见(必填)
    private String approveResult;

    // 审批意见说明(必填)
    private String approveNote;

    public String getQxNo() {
        return qxNo;
    }

    public void setQxNo(String qxNo) {
        this.qxNo = qxNo;
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
