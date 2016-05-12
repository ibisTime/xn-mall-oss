package com.xnjr.app.general.res;

public class XN707007Req {

    // 标题
    private String title;

    // 内容
    private String content;

    // 类别
    private String type;

    // 状态
    private String status;

    // 创建人
    private String creator;

    // 创建时间
    // private Date createDatetime;

    // 备注(选填)
    private String remark;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

}
