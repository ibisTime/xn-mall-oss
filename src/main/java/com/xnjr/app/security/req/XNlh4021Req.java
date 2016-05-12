package com.xnjr.app.security.req;

import java.util.List;

/**
 * 增加菜单角色
 * @author: Gejin 
 * @since: 2016年4月16日 下午5:29:31 
 * @history:
 */
public class XNlh4021Req {

    // roleCode（必填）
    private String roleCode;

    // menuCode（必填）
    private List<String> menuCodeList;

    // 创建人（必填）
    private String updater;

    // 备注（选填）
    private String remark;

    public String getRoleCode() {
        return roleCode;
    }

    public void setRoleCode(String roleCode) {
        this.roleCode = roleCode;
    }

    public List<String> getMenuCodeList() {
        return menuCodeList;
    }

    public void setMenuCodeList(List<String> menuCodeList) {
        this.menuCodeList = menuCodeList;
    }

    public String getUpdater() {
        return updater;
    }

    public void setUpdater(String updater) {
        this.updater = updater;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

}
