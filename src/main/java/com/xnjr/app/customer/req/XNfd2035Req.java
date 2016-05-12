package com.xnjr.app.customer.req;

/**
 * 分页查询企业列表
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd2035Req {

    // 公司编号(必填)
    private String code;

    // 公司名字(必填）
    private String name;

    // 工商营业执照号(选填)
    private String gsyyzzNo;

    // 法人证件类型(必填）
    private String idKind;

    // 法人证件号码(必填）
    private String idNo;

    // 法人真实姓名(必填）
    private String realName;

    // 状态(必填）
    private String status;

    // 开始页数(必填）
    private String start;

    // 每页限制条数(必填）
    private String limit;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGsyyzzNo() {
        return gsyyzzNo;
    }

    public void setGsyyzzNo(String gsyyzzNo) {
        this.gsyyzzNo = gsyyzzNo;
    }

    public String getIdKind() {
        return idKind;
    }

    public void setIdKind(String idKind) {
        this.idKind = idKind;
    }

    public String getIdNo() {
        return idNo;
    }

    public void setIdNo(String idNo) {
        this.idNo = idNo;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getLimit() {
        return limit;
    }

    public void setLimit(String limit) {
        this.limit = limit;
    }

}
