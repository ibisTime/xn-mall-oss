package com.xnjr.app.product.req;

/**
 * 产品审核
 * @author: wu 
 * @since: 2016年5月17日 上午11:55:45 
 * @history:
 */
public class XN601002Req {

    // 登录名（必填）
    private String code;

    // 推荐人（选填）
    private String checkUser;

    // 证件类型（选填）
    private String checkResult;

    // 证件号码（选填）
    private String checkNote;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCheckUser() {
        return checkUser;
    }

    public void setCheckUser(String checkUser) {
        this.checkUser = checkUser;
    }

    public String getCheckResult() {
        return checkResult;
    }

    public void setCheckResult(String checkResult) {
        this.checkResult = checkResult;
    }

    public String getCheckNote() {
        return checkNote;
    }

    public void setCheckNote(String checkNote) {
        this.checkNote = checkNote;
    }
}
