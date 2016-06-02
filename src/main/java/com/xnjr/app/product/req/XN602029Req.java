package com.xnjr.app.product.req;

/**
 * @author: XIANDONG 
 * @since: 2016年6月1日 下午5:21:36 
 * @history:
 */
public class XN602029Req {

    // 编号（必填）
    private String code;

    // 反馈人（必填）
    private String approveUser;

    // 反馈备注（选填）
    private String approveNote;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getApproveUser() {
        return approveUser;
    }

    public void setApproveUser(String approveUser) {
        this.approveUser = approveUser;
    }

    public String getApproveNote() {
        return approveNote;
    }

    public void setApproveNote(String approveNote) {
        this.approveNote = approveNote;
    }

}
