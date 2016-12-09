
package com.xnjr.app.customer.req;

/**
 * @author: XIANDONG 
 * @since: 2016年6月1日 下午12:40:57 
 * @history:
 */
public class XN805090Req {
    private String userId;

    private String mobile;

    private String toUser;

    private String start;
    
    private String isGetAmount;

    public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getToUser() {
		return toUser;
	}

	public void setToUser(String toUser) {
		this.toUser = toUser;
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

	public String getIsGetAmount() {
		return isGetAmount;
	}

	public void setIsGetAmount(String isGetAmount) {
		this.isGetAmount = isGetAmount;
	}

	private String limit;

    
}
