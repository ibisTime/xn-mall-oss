package com.xnjr.app.account.ao;

/**
 * @author: wu 
 * @since: 2016年5月26日 下午4:57:50 
 * @history:
 */
public interface IAccountAO {

    /**
     * 设置/修改角色
     * @param userId
     * @param roleCode
     * @param updater
     * @param remark
     * @return 
     * @create: 2016年5月26日 下午4:38:40 wu
     * @history:
     */
    public Object editAccount(String userId, String roleCode, String updater,
            String remark);

    /**
     * 分页查询用户
     * @param loginName
     * @param mobile
     * @param userKind
     * @param userReferee
     * @param idKind
     * @param idNo
     * @param realName
     * @param status
     * @param level
     * @param start
     * @param limit
     * @return 
     * @create: 2016年5月26日 下午4:44:44 wu
     * @history:
     */
    public Object queryAccountPage(String loginName, String mobile,
            String userKind, String userReferee, String idKind, String idNo,
            String realName, String status, String level, String start,
            String limit);

    /**
     * 列表查询用户
     * @param loginName
     * @param mobile
     * @param userKind
     * @param userReferee
     * @param idKind
     * @param idNo
     * @param realName
     * @param status
     * @param level
     * @return 
     * @create: 2016年5月26日 下午4:46:05 wu
     * @history:
     */
    public Object queryAccountList(String loginName, String mobile,
            String userKind, String userReferee, String idKind, String idNo,
            String realName, String status, String level);

    /**
     * 获取用户详情
     * @param userId
     * @return 
     * @create: 2016年5月26日 下午4:46:46 wu
     * @history:
     */
    public Object accountDetail(String userId);

}
