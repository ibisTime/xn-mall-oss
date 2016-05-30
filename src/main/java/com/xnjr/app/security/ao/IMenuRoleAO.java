/**
 * @Title IMenuRoleAO.java 
 * @Package com.ibis.pz.ao 
 * @Description 
 * @author miyb  
 * @date 2015-5-14 上午9:17:21 
 * @version V1.0   
 */
package com.xnjr.app.security.ao;

import java.util.List;

import com.xnjr.app.security.res.XN805026Res;

/** 
 * @author: miyb 
 * @since: 2015-5-14 上午9:17:21 
 * @history:
 */
public interface IMenuRoleAO {

    /**
     * @param roleCode
     * @param parentCode
     * @param type
     * @param kind
     * @return 
     * @create: 2016年4月22日 下午1:12:20 xieyj
     * @history:
     */
    public List<XN805026Res> queryMenuList(String roleCode, String parentCode,
            String type, String kind);

    /**
     * 获取用户所对应的menu list
     * @param roleCode 角色编号
     * @param parentCode 要返回menu的父亲菜单编号---查询条件之一
     * @param type 要返回menu的类型---查询条件之一
     * @param isGetChild 要返回menu是否需要带有子菜单---查询条件之一
     * @return 
     * @create: 2015年10月20日 下午4:10:24 myb858
     * @history:
     */
    public Object queryMenuList(String roleCode, String parentCode,
            String type, boolean isGetChild);

    /**
     * 给角色授权具体的菜单资源（先删后增）
     * @param roleCode
     * @param menuList
     * @param creator
     * @return 
     * @create: 2015年10月19日 下午4:12:31 myb858
     * @history:
     */
    public Object changeMenuRole(String roleCode, String[] menuList,
            String creator);
}
