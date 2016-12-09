/**
 * @Title SessionUser.java 
 * @Package com.hsnet.pz.session 
 * @Description 
 * @author miyb  
 * @date 2014-8-19 下午4:46:22 
 * @version V1.0   
 */
package com.xnjr.app.session;

/**
 * @author: XIANDONG 
 * @since: 2016年4月18日 上午10:05:04 
 * @history:
 */
public class SessionUser extends AUserDetail {
	
	private String realUserId;
	
	private String realUserName;
	
    private String userId;

    private String userName;

    public SessionUser() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public SessionUser(String userId, String userName) {
        this.userId = userId;
        this.userName = userName;
        this.realUserId = userId;
        this.realUserName = userName;
    }

	public String getRealUserId() {
		return realUserId;
	}

	public void setRealUserId(String realUserId) {
		this.realUserId = realUserId;
	}

	public String getRealUserName() {
		return realUserName;
	}

	public void setRealUserName(String realUserName) {
		this.realUserName = realUserName;
	}
}
