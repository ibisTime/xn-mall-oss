package com.xnjr.app.req;

public class XNyw4072Req extends APageReq {
    /** 
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
     */
    private static final long serialVersionUID = 1035667595381218028L;

    // 编号
    private String code;

    // 类型
    private String type;

    // 状态
    private String status;

    // 还款对象
    private String towho;

    //
    private String towhoName;

    // 投资编号
    private String investCode;

    // 业务编号
    private String businessCode;

    // 项目编号
    private String subjectCode;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getInvestCode() {
        return investCode;
    }

    public String getTowho() {
        return towho;
    }

    public void setTowho(String towho) {
        this.towho = towho;
    }

    public String getTowhoName() {
        return towhoName;
    }

    public void setTowhoName(String towhoName) {
        this.towhoName = towhoName;
    }

    public void setInvestCode(String investCode) {
        this.investCode = investCode;
    }

    public String getBusinessCode() {
        return businessCode;
    }

    public void setBusinessCode(String businessCode) {
        this.businessCode = businessCode;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

}
