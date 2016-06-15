package com.xnjr.app.product.req;

/**
 * 订单列表查询
 * @author: xieyj 
 * @since: 2016年5月23日 上午8:46:53 
 * @history:
 */
public class XN602026Req {

    // 用户编号（选填）
    private String loginName;

    // 状态（选填）
    private String status;
    
    private String applyUser;

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

	public String getApplyUser() {
		return applyUser;
	}

	public void setApplyUser(String applyUser) {
		this.applyUser = applyUser;
	}
}
