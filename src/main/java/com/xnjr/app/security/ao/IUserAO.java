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

import com.xnjr.app.security.res.XN805043Res;
import com.xnjr.app.security.res.XN805055Res;
import com.xnjr.app.security.res.XN805056Res;

/**
 * 系统用户
 * @author: XIANDONG 
 * @since: 2016年4月19日 上午11:16:49 
 * @history:
 */
public interface IUserAO {
    /**
     * 分页查询用户
     * @param loginName
     * @param kind
     * @param level
     * @param userReferee
     * @param mobile
     * @param idKind
     * @param idNo
     * @param realName
     * @param roleCode
     * @param status
     * @param updater
     * @param start
     * @param limit
     * @return 
     * @create: 2016年5月31日 上午11:58:54 xieyj
     * @history:
     */
    public Object queryUserPage(String loginName, String kind, String level,
            String userReferee, String mobile, String idKind, String idNo,
            String realName, String roleCode, String status, String updater,
            String start, String limit);

    /**
     * 查询用户列表
     * @param loginName
     * @param kind
     * @param level
     * @param userReferee
     * @param mobile
     * @param idKind
     * @param idNo
     * @param realName
     * @param roleCode
     * @param status
     * @param updater
     * @return 
     * @create: 2016年5月31日 上午11:59:09 xieyj
     * @history:
     */
    public List<XN805055Res> queryUserList(String loginName, String kind,
            String level, String userReferee, String mobile, String idKind,
            String idNo, String realName, String roleCode, String status,
            String updater);

    /**
     * 根据用户编号获取详情
     * @param userId
     * @return 
     * @create: 2016年5月30日 下午5:15:42 xieyj
     * @history:
     */
    public XN805056Res getUser(String userId);

    /**
     * 系统用户注册
     * @param mobile
     * @param idKind
     * @param idNo
     * @param realName
     * @param userReferee
     * @param updater
     * @param remark
     * @param kind
     * @return 
     * @create: 2016年5月31日 上午8:19:47 xieyj
     * @history:
     */
    public Object addUser(String mobile, String idKind, String idNo,
            String realName, String userReferee, String updater, String remark,
            String kind);

    /**
     * 修改手机号
     * @param userId
     * @param newMobile
     * @param smsCaptcha
     * @param tradePwd
     * @return 
     * @create: 2016年5月30日 下午5:34:02 xieyj
     * @history:
     */
    public Object editMobile(String userId, String newMobile,
            String smsCaptcha, String tradePwd);

    /**
     * 注销用户
     * @param userId
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年4月17日 下午5:56:33 XIANDONG
     * @history:
     */
    public Object cancelUser(String userId, String updater, String remark);

    /**
     * 激活用户
     * @param userId
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年5月30日 下午5:07:31 xieyj
     * @history:
     */
    public Object activeUser(String userId, String updater, String remark);

    /**
     * 修改登录密码
     * @param userId
     * @param oldLoginPwd
     * @param newLoginPwd
     * @return 
     * @create: 2016年5月30日 下午5:37:20 xieyj
     * @history:
     */
    public Object changeLoginPwd(String userId, String oldLoginPwd,
            String newLoginPwd);

    /**
     * 重置登录密码
     * @param mobile
     * @param smsCaptcha
     * @param newLoginPwd
     * @return 
     * @create: 2016年5月30日 下午5:40:29 xieyj
     * @history:
     */
    public Object resetLoginPwd(String mobile, String smsCaptcha,
            String newLoginPwd);

    /**
     * 修改交易密码
     * @param userId
     * @param newTradePwd
     * @param smsCaptcha
     * @param idKind
     * @param idNo
     * @return 
     * @create: 2016年5月30日 下午5:44:53 xieyj
     * @history:
     */
    public Object changeTradePwd(String userId, String oldTradePwd,
            String newTradePwd);

    /**
     * 重置交易密码
     * @param userId
     * @param newTradePwd
     * @param smsCaptcha
     * @param idKind
     * @param idNo
     * @return 
     * @create: 2016年5月30日 下午5:42:10 xieyj
     * @history:
     */
    public Object resetTradePwd(String userId, String newTradePwd,
            String smsCaptcha, String idKind, String idNo);

    /**
     * 分配角色
     * @param userId
     * @param roleCode
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年5月30日 下午5:48:29 xieyj
     * @history:
     */
    public Object allotRole(String userId, String roleCode, String updater,
            String remark);

    /**
     * 登录
     * @param loginName
     * @param loginPwd
     * @return 
     * @create: 2016年4月17日 下午6:11:49 XIANDONG
     * @history:
     */
    public XN805043Res login(String loginName, String loginPwd);

}
