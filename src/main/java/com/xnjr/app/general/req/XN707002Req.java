package com.xnjr.app.general.req;

public class XN707002Req {

    // 父ID(必填)
    private String pId;

    // key(必填)
    private String key;

    // value(必填)
    private String value;

    // 创建人(必填)
    private String creator;

    // 备注(选填)
    private String remark;

    private String type;

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
