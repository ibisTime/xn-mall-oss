package com.xnjr.app.product.req;

import com.xnjr.app.req.APageReq;

/**
 * 订单分页查询
 * @author: xieyj 
 * @since: 2016年5月23日 上午8:46:53 
 * @history:
 */
public class XN602025Req extends APageReq {

    /** 
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
     */
    private static final long serialVersionUID = 1L;

    // 用户编号（选填）
    private String applyUser;

    private String loginName;

    private String code;

    // 状态（选填）
    private String status;

    // 是否为尾款支付
    private String isSecondPay;

    //
    // // 状态（选填）
    // private String dateEnd;

    public String getApplyUser() {
        return applyUser;
    }

    public void setApplyUser(String applyUser) {
        this.applyUser = applyUser;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getIsSecondPay() {
        return isSecondPay;
    }

    public void setIsSecondPay(String isSecondPay) {
        this.isSecondPay = isSecondPay;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

}
