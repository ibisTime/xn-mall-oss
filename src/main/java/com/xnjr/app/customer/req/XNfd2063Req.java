package com.xnjr.app.customer.req;

/**
 * KYC审核
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd2063Req {

    // 编号（必填）
    private String id;

    // 审核人（必填）
    private String kycUser;

    // 审核结果（必填）
    private String kycResult;

    // 审核意见说明（必填）
    private String kycNote;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getKycUser() {
        return kycUser;
    }

    public void setKycUser(String kycUser) {
        this.kycUser = kycUser;
    }

    public String getKycResult() {
        return kycResult;
    }

    public void setKycResult(String kycResult) {
        this.kycResult = kycResult;
    }

    public String getKycNote() {
        return kycNote;
    }

    public void setKycNote(String kycNote) {
        this.kycNote = kycNote;
    }

}
