package com.xnjr.app.req;

public class XNyw4053Req extends APageReq {
    /** 
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
     */
    private static final long serialVersionUID = -1054946522692390914L;

    // 项目编号
    private String code;

    // 项目状态
    private String status;

    // 项目名称
    private String name;

    // 服务类型
    private String serve;

    // 报价模式
    private String quote;

    // 受众等级
    private String level;

    // 类型 （1：普通标 2：企业标）
    private String type;

    // 标的编号
    private String projectCode;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getServe() {
        return serve;
    }

    public void setServe(String serve) {
        this.serve = serve;
    }

    public String getQuote() {
        return quote;
    }

    public void setQuote(String quote) {
        this.quote = quote;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

}
