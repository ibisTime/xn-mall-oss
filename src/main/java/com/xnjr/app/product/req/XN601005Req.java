package com.xnjr.app.product.req;

/**
 * 列表查询产品
 * @author: wu 
 * @since: 2016年5月17日 下午12:02:20 
 * @history:
 */
public class XN601005Req {

    // 用户编号（必填）
    private String code;

    // 原密码（必填）
    private String type;

    // 新密码（必填）
    private String name;

    // 新密码强度（必填）
    private String updater;

    // 更新人（必填）
    private String status;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUpdater() {
        return updater;
    }

    public void setUpdater(String updater) {
        this.updater = updater;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
