package com.xnjr.app.customer.req;

/**
 * 分页查询用户列表
 * @author: XIANDONG 
 * @since: 2016年4月21日 下午12:01:15 
 * @history:
 */
public class XNfd0011Req {

    // 手机号(选填)
    private String mobile;

    // 用户类别(选填）
    private String userKind;

    // 推荐人(选填)
    private String userReferee;

    // 证件类型(选填）
    private String idKind;

    // 证件号码(选填）
    private String idNo;

    // 真实姓名(选填）
    private String realName;

    // 状态(选填）
    private String status;

    // 第几页(必填）
    private String start;

    // 页面个数(必填）
    private String limit;

    // 排序字段(必填）
    private String orderColumn;

    // 排序方向(必填）
    private String orderDir;

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getUserKind() {
        return userKind;
    }

    public void setUserKind(String userKind) {
        this.userKind = userKind;
    }

    public String getUserReferee() {
        return userReferee;
    }

    public void setUserReferee(String userReferee) {
        this.userReferee = userReferee;
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

    public String getOrderColumn() {
        return orderColumn;
    }

    public void setOrderColumn(String orderColumn) {
        this.orderColumn = orderColumn;
    }

    public String getOrderDir() {
        return orderDir;
    }

    public void setOrderDir(String orderDir) {
        this.orderDir = orderDir;
    }

}
