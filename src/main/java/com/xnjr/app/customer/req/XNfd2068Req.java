/**
 * @Title XNfd2067.java 
 * @Package com.xnjr.moom.dto.req 
 * @Description 
 * @author xieyj  
 * @date 2016年4月24日 下午9:41:32 
 * @version V1.0   
 */
package com.xnjr.app.customer.req;

/** 
 * @author: xieyj 
 * @since: 2016年4月24日 下午9:41:32 
 * @history:
 */
public class XNfd2068Req {
    // 原用户编号
    private String fromUserId;

    // 变更用户编号
    private String toUserId;

    // 变更公司编号
    private String companyCode;

    // 申请公函
    private String sqghPicture;

    // 提交人
    private String updater;
    
    // 备注
    private String remark;

    public String getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(String fromUserId) {
        this.fromUserId = fromUserId;
    }

    public String getToUserId() {
        return toUserId;
    }

    public void setToUserId(String toUserId) {
        this.toUserId = toUserId;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getSqghPicture() {
        return sqghPicture;
    }

    public void setSqghPicture(String sqghPicture) {
        this.sqghPicture = sqghPicture;
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
