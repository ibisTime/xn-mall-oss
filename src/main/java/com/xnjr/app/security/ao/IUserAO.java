/**
 * @Title ISysUserAO.java 
 * @Package com.xnjr.cpzc.ao 
 * @Description 
 * @author xieyj  
 * @date 2015年8月25日 下午3:07:46 
 * @version V1.0   
 */
package com.xnjr.app.security.ao;

import java.util.List;

import com.xnjr.app.security.res.XNlh0001Res;
import com.xnjr.app.security.res.XNlh0011Res;
import com.xnjr.app.security.res.XNlh0012Res;

/**
 * 系统用户
 * @author: XIANDONG 
 * @since: 2016年4月19日 上午11:16:49 
 * @history:
 */
public interface IUserAO {
    /**
     * 查询用户
     * @param kind
     * @param roleCode
     * @param loginName
     * @param userReferee
     * @param status
     * @param contact
     * @param updater
     * @param start
     * @param limit
     * @return 
     * @create: 2016年4月17日 下午5:57:04 XIANDONG
     * @history:
     */
    public Object queryUserPage(String kind, String roleCode, String loginName,
            String userReferee, String status, String contact, String updater,
            String start, String limit);

    /**
     * 查询用户列表
     * @param kind
     * @param roleCode
     * @param loginName
     * @param userReferee
     * @param status
     * @param contact
     * @param updater
     * @return 
     * @create: 2016年4月17日 下午5:56:52 XIANDONG
     * @history:
     */
    public List<XNlh0001Res> queryUserList(String userId, String kind,
            String roleCode, String loginName, String userReferee,
            String status, String contact, String updater);

    /**
     * 新增用户
     * @param loginName
     * @param userRefence
     * @param idKind
     * @param idNo
     * @param realName
     * @param contact
     * @param updater
     * @param kind
     * @param remark
     * @return 
     * @create: 2016年4月17日 下午5:56:45 XIANDONG
     * @history:
     */
    public Object addUser(String loginName, String userRefence, String idKind,
            String idNo, String realName, String contact, String updater,
            String kind, String remark);

    // 修改用户
    public Object editUser(String userId, String contact, String updater,
            String remark);

    /**
     * 注销
     * @param userId
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年4月17日 下午5:56:33 XIANDONG
     * @history:
     */
    public Object cancelUser(String userId, String updater, String remark);

    /**
     * 补充实名信息
     * @param userId
     * @param idKind
     * @param idNo
     * @param realName
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年4月17日 下午5:56:24 XIANDONG
     * @history:
     */
    public Object realUser(String userId, String idKind, String idNo,
            String realName, String updater, String remark);

    /**
     * 修改登录密码
     * @param userId
     * @param oldLoginPwd
     * @param newLoginPwd
     * @param newLoginPwdStrength
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年4月17日 下午5:56:10 XIANDONG
     * @history:
     */
    public Object changePsd(String userId, String oldLoginPwd,
            String newLoginPwd, String updater, String remark);

    /**
     * 管理员强制重置登录密码
     * @param adminId
     * @param adminTradePwd
     * @param userId
     * @return 
     * @create: 2016年4月17日 下午6:04:21 XIANDONG
     * @history:
     */
    public Object changePsdByAdmin(String adminId, String adminTradePwd,
            String userId);

    /**
     * 修改交易密码
     * @param userId
     * @param oldTradePwd
     * @param newTradePwd
     * @param newTradePwdStrength
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年4月17日 下午5:57:21 XIANDONG
     * @history:
     */
    public Object exchangePsd(String userId, String oldTradePwd,
            String newTradePwd, String newTradePwdStrength, String updater,
            String remark);

    /**
     * 管理员强制重置交易密码 
     * @param adminId
     * @param adminTradePwd
     * @param userId
     * @return 
     * @create: 2016年4月17日 下午6:09:51 XIANDONG
     * @history:
     */
    public Object exchangePsdByAdmin(String adminId, String adminTradePwd,
            String userId);

    /**
     * 修改用户联系方式
     * @param userId
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年4月17日 下午6:11:20 XIANDONG
     * @history:
     */
    public Object editUserlink(String userId, String updater, String remark);

    /**
     * 分配角色
     * @param userId
     * @param roleCode
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年4月17日 下午6:14:36 XIANDONG
     * @history:
     */

    public Object allotRole(String userId, String roleCode, String updater,
            String remark);

    /**
     * 登录
     * @param loginName
     * @param loginPwd
     * @param loginIp
     * @return 
     * @create: 2016年4月17日 下午6:11:49 XIANDONG
     * @history:
     */
    public XNlh0011Res login(String loginName, String loginPwd, String loginIp);

    public XNlh0012Res getUser(String userId);

}
