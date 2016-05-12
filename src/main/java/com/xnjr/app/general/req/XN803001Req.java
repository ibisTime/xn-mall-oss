package com.xnjr.app.general.req;

import com.xnjr.app.req.APageReq;

public class XN803001Req extends APageReq {
    // 用户编号
    private String userId;

    // 公司编号
    private String companyId;

    // 手机号
    private String mobile;

    // 真实姓名
    private String realName;

    // 操盘手等级
    private String level;

    // 状态
    private String status;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
