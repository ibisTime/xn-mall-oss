/**
 * @Title IRoleAO.java 
 * @Package com.ibis.pz.ao 
 * @Description 
 * @author miyb  
 * @date 2015-5-14 上午9:16:25 
 * @version V1.0   
 */
package com.xnjr.app.security.ao;

/**
 * @author: XIANDONG 
 * @since: 2016年4月22日 上午9:25:01 
 * @history:
 */
public interface IRoleAO {
    /**
     * 新增角色
     * @param roleCode
     * @param roleName
     * @param roleLevel
     * @param creator
     * @param remark
     * @return 
     * @create: 2015年10月13日 上午11:13:02 myb858
     * @history:
     */
    public Object addRole(String kind, String name, String level,
            String updater, String remark);

    /**
     * 删除角色
     * @param roleCode
     * @return 
     * @create: 2015年10月13日 上午11:14:05 myb858
     * @history:
     */
    public Object dropRole(String code);

    /**
     * 修改角色
     * @param roleCode
     * @param roleName
     * @param roleLevel
     * @param updater
     * @param remark
     * @return 
     * @create: 2015年10月13日 上午11:13:57 myb858
     * @history:
     */
    public Object editRole(String code, String kind, String name, String level,
            String updater, String remark);

    /**
     * 分页查询
     * @param roleCode
     * @param roleLevel
     * @param createDatetimeStart
     * @param createDatetimeEnd
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return 
     * @create: 2015年10月13日 上午11:15:08 myb858
     * @history:
     */
    public Object queryRolePage(String kind, String name, String level,
            String updater, String start, String limit);

    /**
     * 按条件获取所有的角色
     * @param roleCode
     * @param roleLevel
     * @param createDatetimeStart
     * @param createDatetimeEnd
     * @return 
     * @create: 2015年10月13日 上午11:15:39 myb858
     * @history:
     */
    public Object queryRoleList(String kind, String name, String level,
            String updater);

    public Object getRole(String code);

}
